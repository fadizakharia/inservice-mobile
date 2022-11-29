import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import Spinner from "../../components/Spinner";
import SPServicesNavigation from "../../routes/SPServicesNavigation";
import { useLazyLoadServiceQuery } from "../../store/features/services/service";

const Service = () => {
  const [
    getService,
    { isLoading, isSuccess, data, isError, error, isFetching },
  ] = useLazyLoadServiceQuery();
  useEffect(() => {
    (async () => {
      await getService(undefined);
    })();
    return () => {};
  }, []);

  return !isLoading && !isFetching ? (
    <SPServicesNavigation hasService={isSuccess} />
  ) : (
    <Spinner />
  );
};

export default Service;

const styles = StyleSheet.create({});
