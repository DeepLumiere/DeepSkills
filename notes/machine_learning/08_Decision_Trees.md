# Chapter 8: Decision Trees, Information Gain & Pruning

> **Course Title:** Machine Learning and its Applications
> **Source Material:** Faculty Lecture Slides - Nirma University

---

## 1. Chapter Overview
Decision Trees are non-parametric supervised learning models that recursively partition feature space using axis-aligned decision boundaries.

This chapter covers:
- Decision Tree Architecture: Root, Internal Nodes, Branches, and Leaves.
- Splitting Impurity Metrics: Shannon Entropy, Information Gain, and Gini Index.
- Splitting Algorithms: ID3 (Information Gain) and CART (Gini Impurity).
- Overfitting Mitigation: Pre-pruning vs. Post-pruning.
- Detailed step-by-step solved numerical problem computing Entropy, Information Gain, and root node selection.
- Formula Sheet, Definition Sheet, and Exam-Oriented Review.

---

## 2. Mathematical Impurity Metrics

### 2.1 Shannon Entropy ($H(S)$)
Measures the average impurity / uncertainty in a set of samples $S$ with $K$ classes:

$$
H(S) = -\sum_{k=1}^{K} p_k \log_2(p_k)
$$

Where $p_k$ is the proportion of samples in $S$ belonging to class $k$.
- Pure Node ($p_1 = 1, p_2 = 0$): $H(S) = 0$ bits.
- Maximally Impure Binary Node ($p_1 = 0.5, p_2 = 0.5$): $H(S) = 1.0$ bit.

---

### 2.2 Information Gain ($\text{Gain}(S, A)$)
Expected reduction in entropy achieved by partitioning samples $S$ along attribute $A$:

$$
\text{Gain}(S, A) = H(S) - \sum_{v \in \text{Values}(A)} \frac{|S_v|}{|S|} H(S_v)
$$

Where $S_v$ is the subset of samples where attribute $A$ takes value $v$.

---

### 2.3 Gini Index ($\text{Gini}(S)$)
Alternative impurity metric used in CART algorithm:

$$
\text{Gini}(S) = 1 - \sum_{k=1}^{K} p_k^2
$$

---

## 3. Detailed Step-by-Step Solved Numerical Problem

### Problem Statement:
A financial institution evaluates loan approval ($\text{Loan} \in \{\text{Approved}, \text{Denied}\}$) across $m = 6$ applicant records:

| ID | Credit Rating ($A_1$) | Income ($A_2$) | Target Loan ($y$) |
| :---: | :---: | :---: | :---: |
| 1 | High | High | Approved |
| 2 | High | Low | Approved |
| 3 | Fair | High | Approved |
| 4 | Fair | Low | Denied |
| 5 | Low | High | Denied |
| 6 | Low | Low | Denied |

**Task:**
1. Calculate total Dataset Entropy $H(S)$.
2. Calculate Information Gain for Credit Rating ($\text{Gain}(S, A_1)$).
3. Calculate Information Gain for Income ($\text{Gain}(S, A_2)$).
4. Select the optimal attribute for the **Root Decision Node**.

---

### Step-by-Step Solution:

#### Step 1: Calculate Total Dataset Entropy $H(S)$
- Total instances $|S| = 6$.
- Approved count = 3 $\implies p_{\text{App}} = \frac{3}{6} = 0.5$.
- Denied count = 3 $\implies p_{\text{Den}} = \frac{3}{6} = 0.5$.

$$
H(S) = -0.5 \log_2(0.5) - 0.5 \log_2(0.5) = -0.5(-1) - 0.5(-1) = \mathbf{1.000 \text{ bit}}
$$

---

#### Step 2: Calculate Information Gain for $A_1$ (Credit Rating)
Attribute $A_1$ has 3 values: $\{\text{High}, \text{Fair}, \text{Low}\}$.

1. **Subset $S_{\text{High}}$ ($|S_{\text{High}}| = 2$, Records 1 & 2):**
   - Both Approved (2 Approved, 0 Denied) $\implies \text{Pure Node!}$
   - $H(S_{\text{High}}) = \mathbf{0.000 \text{ bits}}$.

