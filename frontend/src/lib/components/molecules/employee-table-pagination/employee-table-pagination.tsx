"use client"

import type { ReactElement } from "react"
import type { EmployeeTablePaginationProps } from "."
import { cn } from "@/lib/utils/style"
import { EmployeeTable } from "../employee-table/employee-table"
import { Pagination } from "../pagination"

export const EmployeeTablePagination = ({
	employees, loading, maxSize, title, page, maxPage, setPage, className = ""
}: EmployeeTablePaginationProps): ReactElement => {
	const style = cn(
		"w-full",
		className
	)

	return (
		<div className={style}>
			<EmployeeTable
				employees={employees}
				loading={loading}
				maxSize={maxSize}
				title={title}
				className="mb-4"
			/>

			<Pagination
				page={page}
				loading={loading}
				maxPage={maxPage}
				setPage={setPage}
			/>
		</div>
	)
}