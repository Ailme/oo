"use strict";

/*eslint-disable */
import React from 'react';
import {Link} from 'react-router';
import {ButtonToolbar, Button} from 'react-bootstrap';
/*eslint-enable */

export default class Toolbar extends React.Component {
  static propTypes = {};
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
    // respond to parameter change in scenario 3
    //let oldId = prevProps.params.invoiceId
    //let newId = this.props.params.invoiceId

  }

  componentWillUnmount() {

  }

  render() {
    return (
      <ButtonToolbar>
        <Link className="btn btn-success" to="/create">
          <i className="fa fa-fw fa-plus fa-lg"/> добавить
        </Link>
        <Link className="btn btn-default" to="/import">
          <i className="fa fa-fw fa-file-excel-o fa-lg"/> импорт
        </Link>
      </ButtonToolbar>
    )
  }
}
