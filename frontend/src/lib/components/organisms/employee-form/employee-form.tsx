"use client"

import { useEffect, type ReactElement } from "react"
import type { EmployeeFormProps } from "."
import { cn } from "@/lib/utils/style"
import { Row } from "@/lib/components/atoms/row"
import { Input } from "@/lib/components/shadcnui/ui/input"
import { useForm } from "react-hook-form"
import type { EmployeeFormFieldProps } from "./employee-form.type"
import { FormInputSchema, type FormInput, type LoadingProps } from "./employee-form.type"
import { Label } from "@/lib/components/shadcnui/ui/label"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { createFullEmployee, deleteEmployee, getFullEmployee, updateFullEmployee } from "@/lib/actions/employee"
import { Column } from "@/lib/components/atoms/column"
import { Skeleton } from "../../shadcnui/ui/skeleton"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/lib/components/shadcnui/ui/form"
import { DepartmentSelect } from "../../molecules/department-select"
import { DatePicker } from "../../atoms/date-picker"
import { useQueryState, parseAsInteger } from "nuqs"
import { Button } from "../../shadcnui/ui/button"

const Loading = ({ className }: LoadingProps): ReactElement => {
	const style = cn(
		"items-start justify-stretch gap-24",
		className
	)

	const labels = [
		["Number", "First name", "Last name", "Department"],
		["Birth date", "Hire date", "Title", "Salary"]
	]

	return (
		<Row className={style}>
			{labels.map((column, index) => (
				<Column key={index} className="items-stretch justify-start gap-4 flex-1">
					{column.map((label, index) => (
						<Row key={index} className="items-center justify-between gap-4">
							<Label className="w-1/4">{label}</Label>
							<Skeleton className="h-10 w-3/4" />
						</Row>
					))}
				</Column>
			))}
		</Row>
	)
}

const EmployeeFormField = <T extends keyof FormInput>({ form, name, label, render }: EmployeeFormFieldProps<T>): ReactElement => {
	return (
		<FormField
			control={form.control}
			name={name}
			render={({ field }) => (
				<FormItem className="flex flex-row items-center justify-between space-y-0">
					<FormLabel className="w-1/4">{ label }</FormLabel>
					<FormControl className="w-3/4">
						{ render(field) }
					</FormControl>
				</FormItem>
			)}
		/>
	)
}

export const EmployeeForm = ({ formState, setFormState, className = "" }: EmployeeFormProps): ReactElement => {
	const [id, setId] = useQueryState("id", parseAsInteger)

	const style = cn(
		"flex flex-row items-start justify-stretch gap-24",
		className
	)

	const defaultValues = {
		id: undefined,
		firstName: "",
		lastName: "",
		department: undefined,
		birthDate: undefined,
		hireDate: undefined,
		title: "",
		salary: 0
	}

	const form = useForm<FormInput>({
		resolver: zodResolver(FormInputSchema),
		defaultValues
	})

	const { isLoading, isFetching, refetch } = useQuery({ queryKey: ["employee"], queryFn: async() => {
		if (!id) return null

		const newEmployee = await getFullEmployee(id).catch(() => null)
		if (!newEmployee) {
			form.reset(defaultValues)
			await setId(null)
			return null
		}

		form.reset(newEmployee)
		return newEmployee
	} })

	useEffect(() => {
		void (async() => {
			const valid = FormInputSchema.safeParse(form.getValues())
			if (id && formState === "DELETE") {
				await deleteEmployee(id)
					.then(() => refetch())
			} else if (!id && valid.success && formState === "CREATE") {
				await createFullEmployee(form.getValues())
					.then(employee => setId(employee.id))
					.then(() => refetch())
			} else if (id && valid.success && formState === "UPDATE") {
				await updateFullEmployee(id, form.getValues())
					.then(() => refetch())
			}
		})().finally(() => {
			setFormState("IDLE")
		})
	}, [formState])

	useEffect(() => {
		void refetch()
	}, [id])

	if (isLoading || isFetching) return <Loading className={className} />

	return (
		<Form {...form}>
			<form className={style}>
				<Column className="items-stretch justify-start gap-4 flex-1">
					<EmployeeFormField form={form} name="id" label="Number" render={field => (
						<Row className="items-center justify-between gap-4">
							<Input placeholder="Auto generated" {...field} disabled />
							<Button onClick={() => void setId(null)} variant="outline">New</Button>
						</Row>
					)} />

					<EmployeeFormField form={form} name="firstName" label="First name" render={field => (
						<Input placeholder="First name" {...field} />
					)} />

					<EmployeeFormField form={form} name="lastName" label="Last name" render={field => (
						<Input placeholder="Last name" {...field} />
					)} />

					<EmployeeFormField form={form} name="department" label="Department" render={field => (
						<DepartmentSelect department={field.value} setDepartment={field.onChange} />
					)} />
				</Column>

				<Column className="items-stretch justify-start gap-4 flex-1">
					<EmployeeFormField form={form} name="birthDate" label="Birth date" render={field => (
						<DatePicker date={field.value} setDate={field.onChange} />
					)} />

					<EmployeeFormField form={form} name="hireDate" label="Hire date" render={field => (
						<DatePicker date={field.value} setDate={field.onChange} />
					)} />

					<EmployeeFormField form={form} name="title" label="Title" render={field => (
						<Input placeholder="Title" {...field} />
					)} />

					<EmployeeFormField form={form} name="salary" label="Salary" render={field => (
						<Input placeholder="Salary" {...field} />
					)} />
				</Column>
			</form>
		</Form>
	)
}