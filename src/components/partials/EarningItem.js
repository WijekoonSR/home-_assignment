import React from 'react'
import close_icon from '../../assets/images/close_icon.png'

function EarningItem(props) {

    return (
        <>
            <div className="col-sm-8 col-md-8 col-lg-8">
                <div className="">
                    <input
                        className="mb-4 d-inline"
                        type="number" value={props.input.value}
                        onChange={(e) => props.handlerChangeEarning(props.input._id, e.target.value, props.input.isEPF)}
                    />
                    <span>
                        <img
                            className=" d-inline rounded-circle bg-secondary p-2 ms-2 mt-0"
                            src={close_icon}
                            alt=""
                            onClick={() => {
                                console.log(props.input)
                                props.handlerDeleteEarning(props.input._id)
                            }
                            }
                        />
                    </span>
                </div>
            </div>

            <div className="col-sm-4 col-md-4 col-lg-4">
                <div className="form-check mt-1">
                    <input className="form-check-input" type="checkbox" value=""
                        checked={props.input.isEPF}
                        onChange={(e) => props.handlerChangeEPF(props.input._id, props.input.value)}
                    />
                    <label className="form-check-label" >
                        EPF/ETF
                    </label>
                </div>
            </div>
        </>
    )
}

export default EarningItem