import type { ReactElement } from "react"

export type NavbarLinkProps = {
	href: string
	target?: "_blank" | "_self"
	children: string | ReactElement
	className?: string
	currentRoute?: string | null
}