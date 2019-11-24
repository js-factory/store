import request from './fetch';

export default function middleware() {
    return getState => (req, next) => (data = {}) => {
        const { actionConfig: { type = 'get', url } } = req;
        if (!url) {
            return next(data);
        }

        const finalReqUrl = typeof url === 'function' ? url(data) : url;
        return request({
            type,
            url: finalReqUrl,
            options: {
                ...data
            }
        })
            .then(json => next(json));
    }
}
