package pl.team.touchtalk.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;
import pl.team.touchtalk.dao.TaskRepository;
import pl.team.touchtalk.model.Task;

import java.util.List;
import java.util.Optional;
/*
 * Task Services
 *
 * @Author Sebastian Pokrywka
 * @Version 1.0
 * @Since 2021-05-28
 * */

@Service
public class TaskServices {

    private  TaskRepository taskRepository;

    @Autowired
    public TaskServices(TaskRepository taskRepository){
        this.taskRepository=taskRepository;
    }

    public Optional<Task> findById(Long id) {
        return taskRepository.findById(id);
    }

    public Iterable<Task> findAll() {
        return taskRepository.findAll();
    }

    public List<Task> getTaskByUserId(Long id) {
        return taskRepository.getTaskByUserId(id);
    };

    public void putDoneById(Long id){
        taskRepository.putDoneById(id);

    }
    public Task save(Task task) {
        return taskRepository.save(task);
    }

    public void deleteById(Long id) {
        taskRepository.deleteById(id);
    }

}
