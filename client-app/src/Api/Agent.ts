import Axios, { AxiosResponse } from "axios";
import { IActivity } from "../Models/Activity";

Axios.defaults.baseURL = "http://localhost:5000/api";

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

export default {
  Activities,
};
