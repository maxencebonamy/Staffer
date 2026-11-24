package fr.eseo.apiserver.validator.title;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;

import java.time.LocalDate;

@Getter
public class CreateTitleRequest {

	@JsonProperty
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
	@NotNull(message = "The starting date is required")
	private LocalDate fromDate;

	@JsonProperty
	@NotNull(message = "The title value is required")
	private String title;

}
