# Chapter 5: Probability & Statistics for Machine Learning

> **Course Title:** Machine Learning and its Applications
> **Source Material:** Faculty Lecture Slides - Nirma University

---

## 1. Chapter Overview
Probability theory provides the mathematical framework for quantifying uncertainty in machine learning algorithms.

This chapter covers:
- Conditional Probability and Joint Distributions.
- Bayes' Theorem formulation and core components (Prior, Likelihood, Posterior, Evidence).
- Law of Total Probability.
- Maximum Likelihood Estimation (MLE) vs. Maximum A Posteriori (MAP).
- Detailed step-by-step solved numerical problem on Bayesian medical diagnostic inference.
- Formula Sheet, Definition Sheet, and Exam-Oriented Review.

---

## 2. Epistemological Foundations of Bayes' Theorem

### 2.1 Bayes' Rule Formulation

$$
P(A \mid B) = \frac{P(B \mid A) \cdot P(A)}{P(B)}
$$

Where:
- $P(A \mid B)$: **Posterior Probability** (Updated probability of hypothesis $A$ given observed evidence $B$).
- $P(B \mid A)$: **Likelihood** (Probability of observing evidence $B$ if hypothesis $A$ is true).
- $P(A)$: **Prior Probability** (Initial belief in hypothesis $A$ before seeing evidence $B$).
- $P(B)$: **Marginal Likelihood / Evidence** (Total probability of observing evidence $B$ across all possible hypotheses).

---

### 2.2 Law of Total Probability
For a partition of mutually exclusive hypotheses $\{A_1, A_2, \dots, A_k\}$:

$$
P(B) = \sum_{i=1}^{k} P(B \mid A_i) P(A_i)
$$

---

## 3. Detailed Step-by-Step Solved Numerical Problem

### Problem Statement:
Suppose a medical diagnostic test for a rare disease $D$ has the following properties:
- **Disease Prevalence (Prior):** $P(D) = 0.01$ (1% of population has disease). Therefore, $P(\neg D) = 0.99$.
- **Test Sensitivity (True Positive Rate):** $P(T^+ \mid D) = 0.95$ (95% chance of positive test if diseased).
- **False Positive Rate:** $P(T^+ \mid \neg D) = 0.05$ (5% chance of positive test if healthy).

**Task:**
A randomly selected patient tests positive ($T^+$). Compute the exact **Posterior Probability** $P(D \mid T^+)$ that the patient actually has the disease.

---

### Step-by-Step Solution:

#### Step 1: Identify Known Probabilities
- $P(D) = 0.01$
- $P(\neg D) = 1 - 0.01 = 0.99$
- $P(T^+ \mid D) = 0.95$
- $P(T^+ \mid \neg D) = 0.05$

---

#### Step 2: Compute Total Probability of Positive Test $P(T^+)$ via Law of Total Probability

$$
P(T^+) = P(T^+ \mid D) P(D) + P(T^+ \mid \neg D) P(\neg D)
$$

$$
P(T^+) = (0.95)(0.01) + (0.05)(0.99)
$$

$$
P(T^+) = 0.0095 + 0.0495 = \mathbf{0.0590} \quad (5.90\%)
$$

---

#### Step 3: Calculate Posterior Probability $P(D \mid T^+)$ using Bayes' Rule

$$
P(D \mid T^+) = \frac{P(T^+ \mid D) P(D)}{P(T^+)}
$$

$$
P(D \mid T^+) = \frac{0.0095}{0.0590} = \mathbf{0.161017} \quad (\approx \mathbf{16.10\%})
$$

**Interpretation:**
Even though the diagnostic test has a $95\%$ true positive rate, the posterior probability of actually having the disease given a positive test is only $\approx 16.10\%$ due to the low prior prevalence ($1\%$).

---

## 4. Formula Sheet

- **Bayes' Theorem:**

$$
P(A \mid B) = \frac{P(B \mid A) P(A)}{P(B)}
$$

- **Law of Total Probability:**

$$
P(B) = P(B \mid A) P(A) + P(B \mid \neg A) P(\neg A)
$$

---

## 5. Definition Sheet

1. **Prior Probability:** The initial probability of an event prior to incorporating observed evidence.
2. **Likelihood:** The conditional probability of observing specific evidence assuming a given hypothesis is true.
3. **Posterior Probability:** The revised probability of an event after accounting for new empirical data.

---

## 6. Exam-Oriented Review

1. Derive Bayes' Theorem from the definition of conditional probability $P(A \cap B)$.
2. Differentiate between Maximum Likelihood Estimation (MLE) and Maximum A Posteriori (MAP) estimation.
