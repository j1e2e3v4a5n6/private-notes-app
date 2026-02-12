import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NotePage from "./pages/NotePage";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/note/:id" element={<NotePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
