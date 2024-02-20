import "../App.css";
import CtaField from "./CtaField";
import AllTasks from "./AllTasks";
import CompletedTasks from "./CompletedTasks";
import Uncompletedtasks from "./Uncompletedtasks";

export default function Container() {
  return (
    <>
      <div className="container">
        <h1>Tasks</h1>
        <div
          className="nav"
          style={{ display: "flex", gap: ".3rem", marginBottom: "1rem" }}
        >
          <AllTasks />
          <CompletedTasks />
          <Uncompletedtasks />
        </div>
        <CtaField />
      </div>
    </>
  );
}
