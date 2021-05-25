# Animal Crossing Stalk Market Analyzer

Animal Crossing games feature a weekly "stalk market" with a simple premise: purchase turnips on Sunday, then figure out when to (hopefully) sell them for a profit before the following Sunday. This is a simple library to help predict when you should sell your turnips!

The logic contained within this library was inspired by this stalk market guide on Thonky: https://www.thonky.com/animal-crossing-new-leaf/stalk-market


## Intro to selling

Turnip sell prices update twice a day, once at store opening and another one at 12pm. Assuming the store is closed on Sundays, that gives **twelve opportunities** to record turnip pricing throughout the week:

```
      M  T  W  T  F  S
 6am  1  3  5  7  9  11
12pm  2  4  6  8  10 12
```

If turnips are not sold by 6am on the following Sunday, **they spoil and lose all value!**

## Figuring out when to sell

After recording a few sell prices, pass them into this library's `analyze()` method:

```js
import analyze from 'ac-stalk-market-analyzer';

const prices = [73, 72, 69, 80, 92, 112, 98, 95, 35, 32, 20, 17];
const pattern = analyze(prices);
```

The return value will be one of the following strings:

### "spikeBig"

A series of three increases, with the third increase being the maximum sell price. The following two decreases are higher than the average sell price, giving you an opportunity to realize a smaller return before the remaining price decreases rob you of an opportunity for profit.

### "spikeSmall"

This pattern is similar to `spikeBig`, but is a series of _four_ increases followed by only a single decrease higher than the average, before decreasing from there on.

### "decreasing"

Every sell price change is lower than the one before. If no increase occurs throughout the week, you should sell by Thursday afternoon.

### "random"

Pricing is unpredictable. Pricing will likely jump randomly between 50 and 200 bells.

### "unknown"

There's not enough pricing data to determine a pattern. This is common when some prices are not recorded. The library may still be able to detect a pattern even if you skip recording a couple of prices, though!
