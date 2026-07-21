import { ArrowLeft, ArrowUpRight, Clock, MapPin, Ticket } from 'lucide-react'
import AnimatedWords from '../components/AnimatedWords'
import Eyebrow from '../components/Eyebrow'
import Reveal from '../components/Reveal'
import Footer from '../sections/Footer'
import { Link } from '../router'
import storyRoastery from '../assets/story-roastery.webp'
import processDrum from '../assets/process-drum.webp'
import voicesCafe from '../assets/voices-cafe.webp'

const HOURS = [
  { day: 'Monday', hours: 'Closed — green buying day' },
  { day: 'Tuesday', hours: '8am – 2pm (roast day, loud)' },
  { day: 'Wednesday', hours: '8am – 4pm' },
  { day: 'Thursday', hours: '8am – 4pm' },
  { day: 'Friday', hours: '8am – 4pm' },
  { day: 'Saturday', hours: '9am – 3pm — public cupping at 10am' },
  { day: 'Sunday', hours: 'Closed' },
]

const EVENTS = [
  {
    title: 'Saturday cupping',
    cadence: 'Every Saturday, 10am',
    price: 'Free',
    blurb:
      'Six coffees on the table: our three roasts plus whatever samples landed that week. Slurping loudly is encouraged. No sign-up — just show up before ten.',
  },
  {
    title: 'Roast day open house',
    cadence: 'First Tuesday monthly, 9am',
    price: 'Free',
    blurb:
      'Stand at the drum while the week\'s batches go through. You\'ll hear first crack, watch the drop, and taste Dawn about as fresh as physics allows.',
  },
  {
    title: 'Home brewing class',
    cadence: 'Last Saturday monthly, 1pm',
    price: '$25 — includes a bag',
    blurb:
      'Ninety minutes, four brew methods, your questions answered. Bring your own gear if you want us to troubleshoot it. Eight seats, book by email.',
  },
]

