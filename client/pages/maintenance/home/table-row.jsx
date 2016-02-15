"use strict";

/*eslint-disable */
import React from 'react';
import {DropdownButton, MenuItem} from 'react-bootstrap';
import classNames from 'classnames';
/*eslint-enable */
import {IconCheck} from '../../../components/icon';


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

  getDay(day) {
    let item = this.props.data;
    return item['day_' + day + '_begin'] ? item['day_' + day + '_begin'] + ' - ' + item['day_' + day + '_end'] : '-';
  }

  render() {
    let item = this.props.data;
    let trClasses = classNames({
      'selected': this.state.isSelected
    });

    return (
      <tr className={trClasses}>
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
        <td>{this.getDay(1)}</td>
        <td>{this.getDay(2)}</td>
        <td>{this.getDay(3)}</td>
        <td>{this.getDay(4)}</td>
        <td>{this.getDay(5)}</td>
        <td>{this.getDay(6)}</td>
        <td>{this.getDay(7)}</td>
        <td><IconCheck check={item.work_in_holiday}/></td>
        <td><IconCheck check={item.work_in_night}/></td>
        <td>{item.days}</td>
      </tr>
    );
  }
}

export default TableRow;
