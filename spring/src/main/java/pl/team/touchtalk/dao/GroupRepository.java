package pl.team.touchtalk.dao;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import pl.team.touchtalk.model.Group;

import java.util.Optional;
/*
 * @Author Bartosz Szlęzak
 * @Author Grzegorz Szydło
 * @Author Paweł Szydło
 * @Author Łukasz Stolarz
 * @Version 2.0
 * @Since 2021-04-30
 * */


@Repository
public interface GroupRepository extends CrudRepository<Group, Long> {

    Group getById(Long id);
    @Query(value = "SELECT * FROM groups gr WHERE gr.id in (SELECT gru.group_id FROM user_in_groups gru WHERE gru.user_id = ?1)", nativeQuery = true)
    List<Group> getGroupsByUserId(Long id);

    Group findByCode(String code);
}
