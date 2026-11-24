"use client"

import type { ReactElement } from "react"
import type { SearchBarProps } from "."
import { cn } from "@/lib/utils/style"
import { Input } from "@/lib/components/shadcnui/ui/input"
import { Button } from "@/lib/components/shadcnui/ui/button"
import type { SubmitHandler } from "react-hook-form"
import { useForm } from "react-hook-form"
import type { FormInput } from "./search-bar.type"
import { FormInputSchema } from "./search-bar.type"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem } from "@/lib/components/shadcnui/ui/form"

export const SearchBar = ({ defaultValue = "", placeholder = "", setSearch, className = "" }: SearchBarProps): ReactElement => {
	const style = cn(
		"flex flex-row items-center justify-stretch gap-6",
		className
	)

	const form = useForm<FormInput>({
		resolver: zodResolver(FormInputSchema),
		defaultValues: {
			search: defaultValue
		}
	})

	const onSubmit: SubmitHandler<FormInput> = (data, event) => {
		event?.preventDefault()
		setSearch(data.search)
	}

	return (
		<Form {...form}>
			<form onSubmit={e => void form.handleSubmit(onSubmit)(e)} className={style}>
				<FormField
					control={form.control}
					name="search"
					render={({ field }) => (
						<FormItem className="flex-1">
							<FormControl>
								<Input placeholder={placeholder} {...field} autoFocus={defaultValue === ""} />
							</FormControl>
						</FormItem>
					)}
				/>
				<Button type="submit">Search</Button>
			</form>
		</Form>
	)
}