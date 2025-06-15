import Header from "./components/header";
import Hero from "./components/hero";
import Contacts from "./components/contacts";
import Footer from "./components/footer";
import Services from "./components/services";
import ProvidenciaManager from "./components/providenciaManager";
import News from "./components/news";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Hero />
        <ProvidenciaManager />
        <News />
        <Services />
        <Contacts/>
      </main>
      <Footer />
    </div>
  );
}