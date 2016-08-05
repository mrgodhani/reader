import React, { Component, PropTypes } from 'react';
import Drawer from 'react-native-drawer';
import Sidebar from './Sidebar';
import {Actions, DefaultRenderer} from 'react-native-router-flux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Map } from 'immutable';

export default class DrawerComponent extends Component {
  static PropTypes: {
    navigationState: PropTypes.object
  }

  render() {
    const state = this.props.navigationState;
    const children = state.children;
    return (
      <Drawer
        ref="navigation"
        content={<Sidebar />}
        onOpen={() => {
          Actions.refresh({key: state.key, open: true})
        }}
        onClose={() => {
          Actions.refresh({key: state.key, open: false})
        }}
        type="displace"
        tapToClose={true}
        openDrawerOffset={0.3}
        panCloseMask={0.3}
        negotiatePan={true}
        tweenHandler={(ratio) => ({
          main: { opacity: Math.max(0.50, 1 - ratio) }
        })}
        >
        <DefaultRenderer navigationState={children[0]} onNavigate={this.props.onNavigate} />
      </Drawer>
    )
  }
}
