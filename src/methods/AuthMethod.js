import axios from "axios";

export const login = async (email, password) => {

    return axios.post(
        process.env.REACT_APP_API_URL + '/login',
        {email, password}
    )
    .then((res) => {return res})
}

export const register = async (email, password,passwordConfirm,firstName,lastName) => {
    return axios.post(
        process.env.REACT_APP_API_URL + '/register',
        {email, password,passwordConfirm,firstName,lastName}
    )
    .then((res) => {return res})
}

export const logout = async () => {

    return axios.post(
        process.env.REACT_APP_API_URL + '/logout',
    )
    .then((res) => {return res})
}

export const getProfilUser = async (token) => {
    return axios.get(
        process.env.REACT_APP_API_URL + '/profil',
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${token.token}`
            },
        },
    )
    .then((res) => {return res})
}

export const getProfilUserById = async (id,token) => {
    console.log(token)
    return axios.get(
        process.env.REACT_APP_API_URL + '/getUserById/' + id,
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${token.token}`
            },
        },
    )
    .then((res) => {return res})
}

export const editProfilUser = async (token,id,firstname,lastname,email,password,passwordConfirm) => {
    return axios.post(
        process.env.REACT_APP_API_URL + '/profil',
        {id,firstname,lastname,email,password,passwordConfirm},
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${token.token}`
            },
        },
    )
    .then((res) => {return res})
}

export const editUpdateProfilUser = async (token,id,firstname,lastname,email,password,passwordConfirm,isAdmin) => {
    return axios.post(
        process.env.REACT_APP_API_URL + '/editUser/' + id,
        {id,firstname,lastname,email,password,passwordConfirm,isAdmin},
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${token.token}`
            },
        },
    )
    .then((res) => {return res})
}

export const getUsers = async (token) => {
    return axios.get(
        process.env.REACT_APP_API_URL + '/getUsers',
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${token.token}`
            },
        },
    )
    .then((res) => {return res})
}

export const deleteUser = async (id,token) => {
    return axios.delete(
        process.env.REACT_APP_API_URL + '/deleteUser/' + id,
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${token.token}`
            },
        },
    )
    .then((res) => {return res})
}