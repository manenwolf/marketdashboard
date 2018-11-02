import React from 'react';
import PropTypes from 'prop-types'
import Row from './Row'
const List = ({data}) => {
    return (
      <table className="table">
        <thead>
        <tr>
            <th>name</th>
            <th>value</th>
            <th>change</th>
            <th>changepercent</th>
            <th>direction</th>
        </tr>
        </thead>
        <tbody>
            
        {data.map(d =>
          <Row key={d.naam} d={d}/>
        )}
        </tbody>
      </table>
    );
  };

  
  List.propTypes = {
    data: PropTypes.array.isRequired
  };
  
  export default List;