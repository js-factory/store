export default function reducer() {
    return getState => (req, next) => data => {
        const { actionConfig: { reducer, key } } = req;
        
        if (!reducer) {
            return next(data);
        };

        const store = getState();
        const updatedData = reducer.call(this, store[key], data);
        
        return next({
            ...data,
            ...updatedData
        });
    }
}
