"use strict";

/*eslint-disable */
import React from 'react';
import {render} from 'react-dom';
import {Grid, PageHeader, Row, Col, Input, Button} from 'react-bootstrap';
/*eslint-enable */
import {api} from './config';
import Spinner from '../components/spinner';

class Login extends React.Component {
  static propTypes = {};

  constructor(props) {
    super(props);

    this.state = {
      title: 'Log in',
      email: '',
      password: '',
      isLoading: false,
      errors: {},
    };
  }

  componentWillReceiveProps(nextProps) {
  }

  componentWillMount() {
  }

  getFormData() {
    return {
      email: this.state.email,
      password: this.state.password,
    };
  }

  onChange = (e) => {
    let {name, value} = e.target;

    this.setState({[name]: value});
  };

  onSubmit = (e) => {
    e.preventDefault();

    if (e.target.checkValidity()) {
      this.setState({isLoading: true});
      this.sendData(this.getFormData())
    }
  };

  sendData(data) {
    fetch(api.login, {
        method: 'post',
        credentials: 'include',
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }
    )
      .then(response => {
        return response.json();
      }).then((json => {
        this.setState({isLoading: false});

        if (json.success) {
          document.location.href = '/';
        } else {
          alert(json.error);
        }

        return null;
      }).bind(this))
      .catch((err => {
        this.setState({isLoading: false});
        console.log(err);
      }).bind(this));
  }

  render() {
    let isLoading = this.state.isLoading;

    return (
      <Grid>
        <PageHeader>{this.state.title}</PageHeader>
        <Row>
          <Col sm={12}>
            <form ref="form" onSubmit={!isLoading ? this.onSubmit : null}>
              <Input type="text" label="Email" placeholder="email" onChange={this.onChange} ref="email"
                     name="email" required={true}/>
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
