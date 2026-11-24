package fr.eseo.apiserver.service;

import fr.eseo.apiserver.model.Salary;
import fr.eseo.apiserver.repository.SalaryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class SalaryService {

	@Autowired
	private SalaryRepository salaryRepository;

	@Autowired
	private EmployeeService employeeService;

	public List<Salary> getAllSalaries(int employeeId) {
		return salaryRepository.findByEmployeeId(employeeId);
	}

	public Salary getLastSalary(int employeeId) {
		return salaryRepository.findLastByEmployeeId(employeeId);
	}

	public Salary getSalary(int employeeId, LocalDate fromDate) {
		return salaryRepository.findByEmployeeIdAndFromDate(employeeId, fromDate);
	}

	public Salary createSalary(int employeeId, LocalDate fromDate, int salary) {
		var lastSalary = getLastSalary(employeeId);

		if (lastSalary != null) {
			if (lastSalary.fromDate().isAfter(fromDate)) {
				throw new IllegalArgumentException("The starting date of the new salary must be after the starting date of the last salary");
			}
			lastSalary.toDate(fromDate);
			salaryRepository.save(lastSalary);
		}

		var employee =  employeeService.getEmployeeById(employeeId);
		if (employee == null) {
			throw new IllegalArgumentException("The employee does not exist");
		}

		var newSalary = new Salary();
		newSalary.employee(employee);
		newSalary.fromDate(fromDate);
		newSalary.salary(salary);
		newSalary.toDate(LocalDate.parse("9999-01-01"));
		return salaryRepository.save(newSalary);
	}

}
