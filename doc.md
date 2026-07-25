## এই Document কীভাবে use করবা

এই সপ্তাহে আমরা একটাই ছোট project — **"MiniShop"** — ধাপে ধাপে বানাবো, আর সেটার উপরেই সব টেস্টিং concept শিখবো। প্রতিদিন নতুন file বানাবা, exact code copy-paste করবা, terminal-এ command চালাবা, আর কী output আসার কথা সেটাও দেখানো আছে — যদি তোমার output না মিলে, বুঝবা কোথাও ভুল হয়েছে।

প্রতিটা code line-এর পাশে বা নিচে ব্যাখ্যা আছে — কোনো line skip করবা না, প্রতিটা বোঝার চেষ্টা করো।

---

## 📅 DAY 1 — Setup + কেন Testing দরকার

### Hour 1: কেন Testing দরকার (গল্প দিয়ে বুঝি)

ধরো, তুমি FashionHub Pro-তে একটা `calculateDiscount` function লিখলে। ৩ মাস পরে তুমি ভুলে গেছো এটা exactly কীভাবে কাজ করে। এখন একজন নতুন developer এসে এই function-টা "optimize" করতে গিয়ে একটা edge case ভেঙে ফেললো — 100% discount দিলে negative price চলে আসছে। এটা production-এ চলে গেলো, customer ফ্রি-তে product পেয়ে গেলো, business loss হলো।

যদি একটা **test file** থাকতো যেটা বলে দিতো "100% discount দিলে price 0 হওয়া উচিত, negative না" — তাহলে ওই developer code push করার আগেই terminal-এ red error দেখতো, আর bug production-এ যেতোই না।

**এইটাই testing-এর কাজ: ভুল হওয়ার আগেই ধরিয়ে দেওয়া।**

### Testing এর 3 ধরন (বিস্তারিত)

**1. Unit Test** — সবচেয়ে ছোট একক (একটা function, একটা component) আলাদাভাবে test করা। বাকি সিস্টেম থেকে বিচ্ছিন্ন করে।

- Example: `calculateDiscount(100, 20)` কি ঠিক ৮০ return করছে?

**2. Integration Test** — কয়েকটা অংশ একসাথে মিলে ঠিকমতো কাজ করছে কিনা।

- Example: Form-এ email type করে Submit বাটনে click করলে, সঠিক data দিয়ে একটা function call হচ্ছে কিনা।

**3. E2E (End-to-End) Test** — পুরো user journey, real browser-এ, backend সহ।

- Example: Login → Product দেখা → Cart-এ add → Checkout — পুরো flow।

আমরা এই সপ্তাহে **Unit + Integration** টেস্ট শিখবো, কারণ এগুলোই দৈনন্দিন কাজে সবচেয়ে বেশি লাগে।

### Hour 2: Project Setup (Step by Step)

**Step 1 — Terminal খুলে তোমার project folder-এ যাও**

```bash
cd তোমার-project-folder
```

**Step 2 — প্রয়োজনীয় package install করো**

```bash
npm install --save-dev jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

এখানে প্রতিটা package কী কাজ করে:

- `jest` → মূল testing framework, test চালায় আর result দেখায়
- `jest-environment-jsdom` → browser-এর মতো একটা fake environment তৈরি করে (document, window ইত্যাদি simulate করে), কারণ Node.js-এ আসলে browser নেই
- `@testing-library/react` → React component render করার আর খুঁজে বের করার tool
- `@testing-library/jest-dom` → `toBeInTheDocument()`এর মতো extra matcher যোগ করে
- `@testing-library/user-event` → click, type-এর মতো real user action simulate করে

Install শেষে terminal-এ এমন কিছু দেখবা:

```
added 150 packages in 12s
```

**Step 3 — Root folder-এ `jest.config.js` file বানাও, exactly এই content দিয়ে:**

```jsx
const nextJest = require('next/jest')

// nextJest() function-টা Next.js-এর নিজস্ব babel/swc config জেনে জেনে
// jest-কে সেভাবে configure করে দেয়, আলাদা করে babel setup লাগে না
const createJestConfig = nextJest({
  dir: './',
})

// আমাদের custom config, এইটা nextJest-এর সাথে merge হবে
const customJestConfig = {
  // প্রতিটা test file চালানোর আগে এই file-টা load হবে
  setupFilesAfterEach: ['<rootDir>/jest.setup.js'],

  // browser-এর মতো environment simulate করার জন্য
  testEnvironment: 'jest-environment-jsdom',

  // যদি tsconfig.json-এ "@/*" এর মতো path alias থাকে, সেটা এখানেও বলে দিতে হয়
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
}

