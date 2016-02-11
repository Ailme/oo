"use strict";

/*eslint-disable */
import React from 'react';
import {Link} from 'react-router';
import {ButtonToolbar, Button} from 'react-bootstrap';
/*eslint-enable */

class Toolbar extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {

  }

  componentWillMount() {

  }

  render() {
    return (
      <ButtonToolbar>
        <Link className="btn btn-success btn-xs" to="/create">
          <i className="fa fa-fw fa-plus fa-lg"/>
        </Link>
      </ButtonToolbar>
    )
  }
}

export default Toolbar;
