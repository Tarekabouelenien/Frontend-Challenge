import { CardLayout } from './components/CardLayout/CardLayout';
import './index.css';

function App() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <CardLayout />
    </div>
  );
}

export default App;