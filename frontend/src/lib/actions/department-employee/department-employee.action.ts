import { zodFetch } from "@/lib/utils/api"
import type { CreateDepartmentEmployeeProps, GetAllDepartmentEmployeesProps } from "./department-employee.type"
import type { Page } from "@/lib/types/page"
import { PageSchema } from "@/lib/types/page"
import type { DepartmentEmployee } from "@/lib/types/employee"
import { DepartmentEmployeeSchema } from "@/lib/types/employee"
import { serializeDate } from "@/lib/utils/date"

export const getAllDepartmentEmployees = async({
	departmentId, page = 0, pageSize = 10
}: GetAllDepartmentEmployeesProps): Promise<Page<DepartmentEmployee>> => {
	const response = await zodFetch({
		route: `departments/${departmentId}/employees/last?page=${page}&size=${pageSize}`,
		method: "GET",
		responseSchema: PageSchema(DepartmentEmployeeSchema)
	})

	if (response.status === "error") {
		throw new Error(response.error)
	}

	return response.data
}

export const createDepartmentEmployee = async({
	departmentId, body
}: CreateDepartmentEmployeeProps): Promise<DepartmentEmployee> => {
	const response = await zodFetch({
		route: `departments/${departmentId}/employees`,
		method: "POST",
		body: { ...body, fromDate: serializeDate(body.fromDate) },
		responseSchema: DepartmentEmployeeSchema
	})

	if (response.status === "error") {
		throw new Error(response.error)
	}

	return response.data
}