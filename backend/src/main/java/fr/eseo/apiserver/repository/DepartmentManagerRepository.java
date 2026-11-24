package fr.eseo.apiserver.repository;

import fr.eseo.apiserver.model.Department;
import fr.eseo.apiserver.model.DepartmentManager;
import fr.eseo.apiserver.model.id.DepartmentManagerId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface DepartmentManagerRepository extends JpaRepository<Department, DepartmentManagerId>  {

	@Query(value = "SELECT m FROM DepartmentManager m WHERE m.department.id = :departmentId")
	List<DepartmentManager> findByDepartmentId(String departmentId);

	@Query(value = "SELECT m FROM DepartmentManager m WHERE m.department.id = :departmentId ORDER BY m.fromDate DESC FETCH FIRST 1 ROW ONLY")
	DepartmentManager findLastByDepartmentId(String departmentId);

}
