import React from 'react';
import PropTypes from 'prop-types';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

const UserListRow = ({d}) => {
  return (
    <tr>
            <td>{d.naam}</td>
            <td>{d.prijs}</td>
            <td>{d.prijsverandering}</td>
            <td>{d.prijsveranderingpercent}</td>
            <td>{(d.stijgend && <FaArrowUp  color= "green"/>) || (!d.stijgend && <FaArrowDown color= "red"/>) }</td>
    </tr>
  );
};

UserListRow.propTypes = {
  d: PropTypes.object.isRequired
};

export default UserListRow;
