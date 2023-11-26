import { useState, useEffect } from 'react';

const useSignUpValidation = ({ id, password, nickname }) => {
  const [idStatus, setIdStatus] = useState({
    message: '',
    status: false,
  });

  const [pwStatus, setPwStatus] = useState({
    message: '',
    status: false,
  });

  const [nkStatus, setNkStatus] = useState({
    message: '',
    status: false,
  });

  useEffect(() => {
    const idValid = id.length >= 5;

    if (!idValid) {
      setIdStatus({
        message: '5글자 이상 입력해 주세요.',
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
        message: '8글자 이상 입력해 주세요.',
        status: false,
      });
    } else {
      setPwStatus({
        message: '',
        status: true,
      });
    }
  }, [password]);

  useEffect(() => {
    const nkValid = nickname.length >= 2;

    if (!nkValid) {
      setNkStatus({
        message: '2글자 이상 입력해 주세요.',
        status: false,
      });
    } else {
      setNkStatus({
        message: '',
        status: true,
      });
    }
  }, [nickname]);

  return [idStatus, pwStatus, nkStatus];
};

export default useSignUpValidation;