// createJestConfig একটা async function return করে যেটা Next.js internally দরকারি config load করে
module.exports = createJestConfig(customJestConfig)
```

**Step 4 — `jest.setup.js` বানাও (root folder-এ):**

```jsx
// এই import-টা toBeInTheDocument(), toHaveTextContent() এর মতো
// extra matcher-গুলো Jest-এ যোগ করে দেয়
import '@testing-library/jest-dom'
```

**Step 5 — `package.json` খুলে `"scripts"` অংশে এই দুটো line যোগ করো:**

```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch"
  }
}
```

ব্যাখ্যা: `npm test` চালালে সব test একবার চলবে। `npm run test:watch` চালালে Jest running থাকবে আর তুমি file save করলেই automatically re-run হবে — daily practice-এর জন্য এইটাই বেশি use করবা।

**Step 6 — Folder বানাও project-এর মধ্যে:**

```bash
mkdir -p src/minishop
```

এই folder-এই আজকে থেকে আমরা MiniShop project-এর সব file রাখবো।

**Step 7 — Setup verify করো**

`src/minishop/sample.test.js` নামে একটা file বানাও:

```jsx
// এইটা শুধু setup ঠিক আছে কিনা check করার জন্য একটা dummy test
test('setup ঠিকমতো কাজ করছে', () => {
  expect(1 + 1).toBe(2)
})
```

এখন terminal-এ চালাও:

```bash
npm test
```

**Expected output:**

```
PASS  src/minishop/sample.test.js
  ✓ setup ঠিকমতো কাজ করছে (2 ms)

