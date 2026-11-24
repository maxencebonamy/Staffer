package fr.eseo.apiserver.repository;

import fr.eseo.apiserver.model.Employee;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface EmployeeRepository extends JpaRepository<Employee, Integer> {

	@Query(value = "SELECT MAX(id) FROM Employee ")
	int findLastId();

	@Query("SELECT e FROM Employee e WHERE :search is null OR e.firstName like %:search% OR e.lastName like %:search% OR CAST(e.id AS string) like %:search% ")
	Page<Employee> searchEmployees(@Param("search") String search, Pageable pageable);

}
