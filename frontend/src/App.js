import logo from './logo.svg';
import './App.css';
import { Login } from './Pages/Login';
import { Routes, Route } from "react-router-dom";
import { Chatting } from './Pages/Chatting';
import {Register} from './Pages/Register'
import { socket } from './Config/socket';
import SocketContext from './Context/SocketContext';
import { Toaster } from 'react-hot-toast';


function App() {
  return (
    <SocketContext.Provider value={{socket}}>
      <Toaster />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/chatting" element={<Chatting />} />
      </Routes>
    </SocketContext.Provider>
  );
}

export default App;
