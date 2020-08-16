import React from 'react';
import PropTypes from 'prop-types'
import styled from 'styled-components'

export const PrimaryButton = styled.button`
    padding: .75rem 2rem;
    border: 0;
    border-radius: 0.188em;
    cursor: pointer;
    font-size: 0.875em;
    margin: 0 3px;
    &.primary {
        background: ${props => props.theme.colors.primary.background};
        color: ${props => props.theme.colors.primary.color};
        :hover {
            background: ${props => props.theme.colors.primary.hover};
        }
    }
    &.secondary {
        background: ${props => props.theme.colors.secondary.background};
        color: ${props => props.theme.colors.secondary.color};
        :hover {
            background: ${props => props.theme.colors.secondary.hover};
        }
    }
    &.success {
        background: ${props => props.theme.colors.success.background};
        color: ${props => props.theme.colors.success.color};
        :hover {
            background: ${props => props.theme.colors.success.hover};
        }
        :disabled {
            pointers-event: none;
            cursor: not-allowed;
            opacity: .5;
        }
    }
    &.danger {
        background: ${props => props.theme.colors.danger.background};
        color: ${props => props.theme.colors.danger.color};
        :hover {
            background: ${props => props.theme.colors.danger.hover};
        }
    }
    &.warning {
        background: ${props => props.theme.colors.warning.background};
        color: ${props => props.theme.colors.warning.color};
        :hover {
            background: ${props => props.theme.colors.warning.hover};
        }
    }
    &:focus {
        outline:0; 
    }
    @media only screen and (max-width: 992px) { 
        padding: .75rem 1rem;
    }
    :disabled {
        pointers-event: none;
    }
`

const Button = props => {
    return (
        <PrimaryButton
            className={props.btnStyle}
            onClick={props.handleClick} 
            disabled={props.disabled}>
            {props.children}
        </PrimaryButton>
    )
}

Button.propTypes = {
    children: PropTypes.node,
    handleClick: PropTypes.func,
    disabled: PropTypes.bool,
    fullWidth: PropTypes.bool,
    btnStyle: PropTypes.string
}

export default Button;