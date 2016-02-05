"use strict";

/*eslint-disable */
import React from 'react';
/*eslint-enable */

class TableHead extends React.Component {
  constructor(props) {
    super(props);
  }

  onChangeSelectAll = (e) => {
    if (this.props.onChangeSelectAll) {
      this.props.onChangeSelectAll(e);
    }
  };

  render() {
    return (
      <thead>
      <tr>
        <th>
          <input type="checkbox" onChange={this.onChangeSelectAll}/>
        </th>
        <th>ID</th>
        <th></th>
        <th>Username</th>
        <th>Email</th>
        <th>Created/updated</th>
      </tr>
      </thead>
    );
  }
}

export default TableHead;