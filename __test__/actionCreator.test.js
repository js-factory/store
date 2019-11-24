import actionCreator from '../src/actionCreator';
import { state } from '../mocks/mockStore';

describe('actionCreator', () => {
    let getState, dispatch, printMiddleware;
    beforeAll(() => {
        getState = jest.fn(() => state);
        dispatch = jest.fn(data => console.log(data));
        printMiddleware = jest.fn((req, next) => data => next(data));
    });

    test('actionCreator without configuration', () => {
        const action = actionCreator('TEST_ACTION');
        const result = action(getState, undefined, dispatch, { age: 25 }, null);
        expect(typeof action).toBe('function');
        expect(result).toMatchObject({ age: 25 });
    });

    test('actionCreator with configuration', () => {
        const action = actionCreator('TEST_ACTION', { key: 'user' });
        const middleware = [
            printMiddleware
        ];
        action(getState, middleware, dispatch, { age: 25 }, null);
        expect(dispatch).toHaveBeenCalled();
    });

    test('actionCreator with middleware return a promise', () => {
        const action = actionCreator('TEST_ACTION', { key: 'user' });
        const promiseMiddleware = jest.fn((req, next) => (data) => {
            return next(Promise.resolve().then(() => data));
        });
        const middleware = [
            printMiddleware,
            promiseMiddleware
        ];
        action(getState, middleware, dispatch, { age: 25 }, null);
        expect(promiseMiddleware).toHaveBeenCalled();
        expect(printMiddleware).toHaveBeenCalled();
    })

    test('actionCreator with middleware return a promise', () => {
        const action = actionCreator('TEST_ACTION', { key: 'user' });
        const middleware = [
            printMiddleware
        ];
        action(getState, middleware, dispatch, undefined, null);
        expect(printMiddleware).toHaveBeenCalled();
    })

})