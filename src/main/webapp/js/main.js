(function(){                                                                     


    var app = angular.module("deviatorLabs", []); 

    app.controller('participantController', function($scope,$http) {
	    $scope.submitParticipantInfo = function(){
	    	console.log( $scope.name +"| " + $scope.phoneNumber+"|"+ $scope.email)

	    }

	    $scope.initializeApp = function(){
	    	$scope.errorMessage ="";
	    	$scope.name = "";
		    $scope.phoneNumber = "";
		    $scope.email = "";
		    $scope.mediaId ="";
		    $scope.participantId="";
		    
	    }

	    $scope.accountId =	""
	     $scope.initializeApp();

	     $scope.noNeuroServer = function (){
	     	$scope.errorMessage ="Unable to identify the organizer of the preview.."
			 		$scope.domShowHide("none");
	     }

	    $scope.init = function () {
	    	var accountId="deviator010102";
	    	$scope.initializeApp();
	    	$scope.domShowHide("none");
	    	$scope.accountId =	accountId;
			 $http.get("https://www.neuro-insideout.com/dev-cam/php/testMe.php?id="+accountId).then(function(response) {
			 	if(response && response.data && response.data.message) {
			 		$scope.noNeuroServer()
			 		
			 	} else {
			 		if (response && response.data && response.data.records && response.data.records.length > 0) {
			 			$scope.accountId = accountId;
			 			$scope.mediaId = response.data.records[0].mediaId;
			 			$scope.domShowHide("info_wrapper");
			 		} else {
			 			$scope.noNeuroServer();
			 		}
			 		

			 	}
			    }).catch(function(error){
			    	$scope.errorMessage ="Unable to reach to neuro-insideout-labs.Please contact the administrator";
			    	$scope.domShowHide("none");
			    });

	    }

	    $scope.domShowHide = function(showOnlyDOM){
	    	var arr = ["loader_wrapper","cam_wrapper","info_wrapper"];
	    	for (var a=0;a<arr.length;a++){
	    		document.getElementById(arr[a]).style.display ="none";
	    		if(showOnlyDOM === arr[a]) {
	    			document.getElementById(arr[a]).style.display ="block";
	    		}
	    	}

	    }



	    $scope.validateInfo = function (){
	    	var counter = 0;
	    	var mandatoryInfo = 2; 
	    	if ($scope.name && $scope.name !=='') {
	    		counter++;
	    	}

	    	if ($scope.phoneNumber && $scope.phoneNumber !=='') {
	    		counter++;
	    	}

	    	if ($scope.email && $scope.email !=='') {
	    		counter++;
	    	}

	    	return (counter >= mandatoryInfo) ? true : false;
	    }


	    $scope.submitParticipantInfo = function(){
	    	if ($scope.validateInfo()){
	    		$scope.errorMessage ="";
	    		var postData ={
	    			"name":$scope.name,
	    			"phoneNumber":$scope.phoneNumber,
	    			"email":$scope.email,
	    			"accountId":$scope.accountId
	    		}

	    		 $http({
		            url: 'https://www.neuro-insideout.com/dev-cam/php/addParticipant.php',
		            method: "POST",
		            data: postData,
		            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
				        }).then(function (data, status, headers, config) {

				        	$scope.participantId= (data && data.data)  ? data.data.id :undefined;
		                $scope.domShowHide("cam_wrapper");
		                $scope.proceedToRecord()
		            },function (data, status, headers, config) {
		                $scope.domShowHide("cam_wrapper");
		                $scope.proceedToRecord();
		            });
				        

	    	} else {

	    		$scope.errorMessage ="Please verify if name & email address are entered correctly...";
	    	} 
	    }

	    $scope.getUpdatedURL = function(){
			var currentPage = window.location.href;
			currentPage = currentPage.replace("index.html","");
			return currentPage;
		}


	    $scope.proceedToRecord = function() {
			// ID of the mediafile you wish this participant to see
			//var mediaFileID = "dce248c83b20406a8d801c6126776738";
			
			
			var currentPage = $scope.getUpdatedURL();
			// Page to show after the recording is complete
			var callBackUrl = currentPage +"sucess.html";

			// Page to show (or redirect you're participant to) when a recording failed
			var failedCallBackUrl = currentPage +"fail.html";
			console.log(failedCallBackUrl);

			// replace by call to your own javascript function to retreive a unique ID per participant
			var participantID = "dev_v" + Math.floor((Math.random() * 100) + 1);
			;

			// create RecordingHelper object 
			var helper = new RecordingHelper(participantID, $scope.mediaId,
					undefined, undefined,"1140px","660px");

			// Optionally, set a JavaScript function to call when the recording is completed  
			var that = this;
			helper.onrecordingfinished = function(response) {
				

				var postData ={
	    			"accountId":$scope.accountId,
	    			"participantId":$scope.participantId,
	    			"mediaId":$scope.mediaId
	    		}

				
				 $http({
		            url: 'https://www.neuro-insideout.com/dev-cam/php/updateMediaTracking.php',
		            method: "POST",
		            data: postData,
		            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
				        });
				
			};

			// and when the recording failed 
			helper.onrecordingfailed = function() {
				$scope.errorMessage ="Unable to reach to neuro-insideout-labs.Please contact the administrator";
//			    $scope.domShowHide("none");

				//var currentPage = $scope.getUpdatedURL();
				//window.location.href = currentPage+"fail.html";
			};
			document.getElementById("cam_wrapper").appendChild(helper.iframe);

		}
	});
                                  


})(); 


