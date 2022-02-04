import React from 'react'
import InputSalary from '../components/partials/InputSalary'
import SalarySummary from '../components/partials/SalarySummary'
import { v4 as uuidv4 } from 'uuid';

function Main() {
    const [bacisSal, setBasicSal] = React.useState(0.00)
    const [allowanceArr, setAllowanceArr] = React.useState([
        {
            _id: uuidv4(),
            type: "text",
            value: "",
            isEPF: false
        }
    ]);
    const [deductionArr, setDeductionArr] = React.useState([
        {
            _id: uuidv4(),
            type: "text",
            value: "",
        }
    ]);

    // =========================== Basic Salary Handler ==============================
    const handlerBasicSalary = (value) => {
        setBasicSal(value)
    }

    // =========================== Allowance Handlers ==============================

    const handlerChangeAllowance = (id, value, isEPF) => {
        const newList = allowanceArr.map((item) => {
            if ((item._id === id)) {
                const newValue = {
                    _id: id,
                    type: "text",
                    value: value,
                    isEPF: isEPF
                }
                return newValue
            }
            return item
        })
        setAllowanceArr(newList)
        console.log(allowanceArr)
    }

    const handlerChangeEPF = (id, value) => {
        const newList = allowanceArr.map((item) => {
            if ((item._id === id)) {
                const newValue = {
                    _id: id,
                    type: "text",
                    value: value,
                    isEPF: !item.isEPF
                }
                return newValue
            }
            return item
        })
        setAllowanceArr(newList)

    }

    const handlerAddEmptyAllowance = () => {

        const newAllowanceArr = [
            ...allowanceArr, {
                _id: uuidv4(),
                type: "text",
                value: "",
                isEPF: false
            }
        ]

        setAllowanceArr(newAllowanceArr)
    }

    const handlerAddAllowance = (data) => {

        const newAllowanceArr = [
            ...allowanceArr, {
                _id: uuidv4(),
                type: "text",
                value: data.value,
                isEPF: data.isEPF
            }
        ]

        setAllowanceArr(newAllowanceArr)
    }

    const handlerDeleteAllowance = (id) => {
        const newAllowanceArr = allowanceArr.filter(item => (item._id !== id))
        console.log(newAllowanceArr)
        setAllowanceArr(newAllowanceArr)
    }

    // =========================== Deduction Handlers ==============================
    const handlerChangeDeduction = (id, value) => {

        const newList = deductionArr.map((item) => {
            if ((item._id === id)) {
                const newValue = {
                    _id: id,
                    type: "text",
                    value: value,
                }
                return newValue
            }
            return item
        })
        setDeductionArr(newList)
        console.log(deductionArr)
    }

    const handlerAddEmptyDeduction = () => {
        const newDeductionArr = [
            ...deductionArr, {
                _id: uuidv4(),
                type: "text",
                value: "",
            }
        ]

        setDeductionArr(newDeductionArr)
    }

    const handlerDeletededuction = (id) => {
        const newDeductionArr = deductionArr.filter(item => (item._id !== id))
        console.log(newDeductionArr)
        setDeductionArr(newDeductionArr)
    }


    return (
        <div className="row">
            <div className="col">
                <InputSalary
                    allowanceArr={allowanceArr}
                    bacisSal={bacisSal}
                    handlerBasicSalary={handlerBasicSalary}
                    handlerAddAllowance={handlerAddAllowance}
                    handlerAddEmptyAllowance={handlerAddEmptyAllowance}
                    handlerDeleteAllowance={handlerDeleteAllowance}
                    handlerChangeAllowance={handlerChangeAllowance}
                    handlerChangeEPF={handlerChangeEPF}
                    deductionArr={deductionArr}
                    handlerChangeDeduction={handlerChangeDeduction}
                    handlerAddEmptyDeduction={handlerAddEmptyDeduction}
                    handlerDeletededuction={handlerDeletededuction}
                />
            </div>
            <div className="col">
                <SalarySummary
                    bacisSal={bacisSal}
                />
            </div>
        </div>
    )
}

export default Main