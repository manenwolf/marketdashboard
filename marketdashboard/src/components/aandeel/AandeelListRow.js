import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

 

const AandeelListRow = ({aandeel,followed,loggedin, follow, unfollow}) => {
    
    
  return (
        <tr className={followed ? "success":""}>
            <td>{aandeel.naam}</td>
            <td>{aandeel.prijs}</td>
            <td>{aandeel.prijsverandering}</td>
            <td>{aandeel.prijsveranderingpercent}</td>
            <td>{(aandeel.stijgend && <FaArrowUp  color= "green"/>) || (!aandeel.stijgend && <FaArrowDown color= "red"/>) }</td>
           { loggedin &&    followed &&
                    <td><input
                    style={{width:  70}}
                    className="btn btn-primary btn-lg"
                    type="submit"
                    value = "unfollow"
                    onClick={unfollow.bind(this,aandeel)}
                /></td>}
                {loggedin && !followed &&
                    <td><input
                    style={{width: 70}}
                    className="btn btn-primary btn-lg"
                    type="submit"
                    value = "follow"
                    onClick={follow.bind(this,aandeel)}
                /></td>}
        </tr>
  );
};



export default AandeelListRow;