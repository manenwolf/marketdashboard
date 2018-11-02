import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import List from '../common/List';
class HomePage extends React.Component {
  constructor(props, context){
    super(props, context);
  this.topaandeel = "best";
  this.topmunt = "best";
  this.setaandeel = this.setaandeel.bind(this);
  this.setmunt = this.setmunt.bind(this);
  }

  mostResent(){
    let last20favorites = this.props.favorites.slice(-20);
    let data = [];
    data.push(...this.props.munten);
    data.push(...this.props.aandelen);
    return data.filter(d => {return last20favorites.includes(d.naam) });

  };
  topstocks(){
    let data = this.props.aandelen;
    var that = this;
    data.sort(function(a, b) {
      if(that.topaandeel == "best"){
      return a.prijsverandering - b.prijsverandering
      }else{
        return b.prijsverandering - a.prijsverandering
      }
    });
    data=data.slice(-10);
    
    data.reverse();
    
    return data;
  };
  topcurrency(){
    let data = this.props.munten;
    var that = this;
    data.sort(function(a, b) {
      if(that.topmunt == "best"){
      return a.prijsverandering - b.prijsverandering
      }else{
        return b.prijsverandering - a.prijsverandering
      }
    });
    data=data.slice(-10);
    
      data.reverse();
    
    return data;
  };
  
  setaandeel(){
    if(this.topaandeel == "best"){
        this.topaandeel ="worst";
    }else{
      this.topaandeel = "best";
    }
    this.forceUpdate() ;
  };

  setmunt(){
    if(this.topmunt == "best"){
      this.topmunt ="worst";
  }else{
    this.topmunt = "best";
  }
  this.forceUpdate() ;
  };

  render() {
    return (
      <div>
      <div className="jumbotron">
        <h1>wow homepage</h1>
      </div>
      
      {this.props.user && <div><h3>most resent followed</h3> <List data={this.mostResent()} /></div>}
      {!this.props.user && <p>login to follow stocks and currencies</p>}
      <h3>aandelen</h3>
      <input
                    className="btn btn-lg"
                    type="submit"
                    value = {this.topaandeel+" preforming"}
                    onClick={this.setaandeel}
                />
      <List data= {this.topstocks()} />
      <h3>munten</h3>
      <input
                    className="btn btn-lg"
                    type="submit"
                    value = {this.topmunt+" preforming"}
                    onClick={this.setmunt}
                />
      <List data= {this.topcurrency()} />
      </div>
    );
  }
}

function mapStateToProps(state, ownProps){
  return {
      munten: state.munten,
      aandelen: state.aandelen,
      user: state.user,
      favorites: state.favorites
  }
}

function mapDispatchToProps(dispatch){
  return {
      actions: bindActionCreators( dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

