package pl.team.touchtalk.model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "files")
public class File {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Lob
    private String fileUrl;

    @OneToOne(cascade = CascadeType.ALL)
    private Message message;

    public File(@NotNull String fileUrl, Message message) {
        this.fileUrl = fileUrl;
        this.message = message;
    }

    public File() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }


    public Message getMessage() {
        return message;
    }

    public void setMessage(Message message) {
        this.message = message;
    }

    public String getFileUrl() {
        return fileUrl;
    }

    public void setFileUrl(String fileUrl) {
        this.fileUrl = fileUrl;
    }
}
