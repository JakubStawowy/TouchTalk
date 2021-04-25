package pl.team.touchtalk.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.web.bind.annotation.*;
import pl.team.touchtalk.entities.LoginResponseBody;
import pl.team.touchtalk.entities.User;
import pl.team.touchtalk.repositories.UserRepository;
import pl.team.touchtalk.services.JsonWebTokenProvider;

import java.util.Optional;

/*
 * LoginController class
 *
 * @Author Jakub Stawowy
 * @Version 1.1
 * @Since 2021-04-06
 * */
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(value = "/api")
public class LoginController {

    private final UserRepository repository;
    private final JsonWebTokenProvider webTokenProvider;

    /*
     * Constructor
     * @Param userService this service provides UserRepository and LogRepository
     * */
    @Autowired
    public LoginController(UserRepository repository, JsonWebTokenProvider webTokenProvider) {
        this.repository = repository;
        this.webTokenProvider = webTokenProvider;
    }

    /*
     * loginUser method
     *
     * @Param session HttpSession is used to get sessionId
     * @RequestParam email
     * @RequestParam password
     * @Returns loginResponseEntity (if no user found, method returns null values with 404 HttpStatus)
     * */
    @PostMapping(value = "/login")
    public ResponseEntity<?> loginUser(@RequestParam("email") String email, @RequestParam("password") String password) {

        Optional<String> salt = repository.getSaltByEmail(email);
        if(salt.isPresent()) {

            User loggedUser = repository.getUserByEmailAndPassword(
                    email,
                    BCrypt.hashpw(password, salt.get())
            );

            if(loggedUser==null)
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);

            loggedUser.setLogged(true);
            repository.save(loggedUser);

            return new ResponseEntity<>(
                    new LoginResponseBody(
                            webTokenProvider.generateToken(loggedUser),
                            loggedUser
                    ),
                    HttpStatus.OK
            );
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}