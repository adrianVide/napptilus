import { Worker } from "../../types/worker";
import Header from "../Header/Header";
import WorkerCard from "../WorkerCard/WorkerCard";
import "./WorkersList.css";

type Props = {
  workers: Worker[];
  lastWorkerRef: React.RefObject<HTMLDivElement>;
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
};

const WorkersList = ({
  workers,
  lastWorkerRef,
  searchTerm,
  setSearchTerm,
}: Props) => {
  return (
    <>
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className="grid-container">
        {workers.map((worker: Worker, index: number) => {
          if (index === workers.length - 1) {
            return (
              <div ref={lastWorkerRef} key={worker.id} id="last">
                <WorkerCard
                  worker={worker}
                  key={worker.id}
                />
              </div>
            );
          } else {
            return <WorkerCard key={worker.id} worker={worker} />;
          }
        })}
      </div>
    </>
  );
};

export default WorkersList;
