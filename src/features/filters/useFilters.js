import { useLoaderData } from "react-router-dom";

const useFilters = () => {
  const { meta, params } = useLoaderData();
  return { meta, params };
};

export default useFilters;

