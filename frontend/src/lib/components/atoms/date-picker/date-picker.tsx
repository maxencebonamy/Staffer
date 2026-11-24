import type { ReactElement } from "react"
import type { DatePickerProps } from "."
import { Button } from "@/lib/components/shadcnui/ui/button"
import { cn } from "@/lib/utils/style"
import { Popover, PopoverTrigger, PopoverContent } from "@/lib/components/shadcnui/ui/popover"
import { Calendar as CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { Calendar } from "@/lib/components/shadcnui/ui/calendar"

export const DatePicker = ({ date, setDate, placeholder, className = "" }: DatePickerProps): ReactElement => {
	const style = cn(
		"w-[240px] justify-start text-left font-normal",
		{ "text-muted-foreground": !date },
		className
	)

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant={"outline"} className={style}>
					<CalendarIcon className="mr-2 h-4 w-4" />
					{date ? format(date, "PPP") : <span>{placeholder ?? "Pick a date"}</span>}
				</Button>
			</PopoverTrigger>
			<PopoverContent align="start" className=" w-auto p-0">
				<Calendar
					mode="single"
					selected={date ?? undefined}
					onSelect={value => value && setDate(value)}
				/>
			</PopoverContent>
		</Popover>
	)
}