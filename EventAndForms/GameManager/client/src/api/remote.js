const url = 'http://localhost:9999/';

async function requester(endPoint, type, data) {
    let body = {
        method: type
    };

    if (type === 'POST') {
        body['headers'] = {'Content-Type': 'application/json'};
        body['body'] = JSON.stringify(data);
    }

    return await fetch(url + endPoint, body)
}

export function register(user) {
    return requester('auth/signup', 'POST', user);
}

export function login(user) {
    return requester('auth/signin', 'POST', user);
}

export function getGames() {
    return requester('feed/games', 'GET');
}

export function createGamePost(data) {
    return requester('feed/game/create', 'POST', data);
}
