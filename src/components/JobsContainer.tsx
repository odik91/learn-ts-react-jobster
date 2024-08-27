import { useEffect } from "react";
import Wrapper from "../assets/wrappers/JobsContainer";
import { getAllJobs, JobData } from "../features/allJobs/allJobsSlice";
import { useAppDispatch, useAppSelector } from "../hooks/userCustomHook";
import Job from "./Job";
import Loading from "./Loading";

const JobsContainer = () => {
  const { jobs, isLoading } = useAppSelector((store) => store.allJobs);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllJobs());
  }, [dispatch]);

  if (isLoading) {
    return <Loading center />;
  }

  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h2>No jobs to display...</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h5>jobs info</h5>
      <div className="jobs">
        {jobs.map((job: JobData) => {
          return <Job key={job._id} {...job} />;
        })}
      </div>
    </Wrapper>
  );
};
export default JobsContainer;
