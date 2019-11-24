import withStore from '../src/withStore';

describe("store#withStore()", () => {
    test('inject store config to the given component', () => {
        const component = {};
        expect(withStore({ watcher: ['user'] })(component))
    });

    test('attach store without a config', () => {
        const component = {};
        expect(withStore()(component))
    });

})
