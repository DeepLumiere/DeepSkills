# DeepSkills

DeepSkills is an open-source technical knowledge base, engineering curriculum repository, and documentation suite built for computer science and engineering coursework. It combines textbook-level academic rigor with modern, accessible web documentation powered by MkDocs Material.

The repository hosts comprehensive course study notes, reference architectures, worked numerical problems, derivations, and custom tooling designed to extract, process, and validate technical course materials.

---

## Key Features

- **Comprehensive Academic Scope:** Detailed lecture and reference material covering undergraduate Computer Science and Engineering curricula.
- **Mathematical Rigor:** Full LaTeX mathematical support rendered via MathJax 3 with properly formatted display equations and derivations.
- **Visual Architecture & Flowcharts:** Native Mermaid diagrams and diagrams for data flows, system architectures, and algorithmic decision trees.
- **Clean Documentation Experience:** Built with Material for MkDocs featuring instant search, light and dark themes, responsive typography, code highlighting, and clean navigation.
- **Automated Notes Generation & Validation Tooling:** Includes dedicated skills and verification scripts to validate asset references, mathematical structures, and document completeness.

---

## Curriculum & Knowledge Base Coverage

DeepSkills contains structured notes and documentation across multiple core disciplines:

| Subject | Scope and Key Topics Covered |
| :--- | :--- |
| **Design and Analysis of Algorithms (DAA)** | Elementary algorithms, asymptotic analysis, recurrence relations, divide and conquer, advanced data structures, greedy strategies, dynamic programming, backtracking, and branch and bound. |
| **Machine Learning (ML)** | Supervised and unsupervised learning, linear and multivariate regression, regularization (Ridge & Lasso), probability and statistics for ML, KNN, Naive Bayes, Decision Trees, Neural Networks, Clustering, SSL, Reinforcement Learning, and Support Vector Machines. |
| **Computer Networks** | Network layered architecture, OSI and TCP/IP models, Data Link Layer protocols, MAC sublayer, Network Layer routing and addressing, Transport Layer mechanisms, and exam review sets. |
| **Hardware and Microprocessors** | 8085 and 8086 processor architectures, instruction sets, assembler directives, string operations, stack memory management, modular programming, macros, and interrupts. |
| **Data Communication** | Signal fundamentals, transmission media, digital signal encoding schemes, data link control techniques, multiplexing (FDM/TDM/WDM), and switching technologies. |
| **Data Analysis and Visualization (DAV)** | Data types, statistical descriptions, preprocessing, similarity and dissimilarity measures, exploratory data analysis, and business intelligence visualization patterns. |
| **Full Stack Web Development** | Modern web architectures, REST APIs, JSON handling, responsive UI frameworks (Bootstrap 5, Tailwind CSS), and modern frontend libraries (Vue.js, React.js). |

---

## Tooling & Automation

The repository includes tools for processing course materials located in the `skills/` directory:

- **`skills/notes_maker/SKILL.md`:** Standardized specification and prompt instructions for generating faithful, structured, textbook-style technical notes from slides and course documents.
- **`skills/notes_maker/extract_course_material.py`:** Utilities for extracting visual diagrams, equations, and textual content from slide decks and PDFs.
- **`skills/notes_maker/validate_notes_assets.py`:** Validation script verifying image references, required review sections, and Markdown formatting compliance.

To validate notes assets across markdown files:

```bash
python3 skills/notes_maker/validate_notes_assets.py --notes <path_to_markdown_file>
```

---

## Project Structure

```text
DeepSkills/
├── .github/              # GitHub Actions workflows and configuration
├── notes/                # MkDocs documentation source content (Markdown)
│   ├── computer_networks/
│   ├── data_analysis/
│   ├── data_communication/
│   ├── design_and_analysis_of_algorithms/
│   ├── hardware_and_microprocessors/
│   ├── machine_learning/
│   ├── web_development/
│   ├── images/           # Extracted diagrams and schematics
│   ├── javascripts/      # Custom client-side scripts (MathJax, Mermaid, etc.)
│   ├── stylesheets/      # Custom styles and responsive overrides
│   └── index.md          # Documentation portal homepage
├── skills/               # Extraction scripts, skills, and validation utilities
│   └── notes_maker/
├── CODE_OF_CONDUCT.md    # Community guidelines
├── LICENSE               # MIT License
├── mkdocs.yml            # MkDocs configuration and navigation definition
└── README.md             # Project overview and documentation guide
```

---

## Local Development & Setup

### Prerequisites

- Python 3.10 or higher
- `pip` package manager

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/DeepLumiere/DeepSkills.git
   cd DeepSkills
   ```

2. Create and activate a virtual environment (recommended):
   ```bash
   python3 -m venv .venv
   source .venv/bin/activate
   ```

3. Install required MkDocs dependencies:
   ```bash
   pip install mkdocs-material pymdown-extensions
   ```

   *(Optional)* If running extraction or validation tooling:
   ```bash
   pip install -r skills/notes_maker/requirements.txt
   ```

### Running Documentation Locally

Start the local live-reloading MkDocs server:

```bash
mkdocs serve
```

Once running, navigate to `http://127.0.0.1:8000` in your web browser.

### Building Static Assets

To generate static HTML files:

```bash
mkdocs build
```

The output files will be created in the `site/` directory.

---

## Contributing

Contributions to improve notes clarity, add worked examples, correct technical discrepancies, or improve tooling are welcome.

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/topic-enhancement`.
3. Verify formatting, LaTeX delimiters, and Mermaid diagrams render cleanly.
4. Ensure all changes adhere to technical accuracy and formatting guidelines.
5. Commit your changes and open a pull request.

Please review our [Code of Conduct](CODE_OF_CONDUCT.md) before contributing.

---

## License

This repository is licensed under the [MIT License](LICENSE).

---

## Author & Contact

- **Author:** Deep Joshi
- **GitHub:** [@DeepLumiere](https://github.com/DeepLumiere)
- **LinkedIn:** [Deep Joshi](https://www.linkedin.com/in/deep-lumiere)
- **Documentation Website:** [deeplumiere.github.io/DeepSkills](https://deeplumiere.github.io/DeepSkills/)
- **Email:** 24bce152@nirmauni.ac.in
