package fr.eseo.apiserver.controller;

import fr.eseo.apiserver.model.DepartmentManager;
import fr.eseo.apiserver.service.DepartmentManagerService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/v1.0/departments/{id}/managers")
@Tag(name = "departments")
public class DepartmentManagerController {

	@Autowired
	private DepartmentManagerService departmentManagerService;

	@GetMapping
	public ResponseEntity<List<DepartmentManager>> getAllManagers(@PathVariable String id) {
		var salaries = departmentManagerService.getAllManagers(id);
		return ResponseEntity.ok(salaries);
	}

	@GetMapping("/last")
	public ResponseEntity<DepartmentManager> getLastManager(@PathVariable String id) {
		var salary = departmentManagerService.getLastManager(id);
		return ResponseEntity.ok(salary);
	}

}
