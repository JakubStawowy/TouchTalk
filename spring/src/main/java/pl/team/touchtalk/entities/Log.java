package pl.team.touchtalk.entities;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.sql.Timestamp;

/*
 * Log POJO
 *
 * @Author Jakub Stawowy
 * @Version 1.0
 * @Since 2021-04-06
 * */
@Entity
@Table(name = "user_logs")
public class Log implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "session_id")
    private String sessionId;

    @NotNull
    @Column(name = "log_time")
    private Timestamp logTime;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id")
    private User user;

    @PrePersist
    public void setLogTime() {
        logTime = new Timestamp(System.currentTimeMillis());
    }

    /*
    * constructor
    *
    * @Param sessionId
    * @Param user - user that is logging on current session
    * */
    public Log(@NotNull String sessionId, User user) {
        this.sessionId = sessionId;
        this.user = user;
    }

    public Log(){}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSessionId() {
        return sessionId;
    }

    public void setSessionId(String sessionId) {
        this.sessionId = sessionId;
    }

    public Timestamp getLogTime() {
        return logTime;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
