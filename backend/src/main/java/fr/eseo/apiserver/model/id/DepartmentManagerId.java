package fr.eseo.apiserver.model.id;

import fr.eseo.apiserver.model.Department;
import fr.eseo.apiserver.model.Employee;
import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Embeddable
@Getter
@Setter
public class DepartmentManagerId implements Serializable {

	private Employee employee;

	private Department department;

}
