import Axios, { AxiosResponse } from "axios";
import { IActivity } from "../Models/Activity";
import { history } from "..";
import { toast } from "react-toastify";
import { IUser, IUserFormValues } from "../Models/User";

Axios.defaults.baseURL = "http://localhost:5000/api";

Axios.interceptors.request.use((config) => {
  const token = window.localStorage.getItem("jwt");
  if(token) config.headers.Authorization = `Bearer ${token}`;
  return config;
}, error => {
  return Promise.reject(error);
})
Axios.interceptors.response.use(undefined, error => {
  if(error.message === "Network Error" && !error.response)
  {
    toast.error("Network error -- make sure API server is running")
  }
  const {status,data,config} = error.response;
  if(status === 404) 
  { 
    history.push("/notFoundeekdom");
  }
  if(status === 400 && config.method === 'get' && data.errors.hasOwnProperty('id')){
    history.push('/notFound');
  }
  if(status === 500)
  {
    toast.error('Server Error Check the terminal for more info');
  }
  throw error.response;
})
const responseBody = (response: AxiosResponse) => response.data;

//this is used for delaying 

const sleep = (ms: number) => (response: AxiosResponse) =>
  new Promise<AxiosResponse>((resolve) =>
    setTimeout(() => resolve(response), ms)
  );

const request = {
  get: (url: string) => Axios.get(url).then( sleep(1000)).then(responseBody),
  post: (url: string, body: {}) => Axios.post(url, body).then( sleep(1000)).then(responseBody),
  put: (url: string, body: {}) => Axios.put(url, body).then( sleep(1000)).then(responseBody),
  del: (url: string) => Axios.delete(url).then( sleep(1000)).then(responseBody),
};

const Activities = {
  List: (): Promise<IActivity[]> => request.get("/activities"),
  Details: (id: string) => request.get(`/activities/${id}`),
  Edit: (activity: IActivity) =>
    request.put(`/activities/${activity.id}`, activity),
  Create: (activity: IActivity) => request.post("/activities", activity),
  Delete: (id: string) => request.del(`/activities/${id}`),
};

const User = {
   current : () : Promise<IUser> => request.get("/user"),
   login : (user : IUserFormValues) : Promise<IUser> => request.post("/user/login",user),
   register : (user : IUserFormValues) : Promise<IUser> => request.post("/user/register",user)
};

export default {
  Activities,
  User
};
