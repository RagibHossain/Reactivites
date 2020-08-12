import React, { Fragment, useContext, useEffect } from "react";
import { Container } from "semantic-ui-react";
import NavBar from "../../Features/Nav/NavBar";
import ActivityDashboard from "../../Features/Activities/Dashboard/ActivityDashboard";
import { observer } from "mobx-react-lite";
import {
  Route,
  withRouter,
  RouteComponentProps,
  Switch,
} from "react-router-dom";
import HomePage from "../../Features/Home/HomePage";
import ActivityForm from "../../Features/Activities/Form/ActivityForm";
import ActivityDetails from "../../Features/Activities/Details/ActivityDetails";
import NotFound from "./NotFound";
import { ToastContainer } from "react-toastify";
import LoginForm from "../../Features/User/LoginForm";
import { RootStoreContext } from "../Stores/rootStore";
import LoadingComponent from "./LoadingComponent";
import ModalContainer from "../Common/Modals/ModalContainer";
const App: React.FC<RouteComponentProps> = ({ location }) => {

  const rootStore = useContext(RootStoreContext);
  const {setAppLoaded,appLoaded,token} = rootStore.commonStore;
  const {getUser} = rootStore.userStore;
  useEffect(() => {
       if(token) {
         getUser().finally(() => setAppLoaded());
       }
       else {
         setAppLoaded();
       }
  },[getUser,token,setAppLoaded])

  if(!appLoaded) return <LoadingComponent content="Loaading App..." />
  return (
    <Fragment>
      <ModalContainer />
      <ToastContainer position="bottom-left" />
      <Route exact path="/" component={HomePage} />
      <Route
        path={"/(.+)"}
        render={() => (
          <Fragment>
            <NavBar />
            <Container style={{ marginTop: "7em" }}>
              <Switch>
                <Route exact path="/activities" component={ActivityDashboard} />
                <Route
                  key={location.key}
                  path={["/createActivity", "/manage/:id"]}
                  component={ActivityForm}
                />
                <Route path="/activities/:id" component={ActivityDetails} />
                <Route path="/login" component={LoginForm} />
                <Route component={NotFound} />
              </Switch>
            </Container>
          </Fragment>
        )}
      />
    </Fragment>
  );
};

export default withRouter(observer(App));
