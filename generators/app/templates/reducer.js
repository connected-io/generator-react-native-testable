// @flow
let initialState = {
	reduxWorking: false,
	counter: 0
};

let reducers = {};

let rootReducer = (reduxState = initialState, action = {}) => {
    if (reducers[action.type]) {
        return reducers[action.type](reduxState, action);
    }
    return reduxState;
};

let addReducer = (reducer, actionType: string) => {
	if (!reducers[actionType]) {
		reducers[actionType] = reducer;
	} else {
		throw new Error('Reducer for action type', actionType, 'already exists!');
	}
}

module.exports = {rootReducer, reducers, addReducer};