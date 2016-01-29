"use strict";

/*eslint-disable */
import React from 'react';
import {Grid, PageHeader, Row, Col} from 'react-bootstrap';
/*eslint-enable */
import {api, url} from '../config';
import Toolbar from './toolbar';
import Table from './table';

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      items: [],
    };
  }

  componentWillReceiveProps(nextProps) {

  }

  componentWillMount() {
    this.loadData();
  }

  loadData() {
    this.loadItemsFromServer();
  }

  loadItemsFromServer() {
    this.setState({isLoading: true});

    fetch(api.get(), {
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
        this.setState({
          items: json,
          isLoading: false
        });
      }).bind(this))
      .catch((err => {
        this.setState({isLoading: false});
        console.log(err);
      }).bind(this));
  }

  onEdit = (e, eventKey, href) => {
    let {history} = this.props;

    history.pushState(null, `/update/${eventKey}`)
  };

  onDelete = (e, eventKey, href) => {
    if (confirm("Продолжить удаление?")) {
      this.sendDelete(eventKey);
    }
  };

  sendDelete(id) {
    fetch(api.delete(id), {
        method: 'delete',
        credentials: 'include',
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      }
    )
      .then(response => {
        return response.json();
      }).then((json => {
        this.setState({isLoading: false});

        if (json.success) {
          this.loadData();
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

  onChangeStatus = (id, value) => {
    this.setState({isLoading: true});

    fetch(api.updateStatus(id), {
        method: 'post',
        credentials: 'include',
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(value)
      }
    )
      .then(response => {
        return response.json();
      }).then((json => {
        this.setState({isLoading: false});

        if (json.success) {
          this.loadData();
        } else {
          let message = json.message || json.error;
          alert(message);
        }

        return null;
      }).bind(this))
      .catch((err => {
        this.setState({isLoading: false});
        console.log(err);
      }).bind(this));
  };

  render() {
    return (
      <Grid fluid={true}>
        <PageHeader>{this.props.route.title}</PageHeader>
        <Toolbar />

        <Row>
          <Col sm={12}>
            <Table data={this.state.items} onEdit={this.onEdit} onDelete={this.onDelete}
                   onChangeStatus={this.onChangeStatus}/>
          </Col>
        </Row>
      </Grid>
    )
  }
}

export default HomePage;
