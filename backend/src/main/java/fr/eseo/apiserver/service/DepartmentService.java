package fr.eseo.apiserver.service;

import fr.eseo.apiserver.model.Department;
import fr.eseo.apiserver.repository.DepartmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DepartmentService {

	@Autowired
	private DepartmentRepository departmentRepository;

	@Autowired
	private IdGeneratorService idGeneratorService;

	public List<Department> getAllDepartments() {
		return departmentRepository.findAll();
	}

	public Department getDepartmentById(String id) {
		return departmentRepository.findById(id).orElse(null);
	}

	public Department createDepartment(Department department) {
		department.id(idGeneratorService.generateNextDepartmentId());
		return departmentRepository.save(department);
	}

	public Department updateDepartment(String id, Department department) {
		if (departmentRepository.existsById(id)) {
			department.id(id);
			return departmentRepository.save(department);
		}
		return null;
	}

	public Department partialUpdateDepartment(String id, Department department) {
		var existingDepartment = departmentRepository.findById(id).orElse(null);
		if (existingDepartment != null) {
			if (department.name() != null) existingDepartment.name(department.name());
			return departmentRepository.save(existingDepartment);
		}
		return null;
	}

	public void deleteDepartment(String id) {
		departmentRepository.deleteById(id);
	}
}