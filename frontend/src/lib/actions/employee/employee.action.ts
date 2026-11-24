"use server"

import { simpleFetch, zodFetch } from "@/lib/utils/api"
import type { EmployeeBody, FullEmployee, ManyEmployeesParams } from "./employee.type"
import type { DepartmentEmployee, Employee } from "@/lib/types/employee"
import { DepartmentEmployeeSchema, EmployeeSchema } from "@/lib/types/employee"
import type { Page } from "@/lib/types/page"
import { PageSchema } from "@/lib/types/page"
import { createTitle, getLastTitle } from "../title"
import { createSalary, getLastSalary } from "../salary"
import { serializeDate } from "@/lib/utils/date"
import { createDepartmentEmployee } from "../department-employee"
import type { Title } from "@/lib/types/title"
import type { Salary } from "@/lib/types/salary"

export const deleteEmployee = async(id: number): Promise<void> => {
	const response = await simpleFetch({
		method: "DELETE",
		route: `employees/${id}`
	})

	if (response.status === "error") throw new Error(response.error)
}

export const getEmployee = async(id: number): Promise<Employee> => {
	const response = await zodFetch({
		method: "GET",
		route: `employees/${id}`,
		responseSchema: EmployeeSchema
	})

	if (response.status === "error") throw new Error(response.error)
	return response.data
}

export const getAllEmployees = async(params: ManyEmployeesParams): Promise<Page<Employee>> => {
	const response = await zodFetch({
		method: "GET",
		route: "employees",
		params: { ...params, search: params.search?.trim() ?? "" },
		responseSchema: PageSchema(EmployeeSchema)
	})

	if (response.status === "error") throw new Error(response.error)
	return response.data
}

export const getEmployeeDepartments = async(id: number): Promise<DepartmentEmployee[]> => {
	const response = await zodFetch({
		method: "GET",
		route: `employees/${id}/departments`,
		responseSchema: DepartmentEmployeeSchema.array()
	})

	if (response.status === "error") throw new Error(response.error)
	return response.data
}

export const getLastEmployeeDepartment = async(id: number): Promise<DepartmentEmployee> => {
	const response = await zodFetch({
		method: "GET",
		route: `employees/${id}/departments/last`,
		responseSchema: DepartmentEmployeeSchema
	})

	if (response.status === "error") throw new Error(response.error)
	return response.data
}

export const editEmployee = async(id: number, body: Partial<EmployeeBody>): Promise<Employee> => {
	const response = await zodFetch({
		method: "PATCH",
		route: `employees/${id}`,
		body,
		responseSchema: EmployeeSchema
	})

	if (response.status === "error") throw new Error(response.error)
	return response.data
}

export const createEmployee = async(body: EmployeeBody): Promise<Employee> => {
	const response = await zodFetch({
		method: "POST",
		route: "employees",
		body: { ...body, birthDate: serializeDate(body.birthDate), hireDate: serializeDate(body.hireDate) },
		responseSchema: EmployeeSchema
	})

	if (response.status === "error") throw new Error(response.error)
	return response.data
}

export const updateEmployee = async(id: number, body: EmployeeBody): Promise<Employee> => {
	const response = await zodFetch({
		method: "PUT",
		route: `employees/${id}`,
		body: { ...body, birthDate: serializeDate(body.birthDate), hireDate: serializeDate(body.hireDate) },
		responseSchema: EmployeeSchema
	})

	if (response.status === "error") throw new Error(response.error)
	return response.data
}

export const getFullEmployee = async(id: number): Promise<FullEmployee | null> => {
	const employee = await getEmployee(id).catch(() => null)
	if (!employee) return null

	const department = await getLastEmployeeDepartment(id).catch(() => undefined)
	const title = await getLastTitle(id).catch(() => undefined)
	const salary = await getLastSalary(id).catch(() => undefined)

	return {
		...(employee),
		department: department?.department,
		title: title?.title,
		salary: salary?.salary
	}
}

export const createFullEmployee = async(body: Omit<FullEmployee, "id">): Promise<FullEmployee> => {
	const employee = await createEmployee(body)

	let departmentEmployee: DepartmentEmployee | undefined = undefined
	if (body.department) {
		departmentEmployee = await createDepartmentEmployee({
			departmentId: body.department.id,
			body: {
				employeeId: employee.id,
				fromDate: new Date()
			}
		})
	}

	let title: Title | undefined = undefined
	if (body.title) {
		title = await createTitle({
			employeeId: employee.id,
			body: {
				title: body.title,
				fromDate: new Date()
			}
		})
	}

	let salary: Salary | undefined = undefined
	if (body.salary) {
		salary = await createSalary({
			employeeId: employee.id,
			body: {
				salary: body.salary,
				fromDate: new Date()
			}
		})
	}

	return {
		...(employee),
		department: departmentEmployee?.department,
		title: title?.title,
		salary: salary?.salary
	}
}

export const updateFullEmployee = async(id: number, body: Omit<FullEmployee, "id">): Promise<FullEmployee> => {
	const employee = await updateEmployee(id, body)
	const fullEmployee = await getFullEmployee(id)
	if (!fullEmployee) throw new Error("Employee not found")

	let departmentEmployee: DepartmentEmployee | undefined = undefined
	if (body.department && fullEmployee.department?.id !== body.department.id) {
		departmentEmployee = await createDepartmentEmployee({
			departmentId: body.department.id,
			body: {
				employeeId: employee.id,
				fromDate: new Date()
			}
		})
	}

	let title: Title | undefined = undefined
	if (body.title && fullEmployee.title !== body.title) {
		title = await createTitle({
			employeeId: employee.id,
			body: {
				title: body.title,
				fromDate: new Date()
			}
		})
	}

	let salary: Salary | undefined = undefined
	if (body.salary && fullEmployee.salary !== body.salary) {
		salary = await createSalary({
			employeeId: employee.id,
			body: {
				salary: body.salary,
				fromDate: new Date()
			}
		})
	}

	return {
		...(employee),
		department: departmentEmployee?.department,
		title: title?.title,
		salary: salary?.salary
	}
}