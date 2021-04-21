package pl.team.touchtalk.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.lang.Nullable;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.sql.Timestamp;
import java.util.Set;

@Entity
@Table(name = "messages")
public class Message implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private String content;

    @Nullable
    private String file;

    @NotNull
    @Column(name = "sent_at")
    private Timestamp sentAt;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "sender_id")
    private User sender;

    @JsonIgnore
    @ManyToMany(mappedBy = "messagesReceived")
    private Set<User> receivers;
    
    @ManyToMany(mappedBy = "message")
    private Set<Group> groups;

    public Message(@NotNull String content, @Nullable String file, User sender) {
        this.content = content;
        this.file = file;
        this.sender = sender;
    }

    public Message() {
    }

    public Timestamp getSentAt() {
        return sentAt;
    }

    @PrePersist
    public void setSentAt() {
        this.sentAt = new Timestamp(System.currentTimeMillis());
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    @Nullable
    public String getFile() {
        return file;
    }

    public void setFile(@Nullable String file) {
        this.file = file;
    }

    public User getSender() {
        return sender;
    }

    public void setSender(User sender) {
        this.sender = sender;
    }
}
