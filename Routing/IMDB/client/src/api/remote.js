const url = 'http://localhost:9999/';

function requester(endPoint, type, data) {
    let obj = {
        method: type
    };

    if (type === 'POST') {
        obj['headers'] = {
            'Content-Type': 'application/json'
        }
        obj['body'] = JSON.stringify(data);
    }

    return fetch(url + endPoint, obj)
        .then(res => res.json());
}

export function register(body) {
    return requester('auth/signup', 'POST', body);
}

export function login(body) {
    return requester('auth/signin', 'POST', body);
}

export function createMovie(body) {
    return requester('feed/movie/create', 'POST', body);
}

export function getMovies() {
    return requester('feed/movies', 'GET');
}
