package fr.eseo.apiserver.model.id;

import fr.eseo.apiserver.model.Employee;
import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.time.LocalDate;

@Embeddable
@Getter
@Setter
public class TitleId implements Serializable {

	private Employee employee;

	private String title;

	private LocalDate fromDate;

}
