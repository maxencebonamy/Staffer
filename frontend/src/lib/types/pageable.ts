import { z } from "zod"

export const PageableSchema = z.object({
	page: z.number().int().min(0).optional(),
	size: z.number().int().min(1).optional(),
	sort: z.string().regex(/^([a-zA-Z0-9_]+,asc|desc)$/).optional()
})

export type Pageable = z.infer<typeof PageableSchema>