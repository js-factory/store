export default function withStore(storeOptions = {}) {
    return function wrapperFn(component) {
        return component.bind(component, storeOptions);
    }
}
