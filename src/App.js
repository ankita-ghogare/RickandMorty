import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Hero from "./components/Hero/Hero";
import Characters from "./components/Characters/Characters";
import Footer from "./components/Footer/Footer";

import "./App.css";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Hero />
      <Characters/>
      <Footer/>
    </QueryClientProvider>
  );
};

export default App;
