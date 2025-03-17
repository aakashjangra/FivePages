import Dashboard from "./components/Dashboard/Dashboard";
import Footer from "./components/Footer/Footer";
import NovelPage from "./components/NovelDescription/NovelDescription";

export default function Home() {
  return (
    <div>
      <Dashboard/>
      {/* {process.env.BASE_URL}
      <NovelPage/> */}
    <Footer/>
    </div>

  )
}