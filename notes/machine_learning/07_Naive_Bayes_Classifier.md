# Chapter 7: Naïve Bayes Classifier & Laplace Smoothing

> **Course Title:** Machine Learning and its Applications
> **Source Material:** Faculty Lecture Slides - Nirma University

---

## 1. Chapter Overview
The Naïve Bayes classifier is a probabilistic classification model based on Bayes' Theorem, incorporating the "naïve" conditional independence assumption.

This chapter covers:
- Conditional Independence Assumption formulation.
- Posterior class computation and MAP decision rule.
- Zero-Frequency Problem & Laplace Smoothing.
- Gaussian vs. Multinomial vs. Bernoulli Naïve Bayes models.
- Detailed step-by-step solved numerical problem for text/categorical classification using Naïve Bayes with Laplace smoothing.
- Formula Sheet, Definition Sheet, and Exam-Oriented Review.

---

## 2. Mathematical Formulation & Conditional Independence

### 2.1 Bayes' Classification Rule
Given a feature vector $\mathbf{x} = (x_1, x_2, \dots, x_d)^T$, the posterior probability of class $C_k$ is:

$$
P(C_k \mid \mathbf{x}) = \frac{P(\mathbf{x} \mid C_k) P(C_k)}{P(\mathbf{x})}
$$

---

### 2.2 Naïve Conditional Independence Assumption
Assuming features $x_1, \dots, x_d$ are mutually conditionally independent given class $C_k$:

$$
P(\mathbf{x} \mid C_k) = \prod_{j=1}^{d} P(x_j \mid C_k)
$$

### MAP Classification Decision Rule:

$$
\hat{y} = \arg\max_{C_k} P(C_k) \prod_{j=1}^{d} P(x_j \mid C_k)
$$

---

### 2.3 Laplace Smoothing (Additive Smoothing)
To prevent zero probabilities ($P(x_j \mid C_k) = 0$) from making total posterior probability zero:

$$
P(x_j = v \mid C_k) = \frac{\text{Count}(x_j = v, C_k) + \alpha}{\text{Count}(C_k) + \alpha \cdot |V|}
$$

Where $\alpha = 1$ is Laplace smoothing and $|V|$ is total distinct attribute values.

---

## 3. Detailed Step-by-Step Solved Numerical Problem

### Problem Statement:
Consider a dataset classifying weather conditions for playing golf ($\text{Play} \in \{\text{Yes}, \text{No}\}$):

| Sample | Outlook ($x_1$) | Humidity ($x_2$) | Play ($y$) |
| :---: | :---: | :---: | :---: |
| 1 | Sunny | High | No |
| 2 | Sunny | High | No |
| 3 | Overcast | High | Yes |
| 4 | Rain | High | Yes |
| 5 | Rain | Normal | Yes |
| 6 | Overcast | Normal | Yes |

**Task:**
Classify a query day $\mathbf{x}^* = (\text{Outlook}=\text{Sunny}, \text{Humidity}=\text{Normal})$ using Naïve Bayes with Laplace Smoothing ($\alpha = 1$).

---

### Step-by-Step Solution:

#### Step 1: Compute Prior Class Probabilities $P(\text{Play})$
- Total samples $m = 6$.
- Count($\text{Yes}$) = 4 $\implies P(\text{Yes}) = \frac{4}{6} = \frac{2}{3} \approx \mathbf{0.667}$.
- Count($\text{No}$) = 2 $\implies P(\text{No}) = \frac{2}{6} = \frac{1}{3} \approx \mathbf{0.333}$.

---

#### Step 2: Compute Feature Conditional Probabilities with Laplace Smoothing ($\alpha = 1$)
- Attribute $x_1$ (Outlook) has $|V_1| = 3$ values: $\{\text{Sunny}, \text{Overcast}, \text{Rain}\}$.
- Attribute $x_2$ (Humidity) has $|V_2| = 2$ values: $\{\text{High}, \text{Normal}\}$.

1. **For Class $y = \text{Yes}$ (Count = 4):**
   - $P(\text{Sunny} \mid \text{Yes}) = \frac{\text{Count}(\text{Sunny}, \text{Yes}) + 1}{4 + 1 \cdot |V_1|} = \frac{0 + 1}{4 + 3} = \frac{1}{7} \approx \mathbf{0.143}$
   - $P(\text{Normal} \mid \text{Yes}) = \frac{\text{Count}(\text{Normal}, \text{Yes}) + 1}{4 + 1 \cdot |V_2|} = \frac{2 + 1}{4 + 2} = \frac{3}{6} = \mathbf{0.500}$

2. **For Class $y = \text{No}$ (Count = 2):**
   - $P(\text{Sunny} \mid \text{No}) = \frac{\text{Count}(\text{Sunny}, \text{No}) + 1}{2 + 1 \cdot |V_1|} = \frac{2 + 1}{2 + 3} = \frac{3}{5} = \mathbf{0.600}$
   - $P(\text{Normal} \mid \text{No}) = \frac{\text{Count}(\text{Normal}, \text{No}) + 1}{2 + 1 \cdot |V_2|} = \frac{0 + 1}{2 + 2} = \frac{1}{4} = \mathbf{0.250}$

---

#### Step 3: Calculate Unnormalized Posterior Probabilities

1. **For Class $\text{Yes}$:**

$$
P(\text{Yes}) \cdot P(\text{Sunny} \mid \text{Yes}) \cdot P(\text{Normal} \mid \text{Yes}) = \left(\frac{4}{6}\right) \left(\frac{1}{7}\right) \left(\frac{3}{6}\right) = \frac{12}{252} \approx \mathbf{0.0476}
$$

2. **For Class $\text{No}$:**

$$
P(\text{No}) \cdot P(\text{Sunny} \mid \text{No}) \cdot P(\text{Normal} \mid \text{No}) = \left(\frac{2}{6}\right) \left(\frac{3}{5}\right) \left(\frac{1}{4}\right) = \frac{6}{120} = \mathbf{0.0500}
$$

---

#### Step 4: Compare Probabilities & Determine Class
- $P(\text{Yes} \mid \mathbf{x}^*) \propto 0.0476$
- $P(\text{No} \mid \mathbf{x}^*) \propto 0.0500$

Since $0.0500 > 0.0476$, the MAP class decision is **No**.

---

## 4. Formula Sheet

- **Naïve Bayes Decision Rule:**

$$
\hat{y} = \arg\max_{C_k} P(C_k) \prod_{j=1}^{d} P(x_j \mid C_k)
$$

- **Laplace Conditional Probability:**

$$
P(x_j = v \mid C_k) = \frac{\text{Count}(x_j = v, C_k) + 1}{\text{Count}(C_k) + |V_j|}
$$

---

## 5. Definition Sheet

1. **Naïve Conditional Independence:** Assumption that features are independent given class label $y$.
2. **Laplace Smoothing:** Additive technique preventing zero probabilities in sparse datasets.

---

## 6. Exam-Oriented Review

1. Explain the Naïve Bayes conditional independence assumption and its computational advantages.
2. Why does the zero-frequency problem occur and how does Laplace smoothing resolve it?
