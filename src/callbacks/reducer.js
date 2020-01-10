 const injectReducer = (req, res) =>{
    const { reducer } = req;
    const { keyName, getState, data } = res;
    const store = getState();
    let updatedData = data;
    if (reducer) {
        updatedData = reducer(store[keyName], data);
    }
    return {
        ...res,
        data: updatedData
    };
}
export default injectReducer;