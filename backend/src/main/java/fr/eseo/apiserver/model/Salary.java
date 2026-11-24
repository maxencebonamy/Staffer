package fr.eseo.apiserver.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import fr.eseo.apiserver.model.id.SalaryId;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;

@Entity
@Table(name = "salaries")
@IdClass(SalaryId.class)
@Getter
@Setter
public class Salary {

	@Id
	@ManyToOne
	@JoinColumn(name = "emp_no", columnDefinition = "int", insertable = false, updatable = false)
	@JsonProperty
	private Employee employee;

	@Column(name = "salary", columnDefinition = "int")
	@JsonProperty
	@NotNull(message = "The salary value is required")
	private int salary;

	@Id
	@JsonProperty
	@Column(name = "from_date", columnDefinition = "date")
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
	private LocalDate fromDate;

	@Column(name = "to_date", columnDefinition = "date")
	@JsonProperty
	@NotNull(message = "The ending date is required")
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
	private LocalDate toDate;

}
