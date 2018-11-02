import React from 'react';
import PropTypes from 'prop-types';


const UserListRow = ({user}) => {
  return (
    <tr>
      <td>{user.username}</td>
      <td>{user.timestamp.toString()}</td>
    </tr>
  );
};

UserListRow.propTypes = {
  user: PropTypes.object.isRequired
};

export default UserListRow;
