export type Worker = {
  id: number;
  first_name: string;
  last_name: string;
  profession: string;
};

export type WorkerDetail = Worker & {
  gender: string;
  description: string;
};
