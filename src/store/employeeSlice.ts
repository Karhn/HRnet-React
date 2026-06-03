import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Employee } from "../types/employee";

type EmployeesState = {
    employees: Employee[]
}

const initialState: EmployeesState = {
    employees: []
}

const employeesSlice = createSlice({
    name: "employees",
    initialState,
    reducers: {
        addEmployee: ( state, action: PayloadAction<Employee>) => {
            state.employees.push(action.payload)
        }
    }
})

export const { addEmployee } = employeesSlice.actions
export default employeesSlice.reducer