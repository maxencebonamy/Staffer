import { format } from "date-fns"

export const formatDate = (date: Date): string => {
	if (date > new Date()) return "Now"
	return format(date, "PPP")
}

export const serializeDate = (date: Date): string => {
	return format(date, "yyyy-MM-dd")
}