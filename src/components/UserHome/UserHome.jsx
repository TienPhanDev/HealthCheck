import React from 'react';
import "./UserHome.css";
import UserGoals from "./UserGoals.jsx";
import BpTable from './Table.jsx';
import SugarTable from './SugarTable.jsx';
import LineGraph from './LineGraph';
import SugarBar from './SugarBar';

class UserHome extends React.Component {
    state = {
        value: 'view',
        currentUser: {
            sugar_screens: [],
            bp_screens: [],
            vaccination_record: ''
        }
    }

    componentDidMount() {
        fetch(`http://localhost:3000/api/v1/users/${localStorage.userID}`)
        .then(response => response.json())
        .then(user => this.setState({
            currentUser: user
        }))
    }

    handleChange = (event)=> {
        this.setState({value: event.target.value});
    }

    displayData = () => {
        //{ firstValue: screen.systolic_pressure, secondValue: screen.diastolic_pressure}
        return this.state.currentUser.bp_screens.map(screen => screen.systolic_pressure )
    }

    tablePressureData = () => {
        console.log()
    }

    render() {
        return (
            <div className="user-home-container">
                <div className="welcome-container">
                    <h1>Welcome home, {this.state.currentUser.username}!</h1>
                </div>
                    <div>
                        <div className='sidebar-listings-div'>
                            {/* <div className='sidebar-div'>
                                <p>Health goals</p>
                                <div className='sample-div'>
                                    <UserGoals/>
                                </div>
                            </div> */}

                            <div className='listings-div'>
                                <div className='listings-filter'>
                                <form onSubmit={this.handleSubmit}>
                                    <label>My results </label>
                                        <select value={this.state.filter} onChange={this.handleChange}>
                                            <option>view</option>
                                            <option value="bp">Blood pressure results</option>
                                            <option value="sugar">Blood sugar results</option>
                                            <option value="vaccine">Vaccine status</option>
                                        </select>                                  
                                </form>
                                </div>

                                {this.state.value === 'bp' 
                                &&   <div className='sample-div'>
                                        <h4>Blood Pressure data (mmHg)</h4> 
                                        <BpTable bpData={this.state.currentUser.bp_screens}/>
                                    </div>}                             

                                {this.state.value === 'sugar' 
                                &&   <div className='sample-div'>
                                        <h4>Sugar Data (mg/dL)</h4>
                                        <SugarTable sugarData={this.state.currentUser.sugar_screens}/>
                                        <SugarBar sugarData={this.state.currentUser.sugar_screens}/>
                                    </div>}

                                {this.state.value === 'vaccine' 
                                &&   <div className='sample-div'>
                                        <h4>Vaccine status</h4>
                                        <p>Tetanus: {this.state.currentUser.vaccination_record.tetanus ? "Covered" : "Not covered"}</p>
                                        <p>Flu: {this.state.currentUser.vaccination_record.flu ? "Covered" : "Not covered"}</p>
                                        <p>Pneumonia: {this.state.currentUser.vaccination_record.pneumonia ? "Covered" : "Not covered"}</p>
                                        <p>Shingles: {this.state.currentUser.vaccination_record.shingles ? "Covered" : "Not covered"}</p>
                                    </div>}
                                {/* <LineGraph displayData={this.displayData()}/> */}
                            </div>
                        </div>
                    </div>
            </div>
        )
    }
}

export default UserHome