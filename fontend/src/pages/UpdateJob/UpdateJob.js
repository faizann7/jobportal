import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import Navbar from "../../components/Navbar/Navbar";

const UpdateJob = () => {
  const [maxPos, setMaxPos] = useState();
  const [maxApps, setMaxApps] = useState(0);
  const [deadlineDate, setDeadlineDate] = useState("");

  const [job, setJob] = useState([]);
  const [username, setUsername] = useState("");
  const { id } = useParams();
  //console.log(id);
  const URL = `http://localhost:5000/api/jobs/${id}`;
  useEffect(() => {
    async function getJob() {
      axios
        .get(`${URL}`)
        .then((response) => {
          setJob(response.data.job);
          setUsername(response.data.job.user.username);
          console.log(response.data.job);
          //console.log(response.data.job.deadlineDate);
          let d = response.data.job.deadlineDate;

          let a = new Date(d);

          //setDeadlineDate(a.toLocaleDateString)
          //console.log(a.toLocaleDateString());
        })
        .catch((error) => {
          console.error(`Error ${error}`);
        });
      //console.log(job.duration);
    }
    getJob();
  }, []);

  const onValueChange = (e) => {
    console.log(e.target.value);
  };

  const UPDATE_URL = `http://localhost:5000/api/jobs/updatejob/${id}`;
  let token = localStorage.getItem("token");
  const update = (e) => {
    e.preventDefault();
    const data = { maxApps, maxPos };

    axios({
      method: "PUT",
      url: UPDATE_URL,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      data: data,
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <Navbar />
      <div className="container">
        <div className="title">UPDATE JOB POSTING</div>
        <div className="content-addjob">
          <form onSubmit={update}>
            <div className="user-details">
              <div className="input-box">
                <span>Job Title</span>
                <input type="text" value={job.title} />
              </div>
              <div className="input-box">
                <span>Job Type</span>
                <input type="text" value={job.type} />
              </div>
              <div className="input-box">
                <span>Location</span>
                <input type="text" value={job.location} readonly="false" />
              </div>
              <div className="input-box">
                <span>Company Name</span>
                <input type="text" value={username} />
              </div>
              <div className="input-box">
                <span>Department</span>
                <input type="text" value={job.department} />
              </div>
              <div className="input-box">
                <span>Deadline Date</span>
                <input type="date" value={job.deadlineDate} />
              </div>
              <div className="input-box">
                <span>Max Appearances</span>
                <input
                  placeholder={job.maxApps}
                  type="text"
                  onChange={({ target }) => setMaxApps(target.value)}
                />
              </div>
              <div className="input-box">
                <span>Max Positions</span>
                <input
                  placeholder={job.maxPos}
                  type="text"
                  onChange={({ target }) => setMaxPos(target.value)}
                />
              </div>
              <div className="input-box">
                <span>Salary</span>
                <input type="Number" value={job.salary} />
              </div>
              <div className="input-box">
                <span>Required Skills</span>
                <input type="" value={job.requiredSkills} />
              </div>

              <div className="input-box">
                <span>Job Description</span>
                <textarea type="textbox" value={job.description} />
              </div>
              <div class="button">
                <input type="submit" value="Update" />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateJob;
