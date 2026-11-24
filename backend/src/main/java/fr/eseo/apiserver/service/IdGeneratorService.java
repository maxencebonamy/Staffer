package fr.eseo.apiserver.service;

import fr.eseo.apiserver.repository.DepartmentRepository;
import fr.eseo.apiserver.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class IdGeneratorService {

	@Autowired
	private DepartmentRepository departmentRepository;

	@Autowired
	private EmployeeRepository employeeRepository;

	public String generateNextDepartmentId() {
		var lastId = departmentRepository.findLastId();
		var number = Integer.parseInt(lastId.substring(1)) + 1;
		var formattedNumber = String.format("%03d", number);
		return "d" + formattedNumber;
	}

	public int generateNextEmployeeId() {
		return employeeRepository.findLastId() + 1;
	}

}
