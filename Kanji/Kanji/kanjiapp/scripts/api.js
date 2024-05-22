const url = 'http://localhost:3000'

export function signUp (body) {
    return fetch(`${url}/user/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
    .then(res => res.json())
}

export function signIn (body) {
    return fetch(`${url}/user/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
    .then(res => res.json())
}

export function getMe() {
    return fetch(`${url}/user/me`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${JSON.parse(localStorage.getItem('token'))}`
        }
    })
    .then(res => res.json())
}

export function getKanji() {
    return fetch(`${url}/kanji`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${JSON.parse(localStorage.getItem('token'))}`
        }
    })
    .then(res => res.json())
}


export function completeLesson (body) {
    return fetch(`${url}/user/completeLesson`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${JSON.parse(localStorage.getItem('token'))}`
        },
        body: JSON.stringify(body)
    })
    .then(res => res.json())
}

