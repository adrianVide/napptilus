import "./App.css";
import { useEffect, useRef, useState } from "react";
import { Worker } from "./types/worker";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "./store/store";
import { fetchWorkers } from "./store/features/workersSlice";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const workers = useSelector((state: RootState) => state.workers.workers);
  const workerStatus = useSelector((state: RootState) => state.workers.status);
  const [page, setPage] = useState(1);

  const lastWorkerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && workerStatus !== "loading") {
          dispatch(fetchWorkers(page + 1));
          setPage(page + 1);
        }
      });
    }, options);

    if (lastWorkerRef.current) {
      observer.observe(lastWorkerRef.current);
    }

    return () => {
      if (lastWorkerRef.current) {
        observer.unobserve(lastWorkerRef.current);
      }
    };
  }, [dispatch, page, workerStatus]);
  useEffect(() => {
    if (workerStatus !== "loading") {
      console.log("Fetching workers...");
      dispatch(fetchWorkers(page));
    }
  }, []);

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
