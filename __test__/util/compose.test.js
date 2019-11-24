import compose from '../../src/util/compose';
import { store as dummyStore } from '../../mocks/mockStore';

// function ab(...args) {
//     return fn1(input, fn2(...args));
// }
// function a(...args) {
//     return function (...args) {
//         return fn1(100, fn2(...args))
//     }(req, fn3(...args))

describe('Utils', () => {
    describe('Compose', () => {
        test('with functions returning a value', () => {
            const fn1 = (a, b) => {
                console.log('f1 called');
                return a + b
            };
            const fn2 = (c, e) => {
                console.log('f2 called');
                return c * 4;
            };
            const fn3 = (d) => {
                console.log('f3 called');

                return d / 2;
            };

            expect(compose([fn1, fn2, fn3], 500)(100)).toBe(2500);
        });
        test('with functions returning a function', () => {

            let state = { ...dummyStore }
            const getState = () => state;

            const setState = (updatedState) => (state = {
                ...state,
                ...updatedState
            });

            let key = 'user';

            const next = (result) => {
                if (result) {
                    if (result.then) {
                        return result.then(data => ({ [key]: data })).then(setState);
                    }
                    return setState({ [key]: result });
                }
            }

            const fn2 = getState => (req, next) => data => {
                return next(data);
            };
            const fn1 = getState => (req, next) => data => {
                const { actionConfig: { reducer, key } } = req;
                if (!reducer) {
                    return next(data);
                };
                const store = getState();
                let updatedData = data;
                if (reducer) {
                    updatedData = reducer.call(this, store[key], data);
                }
                return next({
                    ...data,
                    ...updatedData
                });
            };

            const input = {
                actionName: 'SOME_ACTION',
                actionConfig: {
                    key: 'user',
                    reducer(prev, data) {
                        return {
                            ...prev,
                            ...data
                        }
                    },
                },
                behaviors: undefined,
                payload: {}
            };
            const o = compose([fn1(getState), fn2(getState)], input)(input, next);
            o({ age: 40 });
            expect(state.user.age).toBe(40);

            o({ age: 50 });
            expect(state.user.age).toBe(50);
        });
    })
})







