import AsteriskMark from '../components/AsteriskMark'
import AnimatedWords from '../components/AnimatedWords'
import Eyebrow from '../components/Eyebrow'
import Reveal from '../components/Reveal'
import voicesStamp from '../assets/voices-stamp.png'
import voicesCafe from '../assets/voices-cafe.png'

const VOICES = [
  {
    lede: 'I stopped buying grocery-store coffee the week my first bag arrived —',
    rest: 'the roast date stamped on it was two days before.',
    name: 'Maya R.',
    detail: 'Subscriber since 2021 — Dawn, weekly',
    align: 'left',
    img: voicesStamp,
    imgAlt: 'Roast date stamped on a kraft coffee bag',
    caption: 'The stamp in question',
    rulePos: 'left-[69%]',
  },
  {
    lede: 'We moved our café to Ember in 2022. Customers keep asking what changed.',
    rest: 'Nothing else did.',
    name: 'Tom B.',
    detail: 'Owner, Fieldnote Café — wholesale partner',
    align: 'right',
    img: voicesCafe,
    imgAlt: 'Espresso pouring at the Fieldnote Café counter',
    caption: 'Fieldnote Café, mid-pour',
    rulePos: 'left-[29%]',
  },
  {
    lede: 'The 48-hour thing sounds like marketing',
    rest: 'until you open the valve and the bag hisses at you.',
    name: 'Priya S.',
    detail: 'Subscriber since 2023 — Char, monthly',
    align: 'left',
    img: null,
    imgAlt: '',
    caption: '',
    rulePos: 'left-[69%]',
  },
]

export default function Voices() {
  return (
    <section id="voices" className="border-b border-ink">
      <div className="flex items-center justify-between border-b border-ink px-4 py-3 md:px-8">
        <Eyebrow index="05">Voices</Eyebrow>
        <span className="text-[10px] md:text-xs font-semibold uppercase tracking-[0.18em] text-ink/50">
          4.9 / 5 — 2,341 reviews, unedited
        </span>
      </div>

      <ul>
        {VOICES.map((voice, i) => {
          const right = voice.align === 'right'
          return (
            <li key={voice.name} className="border-b border-ink last:border-b-0">
              <div className="relative grid grid-cols-12 items-center gap-x-4 px-4 py-10 md:px-8 md:py-14">
                {/* Straight rule dividing quote from its visual */}
                <span
                  className={`pointer-events-none absolute inset-y-0 hidden w-px bg-ink/30 md:block ${voice.rulePos}`}
                  aria-hidden
                />

                <blockquote
                  className={`col-span-12 ${
                    right
                      ? 'md:col-start-5 md:col-span-8 text-left md:text-right'
                      : 'md:col-span-8'
                  }`}
                >
                  <AnimatedWords
                    as="p"
                    className="text-2xl sm:text-3xl md:text-[2.45vw] font-semibold leading-[1.18] tracking-[-0.02em]"
                  >
                    <span className="text-ink">“{voice.lede}</span>{' '}
                    <span className="text-ink/45">{`${voice.rest}”`}</span>
                  </AnimatedWords>
                  <Reveal delay={0.2}>
                    <footer
                      className={`mt-5 flex items-start gap-2 text-[10px] md:text-xs font-semibold uppercase tracking-[0.16em] text-ink/60 ${
                        right ? 'md:justify-end' : ''
                      }`}
                    >
                      <AsteriskMark className="mt-[2px] h-2.5 w-2.5 shrink-0 text-ember" />
                      <span className="shrink-0 whitespace-nowrap text-ink">{voice.name}</span>
                      <span className="text-ink/50">— {voice.detail}</span>
                      <span className="sr-only">, quote {i + 1} of {VOICES.length}</span>
                    </footer>
                  </Reveal>
                </blockquote>

                {voice.img ? (
                  <Reveal
                    delay={0.15}
                    className={`col-span-12 mt-8 md:mt-0 ${
                      right
                        ? 'md:col-span-3 md:col-start-1 md:row-start-1'
                        : 'md:col-span-3 md:col-start-10'
                    }`}
                  >
                    <figure>
                      <img
                        src={voice.img}
                        alt={voice.imgAlt}
                        className="aspect-[4/3] w-full border border-ink object-cover"
                      />
                      <figcaption className="mt-2.5 flex items-center gap-1.5 text-[9px] md:text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/45">
                        <AsteriskMark className="h-2 w-2 shrink-0 text-ember" />
                        {voice.caption}
                      </figcaption>
                    </figure>
                  </Reveal>
                ) : (
                  <Reveal
                    delay={0.15}
                    className={`col-span-12 mt-8 flex justify-start md:mt-0 md:justify-center ${
                      right
                        ? 'md:col-span-3 md:col-start-1 md:row-start-1'
                        : 'md:col-span-3 md:col-start-10'
                    }`}
                  >
                    <AsteriskMark className="h-20 w-20 md:h-28 md:w-28 text-ember" />
                  </Reveal>
                )}
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
