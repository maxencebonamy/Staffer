export type GetAllDepartmentEmployeesProps = {
	departmentId: string
	page?: number
	pageSize?: number
}

export type CreateDepartmentEmployeeProps = {
	departmentId: string
	body: {
		employeeId: number
		fromDate: Date
	}
}