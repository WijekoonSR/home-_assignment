import React, { useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import InputSalary from '../components/partials/InputSalary'
import SalarySummary from '../components/partials/SalarySummary'
import {
    getGrossEarning,
    getGrossDeduct,
    getEPFOrETF,
    getNetSal,
    getCTC,
} from '../utils/salaryCalculator'

function Main() {
    const [salSummary, setSalSummary] = React.useState({
        basicSal: "",
        grossEarning: 0.0,
        grossDeduction: 0.0,
        netSal: 0.0,
        empEPF_8prcntage: 0.0,
        empEPF_12prcntage: 0.0,
        empEPF_3prcntage: 0.0,
        ctc: 0.0

    })
    const [earningArr, setEarningArr] = React.useState([
        {
            _id: uuidv4(),
            value: "",
            isEPF: false
        }
    ]);
    const [deductionArr, setDeductionArr] = React.useState([
        {
            _id: uuidv4(),
            value: "",
        }
    ]);

    useEffect(() => {
        // only check epf or etf checked items
        let arrEPFOrETF = []
        earningArr.map((item) =>
            (item.isEPF) && arrEPFOrETF.push(item)
        )

        const newGrossEarning = getGrossEarning(salSummary.basicSal, earningArr)
        const empEPF8prcntage = getEPFOrETF(salSummary.basicSal, arrEPFOrETF, 0.08)
        const empEPF12prcntage = getEPFOrETF(salSummary.basicSal, arrEPFOrETF, 0.12)
        const empEPF3prcntage = getEPFOrETF(salSummary.basicSal, arrEPFOrETF, 0.03)
        const netSalary = getNetSal(newGrossEarning, salSummary.grossDeduction, empEPF8prcntage)
        const newCTC = getCTC(newGrossEarning, salSummary.grossDeduction, empEPF12prcntage, empEPF3prcntage)

        setSalSummary({
            ...salSummary,
            grossEarning: newGrossEarning,
            empEPF_8prcntage: empEPF8prcntage,
            empEPF_12prcntage: empEPF12prcntage,
            empEPF_3prcntage: empEPF3prcntage,
            netSal: netSalary,
            ctc: newCTC
        })

    }, [earningArr])

    useEffect(() => {
        const newGrossDeduct = getGrossDeduct(deductionArr)
        const netSalary = getNetSal(salSummary.grossEarning, newGrossDeduct, salSummary.empEPF_8prcntage)
        const newCTC = getCTC(salSummary.grossEarning, newGrossDeduct, salSummary.empEPF_12prcntage, salSummary.empEPF_3prcntage)

        setSalSummary({
            ...salSummary,
            grossDeduction: newGrossDeduct,
            netSal: netSalary,
            ctc: newCTC
        })

    }, [deductionArr])

    useEffect(() => {
        // only check epf or etf checked items
        let arrEPFOrETF = []
        earningArr.map((item) =>
            (item.isEPF) && arrEPFOrETF.push(item)
        )

        const grossEarning = getGrossEarning(salSummary.basicSal, earningArr)
        const empEPF8prcntage = getEPFOrETF(salSummary.basicSal, arrEPFOrETF, 0.08)
        const empEPF12prcntage = getEPFOrETF(salSummary.basicSal, arrEPFOrETF, 0.12)
        const empEPF3prcntage = getEPFOrETF(salSummary.basicSal, arrEPFOrETF, 0.03)
        const netSalary = getNetSal(grossEarning, salSummary.grossDeduction, empEPF8prcntage)
        const newCTC = getCTC(grossEarning, salSummary.grossDeduction, salSummary.empEPF_12prcntage, salSummary.empEPF_3prcntage)

        setSalSummary({
            ...salSummary,
            netSal: netSalary,
            empEPF_8prcntage: empEPF8prcntage,
            empEPF_12prcntage: empEPF12prcntage,
            empEPF_3prcntage: empEPF3prcntage,
            ctc: newCTC
        })

    }, [salSummary.basicSal])


    // =========================== Reset Handler ==============================
    const handlerReset = () => {
        setSalSummary({
            basicSal: "",
            grossEarning: 0.0,
            grossDeduction: 0.0,
            netSal: 0.0,
            empEPF_8prcntage: 0.0,
            empEPF_12prcntage: 0.0,
            empEPF_3prcntage: 0.0,
            ctc: 0.0

        })

        setEarningArr([{
            _id: uuidv4(),
            value: "",
            isEPF: false
        }]);

        setDeductionArr([{
            _id: uuidv4(),
            value: "",
        }]);
        
    }

    // =========================== Basic Salary Handler ==============================
    const handlerBasicSalary = (value) => {
        setSalSummary({
            ...salSummary,
            basicSal: value,
        })
    }

    // =========================== Earning Handlers ==============================

    const handlerChangeEarning = (id, value, isEPF) => {
        const newList = earningArr.map((item) => {
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

        setEarningArr(newList)
    }

    const handlerChangeEPF = (id, value) => {
        const newList = earningArr.map((item) => {
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
        setEarningArr(newList)
    }

    const handlerAddEmptyEarning = () => {

        const newearningArr = [
            ...earningArr, {
                _id: uuidv4(),
                type: "text",
                value: "",
                isEPF: false
            }
        ]

        setEarningArr(newearningArr)
    }

    const handlerAddEarning = (data) => {

        const newearningArr = [
            ...earningArr, {
                _id: uuidv4(),
                type: "text",
                value: data.value,
                isEPF: data.isEPF
            }
        ]

        setEarningArr(newearningArr)
    }

    const handlerDeleteEarning = (id) => {
        const newearningArr = earningArr.filter(item => (item._id !== id))
        console.log(newearningArr)
        setEarningArr(newearningArr)
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

        setDeductionArr(newDeductionArr)
    }


    return (
        <div className="row">
            <div className="col">
                <InputSalary
                    salSummary={salSummary}
                    earningArr={earningArr}
                    handlerBasicSalary={handlerBasicSalary}
                    handlerAddEarning={handlerAddEarning}
                    handlerAddEmptyEarning={handlerAddEmptyEarning}
                    handlerDeleteEarning={handlerDeleteEarning}
                    handlerChangeEarning={handlerChangeEarning}
                    handlerChangeEPF={handlerChangeEPF}
                    deductionArr={deductionArr}
                    handlerChangeDeduction={handlerChangeDeduction}
                    handlerAddEmptyDeduction={handlerAddEmptyDeduction}
                    handlerDeletededuction={handlerDeletededuction}
                    handlerReset={handlerReset}
                />
            </div>
            <div className="col">
                <SalarySummary
                    salSummary={salSummary}
                    earningArr={earningArr}
                    deductionArr={deductionArr}
                />
            </div>
        </div>
    )
}

export default Main