"use client"

import { Row } from "@/lib/components/atoms/row"
import { DepartmentManagerTable } from "@/lib/components/organisms/department-manager-table"
import { DepartmentSelect } from "@/lib/components/molecules/department-select"
import { useState, type ReactElement } from "react"
import { DepartmentEmployeesTable } from "@/lib/components/organisms/department-employees-table"
import { Separator } from "@/lib/components/shadcnui/ui/separator"
import type { Department } from "@/lib/types/department"

export default (): ReactElement => {
	const [department, setDepartment] = useState<Department | null>(null)

	return (
		<main className="flex flex-col items-start justify-start w-full px-8 xl:px-64 2xl:px-96 py-8">
			<Row className="w-full items-center justify-between">
				<h1 className="text-3xl font-semibold">Departments</h1>
				<DepartmentSelect className="w-72" department={department} setDepartment={setDepartment} defaultFirst />
			</Row>

			<Separator className="w-full my-6" />

			<DepartmentManagerTable className="w-full mb-6" department={department} />
			<DepartmentEmployeesTable className="w-full mb-6" department={department} />
		</main>
	)
}