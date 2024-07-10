import "./App.css";
import { Worker } from "./types/worker";
import { useFetchWorkers } from "./hooks/useFetchWorkers";
import { useEffect, useState } from "react";
import { filterWorkers } from "./store/features/workersSlice";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import WorkerDetail from "./components/WorkerDetail/WorkerDetail";
import WorkersList from "./components/WorkersList/WorkersList";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const { workers, lastWorkerRef } = useFetchWorkers(searchTerm.length !== 0);

  const dispatch = useDispatch();

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
              <WorkersList workers={workers} lastWorkerRef={lastWorkerRef} />
            }
          />
          <Route path="/:id" element={<WorkerDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
