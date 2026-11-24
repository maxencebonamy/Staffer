"use server"

import { zodFetch } from "@/lib/utils/api"
import type { GetDepartmentManagerProps } from "./department-manager.type"
import type { DepartmentEmployee } from "@/lib/types/employee"
import { DepartmentEmployeeSchema } from "@/lib/types/employee"

export const getDepartmentManager = async({ departmentId }: GetDepartmentManagerProps): Promise<DepartmentEmployee> => {
	const response = await zodFetch({
		route: `departments/${departmentId}/managers/last`,
		method: "GET",
		responseSchema: DepartmentEmployeeSchema
	})

	if (response.status === "error") {
		throw new Error(response.error)
	}

	return response.data
}