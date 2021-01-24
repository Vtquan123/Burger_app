import { useEffect, useState } from "react";

const useHttpErrorHandler = (httpClient) => {
  const [error, setError] = useState(false);

  const reqInterceptor = httpClient.interceptors.request.use((request) => {
    setError(null);
    return request;
  });
  const resInterceptor = httpClient.interceptors.response.use(
    (res) => res,
    (error) => {
      setError(error);
      return Promise.reject(error);
    }
  );
  useEffect(() => {
    return () => {
      httpClient.interceptors.request.eject(reqInterceptor);
      httpClient.interceptors.response.eject(resInterceptor);
    };
  }, [reqInterceptor, resInterceptor]);

  const errorConfirmedHandler = () => {
    setError(null);
  };

  return [error, errorConfirmedHandler];
};

export default useHttpErrorHandler;
