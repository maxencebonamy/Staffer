package fr.eseo.apiserver.service;

import fr.eseo.apiserver.model.Employee;
import fr.eseo.apiserver.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class EmployeeService {

	@Autowired
	private EmployeeRepository employeeRepository;

	@Autowired
	private IdGeneratorService idGeneratorService;

	public Page<Employee> getAllEmployees(String search, Pageable pageable) {
		return employeeRepository.searchEmployees(search, pageable);
	}

	public Employee getEmployeeById(int id) {
		return employeeRepository.findById(id).orElse(null);
	}

	public Employee createEmployee(Employee employee) {
		employee.id(idGeneratorService.generateNextEmployeeId());
		return employeeRepository.save(employee);
	}

	public Employee updateEmployee(int id, Employee employee) {
		if (employeeRepository.existsById(id)) {
			employee.id(id);
			return employeeRepository.save(employee);
		}
		return null;
	}

	public Employee partialUpdateEmployee(int id, Employee employee) {
		var existingEmployee = employeeRepository.findById(id).orElse(null);
		if (existingEmployee != null) {
			if (employee.birthDate() != null) existingEmployee.birthDate(employee.birthDate());
			if (employee.firstName() != null) existingEmployee.firstName(employee.firstName());
			if (employee.lastName() != null) existingEmployee.lastName(employee.lastName());
			if (employee.hireDate() != null) existingEmployee.hireDate(employee.hireDate());
			return employeeRepository.save(existingEmployee);
		}
		return null;
	}

	public void deleteEmployee(int id) {
		employeeRepository.deleteById(id);
	}

}