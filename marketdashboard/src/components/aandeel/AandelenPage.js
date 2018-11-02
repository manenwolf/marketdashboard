
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
//import * as muntActions from './MuntList';
import { FaSort } from 'react-icons/fa';
import AandeelListRow from './AandeelListRow';
import * as loginActions from "../../actions/userActions";



  

class AandelenPage extends React.Component {
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
       follow(aandeel){
           console.log("add aandeel");
           console.log(aandeel);
        this.props.actions.addFavorite(aandeel.naam, this.props.user)
        .then(function(){
            
        })
    };
     unfollow(aandeel){
        this.props.actions.removeFavorite(aandeel.naam,this.props.user)
        .then(function(){
        })
    };
    
      
    render(){
        const {aandelen} = this.props;
        if(this.order == 'name'){
            aandelen.sort(function(a, b) {return a.naam.localeCompare(b.naam);});
        }
        if(this.order == 'value'){
            aandelen.sort(function(a, b) {return a.prijs - b.prijs});
        }
        if(this.order == 'change'){
            aandelen.sort(function(a, b) {  return b.prijsverandering - a.prijsverandering});
        }
        if(this.order == 'changepercent'){
            aandelen.sort(function(a, b) {return b.prijsveranderingpercent - a.prijsveranderingpercent});
        }
        var that = this;
        if(this.order == 'followed'){
            
            aandelen.sort(function(a, b) {return that.props.favorites.includes(a.naam)? -1 : 1});
        }
        return(
 
            <div>
                <h1>aandelen</h1>
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
                    {aandelen.map(aandeel =>
                   
                    <AandeelListRow 
                        key={aandeel.naam} 
                        aandeel={aandeel} 
                        username={this.props.user && this.props.user.username} 
                        loggedin={this.props.user} 
                        followed={this.props.user && this.props.favorites.includes(aandeel.naam)}
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
        aandelen: state.aandelen,
        user: state.user,
        favorites: state.favorites
    }
}

function mapDispatchToProps(dispatch){
    return {
        actions: bindActionCreators(loginActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AandelenPage);