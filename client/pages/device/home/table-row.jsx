"use strict";

/*eslint-disable */
import React from 'react';
import {DropdownButton, MenuItem} from 'react-bootstrap';
import classNames from 'classnames';
import moment from 'moment';
/*eslint-enable */

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

  onChangeStatus = (value) => {
    if (this.props.onChangeStatus) {
      this.props.onChangeStatus(this.props.data.id, value);
    }
  };

  render() {
    let item = this.props.data;
    let trClasses = classNames({
      'selected': this.state.isSelected
    });
    let createdAt = moment(item.created_at);
    let updatedAt = moment(item.updated_at);

    return (
      <tr className={trClasses}>
        <td width="24">
          <input type="checkbox" checked={this.state.isSelected} onChange={this.onChangeSelected}/>
        </td>
        <td width="100">
          <DropdownButton bsSize="xsmall" title={item.id} id={`dropdown-${item.id}`}>
            <MenuItem eventKey={item.id} onSelect={this.props.onEdit} className="text-primary">Edit</MenuItem>
            <MenuItem divider/>
            <MenuItem eventKey={item.id} onSelect={this.props.onDelete} className="text-danger">Delete</MenuItem>
          </DropdownButton>
        </td>
        <td>{item.clientName}</td>
        <td>{item.client_id}</td>
        <td>
          {createdAt.format("DD.MM.YYYY HH:mm")}
          {" / "}
          {updatedAt.format("DD.MM.YYYY HH:mm")}
        </td>
      </tr>
    );
  }
}

export default TableRow;
