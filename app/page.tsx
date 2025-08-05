import HeroSection from "./components/HeroSection";
import RhythmOfWellnessSection from "./components/RhythmOfWellnessSection";
import MealMatrixSection from "./components/MealMatrixSection";
import AncestralPlateDecoderSection from "./components/AncestralPlateDecoderSection";
import JourneyMapSection from "./components/JourneyMapSection";
import SankofaFooter from "./components/SankofaFooter";
import { SoundProvider } from "./components/SoundProvider";
import { SoundToggle } from "./components/SoundToggle";

export default function Home() {
  return (
    <SoundProvider>
      <main>
        <HeroSection />
        <RhythmOfWellnessSection />
        <MealMatrixSection />
        <AncestralPlateDecoderSection />
        <JourneyMapSection />
        <SankofaFooter />
      </main>
    </SoundProvider>
  );
}
