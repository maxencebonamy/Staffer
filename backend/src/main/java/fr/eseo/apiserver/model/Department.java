package fr.eseo.apiserver.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.*;
import org.hibernate.validator.constraints.Length;

@Entity
@Table(name = "departments")
@Getter
@Setter
public class Department {

	@Id
	@Column(name = "dept_no", columnDefinition = "char(4)")
	@JsonProperty(access = JsonProperty.Access.READ_ONLY)
	@Pattern(regexp = "d[0-9]{3}", message = "Department ID must be in the format dXXX")
	private String id;

	@Column(name = "dept_name", columnDefinition = "varchar(40)", unique = true)
	@JsonProperty
	@Length(min = 1, max = 40, message = "Department name must be between 1 and 40 characters")
	@NotNull(message = "The name is required")
	private String name;

}
