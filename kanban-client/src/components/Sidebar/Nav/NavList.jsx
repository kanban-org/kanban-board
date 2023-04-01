import NavItem from "./NavItem";
import classes from "./NavList.module.scss";
import { useSelector } from "react-redux";
import { selectBoards } from "../../../state/reducers/selectors/board";

function NavList() {
  const boards = useSelector(selectBoards);

  return (
    <ul className={classes.navList} role={["list"]}>
      {boards.length > 0 &&
        boards.map((board) => {
          return <NavItem key={board.id} boardId={board.id} />;
        })}
    </ul>
  );
}

export default NavList;
