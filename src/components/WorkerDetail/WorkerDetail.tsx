import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchWorkerById } from "../../store/features/workersSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store/store";
import "./WorkerDetail.css";

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
  console.log(worker);
  if (!worker) {
    return <div>Worker not found</div>;
  }

  return (
    <div className="detail-container">
      <img
        src="https://placehold.co/600x400"
        alt={`${worker.first_name} ${worker.last_name}`}
      />
      <div className="detail-information">
        <h2 className="detail-name">
          {worker.first_name} {worker.last_name}
        </h2>
        <p className="detail-gender">{worker.gender}</p>
        <p className="detail-profession">{worker.profession}</p>
        <p
          className="detail-description"
          dangerouslySetInnerHTML={{ __html: worker.description }}
        />
      </div>
    </div>
  );
};

export default WorkerDetail;
