import "./App.css";
import { Worker } from "./types/worker";
import { useFetchWorkers } from "./hooks/useFetchWorkers";
import { useEffect, useState } from "react";
import { filterWorkers } from "./store/features/workersSlice";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import WorkerDetail from "./components/WorkerDetail/WorkerDetail";

function App() {
  const { workers, lastWorkerRef } = useFetchWorkers();
  const [searchTerm, setSearchTerm] = useState("");

  const dispatch = useDispatch();

  const WorkerComponent = ({ worker }: { worker: Worker }) => (
    <Link to={`/${worker.id}`}>
      <div>
        <img
          src="https://placehold.co/400x300"
          alt={`${worker.first_name} ${worker.last_name}`}
        />
        <h2>
          {worker.first_name} {worker.last_name}
        </h2>
        <p>{worker.profession}</p>
      </div>
    </Link>
  );

  useEffect(() => {
    dispatch(filterWorkers(searchTerm));
  }, [searchTerm, dispatch]);

  return (
    <Router>
      <div className="App">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search workers..."
        />
        <Routes>
          <Route
            path="/"
            element={
              <div>
                {workers?.map((worker: Worker, index: number) => {
                  if (index === workers.length - 1) {
                    return (
                      <div ref={lastWorkerRef} key={worker.id}>
                        LAST
                        <WorkerComponent worker={worker} />
                      </div>
                    );
                  } else {
                    return <WorkerComponent key={worker.id} worker={worker} />;
                  }
                })}
              </div>
            }
          />
          <Route path="/:id" element={<WorkerDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
