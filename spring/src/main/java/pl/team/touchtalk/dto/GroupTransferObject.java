package pl.team.touchtalk.dto;

import java.io.Serializable;
import java.util.Set;

public class GroupTransferObject implements Serializable, Receiver {

    private final Long id;
    private final String name;
    private final String code;
    private final Set<UserTransferObject> users;

    public GroupTransferObject(Long id, String name, String code, Set<UserTransferObject> users) {
        this.id = id;
        this.name = name;
        this.code = code;
        this.users = users;
    }

    public String getName() {
        return name;
    }

    public String getCode() {
        return code;
    }

    public Set<UserTransferObject> getUsers() {
        return users;
    }

    public Long getId() {
        return id;
    }
}
