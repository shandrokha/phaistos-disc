## Linear A correspondences

This document tracks proposed correspondences between Phaistos Disc signs and Linear A (and Cretan Hieroglyphic) signs. These are the highest-leverage comparanda for the decipherment strategy (Phase 2) because Linear A signs carry inferred phonetic values from Linear B.

### Important caveats

1. **Linear A itself is undeciphered.** Phonetic values are inferred from Linear B via shared sign forms. This inference is well-established for some signs but tentative for others. Davis (2026) Chapters 3-5 provide the most comprehensive analysis of Linear A phonology, morphology, and orthography.
2. **The chain of inference accumulates uncertainty**: Linear B -> Linear A -> Phaistos Disc. Even if Linear B values were perfectly certain, Disc values derived through this chain remain provisional. **Duhoux (2000)** emphasizes that visual similarity does not guarantee phonetic equivalence.
3. **The skeptical position is worth noting.** Duhoux (1977, 2000) writes: "there are no definitive comparisons between the signs of the Phaistos disc and the syllabograms of the three known Cretan scripts." Godart (1995) takes a related but distinct skeptical line in *Le Disque de Phaistos*, arguing that the inter-script alignments proposed in the literature are not robust enough to support a phonetic reading. Both authors represent legitimate scholarly positions, not fringe views. **Attribution note**: the quoted sentence above is Duhoux's; an earlier draft of this document and the project's internal overview document (not in the public workbench tree) attributed it to both Duhoux and Godart. We have standardized the quote attribution to Duhoux (matching `methodology.md`); Godart is cited separately for his independent skeptical position rather than for this specific sentence.
4. All correspondences below are **hypotheses**, not facts. They are confidence-tagged per our methodology (`methodology.md`).
5. **Davis (2018)** established statistically (p = 1-3%) that PD and LA likely encode the same language, which supports using LA correspondences as a source of phonetic values -- but this does not prove that individual sign correspondences based on visual similarity are correct. Kuykendall argues the similarity could reflect shared iconographic/commodity conventions rather than phonetics.

### Scholarly context

