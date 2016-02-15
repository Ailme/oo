"use strict";

/*eslint-disable */
import React, {PropTypes} from 'react';
/*eslint-enable */

class Spinner extends React.Component {
  static propTypes = {
    visible: PropTypes.bool,
  };

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
    }

    return null;
  }
}

export default Spinner;
