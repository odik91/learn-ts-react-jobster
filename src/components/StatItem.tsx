import Wrapper from "../assets/wrappers/StatItem";
import { DefaultStats } from "./StatsContainer";

const StatItem = ({ count, title, icon, color, bcg }: DefaultStats) => {
  return (
    <Wrapper color={color} bcg={bcg}>
      <header>
        <span className="count">{count}</span>
        <span className="icon">{icon}</span>
      </header>
      <h5 className="title">{title}</h5>
    </Wrapper>
  );
};
export default StatItem;
