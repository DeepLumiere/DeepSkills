# Chapter 3: Multivariate Linear Regression & Normal Equation

> **Course Title:** Machine Learning and its Applications
> **Source Material:** Faculty Lecture Slides - Nirma University

---

## 1. Chapter Overview
Multivariate Linear Regression extends regression modeling to handle multiple independent explanatory variables $x_1, x_2, \dots, x_n$.

This chapter covers:
- Vectorized hypothesis representation: $h_{\mathbf{w}}(\mathbf{x}) = \mathbf{w}^T \mathbf{x}$.
- Matrix form of the Cost Function $J(\mathbf{w})$.
- Feature Scaling & Normalization (Min-Max Scaling vs. Z-score Standardization).
- The Normal Equation analytical solution: $\mathbf{w}^* = (\mathbf{X}^T \mathbf{X})^{-1} \mathbf{X}^T \mathbf{y}$.
- Comparative analysis: Gradient Descent vs. Normal Equation.
- Detailed step-by-step worked numerical problem solving the Normal Equation using matrix algebra.
- Formula Sheet, Definition Sheet, and Exam-Oriented Review.

---

## 2. Mathematical Formulation & Vectorization

### 2.1 Model Hypothesis
For $n$ features, the hypothesis function is defined as:

$$
h_{\mathbf{w}}(\mathbf{x}) = w_0 + w_1 x_1 + w_2 x_2 + \dots + w_n x_n = \sum_{j=0}^{n} w_j x_j = \mathbf{w}^T \mathbf{x}
$$

Where $x_0 = 1$ is the bias feature, $\mathbf{w} = [w_0, w_1, \dots, w_n]^T \in \mathbb{R}^{n+1}$, and $\mathbf{x} = [1, x_1, \dots, x_n]^T \in \mathbb{R}^{n+1}$.

---

### 2.2 Matrix Notation & Design Matrix
Given $m$ training instances, we construct the Design Matrix $\mathbf{X} \in \mathbb{R}^{m \times (n+1)}$:

$$
\mathbf{X} = \begin{bmatrix}
1 & x_1^{(1)} & x_2^{(1)} & \dots & x_n^{(1)} \\
1 & x_1^{(2)} & x_2^{(2)} & \dots & x_n^{(2)} \\
\vdots & \vdots & \vdots & \ddots & \vdots \\
1 & x_1^{(m)} & x_2^{(m)} & \dots & x_n^{(m)}
\end{bmatrix}, \quad \mathbf{y} = \begin{bmatrix} y^{(1)} \\ y^{(2)} \\ \vdots \\ y^{(m)} \end{bmatrix}
$$

The vectorized prediction is $\hat{\mathbf{y}} = \mathbf{X} \mathbf{w}$, and the Cost Function is:

$$
J(\mathbf{w}) = \frac{1}{2m} (\mathbf{X} \mathbf{w} - \mathbf{y})^T (\mathbf{X} \mathbf{w} - \mathbf{y})
$$

---

## 3. Analytical Closed-Form Solution: Normal Equation

To find the global minimum analytically, we set the gradient to zero:

$$
\nabla_{\mathbf{w}} J(\mathbf{w}) = \frac{1}{m} \mathbf{X}^T (\mathbf{X} \mathbf{w} - \mathbf{y}) = \mathbf{0}
$$

$$
\mathbf{X}^T \mathbf{X} \mathbf{w} = \mathbf{X}^T \mathbf{y} \implies \mathbf{w}^* = (\mathbf{X}^T \mathbf{X})^{-1} \mathbf{X}^T \mathbf{y}
$$

---

## 4. Feature Scaling Methods

1. **Z-Score Standardization:**

$$
x_j^{(i)} := \frac{x_j^{(i)} - \mu_j}{\sigma_j}
$$

2. **Min-Max Normalization:**

$$
x_j^{(i)} := \frac{x_j^{(i)} - \min(x_j)}{\max(x_j) - \min(x_j)}
$$

---

## 5. Detailed Step-by-Step Solved Numerical Problem

### Problem Statement:
Consider $m = 3$ observations with $n = 2$ features ($x_1, x_2$) and target $y$:

| Sample $i$ | $x_1$ | $x_2$ | Target $y$ |
| :---: | :---: | :---: | :---: |
| 1 | 1 | 0 | 3 |
| 2 | 0 | 2 | 5 |
| 3 | 2 | 1 | 7 |

**Task:**
Compute optimal weights $\mathbf{w}^* = [w_0, w_1, w_2]^T$ using the Normal Equation $\mathbf{w}^* = (\mathbf{X}^T \mathbf{X})^{-1} \mathbf{X}^T \mathbf{y}$.

---

### Step-by-Step Solution:

#### Step 1: Construct Design Matrix $\mathbf{X}$ and Target Vector $\mathbf{y}$
Prepending column of ones ($x_0 = 1$):

$$
\mathbf{X} = \begin{bmatrix} 1 & 1 & 0 \\ 1 & 0 & 2 \\ 1 & 2 & 1 \end{bmatrix}, \quad \mathbf{y} = \begin{bmatrix} 3 \\ 5 \\ 7 \end{bmatrix}
$$

#### Step 2: Compute Matrix Product $\mathbf{X}^T \mathbf{X}$

