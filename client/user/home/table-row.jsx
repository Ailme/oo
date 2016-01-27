"use strict";

/*eslint-disable */
import React from 'react';
import {DropdownButton, MenuItem} from 'react-bootstrap';
import classNames from 'classnames';
import moment from 'moment';
/*eslint-enable */
import {url} from '../config';

class TableRow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isSelected: this.props.isSelectedAll,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      isSelected: nextProps.isSelectedAll,
    });
  }

  onChangeSelected = (e) => {
    this.setState({
      isSelected: e.target.checked
    })
  };

  render() {
    let item = this.props.data;
    let trClasses = classNames({
      'selected': this.state.isSelected
    });
    let createdAt = moment(item.createdAt);
    let updatedAt = moment(item.updatedAt);

    return (
      <tr className={trClasses}>
        <td width="24">
          <input type="checkbox" checked={this.state.isSelected} onChange={this.onChangeSelected}/>
        </td>
        <td width="100">
          <DropdownButton bsSize="xsmall" title={item.id} id={`dropdown-${item.id}`}>
            <MenuItem eventKey={item.id} onSelect={this.props.onEdit}>Edit</MenuItem>
            <MenuItem eventKey={item.id}>Banned</MenuItem>
            <MenuItem divider />
            <MenuItem eventKey={item.id} onSelect={this.props.onDelete}>Delete</MenuItem>
          </DropdownButton>
        </td>
        <td>{item.email}</td>
        <td>
          {createdAt.format("DD.MM.YYYY HH:mm")}
          {" / "}
          {updatedAt.format("DD.MM.YYYY HH:mm")}
        </td>
        <td>{item.password}</td>
      </tr>
    );
  }
}

export default TableRow;
