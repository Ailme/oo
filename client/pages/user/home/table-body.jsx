"use strict";

/*eslint-disable */
import React from 'react';
/*eslint-enable */
import TableRow from './table-row';

class TableBody extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let rows = this.props.data.map((function (row) {
      return (
        <TableRow data={row} key={row.id} isSelectedAll={this.props.isSelectedAll} onEdit={this.props.onEdit} onDelete={this.props.onDelete} onChangeStatus={this.props.onChangeStatus}/>
      )
    }).bind(this));

    return (
      <tbody>
      {rows}
      </tbody>
    );
  }
}

export default TableBody;
