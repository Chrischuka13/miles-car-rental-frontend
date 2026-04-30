import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Routes from "./routes/Routes";
import Footer from "./components/footer/Footer";


const queryClient =  new QueryClient()
function App() {
  return(
    <QueryClientProvider client={queryClient}>
      <Routes/>
      <Footer/>
    </QueryClientProvider>
  )
}

export default App;