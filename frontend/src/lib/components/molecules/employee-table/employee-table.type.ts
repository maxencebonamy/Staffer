import type { Employee } from "@/lib/types/employee"

export type EmployeeTableProps = {
	title: string
	employees: Employee[]
	loading: boolean
	maxSize: number
	className?: string
}

export type LoadingProps = {
	maxSize: number
}

export type EmployeeTableRowProps = {
	employee: Employee
}