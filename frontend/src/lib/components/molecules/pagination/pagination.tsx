"use client"

import type { ReactElement } from "react"
import type { PaginationProps } from "."
import { Row } from "../../atoms/row"
import { Button } from "../../shadcnui/ui/button"
import { cn } from "@/lib/utils/style"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"

export const Pagination = ({ page, maxPage, loading = false, setPage, className = "" }: PaginationProps): ReactElement => {
	const style = cn(
		"w-full justify-center",
		className
	)

	const previousPage = (): void => {
		const newPage = page > 1 ? page - 1 : 1
		setPage(newPage)
	}

	const nextPage = (): void => {
		const newPage = page < maxPage ? page + 1 : maxPage
		setPage(newPage)
	}

	return (
		<Row className={style}>
			<Button variant="ghost" size="icon" onClick={() => setPage(1)} disabled={loading || page === 1}>
				<ChevronsLeft />
			</Button>
			<Button variant="ghost" size="icon" onClick={previousPage} disabled={loading || page === 1}>
				<ChevronLeft />
			</Button>
			<Button variant="ghost" disabled>
				{page} / {maxPage}
			</Button>
			<Button variant="ghost" size="icon" onClick={nextPage} disabled={loading || page === maxPage}>
				<ChevronRight />
			</Button>
			<Button variant="ghost" size="icon" onClick={() => setPage(maxPage)} disabled={loading || page === maxPage}>
				<ChevronsRight />
			</Button>
		</Row>
	)
}