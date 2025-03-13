import axios from "axios";

export const api = axios.create({
    baseURL: 'http://localhost:3002'
})

// toda vez q for fazer uma requisição intercepto a requisição e coloco uma informação de usuário (userData)
api.interceptors.request.use((config) => { // intercepto a requisição na chamada a api
    const userData = localStorage.getItem('devburger:userData') // indo ao localstoren e pegando todas as informações de user armazenadas em devburger:userData

    const token = userData && JSON.parse(userData).token // Verifico sem tem alguma coisa dentro de userData, para não quebrar a app. Se tiver, pego o token dentro de userData, converto de string p objeto e armazeno na variável token

    config.headers.authorization = `Bearer ${token}` // config são as configurações q chegam aqui, e mando algo dentro dos headers, authorization e passo o bearer token.
    return config
})