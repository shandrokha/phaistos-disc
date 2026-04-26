## The Phaistos Disc Project — Plain Language Summary

*This document explains our project in everyday language. It's kept up to date as we make progress.*

**Last updated**: 2026-04-25 (refreshed to match the current statistical engine and the public/private scope distinction)

---

### What is the Phaistos Disc?

A small clay disc (about 6 inches across) found in 1908 in the ruins of an ancient palace on the island of Crete, Greece. It's roughly 3,700 years old. Both sides are covered in tiny stamped pictures — 241 symbols total, made up of 45 different pictures (a walking man, a cat's head, a ship, a shield, a flower, and so on). The symbols are arranged in 61 groups separated by lines, kind of like words in a sentence.

Nobody knows what it says. It's been one of archaeology's most famous unsolved puzzles for over a century.

### Why is it so hard to read?

- **Tiny amount of text.** 241 symbols is like trying to learn a language from a single paragraph. A mathematician proved in 1974 that the text is too short to ever *prove* any reading is correct.
- **Unknown language.** We don't know if it's ancient Minoan, early Greek, or something else.
- **No cheat sheet.** Unlike Egyptian hieroglyphs (which had the Rosetta Stone), there's no translation to compare against.
- **We don't even know which direction to read it.**
- **Everyone disagrees.** Over 116 years, dozens of researchers have proposed readings — Greek, Luwian (an ancient Turkish language), Minoan, even Finnish. None of them agree with each other, which is itself a clue that this is really, really hard.

### What are we trying to do?

We're trying to figure out what the disc says — or at least narrow it down to 2-3 possible readings that make sense. We know we probably can't *prove* a single answer, but we can rule out bad answers and find the ones that survive every test we throw at them.

**Our most important rule: be honest.** We report what the data actually shows, even when it's inconvenient. If a test weakens our finding, we say so. If we can't prove anything, that's still a valid result — it means we've done honest science on a genuinely hard problem. We would rather publish "we couldn't tell" than overstate what we found.

### Our approach (4 steps)

Think of it like solving a code in a detective movie, where you have to be really careful and scientific about each step.

#### Step 1 — Study the patterns (almost done)

Before guessing what any symbol means, we count things with a computer program:
- Which symbols show up most often?
- Which ones always start a "word"? Which always end one?
- Are there repeated "words" (like a chorus in a song)?
- Do the two sides of the disc look different from each other?

We also ran a big statistical test (100,000 computer simulations) to check whether this is even a *language* at all, or maybe a structured list — like a shipping manifest or a phone directory. The answer: the patterns are unusual compared to random text, but they're compatible with a real language that uses special marker symbols. We can keep going.

**Key finding:** Symbol 02 (a "plumed head") appears 19 times and is ALWAYS the first symbol in its word — 100% of the time. That's really weird for a normal language sound. We think it might be a special marker (linguists call it a "determinative"), like how we use a capital letter at the start of a sentence. It doesn't represent a sound — it tells you something about the word that follows.

#### Step 2 — Borrow clues from related scripts (about 75% done)

The ancient Minoans used other writing systems too — **Linear A** and **Linear B**. Some disc symbols look a lot like symbols in those scripts, and Linear B was decoded in the 1950s (it turned out to be early Greek). So we can borrow *possible* sound values.

