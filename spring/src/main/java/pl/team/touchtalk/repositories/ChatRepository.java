package pl.team.touchtalk.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import pl.team.touchtalk.entities.ChatMessage;

import java.util.List;

@Repository

public interface ChatRepository extends CrudRepository<ChatMessage, Long> {

    List<ChatMessage> findAllBySenderAndReceiverOrReceiverAndSender(Long sender, Long receiver, Long receiver2, Long sender2);
}
