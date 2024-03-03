import { useEffect, useState } from "react";
import { app } from "./config/firebaseconfig";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { doc } from "firebase/firestore";
function App() {
  const auth = getAuth();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleInputs = (event) => {
    let inputs = { [event.target.name]: event.target.value };

    setData({ ...data, ...inputs });
  };
  const isLoginDisabled = !data.email || !data.password;
  const signIn = () => {
    signInWithEmailAndPassword(auth, data.email, data.password);
  };

  const handlelogout = () => {
    signOut(auth);
  };
  const createAccount = () => {
    createUserWithEmailAndPassword(auth, data.email, data.password);
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        alert("Logged In");
        setUser(user);
        setIsLoggedIn(true);
      } else {
        alert("Not Logged In");
        setUser(null);
        setIsLoggedIn(false);
      }
    });

    return () => {
      // Unsubscribe the listener when the component is unmounted
      unsubscribe();
    };
  }, [auth]);
  return (
    <div className="App-header">
      <form class="mx-auto">
        <div class="col-3">
          <label For="email" class="form-label">
            Email
          </label>
          <input
            placeholder="Email"
            name="email"
            type="email"
            className="input-fields"
            onChange={(event) => handleInputs(event)}
            class="form-control m-1 border-black"
          />
        </div>
        <div class="col-3">
          <label htmlFor="password" class="form-label">
            Password
          </label>
          <input
            placeholder="Password"
            name="password"
            type="password"
            className="input-fields"
            onChange={(event) => handleInputs(event)}
            class="form-control m-1 border-black"
          />
        </div>
      </form>
      <button
        onClick={signIn}
        class="btn btn-primary m-1"
        disabled={isLoginDisabled}
      >
        Log In
      </button>
      <button onClick={handlelogout} class="btn btn-warning m-1">
        Log out
      </button>
      <button
        onClick={createAccount}
        class="btn btn-success m-1"
        disabled={isLoginDisabled}
      >
        Sign Up
      </button>
    </div>
  );
}

export default App;
