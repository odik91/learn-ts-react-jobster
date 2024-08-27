import { FaAlignLeft, FaCaretDown, FaUserCircle } from "react-icons/fa";
import Wrapper from "../assets/wrappers/Navbar";
import { useAppDispatch, useAppSelector } from "../hooks/userCustomHook";
import Logo from "./Logo";
import { logoutUser, toggleSidebar } from "../features/user/userSlice";
import { useState } from "react";

const Navbar = () => {
  const [showLogout, setShowLogout] = useState<boolean>(false);
  const { user } = useAppSelector((store) => store.user);
  const dispatch = useAppDispatch();

  const toggle = (): void => {
    dispatch(toggleSidebar());
  };

  return (
    <Wrapper>
      <div className="nav-center">
        <button type="button" className="toggle-btn" onClick={toggle}>
          <FaAlignLeft />
        </button>
        <div>
          <Logo />
          <h3 className="logo-text">dashboard</h3>
        </div>
        <div className="btn-container">
          <button
            type="button"
            className="btn"
            onClick={() => setShowLogout(!showLogout)}
          >
            <FaUserCircle />
            {user?.name}
            <FaCaretDown />
          </button>
          <div className={showLogout ? "dropdown show-dropdown" : "dropdown"}>
            <button
              type="button"
              className="dropdown-btn"
              onClick={() => {
                dispatch(logoutUser('Logging out...'));
              }}
            >
              logout
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};
export default Navbar;
