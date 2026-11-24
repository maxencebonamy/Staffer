import type { ReactElement } from "react"
import type { EmployeeFormState } from "../../organisms/employee-form"

export type FormButtonProps = {
	primary?: boolean
	formState: EmployeeFormState
	setFormState: (state: EmployeeFormState) => void
	name: EmployeeFormState
	disabled?: boolean
	children: ReactElement | string
	className?: string
}