import { useEffect } from 'react'
import SmoothScroll from './components/SmoothScroll'
import TopBar from './components/TopBar'
import Hero from './sections/Hero'
import Marquee from './sections/Marquee'
import Story from './sections/Story'
import Origins from './sections/Origins'
import Process from './sections/Process'
import Roasts from './sections/Roasts'
import Voices from './sections/Voices'
import Subscriptions from './sections/Subscriptions'
import Wholesale from './sections/Wholesale'
import FinePrint from './sections/FinePrint'
import Footer from './sections/Footer'
import ProductPage from './pages/ProductPage'
import BrewGuidesPage from './pages/BrewGuidesPage'
import VisitPage from './pages/VisitPage'
import { Router } from './router'

function HomePage() {
  return (
    <main>
      <Hero />
      <Marquee />
      <Story />
      <Origins />
      <Process />
      <Roasts />
      <Voices />
      <Subscriptions />
      <Wholesale />
      <FinePrint />
      <Footer />
    </main>
  )
}

const TITLES: Record<string, string> = {
  '/brew-guides': 'Brew Guides — Ember',
  '/visit': 'Visit the Roastery — Ember',
  '/roasts/dawn': 'Dawn — Light Roast — Ember',
  '/roasts/ember': 'Ember — Medium Roast — Ember',
  '/roasts/char': 'Char — Dark Roast — Ember',
}

function Page({ path }: { path: string }) {
  useEffect(() => {
    document.title = TITLES[path] ?? 'Ember — Specialty Coffee Roastery'
  }, [path])

  const productMatch = path.match(/^\/roasts\/([\w-]+)\/?$/)
  if (productMatch) return <ProductPage slug={productMatch[1]} />
  if (path === '/brew-guides') return <BrewGuidesPage />
  if (path === '/visit') return <VisitPage />
  return <HomePage />
}

export default function App() {
  return (
    <Router>
      {(path) => (
        <>
          <SmoothScroll />
          <TopBar />
          <Page path={path} />
        </>
      )}
    </Router>
  )
}
