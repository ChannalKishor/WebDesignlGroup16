import React, { Component } from 'react';
import axios from 'axios';

export default class WorkoutEdit extends Component {

    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.userInput = React.createRef();

        this.state = {
            username: '',
            description: '',
            duration: '',
            date: new Date(),
            users: []
        }
    }

    componentDidMount() {

        axios.get('http://localhost:8080/workouts/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    username: response.data.username,
                    description: response.data.description,
                    duration: response.data.duration,
                    date: new Date(response.data.date)
                })
            })
            .catch(err => console.error(err))

        axios.get('http://localhost:8080/userType/')
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({
                        users: response.data.map(user => user.username)
                    })
                }
            })
            .catch(err => console.error(err))
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        })
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        })
    }

    onChangeDuration(e) {
        this.setState({
            duration: e.target.value
        })
    }

    onChangeDate(date) {
        this.setState({
            date: date
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const workout = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date
        }

        axios.post('http://localhost:8080/workouts/update/' + this.props.match.params.id, workout)
            .then(res => alert(res.data))
            .catch(err => console.error(err))

        window.location = '/';
    }

    render() {
        return (
            <div>
                <h3>Edit Workout</h3>
                <form onSubmit={this.onSubmit}>
                    <label>Username: </label>
                    <select
                        ref={this.userInput}
                        required
                        className="form-control"
                        value={this.state.username}
                        onChange={this.onChangeUsername}>
                        {
                            this.state.users.map(user => {
                                return <option key={user}>{user}</option>
                            })
                        }
                    </select>

                    <div className="form-group">
                        <label>Description: </label>
                        <input
                            type="text"
                            required
                            className="form-control"
                            value={this.state.description}
                            onChange={this.onChangeDescription} />
                    </div>

                    <div className="form-group">
                        <label>Duration (in minutes): </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.duration}
                            onChange={this.onChangeDuration}
                        />
                    </div>

                    <div className="form-group">
                        <input type='date' selected={this.state.date}
                            onChange={this.onChangeDate}/>
                    </div>

                    <div className="form-group">
                        <button type="submit" className="btn btn-primary">Edit Workout</button>
                    </div>
                </form>
            </div>
        )
    }
}