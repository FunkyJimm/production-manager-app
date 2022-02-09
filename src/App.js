import { useNavigate } from 'react-router-dom';

import './App.scss';

function App() {
  let navigate = useNavigate();

  const handleNavigate = endpoint => {
    navigate(endpoint, { replace: false }, [navigate]);
  }

  return (
    <div className="App">
      <h1>Production Manager App by FunkyJimm 2022</h1>
      <button onClick={() => handleNavigate('users')}>Users</button>
    </div>
  );
}

export default App;
