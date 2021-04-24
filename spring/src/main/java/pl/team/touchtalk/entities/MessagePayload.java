package pl.team.touchtalk.entities;

import pl.team.touchtalk.enums.MessageType;

import java.sql.Timestamp;

public class MessagePayload {
    private String content;
    private MessageType type;
    private Long sender;
    private Long receiver;
    private Timestamp date;

    public MessagePayload(String content, MessageType type, Long sender, Long receiver, Timestamp date) {
        this.content = content;
        this.type = type;
        this.sender = sender;
        this.receiver = receiver;
        this.date = date;
    }

    public MessagePayload() {
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public MessageType getType() {
        return type;
    }

    public void setType(MessageType type) {
        this.type = type;
    }

    public Long getSender() {
        return sender;
    }

    public void setSender(Long sender) {
        this.sender = sender;
    }

    public Long getReceiver() {
        return receiver;
    }

    public void setReceiver(Long receiver) {
        this.receiver = receiver;
    }

    public Timestamp getDate() {
        return date;
    }

    public void setDate(Timestamp date) {
        this.date = date;
    }
}
