import React from 'react'

export default (WrapperComponent) => {
    return (props) => {
        return (
            <div className="alert">
                <span className="alert-symbol">&#9888;</span>
                <WrapperComponent {...props}/>
            </div>
        );
    }
}
