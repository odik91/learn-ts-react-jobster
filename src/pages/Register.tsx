import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Wrapper from "../assets/wrappers/RegisterPage";
import { Logo } from "../components";
import FormRow from "../components/FormRow";
import { loginUser, registerUser } from "../features/user/userSlice";
import { useAppDispatch, useAppSelector } from "../hooks/userCustomHook";
import { useNavigate } from "react-router-dom";

type InitialStateType = {
  name: string;
  email: string;
  password: string;
  isMember: boolean;
};

const initialState: InitialStateType = {
  name: "",
  email: "",
  password: "",
  isMember: true,
};

const Register = () => {
  const [values, setValues] = useState<InitialStateType>(initialState);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { isLoading, user } = useAppSelector((store) => store.user);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const { name, email, password, isMember } = values;
    if (!email || !password || (!isMember && !name)) {
      toast.error("Please Fill Out All Fields");
      return;
    }

    if (isMember) {
      dispatch(loginUser({ email: email, password: password }));
      return;
    }

    dispatch(registerUser({ name, email, password }));
  };

  const toggleMember = (): void => {
    setValues((prevState) => ({
      ...prevState,
      isMember: !prevState.isMember,
    }));
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, [user, navigate]);

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={onSubmit}>
        <Logo />
        <h3>{values.isMember ? "Login" : "Register"}</h3>

        {!values.isMember && (
          <FormRow
            name="name"
            type="text"
            value={values.name}
            handleChange={handleChange}
          />
        )}

        <FormRow
          name="email"
          type="email"
          value={values.email}
          handleChange={handleChange}
        />

        <FormRow
          name="password"
          type="password"
          value={values.password}
          handleChange={handleChange}
        />

        <button type="submit" className="btn btn-block" disabled={isLoading}>
          {isLoading ? "loading..." : "submit"}
        </button>

        <p>
          {values.isMember ? "Not a member yet?" : "Already a member?"}
          <button type="button" onClick={toggleMember} className="member-btn">
            {values.isMember ? "Register" : "Login"}
          </button>
        </p>
      </form>
    </Wrapper>
  );
};
export default Register;
