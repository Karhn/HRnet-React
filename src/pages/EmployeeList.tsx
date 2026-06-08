import { Link } from "react-router-dom"
import { useAppSelector } from "../hooks/reduxHooks"
import { DataTable, type TableColumn } from "hrnet-react-tableau"
import "hrnet-react-tableau/dist/style.css"
import type { Employee } from "../types/employee"

const columns: TableColumn<Employee>[] = [
    { key: "firstName", label: "First Name" },
    { key: "lastName", label: "Last Name" },
    { key: "startDate", label: "Start Date" },
    { key: "department", label: "Department" },
    { key: "dateOfBirth", label: "Date of Birth" },
    { key: "street", label: "Street" },
    { key: "city", label: "City" },
    { key: "state", label: "State" },
    { key: "zipCode", label: "Zip Code" },
]

function EmployeeList() {
    const employees = useAppSelector((state) => state.employees.employees)

    return (
        <main className="container">
            <h1> Current Employees </h1>

            <DataTable columns={columns} data={employees}/>

            <Link to="/"> Home </Link>
        </main>
    )
}

export default EmployeeList