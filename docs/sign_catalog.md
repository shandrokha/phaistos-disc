## Sign catalog (all 45 Disc signs)

Per-sign inventory for all 45 Evans-numbered signs. Backbone for distributional classification (Phase 1) and correspondence mapping (Phase 2).

Run `npm run analyze` to regenerate frequency and positional data from the transcription.

### Positional classification logic

Signs are classified by where they appear within word-groups. This approach is methodologically aligned with **Davis's (2018, 2026)** syllabotactic analysis, which compares positional distributions of homomorphic signs across scripts. Our classification thresholds:

- **initial-biased**: >= 60% of occurrences are word-initial, and initial > final
- **final-biased**: >= 60% of occurrences are word-final, and final > initial
- **medial-biased**: >= 50% of occurrences are word-medial (neither first nor last)
- **flexible**: appears across positions without strong bias
- **too-rare**: total occurrences <= 2 (classification unreliable)

### Summary by positional class

| Class | Signs | Count |
|-------|-------|-------|
| initial-biased | 02, 22, 29 | 3 |
| final-biased | 01, 08, 35, 38 | 4 |
| medial-biased | 06, 10, 12, 13, 18, 19, 23, 24, 25, 26, 27, 31, 32, 34, 36, 37, 39, 40, 45 | 19 |
| flexible | 07, 33 | 2 |
| too-rare | 03, 04, 05, 09, 11, 14, 15, 16, 17, 20, 21, 28, 30, 41, 42, 43, 44 | 17 |

### Structural observations

- Only **3 signs** are initial-biased: 02 (19/19 initial), 22 (4/5), 29 (8/11). These may function as determinatives, logograms, or high-frequency initial syllables.
- Only **4 signs** are final-biased: 01 (7/11), 08 (4/5), 35 (7/11), 38 (3/4). These likely represent grammatical endings if the script encodes language.
- Signs 01, 18, 23, 35 are both connector candidates (Timm 2004) and final/medial-biased -- consistent with a grammatical suffix or case-ending role.
- Sign 02 is exclusively word-initial. Combined with its extreme frequency (19 occurrences), it may be a determinative or a very common syllable like a vowel.

### Tripartite classification (cf. Kuykendall)

**Kuykendall (~2024)** independently found the same tripartite partition in his positional analysis and argues it is structurally incompatible with natural language. Our data confirms his observation:

- **4 exclusively-initial signs** (appear ONLY in first position): signs 02, 22, 28, and partially 16 (strictly, 02 and 28 are 100% initial; 22 and 16 are initial-only but too-rare or nearly so).
- **26 exclusively-non-initial signs** (57.8% of inventory): never begin a group despite appearing elsewhere.
- **15 signs** appear in both domains (33.3%).

Whether this pattern indicates non-linguistic data structure (Kuykendall) or a determinative-heavy syllabic system (H5) is an open question that must be resolved before Phase 3.

### Sign rotation (ten Cate 2013 — data now encoded)

**ten Cate (2013)**, "A Statistical Analysis of the Rotated Signs of the Phaistos Disc," demonstrated via Monte Carlo simulation (30M iterations) that non-space-motivated rotations concentrate on ≤2-3 sign types with p < 0.001%. Data encoded in `comparanda/sign_rotation_ten_cate_2013.json`.

**Signs with deliberate (non-space) rotation:**

| Sign | Name | Occurrences | Rotated | Orientations observed | Interpretation |
|------|------|-------------|---------|----------------------|----------------|
| 29 | Cat head | 11 | 6 | head_right (×3), down (×1), head_left (×2), up (×2), between_up_and_left (×1), between_right_and_down (×2) | Statistically significant deliberate rotation |
| 31 | Eagle | 5 (4 listed) | 2 | head_right (×1), up (×2), head_left (×1) | Statistically significant; paper lists only 4 of 5 occurrences |
| 27 | Hide | 15 | 2 | head_down (×2, both in A29); all others head_up | Possibly space-motivated; included optionally |

**Non-rotating control:** Sign 33 (tunny/fish) — all 6 occurrences head up.

**Space-motivated rotation** (not counted as deliberate): Sign 02 in A29, Sign 03 in A31 — likely due to crowded word space.