$$
\mathbf{X}^T = \begin{bmatrix} 1 & 1 & 1 \\ 1 & 0 & 2 \\ 0 & 2 & 1 \end{bmatrix}
$$

$$
\mathbf{X}^T \mathbf{X} = \begin{bmatrix} 1 & 1 & 1 \\ 1 & 0 & 2 \\ 0 & 2 & 1 \end{bmatrix} \begin{bmatrix} 1 & 1 & 0 \\ 1 & 0 & 2 \\ 1 & 2 & 1 \end{bmatrix} = \begin{bmatrix} (1+1+1) & (1+0+2) & (0+2+1) \\ (1+0+2) & (1+0+4) & (0+0+2) \\ (0+2+1) & (0+0+2) & (0+4+1) \end{bmatrix} = \begin{bmatrix} 3 & 3 & 3 \\ 3 & 5 & 2 \\ 3 & 2 & 5 \end{bmatrix}
$$

#### Step 3: Compute Matrix Inverse $(\mathbf{X}^T \mathbf{X})^{-1}$
Let $\mathbf{A} = \mathbf{X}^T \mathbf{X} = \begin{bmatrix} 3 & 3 & 3 \\ 3 & 5 & 2 \\ 3 & 2 & 5 \end{bmatrix}$.

1. **Determinant $\det(\mathbf{A})$:**

$$
\det(\mathbf{A}) = 3(5 \cdot 5 - 2 \cdot 2) - 3(3 \cdot 5 - 2 \cdot 3) + 3(3 \cdot 2 - 5 \cdot 3)
$$

$$
= 3(21) - 3(9) + 3(-9) = 63 - 27 - 27 = \mathbf{9}
$$

2. **Inverse $(\mathbf{X}^T \mathbf{X})^{-1} = \frac{1}{9} \text{adj}(\mathbf{A})$:**
Computing cofactor matrix adjugate:

$$
(\mathbf{X}^T \mathbf{X})^{-1} = \frac{1}{9} \begin{bmatrix} 21 & -9 & -9 \\ -9 & 6 & 3 \\ -9 & 3 & 6 \end{bmatrix}
$$

#### Step 4: Compute Matrix Product $\mathbf{X}^T \mathbf{y}$

$$
\mathbf{X}^T \mathbf{y} = \begin{bmatrix} 1 & 1 & 1 \\ 1 & 0 & 2 \\ 0 & 2 & 1 \end{bmatrix} \begin{bmatrix} 3 \\ 5 \\ 7 \end{bmatrix} = \begin{bmatrix} 3 + 5 + 7 \\ 3 + 0 + 14 \\ 0 + 10 + 7 \end{bmatrix} = \begin{bmatrix} 15 \\ 17 \\ 17 \end{bmatrix}
$$

#### Step 5: Calculate Optimal Weights $\mathbf{w}^* = (\mathbf{X}^T \mathbf{X})^{-1} (\mathbf{X}^T \mathbf{y})$

$$
\mathbf{w}^* = \frac{1}{9} \begin{bmatrix} 21 & -9 & -9 \\ -9 & 6 & 3 \\ -9 & 3 & 6 \end{bmatrix} \begin{bmatrix} 15 \\ 17 \\ 17 \end{bmatrix}
$$

$$
w_0 = \frac{1}{9} [21(15) - 9(17) - 9(17)] = \frac{1}{9} [315 - 153 - 153] = \frac{9}{9} = \mathbf{1.0}
$$

$$
w_1 = \frac{1}{9} [-9(15) + 6(17) + 3(17)] = \frac{1}{9} [-135 + 102 + 51] = \frac{18}{9} = \mathbf{2.0}
$$

$$
w_2 = \frac{1}{9} [-9(15) + 3(17) + 6(17)] = \frac{1}{9} [-135 + 51 + 102] = \frac{18}{9} = \mathbf{2.0}
$$

**Final Result:**
- Optimal Weights: $w_0 = 1.0, w_1 = 2.0, w_2 = 2.0$.
- Learned Hypothesis: $h_{\mathbf{w}}(x_1, x_2) = 1 + 2 x_1 + 2 x_2$.

---

## 6. Formula Sheet

- **Normal Equation:**

$$
\mathbf{w}^* = (\mathbf{X}^T \mathbf{X})^{-1} \mathbf{X}^T \mathbf{y}
$$

- **Vectorized Cost Function:**

$$
J(\mathbf{w}) = \frac{1}{2m} (\mathbf{X} \mathbf{w} - \mathbf{y})^T (\mathbf{X} \mathbf{w} - \mathbf{y})
$$

---

## 7. Definition Sheet

1. **Design Matrix ($\mathbf{X}$):** An $m \times (n+1)$ matrix storing feature values of all training instances with an added column of ones for bias.
2. **Normal Equation:** An analytical method solving for optimal linear regression parameters directly via matrix operations without iterations.

---

## 8. Exam-Oriented Review

1. Derive the Normal Equation $\mathbf{w}^* = (\mathbf{X}^T \mathbf{X})^{-1} \mathbf{X}^T \mathbf{y}$ starting from $J(\mathbf{w}) = \frac{1}{2m} (\mathbf{X}\mathbf{w} - \mathbf{y})^T(\mathbf{X}\mathbf{w} - \mathbf{y})$.
2. Compare Gradient Descent and Normal Equation across computational complexity, need for $\alpha$, and scaling properties.
