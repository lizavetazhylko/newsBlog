import { useState } from "react"
import { useValidation } from "./useValidation";

const useInput = (name: string, initialValue: string, validations: any) => {
    const [value, setValue] = useState(initialValue);
    const valid = useValidation(name, value, validations);
    const onChange = (e: any) => {
        setValue(e.target.value);
    }
    return ({
        value,
        onChange,
        valid,
    })
}

export { useInput }