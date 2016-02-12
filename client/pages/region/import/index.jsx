"use strict";

/*eslint-disable */
import React from 'react';
import {Grid, PageHeader, Row, Col, Input, Button} from 'react-bootstrap';
import Dropzone from 'react-dropzone';
/*eslint-enable */
import {api} from '../config';
import Spinner from '../../../components/spinner';

export default class ImportPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
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
      files: files
    });

    let data = new FormData();

    files.forEach((file)=> {
      data.append('file', file.name);
    });

    fetch(api.import, {
      method: 'post',
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
      },
      body: data
    })
  };

  render() {
    return (
      <Grid>
        <PageHeader>Импорт</PageHeader>
        <Row>
          <Col sm={12}>
            <Button onClick={this.onCancel}>Отмена</Button>
            <hr />
            <Dropzone onDrop={this.onDrop}>
              <div>Перетащите файлы сюда или нажмите, чтобы выбрать файлы для загрузки.</div>
            </Dropzone>
          </Col>
        </Row>
      </Grid>
    )
  }
}
