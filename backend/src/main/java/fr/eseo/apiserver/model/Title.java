package fr.eseo.apiserver.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import fr.eseo.apiserver.model.id.TitleId;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name = "titles")
@IdClass(TitleId.class)
@Getter
@Setter
public class Title {

	@Id
	@ManyToOne
	@JoinColumn(name = "emp_no", columnDefinition = "int", insertable = false, updatable = false)
	@JsonProperty
	private Employee employee;

	@Id
	@Column(name = "title", columnDefinition = "varchar(50)")
	@JsonProperty
	private String title;

	@Id
	@Column(name = "from_date", columnDefinition = "date")
	@JsonProperty
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
	private LocalDate fromDate;

	@Column(name = "to_date", columnDefinition = "date")
	@JsonProperty
	@NotNull(message = "The ending date is required")
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
	private LocalDate toDate;

}
