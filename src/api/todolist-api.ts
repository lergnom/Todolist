import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'api-key': 'b018a2e7-a067-422d-aa3e-08e12df481c7'
    }
})

export const TodolistAPI = {
    getTodolists() {
        return instance.get(`todo-lists/`)
    }
}