Tests:       1 passed, 1 total
```

যদি এইরকম green ✓ দেখো, তাহলে setup সম্পূর্ণ। যদি error আসে:

- `Cannot find module 'next/jest'` → তুমি Next.js project-এ নেই, চেক করো তুমি ঠিক folder-এ আছো কিনা
- `SyntaxError` → `jest.config.js` file-এ কোনো bracket/comma মিস হয়েছে, আবার copy করো

**আজকের কাজ শেষে checklist:**

- [ ]  সব package install হয়েছে
- [ ]  `jest.config.js`, `jest.setup.js` বানানো হয়েছে
- [ ]  `npm test` চালিয়ে green pass দেখেছি

---

## 📅 DAY 2 — Jest Basics: MiniShop-এর প্রথম Function

আজকে আমরা MiniShop-এর discount calculate করার logic লিখবো আর test করবো।

### Hour 1: Function লেখা (Line by Line)

`src/minishop/discount.js` বানাও:

```jsx
// এই function টা price আর discount percent নিয়ে final price বের করে
export function calculateDiscount(price, percent) {
  // Step 1: invalid input check করছি
  // percent যদি 0 এর কম বা 100 এর বেশি হয়, সেটা অবৈধ
  if (percent < 0 || percent > 100) {
    throw new Error('Invalid percent')
  }

  // Step 2: negative price ঢুকিয়ে দিলেও যেন ভুল না হয়
  if (price < 0) {
    throw new Error('Invalid price')
  }

  // Step 3: discount amount বের করছি
  // যেমন price=100, percent=20 হলে discountAmount = (100 * 20) / 100 = 20
  const discountAmount = (price * percent) / 100

  // Step 4: final price return করছি
  // 100 - 20 = 80
  return price - discountAmount
}
```

**প্রতিটা line কী করছে তার সারাংশ:**

- `export function calculateDiscount(price, percent) {` → এই function-টা অন্য file থেকে import করা যাবে এইজন্য `export` লেখা হয়েছে
- `if (percent < 0 || percent > 100)` → boolean condition, দুইটার যেকোনো একটা true হলেই ভেতরে ঢুকবে
- `throw new Error('...')` → function-এর execution এখানেই থেমে যাবে, একটা Error object তৈরি হয়ে "ছুড়ে" দেওয়া হবে, যেটা `try/catch` বা test-এর `toThrow()` দিয়ে ধরা যায়
- `const discountAmount = ...` → `const` মানে এই variable-এর value পরে পরিবর্তন হবে না
- `return price - discountAmount` → function থেকে final answer বের হয়ে যাচ্ছে

### Hour 2: Test লেখা (Line by Line)

`src/minishop/discount.test.js` বানাও:

```jsx
// discount.js থেকে আমাদের function-টা import করছি
import { calculateDiscount } from './discount'

// describe() শুধু organization-এর জন্য — একটা label দিয়ে related test group করে
describe('calculateDiscount', () => {

  // ১ম test: normal, সাধারণ case
  test('২০% discount সঠিকভাবে calculate করে', () => {
    // এখানে actual function call করছি, আর তার result-কে expect() এর ভেতর দিচ্ছি
    const result = calculateDiscount(100, 20)

    // toBe() দিয়ে exact value মিলাচ্ছি — আমরা আশা করছি result ঠিক 80 হবে
    expect(result).toBe(80)
  })

  // ২য় test: edge case — 0% discount
  test('0% discount দিলে price একই থাকে', () => {
    expect(calculateDiscount(100, 0)).toBe(100)
  })

  // ৩য় test: edge case — 100% discount (পুরো ফ্রি)
  test('100% discount দিলে price 0 হয়', () => {
    expect(calculateDiscount(100, 100)).toBe(0)
  })

  // ৪র্থ test: invalid input case — percent 100 এর বেশি
  test('percent 100 এর বেশি হলে error throw করে', () => {
    // ফাংশন-টাকে সরাসরি call না করে একটা arrow function-এর ভেতরে দিতে হয়,
    // কারণ toThrow() নিজে function-টা call করে দেখতে চায় যে সত্যিই error আসে কিনা
    expect(() => calculateDiscount(100, 150)).toThrow('Invalid percent')
  })

  // ৫ম test: invalid input case — negative price
  test('negative price দিলে error throw করে', () => {
    expect(() => calculateDiscount(-50, 20)).toThrow('Invalid price')
  })
})
```

এখন চালাও:

```bash
npm test
```

**Expected output:**

```
PASS  src/minishop/discount.test.js
  calculateDiscount
    ✓ ২০% discount সঠিকভাবে calculate করে
    ✓ 0% discount দিলে price একই থাকে
    ✓ 100% discount দিলে price 0 হয়
    ✓ percent 100 এর বেশি হলে error throw করে
    ✓ negative price দিলে error throw করে

Tests:       5 passed, 5 total
```

### সব গুরুত্বপূর্ণ Matcher (একটা করে example সহ)

```jsx
expect(5).toBe(5)                          // primitive exact match
expect({ a: 1 }).toEqual({ a: 1 })         // object/array deep compare (toBe দিলে fail করবে!)
expect([1, 2, 3]).toContain(2)             // array-তে item আছে কিনা
expect('').toBeFalsy()                     // empty string, 0, null, undefined — সব falsy
expect('hello').toBeTruthy()               // non-empty মানেই truthy
expect(null).toBeNull()
expect(undefined).toBeUndefined()
expect([1, 2]).toHaveLength(2)
expect(() => { throw new Error('x') }).toThrow()
```

**গুরুত্বপূর্ণ ভুল যেটা সবাই করে:** Object compare করার সময় `toBe()` use করলে fail হবে, কারণ `toBe()` reference (memory address) compare করে, value না। Object/Array-এর জন্য সবসময় `toEqual()` use করবা।

### আজকের কাজ

MiniShop-এ আরেকটা function বানাও — `calculateCartTotal(items)`, যেটা `[{price: 100, qty: 2}, {price: 50, qty: 1}]` এর মতো array নিয়ে মোট total বের করবে। তারপর নিজে ৩-৪টা test case লিখো (empty cart, একটা item, একাধিক item)।

---

## 📅 DAY 3 — React Component Test শুরু

### Hour 1: Philosophy + প্রথম Component

React Testing Library-এর মূল কথা: **implementation না, behavior test করো।** মানে "state variable কী আছে" সেটা না দেখে "screen-এ user কী দেখছে" সেটা check করো।
z
`src/minishop/ProductCard.tsx` বানাও:

```tsx
// এই component একটা product-এর নাম আর price দেখায়
type ProductCardProps = {
  name: string
  price: number
}

export function ProductCard({ name, price }: ProductCardProps) {
  return (
    <div>
      {/* product-এর নাম heading হিসেবে দেখাচ্ছি */}
      <h2>{name}</h2>

      {/* price-কে "৳" symbol সহ দেখাচ্ছি */}
      <p>৳{price}</p>
    </div>
  )
}
```

**Line by line:**

- `type ProductCardProps = { name: string; price: number }` → TypeScript-এ বলে দিচ্ছি এই component কী কী props নেয় আর তাদের type কী
- `export function ProductCard({ name, price }: ProductCardProps)` → props-কে destructure করে সরাসরি `name`, `price` variable হিসেবে নিচ্ছি
- `<h2>{name}</h2>` → JSX-এর ভেতর `{}` দিয়ে JavaScript variable inject করা হয়

### Hour 2: Test লেখা

`src/minishop/ProductCard.test.tsx` বানাও:

```tsx
// render আর screen — দুটোই testing library থেকে
import { render, screen } from '@testing-library/react'
import { ProductCard } from './ProductCard'

test('product name আর price ঠিকমতো দেখায়', () => {
  // render() component-টাকে একটা virtual DOM-এ বসিয়ে দেয়,
  // ঠিক যেভাবে browser-এ আসল page render হয়
  render(<ProductCard name="T-Shirt" price={499} />)

  // screen.getByText() পুরো rendered output-এর ভেতর থেকে
  // matching text খুঁজে বের করে। না পেলে test সাথে সাথে fail করবে (error throw করবে)
  const nameElement = screen.getByText('T-Shirt')
  const priceElement = screen.getByText('৳499')

  // toBeInTheDocument() — এই matcher confirm করে যে element সত্যিই DOM-এ আছে
  expect(nameElement).toBeInTheDocument()
  expect(priceElement).toBeInTheDocument()
})
```

### Query Method-এর পূর্ণাঙ্গ ব্যাখ্যা

```tsx
// 1. getByRole — সবচেয়ে বেশি recommended, accessibility-friendly
screen.getByRole('button', { name: 'Add to Cart' })
// এটা খুঁজবে এমন একটা element যেটার role="button" (বা <button> tag)
// আর accessible name "Add to Cart"

// 2. getByText — visible text দিয়ে
screen.getByText('T-Shirt')

// 3. getByLabelText — form input-এর জন্য, label-এর সাথে associate করা input খুঁজে
screen.getByLabelText('Email Address')

// 4. getByTestId — যখন role/text দিয়ে সম্ভব না, শেষ upay
// component-এ data-testid="cart-icon" যোগ করে তারপর:
screen.getByTestId('cart-icon')

// 5. queryByText — getByText-এর মতোই, কিন্তু না পেলে error না দিয়ে null return করে
// element "না থাকা" verify করতে use হয়:
expect(screen.queryByText('Out of Stock')).not.toBeInTheDocument()

// 6. findByText — Promise return করে, async ভাবে element appear হওয়ার জন্য wait করে
const el = await screen.findByText('Loaded!')
```

**কোনটা কখন:** সবসময় প্রথমে `getByRole` try করো (এটা সবচেয়ে realistic, কারণ screen reader user-ও এভাবেই খুঁজে)। না পারলে `getByText`, `getByLabelText`। `getByTestId` একদম শেষ option।

### আজকের কাজ

`ProductCard`-এ একটা "Out of Stock" badge conditionally দেখাও (একটা `inStock` prop দিয়ে)। তারপর দুইটা test লেখো:

1. `inStock={true}` দিলে badge **না** দেখানো (`queryByText` + `not.toBeInTheDocument()`)
2. `inStock={false}` দিলে badge দেখানো (`getByText` + `toBeInTheDocument()`)

---

## 📅 DAY 4 — User Interaction (Click, Type)

### Hour 1: Click Event

`src/minishop/AddToCartButton.tsx`:

```tsx
import { useState } from 'react'

export function AddToCartButton() {
  // count state দিয়ে কতবার click হলো ট্র্যাক করছি
  const [count, setCount] = useState(0)

  return (
    <button onClick={() => setCount(count + 1)}>
      {count === 0 ? 'Add to Cart' : `Added (${count})`}
    </button>
  )
}
```

`src/minishop/AddToCartButton.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AddToCartButton } from './AddToCartButton'