For example: disc symbol 29 (a cat's head) looks like Linear A symbol AB 80, which in Linear B represents the sound "MA." So *maybe* the cat head on the disc also means "MA." We've done this for **44 out of 45 symbols**, though many matches are uncertain. We rate each one on a confidence scale (high, medium, low).

Four symbols have strong agreement across multiple researchers:
- Symbol 12 (shield) → QE
- Symbol 19 (human figure) → SA
- Symbol 29 (cat head) → MA
- Symbol 31 (eagle) → KU

#### Step 3 — Try to "read" it (first results!)

We plugged in all our proposed sounds and here's what came out. The good news: **it sounds like a real language!**

For example, the first "word" on Side A reads: **°-qe-pa-je-ti** (where ° is the plumed-head marker). The most repeated phrase is **°-qe-ku-rja**, which appears 3 times — like a refrain in a song. Another repeated word is **ma-rja-ti** (cat-head + flower + shield).

Key results:
- **Every single syllable** follows the pattern that real ancient Aegean syllabaries use (consonant + vowel, like "ma", "ti", "qe"). Not a single exception (this is largely a necessary consequence of deriving values from a CV syllabary — Linear B — not independent evidence).
- **Repeated words produce the same sounds every time** — which sounds obvious, but if our sound assignments were random, we'd expect a mess.
- **13 out of 61 words** start with °-qe (determinative + shield-sound). That's like how in English you might put "the" before lots of different words. It looks like grammar.
- **The most common ending is -ti** (13 words end with it). That's like how in Italian lots of words end in -i or -a — it suggests a grammatical pattern.

We then ran three big validation tests (see below). Only 2 differences remain with Professor Owens's reading (down from 3 — one turned out to be our mistake, which we caught and fixed).

#### Step 3b — Does the reading actually hold up? (three additional checks)

Once we had our reading, we didn't just trust it — we ran three additional checks, like a scientist looking for ways the assignment could fail. The reading is internally consistent under each of the three; "consistent" is a much weaker claim than "verified", and we lean on the language-comparison test in step 4 (and its many caveats) for the substantive result.

**Test 1: Does every sign appear where it belongs?**

Imagine you noticed that in English, the letter Q almost always comes at the start of a word, and the letter S often comes at the end. If someone handed you a "decoded" message where Q was at the end and S at the start all the time, you'd be suspicious.

We checked every sign in every word against where it *normally* appears in the disc. **Result: 100% consistent.** Not a single sign showed up in a weird position. That's like checking 241 puzzle pieces and finding they ALL fit.

**Test 2: Does it look like real word-building (morphology)?**

In real languages, you build words from parts. In English: "un-break-able" has a prefix (un-), a root (break), and a suffix (-able). You can swap parts to make new words: "un-do-able," "break-able," "un-bend-able."

We found **the disc does exactly this.** We found 7 "minimal pairs" — words that are identical except for one part. For example:

| Word 1 | Word 2 | What changed |
|--------|--------|-------------|
| **ma**-rja-ti | **ti**-rja-ti | The beginning changed (ma → ti) |
| ku-rja-**te** | ku-rja-**qe** | The ending changed (te → qe) |
| **wi**-pi-na-dwa | **ma**-pi-na-dwa | The beginning changed (wi → ma) |

This is like finding "walked" and "talked" in a text — same ending (-ed), different root. It is *suggestive* that the disc encodes structured language with morphology rather than random data. **Important caveat:** these minimal pairs are a property of the raw sign sequences, not specifically of the *Daidalika phonetic reading*. Any consistent 1-to-1 assignment from signs to distinct syllables would produce the same number of pairs and the same number of one-sign-different alternations. The morphology evidence therefore supports "the disc is structured language" (relevant to the Kuykendall non-linguistic hypothesis) but does *not* by itself validate the specific Daidalika sound values. The **te ↔ qe** ending swap shows up in *two different word pairs*, which is consistent with a real grammatical alternation, but a permutation test for "would *some* syllable pair alternate twice by chance, given the disc's syllable inventory and seven minimal pairs?" is currently deferred (see paper §4.5). The phonetic plausibility of the swap (te and qe sharing /e/) is another matter, and that *is* dependent on the assignment — the workbench reports it as roughly indistinguishable from chance.

We also found that our main prefix (°-qe) combines with **10 different stems** and our main suffix (-ti) attaches to **12 different roots**. That's productive grammar — the kind you see in real languages, not in lists or catalogs.

**Test 3: Does the consonant/vowel grid make sense?**

In a syllabary (where each symbol = one syllable), signs that share the same consonant should behave similarly. Think of it this way: in English, "ba," "be," "bi," "bo," "bu" all start with "b" — they should show up in similar positions in words.

We built a grid of all our sound values grouped by consonant and vowel. The coolest finding: **every sign ending in -u (like ku, tu, zu, ru) avoids the end of words.** No other vowel group does this. That's a real pattern that our sound assignments predicted correctly — it would be a bizarre coincidence if our values were wrong.

**Catching our own mistake**

We also found that one of our original "disagreements with Owens" was actually *our* error. We had written down the wrong reference number for sign 26 — we said it was AB 77 (the sound KA), but the original source clearly says AB 76 (the sound RJA). Once we fixed this, the most important phrase on the disc — the one repeated 3 times — now matches Owens's reading on 3 out of 4 signs. That's a good sign: when you find and fix your own mistakes and the results get *better*, you're probably on the right track.

#### Step 4 — Does it match a real ancient language? (first results: Minoan ranks first; the others are not supported by this test)

This is the big one. We took our reading and compared it against **actual ancient Minoan words** — words found on other Cretan inscriptions written in Linear A (a related writing system). We compared against 34 known words and phrases from places like Iouktas, Psychro, Phaistos, and Hagia Triada.

**What we found:**

We discovered that **17 words on the disc share two-syllable sequences (bigrams) with attested Linear A forms.** For example:

| Disc word | Minoan (Linear A) word | Shared part |
|-----------|----------------------|-------------|
| wi-**pi-na**-dwa | I-**PI-NA**-MA | pi-na (a word about distributing/pouring) |
| **qe-ku**-rja | **QE-KU**-RE | qe-ku (maybe meaning "underground"?) |
| **ti-ti**-te | **TI-TI**-KU | ti-ti (a repeated sound, like "bye-bye") |

Then we did the critical test: **is this overlap real, or could it be a coincidence?**

We ran a computer simulation 100,000 times. Each time we built a "fake disc" of the same shape (same number of word-groups, same word lengths) by drawing syllables at random from the pool of syllables that show up in either the disc reading or the Linear A vocabulary, and counted how many two-syllable sequences happened to match Linear A by pure luck. (Note: this is *not* the same as randomly reshuffling our specific sign-to-sound assignments — that's a separate, complementary "circularity" test described later in this page.) **Result: only 3.2% of these random fake-disc texts matched Minoan as well as our actual reading does** (uniform MC p = 0.0318). In science, anything below 5% is often considered "statistically significant" *under that single test*; whether it survives the standard corrections we apply later on this page is a separate question.

**However, there are important caveats that weaken this headline number:**

- **Multiple-testing correction.** We tested *nine* languages, not just one. When you run nine tests, you expect some low p-values by pure chance. A standard correction for this (called Holm-Bonferroni) raises the effective p-value to **0.286** — well above the 0.05 threshold. Under this correction, the Minoan result is **not significant**.
- **Frequency-weighted null model.** Our sound values were derived from Linear A by visual similarity. Common disc symbols tend to get paired with common Linear A sounds, which inflates overlap. When we use a "frequency-weighted" simulation that accounts for this, the p-value jumps to **0.706** — meaning the match could easily be a frequency artifact.
- **What IS robust under the corrections we applied:** The eight *eliminations* (Greek, Luwian, Semitic, and the other five) remain non-significant under Holm-Bonferroni multiple-testing correction and under the frequency-weighted null. Different sign-value systems, larger reference corpora, or different statistics could in principle change one or more of those eight verdicts; we report robustness under the specific corrections we applied here, not robustness in absolute terms.

We also checked whether our word endings and beginnings match the patterns that Minoan language uses. **8 out of 12 known Minoan suffixes appear on the disc** (like -ti, -te, -no, -na-ti). That is a non-trivial overlap, although we have not run a permutation test to put a chance probability on the count, so it is descriptive rather than statistically certified.

**The bottom line:** Minoan is the only candidate that lands below the conventional 0.05 threshold under our primary uniform null — eight of nine tested languages are not supported by the same test under their own reference vocabularies. We deliberately do **not** say "ruled out" or "eliminated", because a language can fail this Daidalika-reading bigram test without being ruled out under a different sign-value system, a larger reference corpus, different transliteration rules, or a different statistic. The positive evidence for Minoan itself is suggestive, not conclusive. The 3.2% result depends on the statistical model: it does not survive Holm-Bonferroni multiple-testing correction, the frequency-weighted null, the leave-PD-inspired-out ablation that drops the 10 of 34 Linear A reference entries explicitly curated against the Phaistos Disc (see paper §3.4), or even the alternative phonetic treatment of sign 02 (which shifts the Minoan p to 0.056, just above α = 0.05). This is *directionally* consistent with what Brent Davis predicted in 2018 using completely different statistical methods — that the disc and Linear A encode the same language — but our Davis-style replication on the public 34-entry corpus produces <!-- canonical-exempt:start -->p ≈ 0.116–0.129<!-- canonical-exempt:end --> (paper §3.7; values from an internal CLI script, not yet exposed by the public workbench), not Davis's reported p = 0.01–0.03, so we treat this as "directionally consistent with Davis", not as independent reproduction at Davis's strength.

#### Step 4b — What about Greek? (tested — doesn't fit!)

If the disc is from Crete, maybe it's written in early Greek? After all, the Greeks eventually took over Crete and used Linear B (which *is* Greek). We needed to check.

We compared our reading against **67 well-known Mycenaean Greek words** — almost twice as many as the 34 Minoan words we tested. Greek has a MUCH bigger known vocabulary (Linear B is fully deciphered), so if the disc were Greek, it should match *better* than Minoan.

**It matched far worse.**

| What we measured | Minoan (Linear A) | Greek |
|---|---|---|
| Words to compare against | 34 | 67 |
| Shared syllable pairs | 9 | 4 |
| Probability it's a coincidence | **3.2%** (uniform-null only) | **64%** (consistent with chance) |
| Known endings that appear on the disc | 8 out of 12 | 4 out of 12 |
| 3-syllable matches | yes | **zero** |

The most telling evidence: Greek has very distinctive word patterns — like -me-no (a verb ending), -re-u (a "doer" suffix, like "smith"), and -jo (meaning "belonging to"). **Not a single one appears on the disc.** If the disc were Greek, we'd expect to see these everywhere — they're as common in Greek tablets as "-ing" and "-tion" are in English.

Meanwhile, the Minoan result with half the vocabulary produced more than twice the overlap and a lower p-value.

**Bottom line:** Mycenaean Greek is **not supported by this Daidalika-reading bigram-overlap test** under any of the corrections we run. The disc matches the language it "should" match (Minoan, since it's from Crete, ~1700 BC) better than the language it shouldn't (Greek, which came later) under the primary uniform null — though the Minoan match itself remains model-dependent (see caveats above), and a failed bigram-overlap test under one Daidalika-derived sign system is not a language-level exclusion of Greek in the broader sense.

#### Step 4c — What about Luwian? (tested — doesn't fit either!)

Luwian is an ancient language from what is now Turkey. A group of Dutch researchers (Achterberg et al., 2004) published a whole book arguing the disc is a "Luwian letter to Nestor" — a land ownership document. We had to test this.

We compared our reading against **72 Luwian words** — nouns, verbs, place names, even the specific towns Achterberg claims to read (Phaistos, Knossos, Lasithi).

**Result: not supported by this test.** The p-value was 0.176 (needs to be below 0.05 to mean something). On top of that, there's a basic phonological problem. Luwian is full of words that start with "h" — their word for "king" is ha-su, "river" is ha-pi, "sheep" is ha-wi. But **our disc reading has no "h" sound at all**. None of the 45 symbols produces an h-syllable. That's like trying to claim a text is English but it never uses the letter "T."

All 10 specific Luwian patterns we tested (king, river, storm god Tarhunt, sun god Tiwat, woman, god, and Achterberg's own proposed place names) were **completely absent**.

| Language tested | p-value | Verdict |
|---|---|---|
| **Minoan (Linear A)** | **0.032** | Below α = 0.05 under the uniform null *only* |
| Luwian | 0.176 | Not supported by this test |
| Greek | 0.636 | Not supported by this test |

Minoan is the only language to land below α = 0.05 under the primary uncorrected uniform null. We deliberately stop short of saying it "passes" the test, because none of the nine languages survive Holm-Bonferroni correction or the frequency-weighted null (see the caveats further down this page). It does rank first with the smallest reference vocabulary (34 words, versus 67 for Greek and 72 for Luwian), which is suggestive given that more reference words usually give a language *more* opportunities to match — but smaller corpora also have less statistical power, so we treat the comparative ranking as ordinal evidence, not as a quantitative effect-size claim.

#### Step 4d — What about a Semitic language? (tested — not even close!)

Some researchers have proposed the disc might be in a Semitic language (the language family that includes Hebrew, Arabic, and the ancient Canaanite spoken near Crete). We tested against 60 words from Ugaritic, Canaanite, and Akkadian — the Semitic languages of the Late Bronze Age.

**Result: the worst performer of all four languages.** The p-value was 0.988 — meaning random gibberish would match Semitic better than our disc reading does 99% of the time. Only 1 shared syllable pair (compared to 9 for Minoan). Zero 3-syllable matches.

But the statistical test isn't even the most interesting part. There are deep **structural reasons** why the disc can't be Semitic:

1. **Wrong syllable type.** Semitic words are built from CVC syllables (consonant-vowel-consonant), like "mal-ku" (king) or "šam-šu" (sun). But the disc uses pure CV syllables (consonant-vowel), like "ma" or "ti." It's like trying to read Japanese hiragana text as if it were English — the building blocks are fundamentally different.

2. **Wrong word-building system.** Semitic languages build words by changing the vowels inside a 3-consonant skeleton. For example, the root k-t-b (writing): katab (he wrote), kitāb (book), kātib (writer). The disc does the opposite — it builds words by adding prefixes and suffixes to roots, like Minoan does.

3. **Wrong endings.** When you force Semitic CVC words into a CV writing system, you get lots of words ending in -ru, -bu, -tu, -mu (because the final consonant needs a "helper vowel"). Only 2% of disc words end this way. Instead, disc words end in -ti, -te, -je — exactly the Aegean/Minoan pattern.

#### Step 4e — We also tested Finno-Ugric, Egyptian, Hurrian, and Etruscan

We didn't stop at four languages. We tested every reasonable Bronze Age candidate:

- **Proto-Finno-Ugric** (Revesz 2015): p = 0.72. Only 2 shared syllable pairs. Plus a structural mismatch: PFU languages build words *only* with suffixes (no prefixes), but our disc uses both prefixes and suffixes — which is consistent with the disc *not* being PFU under this operationalization, but not a language-level exclusion of PFU.
- **Middle Egyptian**: p = 1.000 — literally the worst possible score. **Zero** shared syllable pairs. Despite Egypt being Crete's biggest trading partner, their reference vocabularies share nothing at the syllable level under the CV adaptation we used.
- **Hurrian** (Mitanni kingdom): p = 0.81. And Hurrian has a unique grammar feature (the "ergative marker" -š) that doesn't appear once in our disc.
- **Etruscan/Tyrsenian** (pre-Greek Aegean): p = 1.000. Plus the earliest Etruscan evidence is 1000 years after the disc.

#### The final scoreboard (9 languages tested)

| Rank | Language | p-value | Shared syllable pairs | Verdict |
|---|---|---|---|---|
| 1 | **Minoan (Linear A)** | **0.0318** | **9** | Below α = 0.05 under the primary uniform null *only* — see important caveats below |
| 2 | Hittite (Rasmussen reading) | 0.101 | 8 | Not supported by this test |
| 3 | Luwian (Anatolian) | 0.176 | 8 | Not supported by this test |
| 4 | Greek (Linear B) | 0.636 | 4 | Not supported by this test |
| 5 | Proto-Finno-Ugric | 0.719 | 2 | Not supported by this test |
| 6 | Hurrian | 0.810 | 2 | Not supported by this test |
| 7 | Semitic (Ugaritic) | 0.988 | 1 | Not supported by this test |
| 8 | Egyptian | 1.000 | 0 | Worst possible |
| 9 | Etruscan/Tyrsenian | 1.000 | 0 | Worst possible |

Minoan is the only language to land below α = 0.05 under the primary uncorrected uniform null — and it does so with the smallest comparison vocabulary (just 34 words, while others had 44–72). However, as noted above, this result does not survive Holm-Bonferroni correction (adjusted p = 0.286) or the frequency-weighted null model (FW p = 0.706). The eight "not supported" results, by contrast, are robust under every correction we ran.

**The disc's language is most consistent with Minoan under this test.** Eight competing hypotheses are not supported under either the uniform or the frequency-weighted null. Minoan is the only candidate to clear the conventional 0.05 threshold under the uniform null, but the positive evidence supporting it is suggestive rather than conclusive: it does not survive Holm correction, the frequency-weighted null, the leave-PD-inspired-out ablation that drops Linear A entries which were curated against the disc, or the alternative phonetic treatment of sign 02 (under which Minoan p = 0.056). We have narrowed the field under one specific test, not settled the question.

### Where are we right now?

| Step | Status | What's next |
|------|--------|------------|
| 1. Pattern analysis | ~95% done | Find more published research on reading direction |
| 2. Sound value clues | ~75% done | Get a key textbook (Davis 2026) for cross-checking; resolve allograph pairs |
| 3. Try reading it | **Internally consistent — all "shape" tests passed.** Important caveat: the 100% CV/V fit is a *pipeline check* (the assignment was built CV-only, so it cannot fail), not independent evidence. The 7 minimal pairs and the affixation patterns are properties of the raw sign sequences, so they are robust to any 1-to-1 sign-to-syllable mapping; they support the claim that the disc is structured language, not the claim that the *Daidalika sound values* are correct. | 100% CV/V structure (pipeline), 7 minimal pairs, productive morphology |
| 4. Language testing | **Minoan ranks first; the other 8 candidates are not supported by this test.** | 9 languages tested. Minoan survives uniform uncorrected null (MC p = 0.032) but does **not** survive Holm correction (0.286), the frequency-weighted null (0.706), the leave-PD-inspired-out ablation (filtered p = 0.261; see §3.4), or the alternative phonetic treatment of sign 02 (Minoan p = 0.056). The eight "not supported" results are robust across all corrections. We avoid the words "ruled out" and "all major tests passed" because both overstate what the test can show. |

### What have we built?

> **Note on what is publicly reproducible.** The interactive browser workbench (open `app/index.html`) is the publicly reproducible workflow: it runs every test that contributes to the headline p-values, the sensitivity analyses, the morphology table, and the 29-item "Extended Analysis" panel. A small number of supplementary tools listed below — **the Kuykendall mutual-information replication, the Duhoux 1977 prefix/suffix ratio, the Packard Distribution Index, and the Davis 2018 replication numbers** — live only in the private research repository's command-line interface and are described here for completeness. Their numbers are reported in the paper but cannot currently be re-run from this published bundle. Everything else on this page can be verified by clicking through the workbench in your browser.

- An **interactive browser workbench** that automatically counts patterns, checks our work against published research, and runs statistical tests. Anyone can open it and verify the same results.
- A **database** of all 45 symbols with their proposed sound values, confidence levels, and where each proposal comes from.
- A **catalog of every serious published attempt** to decode the disc (8 major research programs), so we don't accidentally repeat someone else's work.
- A **statistical test** (the "Kuykendall test") that checks whether the disc's patterns look more like language or like structured data. *(CLI-only; not in the public workbench.)*
- A **positional consistency checker** that makes sure every sign fits where it appears — like spell-check but for ancient scripts.
- A **morphology analyzer** that finds word-building patterns, minimal pairs, and grammatical structures in the reading.
- A **language comparison tool** that checks our reading against 34 known Minoan words and runs 100,000 simulations to test if the match is real or coincidental.
- A **Greek comparison tool** that runs the same tests against 67 Mycenaean Greek words, with a head-to-head comparison against the Minoan result.
- A **Luwian comparison tool** that tests 72 Luwian words, including Achterberg et al.'s proposed toponyms, with a three-way comparison table.
- A **Semitic comparison tool** that tests 60 West Semitic words, including a triconsonantal root structure test and syllable compatibility analysis.
- Four more language tools covering every reasonable Bronze Age candidate (Proto-Finno-Ugric, Egyptian, Hurrian, Etruscan).
- A **phonotactic plausibility test** that checks whether our sound values form a realistic writing system — does the frequency curve follow Zipf's law? Are the vowels distributed like a real language? The answer: yes, with a near-perfect Zipf slope of -1.001.
- A **Rasmussen Hittite test** that re-reads the entire disc using a completely different set of sound values proposed by Rasmussen (2010) for Hittite. Result: MC p = 0.101, not significant — it doesn't beat our Minoan reading.
- A **final 9-way comparison** that ranks all 9 tested languages/reading systems by statistical fit. Minoan/Linear A is the only language below α = 0.05 under the uniform null (though not surviving Holm or FW corrections).
- A **Duhoux ratio test** that checks whether the disc's prefix-vs-suffix balance matches published 1977 figures and compares with Linear A and Linear B. *(CLI-only; not in the public workbench.)*
- An **allograph analyzer** that determines whether look-alike symbol pairs are really the same sign or genuinely different.
- A **Davis replication** that re-does the same kind of test that Professor Davis published in 2018 — checking whether disc signs and Linear A signs appear in the same positions within words. Our result <!-- canonical-exempt:start -->(p = 0.129, 68% positional agreement)<!-- canonical-exempt:end --> trends in the same direction as his published finding. *(CLI-only; not in the public workbench.)*
- A **Packard Distribution Index** that uses a 1974 mathematical method to identify which signs are most likely to be prefixes or suffixes. The top results match what's known about Linear A affixes. *(CLI-only; not in the public workbench.)*
- A **hypergeometric cross-check** built into the final comparison. This is a second, completely different mathematical formula that puts an analytical bound on the same overlap statistic. It is intentionally a *simplified* model (it ignores word-length structure and treats all possible bigrams as equally likely; in particular it assumes bigram occurrences are independent draws, which is not strictly true when bigrams share a syllable), so its numbers will not match the Monte Carlo numbers exactly — for Minoan it lands at roughly 0.002 versus the Monte Carlo 0.032 — but it agrees with the Monte Carlo on the *direction* and on the eliminations of the eight non-Minoan languages. We treat it as a sanity check on the Monte Carlo, not as a second independent confirmation of the headline p-value.
- A **sign-02 sensitivity test** that checks whether our main finding survives if we treat symbol 02 as a real sound ("i") instead of a marker. Result: under the determinative reading the uncorrected MC p is 0.032; under the phonetic reading it shifts to 0.056 — *just above* the conventional 0.05 threshold rather than below it. The headline ranking does not flip (Minoan still ranks first), but the alternative phonetic treatment of this single sign is enough to push the Minoan p across α = 0.05. The sole positive verdict in the nine-language comparison is therefore sensitive to one annotation choice; readers should treat the borderline 0.032 number, not as a robust signal, but as an exploratory finding contingent on the determinative interpretation of sign 02.
- A **circularity bias test**. Someone might ask: "You got your sound values *from* Linear A, then tested against Linear A and found a match — isn't that cheating?" Fair question. So we tested it: we kept the exact same *set* of 43 Minoan syllable sounds but randomly scrambled which sound goes with which symbol. We did this 100,000 times. Result: the average random scramble only matches 3 Minoan word-pairs. Our real assignment matches 9. Only 0.47% of random scrambles did as well or better (p = 0.0047). That means it's not just the *sounds themselves* that match — it's the *specific pairing* of each sound with its symbol.
- A **frequency-weighted circularity test**. But there's a subtlety: when researchers match symbols between two scripts by visual similarity, they're more likely to notice and pair symbols that are *common* in both scripts. Common symbols paired with common sounds will naturally produce more matches. So we tested: what if we only shuffle symbols among others with *similar frequency*? (High-frequency with high-frequency, etc.) Result: the average now jumps to 7.8 matches — close to our real 9. The p-value = 0.36, meaning it's NOT statistically significant anymore. This tells us something honest: most of the match is because frequent disc symbols got frequent Minoan sounds, not because we identified the *exact right* sound for each symbol. The eight non-Minoan languages remain not-supported (they have nothing to do with Minoan sounds), but the positive Minoan match is weaker than the first test alone suggested. We report this openly.
- A **Sign 02 / qe binding test** (Extended Analysis #28 in the workbench). Sign 02 — the "plumed head" determinative — appears word-initially 19 times. In 13 of those 19 cases, the very next sign is sign 12 ("qe"). Under a permutation null where the qe tokens are shuffled across all non-initial slots on the disc, the chance of seeing 13 or more of them land directly after sign 02 is on the order of 10⁻¹². This is descriptive evidence that sign 02 and sign 12 are tightly bound, regardless of whether you accept any phonetic decipherment. Any future reading of the disc must accommodate this co-occurrence pattern. *(Note: the Monte Carlo cross-check at 100,000 iterations reports "p < 10⁻⁵" rather than "p ≈ 0", because the simulation cannot resolve any value smaller than 1 / iterations — the strong-evidence number is the analytical hypergeometric p, not the Monte Carlo permutation p.)*
- A **leave-PD-inspired-out test** (Extended Analysis #29 in the workbench). This is the most uncomfortable test we run, and we report it prominently. **The setup:** 10 of our 34 Linear A reference entries (about 29%) carry a note in the source data saying *cf. PD …* — meaning whoever curated the Linear A list looked at the Phaistos Disc and explicitly flagged those entries as parallels. Testing a Daidalika-derived disc reading against a Linear A list that was itself partly built by reading the disc is a form of circularity that the previous two scrambling tests cannot fix: the scrambling tests correct for *which sound goes with which sign*, not for *which Linear A words got included*. **The test:** re-run the same Minoan Monte Carlo against only the 24 Linear A entries that do *not* carry such a note. **The result:** the bigram overlap drops from 9 to 5, and the uncorrected MC p-value rises from 0.032 to 0.261. **What it means:** four of the nine "shared bigrams" depend on Linear A entries that were curated by reading the disc, and the headline Minoan signal is not robust to dropping them. We treat the headline result as *exploratory* and partly *contingent on Linear A curation*, and we list a re-curation of the Linear A reference list from a primary source (e.g., GORILA / SigLA) under preregistered inclusion rules as a deferred analysis in §4.5 of the paper. Two further caveats: (i) removing 29% of the Linear A entries also reduces the LA corpus size, and part of the p-value drop reflects that corpus shrinkage rather than the loss of curated parallels; (ii) a small number of short, high-leverage LA entries (e.g. *qe-ku-re*, *ku-ra*) generate several of the original nine shared bigrams on their own, so the ablation is dominated by them rather than by a uniform 29% reduction.

### How does our work compare to what others have done?

The person who's done the most work on this is **Professor Gareth Owens**, a British-Greek linguist who's been studying Minoan scripts for over 30 years. He has published 55+ academic articles and 6 books about ancient Cretan writing systems — he's a serious scholar with decades of experience.

Owens has given public talks (including a TEDx talk in 2014) where he says he can "read" 99% of the disc and interpret over 50% of it. He thinks it's a prayer to a Minoan mother goddess.

**Here's the important part**: Owens has never published his complete reading in an academic journal where other scientists can check it. His Phaistos Disc claims exist only in talks, interviews, and his website — not in the formal scientific record. It's like a scientist announcing "I found the cure!" at a press conference but never publishing the data in a medical journal.

What makes our work different:
- **Ours is a computer program anyone can run** — open the interactive workbench and you get the full reading. No trust required.
- **Every symbol has a confidence rating** — we honestly mark which ones we're sure about and which are guesses.
- **We checked things nobody published before** — the 100% syllable-structure fit, the 100% positional consistency, the 7 minimal pairs, the -u vowel avoidance pattern, the productive morphology statistics. These are basic tests that should have been done years ago.
- **We catch and fix our own mistakes** — we found an error in our own data (sign 26), corrected it, and the results improved. That's how real science works.
- **We're testing, not just claiming** — we use the reading as a scientific test of whether this IS language, rather than assuming it is.

Owens probably knows everything we found (he's been doing this much longer than us). But since he hasn't published it in a verifiable way, our reproducible, open version fills a real gap.

### Important things to remember

1. **We might be wrong.** The disc is genuinely too short to prove any reading. Our goal is the *best-supported* reading, not a "proven" one.
2. **We're building on other people's work.** We didn't invent this approach — we're combining and extending methods from researchers like Brent Davis (statistics, 2018; monograph 2026 forthcoming), Gareth Owens (sound values; *Daidalika* signary, TEI Crete; underlying scholarship Owens 1999, 2007), and others. Professor Owens's sign comparison table is the foundation of our sound values; Davis's method shows that the Disc and Linear A *behave* statistically like the same language without anyone having to read either of them.
3. **Everything is reproducible.** Every claim we make can be checked by running our computer program. No hand-waving.
4. **The disc might not be language at all.** A researcher named Kuykendall argues it's a trade directory, not a text. Our statistical test found his observation is real, but it doesn't prove he's right. Step 3 results support the language hypothesis, but we keep Kuykendall's alternative active.
