package fr.eseo.apiserver.validator.departmentEmployee;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;

import java.time.LocalDate;

@Getter
public class CreateDepartmentEmployeeRequest {

	@JsonProperty
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
	@NotNull(message = "The starting date is required")
	private LocalDate fromDate;

	@JsonProperty
	@NotNull(message = "employeeId is required")
	private int employeeId;

}
