import type { ChangeEvent, FormEvent } from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import type { Employee } from "../types/employee"
import { states } from "../data/states"
import Modal from "../components/Modal"
import SelectInput from "../components/SelectInput"
import { departments } from "../data/departement"
import { useAppDispatch } from "../hooks/reduxHooks"
import { addEmployee } from "../store/employeeSlice"

const MinimumEmployeeAge = 18

const FrenchLetters = "A-Za-zÀ-ÿ"

const NameRegex = new RegExp(
  `^[${FrenchLetters}]+(?:[ '-][${FrenchLetters}]+)*$`
);

const CityRegex = new RegExp(
  `^[${FrenchLetters}]+(?:[ '-][${FrenchLetters}]+)*$`
);

const StreetRegex = /^[A-Za-zÀ-ÿ0-9][A-Za-zÀ-ÿ0-9 .,'-]{1,99}$/

const ZipCodeRegex = /^\d{5,8}$/;


const initialEmployee: Employee = {
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    startDate: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    department: "Sales"
}

function getAgeAtDate(dateOfBirth: string, referenceDate: string): number {
    const birthDate = new Date(dateOfBirth)
    const startDate = new Date(referenceDate)

    let age = startDate.getFullYear() - birthDate.getFullYear()

    const hasBirthdayPassed =
        startDate.getMonth() > birthDate.getMonth() ||
        (startDate.getMonth() === birthDate.getMonth() && 
        startDate.getDate() >= birthDate.getDate())

    if (!hasBirthdayPassed) {
        age -= 1
    }

    return age
}

function isOldEnoughAtStartDate( dateOfBirth: string, startDate: string, minimumAge: number ): boolean {
    return getAgeAtDate(dateOfBirth, startDate) >= minimumAge
}

function validateEmployeeFields(employee: Employee): string {

    if (!NameRegex.test(employee.firstName.trim())) {
        return "First name must contain only letters at least 2, spaces, hyphens or apostrophes"
    }

    if (!NameRegex.test(employee.lastName.trim())) {
        return "Last name must contain only letters at least 2, spaces, hyphens or apostrophes"
    }

    if (!CityRegex.test(employee.city.trim())) {
        return "City must contain only letters at least 2, spaces, hyphens or apostrophes"
    }

    if (!StreetRegex.test(employee.street.trim())) {
        return "Street must contain only letters at least 2, spaces, hyphens, apostrophes, commas or periods"
    }

    if (!ZipCodeRegex.test(employee.zipCode.trim())) {
        return "Zip code must contain between 5 and 8 digits"
    }

    return ""
}

function CreateEmployee() {

    const dispatch = useAppDispatch()

    const [employee, setEmployee] = useState<Employee>(initialEmployee);
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    const stateOptions = states.map((state) => ({
        label: state.name,
        value: state.abbreviation
    }))

    function handleChange( event: ChangeEvent<HTMLInputElement | HTMLSelectElement> ) {
        const { name, value } = event.target

        setEmployee((currentEmployee) => ({
            ...currentEmployee,
            [name]: value
        }))

        setErrorMessage("")
    }

    function handleSubmit( event: FormEvent<HTMLFormElement> ) {
        event.preventDefault()

        const validationError = validateEmployeeFields(employee)

        if (validationError) {
            setErrorMessage(validationError)
            setIsModalOpen(false)
            return
        }

        if (!isOldEnoughAtStartDate(employee.dateOfBirth, employee.startDate, MinimumEmployeeAge)) {
            setErrorMessage(`Employee must be at least ${MinimumEmployeeAge} years old on the start date`)
            setIsModalOpen(false)
            return
        }

        dispatch(addEmployee(employee))
        
        setEmployee(initialEmployee)
        setErrorMessage("")
        setIsModalOpen(true)
    }

    return (
        <main className="container">
            <div className="title">
                <h1> HRnet </h1>
            </div>

            <Link to="/employees"> View Current Employees </Link>

            <h2> Create Employee </h2>

            {errorMessage && <p className="error-message"> {errorMessage} </p>}

            <form id="create-employee" onSubmit={handleSubmit}>
                <label htmlFor="firstName"> First Name </label>
                <input type="text" id="firstName" name="firstName" value={employee.firstName} onChange={handleChange} required />

                <label htmlFor="lastName"> Last Name </label>
                <input type="text" id="lastName" name="lastName" value={employee.lastName} onChange={handleChange} required />

                <label htmlFor="dateOfBirth"> Date of Birth </label>
                <input type="date" id="dateOfBirth" name="dateOfBirth" value={employee.dateOfBirth} onChange={handleChange} required />

                <label htmlFor="startDate"> Start Date </label>
                <input type="date" id="startDate" name="startDate" value={employee.startDate} onChange={handleChange} required />

                <fieldset className="address">
                    <legend> Address </legend>

                    <label htmlFor="street"> Street </label>
                    <input type="street" id="street" name="street" value={employee.street} onChange={handleChange} required />

                    <label htmlFor="city"> City </label>
                    <input type="city" id="city" name="city" value={employee.city} onChange={handleChange} required />

                    <SelectInput id="state" name="state" label="State" value={employee.state} onChange={handleChange} options={stateOptions} placeholder="Select a state" required />

                    <label htmlFor="zipCode"> Zip Code </label>
                    <input type="text" id="zipCode" name="zipCode" value={employee.zipCode} onChange={handleChange} inputMode="numeric" maxLength={8} required />
                </fieldset>

                <SelectInput id="department" name="department" label="Department" value={employee.department} onChange={handleChange} options={departments} />

                <button type="submit"> Save </button>
            </form>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <p> Employee Created </p>
            </Modal>

        </main>
    )
}

export default CreateEmployee