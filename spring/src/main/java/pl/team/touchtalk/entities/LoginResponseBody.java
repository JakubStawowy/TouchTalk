package pl.team.touchtalk.entities;

public class LoginResponseBody {
    private final String token;
    private final User user;

    public LoginResponseBody(String token, User user) {
        this.token = token;
        this.user = user;
    }

    public String getToken() {
        return token;
    }

    public User getUser() {
        return user;
    }
}
