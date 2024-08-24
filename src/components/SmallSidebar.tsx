import { FaTimes } from "react-icons/fa";
import Wrapper from "../assets/wrappers/SmallSidebar";
import Logo from "./Logo";
import { useAppDispatch, useAppSelector } from "../hooks/userCustomHook";
import { toggleSidebar } from "../features/user/userSlice";
import links from "../utils/links";
import { NavLink } from "react-router-dom";

const SmallSidebar = () => {
  const { isSidebarOpen } = useAppSelector((store) => store.user);
  const dispatch = useAppDispatch();

  const toggle = (): void => {
    dispatch(toggleSidebar());
  };
  return (
    <Wrapper>
      <div className={`sidebar-container ${isSidebarOpen && "show-sidebar"}`}>
        <div className="content">
          <button type="button" className="close-btn" onClick={toggle}>
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <div className="nav-links">
            {links.map((link) => {
              const { text, path, id, icon } = link;

              return (
                <NavLink
                  key={id}
                  to={path}
                  onClick={toggle}
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  <span className="icon">{icon}</span>
                  {text}
                </NavLink>
              );
            })}
          </div>
        </div>
      </div>
    </Wrapper>
  );
};
export default SmallSidebar;
