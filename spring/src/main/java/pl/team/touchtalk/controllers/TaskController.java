package pl.team.touchtalk.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.team.touchtalk.model.Task;
import  pl.team.touchtalk.services.TaskServices;
import pl.team.touchtalk.dao.UserRepository;

import java.util.List;
import java.util.Optional;


/*
 * Task controller
 *
 * @Author Sebastian Pokrywka
 * @Version 1.0
 * @Since 2021-05-02
 **/
@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/calendar")
public class TaskController {

    private final TaskServices taskServices;

    @Autowired
    public  TaskController(TaskServices taskServices){
        this.taskServices=taskServices;
    }

    @GetMapping("/all")
    public Iterable<Task> getAll() {
        return taskServices.findAll();
    }

    @GetMapping
    public Optional<Task> getById(@RequestParam Long id) {
        return taskServices.findById(id);
    }
    @GetMapping("/user/{id_user}")
    public List<Task> getTaskUser(@PathVariable("id_user") Long id_user) {
        return taskServices.getTaskByUserId(id_user);
    }

    @PostMapping
    public Task addTask(@RequestBody Task task) {
        return taskServices.save(task);
    }

    @PutMapping
    public Task updateTask(@RequestBody Task task) {
        return taskServices.save(task);
    }

    @DeleteMapping
    public void deleteTask(@RequestParam Long id) {
        taskServices.deleteById(id);
    }
}
