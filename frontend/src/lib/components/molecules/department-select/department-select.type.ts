import type { Department } from "@/lib/types/department"
import type { SelectHTMLAttributes } from "react"

export type LoadingProps = {
	className?: string
}

export type DepartmentSelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
	department: Department | null
	setDepartment: (value: Department) => void
	defaultFirst?: boolean
	placeholder?: string
	className?: string
}