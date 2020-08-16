import React from 'react'
import Button from '../Button'

const Default = React.memo(({props}) => {
    return  (
        <React.Fragment>
            <div className='modal-header default'>
                <h5 className="modal-title">{props.modalProps.title}</h5>
                {!props.autoClose &&
                    <span className="close default" aria-label="Close" onClick={props.onClose}>
                        &times;
                    </span>
                }
            </div>

            <div className="modal-body default">
                {props.children}
            </div>
            <div className="modal-footer">
            {props.onConfirm ? <Button btnStyle="success" handleClick={props.onConfirm}>Yes</Button> : null }            
            {props.onLeave ? <Button btnStyle="success" handleClick={props.onLeave}>No</Button> : null }
            </div> 
        </React.Fragment>
    )
})

export default Default