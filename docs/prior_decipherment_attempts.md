## Prior decipherment attempts and related research

This document catalogs the most serious published approaches to the Phaistos Disc, so that our work builds on — rather than reinvents — existing scholarship. Each entry notes the methodology, results, and how the work relates to our project.

> **Scope of this document.** Numbers cited here from external work (Davis, Macdonald, Timm, Duhoux, Owens, Kuykendall, etc.) are quoted from those authors' published papers and books and are *not* reproduced by this project's public workbench. They are reported here so a reader can locate and verify them in the cited primary source. Numbers from *our own* analyses appear only in `paper_draft.md` and `plain_language_summary.md`, where they are locked under `scripts/canonical-values.json` and the `verify-canonical` / `verify-prose` gates in CI. If a published value disagrees with what our workbench reports under a similar test name (e.g., our Davis replication at p ≈ 0.116–0.129 vs. Davis's reported p = 0.01–0.03), see §6 of `paper_draft.md` for the documented gap.

### The convergence problem

A key meta-observation: Linear B decipherment efforts **converged** over decades toward Ventris's 1952 solution, with independent researchers circling the same phonetic territory. Phaistos Disc decipherment efforts have done the opposite — they have **diverged** for 116 years. Every new method produces a different, equally unverifiable reading. This pattern is itself evidence, though scholars disagree about whether it indicates extreme difficulty or a fundamental miscategorization of the artifact (see Kuykendall below).

### The Barber limit (mathematical constraint on decipherment)

Elizabeth Barber proved mathematically in 1974 that **241 tokens of 45 sign types is an insufficient corpus to verify any linguistic decipherment by statistical methods**. Multiple internally consistent readings can be proposed and none falsified. This is not a limitation of current methodology — it is a mathematical fact about corpus size vs. analytical power. Our project's "success criteria" (narrowing to 2-3 surviving hypotheses, not confident translation) explicitly acknowledges this constraint.

**Citation**: Barber, E. J. W. *Archaeological Decipherment: A Handbook*. Princeton University Press, 1974.

---

### Published approaches

#### 1. Brent Davis — Syllabotactic analysis (2018, 2026)

**The closest existing work to our approach.**

- **Paper**: "The Phaistos Disk: A New Way of Viewing the Language behind the Script." *Oxford Journal of Archaeology* 37.4 (2018): 373-410. DOI: [10.1111/ojoa.12151](https://doi.org/10.1111/ojoa.12151)
- **Book**: *The Undeciphered Aegean Scripts: Linguistic Investigations into the Languages They Encode*. Cambridge University Press, 2026. ISBN 978-1-009-56234-8. DOI: [10.1017/9781009562331](https://doi.org/10.1017/9781009562331). Chapter 8 covers the Phaistos Disc specifically.

**Method**: Identifies **homomorphic signs** (visually similar signs shared between scripts) and compares their **positional distributions** — which signs appear word-initially, non-initially, or both. If two scripts encode the same language, homomorphs should show similar positional behavior due to shared phonotactic constraints. The method requires no knowledge of phonetic values.

**Results** (from 2018 paper):
- PD vs Linear A: **p = 1–3%** → 97–99% probability they encode the same language.
- LB vs Cypriot Syllabary (both Greek): **97%** → validates the method on known scripts.
- LA vs Cypriot Syllabary: **55%** → LA is not Greek.
- LB vs PD: **45%** → PD is not Greek.
- 2019 Michael Ventris Award for Mycenaean Studies.

**What Davis did NOT do**: He deliberately avoided producing phonetic value assignments or attempting decipherment. He considered this beyond what the data supports given the Barber limit.

**2026 book structure** (from frontmatter preview, `references/The-Undeciphered_Aegean_Script.pdf`):

The book (~530 pp.) is organized in two parts. Part I (Chapters 2-5) provides a full linguistic analysis of Linear A: phonology, morphology, syntax, and orthography. Part II (Chapters 6-11) applies the novel syllabotactic methodology to all undeciphered Aegean scripts. The Phaistos Disc is covered in **Chapter 8** (pp. 314-339):

| Section | Title | Pages |
|---------|-------|-------|
| 8.1 | Defining the Sets of Homomorphs | 316 |
| 8.2 | Defining Benchmark and Target Texts; Tabulating Word-Internal Pairs | 318 |
| 8.3 | Completing the Control Experiment (Steps 3a, 4a) | 324 |
| 8.4 | Results of the Control Experiment: Discussion | 329 |
| 8.5 | Completing the Main Experiment (Steps 3b, 4b) | 333 |
| 8.6 | Results of the Main Experiment: Discussion | 337 |

**Key finding from frontmatter**: Figure 8.1 (p. 322) caption reads "the **fourteen signs** in Table 8.2 highlighted where they form word-internal pairs." Davis identified exactly **14 PD↔LA homomorphs** — far more conservative than Owens/Daidalika (44/45 signs). Our Daidalika correspondences include 4 high-consensus signs (PD12→QE, PD19→SA, PD29→MA, PD31→KU); the question is which of our remaining 40 signs Davis also identifies.

**Other chapters relevant to our project**:
- **Ch. 3 (LA Phonology, pp. 92-170)**: Detailed analysis of every consonant series (p, t, k, d, z, r, s, q, nw, rj, tj) and vowels — directly comparable to our PHONETIC map.
- **Ch. 4 (LA Morphology, pp. 171-204)**: Packard's DI (Distribution Index) analysis — related to our Duhoux ratio and positional profile work.
- **Ch. 7 (Syllabotactic Analysis of LA, pp. 234-313)**: The full methodology that Chapter 8 applies to the PD.
- **Appendix A.5 (p. 442)**: Lists specific hypotheses from Chapter 8.

**Relevance to our project**: Davis's work validates our Phase 1-2 approach (positional analysis + homomorph identification). His statistical finding that PD and LA encode the same language supports our Phase 2 strategy of using Linear A correspondences as the primary source of phonetic values. Our Phase 3 (applying candidate phonetic values) is the logical next step beyond Davis's work — the step he chose not to take. His 14 homomorph identifications are the critical missing data: if they agree with our Daidalika-based correspondences, our reading gains independent statistical support.

**Replication in our project** (2026-04): We implemented Davis's syllabotactic method directly (`npm run davis-replication` *(internal CLI; not in the public workbench; the underlying values are flagged in `paper_draft.md` §6.1)*). Using 23 medium+ confidence homomorphs, we found 17 shared word-internal pairs between PD and LA. Permutation test: p = 0.1291 (not significant at 0.05 — weaker than Davis's 1-3%, likely because our homomorph set is larger and our LA corpus smaller). Positional agreement: 13/19 = 68% (chance: 50%). We also applied Packard's DI method (`npm run packard-di` *(internal CLI; not in the public workbench)*), identifying QE and MA as superfrequent-initial, and JE, TE, NO as superfrequent-final — with TE matching a known LA superfrequent final. **Frontmatter acquired** (2026-04); full Chapter 8 text still needed for the specific 14 homomorph identifications.

---

#### 2. Gareth Owens & John Coleman — Linear A/B phonetic value assignment (1990–present)

**The most prolific researcher on Minoan scripts currently active.** Owens has published 55+ academic articles and 6 books over 30+ years, but his Phaistos Disc decipherment claims exist primarily in non-peer-reviewed formats.

**Academic record**:
- B.A. Classics, UCL (1985); M.A. Greek Literature & Archaeology, UCL; M.Phil. "From Linear A to Linear B", UCL Archaeology (1991); Ph.D. "A Tentative Approach to the Minoan Language", Univ. of Athens Linguistics (2004).
- Ventris Award for Mycenaean Studies (1992).
- Post-doc on Cretan Hieroglyphic + Phaistos Disc, Univ. of Athens (2008-2014).
- Currently: Associate Professor of Hellenic Culture, Hellenic Mediterranean University.

**Key publications (peer-reviewed)**:
- "The Structure of the Minoan Language." *Journal of Indo-European Studies* 27:1&2 (1999): 15-55. — Core theoretical framework: ~90% of LA characters correspond phonetically to visually similar LB characters. Argues Minoan is Indo-European (Satem branch).
- "Pre-Hellenic Languages of Crete: Debate and Discussion." *JIES* 28:1&2 (2000): 237-254.
- "Evidence for the Minoan Language (1): The Minoan Libation Formula." *Cretan Studies* V (1995): 163-206.
- "ASTARTE/ISHTAR/ISHASSARAS/ASASARAME: The Great Mother Goddess." *Cretan Studies* V (1995): 207-218.
- Various articles in *Kadmos*, *Minos*, *Talanta*, *Cretan Studies*, *Aegaeum* (1990-2005). See full bibliography on [Daidalika CV page](https://daidalika.hmu.gr/author/).
- With Papavassiliou & Kosmopoulos: "A Dataset of Mycenaean Linear B Sequences." *LREC 2020*, pp. 2552-2561. [ACL Anthology](https://aclanthology.org/2020.lrec-1.311/)
- With Papavassileiou & Kosmopoulos: "A Generative Model for the Mycenaean Linear B Script and Its Application in Infilling Text from Ancient Tablets." *ACM J. Computing & Cultural Heritage* 16:3 (2023). DOI: [10.1145/3593431](https://doi.org/10.1145/3593431)

**Books**:
1. *DAIDALIKA — Scripts and Languages of Minoan and Mycenaean Crete* (Heraklion, 1996). 20 essays, 80pp.
2. *Kritika Daidalika — Evidence for the Minoan Language: Studies Hooker* (Hakkert, Amsterdam, 1997). 20 essays, 320pp. ISBN 90-256-1096-X.
3. *Evidence for Indo-European Language in the Minoan Documents*. DO-SO-MO Fascicula Mycenologica Polona 6 (2005). 80pp.
4. *Labyrinth: Scripts and Languages of Minoan and Mycenaean Crete*. Centre for Cretan Literature (Heraklion, 2007). xxvi+358pp. ISBN 978-960-86847-5-1.

**Phaistos Disc work (NOT peer-reviewed)**:
- TEDx talk: "Decrypting the Phaistos Disk", TEDxHeraklion, 2014. [YouTube](https://www.youtube.com/watch?v=6Chcplx3tZ8). Claims 90% "read."
- Public lecture: "The Voice of the Phaistos Disk", organized by National Documentation Centre (EKT) + TEI Crete, Feb 2018. Claims 99% "read", >50% "interpreted." [archaeology.wiki](https://www.archaeology.wiki/blog/2018/02/07/gareth-owens-50-phaistos-disk-deciphered/)
- Signary: Daidalika signary comparison table (July 2017). [PDF](https://daidalika.hmu.gr/wp-content/uploads/2020/11/signary_July2017b.pdf). Maps all 45 PD signs to CH, Arkalochori, LA (glyptic + administrative), and LB.
- Audio recording: "Voice of Phaistos Disk" at "Nest" Studio (2016) — phonetic rendering.
- Website series: "Study/Read/Understand Phaistos Disk?" (2020); "Mythology & Poetry" (2022); "Mons Veneris", "NO-NA", "Merastri" (2024). Via [daidalika.hmu.gr](https://daidalika.hmu.gr).
- 2018 EKT lecture: Interprets disc as **Minoan prayer to a mother goddess**. Side A: pregnant goddess. Side B: Aphaia/Astarte. 61 words in 18 "rhyming" lines.
- Key phrase **I-QE-KU-RJA** (appears 3x) = "pregnant goddess" or "mother/goddess."

**Critical distinction**: Owens's 55+ peer-reviewed articles deal with Linear A, Linear B, Cretan Hieroglyphic, Minoan place names, and comparative Indo-European linguistics. His **Phaistos Disc decipherment** — the actual word-by-word reading — has NOT been published in any peer-reviewed journal. It exists only in TEDx talks, public lectures, media interviews, and website materials. No complete, systematized transliteration of all 61 word-groups has been published in a format amenable to independent verification.

**Criticisms**:
- **Younger (2014)**: "Every proposed decipherment, Gareth Owens's included, fails the standard of 'probability.' [...] Owens gives values for the signs and interpretations of the words [...] without any thorough-going proof of the overall phonology, sound-representational system and grammar and syntax." [Biblical Archaeology Review](https://www.biblicalarchaeology.org/daily/archaeology-today/phaistos-disk-deciphered/)
- **Duhoux (2000)**: Owens's readings rest "on a stack of unverifiable assumptions" whose conclusions remain "unproven, and unprovable."
- Chain of unverified assumptions: LB values → LA signs (LA undeciphered) → PD signs (visual similarity subjective).
- Sign 02 dispute: Owens assigns "I" (from AB 28), but multiple sources attribute AB 28 to sign 39 (tiara) instead.

**Relevance to our project**: The Daidalika signary is our **primary reference** for Disc→Linear A correspondences. Our Phase 3 phonetic reading is built on Owens's sign-value assignments. However:
- We treat all assignments as confidence-tagged hypotheses, not facts.
- We found **two specific discrepancies** between our Daidalika-derived values and Owens's published readings: sign 02 (we: determinative °, Owens: I) and sign 18 (we: ti, Owens: RJU). A third initial discrepancy (sign 26) was resolved during research: sign 26 is now assigned AB76 RJA, aligning with Owens.
- Our Phase 3 phonetic reading — a complete, reproducible, machine-generated transliteration of all 61 words with confidence tags and phonotactic verification — appears to fill a gap in the published record that Owens's non-peer-reviewed presentations leave open.

---

#### 3. Peter Revesz — Computational cross-script translation (2015–2016)

- **Paper**: "A Computational Translation of the Phaistos Disk." Proc. 3rd International Conference on Applied Mathematics, Computational Science and Engineering, Crete, 2015. [PDF](https://www.naun.org/main/NAUN/computers/2016/a282001-455.pdf)
- **Also**: [University of Nebraska Digital Commons](https://digitalcommons.unl.edu/cseconfwork/312/)

**Method**: Semi-automatic 5-step computational process: (1) transliterate using correspondences with Old Hungarian, Phoenician, South Arabic, Greek scripts; (2) build Proto-Finno-Ugric/Proto-Hungarian dictionary; (3) extract consonant bases; (4) match disc transliterations to dictionary using consonant matching + sound change rules; (5) determine unknown values from morphological fit.

**Results**:
- Proposed Proto-Finno-Ugric language.
- Interpretation: **sun hymn / winter solstice ceremony**.
- Produced partial phonetic transliterations with explicitly marked unknowns.

**Relevance to our project**: Revesz's methodology (systematic hypothesis testing against a linguistic database with explicit sound change rules) is relevant to our Phase 4. His insistence on explicit, computationally verifiable steps aligns with our reproducibility principle. However, the Finno-Ugric language hypothesis is not mainstream for a Minoan artifact and would need strong independent evidence. His approach of minimizing the acrophonic principle is sound methodology.

---

#### 4. Achterberg, Best & Enzler — Luwian interpretation (2004, refined 2021)

- **Book**: Achterberg, W., J. Best, K. Enzler, L."; *The Phaistos Disc: A Luwian Letter to Nestor*. Publications of the Henri Frankfort Foundation XIII, 2004. [Semantic Scholar](https://www.semanticscholar.org/paper/The-Phaistos-disc-:-a-Luwian-letter-to-Nestor-Achterberg-Best/042a5a11357659b5cd2664db4639ead28285742c)

**Method**: Identifies correspondences between 31 of the Disc's signs and Luwian Hieroglyphic symbols. Proposes the disc records a Luwian-language document.

**Results**:
- Language: **Luwian** (Anatolian).
- Content: a **land ownership letter** addressed to "Nestor" (na-sa-tu / da-sa-ti in Luwian).
- Claims to read place names: Phaistos (pa-ya-tu), Lasithi (ra-su-ta), Mesara (mi-SARU), Knossos (ku-na-sa).

**Relevance to our project**: Luwian is one of our Phase 4 language hypotheses (H8). The Achterberg et al. sign-value grid provides an alternative set of phonetic assignments to test against our structural constraints. If our Phase 3 positional and phonotactic analysis can discriminate between the Owens/Minoan and Achterberg/Luwian value sets, that would be a significant result.

---

#### 5a. Arie ten Cate — Inter-winding correlations (2011)

- **Paper**: ten Cate, A. "Patterns on an Ancient Artifact: A Coincidence?" *Statistica Neerlandica* 65.1 (2011): 116-124. DOI: [10.1111/j.1467-9574.2010.00478.x](https://doi.org/10.1111/j.1467-9574.2010.00478.x)

**Method**: Statistical analysis of spatial correlations between signs in adjacent windings of the spiral. If the disc is a one-dimensional text wrapped into a spiral, signs in neighboring turns should be independent. ten Cate identified three patterns of inter-winding alignment (e.g., sign 02 in word A1 aligning radially with sign 02 in word A14 on the adjacent turn) and performed a Monte Carlo simulation using a geometric model of the spiral.

**Results**:
- Statistically significant inter-winding correlations (p < 0.05).
- Conclusion: "it is not a one-dimensional text, since there are relations between the signs in adjacent windings of the spiral."
- The disc may have two-dimensional structure dependent on spiral geometry.

**Relevance to our project**: This is the strongest statistical evidence for non-standard text structure on the disc, alongside Kuykendall's positional distribution analysis. It does not rule out linguistic content (a liturgical text could be arranged for visual effect on a spiral) but it means any reading must account for the spatial arrangement. Our Section 4 Discussion addresses this finding.

#### 5b. Arie ten Cate — Monte Carlo analysis of sign rotation (2013)

- **Paper**: ten Cate, A. "A Statistical Analysis of the Rotated Signs of the Phaistos Disc." *Periodica Journal of Technology, Applied Sciences and Engineering* 6.2 (2013): 81-88. [Full-text PDF](http://www.pspchv.com/Abstract-PJTAS/Open%20Access%20Articles%20of%20PJTAS%20Volume%206,%20Issue%202,%20Pages%2053-80%20and%2081-88/Volume%206,%20Issue%202,%202013,%20%20Pages%2081-88,%20PJTAS-Open%20access.pdf)

**Method**: Monte Carlo simulation (millions of random replications) to test whether observed sign rotations on the disc are deliberate or accidental.

**Results**:
- **Signs 29 (cat head)** and at least one other sign show statistically significant deliberate rotation.
- Rotation patterns concentrate on 2-3 sign types rather than being randomly distributed.
- p-values indicate the pattern is extremely unlikely to be accidental.
- Implication: rotation may encode additional information (analogous to diacritical marks).

**Relevance to our project**: Rotation data for signs 29, 31, and 27 has been encoded in `comparanda/sign_rotation_ten_cate_2013.json` and the sign catalog.

---

#### 6. Montgomery Kuykendall — Non-linguistic / trade directory hypothesis (~2024)

- **Article**: "They Were Wrong for 116 Years." [montgomerykuykendall.com](https://www.montgomerykuykendall.com/echoes/they-were-wrong-for-116-years)

**Not peer-reviewed**, but extensively argued with nine independent evidence vectors.

**Method**: First quantitative positional distribution analysis designed to distinguish between linguistic text and field-based data structure on the Phaistos Disc. Maps every sign type's positional behavior and tests whether the resulting distribution matches natural language or structured data.

**Results**:
- **Tripartite sign classification**: 4 exclusively-initial signs (8.9%), 26 exclusively-non-initial (57.8%), 15 appearing in both (33.3%).
- Sign 02 (PLUMED HEAD): **19/19 exclusively initial** — 100% positional restriction for the most frequent sign.
- Claims this pattern "does not occur in natural language" and is structurally identical to field-based data formats.
- Proposes the disc is a **maritime trade directory** (61 groups ≈ 55-65 Minoan trade network sites).
- Oblique strokes: all 18 are group-final → "record-level annotations" rather than grammatical modifiers.
- Critique of Davis: positional similarity between PD and LA could reflect shared commodity/iconographic conventions rather than shared phonetics.

**Nine evidence vectors**: (1) 61 groups ≈ number of Minoan trade sites; (2) ten Cate's inter-winding correlations (2D structure); (3) exact repetitions at intervals that are multiples of 3 (p ≈ 0.14%); (4) divergent word-length distributions between sides; (5) commodity iconography; (6) oblique strokes as record flags; (7) stamps imply standardized reproduction; (8) deliberate firing (unique among Minoan clay documents); (9) numeral-free navigation documents are cross-culturally attested.

**Relevance to our project**: This is the most serious challenge to our linguistic assumption. Our own positional analysis (`analyze.mjs`) confirms the tripartite pattern. We **must** explicitly test whether the Disc's distributional structure is more consistent with linguistic text or with structured data before proceeding to Phase 3. If the disc is not linguistic, phonetic value assignment is a category error. See new Phase 1 task in `09_todo.md`.

---

#### 7. Yves Duhoux — Structural and comparative analysis (1977, ongoing)

- **Monograph**: Duhoux, Y. *Le disque de Phaestos*. Louvain, 1977.
- **Paper**: Duhoux, Y. "How Not to Decipher the Phaistos Disc: A Review Article." *American Journal of Archaeology* 104.3 (2000): 597-600. [JSTOR](https://www.jstor.org/stable/507232)

**Method**: Systematic comparative analysis of prefix/suffix ratios, doubled signs, and grammatical structures between the Disc and Linear A, Linear B, and Greek.

**Results**:
- Disc prefix:suffix ratio (15:8) resembles Linear A (17:12) more than Linear B (1-2:4-9).
- Disc has similar proportion of doubled signs as Linear A.
- Skeptical conclusion: "there are no definitive comparisons between the signs of the Phaistos disc and the syllabograms of the three known Cretan scripts."

**Relevance to our project**: Duhoux's skeptical position is documented in our `linear_a_correspondences.md` as an important caveat. His prefix:suffix analysis is directly relevant to our Phase 1 structural work — we should reproduce his counts and compare.

---

#### 8. Braović, Krstinić, Štula & Ivanda — Systematic review (2024)

- **Paper**: "A Systematic Review of Computational Approaches to Deciphering Bronze Age Aegean and Cypriot Scripts." *Computational Linguistics* 50.2 (2024): 725-779. DOI: [10.1162/coli_a_00514](https://doi.org/10.1162/coli_a_00514). [ACL Anthology](https://aclanthology.org/2024.cl-2.7/)

**Method**: Meta-review of all computational approaches to Bronze Age Aegean script decipherment. Open access: [PDF](https://aclanthology.org/2024.cl-2.7.pdf). Local copy: `phaistos_disc/references/braovic_2024_systematic_review.pdf`.

**Results**:
- Identifies **15 major challenges** in computational decipherment (Section 4, pp. 735-738).
- Proposes a computational model integrating multiple data sources and verification procedures.
- Documents the state of the art across all Aegean scripts.

**The 15 challenges mapped against our project** (extracted from Braović et al. §4):

| # | Challenge | PD applicability | Our coverage |
|---|-----------|-----------------|--------------|
| 1 | Unknown writing system and reading direction | **High**. Syllabary assumed but not proven. Direction debated. | Directionality sweep in `analyze.mjs`. Kuykendall challenge tests linguistic assumption. TODO: gather 2-4 peer-reviewed sources on direction. |
| 2 | Unknown punctuation | **Low**. Word-group dividers are clearly stamped; oblique strokes analyzed. | Addressed: 61 word-groups clearly segmented. Oblique stroke analysis in `analyze.mjs`. |
| 3 | Unknown language | **High**. Core challenge for Phase 4. | Multiple language hypotheses documented (H6-H10). Phase 4 tests Minoan, Greek, Luwian, Semitic, Proto-Finno-Ugric. |
| 4 | Small dataset size | **Critical**. 241 tokens / 45 types. Barber limit (1974). | Acknowledged as fundamental constraint. Success criteria: narrow to 2-3 surviving hypotheses, not confident translation. |
| 5 | Incomplete vocabulary | **High**. 17/45 signs are too-rare for reliable positional classification. | All 45 signs cataloged with frequencies. Comparanda (Arkalochori, Linear A) partially compensate. |
| 6 | Unknown syntactic typology | **Medium** (for Phase 4). | Not yet addressed. Will matter when testing language candidates in Phase 4. |
| 7 | Unknown morphological typology | **High**. | Partially addressed: connector candidates (Timm) may be affixes; prefix:suffix analysis (Duhoux). Phase 3 will test morphological patterns. |
| 8 | Existence of allographs | **High**. Newly confirmed: PD07/PD18 both → TI; PD19/PD33 both → SA. | Documented in `linear_a_correspondences.json` and sign catalog. TODO: resolve whether these are genuine allographs. |
| 9 | Penmanship / scribal variation | **Low**. Disc is stamped (not handwritten), minimizing this issue. | Sign rotation (ten Cate 2013) is a related concern; sign 29 shows deliberate rotation. TODO: encode rotation data. |
| 10 | Existence of exonyms | **Low** (for now). | Would matter in Phase 4 if place names are proposed (cf. Achterberg: Phaistos, Lasithi, Knossos). |
| 11 | Existence of homonyms | **Medium**. | Not yet addressed. Would matter in Phase 4 translation testing. |
| 12 | Unknown context | **Medium**. Phaistos palace context is known but limited. | Archaeological context documented in the project's internal overview document (not in the public workbench tree). No stratigraphy for the disc itself. |
| 13 | Unavailable parallel data | **High**. No Rosetta Stone equivalent. | Comparanda (Arkalochori Axe, Linear A administrative texts, CMS sealings) serve as partial substitute. Davis's homomorph analysis is a form of parallel data exploitation. |
| 14 | Unavailable digital data and corpora | **Low**. | Addressed: our Evans-number transcription, JSON datasets, plus AIDA (Revesz), SigLA (Salgarella), Daidalika signary. |
| 15 | Unavailable hardware resources | **N/A**. | Our analyses run on standard hardware in seconds (`node analyze.mjs`). |

**Summary**: 6 challenges are directly addressed, 4 are partially addressed, 3 are deferred to later phases, 2 are low-relevance for the Phaistos Disc specifically.

---

### Summary: where our project fits

| Approach | Our overlap | Our extension | Phase 4 verdict |
|---|---|---|---|
| Davis (syllabotactic) | Phase 1-2 distributional analysis | We completed Phase 3-4 (the step Davis skipped) | Directionally consistent with Davis (Minoan first, MC p = 0.0318 uniform under default sign-02 annotation; 0.0562 under sign-02 phonetic; Holm p = 0.286, FW p = 0.706, leave-PD-out filtered p = 0.261); does **not** independently reproduce Davis's p = 0.01–0.03 with the current Daidalika-derived reading and 34-entry LA corpus (our Davis-style replication: p = 0.116–0.129). |
| Owens/Coleman (LB→LA→PD) | Daidalika signary as primary correspondence source | Confidence tags, positional checks, reproducible transliteration | Minoan hypothesis supported; 3/5 signs match Owens on key phrase |
| Revesz (PFU) | Shared principle of reproducible methods | We tested 9 languages, not just one | **PFU not supported** under this test (MC p = 0.7188); prefix mismatch |
| Achterberg (Luwian) | Luwian is Phase 4 candidate | We test with Daidalika-based values | **Luwian not supported** under this test (MC p = 0.1765, Daidalika sign values); h-series gap. Achterberg's own sign-value grid has not been tested separately |
| ten Cate (rotation) | TODO: incorporate into our analysis | Rotation as positional modifier | — |
| Kuykendall (non-linguistic) | MI test confirms tripartite pattern | Phase 3-4 evidence favors linguistic hypothesis | Linguistic interpretation remains plausible and may be more parsimonious under the Daidalika-derived reading; the non-linguistic / structured-data-format hypothesis remains active and is **not** ruled out by the present test (see Section 4 of the paper) |
| Duhoux (structural) | Prefix:suffix analysis approach | Code-backed, directionality-sensitive analysis | — |
| Braović et al. (review) | Methodology checklist | Concrete implementation of their model | 8 of 15 challenges addressed |

### Phase 4 language testing results (April 2026)

All major language hypotheses from the literature have been tested. Languages 1-8 use our Daidalika-based phonetic reading; Hittite uses Rasmussen's independent sign values. The methodology is consistent across all: direct word/substring parallels, bigram/trigram overlap, Monte Carlo simulation (100K iterations), morphological pattern matching, and language-specific diagnostic patterns. Run `npm run final-comparison` *(internal CLI; not in the public workbench. The workbench's main "Run" button computes the same nine-language ranking live.)* for the full ranking.

| Rank | Language | Proponent | MC p-value | Verdict |
|------|----------|-----------|------------|---------|
| 1 | **Minoan/Linear A** | Davis, Owens | **0.0318** | **Only below α = 0.05 (uniform null, default sign-02 treatment); Holm p = 0.286, FW p = 0.706, leave-PD-out filtered p = 0.261, sign-02 phonetic treatment p = 0.0562** |
| 2 | Hittite (Rasmussen reading) | Rasmussen (2010) | 0.1012 | not significant (alt. sign values) |
| 3 | Luwian | Achterberg et al. | 0.1765 | not significant |
| 4 | Mycenaean Greek | Hempl, Faucounau | 0.6362 | not significant |
| 5 | Proto-Finno-Ugric | Revesz | 0.7188 | not significant |
| 6 | Hurrian | (no published proponent) | 0.8102 | not significant |
| 7 | West Semitic | Aartun | 0.9880 | not significant |
| 8 | Middle Egyptian | (no published proponent) | 1.0000 | worst possible |
| 9 | Etruscan/Tyrsenian | (no published proponent) | 1.0000 | worst possible |
