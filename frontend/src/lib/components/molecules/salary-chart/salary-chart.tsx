import { useEffect, useState, type ReactElement } from "react"
import type { SalaryChartProps } from "."
import { cn } from "@/lib/utils/style"
import { useQuery } from "@tanstack/react-query"
import { getAllSalaries } from "@/lib/actions/salary"
import { useQueryState, parseAsInteger } from "nuqs"
import type { LoadingProps } from "./salary-chart.type"
import { Skeleton } from "@/lib/components/shadcnui/ui/skeleton"
import type { ChartData } from "@/lib/components/molecules/chart"
import { Chart } from "@/lib/components/molecules/chart"
import { formatDate } from "@/lib/utils/date"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../shadcnui/ui/card"
import { formatName } from "@/lib/types/employee"

const Loading = ({ className }: LoadingProps): ReactElement => {
	return (
		<Skeleton className={cn("w-full h-56", className)} />
	)
}

export const SalaryChart = ({ className = "" }: SalaryChartProps): ReactElement => {
	const style = cn(
		"w-full bg-background",
		className
	)

	const [id, _] = useQueryState("id", parseAsInteger)
	const [chartData, setChartData] = useState<ChartData[] | null>(null)

	const { data: salaries, isLoading, isFetching, refetch } = useQuery({
		queryKey: ["salaries"], queryFn: async() => {
			if (!id) return null

			const salaries = await getAllSalaries(id)
			if (!salaries) return

			const chartData = salaries.map(salary => ({
				value: salary.salary,
				tooltip: {
					"Salary": `$${salary.salary}`,
					"From": formatDate(salary.fromDate),
					"To": formatDate(salary.toDate)
				}
			}))

			setChartData(chartData)

			return salaries
		}
	})

	useEffect(() => {
		void refetch()
	}, [id])

	if (!salaries) return <></>

	return (
		<Card className={style}>
			<CardHeader>
				<CardTitle>Salary</CardTitle>
				<CardDescription>
					{salaries && salaries.length > 0 ? formatName(salaries[0].employee) : "The employee"}'s salary over time
				</CardDescription>
			</CardHeader>
			<CardContent>
				{
					(!chartData || isLoading || isFetching) ? (
						<Loading className="w-full h-[200px]" />
					) : (
						<Chart className="w-full h-[200px]" data={chartData} />
					)
				}
			</CardContent>
		</Card>
	)
}