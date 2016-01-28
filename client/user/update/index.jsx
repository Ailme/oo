"use strict";

/*eslint-disable */
import React from 'react';
import {Grid, PageHeader, Row, Col, Input, Button} from 'react-bootstrap';
/*eslint-enable */
import {api} from '../config';
import Spinner from '../../components/spinner';

class UpdatePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      errors: {},
      id: this.props.params.id,
      email: '',
      password: '',
    };
  }

  componentWillReceiveProps(nextProps) {

  }

  componentWillMount() {
    if (this.state.id) {
      this.loadData();
    }
  }

  getFormData() {
    return {
      email: this.state.email,
      password: this.state.password
    };
  }

  onCancel = (e) => {
    e.preventDefault();

    this.props.history.goBack();
  };

  onChange = (e) => {
    let {name, value} = e.target;
    let errors = this.state.errors;

    errors[name] = e.target.validationMessage;

    this.setState({
      [name]: value,
      errors: errors,
    });

  };

  onSubmit = (e) => {
    e.preventDefault();

    if (e.target.checkValidity()) {
      this.setState({isLoading: true});
      this.sendData(this.getFormData())
    }
  };

  sendData(data) {
    let url = this.state.id ? api.update(this.state.id) : api.create;

    fetch(url, {
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
          const {history, location} = this.props;

          if (location.state && location.state.nextPathname) {
            history.replaceState(null, location.state.nextPathname)
          } else {
            history.replaceState(null, '/')
          }

          //this.props.history.replaceState(null, '/');
        } else {
          alert(json.message);
        }

        return null;
      }).bind(this))
      .catch((err => {
        this.setState({isLoading: false});
        console.log(err);
      }).bind(this));
  }

  loadData() {
    this.setState({isLoading: true});

    fetch(api.get(this.state.id), {
        method: 'get',
        credentials: 'include',
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'Accept': 'application/json'
        }
      }
    )
      .then(response => {
        return response.json();
      }).then((json => {
        let state = json;

        state.isLoading = false;
        this.setState(state);
      }).bind(this))
      .catch((err => {
        this.setState({isLoading: false});
        console.log(err);
      }).bind(this));
  }

  getStyleInput(name) {
    if (this.state.errors[name]) {
      return this.state.errors[name].length ? 'error' : 'success';
    } else {
      return null;
    }
  }

  render() {
    let isLoading = this.state.isLoading;
    let emailStyle = this.getStyleInput('email');
    let emailHelp = this.state.errors['email'];
    let passwordStyle = this.getStyleInput('password');
    let passwordHelp = this.state.errors['password'] || 'Мин. длина 6 символов';

    return (
      <Grid>
        <PageHeader>{this.props.route.title}</PageHeader>
        <Row>
          <Col sm={12}>
            <form ref="form" onSubmit={!isLoading ? this.onSubmit : null}>
              <Input type="email" label="Email" placeholder="email" onChange={this.onChange} ref="email"
                     name="email" required={true} readOnly={!!this.state.id} hasFeedback bsStyle={emailStyle}
                     help={emailHelp} value={this.state.email}/>
              <Input type="text" label="Password" placeholder="password" onChange={this.onChange}
                     ref="password" name="password" required={!!!this.state.id} minLength={6}
                     help={passwordHelp} hasFeedback bsStyle={passwordStyle}/>

              <Button onClick={this.onCancel}>Cancel</Button>
              {" "}
              <Button type="submit" bsStyle="primary" disabled={isLoading}>
                <Spinner visible={isLoading}/> Save
              </Button>
            </form>
          </Col>
        </Row>
      </Grid>
    )
  }
}

export default UpdatePage;
