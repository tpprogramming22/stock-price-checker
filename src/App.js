import logo from './logo.svg';
import './App.css';
import Fetcher from './components/fetcher';

function App() {
  return (
    <div>
      <div className='flex justify-center items-center m-auto'>
      <h1 className='text-4xl pt-20 pb-10'>Price Finder</h1>
      </div>
      <Fetcher />
    </div>
  );
}

export default App;