- **Davis (2018, 2026)** provides the statistical foundation for this approach. His syllabotactic analysis demonstrates significant positional similarity between PD and LA homomorphs. His 2026 book (Chapter 8) contains the specific homomorph identifications and data tables we need for direct cross-referencing. [DOI 10.1111/ojoa.12151](https://doi.org/10.1111/ojoa.12151)
- **The Daidalika signary** (compiled and curated by Gareth Owens at TEI Crete / Hellenic Mediterranean University, with sign-form scans drawn in part from John Coleman's online comparative material, on the basis of Owens 2007 doctoral thesis and earlier work — Owens 1999) provides the most comprehensive web-published sign comparison table, matching PD signs to Linear A, Linear B, and Cretan Hieroglyphic. [PDF](https://daidalika.hmu.gr/wp-content/uploads/2020/11/signary_July2017b.pdf). NOTE: this is a website resource at `daidalika.hmu.gr`, not a peer-reviewed publication. Earlier releases of this project's documentation cited the table as "Owens & Coleman 2017"; that conflates the website (no formal publisher, no peer-review date) with a single dated publication and has been retracted (see paper §1.2). We refer to "the Daidalika signary" throughout this document. Owens has 55+ peer-reviewed articles on Linear A/B/CH (1990–2023), but his complete Phaistos Disc reading has never been published in a peer-reviewed venue. Key theoretical paper: "The Structure of the Minoan Language", *JIES* 27:1-2 (1999): 15–55. Full CV: [daidalika.hmu.gr/author/](https://daidalika.hmu.gr/author/).
- **Younger, J.G.** maintains an online Aegean scripts resource with paleographic comparisons. [Linear A texts](https://www.aegeussociety.org/en/useful_websites/linear-a-texts-in-phonetic-transcription/)
- **Evans (1909)** first noted that many disc signs compare to Minoan hieroglyphic signs.
- **Achterberg, Best & Enzler (2004)** proposed an alternative set of correspondences with Luwian Hieroglyphic (31/47 signs). Their sign-value grid serves as a comparison set for Phase 4.
- **Duhoux (1977, 2000)** provides critical analysis of the limitations of inter-script correspondence. His prefix:suffix analysis is a structural validation tool.

### Machine-readable data

The structured dataset lives at `phaistos_disc/comparanda/linear_a_correspondences.json`.

### Consensus correspondences (high confidence)

These appear consistently across multiple independent sources (Daidalika, Younger, Davis):

| Disc (Evans) | Description | Linear A (AB) | Value | Confidence |
|-------------|-------------|---------------|-------|------------|
| 12 | shield | AB 78 | QE | high (consensus) |
| 19 | human figure | AB 31 | SA | high (consensus) |
| 29 | cat head | AB 80 | MA | high (consensus) |
| 31 | eagle / large bird | AB 81 | KU | high (consensus) |

### Medium confidence correspondences

| Disc (Evans) | Description | Linear A (AB) | Value | Notes |
|-------------|-------------|---------------|-------|-------|
| 07 | helmet | AB 37 | TI | 18 occ; 2nd most frequent. Also PD18=AB37 TI (allographs?) |
| 09 | bow / wave | A 301 | *301/PE | 2 occ. 9-sign match with IO Za 2 (p > 1 in 14M) |
| 10 | arrow | AB 79 | ZU | 4 occ, Side A only |
| 18 | hair / linear | AB 37 | TI | 12 occ; connector (Timm). Shares AB37 with PD07 |
| 21 | comb | B 64 / H039 | SWI | 2 occ; multiple external attestations |
| 33 | fish / tuna | AB 31 | SA | 6 occ; parallels PD19. -re-SA endings cross-textual |
| 35 | plane tree | AB 04 | TE | 11 occ, final-biased; connector (Timm). Arkalochori |
| 39 | tiara / crested head | AB 28 | I | 4 occ. Sources assign AB28 here (not PD02) |
| 44 | geometric | AB 07 | DI | Hapax; ti-DI-ti = KN Zf 31 TI-DI-TE cross-validates |
| 45 | geometric | AB 76 | RA2 (RJA) | 6 occ; consistent scholarly agreement |

### Lower confidence correspondences

| Disc (Evans) | Description | Linear A (AB) | Value | Notes |
|-------------|-------------|---------------|-------|-------|
| 01 | walking figure | AB 46 | JE | 11 occ, final-biased. JE as in i-jere-ja |
| 02 | plumed head | AB 28 (disputed) | I (disputed) | 19 occ, exclusively initial. May be determinative |
| 03 | uncrested head | AB 10 | U | 2 occ; multiple LA parallels |
| 04 | captive / bound | AB 48 | NWA | Hapax |
| 05 | child | AB 50 | PU? | Hapax. Speculative |
| 06 | woman / goddess | AB 45/44 | DE | 4 occ. DE as in demi-ni-ja |
| 08 | gauntlet | AB 52 | NO | 5 occ, final-biased. NO as in kono-so |
| 11 | slack bow | AB 87 | TWE | Hapax. TWE as in oda-twe-ta |
| 13 | shield variant | AB 03? | PA? | 6 occ; connector (Timm). Daidalika marks '?' |
| 14 | mattock | A 305/AB 59 | *305?/TA? | 2 occ. TA as in tara-nu |
| 15 | saw / axe | B 12 | SO | Hapax. SO as in toso |
| 16 | lid / seal | AB 74 | ZE | 2 occ, Side B only |
| 17 | plant / feather | A 322 | *322 | Hapax. No established value |
| 20 | geometric | AB 60 | RA | 2 occ, Side B only |
| 22 | grain / wheat | A 318 | ZO | 5 occ, initial-biased, Side B only |
| 23 | column / flame | AB 06 | NA | 11 occ, medial; Daidalika resolves AB05/06 ambiguity |
| 24 | sistrum / beehive | AB 38/A 321 | E | 6 occ. Daidalika differs from earlier AB54 WA |
| 25 | ship | AB 86 | DWA | 7 occ. DWA as in me-dwa-ta |
| 26 | horn / abstract geometric | AB 76 | RA2 (RJA) | 6 occ. CORRECTED 2026-04: was misextracted as AB77=KA. Daidalika signary + Owens transliteration confirm AB76=RJA. |
| 27 | hide / skin | AB 180/40 | WI? | 15 occ. WI as in wi-rino. Kuykendall: commodity? |
| 28 | linear | AB 27 | RE | 2 occ, Side A only |
| 30 | ram / animal | AB 13/85 | ME?/AU? | Hapax |
| 32 | dove / bird | AB 60? | RA? | 3 occ. Tentative |
| 34 | mason's mark | AB 39 | PI | 3 occ. Paralleled by Mallia sealing |
| 36 | olive branch | AB 30 | NI | 4 occ, exclusively medial |
| 37 | bone? | AB 69 | TU | 4 occ. TU as in turo2 |
| 38 | rosette / flower | AB 77 | KA | 4 occ, final-biased. CORRECTED 2026-04: was misextracted as AB38/A321=E?. Daidalika confirms AB77=KA. |
| 40 | linear | AB 26/27 | RU/RE | 6 occ, medial-biased |
| 41 | sickle | AB 41? | SI? | 2 occ. Speculative |
| 42 | double axe | AB 73 | MI? | Hapax |
| 43 | strainer | AB 66 | TA2 (TJA) | Hapax |

### Allograph note

Three pairs of signs share the same AB mapping in the Daidalika signary: PD07/PD18 → AB 37 (TI), PD19/PD33 → AB 31 (SA), PD26/PD45 → AB 76 (RJA). Deep distributional analysis (`npm run allograph-analysis` *(internal CLI; not in the public workbench. The workbench's "Allograph Analysis" card in the Extended Analysis section reports the live cosine similarities.)*) shows:

- **PD07/PD18 (TI)**: cosine similarity = 0.885 → **strong allograph support**. However, PD07 appears in initial/medial/final positions while PD18 never appears initially. This suggests a *conditioned* allograph: PD07 is the general form, PD18 is restricted to non-initial contexts. Owens reads PD18 as RJU (Palmer's value) to avoid redundancy — our distributional evidence supports this distinction.
- **PD19/PD33 (SA)**: cosine similarity = 0.598 → **weak support**. Zero shared predecessors or successors. These likely represent distinct signs despite both being mapped to AB 31 in the Daidalika signary.
- **PD26/PD45 (RJA)**: cosine similarity = 0.693 → **moderate support**. PD26 appears medially and finally (always preceded by KU); PD45 appears medially and initially (always followed by TI). Strong positional complementarity — possible conditioned allograph (PD26 in post-KU context, PD45 in pre-TI context).

### Coverage

- **44 of 45 signs** now have proposed correspondences (up from 27). The 45th "sign" (oblique stroke) is a modifier.
- **4 signs** have high-confidence consensus correspondences.
- **18 signs** have medium or higher confidence.
- **43 signs** have proposed phonetic values.
- Source: primarily the Daidalika signary (Owens, Hellenic Mediterranean University; web-published at `daidalika.hmu.gr`), the most comprehensive comparison table currently available.

### Owens transliteration (testable claim)

The Daidalika signary provides a complete transliteration. Key testable claims:
- Side A opens with **I-QE-PA-JE-RJU** and repeats **I-QE-KU-RJA** three times.
- Side B contains **I-*301-WI-JE AU-NI-TI-NO AU-NO-PA...** which parallels Linear A IO Za 2 with a claimed probability > 1 in 14 million for the 9-sign match.
- These can be tested against our structural constraints (positional profiles, directionality sensitivity).

### Positional compatibility check

Proposed phonetic values should be compatible with the sign's positional profile (cf. Davis 2018 syllabotactic method):

- **Sign 02** (disputed I): exclusively initial (19/19). If determinative, the lack of clear AB correspondence makes sense.
- **Sign 07** (proposed TI): flexible (init 4, med 6, final 8). TI is a high-frequency syllable compatible with appearing across positions.
- **Sign 29** (consensus MA): initial-biased (8/11). A CV syllable appearing mostly word-initially is plausible.
- **Sign 35** (proposed TE): final-biased (7/11). Consistent with case endings.
- **Sign 12** (consensus QE): medial-biased (13/17). Consistent with a frequent medial syllable.
- **Sign 18** (proposed TI): medial-biased with end/penult tendency. Compatible with a common syllable. NOTE: same value as PD07; allograph hypothesis needs testing.

### Comparison with Achterberg et al. (Luwian correspondences)

Achterberg, Best & Enzler (2004) proposed an alternative set of 31 sign correspondences with Luwian Hieroglyphic. Where their assignments overlap with the Linear A-based assignments above, agreement would strengthen confidence; where they diverge, the competing values can be tested in Phase 4. TODO: catalog their full sign-value grid.

### Next steps

1. **Acquire Davis (2026) Chapter 8** to cross-reference specific homomorph identifications against our Daidalika-based correspondences.
2. ~~**Test the Owens transliteration**~~ → **DONE**: `npm run validate` *(internal CLI; not in the public workbench)* confirmed I-QE-KU-RJA in expected positional slots. `npm run phonetic` *(internal CLI; not in the public workbench)* shows 3/5 signs match Owens for Side A word 1.
3. ~~**Test phonotactic plausibility**~~ → **DONE**: `npm run phonetic` *(internal CLI; not in the public workbench)* produces 100% CV/V syllables across 241 tokens. `npm run validate` *(internal CLI; not in the public workbench)* shows 100% positional consistency.
4. Catalog Achterberg et al.'s Luwian sign-value grid for comparison.
5. Cross-reference correspondences with Younger's paleographic analysis for independent validation.
6. ~~Resolve allograph question~~ → **DONE** (`npm run allograph-analysis` *(internal CLI; not in the public workbench. The workbench's "Allograph Analysis" card in the Extended Analysis section reports the live cosine similarities.)*): PD07/PD18 cosine = 0.885 (strong conditioned allograph — PD07 appears initially, PD18 does not). PD19/PD33 cosine = 0.598 (weak — likely distinct signs). Merging collapses 0 word-forms.

### SigLA cross-reference (April 2026)

The SigLA database (`https://sigla.phis.me/`) provides an independent catalog of Linear A signs with paleographic variants and attestation data. We cross-referenced all 45 Daidalika PD→LA correspondences against SigLA's sign list (screenshots archived in `assets/`).

**Coverage**: Of our 45 correspondences, 34 reference standard AB-series signs (AB 01–AB 188) which are all present in SigLA's "Simple signs" catalog. The remaining 11 reference composite signs (A 301, A 305, A 318, A 321, A 322, A 363) or high-numbered signs (AB 180) which appear in SigLA's "Composite signs" section.

**Key findings**:

| Status | Signs | Notes |
|--------|-------|-------|
| **Present in SigLA Simple** | AB 03, 04, 06, 07, 10, 13, 26, 27, 28, 30, 31, 37, 38, 39, 40, 41, 45, 46, 48, 50, 52, 57, 59, 60, 66, 69, 73, 74, 76, 77, 78, 79, 80, 81, 85, 86, 87 | All standard AB signs we reference are documented in SigLA |
| **Present in SigLA Composite** | A 301, A 305, A 318, A 321, A 322, A 363 | Composite signs used for 6 rarer PD correspondences |
| **Consensus signs confirmed** | AB 78 (QE), AB 31 (SA), AB 80 (MA), AB 81 (KU) | All four consensus PD→LA correspondences reference signs present in SigLA |

**Limitation**: SigLA provides sign drawings and attestation data but does not itself assert PD→LA correspondences. The cross-reference confirms that all AB signs we reference are real, documented Linear A signs — it does not independently validate the visual similarity claims made by Owens/Daidalika. That requires paleographic comparison at higher resolution, or acquisition of Davis (2026) Chapter 8 homomorph data.

### Phase 4 testing

The Linear A correspondences were tested under Phase 4 language testing (April 2026). Phonetic values derived from these correspondences produce a reading that shows **statistically significant overlap with known Linear A vocabulary** under the uniform null and default sign-02-as-determinative annotation (MC p = 0.0318, 9 shared bigrams, 17 word-level parallels). However, this result does not survive Holm-Bonferroni correction for nine simultaneous tests (Holm p = 0.286), the frequency-weighted null model (FW p = 0.706), the leave-PD-inspired-out ablation (filtered MC p = 0.261), or the alternative phonetic treatment of sign 02 (Minoan p = 0.0562); much of the remaining overlap is attributable to frequency correlation (FW circularity p = 0.365). The result is consistent with the correspondences being linguistically meaningful under one specific test, not robust independent confirmation. Eight competing language hypotheses (Greek, Luwian, Semitic, PFU, Egyptian, Hurrian, Etruscan, Hittite/Rasmussen) all fail the same test, confirming that the overlap is specific to Minoan/Linear A.
