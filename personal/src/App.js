import './App.css';
import { NavBar } from './components/NavBar.js'; // Named import
import { Banner } from './components/Banner.js'; // Named import
import { Skills } from './components/Skills.js'; // Named import
import { Projects } from './components/Project.js'; // Named import
import { Footer } from './components/Footer.js'; // Named import
import { Contact } from './components/Contact.js'; // Named import

import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
    <div className="App">
      <NavBar/>
      <Banner/>
      <Skills/>
      <Projects/>
      <Contact/>
      <Footer/>
    </div>
  );
}

export default App;
