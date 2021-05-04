package pl.team.touchtalk.dao;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import pl.team.touchtalk.model.GroupMessage;

import java.util.List;

/*
 * @Author Bartosz Szlęzak
 * @Author Grzegorz Szydło
 * @Author Paweł Szydło
 * @Author Łukasz Stolarz
 * @Version 2.0
 * @Since 2021-04-30
 * */

@Repository
public interface GroupMessageRepository extends CrudRepository<GroupMessage, Long> {

    List<GroupMessage> findAllByGroupId(Long group);
}
