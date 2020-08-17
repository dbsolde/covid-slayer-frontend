import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types'

const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    label {
        text-transform: uppercase;
        font-weight: 500;
    }
    input {
        padding: 0.938em;
        border: 0.063em solid ${props => props.theme.colors.input.border};
        color: ${props => props.theme.colors.input.color};
        border-radius: 0.125em;
        width: 100%;
        &:focus {
            outline:0; 
        }
    }
    &.has-error {
        input {
            border: 0.063em solid ${props => props.theme.colors.error};
        }
    }
    span.error {
        color: ${props => props.theme.colors.error};
        font-size: 0.750em;
    }
`

const InputText = props => {
    return (
        <InputWrapper className={props.errorMessage ? 'has-error' : ''}>
            {props.label && <label>{props.label}</label>}
            <input 
                type={props.type}
                name={props.name}
                value={props.value}
                placeholder={props.placeholder}
                onChange={props.handleChange} />
            {props.errorMessage && <span className="error">{props.errorMessage}</span>}
        </InputWrapper>
    )
}

InputText.propTypes = {
    type: PropTypes.oneOf(['email', 'number', 'password', 'text', 'file']).isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    handleChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    label: PropTypes.string,
    errorMessage: PropTypes.string
}

export default InputText;