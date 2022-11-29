import { useEffect, useRef, useState } from "react";
import { useLazyGetNearbyServicesQuery } from "../store/features/services/service";
import { IService } from "../store/types/services";
import { jesterParamsFilter } from "./queryParams";

export function useInfiniteNearbyLocationsQuery({ args }: { args: any }) {
  const shouldReset = useRef(true);
  const [results, setResults] = useState<Array<Partial<IService>>>([]);
  const [trigger, result] = useLazyGetNearbyServicesQuery();

  useEffect(() => {
    trigger(jesterParamsFilter(args));
  }, []);

  useEffect(() => {
    shouldReset.current = true;
    trigger(jesterParamsFilter(args));
  }, [args.category, args.distance]);

  useEffect(() => {
    if (!result.isSuccess) return;
    if (shouldReset.current) {
      shouldReset.current = false;
      setResults(result.data.services);
    } else {
      setResults([...results, ...result.data.services]);
    }
  }, [result.data]);

  return {
    ...result,
    data: results,
    fetchNextPage() {
      if (
        result.data!.pagination.total >
        result.data!.pagination.limit * result.data!.pagination.page + 1
      ) {
        trigger(args);
      }
    },
  };
}
