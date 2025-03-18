import Dashboard from "./components/Dashboard/Dashboard";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import NovelDescription from "./components/NovelDescription/NovelDescription";
export default function Home() {
  return (
    <div>

      <Navbar/>
      {/* <Dashboard /> */}
      <NovelDescription/>
      <Footer />

    </div>
  );
}
