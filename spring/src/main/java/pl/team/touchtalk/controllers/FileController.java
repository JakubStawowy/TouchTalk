package pl.team.touchtalk.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.team.touchtalk.dao.FileRepository;
import pl.team.touchtalk.model.File;

@RestController
public class FileController {
    private final FileRepository fileRepository;

    @Autowired
    public FileController(FileRepository fileRepository) {
        this.fileRepository = fileRepository;
    }


    @GetMapping("/test")
    public Iterable<File> get(){
        return fileRepository.findAll();
    }
}
