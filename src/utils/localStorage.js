import ls from 'local-storage'

export function storeSalSummary(data) {
    ls.set("salary_summary", JSON.stringify(data))
}

export function storeEarningArr(data) {
    ls.set("earning_list", JSON.stringify(data))
}

export function storeDeductionArr(data) {
    ls.set("deduction_list", JSON.stringify(data))
}

export function getSalSummary(){
    const data = JSON.parse(ls.get("salary_summary"))
    return data
}

export function getEarningArr(){
    const data = JSON.parse(ls.get("earning_list"))
    return data
}

export function getDeductionArr(){
    const data = JSON.parse(ls.get("deduction_list"))
    return data
}

export function clearStorage(){
    ls.remove('salary_summary');
    ls.clear();
}



