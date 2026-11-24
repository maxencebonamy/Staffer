import { DepartmentSchema } from "@/lib/types/department"
import { EmployeeSchema, type Employee } from "@/lib/types/employee"
import type { Pageable } from "@/lib/types/pageable"
import { z } from "zod"

export type ManyEmployeesParams = Pageable & {
	search?: string
}

export type EmployeeBody = Omit<Employee, "id">

export const FullEmployeeSchema = EmployeeSchema.merge(z.object({
	department: DepartmentSchema.optional(),
	title: z.string().optional(),
	salary: z.number().optional()
}))

export type FullEmployee = z.infer<typeof FullEmployeeSchema>