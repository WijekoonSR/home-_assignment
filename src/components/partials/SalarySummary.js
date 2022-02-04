import React from 'react'

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
                        {props.bacisSal}
                    </div>
                </div>
                <div className="d-flex">
                    <p className="salSumData">Gross Earning</p>
                    <div className="ms-auto salSumData">
                        3,000.00
                    </div>
                </div>
                <div className="d-flex">
                    <p className="salSumData">Gross Deduction</p>
                    <div className="ms-auto salSumData">
                        100,000.00
                    </div>
                </div>
                <div className="d-flex">
                    <p className="salSumData">Employee EPF (8%)</p>
                    <div className="ms-auto salSumData">
                        30,000.00
                    </div>
                </div>
            </div>


            {/* net salary container */}
            <div className="border m-4 p-2">
                <div className="d-flex">
                    <p>Net Salary (Take Home)</p>
                    <div className="ms-auto salSumData">
                        116,200.00
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
                        13,200.00
                    </div>
                </div>
                <div className="d-flex">
                    <p className="salSumData">Employeer ETF (3%)</p>
                    <div className="ms-auto salSumData">
                        3,300.00
                    </div>
                </div>
                <div className="d-flex my-4">
                    <p className="salSumData">CTC (Cost to Company)</p>
                    <div className="ms-auto salSumData">
                        141,500.00
                    </div>
                </div>

            </div>
        </div>
    )
}

export default SalarySummary