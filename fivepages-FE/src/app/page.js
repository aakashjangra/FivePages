
import Navbar from "./components/Navbar";
import NovelPage from "./Components/noveldescription";

export default function Home() {
  return (
    <div>
      {process.env.BASE_URL}
      <NovelPage/>
    </div>
  )
}