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

  render() {
    return (
      <Grid fluid={true}>
        <PageHeader>{this.props.route.title}</PageHeader>
        <Toolbar />

        <Row>
          <Col sm={12}>
            <Table data={this.state.items}/>
          </Col>
        </Row>
      </Grid>
    )
  }
}

export default HomePage;
