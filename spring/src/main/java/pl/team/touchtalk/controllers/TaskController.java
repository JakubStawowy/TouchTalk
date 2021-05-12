package pl.team.touchtalk.controllers;

import org.springframework.web.bind.annotation.*;
import pl.team.touchtalk.dto.TaskTransferObject;
//import pl.team.touchtalk.dao.TaskRepository;
import pl.team.touchtalk.model.Task;
import  pl.team.touchtalk.services.TaskServices;

import java.sql.Date;
import java.util.ArrayList;
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


    private TaskServices taskServices;

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

    @PostMapping
    public Task addVideo(@RequestBody Task taskServicesS) {
        return taskServices.save(taskServicesS);
    }

    @PutMapping
    public Task updateVideo(@RequestBody Task taskServicesS) {
        return taskServices.save(taskServicesS);
    }

    @DeleteMapping
    public void deleteVideo(@RequestParam Long id) {
        taskServices.deleteById(id);
    }
    }

