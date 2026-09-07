# Chapter 6: K-Nearest Neighbors (KNN) Algorithm

> **Course Title:** Machine Learning and its Applications
> **Source Material:** Faculty Lecture Slides - Nirma University

---

## 1. Chapter Overview
K-Nearest Neighbors (KNN) is a non-parametric, instance-based "lazy learning" algorithm used for both classification and regression.

This chapter covers:
- Core principles of Lazy Learning vs. Eager Learning.
- Distance metrics ($L_1$ Manhattan, $L_2$ Euclidean, Minkowski, Cosine).
- $K$ hyperparameter selection and decision boundaries.
- The Curse of Dimensionality in high-dimensional feature spaces.
- Detailed step-by-step solved numerical problem for KNN classification with distance calculations and majority voting.
- Formula Sheet, Definition Sheet, and Exam-Oriented Review.

---

## 2. Distance Metrics Catalog

For feature vectors $\mathbf{x}^{(a)}, \mathbf{x}^{(b)} \in \mathbb{R}^d$:

1. **Euclidean Distance ($L_2$ Norm):**

$$
d_2(\mathbf{x}^{(a)}, \mathbf{x}^{(b)}) = \sqrt{\sum_{j=1}^{d} (x_j^{(a)} - x_j^{(b)})^2}
$$

2. **Manhattan Distance ($L_1$ Norm):**

$$
d_1(\mathbf{x}^{(a)}, \mathbf{x}^{(b)}) = \sum_{j=1}^{d} |x_j^{(a)} - x_j^{(b)}|
$$

3. **Minkowski Distance ($L_p$ Norm):**

$$
d_p(\mathbf{x}^{(a)}, \mathbf{x}^{(b)}) = \left( \sum_{j=1}^{d} |x_j^{(a)} - x_j^{(b)}|^p \right)^{\frac{1}{p}}
$$

---

## 3. Detailed Step-by-Step Solved Numerical Problem

### Problem Statement:
A 2D training dataset contains $m = 6$ labeled observations:

| Point | Feature $x_1$ | Feature $x_2$ | Class Label $y$ |
| :---: | :---: | :---: | :---: |
| $P_1$ | 1 | 2 | Red |
| $P_2$ | 2 | 3 | Red |
| $P_3$ | 3 | 1 | Red |
| $P_4$ | 6 | 5 | Blue |
| $P_5$ | 7 | 7 | Blue |
| $P_6$ | 8 | 6 | Blue |

**Task:**
Classify a query test point $\mathbf{x}^* = (4, 3)^T$ using KNN with $K = 3$ and Euclidean distance metric.

---

### Step-by-Step Solution:

#### Step 1: Calculate Euclidean Distance from $\mathbf{x}^* = (4, 3)$ to All Points

1. **Distance to $P_1(1, 2)$:**

$$
d(\mathbf{x}^*, P_1) = \sqrt{(4 - 1)^2 + (3 - 2)^2} = \sqrt{3^2 + 1^2} = \sqrt{9 + 1} = \sqrt{10} \approx \mathbf{3.162}
$$

2. **Distance to $P_2(2, 3)$:**

$$
d(\mathbf{x}^*, P_2) = \sqrt{(4 - 2)^2 + (3 - 3)^2} = \sqrt{2^2 + 0^2} = \sqrt{4} = \mathbf{2.000}
$$

3. **Distance to $P_3(3, 1)$:**

$$
d(\mathbf{x}^*, P_3) = \sqrt{(4 - 3)^2 + (3 - 1)^2} = \sqrt{1^2 + 2^2} = \sqrt{1 + 4} = \sqrt{5} \approx \mathbf{2.236}
$$

4. **Distance to $P_4(6, 5)$:**

$$
d(\mathbf{x}^*, P_4) = \sqrt{(4 - 6)^2 + (3 - 5)^2} = \sqrt{(-2)^2 + (-2)^2} = \sqrt{4 + 4} = \sqrt{8} \approx \mathbf{2.828}
$$

5. **Distance to $P_5(7, 7)$:**

$$
d(\mathbf{x}^*, P_5) = \sqrt{(4 - 7)^2 + (3 - 7)^2} = \sqrt{(-3)^2 + (-4)^2} = \sqrt{9 + 16} = \sqrt{25} = \mathbf{5.000}
$$

6. **Distance to $P_6(8, 6)$:**

$$
d(\mathbf{x}^*, P_6) = \sqrt{(4 - 8)^2 + (3 - 6)^2} = \sqrt{(-4)^2 + (-3)^2} = \sqrt{16 + 9} = \sqrt{25} = \mathbf{5.000}
$$

---

#### Step 2: Sort Distances to Identify $K = 3$ Nearest Neighbors

| Rank | Point | Class Label | Euclidean Distance |
| :---: | :---: | :---: | :---: |
| **1** | $P_2 (2,3)$ | Red | **2.000** |
| **2** | $P_3 (3,1)$ | Red | **2.236** |
| **3** | $P_4 (6,5)$ | Blue | **2.828** |
| 4 | $P_1 (1,2)$ | Red | 3.162 |
| 5 | $P_5 (7,7)$ | Blue | 5.000 |
| 6 | $P_6 (8,6)$ | Blue | 5.000 |

The $K = 3$ nearest neighbors are $\{P_2, P_3, P_4\}$.

---

#### Step 3: Perform Majority Voting Allocation
- Count of `Red` neighbors: 2 ($P_2, P_3$)
- Count of `Blue` neighbors: 1 ($P_4$)

**Final Prediction:**
Query point $\mathbf{x}^* = (4, 3)^T$ is classified as **Red**.

---

## 4. Formula Sheet

- **Euclidean Distance:**

$$
d_2(\mathbf{x}^{(a)}, \mathbf{x}^{(b)}) = \sqrt{\sum_{j=1}^{d} (x_j^{(a)} - x_j^{(b)})^2}
$$

- **KNN Regression Prediction:**

$$
\hat{y}^* = \frac{1}{K} \sum_{i \in \mathcal{N}_K(\mathbf{x}^*)} y^{(i)}
$$

---

## 5. Definition Sheet

1. **Lazy Learner:** An algorithm that defers model training until query prediction time, storing training instances directly in memory.
2. **Curse of Dimensionality:** Phenomenon where high feature dimensions cause data space volume to grow exponentially, rendering points equidistant.

---

## 6. Exam-Oriented Review

1. Explain the effect of choosing $K=1$ versus $K=N$ on model bias and variance.
2. Why is feature standardization mandatory prior to executing KNN?
