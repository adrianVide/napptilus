import { Worker } from "../../types/worker";
import { Link } from "react-router-dom";
import "./WorkerCard.css";

type Props = {
  worker: Worker;
};

const WorkerCard = ({ worker }: Props) => {
  return (
    <Link to={`/${worker.id}`}>
      <div>
        <img
          className="worker-card-image"
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
};

export default WorkerCard;
