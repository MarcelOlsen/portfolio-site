import CustomCursor from './components/CustomCursor'
import Hero from './components/Hero'
import SectionDivider from './components/SectionDivider'
import About from './components/About'
import WorkProject1 from './components/WorkProject1'
import WorkProject2 from './components/WorkProject2'
import Contact from './components/Contact'

export default function App() {
  return (
    <>
      <CustomCursor />
      <Hero />
      <SectionDivider />
      <About />
      <SectionDivider />
      <WorkProject1 />
      <SectionDivider />
      <WorkProject2 />
      <SectionDivider />
      <Contact />
    </>
  )
}
