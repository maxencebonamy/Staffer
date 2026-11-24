import { DepartmentSchema } from "@/lib/types/department"
import type { ReactElement } from "react"
import type { ControllerRenderProps, UseFormReturn } from "react-hook-form"
import { z } from "zod"

export type EmployeeFormState = "IDLE" | "DELETE" | "UPDATE" | "CREATE"

export type EmployeeFormProps = {
	formState: EmployeeFormState
	setFormState: (state: EmployeeFormState) => void
	className?: string
}

export const FormInputSchema = z.object({
	id: z.number().min(0).optional(),
	firstName: z.string().min(1).max(14),
	lastName: z.string().min(1).max(16),
	department: DepartmentSchema,
	birthDate: z.coerce.date(),
	hireDate: z.coerce.date(),
	title: z.string().min(1),
	salary: z.coerce.number().min(0)
})

export type FormInput = z.infer<typeof FormInputSchema>

export type LoadingProps = {
	className?: string
}

export type EmployeeFormFieldProps<T extends keyof FormInput> = {
	form: UseFormReturn<FormInput>
	name: T
	label: string
	render: (field: ControllerRenderProps<FormInput, T>) => ReactElement
}