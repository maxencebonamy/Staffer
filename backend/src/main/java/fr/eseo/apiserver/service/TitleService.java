package fr.eseo.apiserver.service;

import fr.eseo.apiserver.model.Salary;
import fr.eseo.apiserver.model.Title;
import fr.eseo.apiserver.repository.TitleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class TitleService {

	@Autowired
	private TitleRepository titleRepository;

	@Autowired
	private EmployeeService employeeService;

	public List<Title> getAllTitles(int employeeId) {
		return titleRepository.findByEmployeeId(employeeId);
	}

	public Title getLastTitle(int employeeId) {
		return titleRepository.findLastByEmployeeId(employeeId);
	}

	public Title getTitle(int employeeId, LocalDate fromDate) {
		return titleRepository.findByEmployeeIdAndFromDate(employeeId, fromDate);
	}

	public Title createTitle(int employeeId, LocalDate fromDate, String title) {
		var lastTitle = getLastTitle(employeeId);

		if (lastTitle != null) {
			if (lastTitle.fromDate().isAfter(fromDate)) {
				throw new IllegalArgumentException("The starting date of the new title must be after the starting date of the last title");
			}
			lastTitle.toDate(fromDate);
			titleRepository.save(lastTitle);
		}

		var employee =  employeeService.getEmployeeById(employeeId);
		if (employee == null) {
			throw new IllegalArgumentException("The employee does not exist");
		}

		var newTitle = new Title();
		newTitle.employee(employee);
		newTitle.fromDate(fromDate);
		newTitle.title(title);
		newTitle.toDate(LocalDate.parse("9999-01-01"));
		return titleRepository.save(newTitle);
	}

}
