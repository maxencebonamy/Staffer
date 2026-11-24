package fr.eseo.apiserver.service;

import fr.eseo.apiserver.model.DepartmentManager;
import fr.eseo.apiserver.repository.DepartmentManagerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DepartmentManagerService {

	@Autowired
	private DepartmentManagerRepository departmentManagerRepository;

	public List<DepartmentManager> getAllManagers(String departmentId) {
		return departmentManagerRepository.findByDepartmentId(departmentId);
	}

	public DepartmentManager getLastManager(String departmentId) {
		return departmentManagerRepository.findLastByDepartmentId(departmentId);
	}

}
