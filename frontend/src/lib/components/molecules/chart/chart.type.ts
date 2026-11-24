export type ChartData = {
	value: number
	tooltip: Record<string, string>
}

export type ChartProps = {
	data: ChartData[]
	className?: string
}