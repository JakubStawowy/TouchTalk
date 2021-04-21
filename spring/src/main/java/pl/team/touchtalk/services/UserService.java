package pl.team.touchtalk.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.team.touchtalk.repositories.LogRepository;
import pl.team.touchtalk.repositories.UserRepository;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final LogRepository logRepository;

    @Autowired
    public UserService(UserRepository userRepository, LogRepository logRepository) {
        this.userRepository = userRepository;
        this.logRepository = logRepository;
    }

    public UserRepository getUserRepository() {
        return userRepository;
    }

    public LogRepository getLogRepository() {
        return logRepository;
    }
}
