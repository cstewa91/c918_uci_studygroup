import React from 'react';
import {Link} from 'react-router-dom'

export default props=>(
    <div className="row">
        <div className="col">
            <Link className="btn btn-lg edit-group" onClick={props.click} to={props.to}>{props.text}</Link>
        </div>
    </div>
)
