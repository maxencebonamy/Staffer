package fr.eseo.apiserver.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import fr.eseo.apiserver.model.id.DepartmentManagerId;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name = "dept_manager")
@IdClass(DepartmentManagerId.class)
@Getter
@Setter
public class DepartmentManager {

	@Id
	@ManyToOne
	@JoinColumn(name = "emp_no", columnDefinition = "int", insertable = false, updatable = false)
	@JsonProperty
	private Employee employee;

	@Id
	@ManyToOne
	@JoinColumn(name = "dept_no", columnDefinition = "char(4)", insertable = false, updatable = false)
	@JsonProperty
	private Department department;

	@Column(name = "from_date", columnDefinition = "date")
	@JsonProperty
	@NotNull(message = "The starting date is required")
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
	private LocalDate fromDate;

	@Column(name = "to_date", columnDefinition = "date")
	@JsonProperty
	@NotNull(message = "The ending date is required")
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
	private LocalDate toDate;

}
