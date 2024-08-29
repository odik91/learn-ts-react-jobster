import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/userCustomHook";
import { showStats } from "../../features/allJobs/allJobsSlice";
import { ChartsContainer, Loading, StatsContainer } from "../../components";

const Stats = () => {
  const { isLoading, monthlyApplications } = useAppSelector(
    (store) => store.allJobs
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(showStats());
  }, [dispatch]);

  if (isLoading) {
    return <Loading center />;
  }

  return (
    <>
      <StatsContainer />
      {monthlyApplications.length > 0 && <ChartsContainer />}
    </>
  );
};
export default Stats;
