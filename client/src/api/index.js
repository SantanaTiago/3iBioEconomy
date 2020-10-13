import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
})

export const getEntrada = () => api.get(`/entrada`)
export const getEntradaLast = () => api.get(`/entradaLast`)
export const getEntradaById = id => api.get(`/entrada/${id}`)
export const getGeral = () => api.get(`/geral`)
export const getGeralLast = () => api.get(`/geralLast`)
export const getGeralById = id => api.get(`/geral/${id}`)
export const getSaida = () => api.get(`/saida`)
export const getSaidaLast = () => api.get(`/saidaLast`)
export const getSaidaById = id => api.get(`/saida/${id}`)

const apis = {
    getEntrada,
    getEntradaLast,
    getEntradaById,
    getGeral,
    getGeralLast,
    getGeralById,
    getSaida,
    getSaidaLast,
    getSaidaById,
}

export default apis
