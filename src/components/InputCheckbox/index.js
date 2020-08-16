import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const CheckBoxWrapper = styled.div`

`

const InputCheckbox = props => {
    return (
        <CheckBoxWrapper>
            <input 
                type="checkbox"
                name={props.name}
                value={props.value}
                onChange={props.handleChange}
                />                
            {props.label ? <label>{props.label}</label> : null}
        </CheckBoxWrapper>
    )
}

InputCheckbox.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.bool,
    handleChange: PropTypes.func.isRequired
}

export default InputCheckbox;