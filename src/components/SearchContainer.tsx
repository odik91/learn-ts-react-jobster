import { ChangeEvent, FormEvent, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/userCustomHook";
import Wrapper from "../assets/wrappers/SearchContainer";
import FormRow from "./FormRow";
import FormRowSelect from "./FormRowSelect";
import { clearFilters, handleChange } from "../features/allJobs/allJobsSlice";

const SearchContainer = () => {
  const [localSearch, setLocalSearch] = useState("");
  const { isLoading, searchStatus, searchType, sort, sortOptions } =
    useAppSelector((store) => store.allJobs);
  const { jobTypeOptions, statusOptions } = useAppSelector(
    (store) => store.job
  );
  const dispatch = useAppDispatch();

  const handleSearch = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    dispatch(handleChange({ name: e.target.name, value: e.target.value }));
  };

  const debounce = () => {
    let timeoutID: number;
    return (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setLocalSearch(e.target.value);
      clearTimeout(timeoutID);
      timeoutID = setTimeout(() => {
        dispatch(handleChange({ name: e.target.name, value: e.target.value }));
      }, 1000);
    };
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLocalSearch("");
    dispatch(clearFilters());
  };

  const optimizedDebounce = useMemo(() => debounce(), []);

  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h4>search form</h4>
        <div className="form-center">
          {/* search postition */}
          <FormRow
            type="text"
            name="search"
            value={localSearch}
            handleChange={optimizedDebounce}
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
