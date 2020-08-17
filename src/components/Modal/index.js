import React from 'react'
import { connect } from 'react-redux'
import { Portal } from './Portal'
import styled from 'styled-components'
import Default from './default'

const ModalOverlay = styled.div`    
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1040;
    background-color: ${props => props.theme.colors.black};
      
    &.fade {
        filter: alpha(opacity=0);
        opacity: 0;
    }

    &.in {
        filter: alpha(opacity=50);
        opacity: 0.5;
    }
`;

const ModalDialog = styled.div`
    position: relative;
    width: 500px;
    @media only screen and (max-width: 992px) { 
        width: 90%;
    }
    margin: 10px auto;
`

const ModalContent = styled.div`
    position: relative;
    background: ${props => props.theme.colors.white} !important;
    background-clip: padding-box;
    border: 0;
    border-radius: 6px;
    box-shadow: 0 3px 9px rgba(0, 0, 0, 0.5);
    outline: 0;
    display: flex;
    flex-direction: column;
    width: 100%;
    z-index: 1041;
    &.warning {
        border-radius: 0;
    }
`;

const ModalWrapper = styled.div`
    .modal-title {
        margin: 0;
        line-height: 1.42857143;
        font-size: 1.25em;
    }
    
    .modal-header {
        border-bottom: 1px solid ${props => props.theme.colors.black};
        padding: 5px 10px;
        .modal-title {
            span {
                color: ${props => props.theme.colors.black};
                font-size: 24px;
                font-weight: 800;
            }
        }
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        background: ${props => props.theme.colors.white} !important;
        border-top-left-radius: .3rem;
        border-top-right-radius: .3rem;
        color: ${props => props.theme.colors.black};

        span {
            &.default {
                background: ${props => props.theme.colors.black};
            }
            border: none;
            font-size: 2em;
        }
        .close {
            margin-top: -2px;
            color: ${props => props.theme.colors.black};
            background: ${props => props.theme.colors.white} !important;
            cursor: pointer;
        }
    }
    .modal-body {
        padding: 10px;
    }
    .modal-footer {
        display: flex;
        justify-content: flex-end;
        padding: 10px;
    }
`
export class Modal extends React.PureComponent {
    render() {
        return (
            <React.Fragment>
                {this.props.open && (
                    <Portal selector='#root'>
                        <ModalWrapper className={this.props.open ? `modal fade in show ` : 'modal fade'} 
                            onClick={this.props.autoClose ? this.props.onClose : null}>
                            <ModalDialog className={`modal-dialog`}>
                                <ModalContent className={`modal-content`}>
                                    <Default props={this.props} />
                                </ModalContent>
                            </ModalDialog>
                        </ModalWrapper>
                        <ModalOverlay className={this.props.open ? 'fade in' : 'modal fade'}/>
                
                        <style jsx='true' global='true'>{`
                        body {
                            overflow: hidden;
                            padding-right: 17px;
                        }
        
                        body .modal {
                            overflow-x: hidden;
                            overflow-y: auto;
                            position: absolute;
                            left: 0;
                            right: 0;
                            top: 50%;
                            margin-left: auto;
                            margin-right: auto;
                        }
                        `}</style>
                    
                    </Portal>
                )}
            </React.Fragment>
        )
    }
}


const mapStateToProps = state => ({
    open: state.modal.isOpen,
    modalProps: state.modal.modalProps
})
  
export default connect(mapStateToProps)(Modal)