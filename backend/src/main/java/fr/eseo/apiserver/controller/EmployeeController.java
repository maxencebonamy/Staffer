package fr.eseo.apiserver.controller;

import fr.eseo.apiserver.model.DepartmentEmployee;
import fr.eseo.apiserver.model.Employee;
import fr.eseo.apiserver.service.DepartmentEmployeeService;
import fr.eseo.apiserver.service.EmployeeService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.List;

@RestController
@RequestMapping("/v1.0/employees")
@Tag(name = "employees")
public class EmployeeController {

	@Autowired
	private EmployeeService employeeService;

	@Autowired
	private DepartmentEmployeeService departmentEmployeeService;

	@GetMapping
	public ResponseEntity<Page<Employee>> getAllEmployees(@RequestParam(required = false) String search, Pageable pageable) {
		var employees = employeeService.getAllEmployees(search, pageable);
		return ResponseEntity.ok(employees);
	}

	@GetMapping("/{id}")
	public ResponseEntity<Employee> getEmployeeById(@PathVariable int id) {
		var employee = employeeService.getEmployeeById(id);
		if (employee != null) {
			return ResponseEntity.ok(employee);
		}
		return ResponseEntity.notFound().build();
	}

	@GetMapping("/{id}/departments")
	public ResponseEntity<List<DepartmentEmployee>> getEmployeeDepartments(@PathVariable int id) {
		var departments = departmentEmployeeService.getEmployeeDepartments(id);
		return ResponseEntity.ok(departments);
	}

	@GetMapping("/{id}/departments/last")
	public ResponseEntity<DepartmentEmployee> getLastEmployeeDepartment(@PathVariable int id) {
		var department = departmentEmployeeService.getLastEmployeeDepartment(id);
		return ResponseEntity.ok(department);
	}

	@PostMapping
	public ResponseEntity<Employee> createEmployee(@Valid @RequestBody Employee employee) {
		var createdEmployee = employeeService.createEmployee(employee);

		var location = ServletUriComponentsBuilder
				.fromCurrentRequestUri()
				.path("/{id}")
				.buildAndExpand(createdEmployee.id())
				.toUri();

		return ResponseEntity.created(location).body(createdEmployee);
	}

	@PutMapping("/{id}")
	public ResponseEntity<Employee> updateEmployee(@PathVariable int id, @Valid @RequestBody Employee employee) {
		var updatedEmployee = employeeService.updateEmployee(id, employee);
		if (updatedEmployee != null) {
			return ResponseEntity.ok(updatedEmployee);
		}
		return ResponseEntity.notFound().build();
	}

	@PatchMapping("/{id}")
	public ResponseEntity<Employee> partialUpdateEmployee(@PathVariable int id, @RequestBody Employee employee) {
		var updatedEmployee = employeeService.partialUpdateEmployee(id, employee);
		if (updatedEmployee != null) {
			return ResponseEntity.ok(updatedEmployee);
		}
		return ResponseEntity.notFound().build();
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteEmployee(@PathVariable int id) {
		employeeService.deleteEmployee(id);
		return ResponseEntity.noContent().build();
	}

}
