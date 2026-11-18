import Hero from '../components/home/Hero.jsx'
import HowItWorks from '../components/home/HowItWorks.jsx'
import Pathways from '../components/home/Pathways.jsx'
import ImpactBand from '../components/home/ImpactBand.jsx'
import SDGSection from '../components/home/SDGSection.jsx'
import ExploreTeaser from '../components/home/ExploreTeaser.jsx'
import CTASection from '../components/home/CTASection.jsx'
import usePageTitle from '../hooks/usePageTitle.js'

export default function Home() {
  usePageTitle('Second Life — Don’t Throw It Away. Give It a Second Life.')
  return (
    <>
      <Hero />
      <HowItWorks />
      <Pathways />
      <ImpactBand />
      <SDGSection />
      <ExploreTeaser />
      <CTASection />
    </>
  )
}
