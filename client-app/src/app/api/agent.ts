// Here we are centralizing the requests so that we can reuse them anywhere
import axios, { AxiosError,AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { history } from "../..";
import { PaginatedResponse } from "../models/pagination";

const sleep = () => new Promise(resolve => setTimeout(resolve, 500))

axios.defaults.baseURL = 'http://localhost:5000/api/';
axios.defaults.withCredentials = true; // allow cookie sharing between localhost 5000 and 3000

const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.response.use(async response => // since it's async 
    {
        await sleep();
        console.log(response);
        const pagination = response.headers['pagination'];
        if (pagination) {                                 // Converts a JSON string into an object.
            response.data = new PaginatedResponse(response.data, JSON.parse(pagination));
            // console.log(response);
            return response;
        }
        return response
    }, (error: AxiosError) => {
        const {
            data,
            status
        } = error.response!; // ! overrides typescript type safety
        switch (status) {
            case 400:
                if (data.errors) {
                    const modelStateErrors: string[] = [];
                    for (const key in data.errors) {
                        if (data.errors[key]) { // if it exists
                            modelStateErrors.push(data.errors[key])
                        }
                    }
                    throw modelStateErrors.flat();
                }
                toast.error(data.title);
                break;
            case 401:
                toast.error(data.title);
                break;
            case 500:
                history.push({
                    pathname: '/server-error',
                    state: {
                        error: data
                    }
                });
                break;
            default:
                break;
        }
        return Promise.reject(error.response);
    })

const requests = {
    get: (url: string, params?: URLSearchParams) => axios.get(url, {params}).then(responseBody), // get also params for filter search query
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody),
}

const Catalog = {
    list: (params: URLSearchParams) => requests.get('products', params),
    details: (id: number) => requests.get(`products/${id}`),
    fetchFilters: () => requests.get('products/filters')
}

const TestErrors = {
    get404Error: () => requests.get('Buggy/not-found'),
    get400Error: () => requests.get('Buggy/bad-request'),
    get401Error: () => requests.get('Buggy/unauthorized'),
    getValidationError: () => requests.get('Buggy/validation-error'),
    get500Error: () => requests.get('Buggy/server-error'),
}

const Basket = {
    get: () => requests.get('basket'),
    addItem: (productId: number, quantity = 1) => requests.post(`basket?productId=${productId}&quantity=${quantity}`, {}),
    removeItem: (productId: number, quantity = 1) => requests.delete(`basket?productId=${productId}&quantity=${quantity}`),
}

// object to store requests that go to AccountController
const Account = {
    login: (values: any) => requests.post('account/login', values),
    register: (values: any) => requests.post('account/register', values),
    currentUser: () => requests.get('account/currentUser')
}

const agent = {
    Catalog,
    TestErrors,
    Basket,
    Account
}

export default agent;