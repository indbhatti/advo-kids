import Hero from './hero'
import About from './about'
import Why from './why'

export default function Home() {
  return (
    <div className="pb-10">
      <Hero />
      <About />
      <Why />
    </div>
  )
}
