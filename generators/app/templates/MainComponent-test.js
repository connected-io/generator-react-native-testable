import 'react-native';
import React from 'react';
import MainComponent from '../MainComponent';
import {mount} from 'enzyme';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import {getStore, resetStore} from '../store.js';
import {rootReducer, reducers} from '../reducer.js';

describe('Test Yeoman Setup', () => {
    beforeEach(() => {
        resetStore();
    });

    it('react-test-renderer renders correctly', () => {
		const tree = renderer.create(
			<MainComponent store={ getStore() }/>
		);

        expect(tree).toMatchSnapshot();
	});

    it('jsdom enables enzyme to deep render', () => {
        const wrapper = mount(
            <MainComponent store={ getStore() }/>
        );

        expect(wrapper.instance().getWrappedInstance().props.store).not.toBe(null);
    });

    it('redux store works', () => {
        reducers['REDUX_WORKING'] = (reduxState, action) => {
			return {
				...reduxState,
                reduxWorking: true
			}
		};

        getStore().dispatch({
        	type: 'REDUX_WORKING'
        });

        expect(getStore().getState().reduxWorking).toBe(true);
	});

    it('redux-thunk middlware works', () => {
        reducers['INCREMENT_COUNTER'] = (reduxState, action) => {
            let newCount = reduxState.counter + action.incrementBy;
            return {
                ...reduxState,
                counter: newCount
            }
        }

        getStore().dispatch(() => {
            getStore().dispatch({
                type: 'INCREMENT_COUNTER',
                incrementBy: 10
            });
            getStore().dispatch({
                type: 'INCREMENT_COUNTER',
                incrementBy: 13
            });
        });

        expect(getStore().getState().counter).toBe(23);
    });
});