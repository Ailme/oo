"use strict";

/*eslint-disable */
import React, {PropTypes} from 'react';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
/*eslint-enable */
import AuthStore from '../store/auth';

export default class navigation extends React.Component {
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
      <Navbar inverse fixedTop={true} fluid={true}>
        <Navbar.Collapse>
          <Nav>
            <NavItem eventKey={1} href="/">Устройства</NavItem>
            <NavDropdown eventKey={2} title="Справочники" id="nav-drop-1">
              <MenuItem eventKey={2.1} href="/user">Пользователи</MenuItem>
              <MenuItem eventKey={2.2} href="/region">Регионы</MenuItem>
              <MenuItem eventKey={2.3} href="/area">Области</MenuItem>
              <MenuItem eventKey={2.4} href="/placing">Размещения</MenuItem>
              <MenuItem eventKey={2.5} href="/zone">Зоны</MenuItem>
              <MenuItem eventKey={2.6} href="/zone-user">Зоны клиента/партнера</MenuItem>
              <MenuItem eventKey={2.7} href="/vendor">Производители</MenuItem>
              <MenuItem eventKey={2.8} href="/model">Модели</MenuItem>
              <MenuItem eventKey={2.9} href="/type">Типы устройств</MenuItem>
              <MenuItem eventKey={2.10} href="/service-type">Типы обслуживания</MenuItem>
              <MenuItem eventKey={2.11} href="/service-category">Категории обслуживания</MenuItem>
              <MenuItem eventKey={2.12} href="/maintenance">Графики обслуживания</MenuItem>
            </NavDropdown>
          </Nav>
          <Nav pullRight>
            <NavDropdown eventKey={3} title="@" id="nav-drop-2">
              <MenuItem eventKey={3.1} href="/logout">Выйти</MenuItem>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