test('click করলে button text আপডেট হয়', async () => {
  // userEvent.setup() একটা "user" object তৈরি করে যেটা দিয়ে
  // real user-এর মতো interaction simulate করবো
  const user = userEvent.setup()

  render(<AddToCartButton />)

  // প্রথমে button "Add to Cart" text নিয়ে খুঁজে বের করছি
  const button = screen.getByRole('button', { name: 'Add to Cart' })

  // click simulate করছি — এটা async, তাই await লাগবে
  await user.click(button)

  // click করার পর button-এর নতুন text "Added (1)" হওয়ার কথা
  expect(screen.getByRole('button', { name: 'Added (1)' })).toBeInTheDocument()

  // আরেকবার click করে দেখি
  await user.click(screen.getByRole('button', { name: 'Added (1)' }))
  expect(screen.getByRole('button', { name: 'Added (2)' })).toBeInTheDocument()
})
```

**কেন `await` লাগে:** `user.click()` internally browser-এর মতো event dispatch করে, যেটা asynchronous। `await` না দিলে test click শেষ হওয়ার আগেই assertion চেক করে ফেলবে, ফলে fail করবে বা flaky (মাঝে মাঝে pass, মাঝে মাঝে fail) হবে।

### Hour 2: Form + Submit (পুরো নতুন Component)

`src/minishop/NewsletterForm.tsx`:

```tsx
import { useState } from 'react'

