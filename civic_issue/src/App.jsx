import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Categories from "./components/Categories";
import Footer from "./components/Footer";


function App() {
  return (
    <div className="app-bg">
      <Navbar />
      <main className="main-content">
        <Hero />
        <Categories />
      </main>
      <Footer />
    </div>
  );
}

export default App;
