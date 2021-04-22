package pl.team.touchtalk.entities;

public class LoginResponseBody {
    private final String token;
    private final String user;

    public LoginResponseBody(String token, String message) {
        this.token = token;
        this.user = message;
    }

    public String getToken() {
        return token;
    }

    public String getUser() {
        return user;
    }
}
