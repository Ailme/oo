"use strict";

/*eslint-disable */
import React from 'react';
/*eslint-enable */

class Th extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <th>
        {this.props.children}
      </th>
    );
  }
}

export default Th;
