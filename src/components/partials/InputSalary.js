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
                <div className="ms-auto">
                    <span>
                        <img src={reset_icon} /> <span className="txtReset">Reset</span>
                    </span>
                </div>
            </div>

            <h5>Basic Salary</h5>
            <div className="col-sm-8">
                <input className="mb-4" type="number" value={Number(props.salSummary.basicSal)} onChange={(e)=>props.handlerBasicSalary(e.target.value)} />
            </div>

            <div className="row ">
                <h5 className="mb-0">Earnings</h5>
                <p className="text-muted m-0">Allowance, Fixed Allowance, Bonus and etc.</p>

                {/* ============ dynamically add new Earning ============= */}
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
                {/* <div className="col-sm-8 col-md-8 col-lg-8">
                    <div className="">
                        <input className="mb-4 d-inline" type="number" id="basicSalary" name="basicSalary" />
                        <span> <img className=" d-inline rounded-circle bg-secondary p-2 ms-3 mt-0" src={close_icon} />
                        </span>
                    </div>
                </div>
                <div className="col-sm-4 col-md-4 col-lg-4">
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckCheckedDisabled" checked />
                        <label className="form-check-label" for="flexCheckCheckedDisabled">
                            EPF/ETF
                        </label>
                    </div>
                </div> */}


                <span onClick={(e) => { props.handlerAddEmptyEarning() }}>
                    <img src={plus_icon} /> <span className="txtAddText">Add New Earning</span>
                </span>
            </div>

            <span className="border mb-4 mt-3"></span>

            <div className="row mb-4">
                <h5 className="mb-0">Deduction</h5>
                <p className="text-muted m-0">Earning, Fixed Earning, Bonus and etc.</p>

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

                <span onClick={(e) => { props.handlerAddEmptyDeduction() }}>
                    <img src={plus_icon} /> <span className="txtAddText">Add New Deduction</span>
                </span>
            </div>
        </div>
    )
}

export default InputSalary