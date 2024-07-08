import "./App.css";
import { Worker } from "./types/worker";
import { useFetchWorkers } from "./hooks/useFetchWorkers";
import { useEffect, useState } from "react";
import { filterWorkers } from "./store/features/workersSlice";
import { useDispatch } from "react-redux";

function App() {
  const { workers, lastWorkerRef } = useFetchWorkers();
  const [searchTerm, setSearchTerm] = useState("");

  const dispatch = useDispatch();

  const WorkerComponent = ({ worker }: { worker: Worker }) => (
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
  );

  useEffect(() => {
    dispatch(filterWorkers(searchTerm));
  }, [searchTerm, dispatch]);

  return (
    <div className="App">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search workers..."
      />
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
  );
}

export default App;
