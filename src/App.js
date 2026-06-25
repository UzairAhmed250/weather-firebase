import "./App.css";
import Router from "./components/router/router/index";
import ChatWidget from "./components/chat-widget/ChatWidget";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router />
      <ChatWidget />
    </AuthProvider>
  );
}

export default App;
