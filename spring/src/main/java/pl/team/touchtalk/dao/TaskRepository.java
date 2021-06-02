package pl.team.touchtalk.dao;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import pl.team.touchtalk.model.Task;


import javax.transaction.Transactional;
import java.util.List;
/*
 * Task Repo
 *
 * @Author Sebastian Pokrywka
 * @Version 1.0
 * @Since 2021-05-28
 * */


@Repository
public interface TaskRepository extends CrudRepository<Task, Long> {

    @Query(value = "SELECT * FROM task t WHERE t.id_user=?1 ", nativeQuery = true)
    List<Task> getTaskByUserId(Long id);

    @Modifying
    @Transactional
    @Query(value = "Update public.task set done=true where id=?1", nativeQuery = true)
    void putDoneById(Long id);




}

