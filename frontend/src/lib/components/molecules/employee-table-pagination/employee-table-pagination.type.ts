import type { Employee } from "@/lib/actions/employee"

export type EmployeeTablePaginationProps = {
	title: string
	employees: Employee[]
	loading: boolean
	maxSize: number
	page: number
	maxPage: number
	setPage: (page: number) => void
	className?: string
}