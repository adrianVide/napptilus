import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { fetchWorkers } from "../store/features/workersSlice";

export const useFetchWorkers = (hasSearch: boolean) => {
  const dispatch = useDispatch<AppDispatch>();
  const workers = useSelector(
    (state: RootState) => state.workers.filteredWorkers
  );
  const workerStatus = useSelector((state: RootState) => state.workers.status);
  const [page, setPage] = useState(1);
  const lastWorkerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (hasSearch) return;
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

    const ref = lastWorkerRef.current;

    if (ref) {
      observer.observe(ref);
    }

    return () => {
      if (ref) {
        observer.unobserve(ref);
      }
    };
  }, [dispatch, hasSearch, page, workerStatus]);

  useEffect(() => {
    if (workerStatus !== "loading") {
      dispatch(fetchWorkers(page));
    }
  }, []);

  return { workers, lastWorkerRef };
};
