package pl.team.touchtalk.dto;

import pl.team.touchtalk.model.Group;

import java.io.Serializable;
import java.util.Set;

public class GroupTransferObject implements Serializable, Receiver {

    private final Long id;
    private final String name;
    private final String code;
    private final Set<UserTransferObject> users;

    public GroupTransferObject(Group group, Set<UserTransferObject> users) {
        this.id = group.getId();
        this.name = group.getName();
        this.code = group.getCode();
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
