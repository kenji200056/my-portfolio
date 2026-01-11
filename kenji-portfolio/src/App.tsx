import Header from './components/layout/Header';
import Hero from './components/sections/Hero';
import Story from './components/sections/Story';
import Experience from './components/Experience';
import Works from './components/sections/Works';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Story />
        <Experience />
        <Works />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