type Props = {
  onSubscribe: (email: string) => void
}

export function NewsletterForm({ onSubscribe }: Props) {
  const [email, setEmail] = useState('')

  function handleSubmit(e: React.FormEvent) {
    // default behavior (page reload) বন্ধ করছি
    e.preventDefault()
    onSubscribe(email)
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email</label>
      <input
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit">Subscribe</button>
    </form>
  )
}
```

`src/minishop/NewsletterForm.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { NewsletterForm } from './NewsletterForm'

test('email দিয়ে submit করলে onSubscribe সঠিক value নিয়ে call হয়', async () => {
  const user = userEvent.setup()

  // jest.fn() একটা fake function বানায়, যেটা call হলে
  // Jest নিজে track করে রাখে — কতবার call হলো, কী argument দিয়ে
  const mockOnSubscribe = jest.fn()

  render(<NewsletterForm onSubscribe={mockOnSubscribe} />)

  // label দিয়ে input খুঁজছি
  const input = screen.getByLabelText('Email')

  // user.type() প্রতিটা character আলাদাভাবে type করে, ঠিক real user-এর মতো
  await user.type(input, 'ruhul@example.com')

  // এখন input-এর value ঠিক আছে কিনা check করছি (bonus assertion)
  expect(input).toHaveValue('ruhul@example.com')

  // submit button click করছি
  await user.click(screen.getByRole('button', { name: 'Subscribe' }))

  // check করছি mockOnSubscribe ঠিক ১ বার, সঠিক email দিয়ে call হয়েছে
  expect(mockOnSubscribe).toHaveBeenCalledTimes(1)
  expect(mockOnSubscribe).toHaveBeenCalledWith('ruhul@example.com')
})
```

### আজকের কাজ

`NewsletterForm`-এ একটা validation যোগ করো: email খালি থাকলে submit করলে একটা `<p>Email is required</p>` দেখাও (state দিয়ে)। তারপর test লেখো যে খালি অবস্থায় submit করলে ওই message দেখা যায়, আর `mockOnSubscribe` call **হয় না**।

---

## 📅 DAY 5 — Mocking (API Call Fake করা)

### Hour 1: কেন এবং কীভাবে

Real API call test-এর ভেতর করলে সমস্যা:

- Internet না থাকলে test fail
- Backend data বদলালে test unpredictable হয়ে যায়
- Test slow হয়ে যায় (প্রতিটা test-এ network wait)

তাই আমরা `fetch`-কে "মিথ্যা" বানিয়ে দিই — যেটা আমরা চাই সেটাই return করবে।

`src/minishop/ProductInfo.tsx`:

```tsx
import { useEffect, useState } from 'react'

export function ProductInfo() {
  const [name, setName] = useState<string | null>(null)

  useEffect(() => {
    // component mount হওয়ার সাথে সাথে API call হচ্ছে
    fetch('/api/product/1')
      .then((res) => res.json())
      .then((data) => setName(data.name))
  }, [])

  return <div>{name ? `Product: ${name}` : 'Loading...'}</div>
}
```

### Hour 2: Mock লেখা (Line by Line)

`src/minishop/ProductInfo.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import { ProductInfo } from './ProductInfo'

