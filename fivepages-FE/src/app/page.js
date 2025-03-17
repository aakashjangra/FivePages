
// import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard/Dashboard";
import NovelPage from "./components/NovelDescription/NovelDescription";

export default function Home() {
  return (
    <div>
      {/* <Dashboard/>  */}
      {process.env.BASE_URL}
      <NovelPage/>
    </div>
  )
}