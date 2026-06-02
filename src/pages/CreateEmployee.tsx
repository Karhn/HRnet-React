import type { ChangeEvent, FormEvent } from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import type { Employee } from "../types/employee"
import { states } from "../data/states"
import Modal from "../components/Modal"
import SelectInput from "../components/SelectInput"
import { department } from "../data/departement"

const initialEmployee: Employee = {
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    startDate: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    department: ""
};

function CreateEmployee() {

    const [employee, setEmployee] = useState<Employee>(initialEmployee);
    const [isModalOpen, setIsModalOpen] = useState(false)

    const stateOptions = states.map((state) => ({
        label: state.name,
        value: state.abbreviation
    }))

    function handleChange(
        event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) {
        const { name, value } = event.target

        setEmployee((currentEmployee) => ({
            ...currentEmployee,
            [name]: value
        }))
    }

    function handleSubmit(
        event: FormEvent<HTMLFormElement>
    ) {
        event.preventDefault()

        const employeeFromStorage = localStorage.getItem("employees")
        const employees: Employee[] = employeeFromStorage ? JSON.parse(employeeFromStorage) : []
        employees.push(employee)

        localStorage.setItem("employees", JSON.stringify(employees))

        setEmployee(initialEmployee)
        setIsModalOpen(true)
    }

    return (
        <main className="container">
            <div className="title">
                <h1> HRnet </h1>
            </div>

            <Link to="/employees"> View Current Employees </Link>

            <h2> Create Employee </h2>

            <form id="create-employee" onSubmit={handleSubmit}>
                <label htmlFor="firstName"> First Name </label>
                <input type="text" id="firstName" name="firstName" value={employee.firstName} onChange={handleChange} required />

                <label htmlFor="lastName"> Last Name </label>
                <input type="text" id="lastName" name="lastName" value={employee.lastName} onChange={handleChange} required />

                <label htmlFor="dateOfBirth"> Date of Birth </label>
                <input type="date" id="dateOfBirth" name="dateOfBirth" value={employee.dateOfBirth} onChange={handleChange} required />

                <label htmlFor="startDate"> Start Date </label>
                <input type="date" id="startDate" name="startDate" value={employee.startDate} onChange={handleChange} required />

                <fieldset>
                    <legend> Address </legend>

                    <label htmlFor="street"> Street </label>
                    <input type="street" id="street" name="street" value={employee.street} onChange={handleChange} required />

                    <label htmlFor="city"> City </label>
                    <input type="city" id="city" name="city" value={employee.city} onChange={handleChange} required />

                    <SelectInput id="state" name="state" label="State" value={employee.state} onChange={handleChange} options={stateOptions} placeholder="Select a state" required />

                    <label htmlFor="zipCode"> Zip Code </label>
                    <input type="number" id="zipCode" name="zipCode" value={employee.zipCode} onChange={handleChange} required />
                </fieldset>

                <SelectInput id="department" name="department" label="Department" value={employee.department} onChange={handleChange} options={department} />

                <button type="submit"> Save </button>
            </form>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <p> Employee Created </p>
            </Modal>

        </main>
    )
}

export default CreateEmployee