"use strict";

/*eslint-disable */
import React, {PropTypes} from 'react';
import classNames from 'classnames';
/*eslint-enable */

class Icon extends React.Component {
  static propTypes = {
    size: PropTypes.string,
    icon: PropTypes.string,
  };

  render() {
    let classes = classNames('fa fa-fw', this.props.icon);

    if (this.props.size) {
      classes = classNames(classes, 'fa-' + this.props.size);
    }

    return (
      <i className={classes}/>
    );
  }
}

export class IconExcel extends Icon {
  static defaultProps = {icon: "fa-file-excel-o"};
}

export class IconPlus extends Icon {
  static defaultProps = {icon: "fa-plus"};
}

export class IconCheck extends React.Component {
  static propTypes = {
    check: PropTypes.bool,
    size: PropTypes.string,
  };

  render() {
    let defaultValue = this.props.default || "-";
    let isCheck = this.props.check || false;

    if (isCheck) {
      return (
        <Icon icon="fa-check text-success" {...this.props}/>
      );
    }

    return (
      <span>{defaultValue}</span>
    );
  }
}
