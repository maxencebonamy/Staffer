"use server"

import { SalarySchema, type Salary } from "@/lib/types/salary"
import { zodFetch } from "@/lib/utils/api"
import type { CreateSalaryProps } from "./salary.type"
import { serializeDate } from "@/lib/utils/date"

export const getLastSalary = async(id: number): Promise<Salary> => {
	const response = await zodFetch({
		method: "GET",
		route: `employees/${id}/salaries/last`,
		responseSchema: SalarySchema
	})

	if (response.status === "error") throw new Error(response.error)
	return response.data
}

export const getAllSalaries = async(id: number): Promise<Salary[]> => {
	const response = await zodFetch({
		method: "GET",
		route: `employees/${id}/salaries`,
		responseSchema: SalarySchema.array()
	})

	if (response.status === "error") throw new Error(response.error)
	return response.data
}

export const createSalary = async({ employeeId, body }: CreateSalaryProps): Promise<Salary> => {
	const response = await zodFetch({
		route: `employees/${employeeId}/salaries`,
		method: "POST",
		body: { ...body, fromDate: serializeDate(body.fromDate) },
		responseSchema: SalarySchema
	})

	if (response.status === "error") throw new Error(response.error)
	return response.data
}