import { useState } from "react"
import type { FormStateHookResponse } from "./form-state.type"

export const useFormState = <T>(initialState: T, setFormValue: (value: T) => void): FormStateHookResponse<T> => {
	const [state, setState] = useState<T>(initialState)

	const handleChange = (value: T): void => {
		setState(value)
		setFormValue(value)
	}

	return [state, handleChange]
}