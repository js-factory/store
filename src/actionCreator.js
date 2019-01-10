const log = (type) => {
    if (process.env.NODE_ENV !== 'production') {
        console.log(`%c action --> ${type}`, 'color: green; font-weight: bold;');
    }
}

const compose = (funcs, req) => {
    return funcs.reduce(function (a, b) {
        return function (...args) {
            return a(req, b(...args));
        }
    });
};

function actionCreator(actionName, actionConfig = {}) {
    return function (getState, middleware, dispatch, payload = {}, behaviors) {
        const {
            url,
            key
        } = actionConfig;

        if (!middleware) {
            if (!url && !key) {
                log(type);
                return payload;
            };
        }

        const next = (result) => {
            if (result) {
                if (result.then) {
                    return result.then(data => ({ [key]: data })).then(dispatch);
                }
                return dispatch({ [key]: result });
            }
        }
        const o = compose(middleware, { actionName, actionConfig, behaviors, payload })({ actionName, actionConfig, behaviors, payload }, next);
        o(payload);
    }
};

export default actionCreator;
