export type PaginationProps = {
	page: number
	maxPage: number
	loading?: boolean
	setPage: (page: number) => void
	className?: string
}