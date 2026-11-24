package fr.eseo.apiserver.model.id;

import fr.eseo.apiserver.model.Employee;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.time.LocalDate;

@Embeddable
@Getter
@Setter
public class SalaryId implements Serializable {

	private Employee employee;

	private LocalDate fromDate;

}
