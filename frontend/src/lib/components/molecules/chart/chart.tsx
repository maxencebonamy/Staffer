import type { ReactElement } from "react"
import type { ChartProps } from "."
import { cn } from "@/lib/utils/style"
import { Line, LineChart, ResponsiveContainer, Tooltip } from "recharts"
import type { ChartData } from "."
import { Column } from "@/lib/components/atoms/column"

export const Chart = ({ data, className = "" }: ChartProps): ReactElement => {
	const style = cn(
		className
	)

	return (
		<div className={style}>
			<ResponsiveContainer width="100%" height="100%">
				<LineChart
					data={data}
					margin={{ top: 5, right: 10, left: 10, bottom: 0 }}
				>
					<Tooltip
						content={({ active, payload }) => {
							if (active && payload && payload.length) {
								const tooltipData = (payload[0].payload as ChartData).tooltip
								return (
									<Column className="rounded-lg border bg-background p-2 shadow-sm gap-1">
										{Object.entries(tooltipData).map(([key, value]) => (
											<Column key={key}>
												<span className="text-[0.70rem] uppercase text-muted-foreground">
													{key}
												</span>
												<span className="font-semibold text-muted-foreground">
													{value}
												</span>
											</Column>
										))}
									</Column>
								)
							}

							return null
						}}
					/>
					<Line
						type="monotone"
						strokeWidth={2}
						dataKey="value"
						activeDot={{ r: 8, style: { fill: "hsl(142.1 76.2% 36.3%)" } }}
						style={{ stroke: "hsl(142.1 76.2% 36.3%)" }}
					/>
				</LineChart>
			</ResponsiveContainer>
		</div>
	)
}