**Conclusion:** Rotations are deliberate, not random, but their linguistic/semantic function is unknown.

### Structural observations (updated)

- Four **consensus** Linear A correspondences: PD12 → AB 78 (QE), PD19 → AB 31 (SA), PD29 → AB 80 (MA), PD31 → AB 81 (KU).
- **44/45** signs now have proposed Linear A correspondences (full Daidalika extraction); **18** at medium confidence or higher; **43** with phonetic values (matches the engine `PHONETIC` table; sign 17 has a Linear A correspondence but no phonetic value, hence the 44 → 43 gap).
- **Allograph pairs**: PD07/PD18 both → AB 37 (TI); PD19/PD33 both → AB 31 (SA). Needs resolution.
- **PD02** (plumed head): correspondence to AB 28 (I) is **disputed** — may be determinative given 100% initial restriction.

### Full sign table (Daidalika signary extraction — 44/45 coverage)

| Evans # | Total | Side A | Side B | Init | Med | Final | Class | Linear A (proposed) | Confidence | Notes |
|---------|-------|--------|--------|------|-----|-------|-------|---------------------|------------|-------|
| 01 | 11 | 6 | 5 | 1 | 3 | 7 | final-biased | AB 46 (JE) | low-medium | Connector (Timm); JE as in i-jere-ja |
| 02 | 19 | 14 | 5 | 19 | 0 | 0 | initial-biased | AB 28 (I, disputed) | low | Exclusively initial; may be determinative |
| 03 | 2 | 2 | 0 | 0 | 2 | 0 | too-rare | AB 10 (U) | low-medium | Side A only |
| 04 | 1 | 1 | 0 | 0 | 1 | 0 | too-rare | AB 48 (NWA) | low | Hapax |
| 05 | 1 | 0 | 1 | 0 | 0 | 1 | too-rare | AB 50 (PU?) | low | Hapax, speculative |
| 06 | 4 | 2 | 2 | 2 | 2 | 0 | medial-biased | AB 45/44 (DE) | low | DE as in demi-ni-ja |
| 07 | 18 | 2 | 15 | 4 | 6 | 8 | flexible | AB 37 (TI) | medium | Dominant Side B; allograph with PD18 |
| 08 | 5 | 1 | 4 | 0 | 1 | 4 | final-biased | AB 52 (NO) | low-medium | NO as in kono-so |
| 09 | 2 | 0 | 2 | 1 | 1 | 0 | too-rare | A 301 (*301/PE) | medium | 9-sign match IO Za 2 (p > 1 in 14M) |
| 10 | 4 | 4 | 0 | 2 | 2 | 0 | medial-biased | AB 79 (ZU) | medium | Side A only |
| 11 | 1 | 1 | 0 | 0 | 0 | 1 | too-rare | AB 87 (TWE) | low | TWE as in oda-twe-ta |
| 12 | 17 | 15 | 2 | 0 | 13 | 4 | medial-biased | AB 78 (QE) | **high** | CONSENSUS; part of 02-12 prefix |
| 13 | 6 | 3 | 3 | 2 | 3 | 1 | medial-biased | AB 03? (PA?) | low | Connector (Timm); '?' in Daidalika |
| 14 | 2 | 1 | 1 | 0 | 2 | 0 | too-rare | A 305 (*305?/TA?) | low | TA as in tara-nu |
| 15 | 1 | 0 | 1 | 1 | 0 | 0 | too-rare | B 12 (SO) | low-medium | SO as in toso |
| 16 | 2 | 0 | 2 | 2 | 0 | 0 | too-rare | AB 74 (ZE) | low-medium | Side B only |
| 17 | 1 | 1 | 0 | 0 | 1 | 0 | too-rare | A 322 (*322) | low | No established value |
| 18 | 12 | 6 | 6 | 0 | 7 | 5 | medial-biased | AB 37 (TI) | medium | Connector (Timm); allograph with PD07 |
| 19 | 3 | 3 | 0 | 0 | 2 | 1 | medial-biased | AB 31 (SA) | **high** | CONSENSUS; allograph with PD33 |
| 20 | 2 | 0 | 2 | 0 | 2 | 0 | too-rare | AB 60 (RA) | low-medium | Side B only |
| 21 | 2 | 2 | 0 | 0 | 0 | 2 | too-rare | B 64/H039 (SWI) | medium-high | Comb; multiple external attestations |
| 22 | 5 | 0 | 5 | 4 | 1 | 0 | initial-biased | A 318 (ZO) | low | Side B only; ZO as in zo-a |
| 23 | 11 | 5 | 6 | 1 | 9 | 1 | medial-biased | AB 06 (NA) | low-medium | Connector (Timm); Arkalochori |
| 24 | 6 | 1 | 5 | 1 | 4 | 1 | medial-biased | AB 38/A 321 (E) | low-medium | E as in e-kara. Daidalika differs from AB54 WA |
| 25 | 7 | 2 | 5 | 0 | 4 | 3 | medial-biased | AB 86 (DWA) | low | DWA as in me-dwa-ta |
| 26 | 6 | 5 | 1 | 0 | 3 | 3 | medial-biased | AB 76 (RA2/RJA) | medium | CORRECTED 2026: AB76 RA2/RJA, not AB77 KA; allograph with PD45 |
| 27 | 15 | 10 | 5 | 5 | 8 | 2 | medial-biased | AB 180/40 (WI?) | low | WI as in wi-rino |
| 28 | 2 | 2 | 0 | 2 | 0 | 0 | too-rare | AB 27 (RE) | low-medium | RE as in re-uko |
| 29 | 11 | 3 | 8 | 8 | 3 | 0 | initial-biased | AB 80 (MA) | **high** | CONSENSUS; Arkalochori; ten Cate rotation |
| 30 | 1 | 0 | 1 | 0 | 1 | 0 | too-rare | AB 13/85 (ME?/AU?) | low | Hapax |
| 31 | 5 | 5 | 0 | 2 | 3 | 0 | medial-biased | AB 81 (KU) | **high** | CONSENSUS; Side A only |
| 32 | 3 | 2 | 1 | 0 | 3 | 0 | medial-biased | AB 60? (RA2?) | low | Tentative; distinct from PD20 (RA) |
| 33 | 6 | 2 | 4 | 2 | 1 | 3 | flexible | AB 31 (SA) | medium | Fish; allograph with PD19 |
| 34 | 3 | 1 | 2 | 0 | 2 | 1 | medial-biased | AB 39 (PI) | low-medium | Mallia sealing parallel |
| 35 | 11 | 5 | 6 | 0 | 4 | 7 | final-biased | AB 04 (TE) | medium | Connector (Timm); Arkalochori |
| 36 | 4 | 0 | 4 | 0 | 4 | 0 | medial-biased | AB 30 (NI) | low-medium | Exclusively medial |
| 37 | 4 | 2 | 2 | 0 | 4 | 0 | medial-biased | AB 69 (TU) | low-medium | TU as in turo2 |
| 38 | 4 | 3 | 1 | 0 | 1 | 3 | final-biased | AB 38/A 321 (E?) | low-medium | Rosette; Phaistos impressed ware |
| 39 | 4 | 1 | 3 | 1 | 3 | 0 | medial-biased | AB 28 (I) | medium | Arkalochori mapping |
| 40 | 6 | 3 | 3 | 0 | 5 | 1 | medial-biased | AB 26/27 (RU/RE) | low-medium | Connector (Timm); 100% end/penult |
| 41 | 2 | 2 | 0 | 0 | 2 | 0 | too-rare | AB 41? (SI?) | low | Speculative |
| 42 | 1 | 0 | 1 | 0 | 1 | 0 | too-rare | AB 73 (MI?) | low | Hapax; double axe |
| 43 | 1 | 0 | 1 | 0 | 0 | 1 | too-rare | AB 66 (TA2) | low-medium | TJA as in a-sa2-ta2 |
| 44 | 1 | 1 | 0 | 0 | 1 | 0 | too-rare | AB 07 (DI) | medium | ti-DI-ti = KN Zf 31 TI-DI-TE |
| 45 | 6 | 2 | 4 | 1 | 5 | 0 | medial-biased | AB 76 (RA2/RJA) | medium | a-ke-ti-rja (needlewomen) |
