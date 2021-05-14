package pl.team.touchtalk.dao;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import pl.team.touchtalk.model.File;

@Repository
public interface FileRepository extends CrudRepository<File, Long> {
    @Query(nativeQuery = true, value = "SELECT * FROM files WHERE message_id=?1")
    File findFileUrlByMessageId(Long id);

    //String findByMessageId(Long id);

}
