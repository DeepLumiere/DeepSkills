---
name: notes_maker
description: Generate complete, detailed, and faithful study notes from course material.
---

# Skill: Comprehensive Chapter Notes Generator

## Purpose

Generate **complete, detailed, and faithful study notes** from all provided course material for the requested chapters.

The primary goal is **coverage and completeness**. Do not aggressively summarize. The generated notes should contain essentially all academically relevant information present in the source material while reorganizing it into a clear, structured, study-friendly format.

The notes must be understandable without requiring the student to repeatedly refer back to the original slides.

**Quality bar:** the output must match the density, structure, and polish of a textbook-style reference document — numbered dictionary-style glossaries, fully specified tables (registers, pins, signals, comparisons), embedded figures with written analysis, inline worked micro-examples next to the concept they illustrate, and a `[Source: File, Slide/Page N]` tag after essentially every subsection. See Sections 33–38 for the specific formatting conventions that produce this quality bar.

---

# Core Requirements

## 1. Process ALL Available Content

For every requested chapter:

1. Read **all provided files and content** relevant to that chapter.
2. Process:

   * Lecture slides
   * PDFs
   * PPT/PPTX files
   * Handouts
   * Tables
   * Figures
   * Diagrams
   * Graphs
   * Mathematical expressions
   * Examples
   * Definitions
   * Footnotes
   * Captions
   * Speaker notes, if available
   * Text embedded inside images
3. Do not stop after reading the main slide text.
4. Cross-reference overlapping information across files.
5. If multiple sources cover the same topic, combine them without losing details.

### Completeness Rule

**Never omit information simply because it appears obvious, repetitive, introductory, or is contained inside a diagram/table.**

If information appears in the source and is relevant to understanding the chapter, include it.

---

# 2. Chapter Boundaries

Only generate notes for the chapters explicitly requested.

For each chapter:

```text
Chapter X — <Chapter Title>
```

Maintain the original chapter numbering and terminology whenever possible.

If the source material does not clearly specify a chapter number/title, infer it cautiously from the document structure and clearly mark any inference.

---

# 3. Preserve Technical Accuracy

Do not invent:

* Definitions
* Formulas
* Theorems
* Examples
* Numerical values
* Claims
* References
* Algorithms
* Conclusions

If something is unclear or unreadable in the source, explicitly write:

> [Unclear in source]

rather than guessing.

If a formula is partially readable, preserve the readable portion and flag the missing part.

---

# 4. Definitions

Every important technical term must have a definition.

Use:

### Definition: <Term>

**Meaning:**
Explain the term clearly.

**Formal definition:**
Include the precise definition when available.

**Intuition:**
Explain what it means conceptually.

**Example:**
Give the source example if one exists.

Do not replace a formal definition with only an intuitive explanation.

---

# 5. Mathematical Content

Mathematics must be preserved extremely carefully.

## Every Formula Must Be Included

Whenever a source contains:

* Equation
* Formula
* Mathematical relationship
* Probability expression
* Statistical equation
* Optimization objective
* Loss function
* Complexity expression
* Matrix equation
* Vector equation
* Derivation

include it.

Use proper LaTeX, and use **consistent delimiters everywhere in the document**:

* Display (block) math: wrap in `$$ ... $$` on its own lines.
* Inline math: wrap in single `$ ... $`.

Never use bare `[ ... ]` or `( ... )` to mean math — that renders as literal brackets in Markdown, not as an equation. Never mix `\[ \]` / `\( \)` LaTeX-native delimiters with `$$`/`$` in the same document; pick `$$`/`$` and use it throughout, since that is what most Markdown renderers (GitHub, Obsidian, Notion, VS Code preview, etc.) support out of the box.

Display example:

```markdown
$$
y = mx + c
$$
```

Inline example:

```markdown
The posterior is $P(A \mid B) = \dfrac{P(B \mid A)P(A)}{P(B)}$, derived from the definition of conditional probability.
```

Strict LaTeX & Math Formatting Rules:

