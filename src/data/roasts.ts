import bagDawn from '../assets/bag-dawn.webp'
import bagEmber from '../assets/bag-ember.webp'
import bagChar from '../assets/bag-char.webp'

export interface Roast {
  slug: string
  name: string
  level: string
  dropTemp: string
  notes: string
  lots: string
  process: string
  weight: string
  price: string
  img: string
  alt: string
  story: string
  cup: string
  brew: { method: string; dose: string; water: string; time: string }
  stats: { label: string; value: string }[]
}

export const ROASTS: Roast[] = [
  {
    slug: 'dawn',
    name: 'Dawn',
    level: 'Light',
    dropTemp: '196°',
    notes: 'Bergamot / apricot / black tea',
    lots: 'Ethiopia + Kenya',
    process: 'Washed',
    weight: '250 g',
    price: '$19.00',
    img: bagDawn,
    alt: 'Dawn light roast in a kraft-paper bag',
    story:
      'Dawn is the roast we pull first on a Tuesday, while the drum is still climbing. Washed lots from the Ethiopian highlands and Kenyan plateaus, dropped at 196° — just past first crack, before the sugars darken. Everything the farm did stays in the cup.',
    cup: 'Bright and tea-like, with bergamot up front, ripe apricot through the middle, and a clean black-tea finish that stays sweet as it cools.',
    brew: { method: 'Pour over — V60', dose: '15 g', water: '250 g at 96°', time: '2:45–3:00' },
    stats: [
      { label: 'Drop temperature', value: '196°C' },
      { label: 'Roast time', value: '9:40' },
      { label: 'Development', value: '14%' },
      { label: 'Altitude', value: '1,900–2,200 m' },
      { label: 'Varietals', value: 'Heirloom, SL28' },
      { label: 'Best within', value: '5–21 days off roast' },
    ],
  },
  {
    slug: 'ember',
    name: 'Ember',
    level: 'Medium',
    dropTemp: '210°',
    notes: 'Panela / hazelnut / orange zest',
    lots: 'Colombia + Guatemala',
    process: 'Washed + honey',
    weight: '250 g',
    price: '$18.00',
    img: bagEmber,
    alt: 'Ember medium roast in a chestnut-brown bag',
    story:
      'The house roast and the namesake. Washed Colombian lots meet honey-processed Guatemalan beans, dropped at 210° — deep enough to caramelize, never enough to char. This is the bag most of our subscribers never leave.',
    cup: 'Round and comforting: raw panela sweetness, toasted hazelnut body, and a flick of orange zest on the finish. Works black, stands up to milk.',
    brew: { method: 'Flat bed — Kalita or batch', dose: '16 g', water: '250 g at 94°', time: '3:00–3:15' },
    stats: [
      { label: 'Drop temperature', value: '210°C' },
      { label: 'Roast time', value: '10:50' },
      { label: 'Development', value: '18%' },
      { label: 'Altitude', value: '1,500–1,900 m' },
      { label: 'Varietals', value: 'Caturra, Bourbon' },
      { label: 'Best within', value: '7–28 days off roast' },
    ],
  },
  {
    slug: 'char',
    name: 'Char',
    level: 'Dark',
    dropTemp: '224°',
    notes: 'Dark chocolate / molasses / smoke',
    lots: 'Guatemala + Colombia',
    process: 'Natural',
    weight: '250 g',
    price: '$18.00',
    img: bagChar,
    alt: 'Char dark roast in a matte-black bag',
    story:
      'Char is dark on purpose, not by accident. Natural-process lots that can carry 224° without going hollow — fruit sugars roasted all the way into molasses. For espresso, moka pots, and people who want their coffee to taste like coffee.',
    cup: 'Heavy and unapologetic: 85% dark chocolate, blackstrap molasses, a wisp of campfire smoke. Cuts through milk like it owns it.',
    brew: { method: 'Espresso', dose: '18 g in', water: '38 g out', time: '26–30 s' },
    stats: [
      { label: 'Drop temperature', value: '224°C' },
      { label: 'Roast time', value: '12:10' },
      { label: 'Development', value: '24%' },
      { label: 'Altitude', value: '1,400–1,800 m' },
      { label: 'Varietals', value: 'Bourbon, Caturra' },
      { label: 'Best within', value: '10–35 days off roast' },
    ],
  },
]
