import Post from "./Post"
import './App.css';

function App() {
  const [posts, setPosts] = useState([]);

  return (
    <div className="app">
      <div className="app-header">
        <img 
            className="app-headerImage"
            src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" 
            alt="" 
            />
      </div>
      
      <h1>TESTING INSTA CLONE</h1>

      
      <Post username="NealDegrasse" caption="WOW it works" imageUrl="https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg" />
      <Post username="JimJorgenson" caption="Im fat" imageUrl="https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg" />
      <Post username="RickMartin" caption="viva la slurpies" />
      
    </div>
  );
}

export default App;
