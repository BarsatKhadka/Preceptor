import OllamaAi from './Ollama/OllamaAi';
import { Precepts } from './Precepts/Precepts';
import { Extension } from './Extension/Extension';

export default function MainPage() {
  return (
    <>
    <div>
      <OllamaAi />
        <Precepts />
        <div className="hidden lg:block flex-1">
          <Extension />
        </div>
      </div>
    </>
  );
}   