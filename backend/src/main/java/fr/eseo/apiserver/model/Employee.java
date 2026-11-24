package fr.eseo.apiserver.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "employees")
@Getter
@Setter
public class Employee {

	@Id
	@Column(name = "emp_no", columnDefinition = "int")
	@JsonProperty(access = JsonProperty.Access.READ_ONLY)
	private int id;

	@Column(name = "birth_date", columnDefinition = "date")
	@JsonProperty
	@Past(message = "The birth date must be in the past")
	@NotNull(message = "The birth date is required")
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
	private LocalDate birthDate;

	@Column(name = "first_name", columnDefinition = "varchar(14)")
	@JsonProperty
	@Length(min = 1, max = 14, message = "The first name must be between 1 and 14 characters")
	@NotNull(message = "The first name is required")
	private String firstName;

	@Column(name = "last_name", columnDefinition = "varchar(16)")
	@JsonProperty
	@Length(min = 1, max = 16, message = "The last name must be between 1 and 16 characters")
	@NotNull(message = "The last name is required")
	private String lastName;

	@Column(name = "hire_date", columnDefinition = "date")
	@JsonProperty
	@Past(message = "The hire date must be in the past")
	@NotNull(message = "The hire date is required")
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
	private LocalDate hireDate;

	@OneToMany(mappedBy = "employee", cascade = CascadeType.ALL)
	private List<Salary> salaries;

	@OneToMany(mappedBy = "employee", cascade = CascadeType.ALL)
	private List<Title> title;

}
