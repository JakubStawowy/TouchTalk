package pl.team.touchtalk.dao;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import pl.team.touchtalk.model.Message;
import pl.team.touchtalk.model.User;

import java.util.List;


/*
 * @Author Bartosz Szlęzak
 * @Author Grzegorz Szydło
 * @Author Paweł Szydło
 * @Author Łukasz Stolarz
 * @Version 2.0
 * @Since 2021-05-01
 * */
@Repository
public interface MessageRepository extends CrudRepository<Message, Long> {
    @Query(nativeQuery = true, value = "SELECT * FROM messages WHERE sender_id=?1 AND receiver_id=?2")
    List<Message> getAllBySenderAndReceiver(Long senderId, Long receiverId);
//    @Query(nativeQuery = true, value = "SELECT * FROM messages WHERE (sender_id=?1 AND receiver_id=?2) OR (receiver_id=?1 AND sender_id=?2)")

    @Transactional
    List<Message> findAllBySenderAndReceiverOrReceiverAndSender(User sender, User receiver, User receiver2, User sender2);

}
