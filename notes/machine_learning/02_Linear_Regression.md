# Chapter 2: Simple Linear Regression & Gradient Descent Optimization

> **Course Title:** Machine Learning and its Applications
> **Source Material:** Faculty Lecture Slides - Nirma University

---

## 1. Chapter Overview
Simple Linear Regression models the linear relationship between a single independent scalar explanatory variable $x$ and a dependent continuous target variable $y$.

This chapter covers:
- Mathematical model formulation: $h_w(x) = w_0 + w_1 x$.
- Cost Function definition: Mean Squared Error $J(w_0, w_1)$.
- Analytical solution vs. Gradient Descent optimization algorithm.
- Complete step-by-step mathematical derivation of Gradient Descent parameter updates.
- Detailed worked numerical example with dataset calculations, cost evaluation, and manual gradient descent step execution.
- Formula Sheet, Definition Sheet, and Exam-Oriented Review.

---

## 2. Mathematical Formulation & Cost Function

### 2.1 Model Hypothesis
The model assumes a linear relationship represented as:

$$
h_w(x) = w_0 + w_1 x
$$

Where $w_0$ is the $y$-intercept parameter and $w_1$ is the slope parameter (weights).

---

### 2.2 Cost Function (Mean Squared Error)
To evaluate parameter quality across $m$ training instances $\{(x^{(i)}, y^{(i)})\}_{i=1}^m$, we calculate Mean Squared Error:

$$
J(w_0, w_1) = \frac{1}{2m} \sum_{i=1}^{m} \left( h_w(x^{(i)}) - y^{(i)} \right)^2 = \frac{1}{2m} \sum_{i=1}^{m} \left( (w_0 + w_1 x^{(i)}) - y^{(i)} \right)^2
$$

---

## 3. Gradient Descent Optimization Algorithm

Gradient Descent iteratively adjusts weights in the direction of steepest loss decrease (negative gradient):

$$
w_j := w_j - \alpha \frac{\partial}{\partial w_j} J(w_0, w_1) \quad \text{for } j \in \{0, 1\}
$$

Where $\alpha > 0$ is the learning rate.

### Partial Derivatives Derivation:

$$
\frac{\partial}{\partial w_0} J(w_0, w_1) = \frac{1}{m} \sum_{i=1}^{m} \left( h_w(x^{(i)}) - y^{(i)} \right)
$$

$$
\frac{\partial}{\partial w_1} J(w_0, w_1) = \frac{1}{m} \sum_{i=1}^{m} \left( h_w(x^{(i)}) - y^{(i)} \right) x^{(i)}
$$

---

## 4. Detailed Step-by-Step Solved Numerical Problem

### Problem Statement:
Consider a dataset with $m = 4$ observations:

| Sample $i$ | Feature $x^{(i)}$ | Target $y^{(i)}$ |
| :---: | :---: | :---: |
| 1 | 1 | 2 |
| 2 | 2 | 3 |
| 3 | 3 | 5 |
| 4 | 4 | 7 |

**Task:**
1. Initialize parameters $w_0 = 0.0$ and $w_1 = 0.0$.
2. Compute initial predictions $\hat{y}^{(i)} = h_w(x^{(i)})$.
3. Calculate initial Cost Function $J(w_0, w_1)$.
4. Execute ONE iteration of Gradient Descent with learning rate $\alpha = 0.1$ to update $w_0$ and $w_1$.

---

### Step-by-Step Solution:

#### Step 1: Initial Predictions with $w_0 = 0, w_1 = 0$
- $h_w(x^{(1)}) = 0 + 0(1) = 0$
- $h_w(x^{(2)}) = 0 + 0(2) = 0$
- $h_w(x^{(3)}) = 0 + 0(3) = 0$
- $h_w(x^{(4)}) = 0 + 0(4) = 0$

#### Step 2: Compute Residual Errors $(h_w(x^{(i)}) - y^{(i)})$
- Error 1: $0 - 2 = -2$
- Error 2: $0 - 3 = -3$
- Error 3: $0 - 5 = -5$
- Error 4: $0 - 7 = -7$

#### Step 3: Calculate Initial Cost Function $J(w_0, w_1)$

$$
J(0, 0) = \frac{1}{2(4)} \left[ (-2)^2 + (-3)^2 + (-5)^2 + (-7)^2 \right] = \frac{1}{8} [4 + 9 + 25 + 49] = \frac{87}{8} = \mathbf{10.875}
$$

#### Step 4: Compute Gradient Components
- **Gradient for $w_0$:**

$$
\frac{\partial J}{\partial w_0} = \frac{1}{4} \sum_{i=1}^{4} (h_w(x^{(i)}) - y^{(i)}) = \frac{-2 - 3 - 5 - 7}{4} = \frac{-17}{4} = \mathbf{-4.25}
$$

- **Gradient for $w_1$:**

$$
\frac{\partial J}{\partial w_1} = \frac{1}{4} \sum_{i=1}^{4} (h_w(x^{(i)}) - y^{(i)}) x^{(i)} = \frac{(-2)(1) + (-3)(2) + (-5)(3) + (-7)(4)}{4} = \frac{-2 - 6 - 15 - 28}{4} = \frac{-51}{4} = \mathbf{-12.75}
$$

#### Step 5: Execute Parameter Updates ($\alpha = 0.1$)

$$
w_0^{(\text{new})} = w_0 - \alpha \frac{\partial J}{\partial w_0} = 0.0 - (0.1)(-4.25) = 0.0 + 0.425 = \mathbf{0.425}
$$

$$
w_1^{(\text{new})} = w_1 - \alpha \frac{\partial J}{\partial w_1} = 0.0 - (0.1)(-12.75) = 0.0 + 1.275 = \mathbf{1.275}
$$

**Final Result after Iteration 1:**
- Updated Hypothesis: $h_w(x) = 0.425 + 1.275 x$.

---

## 5. Formula Sheet

- **Hypothesis:**

$$
h_w(x) = w_0 + w_1 x
$$

- **MSE Cost Function:**

$$
J(w_0, w_1) = \frac{1}{2m} \sum_{i=1}^{m} (h_w(x^{(i)}) - y^{(i)})^2
$$

- **Gradient Descent Updates:**

$$
w_0 := w_0 - \alpha \frac{1}{m} \sum_{i=1}^{m} (h_w(x^{(i)}) - y^{(i)})
$$

$$
w_1 := w_1 - \alpha \frac{1}{m} \sum_{i=1}^{m} (h_w(x^{(i)}) - y^{(i)}) x^{(i)}
$$

---

## 6. Definition Sheet

1. **Simple Linear Regression:** A supervised learning algorithm predicting a continuous target $y$ from a single feature $x$ using a linear equation.
2. **Mean Squared Error (MSE):** A loss metric calculating the average squared difference between estimated values and actual values.
3. **Gradient Descent:** An iterative first-order optimization algorithm that steps toward parameter values that minimize a cost function.

---

## 7. Exam-Oriented Review

1. Derive the partial derivatives of the Mean Squared Error cost function with respect to $w_0$ and $w_1$.
2. Explain the role of learning rate $\alpha$. What happens if $\alpha$ is too small versus too large?
3. Execute one iteration of Gradient Descent for $w_0=0, w_1=1$ given points $(1,3)$ and $(2,5)$ with $\alpha=0.1$.
