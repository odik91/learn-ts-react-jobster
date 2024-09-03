import { ChangeEvent, FormEvent } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/userCustomHook";
import Wrapper from "../assets/wrappers/SearchContainer";
import FormRow from "./FormRow";
import FormRowSelect from "./FormRowSelect";
import { clearFilters, handleChange } from "../features/allJobs/allJobsSlice";

const SearchContainer = () => {
  const { isLoading, search, searchStatus, searchType, sort, sortOptions } =
    useAppSelector((store) => store.allJobs);
  const { jobTypeOptions, statusOptions } = useAppSelector(
    (store) => store.job
  );
  const dispatch = useAppDispatch();

  const handleSearch = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    if (isLoading) return;
    dispatch(handleChange({ name: e.target.name, value: e.target.value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(clearFilters())
  };

  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h4>search form</h4>
        <div className="form-center">
          {/* search postition */}
          <FormRow
            type="text"
            name="search"
            value={search}
            handleChange={handleSearch}
          />

          {/* search by status */}
          <FormRowSelect
            labelText="status"
            name="searchStatus"
            value={searchStatus}
            handleChange={handleSearch}
            list={["all", ...statusOptions]}
          />

          {/* search by type */}
          <FormRowSelect
            labelText="type"
            name="searchType"
            value={searchType}
            handleChange={handleSearch}
            list={["all", ...jobTypeOptions]}
          />

          {/* sort */}
          <FormRowSelect
            name="sort"
            value={sort}
            handleChange={handleSearch}
            list={sortOptions}
          />

          <button
            type="submit"
            className="btn btn-block btn-primary"
            disabled={isLoading}
          >
            search
          </button>
          <button
            type="button"
            className="btn btn-block btn-danger"
            disabled={isLoading}
            onClick={() => dispatch(clearFilters())}
          >
            clear filter
          </button>
        </div>
      </form>
    </Wrapper>
  );
};
export default SearchContainer;
