package fr.eseo.apiserver.controller;

import fr.eseo.apiserver.model.Department;
import fr.eseo.apiserver.service.DepartmentService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.bind.Name;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.List;

@RestController
@RequestMapping("/v1.0/departments")
@Tag(name = "departments")
public class DepartmentController {

	@Autowired
	private DepartmentService departmentService;

	@GetMapping("")
	public ResponseEntity<List<Department>> getAllDepartments() {
		var departments = departmentService.getAllDepartments();
		return ResponseEntity.ok(departments);
	}

	@GetMapping("/{id}")
	public ResponseEntity<Department> getDepartmentById(@PathVariable String id) {
		var department = departmentService.getDepartmentById(id);
		if (department != null) {
			return ResponseEntity.ok(department);
		}
		return ResponseEntity.notFound().build();
	}

	@PostMapping
	public ResponseEntity<Department> createDepartment(@Valid @RequestBody Department department) {
		try {
			var createdDepartment = departmentService.createDepartment(department);

			var location = ServletUriComponentsBuilder
					.fromCurrentRequestUri()
					.path("/{id}")
					.buildAndExpand(createdDepartment.id())
					.toUri();

			return ResponseEntity.created(location).body(createdDepartment);
		} catch (DataIntegrityViolationException e) {
			return ResponseEntity.status(HttpStatus.CONFLICT).build();
		}
	}

	@PutMapping("/{id}")
	public ResponseEntity<Department> updateDepartment(@PathVariable String id, @Valid @RequestBody Department department) {
		try {
			var updatedDepartment = departmentService.updateDepartment(id, department);
			if (updatedDepartment != null) {
				return ResponseEntity.ok(updatedDepartment);
			}
			return ResponseEntity.notFound().build();
		} catch (DataIntegrityViolationException e) {
			return ResponseEntity.status(HttpStatus.CONFLICT).build();
		}
	}

	@PatchMapping("/{id}")
	public ResponseEntity<Department> partialUpdateDepartment(@PathVariable String id, @Valid @RequestBody Department department) {
		try {
			var updatedDepartment = departmentService.partialUpdateDepartment(id, department);
			if (updatedDepartment != null) {
				return ResponseEntity.ok(updatedDepartment);
			}
			return ResponseEntity.notFound().build();
		} catch (DataIntegrityViolationException e) {
			return ResponseEntity.status(HttpStatus.CONFLICT).build();
		}
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteDepartment(@PathVariable String id) {
		departmentService.deleteDepartment(id);
		return ResponseEntity.noContent().build();
	}

}
