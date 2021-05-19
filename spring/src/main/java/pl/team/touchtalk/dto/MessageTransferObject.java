package pl.team.touchtalk.dto;

import com.sun.istack.Nullable;

import javax.persistence.Lob;
import java.io.Serializable;
import java.sql.Timestamp;

public class MessageTransferObject implements Serializable {

    private Long id;
    private String content;
    private Long sender;
    private Long receiver;
    private Timestamp date;
    private Receiver receiverBody;
    @Lob
    private String imageURL;

    public MessageTransferObject(Long id, String content, Long sender, Long receiver, Timestamp date, Receiver receiverBody, @Nullable String imageURL) {
        this.id = id;
        this.content = content;
        this.sender = sender;
        this.receiver = receiver;
        this.date = date;
        this.receiverBody = receiverBody;
        this.imageURL = imageURL;
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

    public String getImageURL() {
        return imageURL;
    }

    public void setImageURL(String imageURL) {
        this.imageURL = imageURL;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
