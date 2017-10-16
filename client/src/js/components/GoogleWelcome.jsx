import React, { Component } from 'react'
import AppStore from '../stores/AppStore'
import AppActions from '../actions/AppActions'
import toastr from 'toastr'

/**
 * @description Signs the user with Google
 * 
 * @export
 * @param {object} props
 * @class Signup
 * @extends {Component}
 */
export default class GoogleWelcome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            databaseUsers: AppStore.getdatabaseUsers(),
            numbers: AppStore.getAllUsersNumber(),
            googleDetail: AppStore.getGoogleSignup()
        };
        this._onChange = this._onChange.bind(this)
    }

    /**
     * @method componentDidMount
     * @description Adds an event Listener to the Store and fires when the component is fully mounted.
     * @return {void}
     * @memberof GoogleWelcome
     */
    componentDidMount() {
        AppStore.addChangeListener(this._onChange);
    }

    /**
    * @method componentWillUnmount
    * @description Removes event Listener from the Store
    * @memberof GoogleWelcome
    */
    componentUnmount() {
        AppStore.removeChangeListener(this._onChange);
    }

    /**
     * @method render
     * @description Render react component
     * @returns {String} The HTML markup for the Register
     * @memberof GoogleWelcome
     */
    render() {
        const email = this.state.googleDetail.email
        const uid = this.state.googleDetail.uid
        const displayName = this.state.googleDetail.displayName
        const photoURL = this.state.googleDetail.photoURL
        return (
            <div>
                <h3> Welcome {displayName} </h3>
                <p>One more step, we need your phone number</p>
                <div className='well'>
                    <form onSubmit={this.handleSubmit.bind(this)}>
                        <div className='form-group' >
                            <input type="text" ref='username'
                                className='form-control' value={displayName}
                                placeholder='Username' required />
                        </div>
                        <div className='form-group'>
                            <input type="text" ref='email'
                                className='form-control' value={email} required />
                        </div>
                        <div className='form-group'>
                            <input type="text" ref='number'
                                className='form-control'
                                placeholder='Phone Number: Ex 2348066098146'
                                pattern="[234][0-9]{12}"
                                title="It will contain only 13 numbers and must start with 234" required />
                        </div>

                        <button type='submit' className='btn btn-primary'>Submit</button>
                    </form>

                </div>

            </div>

        )
    }


    /**
    * @description Makes an action call to Sign up a user with username, email, phone number  and password
    * @param {object} event
    * @returns {void}
    * @memberof GoogleWelcome
    */
    handleSubmit(event) {
        event.preventDefault()

        function capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }
        const userNameToUppercase = capitalizeFirstLetter(this.refs.username.value);

        const contact = {
            username: this.refs.username.value.trim(),
            email: this.refs.email.value.trim(),
            number: this.refs.number.value.trim(),
            uid: this.state.googleDetail.uid,
            password: null
        }
        if (this.state.numbers.includes(this.refs.number.value)) {
            toastr.error("The phone number already exist")
        } else {
            AppActions.googleSignup(contact);
            this.refs.username.value = '';
            this.refs.email.value = '';
            this.refs.number.value = '';
        }
    }

    /**
     * @method onChange
     * @description Monitors changes in the components and change the state
     * @memberof GoogleWelcome
     */
    _onChange() {
        this.setState({ databaseUsers: AppStore.getdatabaseUsers() });
        this.setState({ numbers: AppStore.getAllUsersNumber() });
        this.setState({ googleDetail: AppStore.getGoogleSignup() });

    }
}