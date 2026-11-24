package fr.eseo.apiserver.repository;

import fr.eseo.apiserver.model.Department;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface DepartmentRepository extends JpaRepository<Department, String> {

	@Query(value = "SELECT MAX(id) FROM Department ")
	String findLastId();

}
