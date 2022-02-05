function getTotalOfArray(arr) {
    let total = 0

    arr.map((item => total += Number(item.value)))
    return total
}

function getGrossEarning(basicSal, arrEarning) {
    const totEarning = getTotalOfArray(arrEarning)
    return Number(basicSal) + totEarning
}

function getGrossDeduct(arrDeduction) {
    const total = getTotalOfArray(arrDeduction)
    return total
}

function getEPFOrETF(basicSal, arrEPF, precentage) {
    const totEPF = getTotalOfArray(arrEPF)
    const amount = (Number(basicSal) + totEPF) * Number(precentage)
    return amount
}

function getNetSal(grossSal, grossDeduct, empEPF_8prcntage) {
    const amount = Number(grossSal) - (Number(grossDeduct) + Number(empEPF_8prcntage))
    return amount
}

function getCTC(grossSal, grossDeduct, empEPF_12prcntage, empEPF_3prcntage) {
    const amount = Number(grossSal) + Number(empEPF_12prcntage) + Number(empEPF_3prcntage) - Number(grossDeduct)
    return amount
}

export {
    getTotalOfArray,
    getGrossEarning,
    getGrossDeduct,
    getEPFOrETF,
    getNetSal,
    getCTC,
}