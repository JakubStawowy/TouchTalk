package pl.team.touchtalk;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import pl.team.touchtalk.entities.Message;
import pl.team.touchtalk.entities.User;
import pl.team.touchtalk.entities.UserDetails;
import pl.team.touchtalk.repositories.MessageRepository;
import pl.team.touchtalk.repositories.UserRepository;

@SpringBootApplication
public class TouchtalkApplication {

	@Autowired
	MessageRepository repository;

	@Autowired
	UserRepository userRepository;

	public static void main(String[] args) {
		SpringApplication.run(TouchtalkApplication.class, args);
	}

//	@Bean
//	CommandLineRunner commandLineRunner() {
//		return args -> {
//			User user = new User(
//				"email1@email.com",
//				"passswd",
//				new UserDetails(
//						"Bartosz",
//						"Szlezak",
//						"jest",
//						"spoko"
//				), "salt1"
//			);
//			User receiver = new User(
//					"email2@email.com",
//					"passswd",
//					new UserDetails(
//							"Bartosz",
//							"Szlezak",
//							"To",
//							"spoko gosc"
//					),
//					"salt2"
//			);
//			userRepository.save(user);
//			Message message = new Message("xdd", "file", user);
//			receiver.getMessagesReceived().add(message);
//			userRepository.save(receiver);
//			repository.save(message);
//		};
//	}
}
