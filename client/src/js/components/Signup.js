import React, {Component} from 'react'
import AppActions from '../actions/AppActions' 
import AppStore from '../stores/AppStore'
import GoogleWelcome from './GoogleWelcome'
import {firebaseAuth, firebase, provider}from '../../../../server/config'
import { validateEmail } from '../helpers/validate.helper';
import toastr from 'toastr'



/**
 * Gets user data and persits with firebase
 * 
 * @export
 * @param {object} props
 * @class Signup
 * @extends {Component}
 */
export default class Signup extends Component {
 constructor(props) {
    super(props);
    this.state = {
      contacts: AppStore.getContacts(),
       databaseUsers: AppStore.getdatabaseUsers(),
       emails: AppStore.getGroupEmails(),
       numbers: AppStore.getAllUsersNumber(),
       googleUser: AppStore.getGoogleSignup()

    };
     this.onChange= this.onChange.bind(this)
  }


   /**
    * @method componentDidMount
    * Adds an event Listener to the Store and fires when the component is fully mounted.
    *
    * @return {void}
    * @memberof Signup
    */
   componentDidMount(){
        AppStore.addChangeListener(this.onChange);
    }

    /**
    * @method componentWillUnmount
    * Removes event Listener from the Store
    * 
    * @memberof Signup
    */
    componentWillUnmount(){
        AppStore.removeChangeListener(this.onChange);
    }


 


    /**
     * @method setSignUp
     * Monitors changes in the components and change the state
     * 
     * @memberof Signup
     */
    onChange(){
        this.setState({
            databaseUsers: AppStore.getdatabaseUsers(),
            emails: AppStore.getGroupEmails(),
            numbers: AppStore.getAllUsersNumber(),
            googleUser: AppStore.getGoogleSignup()
        });
        
    } 


    /**
     * Handles Google Sign in
     * 
     * @param {any} e 
     * @memberof Signup
     */
    handleGoogleSignin(e){
      e.preventDefault();      
        provider.addScope('profile');
        provider.addScope('email');
        firebase.auth().signInWithPopup(provider)
        .then((result) => {
            const token = result.credential.accessToken;
            const user = result.user;
            const googleUser = {
                 username: user.displayName,
                 email: user.email,
                 uid: user.uid
            }

         AppActions.google(googleUser);
      });   
   }
 
   /**
   * Makes an action call to Sign up a user with username, email, phone number  and password
   * @param {object} e
   * @returns {void}
   * @memberof Signup
*/
    handleSubmit(e){
      e.preventDefault();  

         /**
     * @method function
     * 
     * @param {any} string 
     * @returns 
     * @memberof Signup
     */
    function capitalizeFirstLetter(string){
    return string.charAt(0).toUpperCase() + string.slice(1);
   }

    // Implements the function
   const userNameToUppercase = capitalizeFirstLetter(this.refs.username.value);

   const contact = {
          username: userNameToUppercase,
          email: this.refs.email.value.trim(),
          password: this.refs.password.value.trim(),
          number: this.refs.number.value.trim()
      }

    if (this.state.databaseUsers.includes(userNameToUppercase)){
     toastr.error('The username already exist')  
    }else if(this.state.numbers.includes(this.refs.number.value)){
     toastr.error('The phone number already exist')
    }else if(!validateEmail(this.refs.email.value)){
        toastr.error('Invalid Email Address')
     }else {      
        AppActions.saveContact(contact);


        this.refs.username.value = '';
         this.refs.email.value = '';
         this.refs.password.value = ''; 
         this.refs.number.value = ''; 
    }
}
  
  /**
   * @method render
   * Render react component
   * 
   * @returns {String} The HTML markup for the Register
   * @memberof Signup
   */
 render() {  
     if (this.state.googleUser){
         var display = <GoogleWelcome googleUser={this.state.googleUser}/>
     } else {
         var display = <div className="container" >

                        <div className="col-md-6 col-sm-6 col-xs-12">
                            <h3>Sign Up</h3>
                            <form onSubmit={this.handleSubmit.bind(this)}>
                                <div className='form-group'>
                                    <input type="text" ref='username' className='form-control' placeholder='Username' required/>
                                </div>
                                <div className='form-group'>
                                    <input type="text" ref='email' className='form-control' placeholder='Email' required/>
                                </div>
                                <div className='form-group'>
                                    <input type="text" ref='number' className='form-control' placeholder='Phone Number: Ex 2348066098146' pattern="[234][0-9]{12}" title="It will contain only 13 numbers and must start with 234" required/>
                                </div>
                                <div className='form-group'>
                                    <input type="password" ref='password' className='form-control' placeholder='Password' pattern="(?=.*\d).{6,}" title="Must contain at least 6 characters and 1 number"  required/>
                                </div>              
                                <button type='submit' className='btn btn-primary'>Submit</button>
                            </form>
                        </div>
                        
                          <div className="col-md-6 col-sm-6 col-xs-12">  
                                <h3>Login With Google Account</h3>
                                <button onClick={this.handleGoogleSignin.bind(this)}>Login with Gooogle</button>
                         </div>

                    </div>
     }
    return (  
        <div>  
            {display}          
        </div>

    )
  }

}
