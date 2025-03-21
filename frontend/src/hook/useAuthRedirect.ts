import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useAuthRedirect = (isLogin: boolean, onAuthSuccess?: () => void) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogin) {
      navigate('/');
      return;
    }

    if (onAuthSuccess) {
      onAuthSuccess(); // Run callback when authenticated
    }
  }, [isLogin, navigate, onAuthSuccess]);
};

export default useAuthRedirect;
