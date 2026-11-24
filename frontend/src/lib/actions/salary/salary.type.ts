export type CreateSalaryProps = {
	employeeId: number
	body: {
		salary: number
		fromDate: Date
	}
}