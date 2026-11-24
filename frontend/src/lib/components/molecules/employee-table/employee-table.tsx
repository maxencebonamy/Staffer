"use client"

import type { ReactElement } from "react"
import type { EmployeeTableProps } from "."
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/lib/components/shadcnui/ui/table"
import type { LoadingProps } from "./employee-table.type"
import { Skeleton } from "../../shadcnui/ui/skeleton"
import { useRouter } from "next/navigation"

const Loading = ({ maxSize }: LoadingProps): ReactElement => {
	return (<>{
		Array.from({ length: maxSize }).map((_, index) => (
			<TableRow key={index}>
				<TableCell className="w-48">
					<Skeleton className="w-5/6 h-5" />
				</TableCell>
				<TableCell>
					<Skeleton className="w-5/6 h-5" />
				</TableCell>
				<TableCell>
					<Skeleton className="w-5/6 h-5" />
				</TableCell>
			</TableRow>
		))
	}</>)
}

const Fallback = (): ReactElement => {
	return (
		<TableRow>
			<TableCell colSpan={3} className="text-center">No employees found</TableCell>
		</TableRow>
	)
}

export const EmployeeTable = ({ employees, loading, maxSize, title, className = "" }: EmployeeTableProps): ReactElement => {
	const router = useRouter()

	return (
		<Table className={className}>
			<TableCaption>{title}</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead className="w-1/3">Number</TableHead>
					<TableHead className="w-1/3">First name</TableHead>
					<TableHead className="w-1/3">Last name</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{
					loading ? (
						<Loading maxSize={maxSize} />
					) : (!employees || employees.length === 0) ? (
						<Fallback />
					) : employees.map((employee, index) => (
						<TableRow key={index} className="cursor-pointer" onClick={() => router.push(`/employee?id=${employee.id}`)}>
							<TableCell className="font-medium">{employee.id}</TableCell>
							<TableCell>{employee.firstName}</TableCell>
							<TableCell>{employee.lastName}</TableCell>
						</TableRow>
					))
				}
			</TableBody>
		</Table>
	)
}