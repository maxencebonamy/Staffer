package fr.eseo.apiserver.validator.salary;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;

import java.time.LocalDate;

@Getter
public class CreateSalaryRequest {

	@JsonProperty
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
	@NotNull(message = "The starting date is required")
	private LocalDate fromDate;

	@JsonProperty
	@NotNull(message = "The salary value is required")
	private int salary;

}
