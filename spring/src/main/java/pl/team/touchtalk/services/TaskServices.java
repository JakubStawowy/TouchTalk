package pl.team.touchtalk.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;
import pl.team.touchtalk.dao.TaskRepository;
import pl.team.touchtalk.model.Task;

import java.util.List;
import java.util.Optional;

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

    public Task save(Task task) {
        return taskRepository.save(task);
    }

    public void deleteById(Long id) {
        taskRepository.deleteById(id);
    }
    /*
    @EventListener(ApplicationReadyEvent.class)
    public void fillDB() {
        Task zad1= save(new Task(10L,"Umów sie do lekarza","Zadzwon 99999","2021-02-02","2021-02-05",true,1L));

    }

     */
}
