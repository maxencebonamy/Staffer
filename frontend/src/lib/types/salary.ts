import { z } from "zod"
import { EmployeeSchema } from "./employee"

export const SalarySchema = z.object({
	employee: EmployeeSchema,
	salary: z.number(),
	fromDate: z.coerce.date(),
	toDate: z.coerce.date()
})

export type Salary = z.infer<typeof SalarySchema>