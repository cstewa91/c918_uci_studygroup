import React, { Component } from 'react';
import './confirm_modal.css';

class ConfirmModal extends Component {
    state = {
        show: false
    };

    open = () => this.setState({show: true});

    close = () => this.setState({show: false});

    render(){

        if(this.state.show){
            return (
                <div className="basic-modal" onClick={this.close}>
                    <div onClick={e => e.stopPropagation()} className="basic-modal-content">
                        <div onClick={this.close} className="basic-modal-close">X</div>
                        <h1>Delete Group</h1>
                        <p>Are you sure?</p>
                        <div className="btn confirm-delete">Delete</div> <div onClick={this.close} className="btn cancel-delete">Cancel</div>
                    </div>
                </div>
            )
        }

        return (
            <button onClick={this.open} className="btn confirm-delete">Delete Group</button>
        );
    }
}

export default ConfirmModal;
