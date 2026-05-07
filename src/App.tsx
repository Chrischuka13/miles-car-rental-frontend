import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Routes from "./routes/Routes";
import { ToastContainer } from "react-toastify";


const queryClient =  new QueryClient()
function App() {
  return(
    <QueryClientProvider client={queryClient}>
      <ToastContainer position="top-right" />
      <Routes/>
    </QueryClientProvider>
  )
}

export default App;