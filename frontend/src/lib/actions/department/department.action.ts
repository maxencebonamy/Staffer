"use server"

import type { Department } from "@/lib/types/department"
import { DepartmentSchema } from "@/lib/types/department"
import { simpleFetch, zodFetch } from "@/lib/utils/api"
import { z } from "zod"

export const deleteDepartment = async(id: string): Promise<void> => {
	const response = await simpleFetch({
		route: `departments/${id}`,
		method: "DELETE"
	})

	if (response.status === "error") throw new Error(response.error)
}

export const getDepartment = async(id: string): Promise<Department> => {
	const response = await zodFetch({
		route: `departments/${id}`,
		method: "GET",
		responseSchema: DepartmentSchema
	})

	if (response.status === "error") throw new Error(response.error)
	return response.data
}

export const getAllDepartments = async(): Promise<Department[]> => {
	const response = await zodFetch({
		route: "departments",
		method: "GET",
		responseSchema: z.array(DepartmentSchema)
	})

	if (response.status === "error") throw new Error(response.error)
	return response.data.sort((a, b) => a.id.localeCompare(b.id))
}

export const createDepartment = async(name: string): Promise<Department> => {
	const response = await zodFetch({
		route: "departments",
		method: "POST",
		body: { name },
		responseSchema: DepartmentSchema
	})

	if (response.status === "error") throw new Error(response.error)
	return response.data
}

export const updateDepartment = async(id: string, name: string): Promise<Department> => {
	const response = await zodFetch({
		route: `departments/${id}`,
		method: "PUT",
		body: { name },
		responseSchema: DepartmentSchema
	})

	if (response.status === "error") throw new Error(response.error)
	return response.data
}