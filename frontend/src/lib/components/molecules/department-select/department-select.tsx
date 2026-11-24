"use client"

import type { ReactElement } from "react"
import type { DepartmentSelectProps } from "."
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/lib/components/shadcnui/ui/select"
import { Skeleton } from "@/lib/components/shadcnui/ui/skeleton"
import { useQuery } from "@tanstack/react-query"
import { getAllDepartments } from "@/lib/actions/department"
import { cn } from "@/lib/utils/style"
import type { LoadingProps } from "./department-select.type"

const Loading = ({ className }: LoadingProps): ReactElement => {
	const style = cn(
		"h-10",
		className
	)

	return (
		<Skeleton className={style} />
	)
}

export const DepartmentSelect = ({
	department, setDepartment, defaultFirst = false, placeholder, className = ""
}: DepartmentSelectProps): ReactElement => {
	const { data: departments, isLoading, isFetching } = useQuery({
		queryKey: ["departments"], queryFn: async() => {
			const departments = await getAllDepartments()
			if (defaultFirst && departments && departments.length > 0) setDepartment(departments[0])
			return departments
		}
	})

	const handleValueChange = (value: string): void => {
		if (!departments) return

		const newDepartment = departments.find(department => department.id === value)
		if (!newDepartment) return

		setDepartment(newDepartment)
	}

	if (!departments || isLoading || isFetching) return <Loading className={className} />

	return (
		<Select onValueChange={handleValueChange} value={department?.id}>
			<SelectTrigger className={className}>
				<SelectValue placeholder={placeholder ?? "Select a department"} />
			</SelectTrigger>
			<SelectContent>
				{departments.map((department, index) => (
					<SelectItem key={index} value={department.id}>
						{department.id} - {department.name}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	)
}