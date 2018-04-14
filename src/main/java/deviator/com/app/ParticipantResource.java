package deviator.com.app;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import deviator.com.app.model.ApplicationResponse;

@RestController
@RequestMapping("/participant")
public class ParticipantResource {
	
	@RequestMapping(value = "/add", method = RequestMethod.POST)
	public ApplicationResponse addParticipant(@RequestBody ParticipantInfo request) {
		ApplicationResponse appResponse = new ApplicationResponse();
		return appResponse;
	}


}
