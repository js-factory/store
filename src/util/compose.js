
// function ab(...args) {
//     return fn1(input, fn2(...args));
// }
// function a(...args) {
//     return function (...args) {
//         return fn1(100, fn2(...args))
//     }(req, fn3(...args))
// }
const compose = (funcs, req) => {
    const fn = funcs.reduce(function (a, b) {
        return function (...args) {
            return a(req, b(...args));
        }
    });

    return fn;
};

export default compose;
