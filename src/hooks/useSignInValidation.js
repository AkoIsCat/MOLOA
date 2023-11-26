import { useEffect, useState } from 'react';

const useValidation = ({ id, password }) => {
  const [idStatus, setIdStatus] = useState({
    status: false,
  });

  const [pwStatus, setPwStatus] = useState({
    status: false,
  });

  useEffect(() => {
    const idValid = id.length >= 5;

    if (!idValid) {
      setIdStatus({
        status: false,
      });
    } else {
      setIdStatus({
        message: '',
        status: true,
      });
    }
  }, [id]);

  useEffect(() => {
    const pwValid = password.length >= 8;

    if (!pwValid) {
      setPwStatus({
        status: false,
      });
    } else {
      setPwStatus({
        message: '',
        status: true,
      });
    }
  }, [password]);

  return [idStatus, pwStatus];
};

export default useValidation;
