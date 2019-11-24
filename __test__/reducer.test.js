import reducer from "../src/reduce";
import { state as dummyState } from '../mocks/mockStore';

describe('reducer', () => {
    let req;
    beforeAll(() => {
        req = {
            actionConfig: {
                key: 'user'
            }
        }
    })
    test('without user define reducer callback', () => {
        const getState = jest.fn();
        const next = jest.fn();
        reducer()(getState)(req, next)({ age: 30 });
        expect(next).toHaveBeenCalled();
    })

    test('with user define reducer callback', () => {
        const getState = jest.fn(() => dummyState);
        const next = jest.fn();
        const data = { age: 30 };
        const newReq = {
            ...req,
            actionConfig: {
                ...req.actionConfig,
                reducer: jest.fn()
            }
        };
        reducer()(getState)(newReq, next)(data);
        expect(getState).toHaveBeenCalled();
        expect(newReq.actionConfig.reducer).toHaveBeenCalledWith(dummyState['user'], data);
    })
})