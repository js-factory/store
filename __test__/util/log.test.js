import log from '../../src/util/log';

test('print text into the stdout', () => {
    beforeEach(() => {
        // Clears the database and adds some testing data.
        // Jest will wait for this promise to resolve before running tests.
        return (process.env.NODE_ENV = 'development')
    });
    const spy = jest.spyOn(console, 'log').mockImplementation();
    log('LOG_TEST');
    expect(console.log).toHaveBeenCalledTimes(1);
    spy.mockRestore();
})

test('print text into the stdout env prod', () => {
    const oldVal = process.env;
    beforeEach(() => {
        jest.resetModules() // this is important - it clears the cache
        process.env = { ...oldVal };
        delete process.env.NODE_ENV;
    });
    afterEach(() => {
        process.env = oldVal;
    });
    process.env.NODE_ENV = 'production';
    const spy = jest.spyOn(console, 'log').mockImplementation();
    log('LOG_TEST');
    expect(console.log).toHaveBeenCalledTimes(0);
    spy.mockRestore();
    process.env.NODE_ENV = oldVal;
})
