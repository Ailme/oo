"use strict";

/*eslint-disable */
import React, {PropTypes} from 'react';
/*eslint-enable */
import AuthStore from '../store/auth';

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      hasLoaded: false,
    }
  }

  componentWillMount() {
    AuthStore.init();
  }

  componentDidMount() {
    AuthStore.addChangeListener(this.onLoad);
  }

  componentWillReceiveProps(nextProps) {

  }

  componentWillUpdate(nextProps, nextState) {

  }

  componentDidUpdate(prevProps, prevState) {
    AuthStore.fetchUser();

    // respond to parameter change in scenario 3
    //let oldId = prevProps.params.invoiceId
    //let newId = this.props.params.invoiceId

  }

  componentWillUnmount() {
    AuthStore.removeChangeListener(this.onLoad);
  }

  onLoad = () => {
    AuthStore.removeChangeListener(this.onLoad);
    this.setState({hasLoaded: true});
  };


  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}
