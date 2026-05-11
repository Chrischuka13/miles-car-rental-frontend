import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Routes from "./routes/Routes";
import { ToastContainer } from "react-toastify";
import AuthProvider from "./context/AuthContext";



const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Routes />
        <ToastContainer position="top-right" autoClose={3000} />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
