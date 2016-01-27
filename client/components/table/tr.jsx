"use strict";

/*eslint-disable */
import React from 'react';
/*eslint-enable */

class Tr extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <tr>
        {this.props.children}
      </tr>
    );
  }
}

export default Tr;
