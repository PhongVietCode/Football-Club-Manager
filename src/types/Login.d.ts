type LoginFormRequest = {
    fullName: string,
    password: string,
}

type LoginResponse = {
    token: string,
    uid: string,
    authenticated: boolean
}