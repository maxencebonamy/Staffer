import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export const cn = (...inputs: ClassValue[]): string => {
	return twMerge(clsx(inputs))
}


export const breakpoints = {
	SM: 640,
	MD: 768,
	LG: 1024,
	XL: 1280,
	XXL: 1536
}