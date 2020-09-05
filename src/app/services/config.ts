import { environment } from 'src/environments/environment'

export const apis = {
    baseUrl : environment.baseUrl,
    login : environment.baseUrl+'api/login', 
    refresh : environment.baseUrl+'api/refreshToken',
    product : environment.baseUrl+'api/product',
    customer : environment.baseUrl+'api/customer',
    transaction : environment.baseUrl+'api/transaction'
}