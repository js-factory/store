import log from '../util/log';

/**
 *
 * Store class
 * @class Store
 */
export default class Store {
    constructor(initialState) {
        this.state = Object.assign({}, initialState);
        this.setState = this.setState.bind(this);
        this.getState = this.getState.bind(this);
    }
    /**
     * updates the state
     * @param {object} newState 
     */
    setState(newState) {
        log('prev state', this.state);

        this.state = {
            ...this.state,
            ...newState
        };

        log('new state', this.state);

        return this.state;
    }
    /**
     *
     * returns the store current state
     * @returns {object} state 
     * @memberof Store
     */
    getState() { return this.state; }
}