import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { ReactComponent as LoginPhoto } from "../Login/log.svg";

const Regsiter = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const navigate = useNavigate();

  const [userType, setUserType] = useState("applicant");

  //const API_URL = `http://localhost:5000/api/recruiter/register`;

  const [userDetails, setUserDetails] = useState([]);

  const submit = async (e) => {
    e.preventDefault();
    const user = { email, password, username, contactNumber };
    const API_URL = `http://localhost:5000/api/${userType}/register`;
    try {
      let response = await axios({
        method: "POST",
        url: API_URL,
        data: user,
      });

      setUserDetails(response.data);
      console.log(response.data);
      //console.log(response.data.user);
      //console.log("user: ",response.data);
      //console.log("token",response.data.token);
      if (response.status === 200) {
        console.log("USER REGISTERED! NOW LOG IN");
        alert("USER REGISTERED! NOW LOG IN");
        navigate("/login");
        // localStorage.setItem('userId', response.data.user._id);
        // localStorage.setItem('token', response.data.token);
        // localStorage.setItem('user', JSON.stringify(response.data.user));
        // localStorage.setItem('userType', response.data.userType);
      }
    } catch (error) {
      console.log(error.response.data.msg);
      return error.response;
    }
  };

  return (
    <>
      <div className="container-login">
        <div className="container-leftside">
          <LoginPhoto className="jobhunt" />
        </div>
        <div className="container-rightside">
          <div className="content-login">
            <h3>Sign Up</h3>
            <form onSubmit={submit}>
              <div className="user-details-login">
                <div className="input-box-login">
                  <span>Username:</span>
                  <input
                    type="text"
                    value={username}
                    placeholder="Username"
                    onChange={({ target }) => setUsername(target.value)}
                  />
                </div>
                <div className="input-box-login">
                  <span>Email:</span>
                  <input
                    type="text"
                    value={email}
                    placeholder="Email@gmail.com"
                    onChange={({ target }) => setEmail(target.value)}
                  />
                </div>
              </div>
              <div className="user-details-login">
                <div className="input-box-login">
                  <span>Password</span>
                  <input
                    type="password"
                    value={password}
                    placeholder="Password"
                    onChange={({ target }) => setPassword(target.value)}
                  />
                </div>
                <div className="input-box-login">
                  <span>Contact Number:</span>
                  <input
                    type="text"
                    value={contactNumber}
                    placeholder="contactNumber"
                    onChange={({ target }) => setContactNumber(target.value)}
                  />
                </div>
                <div className="radiobtn">
                  <label>Applicant</label>
                  <input
                    type="radio"
                    checked={userType === "applicant"}
                    value="applicant"
                    onChange={(e) => setUserType(e.target.value)}
                  />
                  <label>Recruiter</label>
                  <input
                    type="radio"
                    checked={userType === "recruiter"}
                    value="recruiter"
                    onChange={(e) => setUserType(e.target.value)}
                  />
                </div>

                <div class="button-login">
                  <input type="submit" value="Register" />
                </div>
                <p>
                  Already have an account? <Link to="/login">Login!</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Regsiter;
