import { BrowserRouter, Switch, Route } from "react-router-dom";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import Navbar from "./components/layout/Navbar";
import BrowsePage from "./components/shows/FindShowPage/BrowsePage";
import ShowPage from "./components/shows/ShowPage/ShowPage";
import Profile from "./components/users/ProfilePage/ProfilePage";
import AllUsersPage from "./components/users/AllUsersPage/AllUsersPage";
import { UserProvider } from "./contexts/UserContext";
import PrivateRoute from "./components/utilities/PrivateRoute";
import UserPage from "./components/users/UserPage/UserPage";
import SignedInRoute from "./components/utilities/SignedInRoute";
import ButtonArrowUP from "./components/layout/layoutSubComponents/ButtonArrowUp"

const App = () => {
  return (
    <BrowserRouter>
      <UserProvider>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path="/" component={BrowsePage} />
            <Route exact path="/show/:id" component={ShowPage} />
            <SignedInRoute exact path="/sign-in" component={SignIn} />
            <SignedInRoute exact path="/sign-up" component={SignUp} />
            <PrivateRoute exact path="/users" component={AllUsersPage} />
            <PrivateRoute exact path="/profile" component={Profile} />
            <PrivateRoute exact path="/user/:id" component={UserPage} />
          </Switch>
          <ButtonArrowUP />
        </div>
      </UserProvider>
    </BrowserRouter>
  );
};

export default App;
