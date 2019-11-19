import React from 'react';
import PropTypes from 'prop-types';
import "./Modal.css"

const Modal = props => {
    if(!props.isOpen) return null;
    return (
        <div className="Backdrop">
            <div className="Modal"  onClick={() => {}}>
                <h3>{props.title}</h3>
                <input
                    autoFocus={true}
                    onChange={props.onChange}
                    onKeyUp={(e) => e.keyCode === 13 && props.onSubmit()}
                />
                <button onClick={props.onSubmit}>Akceptuj</button>
                <button onClick={props.onClose}>Anuluj</button>
                <p>{props.validationError}</p>
            </div>
        </div>
    );
};


Modal.propTypes = {
    title: PropTypes.string,
    isOpen: PropTypes.bool,
    onClose: PropTypes.func,
    onSubmit: PropTypes.func,
    onChange: PropTypes.func,
    validationError: PropTypes.string
};

export default Modal;
