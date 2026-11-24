package fr.eseo.apiserver.repository;

import fr.eseo.apiserver.model.Title;
import fr.eseo.apiserver.model.id.TitleId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;

public interface TitleRepository extends JpaRepository<Title, TitleId> {

	List<Title> findByEmployeeId(int employeeId);

	Title findByEmployeeIdAndFromDate(int employeeId, LocalDate fromDate);

	@Query("SELECT t FROM Title t WHERE t.employee.id = :employeeId ORDER BY t.toDate DESC FETCH FIRST 1 ROW ONLY")
	Title findLastByEmployeeId(int employeeId);

}