test('API থেকে product name fetch করে দেখায়', async () => {
  // global.fetch-কে আমরা নিজেদের বানানো একটা fake function দিয়ে replace করছি
  // as jest.Mock দিয়ে TypeScript-কে বলছি এইটা একটা mock function
  global.fetch = jest.fn(() =>
    // real fetch একটা Response object-এর মতো কিছু return করে, যার .json() method আছে
    // আমরা সেটাই নকল করছি
    Promise.resolve({
      json: () => Promise.resolve({ name: 'T-Shirt' }),
    })
  ) as jest.Mock

  render(<ProductInfo />)

  // component render হওয়ার সাথে সাথেই "Loading..." দেখানোর কথা,
  // কারণ fetch তখনও resolve হয়নি
  expect(screen.getByText('Loading...')).toBeInTheDocument()

  // findByText async — এটা automatically কয়েকবার try করে
  // যতক্ষণ না element পাওয়া যায় (max ~1 সেকেন্ড ডিফল্ট)
  const productText = await screen.findByText('Product: T-Shirt')
  expect(productText).toBeInTheDocument()
})

test('API fail করলে graceful ভাবে handle করে (bonus practice)', async () => {
  // এখানে ইচ্ছাকৃত ভাবে reject করা Promise দিচ্ছি, error simulate করার জন্য
  global.fetch = jest.fn(() => Promise.reject('Network Error')) as jest.Mock

  render(<ProductInfo />)

  // এই test আপাতত "Loading..." স্থায়ী থাকবে দেখাবে,
  // কারণ আমাদের component-এ এখনো error handling নেই — এটাই bug ধরার একটা example
  expect(screen.getByText('Loading...')).toBeInTheDocument()
})
```

**গুরুত্বপূর্ণ শিক্ষা:** দ্বিতীয় test-টা আসলে আমাদের দেখাচ্ছে যে `ProductInfo` component-এ error handling নেই। এটাই real-life-এ testing-এর power — এটা নতুন bug খুঁজে বের করে দেয়।

### আজকের কাজ

`ProductInfo`-তে `.catch()` যোগ করে একটা error state বানাও যেটা "Failed to load product" দেখাবে। তারপর উপরের দ্বিতীয় test-টা update করো যাতে সেটা `findByText('Failed to load product')` check করে।

---

## 📅 DAY 6 — Async States + Custom Hook

### Hour 1: Loading/Error State (পূর্ণাঙ্গ)

`src/minishop/ProductList.tsx`:

```tsx
import { useEffect, useState } from 'react'

export function ProductList() {
  const [products, setProducts] = useState<string[] | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then(setProducts)
      .catch(() => setError('Failed to load'))
  }, [])

  // early return pattern — error থাকলে সেটাই দেখাও, বাকি কিছু render করার দরকার নেই
  if (error) return <p>{error}</p>

  // products এখনো null মানে এখনো fetch শেষ হয়নি
  if (!products) return <p>Loading...</p>

  return (
    <ul>
      {products.map((p) => (
        <li key={p}>{p}</li>
      ))}
    </ul>
  )
}
```

`src/minishop/ProductList.test.tsx`:

```tsx
import { render, screen, waitFor } from '@testing-library/react'
import { ProductList } from './ProductList'

test('products সফলভাবে load হলে list দেখায়', async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(['T-Shirt', 'Jeans']),
    })
  ) as jest.Mock

  render(<ProductList />)

  // waitFor() ভেতরের assertion-টাকে বারবার try করতে থাকে
  // যতক্ষণ না সেটা true হয় অথবা timeout হয় (default 1 সেকেন্ড)
  await waitFor(() => {
    expect(screen.getByText('T-Shirt')).toBeInTheDocument()
  })

  // এতক্ষণে দুটোই load হয়ে গেছে ধরে নিচ্ছি
  expect(screen.getByText('Jeans')).toBeInTheDocument()
})

test('fetch fail করলে error message দেখায়', async () => {
  global.fetch = jest.fn(() => Promise.reject('down')) as jest.Mock

  render(<ProductList />)

  await waitFor(() => {
    expect(screen.getByText('Failed to load')).toBeInTheDocument()
  })
})
```

**`waitFor` বনাম `findBy` — পার্থক্য:** `findByText(...)` আসলে `waitFor(() => getByText(...))`-এরই একটা shortcut, শুধু একটা element খোঁজার জন্য। যখন একসাথে একাধিক জিনিস check করতে হয়, বা `getBy` ছাড়া অন্য কোনো assertion (যেমন `toHaveLength`) করতে হয়, তখন `waitFor` ব্যবহার করো।

### Hour 2: Custom Hook Test

`src/minishop/useCart.ts`:

```tsx
import { useState } from 'react'

