package fr.eseo.apiserver.controller;

import com.fasterxml.jackson.annotation.JsonFormat;
import fr.eseo.apiserver.model.Salary;
import fr.eseo.apiserver.service.SalaryService;
import fr.eseo.apiserver.validator.salary.CreateSalaryRequest;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/v1.0/employees/{id}/salaries")
@Tag(name = "salaries")
public class SalaryController {

	@Autowired
	private SalaryService salaryService;

	@GetMapping
	public ResponseEntity<List<Salary>> getAllSalaries(@PathVariable int id) {
		var salaries = salaryService.getAllSalaries(id);
		return ResponseEntity.ok(salaries);
	}

	@GetMapping("/last")
	public ResponseEntity<Salary> getSalary(@PathVariable int id) {
		var salary = salaryService.getLastSalary(id);
		if (salary == null) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok(salary);
	}

	@GetMapping("/{fromDate}")
	public ResponseEntity<Salary> getSalary(@PathVariable int id, @PathVariable @JsonFormat(pattern = "yyyy-MM-dd") LocalDate fromDate) {
		var salary = salaryService.getSalary(id, fromDate);
		if (salary == null) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok(salary);
	}

	@PostMapping
	public ResponseEntity<Salary> createSalary(@PathVariable int id, @Valid @RequestBody CreateSalaryRequest body) {
		try {
			var newSalary = salaryService.createSalary(id, body.fromDate(), body.salary());
			return ResponseEntity.ok(newSalary);
		} catch (IllegalArgumentException e) {
			return ResponseEntity.badRequest().build();
		}
	}

}
