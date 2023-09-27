import Home from "./pages/Home";
import DataView from "./pages/DataView";
import EmailView from "./pages/EmailView";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/data-view" element={<DataView />} />
      <Route path="/email-editor" element={<EmailView />} />
    </Routes>
  );
}

export default App;
