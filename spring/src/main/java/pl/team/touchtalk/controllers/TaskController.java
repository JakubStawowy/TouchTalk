package pl.team.touchtalk.controllers;

import org.springframework.web.bind.annotation.*;
import pl.team.touchtalk.dto.TaskTransferObject;
//import pl.team.touchtalk.dao.TaskRepository;

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


    private List<TaskTransferObject> taskTransferObject;

    public TaskController(){
        taskTransferObject = new ArrayList<>();
        taskTransferObject.add(new TaskTransferObject(1, "Zadanie 1"," Idz spać",false, new Date(121,5,3),new Date(2021,5,10)));

        };



    @GetMapping("/all")
    public List<TaskTransferObject> getAll(){
        return  taskTransferObject;
    }

    @GetMapping
    public TaskTransferObject getById(@RequestParam int id){
        Optional<TaskTransferObject> first=taskTransferObject.stream().filter(element -> element.getId()==id).findFirst();
        return (TaskTransferObject) first.get();
    }
    @PostMapping
    public boolean addTask(@RequestBody TaskTransferObject taskRepositoryV){
        return taskTransferObject.add((TaskTransferObject) taskRepositoryV);
    }
    @PutMapping
    public boolean updateTask(@RequestBody TaskTransferObject taskTransferObjectV) {
        return taskTransferObject.add(taskTransferObjectV);
    }

    @DeleteMapping
    public boolean deleteTask(@RequestParam int id) {
        return taskTransferObject.removeIf(element -> element.getId() == id);

    }
    }

