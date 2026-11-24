import type { z } from "zod"

export type ZodFetchRequest<T> = {
	method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE"
	route: string
	params?: Record<string, string | number>
	body?: unknown
	responseSchema: z.ZodType<T>
}

export type ZodFetchResponse<T> = {
    status: "success"
    data: T
} | {
    status: "error"
    error: string
}

export type SimpleFetchRequest = {
	method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE"
	route: string
	params?: Record<string, string | number>
	body?: unknown
}

export type SimpleFetchResponse = {
    status: "success"
} | {
    status: "error"
    error: string
}