import { z } from "zod"

export type SearchBarProps = {
	defaultValue?: string
	placeholder?: string
	setSearch: (value: string) => void
	className?: string
}

export const FormInputSchema = z.object({
	search: z.string().regex(/^[a-zA-Z0-9\s]*$/)
})

export type FormInput = z.infer<typeof FormInputSchema>