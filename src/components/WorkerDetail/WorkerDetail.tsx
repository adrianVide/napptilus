import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchWorkerById } from "../../store/features/workersSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store/store";

const WorkerDetail = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const worker = useSelector(
    (state: RootState) => state.workers.selectedWorker
  );
  const workerStatus = useSelector((state: RootState) => state.workers.status);
  useEffect(() => {
    if (id) {
      dispatch(fetchWorkerById(id));
    }
  }, [dispatch, id]);

  if (workerStatus === "loading") {
    return <div>Loading...</div>;
  }

  if (!worker) {
    return <div>Worker not found</div>;
  }

  return (
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
};

export default WorkerDetail;
