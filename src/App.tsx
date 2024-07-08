import "./App.css";
import { useEffect } from "react";
import { Worker } from "./types/worker";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "./store/store";
import { fetchWorkers } from "./store/features/workersSlice";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const workers = useSelector((state: RootState) => state.workers.workers);
  const workerStatus = useSelector((state: RootState) => state.workers.status);
  const error = useSelector((state: RootState) => state.workers.error);
  useEffect(() => {
    if (workerStatus === "idle") {
      dispatch(fetchWorkers(1));
    }
  }, [workerStatus, dispatch]);
  return (
    <div className="App">
      <div className="App">
        {workers?.map((worker: Worker) => (
          <div key={worker.id}>
            <img src="https://placehold.co/400x300" alt={worker.first_name} />
            <h2>
              {worker.first_name} {worker.last_name}
            </h2>
            <p>{worker.profession}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
