import "./App.css";
import { Worker } from "./types/worker";
import { useFetchWorkers } from "./hooks/useFetchWorkers";

function App() {
  const { workers, lastWorkerRef } = useFetchWorkers();

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

  return (
    <div className="App">
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
