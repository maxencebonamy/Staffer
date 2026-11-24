import type { ReactElement } from "react"
import type { NavbarLinkProps } from "."
import Link from "next/link"
import { cn } from "@/lib/utils/style"

export const NavbarLink = ({ href, target = "_self", children, className = "", currentRoute = null }: NavbarLinkProps): ReactElement => {
	const style = cn(
		"font-normal text-foreground/60 hover:text-foreground/80 transition-colors",
		{ "text-foreground": currentRoute && currentRoute === href },
		className
	)

	return (
		<Link href={href} target={target} className={style}>
			{children}
		</Link>
	)
}