2. **Subset $S_{\text{Fair}}$ ($|S_{\text{Fair}}| = 2$, Records 3 & 4):**
   - 1 Approved, 1 Denied ($p = 0.5, 0.5$).
   - $H(S_{\text{Fair}}) = \mathbf{1.000 \text{ bit}}$.

3. **Subset $S_{\text{Low}}$ ($|S_{\text{Low}}| = 2$, Records 5 & 6):**
   - Both Denied (0 Approved, 2 Denied) $\implies \text{Pure Node!}$
   - $H(S_{\text{Low}}) = \mathbf{0.000 \text{ bits}}$.

4. **Weighted Entropy $H(S, A_1)$:**

$$
H(S, A_1) = \frac{2}{6} (0.0) + \frac{2}{6} (1.0) + \frac{2}{6} (0.0) = \frac{2}{6} = \mathbf{0.333 \text{ bits}}
$$

5. **Information Gain $\text{Gain}(S, A_1)$:**

$$
\text{Gain}(S, A_1) = H(S) - H(S, A_1) = 1.000 - 0.333 = \mathbf{0.667 \text{ bits}}
$$

---

#### Step 3: Calculate Information Gain for $A_2$ (Income)
Attribute $A_2$ has 2 values: $\{\text{High}, \text{Low}\}$.

1. **Subset $S_{\text{High}}$ ($|S_{\text{High}}| = 3$, Records 1, 3, 5):**
   - 2 Approved, 1 Denied ($p = \frac{2}{3}, \frac{1}{3}$).
   - $H(S_{\text{High}}) = -\left(\frac{2}{3}\right)\log_2\left(\frac{2}{3}\right) - \left(\frac{1}{3}\right)\log_2\left(\frac{1}{3}\right) = -0.667(-0.585) - 0.333(-1.585) \approx \mathbf{0.918 \text{ bits}}$.

2. **Subset $S_{\text{Low}}$ ($|S_{\text{Low}}| = 3$, Records 2, 4, 6):**
   - 1 Approved, 2 Denied ($p = \frac{1}{3}, \frac{2}{3}$).
   - $H(S_{\text{Low}}) = \mathbf{0.918 \text{ bits}}$.

3. **Weighted Entropy $H(S, A_2)$:**

$$
H(S, A_2) = \frac{3}{6}(0.918) + \frac{3}{6}(0.918) = \mathbf{0.918 \text{ bits}}
$$

4. **Information Gain $\text{Gain}(S, A_2)$:**

$$
\text{Gain}(S, A_2) = 1.000 - 0.918 = \mathbf{0.082 \text{ bits}}
$$

---

#### Step 4: Root Node Selection
- $\text{Gain}(S, A_1 = \text{Credit Rating}) = \mathbf{0.667 \text{ bits}}$
- $\text{Gain}(S, A_2 = \text{Income}) = \mathbf{0.082 \text{ bits}}$

Since $0.667 > 0.082$, **Credit Rating ($A_1$)** is selected as the Root Decision Node.

---

## 4. Formula Sheet

- **Entropy:**

$$
H(S) = -\sum_{k=1}^{K} p_k \log_2(p_k)
$$

- **Information Gain:**

$$
\text{Gain}(S, A) = H(S) - \sum_{v \in \text{Values}(A)} \frac{|S_v|}{|S|} H(S_v)
$$

- **Gini Index:**

$$
\text{Gini}(S) = 1 - \sum_{k=1}^{K} p_k^2
$$

---

## 5. Definition Sheet

1. **Information Gain:** A measure of the decrease in entropy resulting from splitting a dataset along a chosen attribute.
2. **Gini Impurity:** A measure of how often a randomly chosen element from a set would be incorrectly labeled if randomly labeled according to distribution.
3. **Pruning:** Pruning removes branches that provide little predictive power to prevent overfitting.

---

## 6. Exam-Oriented Review

1. Compare Information Gain and Gini Index as splitting criteria in decision trees.
2. Explain the difference between pre-pruning (early stopping) and post-pruning (cost-complexity pruning).
