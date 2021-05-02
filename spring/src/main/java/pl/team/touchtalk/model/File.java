package pl.team.touchtalk.model;

import javax.persistence.*;
import javax.sql.rowset.serial.SerialBlob;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "files")
public class File {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private SerialBlob byteFile;

    @OneToOne(cascade = CascadeType.ALL)
    private Message message;

    public File(@NotNull SerialBlob byteFile, Message message) {
        this.byteFile = byteFile;
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

    public SerialBlob getByteFile() {
        return byteFile;
    }

    public void setByteFile(SerialBlob byteFile) {
        this.byteFile = byteFile;
    }

    public Message getMessage() {
        return message;
    }

    public void setMessage(Message message) {
        this.message = message;
    }
}
