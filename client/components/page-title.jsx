"use strict";

/*eslint-disable */
import React from 'react';
/*eslint-enable */

class PageTitle extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="page-header">
        <h1 className="text-uppercase">{this.props.title}</h1>
      </div>
    )
  }
}

export default PageTitle;
