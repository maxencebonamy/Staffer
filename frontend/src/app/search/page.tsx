"use client"

import { getAllEmployees } from "@/lib/actions/employee"
import { Row } from "@/lib/components/atoms/row"
import { EmployeeTablePagination } from "@/lib/components/molecules/employee-table-pagination"
import { SearchBar } from "@/lib/components/molecules/search-bar"
import { Separator } from "@/lib/components/shadcnui/ui/separator"
import { useQuery } from "@tanstack/react-query"
import { useState, type ReactElement, useEffect } from "react"
import { useQueryState, parseAsInteger, parseAsString } from "nuqs"

export default (): ReactElement => {
	const [search, setSearch] = useQueryState("query", parseAsString.withDefault(""))
	const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1))
	const [size, _] = useQueryState("size", parseAsInteger.withDefault(20))
	const [maxPage, setMaxPage] = useState(1)

	const { data: employees, isFetching, isLoading, refetch } = useQuery({ queryKey: ["employees"], queryFn: async() => {
		const employees = await getAllEmployees({ page: page - 1, search, size })

		setMaxPage(employees.totalPages)
		return employees.content
	} })

	useEffect(() => {
		void refetch()
	}, [page, search, size])

	const handleSearch = async(value: string): Promise<void> => {
		await setSearch(value)
		await setPage(1)
	}

	return (
		<main className="flex flex-col items-start justify-start px-8 xl:px-64 2xl:px-96 py-8">
			<Row className="w-full items-center justify-between">
				<h1 className="text-3xl font-semibold">Search</h1>
				<SearchBar
					defaultValue={search}
					placeholder="Search an employee by id, first name or last name"
					setSearch={value => void handleSearch(value)}
					className="w-3/5"
				/>
			</Row>

			<Separator className="w-full my-6" />

			<EmployeeTablePagination
				employees={employees ?? []}
				loading={isFetching || isLoading}
				maxSize={size}
				title="Results"
				page={page}
				maxPage={maxPage}
				setPage={page => void setPage(page)}
			/>
		</main>
	)
}