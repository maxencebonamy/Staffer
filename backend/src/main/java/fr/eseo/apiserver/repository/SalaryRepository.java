package fr.eseo.apiserver.repository;

import fr.eseo.apiserver.model.Salary;
import fr.eseo.apiserver.model.id.SalaryId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;

public interface SalaryRepository extends JpaRepository<Salary, SalaryId> {

	List<Salary> findByEmployeeId(int employeeId);

	Salary findByEmployeeIdAndFromDate(int employeeId, LocalDate fromDate);

	@Query("SELECT s FROM Salary s WHERE s.employee.id = :employeeId ORDER BY s.toDate DESC FETCH FIRST 1 ROW ONLY")
	Salary findLastByEmployeeId(int employeeId);

}
