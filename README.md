# Jest for Beginners — MiniShop Project

এই repository-এ Jest ব্যবহার করে testing-এর basics practice করা হচ্ছে।


---

## Jest কী?

Jest হলো React/JavaScript projects-এ tests লিখে run করার জন্য সবচেয়ে জনপ্রিয় একটা tool।

এটা দিয়ে আমরা বলি:
- এই function ঠিক কাজ করছে কিনা
- এই component user কে সঠিকভাবে দেখাচ্ছে কিনা
- click/type submit করলে সঠিক behaviour হচ্ছে কিনা

সহজ ভাষায়, Jest হলো "আমার code ঠিক আছে কি না, সেটা check করার robot"।

---

## Jest কেন ব্যবহার করবো?

যখন code লিখে ফেলো, তখন অনেক সময় মনে হয় "সব ঠিকই আছে"। কিন্তু বাস্তবে ছোট ছোট ভুলও production-এ গিয়ে big problem তৈরি করতে পারে।

Jest ব্যবহার করলে:
- bug আগে থেকেই ধরা যায়
- code change করলে পুরনো feature ভেঙে যায় কিনা সেটা check করা যায়
- team-wise development-safe হয়
- confidence বাড়ে

---

## Jest-এর basic workflow

1. Test লিখো
2. Jest-এ run করো
3. Fail হলে fix করো
4. Pass হলে continue করো

একটা সাধারণ flow:

```js
test('1 + 1 = 2', () => {
  expect(1 + 1).toBe(2)
})
```

এখানে:
- `test()` => একটা testcase define করে
- `expect()` => আমরা কী আশা করছি সেটা বলি
- `toBe()` => expectation check করে

---

## Jest-এর কিছু important builtin ideas

### 1. `test()`
একটা test case তৈরি করে।

```js
test('hello world', () => {
  expect(true).toBe(true)
})
```

### 2. `describe()`
Related tests-group করতে ব্যবহার করা হয়।

```js
describe('calculator', () => {
  test('adds numbers', () => {
    expect(2 + 2).toBe(4)
  })
})
```

### 3. `expect()`
Assertion লিখতে ব্যবহার করা হয়।

```js
expect(5).toBe(5)
expect('hello').toContain('ell')
expect([1, 2, 3]).toHaveLength(3)
```

### 4. `jest.fn()`
একটা mock function তৈরি করে।

```js
const mockFn = jest.fn()
mockFn('hello')
expect(mockFn).toHaveBeenCalledWith('hello')
```

এটা ব্যবহার করে আমরা বলে দিতে পারি, function call হয়েছে কিনা, কতবার call হয়েছে, কোন argument দিয়ে call হয়েছে।

---

## React component test কীভাবে করে?

React-এ Testing Library ব্যবহার করে component render করে UI verify করা হয়।

```tsx
import { render, screen } from '@testing-library/react'

test('button text shows', () => {
  render(<button>Click me</button>)
  expect(screen.getByText('Click me')).toBeInTheDocument()
})
```

এখানে:
- `render()` => component render করে
- `screen.getByText()` => DOM-এ text খুঁজে
- `toBeInTheDocument()` => element actually render হয়েছে কিনা check করে

---

## Jest কীভাবে run করে?

Project root-এ run করতে হয়:

```bash
npm test
```

Watch mode-এ:

```bash
npm run test:watch
```

Coverage দেখতে:

```bash
npx jest --coverage
```

Coverage মানে কতটুকু code test করা হয়েছে, সেটা দেখায়।

---

## Under the hood — সহজভাবে

Jest-এর কাজ মূলত ৩টা জিনিসে ভাগ করা যায়:

### 1. Test discovery
Jest দেখে কোন files-এ test আছে।

### 2. Test execution
Test file-load করে, code run করে, expectations check করে।

### 3. Report generation
Pass/Fail result show করে।

### Behind the scenes
Jest internally নিচের কাজগুলো করে:
- code transform করে (JSX/TSX বুঝার জন্য)
- test environment তৈরি করে (browser-like environment)
- assertions check করে
- failures nicely report করে

এই repo-তে Babel + Jest config ব্যবহার করা হচ্ছে, তাই JS/JSX/TSX test run করা যাচ্ছে।

---

## Beginner-friendly mental model

Jest-এর কথা মনে রাখার সহজ rule:

- `test()` => "আমার কী verify করতে চাই"
- `expect()` => "আমার expectation কী"
- matcher => "এটা সত্যি কিনা"

Example:

```js
test('price should be 80', () => {
  expect(100 - 20).toBe(80)
})
```

এখানে বোঝা যাচ্ছে:
- আমি test লিখছি
- আমি আশা করছি 100 - 20 = 80
- Jest সেটা verify করছে

---

## এই repo-তে কী কী practice করা হচ্ছে?

এই repository-এ সাধারণত নিচের topics practice করা হয়:
- pure function testing
- React component testing
- click/type interaction testing
- form submit testing
- mock/fake function testing
- async testing

---

## Quick summary

Jest হলো:
- JavaScript/React code testing-এর জন্য একটি powerful tool
- ছোট ছোট test লিখে code-এর correctness নিশ্চিত করতে সাহায্য করে
- beginner-friendly syntax দেয়
- under the hood-এ test discovery, execution, reporting করে

যদি তুমি একদম novice হও, তাহলে মনে রাখো:

> Test লিখো, run করো, fail হলে fix করো, pass হলে continue করো.

---

## Next step

আরও deeply বুঝতে চাইলে [doc.md](doc.md) পড়ো।
এখানে step-by-step examples আছেঃ React component, form, async, mock, hook testing-এর মতো topics।