* **Display Math Delimiters (`$$`):** Opening and closing `$$` delimiters MUST be left-aligned on their own lines with no preceding spaces/indentation and MUST be surrounded by blank lines. Single-line inline display math (e.g. `$$ y = mx + c $$`) is strictly forbidden as it breaks rendering engines like pymdownx.arithmatex and GitHub markdown preview.
* **Relational Math Operators (`<` and `>`):** Comparison operators like `<` and `>` MUST always be formatted inside LaTeX math blocks (e.g. `$a < b$` or `$$a > b$$`) or escaped as `&lt;` / `&gt;` when in text. Unescaped `<` or `>` in plain Markdown text can be misparsed as unclosed HTML tags.
* **LaTeX Backslash Escaping in Scripts:** When generating or inserting LaTeX equations via Python or automated tools, backslashes followed by characters like `t`, `n`, `r`, `b` (e.g., `\text`, `\times`, `\to`) MUST be double-escaped (e.g., `\\text`, `\\times`, `\\to`) so they do not get converted into ASCII tab or newline control characters.
* Every variable, subscript, and Greek letter must be in proper LaTeX commands (`\alpha`, `\sigma^2`, `\hat{y}`, `\sum_{i=1}^{n}`, `\frac{a}{b}` or `\dfrac{a}{b}` for display fractions), never plain-text approximations like `sigma^2` or `a/b`.
* Multi-line derivations use an `aligned` environment inside `$$ ... $$` so the `=` signs line up:

```markdown
$$
\begin{aligned}
Var(X) &= E[(X-\mu)^2] \\
       &= E[X^2] - \mu^2
\end{aligned}
$$
```

