import React from 'react';
import { Link } from 'react-router-dom';
import './edit-created.css';
import Header from '../general/header'

export default () => {
    return (
        <div className="edit-created">
        <Header/>   
        <main className='main-content'>
            <div className='container'>
            <Link to='/hamburger' className='btn blue'>Hamburger</Link>
            <Link to='/home'>X</Link>
                <div className='main-title'>
                    <p className='edit-group'>Edit Group:</p>
                </div>

                <div className="group-details">
                    <form className='group-info'>
                        <div className='group-name form-group'>
                            <input type='text' placeholder='The Amazing Group'/>
                        </div>
                        <div className='subject form-group'>                  
                            <input type='text' placeholder='Bio'/>
                        </div>
                        <div className='course form-group'>                       
                            <input type='text' placeholder='101'/>
                        </div>
                        <div className='date form-group'>               
                            <input type='text' placeholder='11/18/18'/>
                        </div>
                        <div className='users form-group'>             
                            <input type='text' placeholder='4'/>
                        </div>
                        <div className='time form-group'>                 
                            <input type='text' placeholder='7:00pm-9:00pm'/>
                        </div>
                        <div className='location form-group'>                  
                            <input type='text' placeholder='Wheeler Hall'/>
                        </div>
                        <div className='details'>        
                            <textarea className='form-control' rows='5' value='' onChange=''></textarea>
                        </div>
                    </form>    
                </div>
            </div>
        </main>
<footer>
    <div className='update'>
    <Link to='/home' className='btn blue'>
        <button type="button" className="btn btn-primary">Update</button>
    </Link>
    </div>
</footer>
        
        
    </div>
    )
}