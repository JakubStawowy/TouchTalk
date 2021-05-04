package pl.team.touchtalk.dto;

import pl.team.touchtalk.enums.MessageType;

import java.io.Serializable;
import java.sql.Timestamp;

public class MessageTransferObject implements Serializable {

    private String content;
    private Long sender;
    private Long receiver;
    private Timestamp date;
    private Receiver receiverBody;

    public MessageTransferObject(String content, MessageType type, Long sender, Long receiver, Timestamp date, Receiver receiverBody) {
        this.content = content;
        this.sender = sender;
        this.receiver = receiver;
        this.date = date;
        this.receiverBody = receiverBody;
    }

    public MessageTransferObject() {
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

    public Receiver getReceiverBody() {
        return receiverBody;
    }

    public void setReceiverBody(Receiver receiverBody) {
        this.receiverBody = receiverBody;
    }
}
