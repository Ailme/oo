"use strict";

/*eslint-disable */
import React from 'react';
import classNames from 'classnames';
/*eslint-enable */

class Table extends React.Component {
  static propTypes = {
    striped: React.PropTypes.bool,
    bordered: React.PropTypes.bool,
    condensed: React.PropTypes.bool,
    hover: React.PropTypes.bool,
    responsive: React.PropTypes.bool
  };

  static defaultProps = {
    bordered: false,
    condensed: false,
    hover: false,
    responsive: false,
    striped: false
  };

  constructor(props) {
    super(props);
  }

  render() {
    let wrapperClasses = classNames({
      'table-responsive': this.props.responsive
    });

    let tableClasses = classNames({
      'table': true,
      'table-striped': this.props.striped,
      'table-bordered': this.props.bordered,
      'table-condensed': this.props.condensed,
      'table-hover': this.props.hover
    });

    return (
      <div className={wrapperClasses}>
        <table className={tableClasses}>
          {this.props.children}
        </table>
      </div>
    );
  }
}

export default Table;
