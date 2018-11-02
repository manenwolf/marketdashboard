import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

 

const CourseListRow = ({munt,followed,loggedin, follow, unfollow}) => {
    
    
  return (
        <tr className={followed ? "success":""}>
            <td>{munt.naam}</td>
            <td>{munt.prijs}</td>
            <td>{munt.prijsverandering}</td>
            <td>{munt.prijsveranderingpercent}</td>
            <td>{(munt.stijgend && <FaArrowUp  color= "green"/>) || (!munt.stijgend && <FaArrowDown color= "red"/>) }</td>
           { loggedin &&    followed &&
                    <td><input
                    style={{width:  70}}
                    className="btn btn-primary btn-lg"
                    type="submit"
                    value = "unfollow"
                    onClick={unfollow.bind(this,munt)}
                /></td>}
                {loggedin && !followed &&
                    <td><input
                    style={{width: 70}}
                    className="btn btn-primary btn-lg"
                    type="submit"
                    value = "follow"
                    onClick={follow.bind(this,munt)}
                /></td>}
        </tr>
  );
};



export default CourseListRow;