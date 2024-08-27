import { Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/Job";
import { useAppDispatch } from "../hooks/userCustomHook";
import { JobData } from "../features/allJobs/allJobsSlice";
import JobInfo from "./JobInfo";
import { FaBriefcase, FaCalendarAlt, FaLocationArrow } from "react-icons/fa";
import moment from "moment";
import { deleteJob } from "../features/job/jobSlice";

const Job = ({
  _id,
  position,
  company,
  jobLocation,
  jobType,
  createdAt,
  status,
}: JobData) => {
  const dispatch = useAppDispatch();
  const date = moment(createdAt).format("MMM Do, YYYY");

  return (
    <Wrapper>
      <header>
        <div className="main-icon">{company?.charAt(0)}</div>
        <div className="info">
          <h5>{position}</h5>
          <p>{company}</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <JobInfo icon={<FaLocationArrow />} text={jobLocation} />
          <JobInfo icon={<FaCalendarAlt />} text={date} />
          <JobInfo icon={<FaBriefcase />} text={jobType} />
          <div className={`status ${status}`}>{status}</div>
        </div>
        <footer>
          <div className="actions">
            <Link
              to="/add-job"
              className="btn edit-btn"
              onClick={() => console.log("edit")}
            >
              Edit
            </Link>
            <button
              className="btn delete-btn"
              onClick={
                _id
                  ? () => dispatch(deleteJob(_id))
                  : () => console.log("cannot find id")
              }
            >
              Delete
            </button>
          </div>
        </footer>
      </div>
    </Wrapper>
  );
};
export default Job;
