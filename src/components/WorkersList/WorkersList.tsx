import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Worker } from "../../types/worker";
import Header from "../Header/Header";
import WorkerCard from "../WorkerCard/WorkerCard";
import "./WorkersList.css";
import { setLastWorkerRefId } from "../../store/features/refSlice";

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
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setLastWorkerRefId(lastWorkerRef?.current?.id));
  }, [lastWorkerRef]);
  return (
    <>
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className="grid-container">
        {workers.map((worker: Worker, index: number) => {
          if (index === workers.length - 1) {
            return (
              <div
                ref={lastWorkerRef}
                key={worker.id}
                id={worker.id.toString()}
              >
                <WorkerCard worker={worker} key={worker.id} />
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
