"use client"

import type { ReactElement } from "react"
import type { NavbarProps } from "."
import { cn } from "@/lib/utils/style"
import { ThemeToggle } from "@/lib/components/atoms/theme-toggle"
import { NavbarLink } from "@/lib/components/atoms/navbar-link"
import { Row } from "@/lib/components/atoms/row"
import { usePathname } from "next/navigation"

export const Navbar = ({ className = "" }: NavbarProps): ReactElement => {
	const style = cn(
		"w-full h-16 px-32 flex justify-between items-center",
		"sticky top-0 left-0 z-20",
		"border-b-[0.1rem] bg-background/50 backdrop-blur-md drop-shadow-sm",
		className
	)

	const pathName = usePathname()

	return (
		<nav className={style}>
			<Row className="gap-8 items-center">
				<span className="font-black italic text-3xl text-primary select-none">Staffer</span>
				<NavbarLink href="/departments" currentRoute={pathName}>Departments</NavbarLink>
				<NavbarLink href="/search" currentRoute={pathName}>Search</NavbarLink>
				<NavbarLink href="/employee" currentRoute={pathName}>Employee</NavbarLink>
			</Row>
			<ThemeToggle />
		</nav>
	)
}