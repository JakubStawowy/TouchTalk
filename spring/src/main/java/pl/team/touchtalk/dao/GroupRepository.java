package pl.team.touchtalk.dao;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import pl.team.touchtalk.model.Group;

import java.util.Optional;

@Repository
public interface GroupRepository extends CrudRepository<Group, Long> {

    Group getById(Long id);
}
