import Footer from "@/components/landing-page/Footer";
import Header from "@/components/landing-page/Header";
import Navbar from "@/components/landing-page/Navbar";
import SectionAdvantages from "@/components/landing-page/SectionAdvantages";
import SectionWithraw from "@/components/landing-page/SectionWithraw";
import SectionSteps from "@/components/landing-page/SectionSteps";
import SectionCompare from "@/components/landing-page/SectionCompare";
import SectionFees from "@/components/landing-page/SectionFees";

export default function Home() {
  return (
    <div className="prose lg:prose-xl max-w-full">
      <Navbar />
      <Header />
      <div className="bg-theme-1 w-full h-2"></div>
      <SectionSteps />
      <SectionAdvantages />
      <SectionFees />
      <SectionWithraw />
      <SectionCompare />
      <div className="bg-theme-2 w-full h-2"></div>
      <Footer />
    </div>
  );
}
