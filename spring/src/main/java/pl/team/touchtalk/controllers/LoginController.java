package pl.team.touchtalk.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.Nullable;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.web.bind.annotation.*;
import pl.team.touchtalk.entities.Log;
import pl.team.touchtalk.entities.User;
import pl.team.touchtalk.services.UserService;

import javax.servlet.http.HttpSession;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(value = "/api")
public class LoginController {

    private final UserService userService;

    @Autowired
    public LoginController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping(value = "/login")
    @Nullable
    public User loginUser(HttpSession session, @RequestParam("email") String email, @RequestParam("password") String password) {

        String salt = userService.getUserRepository().getSaltByEmail(email);
        User loggedUser = userService.getUserRepository().getUserByEmailAndPassword(
                email,
                BCrypt.hashpw(
                        password,
                        salt
                )
        );

        if(loggedUser==null)
            return null;

        loggedUser.setLogged(true);
        userService.getUserRepository().save(loggedUser);
        userService.getLogRepository().save(new Log(
                session.getId(),
                loggedUser
        ));
        return loggedUser;
    }

    @PutMapping(value = "/logout")
    @Nullable
    public User logoutUser(@RequestParam("userId")Long id) {
        Optional<User> loggedUser = userService.getUserRepository().findById(id);
        loggedUser.ifPresent(user->{
            user.setLogged(false);
            userService.getUserRepository().save(user);
        });
        return loggedUser.orElse(null);
    }
}
