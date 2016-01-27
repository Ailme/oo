'use strict';

/*eslint-disable */
import React from 'react';
/*eslint-enable */

class Page extends React.Component {

  static propTypes = {
    children: React.PropTypes.any
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }

}

export default Page;
