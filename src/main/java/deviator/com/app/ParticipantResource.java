package deviator.com.app;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import deviator.com.app.impl.AddParticipantImpl;
import deviator.com.app.model.AddParticipantResponse;

@RestController
@RequestMapping("/participant")
public class ParticipantResource {
	
	@RequestMapping(value = "/add", method = RequestMethod.POST)
	public AddParticipantResponse addParticipant(@RequestBody ParticipantInfo request) {
		AddParticipantImpl addParticipantImpl = new AddParticipantImpl();
		addParticipantImpl.inputMapping(request);
		addParticipantImpl.execute();
		return addParticipantImpl.outputMapping();
	}


}
