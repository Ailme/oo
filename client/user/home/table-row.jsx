"use strict";

/*eslint-disable */
import React from 'react';
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
        <td width="100">{item.id}</td>
        <td>{item.email}</td>
      </tr>
    );
  }
}

export default TableRow;