// এই hook টা cart-এর item সংখ্যা আর add করার function দেয়
export function useCart() {
  const [itemCount, setItemCount] = useState(0)

  function addItem() {
    // functional update ব্যবহার করছি — এটা safe practice,
    // কারণ এটা সবসময় latest state value থেকে হিসাব করে
    setItemCount((prev) => prev + 1)
  }

  function reset() {
    setItemCount(0)
  }

  // hook থেকে object আকারে সব export করছি
  return { itemCount, addItem, reset }
}
```

`src/minishop/useCart.test.ts`:

```tsx
// renderHook — component ছাড়াই একটা hook কে "test-environment"-এ চালানোর tool
// act — state update-এর effect পুরোপুরি শেষ হওয়া নিশ্চিত করে
import { renderHook, act } from '@testing-library/react'
import { useCart } from './useCart'

test('addItem call করলে itemCount বাড়ে', () => {
  // renderHook আমাদের hook-টাকে চালিয়ে result.current-এ তার return value রাখে
  const { result } = renderHook(() => useCart())

  // শুরুতে itemCount 0 হওয়ার কথা
  expect(result.current.itemCount).toBe(0)

  // act() এর ভেতরে state update করা functions call করতে হয়,
  // যাতে React সব pending update process করে ফেলে assertion চেক করার আগেই
  act(() => {
    result.current.addItem()
  })

  expect(result.current.itemCount).toBe(1)

  act(() => {
    result.current.addItem()
    result.current.addItem()
  })

  expect(result.current.itemCount).toBe(3)
})

test('reset call করলে itemCount 0 হয়ে যায়', () => {
  const { result } = renderHook(() => useCart())

  act(() => {
    result.current.addItem()
    result.current.addItem()
  })
  expect(result.current.itemCount).toBe(2)

  act(() => {
    result.current.reset()
  })
  expect(result.current.itemCount).toBe(0)
})
```

### আজকের কাজ

`useCart`-এ একটা `removeItem` function যোগ করো, যেটা itemCount 0 এর নিচে যেতে দেবে না (0-তে থামবে)। তারপর test লেখো: 0 অবস্থায় `removeItem` call করলে এখনো 0 থাকে।

---

## 📅 DAY 7 — সব একসাথে: MiniShop Login Feature

আজকে সব শেখা জিনিস একসাথে use করে একটা complete `LoginForm` বানাবো আর test করবো।

### Component

`src/minishop/LoginForm.tsx`:

```tsx
import { useState } from 'react'

type Props = {
  onLogin: (email: string, password: string) => Promise<void>
}

