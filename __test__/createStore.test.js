import createStore from '../src/createStore';
import { store as dummyStore } from '../mocks/mockStore';
import actionCreator from '../src/actionCreator';
import withStore from '../src/withStore';


describe('store#createStore', () => {
    let initialState = {};
    beforeAll(() => {
        jest.resetModules();
        initialState = { ...dummyStore };
    })

    test('with initial state and a middleware', () => {
        const middleware = () => getState => (req, next) => data => next(data);
        const newStore = createStore(initialState, [middleware()]);
        expect(newStore.getState()).toMatchObject(initialState);
    });

    test('without initial state and a middleware', () => {
        const newStore = createStore();
        expect(newStore.getState()).toMatchObject({});
    });

    test('exposes an #action() method to bind user defined action with store', () => {
        const newAction = actionCreator('TEST_ACTION', { key: 'user' });
        const newStore = createStore(initialState, []);
        newStore.action(newAction)({ age: 30 });
        expect(newStore.getState()).toMatchObject({ user: Object.create({ age: 30 }, initialState.user) });
    });
    
    test('exposes an #update() method to allow store updates', () => {
        let newAction = actionCreator('TEST_ACTION', { key: 'user' });
        const newStore = createStore(initialState, []);
        const componentSetState = jest.fn();
        const component = withStore({ watcher: ['user'], newAction })({
            init() {
                newStore.subscribe(componentSetState)
                newAction = newStore.action(newAction);
            }
        });
        component.init();
        newAction({ age: 30 });
        expect(componentSetState).toHaveBeenCalled();
    });
})