import SideNav from "./Nav/SideNav";
import icons from "../../img/symbol-defs.svg";
import logo_dark from "../../img/Dark-Mode-Logo.png";
import logo_light from "../../img/Light-Mode-Logo.png";
import { useActions } from "../../hooks/useActions";
import classes from "./Sidebar.module.scss";
import { useSelector } from "react-redux";
import { selectDisplayTheme } from "../../state/reducers/selectors/display";
import { useCallback, useEffect } from "react";
import Tooltip from "../UI/Tooltip";

function Sidebar() {
  const { changeTheme } = useActions();
  const theme = useSelector((state) => selectDisplayTheme(state));

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.className = "dark-theme";
    } else {
      document.documentElement.className = "";
    }
  }, [theme]);

  const handleDisplayChange = useCallback(() => {
    theme === "dark" ? changeTheme("light") : changeTheme("dark");
  }, [theme, changeTheme]);

  const lightMode = (
    <Tooltip content="Change Theme" direction="top">
      <button className={classes.toggleBtn} onClick={handleDisplayChange}>
        <span>Dark</span>
        <svg className="svg svg-dark">
          <use href={icons + "#icon-dark"}></use>
        </svg>
      </button>
    </Tooltip>
  );

  const darkMode = (
    <Tooltip content="Change Theme" direction="top">
      <button className={classes.toggleBtn} onClick={handleDisplayChange}>
        <span>Light</span>
        <svg className="svg svg-white">
          <use href={icons + "#icon-light"}></use>
        </svg>
      </button>
    </Tooltip>
  );

  return (
    <div className={classes.sidebar}>
      <div className={classes.logo}>
        {theme === "dark" ? (
          <img src={logo_dark} alt="logo" />
        ) : (
          <img src={logo_light} alt="logo" />
        )}

        <h1
          className={`${
            theme === "dark" ? classes.brandLight : classes.brandDark
          } ${classes.brand}`}
        >
          kanban
        </h1>
      </div>

      {/* Navigation */}
      <SideNav />

      {theme === "dark" ? darkMode : lightMode}
    </div>
  );
}

export default Sidebar;
