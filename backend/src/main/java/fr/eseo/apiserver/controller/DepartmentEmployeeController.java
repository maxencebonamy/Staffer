package fr.eseo.apiserver.controller;

import fr.eseo.apiserver.model.DepartmentEmployee;
import fr.eseo.apiserver.service.DepartmentEmployeeService;
import fr.eseo.apiserver.validator.departmentEmployee.CreateDepartmentEmployeeRequest;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/v1.0/departments/{id}/employees")
@Tag(name = "departments")
public class DepartmentEmployeeController {

	@Autowired
	private DepartmentEmployeeService departmentEmployeeService;

	@GetMapping
	public ResponseEntity<Page<DepartmentEmployee>> getAllEmployees(@PathVariable String id, Pageable pageable){
		var employees = departmentEmployeeService.getAllEmployees(id, pageable);
		return ResponseEntity.ok(employees);
	}

	@GetMapping("/last")
	public ResponseEntity<Page<DepartmentEmployee>> getCurrentEmployees(@PathVariable String id, Pageable pageable) {
		var employees = departmentEmployeeService.getLastEmployees(id, pageable);
		return ResponseEntity.ok(employees);
	}

	@PostMapping
	public ResponseEntity<DepartmentEmployee> createDepartmentEmployee(@PathVariable String id, @Valid @RequestBody CreateDepartmentEmployeeRequest body) {
		try {
			var newDepartmentEmployee = departmentEmployeeService.createDepartmentEmployee(id, body.employeeId(), body.fromDate());
			return ResponseEntity.ok(newDepartmentEmployee);
		} catch (IllegalArgumentException e) {
			return ResponseEntity.badRequest().build();
		}
	}

}
