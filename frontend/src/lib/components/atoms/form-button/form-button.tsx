import type { ReactElement } from "react"
import type { FormButtonProps } from "."
import { Button } from "@/lib/components/shadcnui/ui/button"
import { cn } from "@/lib/utils/style"
import { Loader2Icon } from "lucide-react"

export const FormButton = ({
	primary = false, formState, setFormState, name, disabled = false, className = "", children
}: FormButtonProps): ReactElement => {
	const style = cn(
		"flex flex-row items-center gap-1",
		className
	)

	const handleClick = (): void => setFormState(name)

	return (
		<Button className={style} variant={primary ? "default" : "outline"} onClick={handleClick} disabled={disabled || formState !== "IDLE"}>
			{
				formState === name && (<Loader2Icon className="animate-spin h-4" />)
			}
			{children}
		</Button>
	)
}