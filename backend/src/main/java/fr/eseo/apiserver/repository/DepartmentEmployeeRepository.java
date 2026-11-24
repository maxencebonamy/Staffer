package fr.eseo.apiserver.repository;

import fr.eseo.apiserver.model.DepartmentEmployee;
import fr.eseo.apiserver.model.id.DepartmentEmployeeId;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface DepartmentEmployeeRepository extends JpaRepository<DepartmentEmployee, DepartmentEmployeeId>  {

	@Query(value = "SELECT e FROM DepartmentEmployee e WHERE e.department.id = :departmentId")
	Page<DepartmentEmployee> findByDepartmentId(String departmentId, Pageable pageable);

	@Query(value = "SELECT e FROM DepartmentEmployee e WHERE e.department.id = :departmentId AND e.toDate >= now()")
	Page<DepartmentEmployee> findLastByDepartmentId(String departmentId, Pageable pageable);

	@Query(value = "SELECT e FROM DepartmentEmployee e WHERE e.employee.id = :employeeId ORDER BY e.toDate DESC FETCH FIRST 1 ROW ONLY")
	DepartmentEmployee findLastByEmployeeId(int employeeId);

	@Query(value = "SELECT e FROM DepartmentEmployee e WHERE e.employee.id = :employeeId ORDER BY e.toDate DESC")
	List<DepartmentEmployee> findByEmployeeId(int employeeId);

}
