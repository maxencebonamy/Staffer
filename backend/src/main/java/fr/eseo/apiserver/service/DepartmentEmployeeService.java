package fr.eseo.apiserver.service;

import fr.eseo.apiserver.model.DepartmentEmployee;
import fr.eseo.apiserver.repository.DepartmentEmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class DepartmentEmployeeService {

	@Autowired
	private DepartmentEmployeeRepository departmentEmployeeRepository;

	@Autowired
	private EmployeeService employeeService;

	@Autowired
	private DepartmentService departmentService;

	public Page<DepartmentEmployee> getAllEmployees(String departmentId, Pageable pageable) {
		return departmentEmployeeRepository.findByDepartmentId(departmentId, pageable);
	}

	public Page<DepartmentEmployee> getLastEmployees(String departmentId, Pageable pageable) {
		return departmentEmployeeRepository.findLastByDepartmentId(departmentId, pageable);
	}

	public List<DepartmentEmployee> getEmployeeDepartments(int employeeId) {
		return departmentEmployeeRepository.findByEmployeeId(employeeId);
	}

	public DepartmentEmployee getLastEmployeeDepartment(int employeeId) {
		return departmentEmployeeRepository.findLastByEmployeeId(employeeId);
	}

	public DepartmentEmployee createDepartmentEmployee(String departmentId, int employeeId, LocalDate fromDate) {
		var lastDepartmentEmployee = departmentEmployeeRepository.findLastByEmployeeId(employeeId);

		if (lastDepartmentEmployee != null) {
			if (lastDepartmentEmployee.fromDate().isAfter(fromDate)) {
				throw new IllegalArgumentException("The starting date of the new department employee must be after the starting date of the last department employee");
			}
			if (lastDepartmentEmployee.department().id().equals(departmentId)) {
				throw new IllegalArgumentException("The employee is already in this department");
			}
			lastDepartmentEmployee.toDate(fromDate);
			departmentEmployeeRepository.save(lastDepartmentEmployee);
		}

		var employee =  employeeService.getEmployeeById(employeeId);
		if (employee == null) {
			throw new IllegalArgumentException("The employee does not exist");
		}

		var department = departmentService.getDepartmentById(departmentId);
		if (department == null) {
			throw new IllegalArgumentException("The department does not exist");
		}

		var newDepartmentEmployee = new DepartmentEmployee();
		newDepartmentEmployee.department(department);
		newDepartmentEmployee.employee(employee);
		newDepartmentEmployee.fromDate(fromDate);
		newDepartmentEmployee.toDate(LocalDate.parse("9999-01-01"));
		return departmentEmployeeRepository.save(newDepartmentEmployee);
	}

}
