import AppActions from '../actions/AppActions'
import axios from 'axios';
import firebase from '../../../../server/config'
 
module.exports = {
    saveContact(contact){
        axios.post('/user/signup', {
            username: contact.username,                     
            email: contact.email,
            password: contact.password
            }).then((response) => {
                console.log(response.data)
            const user = response.data; 
             
             AppActions.receiveLogin(user)
            
            }).catch(function (error) { 
                console.log(error);
            });                  
    },

    // Get all Contacts from database, this will use for validation
    getContacts(){
        axios.get('/user/database')
            .then(function (contacts) {
                
                AppActions.receiveContact(contacts.data)
            })
            .catch(function (error) {
                console.log(error);
            });
    },

    saveGroup(group){
        axios.post('/group', {
            groupName:group                   
            }).then(function (response) {
                console.log(response);              
            }).catch(function (error) {
                console.log(error);
            });                  
    },

     getGroups(){
        axios.get('/user/database')
            .then((group) => {
                // console.log(groups)
                const groups = group.data
                AppActions.receiveGroup(groups)
                console.log(groups)
            
            })
            .catch(function (error) {
                console.log(error);
            });
    },
     saveGroupUser(addUser){
       const groupName = addUser.groupname;
       const user = addUser.user;
        axios.post('/group/'+ groupName +"/"+user)
        .then(function (response) {
                console.log(response);
                
            }).catch(function (error) {
                console.log(error);
            });                  
    },
    saveMessages(message){
       const groupName = message.group;
        // const groupID = addUsers.groupID
       const messages = message.text;
        axios.post('/groups/'+ groupName +"/"+messages)
        .then(function (response) {
                console.log(response);
                
            }).catch(function (error) {
                console.log(error);
            });                  
    },

      getMessages(keyName){
        const groupName = keyName;
        axios.get('/groups/'+groupName)
            .then((message) => {
               
                AppActions.receiveMessages(message.data)
            })
            .catch(function (error) {
                console.log(error);
            });
    },

     login(contact){
        axios.post('/user/signin', {               
            email: contact.email,
            password: contact.password
            }).then(function (response) {
                // console.log('signin ing')
               const user = response.data.userData; 
             
             AppActions.receiveLogin(user)
               
                
            }).catch(function (error) {
                console.log(error);
            });                  
    },
     setLogout(){
        axios.post('/user/signout').then(function (response) {
              
             
             console.log(response)
               
                
            }).catch(function (error) {
                console.log(error);
            });                  
    },

    searchUserMessage(keyName){
        const groupName = keyName
        axios.get('/group/'+groupName)
            .then((users) => {  
                const user = users.data.Users
                console.log(user)
                                    
            AppActions.receiveUserMessage(user)
           })
            .catch(function (error) {
                console.log(error);
            });
    },




     google(){
        //  console.log('rar')
        // axios.post('/user/google', {               
        //     }).then(function (response) {
                         
        //     }).catch(function (error) {
        //         console.log(error);
        //     });                  
    },


                
    

};

