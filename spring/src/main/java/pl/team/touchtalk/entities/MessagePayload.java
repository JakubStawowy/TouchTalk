package pl.team.touchtalk.entities;

import java.sql.Timestamp;

public class MessagePayload {
    private String content;
    private Long sender;
    private Long receiver;
    private Timestamp date;

    public MessagePayload(String content, Long sender, Long receiver, Timestamp date) {
        this.content = content;
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
