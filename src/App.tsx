import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Routes from "./routes/Routes";
import Footer from "./components/footer/Footer";
import NavBar from "./components/nav/NavBar";


const queryClient =  new QueryClient()
function App() {
  return(
    <QueryClientProvider client={queryClient}>
      <NavBar/>
      <Routes/>
      <Footer/>
    </QueryClientProvider>
  )
}

export default App;