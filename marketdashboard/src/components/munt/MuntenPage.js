
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
//import * as muntActions from './MuntList';
import { FaSort } from 'react-icons/fa';
import CourseListRow from './MuntListRow';
import * as loginActions from "../../actions/userActions";



  

class MuntenPage extends React.Component {
    constructor(props, context){
        super(props, context);

        this.orderByName = this.orderByName.bind(this);
        this.orderByValue = this.orderByValue.bind(this);
        this.orderByChange = this.orderByChange.bind(this);
        this.orderByChangepercent= this.orderByChangepercent.bind(this);
        this.orderbyFollowed=this.orderbyFollowed.bind(this);
        this.follow = this.follow.bind(this);
        this.unfollow = this.unfollow.bind(this);

        
        this.order = 'name';
        
    }
     orderByName(e){
        e.preventDefault();

        this.order ='name';
        this.forceUpdate() ;
         }
      
      
       orderByValue(e){
        e.preventDefault();
        this.order ='value';
        this.forceUpdate();
      }
       orderByChange(e){
        e.preventDefault();
        this.order ='change';
        this.forceUpdate();
      }
      orderByChangepercent(e){
        e.preventDefault();
        this.order ='changepercent';
        this.forceUpdate();
      }
      orderbyFollowed(e){
        e.preventDefault();
        this.order ='followed';
        this.forceUpdate();
      }
       follow(munt){
        this.props.actions.addFavorite(munt.naam, this.props.user)
        .then(function(){
            
        })
    };
     unfollow(munt){
        this.props.actions.removeFavorite(munt.naam,this.props.user)
        .then(function(){
        })
    };
    
      
    render(){
        const {munten} = this.props;
        if(this.order == 'name'){
            munten.sort(function(a, b) {return a.naam.localeCompare(b.naam);});
        }
        if(this.order == 'value'){
            munten.sort(function(a, b) {return a.prijs - b.prijs});
        }
        if(this.order == 'change'){
            munten.sort(function(a, b) {  return b.prijsverandering - a.prijsverandering});
        }
        if(this.order == 'changepercent'){
            munten.sort(function(a, b) {return b.prijsveranderingpercent - a.prijsveranderingpercent});
        }
        var that = this;
        if(this.order == 'followed'){
            
            munten.sort(function(a, b) {return that.props.favorites.includes(a.naam)? -1 : 1});
        }
        return(
 
            <div>
                <h1>munten</h1>
                <table className="table">
                    <thead>
                    <tr>
            
                    <th><a  href='#' onClick={this.orderByName}>name<FaSort /></a></th>
                    <th><a href='#' onClick={this.orderByValue}>value<FaSort /></a></th>
                    <th><a href='#' onClick={this.orderByChange}>change<FaSort /></a></th>
                    <th><a href='#' onClick={this.orderByChangepercent}>changepercent<FaSort /></a></th>
                    <th>direction</th>
                    {this.props.user && <th><a href='#' onClick={this.orderbyFollowed}>followed<FaSort /></a></th>}

                    </tr>
                    </thead>
                    <tbody>
                    {munten.map(munt =>
                   
                    <CourseListRow 
                        key={munt.naam} 
                        munt={munt} 
                        username={this.props.user && this.props.user.username} 
                        loggedin={this.props.user} 
                        followed={this.props.user && this.props.favorites.includes(munt.naam)}
                        follow = {this.follow}
                        unfollow={this.unfollow}
                    />
                    )}
                    </tbody>
                </table>
            </div>
        )
    }
}

function mapStateToProps(state, ownProps){
    return {
        munten: state.munten,
        user: state.user,
        favorites: state.favorites
    }
}

function mapDispatchToProps(dispatch){
    return {
        actions: bindActionCreators(loginActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MuntenPage);