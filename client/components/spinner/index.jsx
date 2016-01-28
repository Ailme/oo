"use strict";

/*eslint-disable */
import React from 'react';
/*eslint-enable */

class Spinner extends React.Component {
  static propTypes = {};

  constructor(props) {
    super(props);

    this.state = {};
  }

  componentWillReceiveProps(nextProps) {
  }

  componentWillMount() {
  }

  render() {
    if (this.props.visible) {
      return <i className="fa fa-fw fa-spinner fa-pulse"/>;
    } else {
      return null;
    }
  }
}

export default Spinner;
