import React from 'react';
import {Link} from 'react-router-dom'

export default props=>(
    <div className="row">
        <div className="col">
            <Link className='btn btn-primary' to={props.to}>{props.text}</Link>
        </div>
    </div>
)
