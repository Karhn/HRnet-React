import type { ChangeEvent } from "react";

export type SelectOption = {
    label: string,
    value: string
}

type SelectInputProps = {
    id: string,
    name: string,
    label: string,
    value: string,
    options: SelectOption[],
    onChange: (event: ChangeEvent<HTMLSelectElement>) => void,
    placeholder?: string,
    required?: boolean
}

function SelectInput({
    id,
    name,
    label,
    value,
    options,
    onChange,
    placeholder,
    required = false,
} : SelectInputProps) {
    return (
        <div className="select-input">
            <label htmlFor={id}> {label} </label>

            <select
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                className="select-input-field"
            >
                
                {placeholder && <option value=""> {placeholder} </option>}

                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}

            </select>
        </div>
    )
}

export default SelectInput