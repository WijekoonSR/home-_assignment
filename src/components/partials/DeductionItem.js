import React from 'react'
import close_icon from '../../assets/images/close_icon.png'

function DeductionItem(props) {

    return (
        <div className="row mb-4">
            <div className="col-sm-8 col-md-8 col-lg-8">
                <div className="">
                    <input className="d-inline"
                        type="number"
                        value={props.input.value}
                        onChange={(e) => props.handlerChangeDeduction(props.input._id, e.target.value, props.input.isEPF)}
                    />
                    <span>
                        <img
                            className=" d-inline rounded-circle bg-grey p-2 ms-2 mt-0"
                            alt=""
                            src={close_icon}
                            onClick={() => {
                                props.handlerDeletededuction(props.input._id)
                            }
                            }
                        />
                    </span>
                </div>
            </div>
        </div>
    )
}

export default DeductionItem