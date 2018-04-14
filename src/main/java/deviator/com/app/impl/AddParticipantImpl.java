package deviator.com.app.impl;

import org.hibernate.Session;
import org.hibernate.SessionFactory;

import deviator.com.app.ParticipantInfo;
import deviator.com.app.model.AddParticipantResponse;
import deviator.com.app.model.ApplicationResponse;
import deviator.com.app.model.ParticipantEntity;
import deviator.com.util.HibernateUtility;

public class AddParticipantImpl {
	
	private ParticipantEntity participantEntity;
	private AddParticipantResponse addParticipantResponse;
	
	public void inputMapping(ParticipantInfo request){
		participantEntity = new ParticipantEntity();
		participantEntity.setName(request.getName());
		participantEntity.setPhoneNumber(request.getPhoneNumber());
	}
	public void execute() {
		addParticipantResponse = new AddParticipantResponse();
		//Get Session
		SessionFactory sessionFactory = HibernateUtility.getSessionAnnotationFactory();
		Session session = sessionFactory.getCurrentSession();
		//start transaction
		session.beginTransaction();
		//Save the Model object
		session.save(participantEntity);
		//Commit transaction
		session.getTransaction().commit();
		addParticipantResponse.setId(participantEntity.getId());
		System.out.println("Employee ID="+participantEntity.getId());
		session.close();
	}
	public AddParticipantResponse outputMapping(){
		return addParticipantResponse;
	}

}
