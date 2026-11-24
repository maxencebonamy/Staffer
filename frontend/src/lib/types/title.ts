import { z } from "zod"
import { EmployeeSchema } from "./employee"

export const TitleSchema = z.object({
	employee: EmployeeSchema,
	title: z.string(),
	fromDate: z.coerce.date(),
	toDate: z.coerce.date()
})

export type Title = z.infer<typeof TitleSchema>