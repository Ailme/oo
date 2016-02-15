"use strict";

/*eslint-disable */
import React from 'react';
import {Grid, PageHeader, Row, Col, Button, ButtonToolbar, Alert} from 'react-bootstrap';
import Dropzone from 'react-dropzone';
import Halogen from 'halogen';
/*eslint-enable */
import {api} from '../config';
import {IconExcel} from '../../../components/icon';

export default class ImportPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      error: false,
      files: [],
    };
  }

  componentWillReceiveProps(nextProps) {

  }

  componentWillMount() {

  }


  onCancel = (e) => {
    e.preventDefault();

    this.props.history.goBack();
  };

  onSubmit = (e) => {
    e.preventDefault();

  };

  onDrop = (files) => {
    this.setState({
      isLoading: true,
      files: files,
      error: false,
    });

    let data = new FormData();

    files.forEach((file)=> {
      data.append('file', file, file.name);
    });

    fetch(api.import, {
      method: 'post',
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
      },
      body: data
    })
      .then(response => {
        return response.json();
      })
      .then((json => {
        this.setState({
          isLoading: false,
          error: json.error,
          message: json.success ? 'Импорт завершен' : false,
        });
      }).bind(this))
      .catch((err => {
        this.setState({
          isLoading: false,
          error: err
        });
        console.error(err);
      }).bind(this));
  };

  renderDropZone() {
    return (
      <Dropzone onDrop={this.onDrop} className="dropzone" multiple={false}>
        <div>Перетащите файлы сюда или нажмите, чтобы выбрать файлы для загрузки.</div>
      </Dropzone>
    )
  }

  renderError() {
    if (this.state.error) {
      return (
        <Alert bsStyle="danger">
          {this.state.error.map((msg) => {
            return <p>{msg}</p>
          })}
        </Alert>
      )
    } else {
      return null;
    }
  }

  renderInfo() {
    if (this.state.message) {
      return (
        <Alert bsStyle="info">
          <p>{this.state.message}</p>
        </Alert>
      )
    } else {
      return null;
    }
  }

  render() {
    let isLoading = this.state.isLoading;

    return (
      <Grid>
        <PageHeader>Импорт</PageHeader>
        <Row>
          <Col sm={12}>
            <ButtonToolbar>
              <Button onClick={this.onCancel}>Отмена</Button>
              <Button href="/docs/import-template.xlsx">
                <IconExcel size="lg"/> Шаблон для импорта
              </Button>
            </ButtonToolbar>
            <hr />
            {this.renderInfo()}
            {this.renderError()}
            <Halogen.GridLoader color="#004d40" loading={isLoading}/>
            {isLoading ? null : this.renderDropZone()}
          </Col>
        </Row>
      </Grid>
    )
  }
}
