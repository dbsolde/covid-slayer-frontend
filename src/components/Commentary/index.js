import React from 'react';
import PropTypes from 'prop-types'

const Commentary = (props) => {
    return(
        <div className="commentary">
            <h3>Commentary</h3>
            <ul className="logger">
                {
                    props.logs && 
                    props.logs
                    .map( (item,idx) => {
                        return <li key={idx}><span>{item}</span></li>
                    })
                    .slice(Math.max(props.logs.length - 10, 0))
                    // Get 10 latest commentary or log records by slicing
                }
            </ul>
        </div>
    )
}

Commentary.prototype = {
    logs: PropTypes.array
}

export default Commentary