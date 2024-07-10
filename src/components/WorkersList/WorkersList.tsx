import { Worker } from "../../types/worker";
import { Link } from "react-router-dom";

interface WorkersListProps {
  workers: Worker[];
  lastWorkerRef: React.RefObject<HTMLDivElement>;
}

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

const WorkersList: React.FC<WorkersListProps> = ({
  workers,
  lastWorkerRef,
}) => {

  return (
    <div>
      {workers.map((worker: Worker, index: number) => {
        if (index === workers.length - 1) {
          return (
            <div ref={lastWorkerRef} key={worker.id} id="last">
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
};

export default WorkersList;
