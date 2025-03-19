import Dashboard from "./components/Dashboard/Dashboard";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";


export default function Home() {
  return (
    <div>
      <Navbar/>
      <Dashboard />
      <Footer />
    </div>
  );
}
