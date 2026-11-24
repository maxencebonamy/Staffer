"use client"

import type { ReactElement } from "react"
import type { ThemeToggleProps } from "."
import { Switch } from "@/lib/components/shadcnui/ui/switch"
import { useTheme } from "next-themes"

export const ThemeToggle = ({ className = "" }: ThemeToggleProps): ReactElement => {
	const { theme, setTheme } = useTheme()

	const toggleTheme = (): void => {
		setTheme(theme === "light" ? "dark" : "light")
	}

	return (
		<Switch onCheckedChange={toggleTheme} className={className} />
	)
}