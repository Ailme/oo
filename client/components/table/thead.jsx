"use strict";

/*eslint-disable */
import React from 'react';
/*eslint-enable */

class THead extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <thead>
      {this.props.children}
      </thead>
    );
  }
}

export default THead;
