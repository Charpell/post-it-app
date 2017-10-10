import React, { Component } from 'react'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { Modal, Button, OverlayTrigger, Popover, Tooltip } from 'react-bootstrap'
import AppActions from '../../actions/AppActions'
import AppStore from '../../stores/AppStore'
import GroupOptions from './GroupOptions'
import toastr from 'toastr'

/**
 * Displays the navigation of the dashboard
 * 
 * @export
 * @class DashboardNavigation
 * @extends {Component}
 */
export default class DashboardNavigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            showModal2: false,
            showNotify: false,
            groupName: '',
            userName: '',
            users: []
        };

        this.close = this.close.bind(this);
        this.open = this.open.bind(this);
        this.openGroup = this.openGroup.bind(this);
        this.closeGroup = this.closeGroup.bind(this);
        this.closeNotify = this.closeNotify.bind(this);
        this.openNotify = this.openNotify.bind(this);
        this.addUser = this.addUser.bind(this)
      }

      
    

    // Modal for add Users to the Group
    close() {
        this.setState({ showModal: false });
    }
    open() {
        this.setState({ showModal: true });
    }

    // Modal for creating Group
    closeGroup() {
        this.setState({ showModal2: false });
    }
    openGroup() {
        this.setState({ showModal2: true });
    }

    // Modal for Notifications
    closeNotify() {
        this.setState({ showNotify: false });
    }
    openNotify(){
        this.setState({ showNotify: true });
    }


    render() {
        const userName = JSON.parse(localStorage.getItem('user'));
        const groupOptions = this.props.group.map((keyName, keyIndex) => <GroupOptions keyName={keyName} key={keyIndex} />)

        return (
            <div>
            

                <li data-toggle="collapse" className="collapsed" data-intro='Click here to create your first Group'>
                    <a href="#" onClick={this.openGroup}><i className="fa fa-globe fa-lg"></i>&nbsp; Create Group</a>
                </li>

                <Modal show={this.state.showModal2} onHide={this.closeGroup}>
                    <Modal.Header closeButton>
                        <Modal.Title>Create Group</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={this.createGroup.bind(this)}>
                            <div className='form-group'>
                                <input type="text" ref='group' className='form-control' placeholder='GroupName' required />
                            </div>
                            <button type='submit' className='btn btn-primary'>Submit</button>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <a href="#/dashboard" onClick={this.closeGroup}> Close</a>
                    </Modal.Footer>
                </Modal>

                <li data-toggle="collapse" className="collapsed" data-intro='Invite your fiends to your Group'>
                    <a href="#" onClick={this.open}><i className="fa fa-globe fa-lg"></i>&nbsp; Invite a Friend</a>
                </li>

                <Modal show={this.state.showModal} onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add a User to this Group</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={this.addUser}>
                            <div className='form-group'>
                                <select className="form-control" ref="type">
                                    <option>Groups</option>
                                    {groupOptions}
                                </select>
                            </div>
                            <div className='form-group'>
                                <input type="text" ref='user' className='form-control' placeholder='Search for a User' required />
                            </div>

                            <button type='submit' className='btn btn-primary'>Submit</button>
                        </form >
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.close}>Close</Button>
                    </Modal.Footer>
                </Modal>


                
                <li data-toggle="collapse" className="collapsed" data-intro='When messages are posted in groups you belong to, you get your notifications here !' onClick={() => AppActions.getNotification(userName)}>
                    <a href="#" onClick={this.openNotify}><i className="fa fa-globe fa-lg"></i>&nbsp; Notification</a>
                </li>
                <Modal show={this.state.showNotify} onHide={this.closeNotify}>
                    <Modal.Header closeButton>
                        <Modal.Title>Notifications</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ul className='mylist'>
                        {

                                this.props.notification.map(function (keyName, keyIndex) {

                                    return (

                                        <li key={keyIndex}>{keyName.notification}</li>
                                    )

                                })

                            }
     

                        </ul>
                    </Modal.Body>
                    <Modal.Footer>
                        <a href="#/dashboard" onClick={this.closeNotify}> Close</a>
                    </Modal.Footer>
                </Modal>



                <li data-toggle="collapse" className="collapsed">
                    <a href="#" onClick={this.logout.bind(this)}><i className="fa fa-globe fa-lg"></i>&nbsp; Logout</a>
                </li>

            </div>

        )
    }

    createGroup(event) {
        const userName = JSON.parse(localStorage.getItem('user'));
        event.preventDefault()
        function capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }

        const groupName = capitalizeFirstLetter(this.refs.group.value.trim())
        const group = {
            groupName,
            userName 
        }
        AppActions.saveGroup(group);
        this.refs.group.value = '';

    }

    addUser(event) {
        event.preventDefault();

        function capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }

        const userName = capitalizeFirstLetter(this.refs.user.value)
        const addUser = {
            groupname: this.refs.type.value.trim(),
            userName
        }
        if (this.refs.type.value === '') {
            toastr.error("Select a group name from the drop down list")
        }
        else if (this.props.allUsers.includes(userName)) {
            AppActions.saveGroupUser(addUser);
        } else {
            toastr.error("The User dosen't exist")
        }
        this.refs.type.value = '';
        this.refs.user.value = '';

    }


    // Logout User
    logout(event) {
        event.preventDefault();
        AppActions.logout();

    }
}
