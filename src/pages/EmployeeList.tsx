import { Link } from "react-router-dom"
import { useAppSelector } from "../hooks/reduxHooks"

function EmployeeList() {
    const employees = useAppSelector((state) => state.employees.employees)

    return (
        <main className="container">
            <h1> Current Employees </h1>

            <table>
                <thead>
                    <tr>
                        <th> First Name </th>
                        <th> Last Name </th>
                        <th> Start Date </th>
                        <th> Department </th>
                        <th> Date of Birth </th>
                        <th> Street </th>
                        <th> City </th>
                        <th> State </th>
                        <th> Zip Code </th>
                    </tr>
                </thead>

                <tbody>
                    {employees.length === 0 ? (
                        <tr>
                            <td colSpan={9}> No employees yet </td>
                        </tr>
                    ) : (
                        employees.map((employee, index) => (
                            <tr key={`${employee.firstName}-${employee.lastName}-${index}`}>
                                <td>{employee.firstName}</td>
                                <td>{employee.lastName}</td>
                                <td>{employee.startDate}</td>
                                <td>{employee.department}</td>
                                <td>{employee.dateOfBirth}</td>
                                <td>{employee.street}</td>
                                <td>{employee.city}</td>
                                <td>{employee.state}</td>
                                <td>{employee.zipCode}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            <Link to="/"> Home </Link>
        </main>
    )
}

export default EmployeeList