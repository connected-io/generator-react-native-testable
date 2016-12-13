import {
    AppRegistry
} from 'react-native';

import React, {Component} from 'react';
import MainComponent from './MainComponent'

import {getStore} from './store'

class App extends Component {
    render() {
        return (
          <MainComponent store={getStore()}/>
        );
    }
}

AppRegistry.registerComponent('<%= projectName %>', () => App);