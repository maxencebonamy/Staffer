import type { ZodFetchRequest, ZodFetchResponse, SimpleFetchRequest, SimpleFetchResponse } from "."
import { env } from "@/env"

export const zodFetch = async <T>({ method, route, params, body, responseSchema }: ZodFetchRequest<T>): Promise<ZodFetchResponse<T>> => {
	// Get the API URL from the environment variables
	let url = env.NEXT_PUBLIC_STAFFER_API
	if (!url) {
		return {
			status: "error",
			error: "API URL is not set"
		}
	}

	// Ensure the URL ends with a slash and the route does not start with a slash
	if (!url.endsWith("/")) url += "/"
	if (route.startsWith("/")) route = route.slice(1)

	// Append the query parameters to the route
	if (params) {
		const searchParams = new URLSearchParams()
		Object.entries(params).forEach(([key, value]) => searchParams.append(key, value.toString()))
		route += `?${searchParams.toString()}`
	}

	// Fetch the data from the API
	let error = ""
	const headers = {
		"Content-Type": "application/json"
	}
	const response = await fetch(`${url}${route}`, { method, body: body ? JSON.stringify(body) : undefined, headers }).catch((e: Error) => {
		error = e.message
	})
	if (error || !response || !response.ok) {
		return {
			status: "error",
			error: `Failed to fetch ${route}${error !== "" ? `: ${error}` : ""}`
		}
	}

	// Parse the response
	const data = responseSchema.safeParse(await response.json())
	if (!data.success) {
		return {
			status: "error",
			error: `Failed to parse ${route}${data.error ? `: ${data.error.message}` : ""}`
		}
	}

	// Return the data
	return {
		status: "success",
		data: data.data
	}
}

export const simpleFetch = async({ method, route, params, body }: SimpleFetchRequest): Promise<SimpleFetchResponse> => {
	// Get the API URL from the environment variables
	let url = env.NEXT_PUBLIC_STAFFER_API
	if (!url) {
		return {
			status: "error",
			error: "API URL is not set"
		}
	}

	// Ensure the URL ends with a slash and the route does not start with a slash
	if (!url.endsWith("/")) url += "/"
	if (route.startsWith("/")) route = route.slice(1)

	// Append the query parameters to the route
	if (params) {
		const searchParams = new URLSearchParams()
		Object.entries(params).forEach(([key, value]) => searchParams.append(key, value.toString()))
		route += `?${searchParams.toString()}`
	}

	// Fetch the data from the API
	let error = ""
	const response = await fetch(`${url}${route}`, { method, body: body ? JSON.stringify(body) : undefined }).catch((e: Error) => {
		error = e.message
	})
	if (error || !response || !response.ok) {
		return {
			status: "error",
			error: `Failed to fetch ${route}${error !== "" ? `: ${error}` : ""}`
		}
	}

	// Return
	return {
		status: "success"
	}
}