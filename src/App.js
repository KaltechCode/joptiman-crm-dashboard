import logo from './logo.svg';
import './App.css';
import AppRouter from './router';
import PageLoader from './Layout/FullPageLoader/FullPageLoader';
import { Provider } from 'react-redux';
import { store } from './Store';

function App() {
  return (
    <>
      <Provider store={store}>
        <PageLoader />
        <AppRouter />
      </Provider>

    </>
  );
}

export default App;
