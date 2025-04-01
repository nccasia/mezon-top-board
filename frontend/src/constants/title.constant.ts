import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const TitleConstants: React.FC = () => {
  const location = useLocation();
  
  useEffect(() => {
    const pageName = getPageNameFromPath(location.pathname);
    document.title = `${pageName} - Mezon Top Board`;
  }, [location]);
  
  const getPageNameFromPath = (path: string): string => {
    const segments = path.substring(1).split('/');
    const lastSegment = segments[segments.length - 1] || 'Home';
    return lastSegment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };
  
  return null;
};

export default TitleConstants;