import React from 'react'
import close_icon from '../../assets/images/close_icon.png'

function DeductionItem(props) {

    return (
        <>
            <div className="col-sm-8 col-md-8 col-lg-8">
                <div className="">
                    <input className="mb-4 d-inline"
                        type="number"
                        value={props.input.value}
                        onChange={(e) => props.handlerChangeDeduction(props.input._id, e.target.value, props.input.isEPF)}
                    />
                    <span>
                        <img
                            className=" d-inline rounded-circle bg-secondary p-2 ms-3 mt-0"
                            alt=""
                            src={close_icon}
                            onClick={() => {
                                console.log(props.input)
                                props.handlerDeletededuction(props.input._id)
                            }
                            }
                        />
                    </span>
                </div>
            </div>
        </>
    )
}

export default DeductionItem