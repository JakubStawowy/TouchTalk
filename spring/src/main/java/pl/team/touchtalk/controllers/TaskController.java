package pl.team.touchtalk.controllers;

import org.springframework.scheduling.config.TaskManagementConfigUtils;
import org.springframework.web.bind.annotation.*;
import pl.team.touchtalk.dto.TaskTransferObject;
import pl.team.touchtalk.model.Task;
import pl.team.touchtalk.dao.TaskRepository;

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
 * */
@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/calendar")
public class TaskController {


    private List<TaskRepository> taskRepository;

    public TaskController(){
        taskRepository = new ArrayList<>();
        taskRepository.add(new TaskRepository(1, "Zadanie 1"," Idz spać",false, new Date(2021,5,3),new Date(2021,5,10)) {});
        taskRepository.add(new TaskRepository(1,"Dentysta","Wyrywanie",true,new Date(2021,4,3),new Date(2021,5,1)) {
        });
    }


    @GetMapping("/all")
    public List<TaskRepository> getAll(){
        return  taskRepository;
    }

    @GetMapping
    public TaskRepository getById(@RequestParam int id){
        Optional<TaskRepository> first=taskRepository.stream().filter(element -> element.getId()==id).findFirst();
        return  first.get();
    }
    @PostMapping
    public boolean addTask(@RequestBody TaskRepository taskRepositoryV){
        return taskRepository.add(taskRepositoryV);
    }
    @PutMapping
    public boolean updateTask(@RequestBody TaskRepository taskRepositoryV) {
        return taskRepository.add(taskRepositoryV);
    }

    @DeleteMapping
    public boolean deleteTask(@RequestParam int id) {
        return taskRepository.removeIf(element -> element.getId() == id);

    }
    }

