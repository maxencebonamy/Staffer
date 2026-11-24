"use client"

import { useState, type ReactElement, useEffect } from "react"
import type { DepartmentEmployeesTableProps } from "."
import { getAllDepartmentEmployees } from "@/lib/actions/department-employee/department-employee.action"
import { EmployeeTablePagination } from "@/lib/components/molecules/employee-table-pagination"
import { useQuery } from "@tanstack/react-query"
import { Skeleton } from "../../shadcnui/ui/skeleton"
import { cn } from "@/lib/utils/style"
import type { LoadingProps } from "./department-employees-table.type"

const Loading = ({ className }: LoadingProps): ReactElement => {
	const style = cn(
		"w-full h-36",
		className
	)

	return (
		<Skeleton className={style} />
	)
}

export const DepartmentEmployeesTable = ({ department, className = "" }: DepartmentEmployeesTableProps): ReactElement => {
	const [pageState, setPageState] = useState({
		page: 1,
		pageSize: 20,
		maxPage: 1
	})

	const { data: employees, refetch, isLoading, isFetching } = useQuery({ queryKey: ["employees"], queryFn: async() => {
		if (!department) return null
		const data = await getAllDepartmentEmployees({ departmentId: department.id, page: pageState.page - 1, pageSize: pageState.pageSize })
		setPageState({ ...pageState, maxPage: data.totalPages })
		return data.content
	} })

	useEffect(() => {
		void refetch()
	}, [department, pageState.page])

	return (employees ? (
		<EmployeeTablePagination
			employees={employees.map(employee => employee.employee)}
			title="Employees"
			className={className}
			loading={isLoading || isFetching}
			maxSize={pageState.pageSize}
			maxPage={pageState.maxPage}
			page={pageState.page}
			setPage={(page: number) => setPageState({ ...pageState, page })}
		/>
	) : (
		<Loading className={className} />
	))
}