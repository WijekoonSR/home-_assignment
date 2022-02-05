import React, { useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import InputSalary from '../components/partials/InputSalary'
import SalarySummary from '../components/partials/SalarySummary'
import { isEmpty } from '../utils/validations'
import { getGrossEarning, getGrossDeduct, getEPFOrETF, getNetSal, getCTC, } from '../utils/salaryCalculator'
import { storeSalSummary, storeEarningArr, storeDeductionArr, getSalSummary, getEarningArr, getDeductionArr, clearStorage } from '../utils/localStorage';

function Main() {
    const [salSummary, setSalSummary] = React.useState({
        basicSal: (isEmpty(getSalSummary())) ? 0 : getSalSummary().basicSal,
        grossEarning: (isEmpty(getSalSummary())) ? 0 : getSalSummary().grossEarning,
        grossDeduction: (isEmpty(getSalSummary())) ? 0 : getSalSummary().grossDeduction,
        netSal: (isEmpty(getSalSummary())) ? 0 : getSalSummary().netSal,
        empEPF_8prcntage: (isEmpty(getSalSummary())) ? 0 : getSalSummary().empEPF_8prcntage,
        empEPF_12prcntage: (isEmpty(getSalSummary())) ? 0 : getSalSummary().empEPF_12prcntage,
        empEPF_3prcntage: (isEmpty(getSalSummary())) ? 0 : getSalSummary().empEPF_3prcntage,
        ctc: (isEmpty(getSalSummary())) ? 0 : getSalSummary().ctc,

    })

    const [earningArr, setEarningArr] = React.useState(
        isEmpty(getEarningArr()) ? [{
            _id: uuidv4(),
            value: "",
            isEPF: false
        }] : getEarningArr());

    const [deductionArr, setDeductionArr] = React.useState(
        isEmpty(getDeductionArr()) ? [{
            _id: uuidv4(),
            value: "",
        }] : getDeductionArr());


    const initialRender = React.useRef(true);

    useEffect(() => {
        // only check epf or etf items
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

        // save on local storage 
        if (!initialRender.current) storeSalSummary(salSummary)

    }, [earningArr])

    // trigger only change on deduction Array
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

        // save on local storage
        if (!initialRender.current) storeSalSummary(salSummary)

    }, [deductionArr])

    // trigger only change on salSummary.basicSal
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
            netSal: netSalary,
            empEPF_8prcntage: empEPF8prcntage,
            empEPF_12prcntage: empEPF12prcntage,
            empEPF_3prcntage: empEPF3prcntage,
            ctc: newCTC
        })

        // save on local storage 
        if (!initialRender.current) storeSalSummary(salSummary)

    }, [salSummary.basicSal])

    // after initial render 
    useEffect(() => {
        if (initialRender.current) initialRender.current = false
    }, [])

    // =========================== Handlers ==============================
    // =========================== Reset input data - Handler ==============================
    const handlerReset = () => {
        setSalSummary({
            basicSal: 0.0,
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

        // clear local storage items
        clearStorage();

        toast.success('Reset Succesfully!', {
            position: "bottom-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    // =========================== Basic Salary - Handler ==============================
    const handlerBasicSalary = (value) => {
        setSalSummary({
            ...salSummary,
            basicSal: value,
        })
    }

    // =========================== Change earning - Handler ==============================
    const handlerChangeEarning = (id, value, isEPF) => {
        const newList = earningArr.map((item) => {
            if ((item._id === id)) {
                const newValue = {
                    _id: id,
                    value: value,
                    isEPF: isEPF
                }
                return newValue
            }
            return item
        })

        setEarningArr(newList)

        // save on local storage
        storeEarningArr(newList)
    }

    // =========================== Change EPF/ ETF - Handler ==============================
    const handlerChangeEPF = (id, value) => {
        const newList = earningArr.map((item) => {
            if ((item._id === id)) {
                const newValue = {
                    _id: id,
                    value: value,
                    isEPF: !item.isEPF
                }
                return newValue
            }
            return item
        })
        setEarningArr(newList)

        // save on local storage
        storeEarningArr(newList)
    }

    // =========================== Add empty earning input fields - Handler ==============================
    const handlerAddEmptyEarning = () => {

        const newearningArr = [
            ...earningArr, {
                _id: uuidv4(),
                value: "",
                isEPF: false
            }
        ]

        setEarningArr(newearningArr)

        // save on local storage
        storeEarningArr(newearningArr)
    }

    // =========================== Delete selected earning input values - Handler ==============================
    const handlerDeleteEarning = (id) => {
        // filter item except deleting one
        const newearningArr = earningArr.filter(item => (item._id !== id))

        //assigned/set filtered item except deleted one
        setEarningArr(newearningArr)

        // save on local storage
        storeEarningArr(newearningArr)
    }

    // =========================== Add Deduction input values - Handler ==============================
    const handlerChangeDeduction = (id, value) => {
        const newList = deductionArr.map((item) => {
            if ((item._id === id)) {
                const newValue = {
                    _id: id,
                    value: value,
                }
                return newValue
            }
            return item
        })

        setDeductionArr(newList)

        // save on local storage
        storeDeductionArr(newList)
    }

    // =========================== Add empty deduction input fields - Handler ==============================
    const handlerAddEmptyDeduction = () => {
        const newDeductionArr = [
            ...deductionArr, {
                _id: uuidv4(),
                value: "",
            }
        ]

        setDeductionArr(newDeductionArr)

        // save on local storage
        storeDeductionArr(newDeductionArr)
    }

    // =========================== Delete selected deduction input values - Handler ==============================
    const handlerDeletededuction = (id) => {
        const newDeductionArr = deductionArr.filter(item => (item._id !== id))

        setDeductionArr(newDeductionArr)

        // save on local storage
        storeDeductionArr(newDeductionArr)
    }


    return (
        <div className="row">
            <div className="col">
                <InputSalary
                    salSummary={salSummary}
                    earningArr={earningArr}
                    deductionArr={deductionArr}
                    handlerBasicSalary={handlerBasicSalary}
                    handlerAddEmptyEarning={handlerAddEmptyEarning}
                    handlerDeleteEarning={handlerDeleteEarning}
                    handlerChangeEarning={handlerChangeEarning}
                    handlerChangeEPF={handlerChangeEPF}
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
            <ToastContainer
                position="bottom-right"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover
            />
        </div>
    )
}

export default Main