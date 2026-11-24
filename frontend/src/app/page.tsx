import { redirect } from "next/navigation"
import type { ReactElement } from "react"

export default (): ReactElement => {
	redirect("/departments")
}