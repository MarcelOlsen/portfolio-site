import CustomCursor from './ui/CustomCursor/CustomCursor'
import Hero from './sections/hero/Hero'
import SectionDivider from './ui/SectionDivider/SectionDivider'
import About from './sections/about/About'
import StateOfAi from './projects/state-of-ai/StateOfAi'
import YearInReview from './projects/year-in-review/YearInReview'
import MiniReact from './projects/mini-react/MiniReact'
import Contact from './sections/contact/Contact'

export default function App() {
  return (
    <>
      <CustomCursor />
      <Hero />
      <SectionDivider />
      <About />
      <SectionDivider />
      <StateOfAi />
      <SectionDivider />
      <YearInReview />
      <SectionDivider />
      <MiniReact />
      <Contact />
    </>
  )
}
