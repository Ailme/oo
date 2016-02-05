"use strict";

/*eslint-disable */
import React, {PropTypes} from 'react';
import {render} from 'react-dom';
import {Grid, PageHeader, Row, Col, Input, Button, Alert} from 'react-bootstrap';
/*eslint-enable */
import Spinner from '../../components/spinner';
import AuthStore from '../../store/auth';

class Login extends React.Component {
  static propTypes = {};
  static defaultProps = {};

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      hasLoaded: false,
      error: false,
      errorMessage: '',
    };
  }

  componentWillReceiveProps(nextProps) {
  }

  componentWillMount() {
  }

  onChange = (e) => {
    let {name, value} = e.target;
    this.setState({[name]: value.trim()});
  };

  onSubmit = (e) => {
    e.preventDefault();

    if (e.target.checkValidity()) {
      this.setState({hasLoaded: true});
      let _this = this;

      AuthStore.login(this.state.username, this.state.password, (err, user) => {
        if (err || !user) {
          return _this.setState({
            error: true,
            errorMessage: err,
            hasLoaded: false,
          });
        }

        document.location.href = "/";
      });
    }
  };

  renderErrorBlock() {
    if (this.state.error) {
      return <Alert bsStyle="danger">{this.state.errorMessage}</Alert>
    }
  }

  render() {
    let isLoading = this.state.isLoading;

    return (
      <Grid>
        <PageHeader>Log In</PageHeader>
        <Row>
          <Col sm={12}>
            {this.renderErrorBlock()}
            <form ref="form" onSubmit={!isLoading ? this.onSubmit : null}
                  className={this.state.error ? "has-error" : null}>
              <Input type="text" label="Email" placeholder="email" onChange={this.onChange} ref="username"
                     name="username" required={true}/>
              <Input type="password" label="Password" placeholder="password" onChange={this.onChange}
                     ref="password" name="password" required={true}/>

              <Button type="submit" bsStyle="primary" disabled={isLoading}>
                <Spinner visible={isLoading}/> Log In
              </Button>
            </form>
          </Col>
        </Row>
      </Grid>
    )
  }
}

render(<Login />, document.getElementById('content'));
