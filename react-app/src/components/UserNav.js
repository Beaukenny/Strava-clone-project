import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import LoginForm from "./auth/LoginForm";

function UserNav() {
  const [user, setUser] = useState({});
  // Notice we use useParams here instead of getting the params
  // From props.
  const { userId }  = useParams();

  useEffect(() => {
    if (!userId) {
      return
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
    })();
  }, [userId]);

  if (!user) {
    return null;
  }

  return (
    <div style={{left: "30vw", position: "absolute", height:"200px", width: "200px", border: "1px solid blue"}}>
        <ul>
            <li>
                <Link to="/workouts"><strong>Explore</strong></Link>
                {/* <strong>Explore</strong> {userId} */}
            </li>
            <li>
                <Link to="/users/1">Profile</Link>
                {/* <strong>Username</strong> {user.username} */}
            </li>
            <li>
                <Link to="/sign-up" ><strong>Login</strong></Link>
                {/* <strong>Login</strong> {user.email} */}
            </li>
        </ul>
    </div>
  );
}
export default UserNav;
