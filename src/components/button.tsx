import React = require('react');

var Button = ({onForwardClick, onBackClick}) => {
    return <p>
        <a className="btn btn-sm btn-primary m-x-lg" onClick={()=>onForwardClick()}>前进</a>
        <a className="btn btn-sm btn-primary m-x-lg" onClick={()=>onBackClick()}>后退</a>
      </p>

}
export default Button