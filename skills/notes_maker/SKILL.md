---
name: notes_maker
description: Generate complete, detailed, and faithful study notes from course material.
---

# Skill: Comprehensive Chapter Notes Generator

## Purpose

Generate **complete, detailed, and faithful study notes** from all provided course material for the requested chapters.

The primary goal is **coverage and completeness**. Do not aggressively summarize. The generated notes should contain essentially all academically relevant information present in the source material while reorganizing it into a clear, structured, study-friendly format.

The notes must be understandable without requiring the student to repeatedly refer back to the original slides.

**Quality bar:** the output must match the density, structure, and polish of a textbook-style reference document — numbered dictionary-style glossaries, fully specified tables (registers, pins, signals, comparisons), embedded figures with written analysis, inline worked micro-examples next to the concept they illustrate, and a `[Source: File, Slide/Page N]` tag after essentially every subsection. See Sections 33–40 for the specific formatting conventions that produce this quality bar.

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
   * **Embedded iframes** (video links, interactive embeds — extract the URL, title, and any visible caption; see Section 40)
3. Do not stop after reading the main slide text.
4. Cross-reference overlapping information across files.
5. If multiple sources cover the same topic, combine them without losing details.

### Completeness Rule

**Never omit information simply because it appears obvious, repetitive, introductory, or is contained inside a diagram/table/iframe.**

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

# 4. Abbreviations and Acronyms — MANDATORY EXPANSION

Every abbreviation, acronym, or initialism **must be expanded on its first use** within a chapter. After the first expansion, the short form may be used freely.

**Rule:** Write the full term followed by the abbreviation in parentheses:
> Principal Component Analysis (PCA)

Never introduce an abbreviation in isolation without its expansion — not even "well-known" ones like RAM, CPU, OS, etc. — because what is obvious to the writer may not be obvious to a student under exam stress.

### Abbreviation Index (per chapter)

At the end of each chapter, produce a consolidated **Abbreviation / Acronym Index** table:

| Abbr. | Full Form | Brief Meaning |
| :---- | :-------- | :------------ |
| PCA   | Principal Component Analysis | Dimensionality-reduction technique |
| …     | …         | … |

Include **every** abbreviation used in that chapter's notes. This index lives before the Formula Sheet and Definition Sheet.

---

# 5. Definitions

Every important technical term must have a definition.

Use:

### Definition: <Term> (Abbreviation if any)

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

# 6. Mathematical Content

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

### Strict LaTeX & Math Formatting Rules

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

