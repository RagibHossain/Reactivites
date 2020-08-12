import { observable, computed, action, runInAction } from "mobx";
import { IUser, IUserFormValues } from "../../Models/User";
import Agent from "../../Api/Agent";
import { RootStore } from "./rootStore";
import { history } from "../..";

export default class UserStore{
  rootStore : RootStore;
  
  constructor(rootStore : RootStore){
   this.rootStore = rootStore;
  }
  
    @observable user : IUser | null = null;
    @computed get isLoggedIn(){ return !!this.user}
    @action login = async (values : IUserFormValues) => {
       try{
         const user = await Agent.User.login(values);
         runInAction(() => {
          this.user = user;
          history.push("/activities");
         });
         this.rootStore.modalStore.closeModal();
        this.rootStore.commonStore.setToken(user.token);
       }catch(ex)
       {
           throw ex;
       }
    }

    @action register = async (values : IUserFormValues) => {
      try{
        const user = await Agent.User.register(values);
        runInAction(() => {
          this.user = user;
       
        });
        this.rootStore.modalStore.closeModal();
        this.rootStore.commonStore.setToken(user.token);
        history.push("/");
      }
      catch(error)
      {
        throw error;
      }
    }

    @action getUser = async () => {
      try{
        const user = await Agent.User.current();
        runInAction(() => {
          this.user = user;
        })
      }catch(ex)
      {
        console.log(ex);
      }
     

    }

    @action logout = () => {
      this.rootStore.commonStore.setToken(null);
      this.user = null;
      history.push("/");
    }
}