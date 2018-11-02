import React from 'react';
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import UserList from './UserList'
import * as userActions from '../../actions/userActions'
import toastr from "toastr";

class ManageUserListPage extends React.Component {
    constructor(props, context){
        super(props, context);
        this.props.actions.loadUsers();
        
        toastr.success("dieter2");
        toastr.success(this.props.users);

    }
    componentDidMount() {
        console.log("dieter");
        console.log(this.props.users);
        this.props.actions.loadUsers().then(() =>{
            
        })   


    }
    render(){
        const {users} = this.props;

        return(
            <div>
                <h1>munten</h1>
                <UserList users={users} />
            </div>
        )
    }
}


function mapStateToProps(state, ownProps){
    return {
        users: state.users
    }
}

function mapDispatchToProps(dispatch){
    return {
        actions: bindActionCreators(userActions,dispatch)
    };
}

export default  connect(mapStateToProps, mapDispatchToProps)(ManageUserListPage);