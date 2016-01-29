"use strict";

/*eslint-disable */
import React from 'react';
/*eslint-enable */
import TableComponent from '../../components/table/table';
import TableHead from './table-head';
import TableBody from './table-body';

class Table extends React.Component {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);

    this.state = {
      isSelectedAll: false,
    };
  }

  onChangeSelectAll = (e) => {
    this.setState({
      isSelectedAll: e.target.checked
    })
  };

  render() {
    return (
      <TableComponent striped={true} condensed={true} hover={true} responsive={false}>
        <TableHead onChangeSelectAll={this.onChangeSelectAll}/>
        <TableBody data={this.props.data} isSelectedAll={this.state.isSelectedAll} onEdit={this.props.onEdit} onDelete={this.props.onDelete} onChangeStatus={this.props.onChangeStatus}/>
      </TableComponent>
    );
  }
}

export default Table;