export default function VisitPage() {
  return (
    <main>
      {/* Breadcrumb bar */}
      <div className="flex items-center justify-between border-b border-ink px-4 py-3 md:px-8">
        <Link
          to="/"
          className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink/60 hover:text-ember transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Home
        </Link>
        <span className="text-[10px] md:text-xs font-semibold uppercase tracking-[0.18em] text-ink/50">
          14 Kiln Yard, Portland, OR
        </span>
      </div>

      {/* Header */}
      <section className="border-b border-ink">
        <div className="border-b border-ink px-4 py-3 md:px-8">
          <Eyebrow index="B">Visit the roastery</Eyebrow>
        </div>
        <div className="px-4 py-10 md:px-8 md:py-16">
          <AnimatedWords as="h1" className="display text-[13vw] md:text-[7.5vw] text-ink">
            The door is open. The kettle is on.
          </AnimatedWords>
          <AnimatedWords
            as="p"
            delay={0.15}
            className="mt-8 max-w-2xl text-lg md:text-xl font-semibold leading-[1.35] tracking-[-0.01em]"
          >
            <span className="text-ink">
              Ember is a working roastery first and a bar second — which is exactly why it's worth
              the trip.
            </span>{' '}
            <span className="text-ink/45">
              Come watch a batch drop, taste what's on the table, and leave with beans that were
              green a few hours earlier.
            </span>
          </AnimatedWords>
        </div>

        {/* Photo strip */}
        <div className="grid grid-cols-12 gap-4 px-4 pb-10 md:px-8 md:pb-16">
          <Reveal className="col-span-12 sm:col-span-5">
            <div className="relative aspect-[4/3] overflow-hidden">
              <img src={storyRoastery} alt="The Ember roastery floor" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
            </div>
          </Reveal>
          <Reveal delay={0.1} className="col-span-6 sm:col-span-3 sm:mt-12">
            <div className="relative aspect-[3/4] overflow-hidden">
              <img src={processDrum} alt="The roasting drum mid-batch" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
            </div>
          </Reveal>
          <Reveal delay={0.2} className="col-span-6 sm:col-span-4 sm:mt-6">
            <div className="relative aspect-[4/3] overflow-hidden">
              <img src={voicesCafe} alt="The tasting bar at the front of the roastery" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Hours + finding us */}
      <section className="grid grid-cols-12 border-b border-ink">
        <div className="col-span-12 md:col-span-6 border-b md:border-b-0 md:border-r border-ink px-4 py-10 md:px-8 md:py-14">
          <p className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-ink/50">
            <Clock className="h-3.5 w-3.5 text-ember" />
            Hours
          </p>
          <div className="mt-5 border-t border-ink">
            {HOURS.map((h) => (
              <div key={h.day} className="flex items-baseline justify-between gap-4 border-b border-ink py-3">
                <span className="text-sm font-bold uppercase tracking-[0.08em] text-ink">{h.day}</span>
                <span className="text-right text-sm text-ink/60">{h.hours}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-12 md:col-span-6 px-4 py-10 md:px-8 md:py-14">
          <p className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-ink/50">
            <MapPin className="h-3.5 w-3.5 text-ember" />
            Finding us
          </p>
          <AnimatedWords as="p" className="display mt-5 text-3xl md:text-4xl text-ink">
            14 Kiln Yard, Northwest Portland
          </AnimatedWords>
          <p className="mt-5 max-w-md text-sm leading-[1.7] text-ink/60">
            We're the brick building with the orange door, two blocks off the NW 23rd bus lines
            and a ten-minute ride from downtown on the greenway. Bike racks out front; street
            parking is easy before noon. Follow the smell — on Tuesdays you can find us with your
            eyes closed.
          </p>
          <div className="mt-8 flex flex-col items-start gap-2.5">
            <a
              href="https://maps.google.com/?q=Portland+OR+97209"
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-ink hover:text-ember transition-colors"
            >
              Open in maps
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href="mailto:hello@emberroast.co"
              className="text-sm text-ink/70 hover:text-ember transition-colors"
            >
              hello@emberroast.co
            </a>
          </div>
        </div>
      </section>

      {/* Events */}
      <section className="border-b border-ink">
        <div className="flex items-center justify-between border-b border-ink px-4 py-3 md:px-8">
          <p className="flex items-center gap-2 text-[10px] md:text-xs font-semibold uppercase tracking-[0.22em] text-ink">
            <Ticket className="h-3.5 w-3.5 text-ember" />
            On the calendar
          </p>
          <span className="text-[10px] md:text-xs font-semibold uppercase tracking-[0.18em] text-ink/50">
            Most of it is free
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3">
          {EVENTS.map((event, i) => (
            <Reveal
              key={event.title}
              delay={i * 0.08}
              className={`px-4 py-8 md:px-8 md:py-10 border-b border-ink md:border-b-0 ${i < EVENTS.length - 1 ? 'md:border-r' : ''}`}
            >
              <span className="display text-4xl text-ember">0{i + 1}</span>
              <h2 className="display mt-4 text-2xl md:text-3xl text-ink">{event.title}</h2>
              <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.16em] text-ink/60">
                {event.cadence} — {event.price}
              </p>
              <p className="mt-4 max-w-sm text-sm leading-[1.7] text-ink/60">{event.blurb}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Closing CTA */}
      <section className="border-b border-ink bg-ink text-paper">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 px-4 py-10 md:px-8 md:py-12">
          <AnimatedWords as="p" className="display max-w-2xl text-3xl md:text-5xl">
            Can't make it to Portland?
          </AnimatedWords>
          <Link
            to="/#subscriptions"
            className="group flex shrink-0 items-center gap-2 bg-ember px-6 py-4 text-[11px] font-bold uppercase tracking-[0.16em] text-paper hover:bg-paper hover:text-ink transition-colors"
          >
            We ship on Tuesdays
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
