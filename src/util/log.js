const log = (type, ...rest) => {
    if (process.env.NODE_ENV !== 'production') {
        console.log(`%c ${type}`, 'color: green; font-weight: bold;', ...rest);
    }
}

export default log;
