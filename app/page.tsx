// import Image from 'next/image'
import Hero from './hero'
import About from './about'
import Why from './why'

export default function Home() {
  return (
    <div>
      <div className="top_container">
        <Hero />
      </div>
        <About />
        <Why />
    </div>
  )
}
