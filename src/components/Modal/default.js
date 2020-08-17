import React from 'react'
import Button from '../Button'

const Default = React.memo(({props}) => {
    return  (
        <React.Fragment>
            <div className='modal-header default'>
                <h5 className="modal-title">{props.modalProps.title}</h5>
            </div>

            <div className="modal-body default">
                {props.children}
            </div>
            <div className="modal-footer">
            {props.onConfirm ? <Button btnStyle="success" handleClick={props.onConfirm}>{props.giveup ? 'Ok' : 'Yes'}</Button> : null }            
            {props.onLeave ? <Button btnStyle="success" handleClick={props.onLeave}>{props.newgame ? 'Ok' : 'No'}</Button> : null }
            </div> 
        </React.Fragment>
    )
})

export default Default