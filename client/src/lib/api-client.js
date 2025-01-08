
import axios from 'axios'
import { host } from '../../utils/constants'

export const apiClient = axios.create({
    baseURL: host
})