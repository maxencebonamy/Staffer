"use client"

import { Row } from "@/lib/components/atoms/row"
import type { EmployeeFormState } from "@/lib/components/organisms/employee-form"
import { EmployeeForm } from "@/lib/components/organisms/employee-form"
import { Separator } from "@/lib/components/shadcnui/ui/separator"
import { useState, type ReactElement } from "react"
import { FormButton } from "@/lib/components/atoms/form-button"
import { SalaryChart } from "@/lib/components/molecules/salary-chart"
import { useQueryState, parseAsInteger } from "nuqs"

export default (): ReactElement => {
	const [formState, setFormState] = useState<EmployeeFormState>("IDLE")
	const [id, _] = useQueryState("id", parseAsInteger)

	return (
		<main className="flex flex-col items-start justify-start px-8 xl:px-64 2xl:px-96 py-8">
			<Row className="w-full items-center justify-between">
				<h1 className="text-3xl font-semibold">Employee</h1>
				<Row className="gap-6">
					<FormButton formState={formState} setFormState={setFormState} name="DELETE">
						Delete
					</FormButton>
					<FormButton formState={formState} setFormState={setFormState} name="UPDATE">
						Update
					</FormButton>
					<FormButton formState={formState} setFormState={setFormState} name="CREATE" primary>
						Create
					</FormButton>
				</Row>
			</Row>

			<Separator className="w-full my-6" />

			<EmployeeForm
				className="w-full"
				formState={formState}
				setFormState={setFormState}
			/>

			{ id && <Separator className="w-full my-6" /> }

			<SalaryChart />
		</main>
	)
}