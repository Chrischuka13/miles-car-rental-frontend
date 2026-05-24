import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Routes from "./routes/Routes";
import { ToastContainer } from "react-toastify";
import AuthProvider from "./context/AuthContext";

const queryClient = new QueryClient();
function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
