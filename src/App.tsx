import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Routes from "./routes/Routes";
import { ToastContainer } from "react-toastify";


const queryClient =  new QueryClient()
function App() {
 return(
    <QueryClientProvider client={queryClient}>
      <Routes/>
      <ToastContainer position="top-right" autoClose={3000} />
    </QueryClientProvider>
  )
}

export default App;