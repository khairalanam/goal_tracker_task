import "./App.css";
import Button from "./components/Button";
import Goal from "./components/Goal";
import Header from "./components/Header";
import Searchbar from "./components/Searchbar";
import { useEffect, useState } from "react";
import NoGoal from "./components/NoGoal";

function App() {
  const [goals, setGoals] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // fetch the goals data initially
  useEffect(() => {
    const getGoals = async () => {
      const goalsFromServer = await fetchGoals();

      setGoals(goalsFromServer);
    };
    getGoals();
  }, []);

  console.log(goals);

  // fetch goals data
  const fetchGoals = async () => {
    const res = await fetch("http://localhost:5000/goals");
    const data = await res.json();

    return data;
  };

  // delete goal
  const deleteGoal = async (id) => {
    await fetch(`http://localhost:5000/goals/${id}`, {
      method: "DELETE",
    });
    setGoals(goals.filter((goal) => goal.id !== id));
  };

  return (
    <div className="App">
      <Header />
      <div className="main-section">
        <Searchbar
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
        <Button text="Add Goal" />
      </div>
      {goals.length === 0 ? (
        <NoGoal className="no-goal" />
      ) : (
        <ul className="goals-list">
          {goals
            .filter((goal) => {
              return searchTerm === ""
                ? goal
                : goal.goal.toLowerCase().includes(searchTerm.toLowerCase());
            })
            .map((goal, index) => {
              return <Goal goal={goal} key={index} onDelete={deleteGoal} />;
            })}
        </ul>
      )}
    </div>
  );
}

export default App;
