package pl.team.touchtalk.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.lang.Nullable;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.sql.Timestamp;

/*
 * Message POJO
 *
 * @Author Paweł Szydło,
 * @Author Grzegorz Szydło
 * @Author Bartosz Szlęzak
 * @Author Łukasz Stolarz
 * @Version 1.0
 * @Since 2021-04-30
 * */
@Entity
@Table(name = "group_messages")

public class GroupMessage implements Serializable {

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
    @JsonIgnore
    private User sender;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "group_id")
    @JsonIgnore
    private Group group;

    public GroupMessage() {
    }

    public GroupMessage(@NotNull String content, @Nullable String file, User sender, Group group) {
        this.content = content;
        this.file = file;
        this.sender = sender;
        this.group = group;
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

    public Timestamp getSentAt() {
        return sentAt;
    }

    @PrePersist
    public void setSentAt() {
        this.sentAt = new Timestamp(System.currentTimeMillis());
    }

    public User getSender() {
        return sender;
    }

    public void setSender(User sender) {
        this.sender = sender;
    }

    public Group getGroup() {
        return group;
    }

    public void setGroup(Group group) {
        this.group = group;
    }
}
