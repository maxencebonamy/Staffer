import type { Title } from "@/lib/types/title"
import { TitleSchema } from "@/lib/types/title"
import { zodFetch } from "@/lib/utils/api"
import type { CreateTitleProps } from "./title.type"
import { serializeDate } from "@/lib/utils/date"

export const getLastTitle = async(id: number): Promise<Title> => {
	const response = await zodFetch({
		method: "GET",
		route: `employees/${id}/titles/last`,
		responseSchema: TitleSchema
	})

	if (response.status === "error") throw new Error(response.error)
	return response.data
}

export const getAllTitles = async(id: number): Promise<Title[]> => {
	const response = await zodFetch({
		method: "GET",
		route: `employees/${id}/titles`,
		responseSchema: TitleSchema.array()
	})

	if (response.status === "error") throw new Error(response.error)
	return response.data
}

export const createTitle = async({ employeeId, body }: CreateTitleProps): Promise<Title> => {
	const response = await zodFetch({
		route: `employees/${employeeId}/titles`,
		method: "POST",
		body: { ...body, fromDate: serializeDate(body.fromDate) },
		responseSchema: TitleSchema
	})

	if (response.status === "error") throw new Error(response.error)
	return response.data
}