import { useEffect, useState } from 'react';

import ReturnButton from '../commons/return-button';

const Loading = ({ message }) => {
  const [isLoaded, setIsLoaded] = useState();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoaded) {
    return (
      <div className="blank">
        { message ? <p>{message}</p> : <p>Ta strona jest pusta.</p>}
        <ReturnButton />
      </div>
    )
  } else {
    return (
      <div className="loading">
        <p>Wczytywanie...</p>
      </div>
    )
  }
}

export default Loading;