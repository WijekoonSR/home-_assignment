import React from 'react'
import {
    getTotalOfArray,
    getgrossEarning,
    getGrossDeduct,
    getEPFOrETF,
    getNetSal,
    getCTC,
} from '../../utils/salaryCalculator'

function SalarySummary(props) {
    return (
        <div className='card m-5 shadow-lg rounded'>

            <div className="pt-5 ps-5 pe-5">
                <h4>Your Salary</h4>

                <div className="d-flex mb-2">
                    <h6 className="salSumH6">Items</h6>
                    <div className="ms-auto salSumData">
                        <h6 className="salSumH6"> Amount</h6>
                    </div>
                </div>
                <div className="d-flex">
                    <p className="salSumData">Basic Salary</p>
                    <div className="ms-auto salSumData">
                        {props.salSummary.basicSal}
                    </div>
                </div>
                <div className="d-flex">
                    <p className="salSumData">Gross Earning</p>
                    <div className="ms-auto salSumData">
                       {/* {getgrossEarning(props.salSummary.basicSal, props.earningArr )} */}
                       {props.salSummary.grossEarning}
                    </div>
                </div>
                <div className="d-flex">
                    <p className="salSumData">Gross Deduction</p>
                    <div className="ms-auto salSumData">
                        {props.salSummary.grossDeduction}
                    </div>
                </div>
                <div className="d-flex">
                    <p className="salSumData">Employee EPF (8%)</p>
                    <div className="ms-auto salSumData">
                    {props.salSummary.empEPF_8prcntage}
                    </div>
                </div>
            </div>


            {/* net salary container */}
            <div className="border m-4 p-2">
                <div className="d-flex">
                    <p>Net Salary (Take Home)</p>
                    <div className="ms-auto salSumData">
                    {props.salSummary.netSal}
                    </div>
                </div>
            </div>

            <div className="px-5">
                <div className="d-flex mb-2">
                    <h6 className="salSumH6">Contribution from the Employer</h6>

                </div>
                <div className="d-flex">
                    <p className="salSumData">Employeer EPF (12%)</p>
                    <div className="ms-auto salSumData">
                    {props.salSummary.empEPF_12prcntage}
                    </div>
                </div>
                <div className="d-flex">
                    <p className="salSumData">Employeer ETF (3%)</p>
                    <div className="ms-auto salSumData">
                    {props.salSummary.empEPF_3prcntage}
                    </div>
                </div>
                <div className="d-flex my-4">
                    <p className="salSumData">CTC (Cost to Company)</p>
                    <div className="ms-auto salSumData">
                    {props.salSummary.ctc}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default SalarySummary