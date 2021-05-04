package pl.team.touchtalk.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.lang.Nullable;
import pl.team.touchtalk.enums.MessageType;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.sql.Timestamp;
/*
 * Message POJO
 *
 * @Author Jakub Stawowy,
 * @Author Paweł Szydło
 * @Author Grzegorz Szydło
 * @Author Bartosz Szlęzak
 * @Author Łukasz Stolarz
 * @Version 2.0
 * @Since 2021-04-06
 * */
@Entity
@Table(name = "messages")
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotNull
    private String content;

    @NotNull
    @Column(name = "sent_at")
    private Timestamp sentAt;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "sender_id")
    @JsonIgnore
    private User sender;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "receiver_id")
    @JsonIgnore
    private User receiver;

    @Enumerated(EnumType.STRING)
    private MessageType type;

    @OneToOne(mappedBy = "message")
    private File file;
    /*
    * constructor
    *
    * @Param content
    * @Param file - when no file is attached to message then value is null
    * @Param sender
    * */
    public Message(@NotNull String content, @Nullable File file, MessageType type, User sender, User receiver) {
        this.content = content;
        this.file = file;
        this.sender = sender;
        this.receiver = receiver;
        this.type = type;
    }

    public Message() {
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

    public Timestamp getSentAt() {
        return sentAt;
    }

    public void setSentAt(Timestamp sentAt) {
        this.sentAt = sentAt;
    }

    public User getSender() {
        return sender;
    }

    public void setSender(User sender) {
        this.sender = sender;
    }

    public User getReceiver() {
        return receiver;
    }

    public void setReceiver(User receiver) {
        this.receiver = receiver;
    }

    public MessageType getType() {
        return type;
    }

    public void setType(MessageType type) {
        this.type = type;
    }

    public File getFile() {
        return file;
    }

    public void setFile(File file) {
        this.file = file;
    }
}
