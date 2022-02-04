import React from 'react'
import close_icon from '../../assets/images/close_icon.png'

function EarningItem(props) {
    const [checked, setChecked] = React.useState(false);

    return (
        <>
            <div className="col-sm-8 col-md-8 col-lg-8">
                <div className="">
                    <input className="mb-4 d-inline" type="number" value={props.input.value} onChange={(e)=>props.handlerChangeEarning(props.input._id, e.target.value, props.input.isEPF)}/>
                    <span>
                        <img
                            className=" d-inline rounded-circle bg-secondary p-2 ms-3 mt-0"
                            src={close_icon}
                            onClick={() => {
                                console.log(props.input)
                                props.handlerDeleteEarning(props.input._id)
                            }
                            }
                        />
                    </span>
                </div>
            </div>
            {/* handlerChangeEarning={props.handlerChangeEarning}
                                handlerChangeEPF={props.handlerChangeEPF} */}
            <div className="col-sm-4 col-md-4 col-lg-4">
                <div className="form-check mt-1">
                    <input className="form-check-input" type="checkbox" value="" id="flexCheckCheckedDisabled"
                        onClick={() => props.handlerChangeEPF(props.input._id, props.input.value)}
                        // checked={props.input.isEPF}
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