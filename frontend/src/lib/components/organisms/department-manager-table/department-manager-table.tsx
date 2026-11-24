"use client"

import { useEffect, type ReactElement } from "react"
import type { DepartmentManagerTableProps } from "."
import { getDepartmentManager } from "@/lib/actions/department-manager"
import { EmployeeTable } from "@/lib/components/molecules/employee-table"
import { useQuery } from "@tanstack/react-query"
import { Skeleton } from "../../shadcnui/ui/skeleton"
import type { LoadingProps } from "./department-manager-table.type"
import { cn } from "@/lib/utils/style"

const Loading = ({ className }: LoadingProps): ReactElement => {
	const style = cn(
		"w-full h-36",
		className
	)

	return (
		<Skeleton className={style} />
	)
}

export const DepartmentManagerTable = ({ department, className = "" }: DepartmentManagerTableProps): ReactElement => {
	const { data: manager, refetch, isLoading, isFetching } = useQuery({ queryKey: ["manager"], queryFn: async() => {
		if (!department) return null
		return getDepartmentManager({ departmentId: department.id })
	} })

	useEffect(() => {
		void refetch()
	}, [department])

	return (manager ? (
		<EmployeeTable
			employees={[manager.employee]}
			title="Manager"
			className={className}
			loading={isLoading || isFetching}
			maxSize={1}
		/>
	) : (
		<Loading className={className} />
	))
}