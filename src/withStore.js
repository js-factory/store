export default function withStore(storeOptions = {}) {
    return function wrapperFn(component) {
        return function outer(...args) {
            return component.apply(component, [...args, storeOptions]);
        };
    }
}
