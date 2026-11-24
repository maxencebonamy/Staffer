import { z } from "zod"

export const DepartmentSchema = z.object({
	id: z.string().regex(/^d\d{3}$/),
	name: z.string()
})

export type Department = z.infer<typeof DepartmentSchema>