export function LoginForm({ onLogin }: Props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [validationError, setValidationError] = useState('')
  const [apiError, setApiError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setValidationError('')
    setApiError('')

    // ক্লায়েন্ট-সাইড validation
    if (!email) {
      setValidationError('Email is required')
      return
    }

    // API call, error হলে ধরার জন্য try/catch
    try {
      await onLogin(email, password)
    } catch {
      setApiError('Invalid credentials')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email</label>
      <input id="email" value={email} onChange={(e) => setEmail(e.target.value)} />

      <label htmlFor="password">Password</label>
      <input
        id="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {validationError && <p>{validationError}</p>}
      {apiError && <p>{apiError}</p>}

      <button type="submit">Login</button>
    </form>
  )
}
```

### Full Test Suite (Line by Line)

`src/minishop/LoginForm.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { LoginForm } from './LoginForm'

describe('LoginForm', () => {

  test('email খালি রেখে submit করলে validation error দেখায়', async () => {
    const user = userEvent.setup()
    // onLogin কখনো call হওয়ার কথা না এই case-এ, তাই simple mock দিলেই হবে
    render(<LoginForm onLogin={jest.fn()} />)

    // password ঠিক দিয়ে দিচ্ছি যাতে শুধু email-এর কারণেই fail করে সেটা নিশ্চিত হয়
    await user.type(screen.getByLabelText('Password'), 'somepassword')
    await user.click(screen.getByRole('button', { name: 'Login' }))

    // validation client-side, তাই async wait ছাড়াই সাথে সাথে দেখা যাওয়ার কথা
    expect(screen.getByText('Email is required')).toBeInTheDocument()
  })

  test('সঠিক credential দিলে onLogin সঠিক argument দিয়ে call হয়', async () => {
    const user = userEvent.setup()
    // এইবার onLogin সফল হবে বলে ধরে নিচ্ছি — resolve করা Promise
    const mockLogin = jest.fn(() => Promise.resolve())

    render(<LoginForm onLogin={mockLogin} />)

    await user.type(screen.getByLabelText('Email'), 'ruhul@example.com')
    await user.type(screen.getByLabelText('Password'), 'password123')
    await user.click(screen.getByRole('button', { name: 'Login' }))

    // onLogin async, তাই findBy ব্যবহার করে ঘুরপথে wait করছি —
    // যদিও এখানে সরাসরি output নেই, তবু state update settle হওয়া পর্যন্ত এভাবে wait করা নিরাপদ
    await screen.findByRole('button', { name: 'Login' })

    expect(mockLogin).toHaveBeenCalledWith('ruhul@example.com', 'password123')
  })

  test('API reject করলে "Invalid credentials" দেখায়', async () => {
    const user = userEvent.setup()
    // এইবার onLogin fail করবে — reject করা Promise
    const mockLogin = jest.fn(() => Promise.reject())

    render(<LoginForm onLogin={mockLogin} />)

    await user.type(screen.getByLabelText('Email'), 'wrong@example.com')
    await user.type(screen.getByLabelText('Password'), 'wrongpass')
    await user.click(screen.getByRole('button', { name: 'Login' }))

    // এইটা async ভাবে আসবে (await onLogin fail হওয়ার পরে state update হয়),
    // তাই findByText ব্যবহার করছি
    const errorMsg = await screen.findByText('Invalid credentials')
    expect(errorMsg).toBeInTheDocument()
  })
})
```

চালাও:

```bash
npm test
```

**Expected output:**

```
PASS  src/minishop/LoginForm.test.tsx
  LoginForm
    ✓ email খালি রেখে submit করলে validation error দেখায়
    ✓ সঠিক credential দিলে onLogin সঠিক argument দিয়ে call হয়
    ✓ API reject করলে "Invalid credentials" দেখায়

Tests:       3 passed, 3 total
```

### Coverage দেখা (Bonus)

কতটুকু code test করা হয়েছে সেটা দেখতে:

```bash
npx jest --coverage
```

এটা একটা table দেখাবে — কোন file-এর কত % line/branch test হয়েছে। ১০০% coverage জরুরি না, কিন্তু গুরুত্বপূর্ণ logic (validation, calculation) যেন test হয়ে থাকে সেটা নিশ্চিত করো।

### সপ্তাহ শেষের Self-Review

- [ ]  MiniShop-এর প্রতিটা component-এর জন্য নিজে থেকে test file বানাতে পারছি?
- [ ]  `getByRole`, `getByText`, `getByLabelText` পার্থক্য explain করতে পারবো?
- [ ]  কেন `await user.click()` লাগে বলতে পারবো?
- [ ]  `jest.fn()` কী করে, নিজের ভাষায় বলতে পারবো?
- [ ]  `waitFor` আর `findBy` কখন কোনটা use করবো জানি?
- [ ]  এখন FashionHub Pro-র একটা real component নিয়ে independently test লিখতে পারবো?

---

## 🆘 Common Errors & Fix

| Error | কারণ | সমাধান |
| --- | --- | --- |
| `Unable to find an element with the text: ...` | Text ঠিক match করছে না (extra space, case) | `screen.debug()` চালিয়ে actual rendered output দেখো |
| `TestingLibraryElementError: Found multiple elements` | একই text একাধিক জায়গায় আছে | `getAllByText(...)[0]` অথবা more specific query (role/testid) use করো |
| `act(...) warning` | State update `act()`-এর বাইরে হচ্ছে | Async হলে `await` ঠিকমতো দিচ্ছো কিনা check করো |
| `ReferenceError: fetch is not defined` | Node environment-এ fetch নেই | `global.fetch = jest.fn(...)` দিয়ে mock করছো কিনা check করো |
| Test timeout (`Exceeded timeout of 1000 ms`) | Mock resolve হচ্ছে না, বা infinite loop | Mock function ঠিকমতো `Promise.resolve()` দিচ্ছে কিনা দেখো |

---

**এই পুরো ৭ দিন copy-paste করে, নিজের terminal-এ চালিয়ে, প্রতিটা explanation পড়ে practice করলে তুমি independently test লিখতে পারবা।** কোনো জায়গায় আটকে গেলে বা error পেলে, exact error message আমাকে পাঠাও — একসাথে debug করবো।