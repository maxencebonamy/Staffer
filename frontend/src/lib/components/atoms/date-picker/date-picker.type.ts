export type DatePickerProps = {
	date: Date | null
	setDate: (date: Date) => void
	placeholder?: string
	className?: string
}