* Do not put math inside code fences (```` ``` ````) — code fences disable LaTeX rendering. Code fences are reserved for actual source code (see Section 18).

---

## Formula Block Template

For every important formula, present it as a **self-contained formula block** using this exact structure:

---

### Formula: <Descriptive Formula Name>

$$
\text{formula here}
$$

#### Symbol Definitions

| Symbol | Meaning | Units / Range |
| :----- | :------ | :------------ |
| $x$    | …       | …             |
| $y$    | …       | …             |

#### What It Represents
One to three sentences explaining what physical/mathematical relationship this formula captures.

#### Conditions / Assumptions
- Assumption or constraint 1
- Assumption or constraint 2

#### Worked Example *(if source provides one)*

**Given:** …
**Find:** …
**Solution:**
$$
\begin{aligned}
&\text{Step 1: substitute values} \\
&\text{Step 2: simplify} \\
&\text{Result: } y = \ldots
\end{aligned}
$$

[Source: <File>, Slide/Page N]

---

Do NOT omit symbol definitions — every variable must be explained in the table above. Never describe a formula in prose and omit the LaTeX block.

---

# 7. Derivations

If a derivation is present in the material:

1. State the **starting equation** in a display block.
2. Include **every meaningful intermediate step** in an `aligned` block.
3. After each step, add a short inline or bullet explanation of *why* that transformation was performed.
4. State the **final result** clearly with a heading: `**Result:**`.

Use this structure:

---

### Derivation: <Name>

**Goal:** One sentence describing what we are deriving and why.

**Starting point:**

$$
\text{starting equation}
$$

**Step-by-step:**

$$
\begin{aligned}
\text{expression}_1 &= \text{expression}_2 && \text{(reason/rule applied)} \\
                    &= \text{expression}_3 && \text{(reason/rule applied)} \\
                    &= \text{final result}
\end{aligned}
$$

**Result:**

$$
\text{final result}
$$

**Interpretation:** What does this result mean practically or theoretically?

[Source: <File>, Slide/Page N]

---

Do not compress a derivation into: `Step 1 → Step 2 → Step 3 → Result`. Never fabricate intermediate steps — if the slides skip steps, note this explicitly:

> **Note:** The source skips intermediate steps between [equation A] and [equation B]. The mathematical path is not reproduced here to avoid fabrication.

---

# 8. Algorithms and Procedures

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

# 9. Diagrams and Figures

Do NOT ignore visual information, and do NOT describe a diagram in prose alone — **embed the actual image** so the student can see it, then explain it underneath.

## 9.1 Extract and embed the real image

1. Whenever a source file (PDF, PPTX, DOCX, etc.) contains a diagram, figure, chart, graph, screenshot, or architecture drawing, extract that image as its own file (crop it from the page/slide, or pull the embedded image asset directly) and save it into an `images/` folder alongside the notes file (e.g. `notes/images/ch3_fig2_architecture.png`).
2. Embed it in the notes using standard Markdown image syntax immediately under the figure heading:

```markdown
![Figure 2: Model Architecture](images/ch3_fig2_architecture.png)
```

3. If extracting the raw image isn't possible (e.g. the diagram is hand-drawn only in speaker notes, or the source resolution is too poor to crop cleanly), reconstruct it as a **Mermaid diagram** instead — see Section 9.3 for Mermaid structure rules.

4. Never fabricate a diagram's content when reconstructing it — the image or Mermaid version must faithfully reproduce the same components, labels, and connections as the source. If a label is unreadable, mark it `[Unclear in source]` rather than guessing.

## 9.2 Explain every figure after embedding it

For every meaningful diagram, figure, architecture, flowchart, graph, or illustration, after the embedded image/Mermaid block, add:

### Figure <chapter>.<n>: <Title / Description> [Slide/Page reference if known]

![Figure alt text](images/filename.png)

**What it shows:**
Describe the entire figure in words as well, so the notes remain useful even if images fail to load.

**Components:**

* **Component 1** — explanation of what it does and why it matters
* **Component 2** — explanation
* **Component 3** — explanation

**Flow / Relationship:**

Explain how the components interact. If arrows or directional relationships exist, explicitly describe them step by step (e.g., "Input → Preprocessing: raw data is cleaned and normalized. Preprocessing → Feature Extraction: cleaned data has relevant features selected. Feature Extraction → Model: features are passed to the classifier for training.").

**Key observations:**
- Bullet any non-obvious facts the diagram illustrates that aren't stated in the main text.

If exact labels are readable, preserve them exactly as written in the source.

[Source: <File>, Slide/Page N]

---

## 9.3 Mermaid Diagram Structure Rules

When reconstructing a diagram as Mermaid, follow these rules:

### Choosing the Right Diagram Type

| Source Diagram Type | Mermaid Diagram Type |
| :------------------ | :------------------- |
| Pipeline / process flow | `flowchart TD` (top-down) or `flowchart LR` (left-right) |
| State machine / FSM | `stateDiagram-v2` |
| Class hierarchy / OOP | `classDiagram` |
| Database / ER schema | `erDiagram` |
| Sequence of calls / protocol | `sequenceDiagram` |
| General node–edge graph | `graph TD` |
| Numerical/trend chart | `xychart-beta` |

**Never use unsupported Mermaid types** (e.g. `timeline`, `gantt`, `mindmap` — these are not reliably rendered). For timelines or roadmaps, use a `flowchart LR` with time-labelled nodes or a Markdown table instead.

### Mermaid Syntax Rules (prevent broken renders)

1. **Quote labels with special characters:** Node labels containing `()`, `[]`, `/`, `:`, or `&` must be quoted:
   ```
   id["Label (with parens)"]
   id["Read/Write"]
   ```
2. **No HTML tags inside labels:** Use plain text only. Do not write `<b>`, `<br>`, `<i>` inside Mermaid node labels.
3. **No bare `<` or `>` in edge labels:** Escape or rephrase — e.g., use `>= threshold` or quote the edge label.
4. **Direction consistency:** Pick one direction (`TD` or `LR`) per diagram and stick to it. Do not mix.
5. **Subgraphs for grouped components:** Use `subgraph <Name>` / `end` to group related nodes (e.g., a CPU's internal units).
6. **Consistent node IDs:** Use short, descriptive IDs without spaces. Prefer `camelCase` or `snake_case`.

### Mermaid Code Fence Syntax

Always open Mermaid blocks with exactly four backticks to allow nesting inside markdown, **or** use three backticks at the top level:

````markdown
```mermaid
flowchart TD
    A["Input Data"] --> B["Preprocessing"]
    B --> C["Feature Extraction"]
    C --> D["Model"]
    D --> E["Prediction"]
```
````

After the Mermaid block, always follow with a written explanation per Section 9.2 — never rely on the diagram alone.

---

# 10. Tables

Do not summarize tables into one sentence.

Recreate important tables in Markdown, with **descriptive column headers** and **alignment markers**:

- Left-align text columns: `:---`
- Center-align short codes or bit values: `:---:`
- Right-align numeric values: `---:`

Example:

| Concept | Definition | Example | Important Property |
| :------ | :--------- | :------ | :----------------- |
| A       | …          | …       | …                  |
| B       | …          | …       | …                  |

Preserve all meaningful rows and columns.

If the table is too large, split it into logical sections with a heading per section, rather than deleting information.

Every table must be followed by a brief **"Table Notes"** bullet list if any column values need clarification or are abbreviated.

---

# 11. Examples

Every example in the source should be retained.

For each example:

### Example: <Name>

**Given:**

…

**Solution / Explanation:**

…

**Result:**

…

Do not remove examples merely because they repeat a concept.

Examples often contain information not explicitly stated in definitions.

---

# 12. Comparisons

Whenever the material compares concepts, explicitly preserve the comparison.

Use tables where appropriate:

| Feature       | A   | B   |
| :------------ | :-- | :-- |
| Definition    | … | … |
| Purpose       | … | … |
| Advantages    | … | … |
| Disadvantages | … | … |
| Complexity    | … | … |
| Use cases     | … | … |

Do not flatten nuanced differences into a single sentence.

---

# 13. Important Properties

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

# 14. Terminology Preservation

Use the terminology from the original material.

If the slide says:

> Principal Component Analysis (PCA)

retain:

> Principal Component Analysis (PCA)

After introducing the full term, the abbreviation may be used.

Do not unnecessarily rename concepts.

---

# 15. Cross-References

When a concept depends on another concept discussed elsewhere in the requested material, explicitly connect them.

Example:

> **Connection:** Bayes' theorem relies on conditional probability, introduced earlier in this chapter.

Cross-references should help the student understand how the material fits together.

---

# 16. Important Statements

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
…

**Interpretation:**
…

**Conditions:**
…

---

# 17. Worked Numerical Problems

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

# 18. Code

If the source contains code:

* Preserve important code exactly where practical.
* Explain what the code does.
* Explain important functions/classes.
* Explain input and output.
* Explain relevant algorithms.

Do not replace code with vague descriptions.

---

# 19. External Knowledge

The notes should primarily represent the supplied material.

Do not introduce unrelated external information.

If additional explanation is necessary to make a concept understandable, clearly mark it:

> **Additional Explanation:** …

Never present external information as though it came from the slides.

---

# 20. Handling Repetition

Do not blindly duplicate identical material.

Instead:

* Preserve the first complete explanation.
* Mention repeated appearances when relevant.
* Retain any new information added by later slides.

Example:

> **Repeated concept:** This definition was introduced earlier; this slide additionally specifies its limitation.

The goal is **zero information loss**, not unnecessary duplication.

---

# 21. Content Flow and Structure Anti-Patterns — CRITICAL

This section defines the **structural rules that govern how information is presented** within each section of the notes. Violations of these rules are the primary reason notes feel like "dump of bullets" rather than coherent study material.

## 21.1 The Flow Rule — Every Section Must Have a Narrative Spine

Each major section (`##`) must open with **1–3 sentences of connecting prose** that:
- State what this section covers.
- Explain *why* this concept matters or *where it fits* in the broader topic.
- Transition logically from the preceding section.

This connecting prose is **not** a summary. It is a signpost. After it, the bullets/tables/formulas follow.

**Bad (no spine, no flow):**
```
## 3. Memory Mapping
- 16-bit address bus
- 64KB addressable space
- ROM at 0000H–1FFFH
- RAM at 2000H–3FFFH
```

**Good (spine + structured detail):**
```
## 3. Memory Mapping

The 8085's 16-bit address bus gives it a $2^{16} = 65536$ byte (64 KB) addressable space.
This space is partitioned between ROM (for fixed program code) and RAM (for variable data),
with specific address ranges assigned at design time.

**Address Space Partition:**

| Region | Start  | End    | Size  | Type | Purpose              |
| :----- | :----- | :----- | :---- | :--- | :------------------- |
| ROM    | 0000H  | 1FFFH  | 8 KB  | ROM  | Program storage      |
| RAM    | 2000H  | 3FFFH  | 8 KB  | RAM  | Data / stack         |
| I/O    | 4000H  | 7FFFH  | 16 KB | I/O  | Peripheral mapping   |
```

## 21.2 Bullet Hierarchy Rules

Bullets are required for lists of items. But they must be **hierarchical and informative**, not flat fragments:

- **Level 1 bullets (`-`):** one item/concept per bullet, with a **bolded term** followed by `—` and a complete explanation sentence.
- **Level 2 bullets (` - ` with indent):** sub-properties, sub-steps, or qualifications of the parent bullet.
- **Level 3 bullets (max):** used only for enumerating sub-variants (e.g., specific register bits or flag states).

**Bad (flat, fragmentary):**
```
- 16-bit register
- Stores address
- Used by CPU
```

**Good (hierarchical, informative):**
```
- **Program Counter (PC)** — a 16-bit register that always holds the memory address of the *next instruction* to be fetched.
  - Automatically incremented by the CPU after each fetch cycle.
  - Can be loaded with a jump target address by branch/call instructions.
  - Value at reset: `0000H` (execution always begins at address 0).
```

## 21.3 No Long Prose Paragraphs Without Structure

Do not write paragraphs of 5+ sentences that describe multiple distinct concepts. Instead:

1. Write **one connecting sentence** introducing the concept group.
2. Break each concept into its own **bullet, sub-section, table row, or formula block**.
3. If a paragraph is unavoidable (e.g., a narrative explanation of a process), limit it to **3–4 sentences max**, then follow with bullets or a table summarizing the key points.

## 21.4 Transition Sentences Between Sections

When moving from one `##` section to the next, write a one-sentence transition (or place the transition at the **opening** of the next section). This prevents the notes from reading as disconnected topic dumps.

Example (opening of a new section):
> Having established the architecture's register set, we now examine how the 8085 communicates with memory and I/O devices through its **bus system**.

## 21.5 Exam-Critical Detail Rule

Every concept that is **likely to appear in an exam question** must include:
- A precise, quotable **definition** (not just an intuitive description).
- The **formula or procedure**, if applicable.
- At least **one concrete example** (numerical or named).
- A **"Why it matters / Exam angle"** note where the concept is non-obvious.

Mark these with a callout:

> **📝 Exam Note:** This concept frequently appears as a definition question. Know the exact definition and be able to distinguish it from [related concept].

---

# 22. Chapter Structure

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

## 18. Abbreviation / Acronym Index

## 19. Formula Sheet

## 20. Definition Sheet

## 21. Exam-Oriented Review
```

Adapt the structure to the actual chapter.

Do not create empty sections just to follow the template.

---

# 23. Formula Sheet

At the end of every chapter, create a consolidated formula sheet.

Example:

## Formula Sheet

### 1. Formula Name

$$
F = ma
$$

| Symbol | Meaning | Units |
| :----- | :------ | :---- |
| $F$    | Force   | N     |
| $m$    | Mass    | kg    |
| $a$    | Acceleration | m/s² |

### 2. Formula Name

$$
\ldots
$$

Include **every important formula appearing in the chapter**.

Do not introduce formulas that were not present unless clearly labelled as additional information.

---

# 24. Definition Sheet

At the end of every chapter:

## Definition Sheet

List all important definitions in concise form.

Example:

* **Entropy:** …
* **Conditional Probability:** …
* **Gradient:** …
* **Overfitting:** …

The detailed explanation must still appear earlier in the notes.

---

# 25. Exam-Oriented Review

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

# 26. Source Traceability

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

# 27. Completeness Verification

Before finishing a chapter, perform a mental/source-level completeness audit.

Check:

### Text

* [ ] Every relevant slide/page processed
* [ ] No major paragraph skipped
* [ ] No important bullet skipped
* [ ] Notes/speaker notes checked when available

### Mathematics

* [ ] Every formula captured
* [ ] Variables defined in Symbol Definition table
* [ ] Derivations preserved with intermediate steps
* [ ] Numerical examples included
* [ ] Conditions/assumptions stated

### Visuals

* [ ] Diagrams extracted as actual image files (or rebuilt in Mermaid per Section 9.3) and embedded with `![...](images/...)`, not just described in text
* [ ] Every embedded image also has a written explanation beneath it (Components + Flow per Section 9.2)
* [ ] Graphs interpreted
* [ ] Tables captured with alignment markers
* [ ] Architecture/flowcharts explained with flow description
* [ ] Text inside images captured
* [ ] Math rendered with `$...$` / `$$...$$` throughout — no bare `(...)`/`[...]` used as math delimiters
* [ ] iframes noted and logged (Section 40)

### Concepts

* [ ] Definitions included (with formal definition, intuition, example)
* [ ] Properties included
* [ ] Advantages/disadvantages included
* [ ] Examples included
* [ ] Limitations included
* [ ] Applications included
* [ ] All abbreviations expanded on first use

### Flow & Structure

* [ ] Every section opens with 1–3 sentence connecting prose (Section 21.1)
* [ ] Bullets are hierarchical, not flat fragments (Section 21.2)
* [ ] No long unbroken prose paragraphs (Section 21.3)
* [ ] Transition sentences present between major sections (Section 21.4)
* [ ] Exam-critical concepts flagged with 📝 Exam Note (Section 21.5)

### Formatting & Traceability

* [ ] Document header/front matter present at the top (Section 33)
* [ ] `[Source: File, Slide/Page N]` tag present after essentially every subsection (Sections 26, 34)
* [ ] Quick-reference glossary used for minor terminology; full `### Definition:` blocks used for major concepts (Section 35)
* [ ] Figures numbered `Figure <chapter>.<n>` consistently (Section 36)
* [ ] Heading hierarchy (`#`/`##`/`###`/`####`) consistent and `---` rules separate every subsection (Section 38)

### Final Review

* [ ] Abbreviation / Acronym Index generated (Section 4)
* [ ] Formula sheet generated
* [ ] Definition sheet generated
* [ ] Important concepts listed
* [ ] Exam questions generated
* [ ] No unsupported information introduced

---

# 28. Anti-Summarization Rule

This is critical.

**Do not optimize for shortness. Optimize for completeness, correctness, and learning value.**

Bad:

> PCA reduces dimensionality by transforming features.

Good:

> **Principal Component Analysis (PCA)** is a dimensionality-reduction technique that transforms the original variables into a new set of orthogonal variables called principal components. The first principal component captures the maximum possible variance, the second captures the maximum remaining variance subject to orthogonality with the first, and so on. Include the mathematical formulation, covariance/eigenvector interpretation, procedure, examples, and limitations if present in the source.

The second style is preferred.

---

# 29. No Silent Omissions

If information cannot be extracted:

```text
⚠️ Extraction Note:
The content in this portion of the source is not sufficiently readable to reproduce accurately.
```

Never silently omit it.

---

# 30. Final Output Quality Standard

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

# 31. Never Substitute a Summary Report for the Actual Notes

This is a common and severe failure mode: after generating notes, Claude sometimes ends its turn with a **compressed "summary of what was generated"** — a bullet list naming the topics, formulas, and figures covered — instead of leaving the full expanded notes as the deliverable.

**This is a critical violation of the Anti-Summarization Rule (Section 28).**

### What this failure looks like

A bad final message compresses an entire figure into one line:

> • Interrupt Hierarchy & 8259 Interfacing: Priority ranking (TRAP > RST 7.5 > RST 6.5 > RST 5.5 > INTR), vector formulas (Vector Hex = N × 8₁₀), 8259 PIC handshake sequence, 3 INTA pulse cycle, and cascading up to 64 interrupts.

Every clause in that single bullet — the priority ranking, the vector formula, the handshake sequence, the INTA pulse cycle, the cascading behavior — is a **separate required section** (a Theorem/Rule block, a Formula block with Symbol Definitions table/Meaning/Conditions, a Figure block with Components and Flow, another Figure or Procedure block) per Sections 6, 9, and 16 of this skill. Compressing them into one line is exactly the "bad" example this skill forbids in Section 28.

### What must happen instead

* The chat response (or the saved file, if producing a file) **is** the full notes document — every Definition, Formula, Figure, Example, Algorithm, and Worked Problem expanded per its own template from Sections 5–18. Nothing gets left as a one-line mention "for coverage."
* A short transitional message ("Here are the complete notes for Chapters 1–4.") is fine before or after the actual content, but it must never **replace** any topic with a summary of that topic. If Claude finds itself writing a paragraph that lists five formulas by name in one sentence instead of five separate `### Formula` blocks, that is the signal to stop and expand each one properly.
* If the notes must be split across multiple messages or files due to length, each chapter must still appear in full somewhere in the output — splitting for length is fine; compressing for brevity is not.

### Self-check before ending the turn

Before finishing, re-read your own output and ask:

* Did I write "X, Y, and Z" where X, Y, Z are formulas, figures, or definitions that should each have their own expanded block? → Expand them.
* Does any paragraph read like a table of contents or a changelog ("Added coverage of...", "Source Coverage: ...") rather than actual teaching content? → Replace it with the real content.
* Could a student study directly from this output without needing to re-open the original slides? If a name is mentioned but not actually explained where it's mentioned, the answer is no — go back and expand it.

---

# 32. Pre-Generation Step: File-to-Chapter Mapping

Before writing any notes, build an explicit mapping of every provided file to the chapter(s)/topic(s) it covers, and to its **role** (see Section 33). State this mapping at the start of the response (or in a short preamble) so both the reader and the agent stay anchored to it while generating, e.g.:

```text
Chapter 1 — Introduction to Microprocessors
  Sources: 3CS526CC23 Introduction.pdf, 8085 PPT.pdf (Slides 10-11)

Chapter 2 — 8085 Architecture
  Sources: 8085 PPT.pdf (Slides 1-34)
```

If a file contains a dedicated problem set, tutorial sheet, or question bank rather than lecture slides, tag it as such in the mapping (e.g. "Problem set — integrate into Section 9 numericals" / "Question bank — integrate into Section 21 exam review") per Section 34. Do not generate separate notes per file — every file mapped to a chapter feeds into that **one** merged chapter document.

---

# 33. Source Roles: Primary vs Supplementary Material

When the person identifies one source as primary (e.g. "faculty lecture material," "official course slides") and others as supplementary (e.g. "reference textbook," "third-party slide deck," "extra notes"), apply this precedence:

* The primary source determines terminology, notation, chapter boundaries, and which version of a concept to present when sources disagree.
* Supplementary sources are used to *fill in* what the primary source is missing: skipped explanations, absent diagrams, missing worked examples, clearer phrasing of a concept the primary source only mentions in passing. They do not override the primary source.
* **Conflict rule:** if the primary and a supplementary source disagree on a fact, value, or definition, keep the primary source's version in the main text and add a short note making the discrepancy visible rather than silently picking one:

> **Note on source discrepancy:** The reference material states X, while the primary lecture material states Y. These notes follow the primary lecture material; consult your instructor if this conflicts with what was taught.

* If the person does not specify which source is primary, treat the source that most resembles official course material (lecture slides, syllabus-numbered chapters) as primary by default, and state that assumption.

---

# 34. Dedicated Problem-Set and Question-Bank Files

Course material often arrives split across files by function rather than by chapter — a slide deck for concepts, a separate PDF of numerical problems, a separate tutorial sheet, a separate exam question bank. Treat these as first-class inputs, not afterthoughts:

* **Problem-set files:** every numerical problem contained in a dedicated problem-set file must be integrated into the relevant chapter's Worked Numerical Problems (Section 17) using the full Problem / Given / Required / Formula / Solution Steps / Final Answer structure — the same rigor as problems found inside the main slides. State the answer with correct units (e.g., Mbps, ms, %, bits) when the source gives them.
* **Tutorial and question-bank files:** questions from these files are the *primary* content of each chapter's Exam-Oriented Review (Section 25) — extract them directly (verbatim problem statements, reworded only if needed for clarity) rather than only inventing fresh ones. Generated questions (per Section 25) supplement the extracted ones; they don't replace them.
* Where a problem-set or question-bank file spans multiple chapters, split its contents by chapter using the same topic-matching logic as the lecture slides, and route each item to the correct chapter's sections.
* Never drop a numerical problem or exam question because it looks similar to another one already included — near-duplicates from a tutorial sheet often test a different parameter or edge case; include each one.

---

# 35. Document Header / Front Matter

Every notes document begins with a short metadata block before the first chapter, so the document is self-identifying and the reader can see at a glance what went into it:

```markdown
# Complete <Subject> Notes: <Course/Topic Title>

> **Course Code:** <code, if known>
> **Course Title:** <title, if known>
> **Primary Source:** <primary source description, per Section 33>
> **Files Integrated:** `file1.pdf`, `file2.pptx`, `file3.docx`

---
```

* Omit any field that genuinely cannot be determined (e.g. no course code was given) rather than inventing one.
* List every source file that was actually mapped to a chapter in "Files Integrated," matching the mapping built in Section 32.
* This header appears once at the top of the whole document, not once per chapter.

---

# 36. Inline Source-Citation Convention

To make Section 26's traceability rule concrete and consistent:

* After **every** major subsection — a terminology list, a feature list, a table, a figure's written analysis, a procedure, an interrupt/register/pin table, a comparison table — add a single `[Source: File, Slide/Page N]` line (or an N–M range) directly beneath it, separated from the next subsection by the `---` rule described in Section 38.
* When one subsection draws on more than one file or one slide range, list them comma-separated on the same tag line: `[Source: 8085 PPT, Slides 26–34]`.
* Do not repeat the tag after every single bullet inside a list — one tag per subsection is correct; only split it if different bullets in the same list come from genuinely different files.
* Formula blocks, Figure blocks, and Definition blocks keep their own tag as already specified in Sections 6, 9, and 5 respectively — Section 36 extends the same habit to every other kind of subsection (plain lists, tables, procedures) so citation density is uniform across the whole document.

---

# 37. Two-Tier Terminology Presentation

Real course material mixes core vocabulary (dozens of short terms that just need a clear one- or two-line explanation) with a smaller set of load-bearing concepts that deserve the full Section 5 `### Definition:` treatment. Present both tiers rather than forcing everything into one format:

* **Quick-reference glossary:** for a chapter's foundational vocabulary, use a numbered list titled something like `### Core Terminology Dictionary`, one item per term, bolded term name followed by a concise but complete explanation (including sub-bullets for related variants, e.g. Data Bus / Address Bus / Control Bus under "Bus System"). This is not a place to compress — each entry should still be a full sentence or two, not a fragment.
* **Full definition blocks:** the chapter's central concepts (the ones an exam question would ask the student to define and explain) still get the full `### Definition: <Term>` template from Section 5 (Meaning / Formal definition / Intuition / Example), placed where the concept is first properly introduced.
* A term can appear in the quick glossary early in the chapter and later receive its own full Definition block once the material develops it further — that is not duplication, it is appropriate depth progression; note the connection per Section 15 if useful.
* Never use the quick-glossary format as a substitute for a full Definition block on a term the source clearly treats as a major concept (multiple slides, a dedicated diagram, exam emphasis) — that is under-explaining a concept the Anti-Summarization Rule (Section 28) forbids compressing.

---

# 38. Figure and Table Numbering Convention

* Number figures per chapter as `Figure <chapter>.<n>` (e.g. `Figure 2.1`, `Figure 2.2`, `Figure 3.1`) in the order they appear, and use that number in both the heading and the image caption/alt text: `### Figure 2.1: 8085 Internal Architecture Block Diagram` with `![Figure 2.1: 8085 Internal Architecture Block Diagram](images/...)`.
* When two or more closely related figures are presented together (e.g. a high-level block diagram immediately followed by a detailed version of the same architecture), it is acceptable to embed both images consecutively and follow them with one shared `#### Written Analysis of ...` section covering all components across both figures, rather than forcing two separate rigid Figure blocks — as long as every component from every figure is still individually explained per Section 9.2. Use judgment: default to one Figure block per image; combine only when the figures are genuinely two views of the same thing.
* Number tables loosely the same way in the surrounding prose/heading when a chapter has several distinct tables worth distinguishing (e.g. "Comprehensive Pin Function Table," "Machine Status Signal Decoding Truth Table") — a descriptive table title is sufficient; a rigid `Table X.Y` numbering scheme is optional unless the source itself numbers its tables.

---

# 39. Visual and Structural Formatting Consistency

To keep long documents easy to scan and consistently formatted:

* Use a strict heading hierarchy: `#` for the chapter title, `##` for numbered top-level chapter sections (per Section 22's template), `###` for named subsections (a specific figure, a specific table, a definition), and `####` for finer subdivisions inside a subsection (e.g. "Written Analysis of Components" inside a figure section, or a worked example inside a concept explanation). Do not skip levels.
* **Concise Headings for TOC:** Keep `h1`, `h2`, `h3` heading titles refined and concise to avoid horizontal overflow or line wrapping in the right sidebar Table of Contents (TOC) of MkDocs.
* **Responsive Layout & Overflow Control:** Ensure tables, preformatted text blocks, long formulas, and code blocks fit standard page widths. In MkDocs custom stylesheet (`notes/stylesheets/extra.css`), elements must be configured with `overflow-x: auto` and images with `max-width: 100%` to prevent horizontal site layout breaking.
* Separate every subsection — every table, list, figure block, definition, formula, and worked example — from the next with a horizontal rule (`---`) on its own line, matching the density already implied by Sections 5–18. This is what keeps a dense, citation-heavy document visually navigable rather than a wall of text.
* Bold key terms, register/signal/pin names, and named quantities on first mention within a subsection (e.g. **Accumulator (Register A)**, $\overline{\text{RD}}$) so a student scanning the page can find them quickly.
* Keep table alignment markers consistent within a document (e.g. `:---` for left-aligned text columns, `:---:` for centered short codes/bit values) rather than mixing styles arbitrarily.

---

# 40. MkDocs Theme, Stylesheets, and Javascript Integration

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

# 41. Embedded iframes — Extraction and Logging

Course slides sometimes embed `<iframe>` elements (YouTube videos, interactive simulations, Google Slides previews, Desmos graphs, Sketchfab 3D models, etc.). These **cannot be re-embedded** in static Markdown/MkDocs notes, but their content must not be silently ignored.

## 41.1 What to Extract from an iframe

For every iframe found in the source:

| Field | What to capture |
| :---- | :-------------- |
| **URL** | The `src` attribute of the iframe |
| **Title** | The `title` attribute, or a description inferred from context |
| **Slide/Page context** | Which slide or page it appears on |
| **Purpose** | What the embedded content demonstrates (from surrounding text/caption) |

## 41.2 How to Represent an iframe in Notes

Replace the iframe with a **media card block** using this template:

```markdown
> 🎬 **Embedded Resource:** <Descriptive Title>
>
> **Type:** Video / Interactive Simulation / Embedded Presentation / Other
> **URL:** [<display title or URL>](<full URL>)
> **Context (Slide N):** <What this resource is meant to illustrate, verbatim from caption or inferred from surrounding material>
>
> **Summary of Content:**
> <Describe what the video/simulation demonstrates, based on any surrounding slide text, captions, or speaker notes. If nothing descriptive is available, write: "No description available in source.">
```

Example:

> 🎬 **Embedded Resource:** How Pipelining Works — Animation
>
> **Type:** Video (YouTube)
> **URL:** [https://youtu.be/abcd1234](https://youtu.be/abcd1234)
> **Context (Slide 14):** Illustrates instruction-level parallelism in a 5-stage RISC pipeline.
>
> **Summary of Content:**
> The animation shows fetch, decode, execute, memory access, and write-back stages operating simultaneously on different instructions. No transcript available in source.

## 41.3 iframe Log (per chapter)

At the end of each chapter (before the Abbreviation Index), include a consolidated **Embedded Resource Log** table listing all iframes found:

| # | Title | Type | URL | Slide |
| :- | :---- | :--- | :-- | :---- |
| 1 | How Pipelining Works | YouTube | https://youtu.be/abcd1234 | 14 |
| … | …     | …    | …   | …     |

If no iframes are present in the chapter, omit this section entirely.

---

# Priority Order

When making decisions, follow this priority:

1. **Do not lose source information**
2. **Maintain technical accuracy**
3. **Preserve formulas and mathematical meaning** (with full Symbol Definitions tables and conditions)
4. **Preserve diagrams/tables/examples** (with Mermaid fallback per Section 9.3 and iframe cards per Section 41)
5. **Expand all abbreviations on first use** (with Acronym Index at chapter end)
6. **Maintain content flow** — narrative spine, hierarchical bullets, transition sentences (Section 21)
7. **Organize information logically**
8. **Improve clarity**
9. **Make it exam-friendly** (📝 Exam Notes, Potential Questions per Section 25)
10. **Only then optimize readability/conciseness**

If there is a conflict between brevity and completeness, **choose completeness**.

If there is a conflict between generic clean formatting and the specific density/citation/numbering conventions in Sections 35–41, **follow Sections 35–41** — they define what "textbook-style reconstruction" (Section 30) concretely looks like.
