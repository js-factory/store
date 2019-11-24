import compose from './util/compose';
function actionCreator(actionName, actionConfig = {}) {
    return function (getState, middleware, dispatch, payload = {}, behaviors) {
        const { url, key } = actionConfig;

        if (!middleware || middleware.length) {
            if (!url && !key) {
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
        };

        const options = { actionName, actionConfig, behaviors, payload };
        const o = compose(middleware, options)(options, next);
        o(payload);
    }
};

export default actionCreator;
