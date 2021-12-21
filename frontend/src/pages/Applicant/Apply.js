import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router";
import { Navigate } from "react-router-dom";

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
      resume,
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

  const [resume, setResume] = useState("");
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setResume(base64);
  };
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  let userType = localStorage.getItem("userType");
  if (userType === "applicant") {
    return (
      <>
        <div>
          <form onSubmit={submit}>
            <label>Cover Letter </label>
            <input
              type="text"
              onChange={({ target }) => setCoverLetter(target.value)}
            />
            <label>Resume</label>
            <input
              type="file"
              onChange={(event) => handleFileChange(event)}
            />{" "}
            <div class="button-login">
              <input type="submit" value="Apply" />
            </div>
          </form>
        </div>
      </>
    );
  } else {
    return <Navigate to="/login" />;
  }
};

export default Apply;
