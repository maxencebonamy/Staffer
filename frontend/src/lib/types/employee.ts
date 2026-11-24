import { z } from "zod"
import { DepartmentSchema } from "./department"

export const EmployeeSchema = z.object({
	id: z.number(),
	birthDate: z.coerce.date(),
	firstName: z.string(),
	lastName: z.string(),
	hireDate: z.coerce.date()
})

export type Employee = z.infer<typeof EmployeeSchema>

export const DepartmentEmployeeSchema = z.object({
	employee: EmployeeSchema,
	department: DepartmentSchema,
	fromDate: z.coerce.date(),
	toDate: z.coerce.date()
})

export type DepartmentEmployee = z.infer<typeof DepartmentEmployeeSchema>

export const formatName = (employee: Employee): string => {
	return `${employee.firstName} ${employee.lastName}`
}