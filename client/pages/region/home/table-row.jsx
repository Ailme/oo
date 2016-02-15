"use strict";

/*eslint-disable */
import React from 'react';
import {DropdownButton, MenuItem} from 'react-bootstrap';
import classNames from 'classnames';
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

    return (
      <tr className={trClasses}>
        <td width="24">
          <input type="checkbox" checked={this.state.isSelected} onChange={this.onChangeSelected}/>
        </td>
        <td width="100">
          <DropdownButton bsSize="xsmall" title={item.id} id={`dropdown-${item.id}`}>
            <MenuItem eventKey={item.id} onSelect={this.props.onEdit}
                      className="text-primary">Изменить</MenuItem>
            <MenuItem divider/>
            <MenuItem eventKey={item.id} onSelect={this.props.onDelete}>
              <span className="text-danger">Удалить</span>
            </MenuItem>
          </DropdownButton>
        </td>
        <td>{item.name}</td>
      </tr>
    );
  }
}

export default TableRow;
