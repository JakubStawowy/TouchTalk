package pl.team.touchtalk.repositories;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import pl.team.touchtalk.entities.Group;

import java.util.List;
import java.util.Optional;

@Repository
public interface GroupRepository extends CrudRepository<Group, Long> {

    @Query(value = "SELECT * FROM groups gr WHERE gr.id in (SELECT gru.group_id FROM user_in_groups gru WHERE gru.user_id = ?1)", nativeQuery = true)
    List<Group> getGroupsByUserId(Long id);

    Group findByCode(String code);
}
