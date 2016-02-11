"use strict";

/*eslint-disable */
import React from 'react';
/*eslint-enable */

class TableHead extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <thead>
      <tr>
        <th></th>
        <th>название</th>
        <th>пн</th>
        <th>вт</th>
        <th>ср</th>
        <th>чт</th>
        <th>пт</th>
        <th>сб</th>
        <th>вс</th>
        <th>праздники</th>
        <th>ночью</th>
        <th>дней</th>
      </tr>
      </thead>
    );
  }
}

export default TableHead;
