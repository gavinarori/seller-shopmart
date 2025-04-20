
import Navbar from "./Navbar"
import Banner from "./banner"
import { Footer } from "./Footer"
import { SetupGuide } from "./setup-guide"
import { FeatureHighlights } from "./feature-highlights"
import { CallToAction } from "./call-to-action"
import { Testimonials } from "./testimonials"
import StoreShowSlider from "./store-show-slider"
import { TrendingSection } from "./trending-section"
export default function Landing() {
    return (
      <div>
        <Navbar/>
        <Banner/>
        <StoreShowSlider/>
        <TrendingSection/>
        <FeatureHighlights/>
        <SetupGuide/>
        <Testimonials/>
        <CallToAction/>
        <Footer/>
      </div>
    )
  
  }