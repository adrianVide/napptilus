import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { fetchWorkers } from "../store/features/workersSlice";

export const useFetchWorkers = () => {
  const dispatch = useDispatch<AppDispatch>();
  const workers = useSelector(
    (state: RootState) => state.workers.filteredWorkers
  );
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

  return { workers, lastWorkerRef };
};
