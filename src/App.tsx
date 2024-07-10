import "./App.css";
import { useFetchWorkers } from "./hooks/useFetchWorkers";
import { useEffect, useState } from "react";
import { filterWorkers } from "./store/features/workersSlice";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WorkerDetail from "./components/WorkerDetail/WorkerDetail";
import WorkersList from "./components/WorkersList/WorkersList";
import NavBar from "./components/NavBar/NavBar";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const { workers, lastWorkerRef } = useFetchWorkers(searchTerm.length !== 0);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(filterWorkers(searchTerm));
  }, [searchTerm, dispatch]);

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={
            <WorkersList
              workers={workers}
              lastWorkerRef={lastWorkerRef}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
          }
        />
        <Route path="/:id" element={<WorkerDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
