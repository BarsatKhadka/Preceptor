import './index.css'
import { Navbar } from './components/Navbar';
import { OllamaAi } from './components/OllamaAi';
import { Precepts } from './components/Precepts';
import { Extension } from './components/Extension';

export default function App() {
  return (
    <div className="flex flex-col h-screen min-h-0">
      <Navbar />
      <div className="flex flex-row flex-1 h-0 min-h-0 w-full">
        <OllamaAi />
        <Precepts />
        <Extension />
      </div>
    </div>
  );
}
