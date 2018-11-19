import React from 'react';
import {Link} from 'react-router-dom';
import './search-page.css';

export default () => {
    return (
        <div>

            <div className="main-content">
                <Link to="/hamburger">Menu</Link>
                <h1>Search Groups</h1>
                <div className="search-filter-container">
                    <input id="search-field" type="text" placeholder="Enter a group name or subject"/>
                    <button className="search-filter" type="submit">Filter</button>
                </div>
                <table className="search-results">
                    <thead>
                    <tr>
                        <th>Subject</th>
                        <th>Course</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Members</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>ENG</td>
                        <td>101</td>
                        <td>11/6</td>
                        <td>8:00 AM - 9:00 AM</td>
                        <td>2/3</td>
                    </tr>
                    <tr>
                        <td>MATH</td>
                        <td>101</td>
                        <td>11/12</td>
                        <td>2:30 PM-4:30 PM</td>
                        <td>3/4</td>
                    </tr>
                    <tr>
                        <td>MATH</td>
                        <td>101</td>
                        <td>11/12</td>
                        <td>2:30 PM-4:30 PM</td>
                        <td>3/4</td>
                    </tr>
                    <tr>
                        <td>MATH</td>
                        <td>101</td>
                        <td>11/12</td>
                        <td>2:30 PM-4:30 PM</td>
                        <td>3/4</td>
                    </tr>
                    <tr>
                        <td>MATH</td>
                        <td>101</td>
                        <td>11/12</td>
                        <td>2:30 PM-4:30 PM</td>
                        <td>3/4</td>
                    </tr>
                    <tr>
                        <td>MATH</td>
                        <td>101</td>
                        <td>11/12</td>
                        <td>2:30 PM-4:30 PM</td>
                        <td>3/4</td>
                    </tr>
                    <tr>
                        <td>MATH</td>
                        <td>101</td>
                        <td>11/12</td>
                        <td>2:30 PM-4:30 PM</td>
                        <td>3/4</td>
                    </tr>
                    <tr>
                        <td>MATH</td>
                        <td>101</td>
                        <td>11/12</td>
                        <td>2:30 PM-4:30 PM</td>
                        <td>3/4</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}