package pl.team.touchtalk.dao;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import pl.team.touchtalk.model.Message;

import java.util.List;

@Repository
public interface MessageRepository extends CrudRepository<Message, Long> {
    @Query(nativeQuery = true, value = "SELECT * FROM messages WHERE sender_id=?1 AND receiver_id=?2")
    List<Message> getAllBySenderAndReceiver(Long senderId, Long receiverId);
    @Query(nativeQuery = true, value = "SELECT * FROM messages WHERE (sender_id=?1 AND receiver_id=?2) OR (receiver_id=?1 AND sender_id=?2)")
    List<Message> findAllBySenderAndReceiverOrReceiverAndSender(Long sender, Long receiver);
}
