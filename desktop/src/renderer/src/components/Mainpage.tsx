import { OllamaAi } from './OllamaAi';
import { Precepts } from './Precepts';
import { Extension } from './Extension';

export default function MainPage() {
  return (
    <>
      <div className="w-full flex flex-row justify-between items-stretch">
        <OllamaAi />
        <Precepts />
        <Extension />
      </div>
    </>
  );
}   