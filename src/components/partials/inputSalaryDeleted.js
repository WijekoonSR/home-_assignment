import React from 'react'
import reset_icon from '../../assets/images/reset_icon.png'

function InputSalary() {
    return (
        <div className='card inputSalaryCard'>
            <div className="d-flex mb-3">
                <h4>Calculate Your Salary</h4>
                <div className="ms-auto">
                    <span>
                        <img src={reset_icon} /> <span className="txtReset">Reset</span>
                    </span>
                </div>
            </div>

            <h5>Basic Salary</h5>
            <input className="mb-4" type="text" id="basicSalary" name="basicSalary" />
            
            <h5>Earnings</h5>
            <h5>Deductions</h5>
        </div>
    )
}

export default InputSalary