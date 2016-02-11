"use strict";

/*eslint-disable */
import React, {PropTypes} from 'react';
/*eslint-enable */

export default class Check extends React.Component {
  static propTypes = {
    check: PropTypes.bool
  };
  static defaultProps = {};

  constructor(props) {
    super(props);

    this.state = {}
  }

  componentWillMount() {

  }

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {

  }

  componentWillUpdate(nextProps, nextState) {

  }

  componentDidUpdate(prevProps, prevState) {

  }

  componentWillUnmount() {

  }

  render() {
    let defaultValue = this.props.default || "-";
    let isCheck = this.props.check || false;

    return (
      <span>
        {isCheck ? <i className="fa fa-fw fa-check text-success"></i> : defaultValue}
      </span>
    );
  }
}
