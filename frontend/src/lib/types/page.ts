import { z } from "zod"

export type Page<T> = {
	content: T[]
	pageable: {
		pageNumber: number
		pageSize: number
		sort: {
			sorted: boolean
			unsorted: boolean
			empty: boolean
		}
		offset: number
		unpaged: boolean
		paged: boolean
	}
	last: boolean
	totalElements: number
	totalPages: number
	size: number
	number: number
	sort: {
		sorted: boolean
		unsorted: boolean
		empty: boolean
	}
	first: boolean
	numberOfElements: number
	empty: boolean
}

export const PageSchema = <T>(dataSchema: z.ZodType<T>) : z.ZodType<Page<T>> => z.object({
	content: z.array(dataSchema),
	pageable: z.object({
		pageNumber: z.number(),
		pageSize: z.number(),
		sort: z.object({
			sorted: z.boolean(),
			unsorted: z.boolean(),
			empty: z.boolean()
		}),
		offset: z.number(),
		unpaged: z.boolean(),
		paged: z.boolean()
	}),
	last: z.boolean(),
	totalElements: z.number(),
	totalPages: z.number(),
	size: z.number(),
	number: z.number(),
	sort: z.object({
		sorted: z.boolean(),
		unsorted: z.boolean(),
		empty: z.boolean()
	}),
	first: z.boolean(),
	numberOfElements: z.number(),
	empty: z.boolean()
})