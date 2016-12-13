# Testable React Native Project Generator [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]
>

Painless react-native project setup, with redux and unit tests already set up and ready to run.

Adds support for:
 - [Redux](http://redux.js.org/) and [Redux-Thunk](https://github.com/gaearon/redux-thunk) application state management.
 - [Enzyme](http://airbnb.io/enzyme/docs/guides/react-native.html) and and [jsdom](https://www.npmjs.com/package/jsdom) for deep rendering of Components directly in tests.
 - Example tests of the above.

## Installation

First, install [Yeoman](http://yeoman.io) and `generator-react-native-testable` using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo generator-react-native-testable
```

Then generate your new project:

```bash
yo react-native-testable --force
```

That's all!  After you `cd` into the project directory you can `npm test` to run unit tests, or `react-native run-android` or `react-native run-ios` to run the project.

## Getting To Know Yeoman

 * Yeoman has a heart of gold.
 * Yeoman is a person with feelings and opinions, but is very easy to work with.
 * Yeoman can be too opinionated at times but is easily convinced not to be.
 * Feel free to [learn more about Yeoman](http://yeoman.io/).

## License

Apache-2.0 © [Connected Lab]()


[npm-image]: https://badge.fury.io/js/generator-react-native-testable.svg
[npm-url]: https://npmjs.org/package/generator-react-native-testable
[travis-image]: https://travis-ci.org/Connected-Lab/generator-react-native-testable.svg?branch=master
[travis-url]: https://travis-ci.org/Connected-Lab/generator-react-native-testable
[daviddm-image]: https://david-dm.org/Connected-Lab/generator-react-native-testable.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/Connected-Lab/generator-react-native-testable
[coveralls-image]: https://coveralls.io/repos/Connected-Lab/generator-react-native-testable/badge.svg
[coveralls-url]: https://coveralls.io/r/Connected-Lab/generator-react-native-testable
