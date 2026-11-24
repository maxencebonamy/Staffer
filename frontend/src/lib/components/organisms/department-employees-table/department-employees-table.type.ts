import type { Department } from "@/lib/types/department"

export type DepartmentEmployeesTableProps = {
	department: Department | null
	className?: string
}

export type LoadingProps = {
	className?: string
}