* Do not put math inside code fences (```` ``` ````) — code fences disable LaTeX rendering. Code fences are reserved for actual source code (see Section 17).

---

## Formula Explanation

For every important formula, provide:

### Formula

$$
\text{formula}
$$

### Where

* $x$ = ...
* $y$ = ...
* $n$ = ...

### Meaning

Explain what the formula represents.

### Conditions / Assumptions

Mention any assumptions, constraints, or conditions stated in the source.

### Example

If the source provides a numerical example, reproduce it step-by-step.

Do NOT omit variable definitions.

---

# 6. Derivations

If a derivation is present in the material:

1. Include the starting equation.
2. Include every meaningful intermediate step.
3. Explain why each transformation is performed.
4. Include the final result.

Do not compress:

```text
Step 1 → Step 2 → Step 3 → Result
```

into only the final formula.

If the slides skip intermediate mathematical steps, do not fabricate them. You may add a clearly labelled explanatory derivation only when it follows mathematically from the provided material.

---

# 7. Algorithms and Procedures

For every algorithm/procedure:

### Algorithm: <Name>

**Purpose:**
What problem it solves.

**Input:**
Required inputs.

**Output:**
Expected output.

**Procedure:**

1. Step one
2. Step two
3. Step three
4. Continue until completion

**Complexity:**

* Time: $O(...)$
* Space: $O(...)$

Only provide complexity when stated in the source or mathematically established.

**Example:**
Include examples from the material.

---

# 8. Diagrams and Figures

Do NOT ignore visual information, and do NOT describe a diagram in prose alone — **embed the actual image** so the student can see it, then explain it underneath.

## 8.1 Extract and embed the real image

1. Whenever a source file (PDF, PPTX, DOCX, etc.) contains a diagram, figure, chart, graph, screenshot, or architecture drawing, extract that image as its own file (crop it from the page/slide, or pull the embedded image asset directly) and save it into an `images/` folder alongside the notes file (e.g. `notes/images/ch3_fig2_architecture.png`).
2. Embed it in the notes using standard Markdown image syntax immediately under the figure heading:

```markdown
![Figure 2: Model Architecture](images/ch3_fig2_architecture.png)
```

3. If extracting the raw image isn't possible (e.g. the diagram is hand-drawn only in speaker notes, or the source resolution is too poor to crop cleanly), reconstruct it as a simple Mermaid diagram instead of relying on ASCII art, so it still renders visually:

```markdown
```mermaid
flowchart TD
    A[Input] --> B[Preprocessing]
    B --> C[Feature Extraction]
    C --> D[Model]
    D --> E[Prediction]
```
```

Use Mermaid `flowchart` for pipelines/processes, `classDiagram` or `erDiagram` for structural relationships, and `graph` for general node-edge relationships. Only fall back to a plain-text arrow sketch (as in older drafts of this skill) if neither image extraction nor Mermaid can represent the figure.

4. Never fabricate a diagram's content when reconstructing it — the image or Mermaid version must faithfully reproduce the same components, labels, and connections as the source. If a label is unreadable, mark it `[Unclear in source]` rather than guessing.

## 8.2 Explain every figure after embedding it

For every meaningful diagram, figure, architecture, flowchart, graph, or illustration, after the embedded image/Mermaid block, add:

### Figure: <Title / Description> [Slide/Page reference if known]

![Figure alt text](images/filename.png)

**What it shows:**
Describe the entire figure in words as well, so the notes remain useful even if images fail to load.

**Components:**

* Component 1 — explanation
* Component 2 — explanation
* Component 3 — explanation

**Flow / Relationship:**

Explain how the components interact. If arrows or directional relationships exist, explicitly describe them (e.g., "Preprocessing feeds into Feature Extraction, which feeds into the Model").

If exact labels are readable, preserve them exactly as written in the source.

---

# 9. Tables

Do not summarize tables into one sentence.

Recreate important tables in Markdown.

Example:

| Concept | Definition | Example | Important Property |
| ------- | ---------- | ------- | ------------------ |
| A       | ...        | ...     | ...                |
| B       | ...        | ...     | ...                |

Preserve all meaningful rows and columns.

If the table is too large, split it into logical sections rather than deleting information.

---

# 10. Examples

Every example in the source should be retained.

For each example:

### Example: <Name>

**Given:**

...

**Solution / Explanation:**

...

**Result:**

...

Do not remove examples merely because they repeat a concept.

Examples often contain information not explicitly stated in definitions.

---

# 11. Comparisons

Whenever the material compares concepts, explicitly preserve the comparison.

Use tables where appropriate:

| Feature       | A   | B   |
| ------------- | --- | --- |
| Definition    | ... | ... |
| Purpose       | ... | ... |
| Advantages    | ... | ... |
| Disadvantages | ... | ... |
| Complexity    | ... | ... |
| Use cases     | ... | ... |

Do not flatten nuanced differences into a single sentence.

---

# 12. Important Properties

For every major concept, extract:

* Definition
* Purpose
* Characteristics
* Properties
* Advantages
* Disadvantages
* Assumptions
* Limitations
* Applications
* Examples
* Relationships with other concepts

Only include a category when information exists or can be directly and safely derived.

---

# 13. Terminology Preservation

Use the terminology from the original material.

If the slide says:

> Principal Component Analysis (PCA)

retain:

> Principal Component Analysis (PCA)

After introducing the full term, the abbreviation may be used.

Do not unnecessarily rename concepts.

---

# 14. Cross-References

When a concept depends on another concept discussed elsewhere in the requested material, explicitly connect them.

Example:

> **Connection:** Bayes' theorem relies on conditional probability, introduced earlier in this chapter.

Cross-references should help the student understand how the material fits together.

---

# 15. Important Statements

Preserve statements such as:

* Theorem
* Lemma
* Corollary
* Law
* Principle
* Rule
* Assumption
* Observation
* Key result
* Important note
* Warning
* Limitation

Use appropriate headings.

Example:

### Theorem

**Statement:**
...

**Interpretation:**
...

**Conditions:**
...

---

# 16. Worked Numerical Problems

For every numerical problem in the source:

1. State the problem.
2. List the given values.
3. State what must be found.
4. Write the relevant formula.
5. Substitute values.
6. Perform calculations.
7. State the final answer.
8. Explain the result where useful.

Do not skip arithmetic steps when they are educationally relevant.

---

# 17. Code

If the source contains code:

* Preserve important code exactly where practical.
* Explain what the code does.
* Explain important functions/classes.
* Explain input and output.
* Explain relevant algorithms.

Do not replace code with vague descriptions.

---

# 18. External Knowledge

The notes should primarily represent the supplied material.

Do not introduce unrelated external information.

If additional explanation is necessary to make a concept understandable, clearly mark it:

> **Additional Explanation:** ...

Never present external information as though it came from the slides.

---

# 19. Handling Repetition

Do not blindly duplicate identical material.

Instead:

* Preserve the first complete explanation.
* Mention repeated appearances when relevant.
* Retain any new information added by later slides.

Example:

> **Repeated concept:** This definition was introduced earlier; this slide additionally specifies its limitation.

The goal is **zero information loss**, not unnecessary duplication.

---

# 20. Chapter Structure

Precede the first chapter with the document header/front matter block described in Section 33. Each chapter should then follow this general structure:

```markdown
# Chapter X — Title

## 1. Chapter Overview

## 2. Fundamental Concepts

## 3. Definitions

## 4. Core Concepts

## 5. Mathematical Foundations

## 6. Formulas

## 7. Derivations

## 8. Algorithms / Procedures

## 9. Examples

## 10. Diagrams and Architecture

## 11. Tables and Comparisons

## 12. Properties

## 13. Advantages and Limitations

## 14. Applications

## 15. Important Results / Theorems

## 16. Connections Between Concepts

## 17. Key Takeaways

## 18. Formula Sheet

## 19. Important Definitions

## 20. Exam-Oriented Review
```

Adapt the structure to the actual chapter.

Do not create empty sections just to follow the template.

---

# 21. Formula Sheet

At the end of every chapter, create a consolidated formula sheet.

Example:

## Formula Sheet

### 1. Formula Name

$$
F = ma
$$

Where:

* $F$ = ...
* $m$ = ...
* $a$ = ...

### 2. Formula Name

$$
...
$$

Include **every important formula appearing in the chapter**.

Do not introduce formulas that were not present unless clearly labelled as additional information.

---

# 22. Definition Sheet

At the end of every chapter:

## Definition Sheet

List all important definitions in concise form.

Example:

* **Entropy:** ...
* **Conditional Probability:** ...
* **Gradient:** ...
* **Overfitting:** ...

The detailed explanation must still appear earlier in the notes.

---

# 23. Exam-Oriented Review

At the end of each chapter, provide:

## Important Concepts

List the concepts most likely to require understanding.

## Important Definitions

List definitions that should be memorized accurately.

## Important Formulas

List formulas that should be memorized.

## Important Comparisons

List concepts that are easy to confuse.

## Important Algorithms

List algorithms/procedures that should be understood.

## Potential Questions

Generate questions based **only on the supplied material**, such as:

* Definition questions
* Explain questions
* Compare questions
* Derivation questions
* Numerical questions
* Algorithm questions
* Diagram-based questions
* Conceptual questions

Do not invent facts to create questions.

---

# 24. Source Traceability

Preserve where information came from, and do this **consistently across every subsection**, not only for formulas and figures.

Use a single consistent tag format throughout the document:

```text
[Source: <File Name>, Slide N]
[Source: <File Name>, Slides N–M]
[Source: <File Name>, Page N]
```

Place the tag on its own line immediately after the subsection it supports (a definition list, a feature list, a table, a figure's written analysis, a procedure) — see Section 34 for the full convention. This is especially important for formulas, diagrams, definitions, and numerical examples.

If exact source locations are unavailable, do not fabricate them — omit the tag rather than guessing a slide number.

---

# 25. Completeness Verification

Before finishing a chapter, perform a mental/source-level completeness audit.

Check:

### Text

* [ ] Every relevant slide/page processed
* [ ] No major paragraph skipped
* [ ] No important bullet skipped
* [ ] Notes/speaker notes checked when available

### Mathematics

* [ ] Every formula captured
* [ ] Variables defined
* [ ] Derivations preserved
* [ ] Numerical examples included

### Visuals

* [ ] Diagrams extracted as actual image files (or rebuilt in Mermaid) and embedded with `![...](images/...)`, not just described in text
* [ ] Every embedded image also has a written explanation beneath it
* [ ] Graphs interpreted
* [ ] Tables captured
* [ ] Architecture/flowcharts explained
* [ ] Text inside images captured
* [ ] Math rendered with `$...$` / `$$...$$` throughout — no bare `(...)`/`[...]` used as math delimiters

### Concepts

* [ ] Definitions included
* [ ] Properties included
* [ ] Advantages/disadvantages included
* [ ] Examples included
* [ ] Limitations included
* [ ] Applications included

### Formatting & Traceability

* [ ] Document header/front matter present at the top (Section 33)
* [ ] `[Source: File, Slide/Page N]` tag present after essentially every subsection, not only formulas/figures (Sections 24, 34)
* [ ] Quick-reference glossary used for minor terminology; full `### Definition:` blocks used for major concepts, not the reverse (Section 35)
* [ ] Figures numbered `Figure <chapter>.<n>` consistently (Section 36)
* [ ] Heading hierarchy (`#`/`##`/`###`/`####`) consistent and `---` rules separate every subsection (Section 38)

### Final Review

* [ ] Formula sheet generated
* [ ] Definition sheet generated
* [ ] Important concepts listed
* [ ] Exam questions generated
* [ ] No unsupported information introduced

---

# 26. Anti-Summarization Rule

This is critical.

**Do not optimize for shortness. Optimize for completeness, correctness, and learning value.**

Bad:

> PCA reduces dimensionality by transforming features.

Good:

> **Principal Component Analysis (PCA)** is a dimensionality-reduction technique that transforms the original variables into a new set of orthogonal variables called principal components. The first principal component captures the maximum possible variance, the second captures the maximum remaining variance subject to orthogonality with the first, and so on. Include the mathematical formulation, covariance/eigenvector interpretation, procedure, examples, and limitations if present in the source.

The second style is preferred.

---

# 27. No Silent Omissions

If information cannot be extracted:

```text
⚠️ Extraction Note:
The content in this portion of the source is not sufficiently readable to reproduce accurately.
```

Never silently omit it.

---

# 28. Final Output Quality Standard

The final notes should be:

* Complete
* Technically accurate
* Structured
* Detailed
* Self-contained
* Mathematically correct
* Easy to revise
* Faithful to the source
* Suitable for university-level examination preparation

The notes should feel like a **complete textbook-style reconstruction of the supplied chapter material**, not a short slide summary.

---

# 29. Never Substitute a Summary Report for the Actual Notes

This is a common and severe failure mode: after generating notes, Claude sometimes ends its turn with a **compressed "summary of what was generated"** — a bullet list naming the topics, formulas, and figures covered — instead of leaving the full expanded notes as the deliverable.

**This is a critical violation of the Anti-Summarization Rule (Section 26).**

### What this failure looks like

A bad final message compresses an entire figure into one line:

> • Interrupt Hierarchy & 8259 Interfacing: Priority ranking (TRAP > RST 7.5 > RST 6.5 > RST 5.5 > INTR), vector formulas (Vector Hex = N × 8₁₀), 8259 PIC handshake sequence, 3 INTA pulse cycle, and cascading up to 64 interrupts.

Every clause in that single bullet — the priority ranking, the vector formula, the handshake sequence, the INTA pulse cycle, the cascading behavior — is a **separate required section** (a Theorem/Rule block, a Formula block with Where/Meaning/Conditions, a Figure block with Components and Flow, another Figure or Procedure block) per Sections 5, 8, and 15 of this skill. Compressing them into one line is exactly the "bad" example this skill forbids in Section 26.

A bad final message also lists a chapter's coverage as a manifest ("Source Coverage: X.pdf, Y.pdf. Definitions & Terminology: A, B, C, D. Architecture Features: ...") rather than containing the actual `### Definition: A`, `### Definition: B` blocks with Meaning/Formal definition/Intuition/Example for each one.

### What must happen instead

* The chat response (or the saved file, if producing a file) **is** the full notes document — every Definition, Formula, Figure, Example, Algorithm, and Worked Problem expanded per its own template from Sections 4–17. Nothing gets left as a one-line mention "for coverage."
* A short transitional message ("Here are the complete notes for Chapters 1–4.") is fine before or after the actual content, but it must never **replace** any topic with a summary of that topic. If Claude finds itself writing a paragraph that lists five formulas by name in one sentence instead of five separate `### Formula` blocks, that is the signal to stop and expand each one properly.
* If the notes must be split across multiple messages or files due to length, each chapter must still appear in full somewhere in the output — splitting for length is fine; compressing for brevity is not.

### Self-check before ending the turn

Before finishing, re-read your own output and ask:

* Did I write "X, Y, and Z" where X, Y, Z are formulas, figures, or definitions that should each have their own expanded block? → Expand them.
* Does any paragraph read like a table of contents or a changelog ("Added coverage of...", "Source Coverage: ...") rather than actual teaching content? → Replace it with the real content.
* Could a student study directly from this output without needing to re-open the original slides? If a name is mentioned but not actually explained where it's mentioned, the answer is no — go back and expand it.

---

# 30. Pre-Generation Step: File-to-Chapter Mapping

Before writing any notes, build an explicit mapping of every provided file to the chapter(s)/topic(s) it covers, and to its **role** (see Section 31). State this mapping at the start of the response (or in a short preamble) so both the reader and Claude stay anchored to it while generating, e.g.:

```text
Chapter 1 — Introduction to Microprocessors
  Sources: 3CS526CC23 Introduction.pdf, 8085 PPT.pdf (Slides 10-11)

Chapter 2 — 8085 Architecture
  Sources: 8085 PPT.pdf (Slides 1-34)
```

If a file contains a dedicated problem set, tutorial sheet, or question bank rather than lecture slides, tag it as such in the mapping (e.g. "Problem set — integrate into Section 9 numericals" / "Question bank — integrate into Section 20 exam review") per Section 32. Do not generate separate notes per file — every file mapped to a chapter feeds into that **one** merged chapter document (this is a restatement of the merge rule already implied by Section 19, made explicit here because skipping it is a common failure).

---

# 31. Source Roles: Primary vs Supplementary Material

When the person identifies one source as primary (e.g. "faculty lecture material," "official course slides") and others as supplementary (e.g. "reference textbook," "third-party slide deck," "extra notes"), apply this precedence:

* The primary source determines terminology, notation, chapter boundaries, and which version of a concept to present when sources disagree.
* Supplementary sources are used to *fill in* what the primary source is missing: skipped explanations, absent diagrams, missing worked examples, clearer phrasing of a concept the primary source only mentions in passing. They do not override the primary source.
* **Conflict rule:** if the primary and a supplementary source disagree on a fact, value, or definition, keep the primary source's version in the main text and add a short note making the discrepancy visible rather than silently picking one:

> **Note on source discrepancy:** The reference material states X, while the primary lecture material states Y. These notes follow the primary lecture material; consult your instructor if this conflicts with what was taught.

* If the person does not specify which source is primary, treat the source that most resembles official course material (lecture slides, syllabus-numbered chapters) as primary by default, and state that assumption.

---

# 32. Dedicated Problem-Set and Question-Bank Files

Course material often arrives split across files by function rather than by chapter — a slide deck for concepts, a separate PDF of numerical problems, a separate tutorial sheet, a separate exam question bank. Treat these as first-class inputs, not afterthoughts:

* **Problem-set files:** every numerical problem contained in a dedicated problem-set file must be integrated into the relevant chapter's Worked Numerical Problems (Section 16) using the full Problem / Given / Required / Formula / Solution Steps / Final Answer structure — the same rigor as problems found inside the main slides. State the answer with correct units (e.g., Mbps, ms, %, bits) when the source gives them.
* **Tutorial and question-bank files:** questions from these files are the *primary* content of each chapter's Exam-Oriented Review (Section 23) — extract them directly (verbatim problem statements, reworded only if needed for clarity) rather than only inventing fresh ones. Generated questions (per Section 23) supplement the extracted ones; they don't replace them.
* Where a problem-set or question-bank file spans multiple chapters, split its contents by chapter using the same topic-matching logic as the lecture slides, and route each item to the correct chapter's sections.
* Never drop a numerical problem or exam question because it looks similar to another one already included — near-duplicates from a tutorial sheet often test a different parameter or edge case; include each one.

---

# 33. Document Header / Front Matter

Every notes document begins with a short metadata block before the first chapter, so the document is self-identifying and the reader can see at a glance what went into it:

```markdown
# Complete <Subject> Notes: <Course/Topic Title>

> **Course Code:** <code, if known>
> **Course Title:** <title, if known>
> **Primary Source:** <primary source description, per Section 31>
> **Files Integrated:** `file1.pdf`, `file2.pptx`, `file3.docx`

---
```

* Omit any field that genuinely cannot be determined (e.g. no course code was given) rather than inventing one.
* List every source file that was actually mapped to a chapter in "Files Integrated," matching the mapping built in Section 30.
* This header appears once at the top of the whole document, not once per chapter.

---

# 34. Inline Source-Citation Convention

To make Section 24's traceability rule concrete and consistent:

* After **every** major subsection — a terminology list, a feature list, a table, a figure's written analysis, a procedure, an interrupt/register/pin table, a comparison table — add a single `[Source: File, Slide/Page N]` line (or an N–M range) directly beneath it, separated from the next subsection by the `---` rule described in Section 38.
* When one subsection draws on more than one file or one slide range, list them comma-separated on the same tag line: `[Source: 8085 PPT, Slides 26–34]`.
* Do not repeat the tag after every single bullet inside a list — one tag per subsection is correct; only split it if different bullets in the same list come from genuinely different files.
* Formula blocks, Figure blocks, and Definition blocks keep their own tag as already specified in Sections 5, 8, and 4 respectively — Section 34 extends the same habit to every other kind of subsection (plain lists, tables, procedures) so citation density is uniform across the whole document, not concentrated only in formulas and figures.

---

# 35. Two-Tier Terminology Presentation

Real course material mixes core vocabulary (dozens of short terms that just need a clear one- or two-line explanation) with a smaller set of load-bearing concepts that deserve the full Section 4 `### Definition:` treatment. Present both tiers rather than forcing everything into one format:

* **Quick-reference glossary:** for a chapter's foundational vocabulary, use a numbered list titled something like `### Core Terminology Dictionary`, one item per term, bolded term name followed by a concise but complete explanation (including sub-bullets for related variants, e.g. Data Bus / Address Bus / Control Bus under "Bus System"). This is not a place to compress — each entry should still be a full sentence or two, not a fragment.
* **Full definition blocks:** the chapter's central concepts (the ones an exam question would ask the student to define and explain) still get the full `### Definition: <Term>` template from Section 4 (Meaning / Formal definition / Intuition / Example), placed where the concept is first properly introduced.
* A term can appear in the quick glossary early in the chapter and later receive its own full Definition block once the material develops it further — that is not duplication, it is appropriate depth progression; note the connection per Section 14 if useful.
* Never use the quick-glossary format as a substitute for a full Definition block on a term the source clearly treats as a major concept (multiple slides, a dedicated diagram, exam emphasis) — that is under-explaining a concept the Anti-Summarization Rule (Section 26) forbids compressing.

---

# 36. Figure and Table Numbering Convention

* Number figures per chapter as `Figure <chapter>.<n>` (e.g. `Figure 2.1`, `Figure 2.2`, `Figure 3.1`) in the order they appear, and use that number in both the heading and the image caption/alt text: `### Figure 2.1: 8085 Internal Architecture Block Diagram` with `![Figure 2.1: 8085 Internal Architecture Block Diagram](images/...)`.
* When two or more closely related figures are presented together (e.g. a high-level block diagram immediately followed by a detailed version of the same architecture), it is acceptable to embed both images consecutively and follow them with one shared `#### Written Analysis of ...` section covering all components across both figures, rather than forcing two separate rigid Figure blocks — as long as every component from every figure is still individually explained per Section 8.2. Use judgment: default to one Figure block per image; combine only when the figures are genuinely two views of the same thing.
* Number tables loosely the same way in the surrounding prose/heading when a chapter has several distinct tables worth distinguishing (e.g. "Comprehensive Pin Function Table," "Machine Status Signal Decoding Truth Table") — a descriptive table title is sufficient; a rigid `Table X.Y` numbering scheme is optional unless the source itself numbers its tables.

---

# 37. Inline Worked Micro-Examples

Not every worked calculation belongs in the end-of-chapter Worked Numerical Problems section (Section 16). When the source illustrates a concept with a short calculation right where the concept is introduced (e.g. computing one interrupt's vector address while explaining the interrupt table, or working out one flag's value while explaining the flag register), reproduce that calculation **inline, immediately under the concept it illustrates**, using the same rigor as Section 16 (given values, formula, substitution, result) but without necessarily repeating the full eight-part template — a compact `#### Worked Example` or `#### Worked Calculation Example` subheading with the steps and a `$$ \begin{aligned} ... \end{aligned} $$` block is sufficient.

* This is additive, not a replacement: multi-step standalone numerical problems (especially ones from a dedicated problem-set file, per Section 32) still get the full Section 16 treatment in the chapter's Worked Numerical Problems section.
* Inline micro-examples still need a source tag per Section 34 unless they are a clearly-labelled additional explanation per Section 18.

---

# 38. Visual and Structural Formatting Consistency

To keep long documents easy to scan and consistently formatted:

* Use a strict heading hierarchy: `#` for the chapter title, `##` for numbered top-level chapter sections (per Section 20's template), `###` for named subsections (a specific figure, a specific table, a definition), and `####` for finer subdivisions inside a subsection (e.g. "Written Analysis of Components" inside a figure section, or a worked example inside a concept explanation). Do not skip levels.
* **Concise Headings for TOC:** Keep `h1`, `h2`, `h3` heading titles refined and concise to avoid horizontal overflow or line wrapping in the right sidebar Table of Contents (TOC) of MkDocs.
* **Responsive Layout & Overflow Control:** Ensure tables, preformatted text blocks, long formulas, and code blocks fit standard page widths. In MkDocs custom stylesheet (`notes/stylesheets/extra.css`), elements must be configured with `overflow-x: auto` and images with `max-width: 100%` to prevent horizontal site layout breaking.
* Separate every subsection — every table, list, figure block, definition, formula, and worked example — from the next with a horizontal rule (`---`) on its own line, matching the density already implied by Sections 4–17. This is what keeps a dense, citation-heavy document visually navigable rather than a wall of text.
* Bold key terms, register/signal/pin names, and named quantities on first mention within a subsection (e.g. **Accumulator (Register A)**, $\overline{\text{RD}}$) so a student scanning the page can find them quickly.
* Keep table alignment markers consistent within a document (e.g. `:---` for left-aligned text columns, `:---:` for centered short codes/bit values) rather than mixing styles arbitrarily.

---

# 39. MkDocs Theme, Stylesheets, and Javascript Integration

To guarantee that rendered notes render MathJax formulas, Mermaid graphs, and responsive tables without layout glitches, the skill must ensure the following site files exist and follow strict configuration standards:

1. **Custom Stylesheet (`notes/stylesheets/extra.css`):**
   - Must reside at `notes/stylesheets/extra.css` as declared under `extra_css` in `mkdocs.yml`.
   - Must include responsive container wrappers (`overflow-x: auto`) for `.md-typeset table`, `.md-typeset pre`, `.arithmatex`, and `.mermaid`.
   - Must include responsive image styling (`max-width: 100%; height: auto; border-radius: 8px;`).

2. **MathJax Helper Script (`notes/javascripts/mathjax.js`):**
   - Must reside at `notes/javascripts/mathjax.js` as declared under `extra_javascript` in `mkdocs.yml`.
   - Must configure MathJax 3 inline (`$`, `\(`) and display (`$$`, `\[`) delimiters with `ignoreHtmlClass: ".*|"` and `processHtmlClass: "arithmatex"`.
   - Must hook into MkDocs instant navigation via `document$.subscribe(...)` to reset and re-trigger `MathJax.typesetPromise()` on page navigation.

---

# Priority Order

When making decisions, follow this priority:

1. **Do not lose source information**
2. **Maintain technical accuracy**
3. **Preserve formulas and mathematical meaning**
4. **Preserve diagrams/tables/examples**
5. **Organize information logically**
6. **Improve clarity**
7. **Make it exam-friendly**
8. **Only then optimize readability/conciseness**

If there is a conflict between brevity and completeness, **choose completeness**.

If there is a conflict between generic clean formatting and the specific density/citation/numbering conventions in Sections 33–38, **follow Sections 33–38** — they define what "textbook-style reconstruction" (Section 28) concretely looks like.