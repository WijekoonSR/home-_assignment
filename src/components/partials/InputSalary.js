import React from 'react'
import reset_icon from '../../assets/images/reset_icon.png'
import plus_icon from '../../assets/images/plus_icon.png'
import EarningItem from './EarningItem'
import DeductionItem from './DeductionItem'

function InputSalary(props) {

    return (
        <div className='card p-5 m-5 shadow-lg rounded'>
            <div className="d-flex mb-3">
                <h4>Calculate Your Salary</h4>
                <div className="ms-auto" onClick={() => props.handlerReset()}>
                    <span className="cursorPointerShow">
                        <img alt="" src={reset_icon} /> <span className="txtReset">Reset</span>
                    </span>
                </div>
            </div>

            <h5>Basic Salary</h5>
            <div className="col-sm-8">
                <input
                    className="mb-4"
                    type="number"
                    value={(props.salSummary.basicSal)}
                    onChange={(e) => props.handlerBasicSalary(e.target.value)}
                />
            </div>

            <div className="row ">
                <h5 className="mb-0">Earnings</h5>
                <p className="text-muted m-0">Allowance, Fixed Allowance, Bonus and etc.</p>

                {/* ============ dynamically add new Earning input============= */}
                {
                    props.earningArr.map((input) => {
                        return (
                            <EarningItem
                                handlerDeleteEarning={props.handlerDeleteEarning}
                                handlerChangeEarning={props.handlerChangeEarning}
                                handlerChangeEPF={props.handlerChangeEPF}
                                input={input}
                                key={input._id}
                            />
                        )
                    })
                }

                <span className="cursorPointerShow" onClick={(e) => { props.handlerAddEmptyEarning() }}>
                    <img alt="" src={plus_icon} /> <span className="txtAddText">Add New Earning</span>
                </span>
            </div>

            <span className="border mb-4 mt-3"></span>

            <div className="row mb-4">
                <h5 className="mb-0">Deduction</h5>
                <p className="text-muted m-0">Earning, Fixed Earning, Bonus and etc.</p>

                {/* ============ dynamically add new deduction input============= */}
                {
                    props.deductionArr.map((input) => {
                        return (
                            <DeductionItem
                                handlerDeletededuction={props.handlerDeletededuction}
                                handlerChangeDeduction={props.handlerChangeDeduction}
                                input={input}
                                key={input._id}
                            />
                        )
                    })
                }

                <span className="cursorPointerShow" onClick={(e) => { props.handlerAddEmptyDeduction() }}>
                    <img alt="" src={plus_icon} /> <span className="txtAddText">Add New Deduction</span>
                </span>
            </div>
        </div>
    )
}

export default InputSalary