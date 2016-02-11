"use strict";

/*eslint-disable */
import React from 'react';
import {Grid, PageHeader, Row, Col, Input, Button} from 'react-bootstrap';
/*eslint-enable */
import {api} from '../config';
import Spinner from '../../../components/spinner';

class UpdatePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      errors: {},
      id: this.props.params.id,
      name: '',
      day_1_begin: '',
      day_1_end: '',
      day_2_begin: '',
      day_2_end: '',
      day_3_begin: '',
      day_3_end: '',
      day_4_begin: '',
      day_4_end: '',
      day_5_begin: '',
      day_5_end: '',
      day_6_begin: '',
      day_6_end: '',
      day_7_begin: '',
      day_7_end: '',
      work_in_holiday: false,
      work_in_night: false,
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
      name: this.state.name.trim(),
      day_1_begin: this.state.day_1_begin.trim(),
      day_1_end: this.state.day_1_end.trim(),
      day_2_begin: this.state.day_2_begin.trim(),
      day_2_end: this.state.day_2_end.trim(),
      day_3_begin: this.state.day_3_begin.trim(),
      day_3_end: this.state.day_3_end.trim(),
      day_4_begin: this.state.day_4_begin.trim(),
      day_4_end: this.state.day_4_end.trim(),
      day_5_begin: this.state.day_5_begin.trim(),
      day_5_end: this.state.day_5_end.trim(),
      day_6_begin: this.state.day_6_begin.trim(),
      day_6_end: this.state.day_6_end.trim(),
      day_7_begin: this.state.day_7_begin.trim(),
      day_7_end: this.state.day_7_end.trim(),
      work_in_holiday: this.state.work_in_holiday ? 1 : 0,
      work_in_night: this.state.work_in_night ? 1 : 0,
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

  onChangeCheck = (e) => {
    let {name, checked} = e.target;
    let errors = this.state.errors;

    errors[name] = e.target.validationMessage;

    this.setState({
      [name]: checked,
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

        } else {
          alert(json.message);
        }

        return null;
      }).bind(this))
      .catch((err => {
        this.setState({isLoading: false});
        console.error(err);
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
        console.error(err);
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
    let nameStyle = this.getStyleInput('name');
    let nameHelp = this.state.errors['name'] || "не более 10 символов";
    let day1BeginStyle = this.getStyleInput('day_1_begin');
    let day1EndStyle = this.getStyleInput('day_1_end');
    let day2BeginStyle = this.getStyleInput('day_2_begin');
    let day2EndStyle = this.getStyleInput('day_2_end');
    let day3BeginStyle = this.getStyleInput('day_3_begin');
    let day3EndStyle = this.getStyleInput('day_3_end');
    let day4BeginStyle = this.getStyleInput('day_4_begin');
    let day4EndStyle = this.getStyleInput('day_4_end');
    let day5BeginStyle = this.getStyleInput('day_5_begin');
    let day5EndStyle = this.getStyleInput('day_5_end');
    let day6BeginStyle = this.getStyleInput('day_6_begin');
    let day6EndStyle = this.getStyleInput('day_6_end');
    let day7BeginStyle = this.getStyleInput('day_7_begin');
    let day7EndStyle = this.getStyleInput('day_7_end');

    return (
      <Grid>
        <PageHeader>{this.state.id ? "Изменить" : "Создать"}</PageHeader>
        <Row>
          <Col sm={12}>
            <form ref="form" onSubmit={!isLoading ? this.onSubmit : null}>
              <Input type="text" label="Название" placeholder="Название" onChange={this.onChange}
                     ref="name" name="name" required={true} hasFeedback bsStyle={nameStyle}
                     help={nameHelp} value={this.state.name} autoComplete="off" maxLength="10" autofocus={true}/>

              <Row>
                <Col xs={6}>
                  <Input type="text" label="Пн" placeholder="09:00" onChange={this.onChange}
                         ref="day_1_begin" name="day_1_begin" hasFeedback bsStyle={day1BeginStyle}
                         value={this.state.day_1_begin} autoComplete="off" maxLength="5" pattern="\d{2}:\d{2}"/>
                </Col>
                <Col xs={6}>
                  <Input type="text" label="Пн" placeholder="18:00" onChange={this.onChange}
                         ref="day_1_end" name="day_1_end" hasFeedback bsStyle={day1EndStyle}
                         value={this.state.day_1_end} autoComplete="off" maxLength="5" pattern="\d{2}:\d{2}"/>
                </Col>
              </Row>

              <Row>
                <Col xs={6}>
                  <Input type="text" label="Вт" placeholder="09:00" onChange={this.onChange}
                         ref="day_2_begin" name="day_2_begin" hasFeedback bsStyle={day2BeginStyle}
                         value={this.state.day_2_begin} autoComplete="off" maxLength="5" pattern="\d{2}:\d{2}"/>
                </Col>
                <Col xs={6}>
                  <Input type="text" label="Вт" placeholder="18:00" onChange={this.onChange}
                         ref="day_2_end" name="day_2_end" hasFeedback bsStyle={day2EndStyle}
                         value={this.state.day_2_end} autoComplete="off" maxLength="5" pattern="\d{2}:\d{2}"/>
                </Col>
              </Row>

              <Row>
                <Col xs={6}>
                  <Input type="text" label="Ср" placeholder="09:00" onChange={this.onChange}
                         ref="day_3_begin" name="day_3_begin" hasFeedback bsStyle={day3BeginStyle}
                         value={this.state.day_3_begin} autoComplete="off" maxLength="5" pattern="\d{2}:\d{2}"/>
                </Col>
                <Col xs={6}>
                  <Input type="text" label="Ср" placeholder="18:00" onChange={this.onChange}
                         ref="day_3_end" name="day_3_end" hasFeedback bsStyle={day3EndStyle}
                         value={this.state.day_3_end} autoComplete="off" maxLength="5" pattern="\d{2}:\d{2}"/>
                </Col>
              </Row>

              <Row>
                <Col xs={6}>
                  <Input type="text" label="Чт" placeholder="09:00" onChange={this.onChange}
                         ref="day_4_begin" name="day_4_begin" hasFeedback bsStyle={day4BeginStyle}
                         value={this.state.day_4_begin} autoComplete="off" maxLength="5" pattern="\d{2}:\d{2}"/>
                </Col>
                <Col xs={6}>
                  <Input type="text" label="Чт" placeholder="18:00" onChange={this.onChange}
                         ref="day_4_end" name="day_4_end" hasFeedback bsStyle={day4EndStyle}
                         value={this.state.day_4_end} autoComplete="off" maxLength="5" pattern="\d{2}:\d{2}"/>
                </Col>
              </Row>

              <Row>
                <Col xs={6}>
                  <Input type="text" label="Пт" placeholder="09:00" onChange={this.onChange}
                         ref="day_5_begin" name="day_5_begin" hasFeedback bsStyle={day5BeginStyle}
                         value={this.state.day_5_begin} autoComplete="off" maxLength="5" pattern="\d{2}:\d{2}"/>
                </Col>
                <Col xs={6}>
                  <Input type="text" label="Пт" placeholder="18:00" onChange={this.onChange}
                         ref="day_5_end" name="day_5_end" hasFeedback bsStyle={day5EndStyle}
                         value={this.state.day_5_end} autoComplete="off" maxLength="5" pattern="\d{2}:\d{2}"/>
                </Col>
              </Row>

              <Row>
                <Col xs={6}>
                  <Input type="text" label="Сб" placeholder="09:00" onChange={this.onChange}
                         ref="day_6_begin" name="day_6_begin" hasFeedback bsStyle={day6BeginStyle}
                         value={this.state.day_6_begin} autoComplete="off" maxLength="5" pattern="\d{2}:\d{2}"/>
                </Col>
                <Col xs={6}>
                  <Input type="text" label="Сб" placeholder="18:00" onChange={this.onChange}
                         ref="day_6_end" name="day_6_end" hasFeedback bsStyle={day6EndStyle}
                         value={this.state.day_6_end} autoComplete="off" maxLength="5" pattern="\d{2}:\d{2}"/>
                </Col>
              </Row>

              <Row>
                <Col xs={6}>
                  <Input type="text" label="Вс" placeholder="09:00" onChange={this.onChange}
                         ref="day_7_begin" name="day_7_begin" hasFeedback bsStyle={day7BeginStyle}
                         value={this.state.day_7_begin} autoComplete="off" maxLength="5" pattern="\d{2}:\d{2}"/>
                </Col>
                <Col xs={6}>
                  <Input type="text" label="Вс" placeholder="18:00" onChange={this.onChange}
                         ref="day_7_end" name="day_7_end" hasFeedback bsStyle={day7EndStyle}
                         value={this.state.day_7_end} autoComplete="off" maxLength="5" pattern="\d{2}:\d{2}"/>
                </Col>
              </Row>

              <Input type="checkbox" label="Работа в праздничные дни" checked={this.state.work_in_holiday}
                     onChange={this.onChangeCheck} ref="work_in_holiday" name="work_in_holiday" value="1"/>
              <Input type="checkbox" label="Работа ночью" checked={this.state.work_in_night}
                     onChange={this.onChangeCheck} ref="work_in_night" name="work_in_night" value="1"/>

              <Button onClick={this.onCancel}>Отмена</Button>
              {" "}
              <Button type="submit" bsStyle="primary" disabled={isLoading}>
                <Spinner visible={isLoading}/> Сохранить
              </Button>
            </form>
          </Col>
        </Row>
      </Grid>
    )
  }
}

export default UpdatePage;
