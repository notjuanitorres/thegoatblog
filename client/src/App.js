import './App.css';
import Header from './Header';
import Layout from './Layout';
import IndexPage from './pages/IndexPage';
import Post from './Post';
import {Route, Routes} from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<IndexPage />} />
        <Route path={'/login'} element= {<div>Login page</div>} />
      </Route>
    </Routes>
  );
}

export default App;
