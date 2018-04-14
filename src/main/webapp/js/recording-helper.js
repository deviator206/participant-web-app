/*
-------------------------------
Copyright 2018, Human Insight Services B.V.
-------------------------------
Created by	: Paul Ivan
Last Edit	: February 27, 2018
*/


/*
RecordingHelper. Contains ->
    onrecordingfinished event, for handling what to do when the recording is finished;
    onrecordingfailed event, for handling what to do when the recording failed;
	
	Optional parameters:
	failedCallBackUrl, width, height, color
*/
RecordingHelper = function (participantID, mediaFilenameID, callBackUrl, failedCallBackUrl, width, height, color) {

    // store the participantID
    this.participantID = participantID;

    // store the mediaFilename
    this.mediaFilename = mediaFilenameID;

    // event method for when the recording is finished;
    this.onrecordingfinished = null;
    this.onrecordingfailed = null;

    // create the iframe
    this.iframe = CreateParticipantRecorderFrame(participantID,
        mediaFilenameID, callBackUrl, failedCallBackUrl, width, height, color);

    // set the onload
    var first = true; var handled = false; var instance = this; var callBack = callBackUrl;
    this.iframe.onload = function () {
        if (first) {
            first = false;
        }
        else if (!handled) {
            if (instance.onrecordingfinished) {
                handled = true;
                instance.iframe.onload = null;
                instance.requestResultFinished();
            }
        }
    };

    // checks if the recording was actually finished
    this.requestResultFinished = function () {
        var request = GetRequester();

        // default behavior is to succeed?
        if (!request) instance.onrecordingfinished();

        // define method for when request is finished
        request.onreadystatechange = function () {
            if (request.readyState == 4) {
                if (request.responseText != "error") {
                    // xml to json
                    var json = xmlToJson(ToXmlDoc(request.responseText));

                    if (json && json.Parameters) {
                        if (json.Parameters.RecordingFinished['#text'] == 'true')
                            instance.onrecordingfinished();
                        else if (instance.onrecordingfailed)
                            instance.onrecordingfailed();
                    }
                    else {
                        if (instance.onrecordingfailed)
                            instance.onrecordingfailed();
                    }
                }
            }
        };

        // form the request url
        var url = GetFaceReaderOnlineRequestUrl(
			instance.participantID, instance.mediaFilename);

        // request
        request.open("GET", url, true); request.send();
    }

    /*
	Add an independent variable to the url
	*/
    this.addIndependentVariable = function (variableName, variableValue) {
        this.iframe.src += "&" + variableName + "=" + variableValue;
    }

    /*
	Sets one of the extra options
	*/
    this.setOption = function (option, value) {
        this.iframe.src += "&" + option + "=" + value;
    }

    /*
		Set the language of the recorder:
		options:
		cs
		nl
		
		defaults to english.
	*/
    this.setLanguage = function (language) {
        if (this.iframe) {
            this.iframe.src += "&Language=" + language;
        }
    }
};

/*

ID generator
*/
function ID() {
    return Math.floor(
                Math.random() * 0x10000
            ).toString(16);
};


/*
Random new ParticipantID
*/
function GenerateParticipantID() {
    return ID() + ID() + ID();
};

/*
Generates a participantID and stores it as embedded data
*/
function RegisterQualtricsID(qualtricsEngine, participantID) {

    // hide the next button
    if (participantID.indexOf("e://") != -1 || participantID == "") {
        participantID = GenerateParticipantID();
        qualtricsEngine.addEmbeddedData('ParticipantID', participantID);
    }

    return participantID;
};


/*
Appends an iframe to the div with the RecordingHelper Object, using the participantID, mediaFilenameID and callBackUrl 
and returns this iframe
*/
function EmbedParticipantRecorderFrame(participantID, mediaFilenameID, callBackUrl, failedCallBackUrl, div) {
    // create the iframe
    var iframe = CreateParticipantRecorderFrame(participantID, mediaFilenameID, callBackUrl, failedCallBackUrl);

    // add to the div
    div.appendChild(iframe);

    return iframe;
}

/*
Returns an iframe using the participantID, mediaFilenameID and callBackUrl
*/
function CreateParticipantRecorderFrame(participantID, mediaFilenameID, callBackUrl, failedCallBackUrl, width, height, color) {

    // create the iframe
    var iframe = document.createElement('iframe');
    iframe.name = 'mrv_' + mediaFilenameID;
    iframe.id = 'mrv_' + mediaFilenameID;

    // create the src
    var src =
        GetParticipantRecorderStreamUrl() +
        'ParticipantID=' + participantID +
        '&MediaFileID=' + mediaFilenameID;

    if (callBackUrl) {
        src += '&RedirectURL=' + callBackUrl;
    }
    if (failedCallBackUrl) {
        src += '&FailedRedirectURL=' + failedCallBackUrl;
    }
    if (width) {
        src += '&Width=' + width;
    }
    if (height) {
        src += '&Height=' + height;
    }
    if (color) {
        src += '&Color=' + color;
    }

    // set the default iframe properties	
    iframe.src = src;
    iframe.frameBorder = '0';
    iframe.width = '100%';
    iframe.allow = 'camera; microphone';
    iframe.height = height ? height : '500px';

    return iframe;
}


function GetRequester() {
    var request = false;
    if (window.XMLHttpRequest) {
        request = new XMLHttpRequest;
    } else if (window.ActiveXObject) {
        request = new ActiveXObject("Microsoft.XMLHttp");
    }
    if (!request) return;

    return request;
}

function ToXmlDoc(xmlString) {

    try {
        var xmlDoc;
        if (window.DOMParser) {
            parser = new DOMParser();
            xmlDoc = parser.parseFromString(xmlString, "text/xml");
        }
        else // Internet Explorer
        {
            xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
            xmlDoc.async = false;
            xmlDoc.loadXML(xmlString);
        }
        return xmlDoc;
    }
    catch (err) {
        return false;
    }
}

// Changes XML to JSON
function xmlToJson(xml) {

    try {
        // Create the return object
        var obj = {};

        if (xml.nodeType == 1) { // element
            // do attributes
            if (xml.attributes.length > 0) {
                obj["@attributes"] = {};
                for (var j = 0; j < xml.attributes.length; j++) {
                    var attribute = xml.attributes.item(j);
                    obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
                }
            }
        } else if (xml.nodeType == 3) { // text
            obj = xml.nodeValue;
        }

        // do children
        if (xml.hasChildNodes()) {
            for (var i = 0; i < xml.childNodes.length; i++) {
                var item = xml.childNodes.item(i);
                var nodeName = item.nodeName;
                if (typeof (obj[nodeName]) == "undefined") {
                    obj[nodeName] = xmlToJson(item);
                } else {
                    if (typeof (obj[nodeName].push) == "undefined") {
                        var old = obj[nodeName];
                        obj[nodeName] = [];
                        obj[nodeName].push(old);
                    }
                    obj[nodeName].push(xmlToJson(item));
                }
            }
        }
        return obj;
    }
    catch (err) { }

    return false;
};

/*
Returns the url of the participant stream recorder
*/
function GetParticipantRecorderStreamUrl() {
    return 'https://stream.facereader-online.com/stream?';
}

/*
Url to request status of recording
*/
function GetFaceReaderOnlineRequestUrl(participantID, mediaFilename) {
    return 'https://stream.facereader-online.com/request?RequestType=RequestRecordingFinished' +
		   '&ParticipantID=' + participantID +
		   '&MediaFilename=' + mediaFilename;
}