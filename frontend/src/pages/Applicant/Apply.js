import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router";
import Navbar from "../../components/Navbar/Navbar";

const Apply = () => {
  const [coverLetter, setCoverLetter] = useState("");
  const { id } = useParams();

  let token = localStorage.getItem("token");
  let userId = localStorage.getItem("userId");
  const submit = async (e) => {
    e.preventDefault();
    const API_URL = `http://localhost:5000/api/application/apply/${id}`;
    const user = {
      applicantId: userId,
      coverLetter,
    };
    try {
      let response = await axios({
        method: "post",
        url: API_URL,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        data: user,
      });
      console.log(response.data);
      if (response.status === 200) {
        alert("You have successfully applied for this job");
      }
    } catch (error) {
      console.log(error.response);
      if (error.response.status === 400) {
        alert(error.response.data.message);
      }
      return error.response;
    }
  };

  return (
    <>
      <Navbar />
      <div>
        <form onSubmit={submit}>
          <label>Cover Letter </label>
          <input
            type="text"
            onChange={({ target }) => setCoverLetter(target.value)}
          />

          <div class="button-login">
            <input type="submit" value="Apply" />
          </div>
        </form>
      </div>
    </>
  );
};

export default Apply;
