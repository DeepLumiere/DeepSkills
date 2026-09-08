# Chapter 3: Recurrence Relations, Divide & Conquer, and Advanced Structures

> **Course Code:** 3CS501CC24
> **Focus:** Unit-III — Recurrence Solving Techniques, Divide & Conquer Paradigm, Sorting & Selection, Exponentiation, Interval Trees & Disjoint Sets

---

## 1. Chapter Overview

Many algorithms are recursive — their running time $T(n)$ is defined in terms of smaller inputs. We need to **solve recurrences** to get closed-form complexity bounds.

**Learning Flow per Topic:**
> **Recurrence Form → Method Procedure → Worked Example → Comprehensive 10+ Step Trace (for D&C) → 📝 Q&A**

### Method Selection Guide

| Your Recurrence Looks Like… | Best Method | Time to Apply |
| :--- | :--- | :--- |
| $T(n) = a T(n/b) + f(n)$ | **Master Theorem (D&C)** | Instant — 3 cases |
| $T(n) = a T(n-b) + f(n)$ | **Master Theorem (S&C)** | Instant — 3 cases |
| $T(n) = a T(n/b) + f(n)$ (when MT doesn't apply) | **Recurrence Tree** | ~5 min — visual |
| $a_0 T(n) + \cdots + a_k T(n-k) = 0$ | **Homogeneous (Char. Eq.)** | ~5 min |
| $a_0 T(n) + \cdots + a_k T(n-k) = f(n) \neq 0$ | **Non-Homogeneous** | ~10 min |
| Input arg is non-linear: $T(\sqrt{n}), T(\log n)$ | **Change of Variable** | ~5 min |
| Range is non-linear: $[T(n)]^2$, $n \cdot T(n)$ | **Range Transformation** | ~5 min |
| Any — just need to verify | **Substitution / Induction** | Variable — needs good guess |

---

## 2. Recurrence Relations — Introduction

A **recurrence relation** is an equation that defines $T(n)$ in terms of $T$ on smaller values.

**Divide and Conquer** — breaks into $a$ subproblems of size $n/b$, combines in $f(n)$ time:
$$T(n) = a\,T\!\left(\frac{n}{b}\right) + f(n)$$

**Subtract and Conquer** — reduces problem size by constant $b$:
$$T(n) = a\,T(n-b) + f(n)$$

---

## 3. Method 1 — Substitution (Intelligent Guesswork & Induction)

1. **Guess** the form of the solution (e.g., $T(n) = O(n \log n)$)
2. **Substitute** the guess into the recurrence
3. **Prove** by mathematical induction that $T(n) \le c \cdot g(n)$

### Worked Example: $T(n) = 2T(\lfloor n/2 \rfloor) + n \implies T(n) = O(n \log n)$

- **Guess:** $T(n) \le cn\log_2 n$ for $c > 0$
- **Inductive step:** Assume $T(\lfloor n/2 \rfloor) \le c\lfloor n/2 \rfloor \log_2(\lfloor n/2 \rfloor)$
$$T(n) \le 2\!\left(c\frac{n}{2}\log_2\!\frac{n}{2}\right) + n = cn(\log_2 n - 1) + n = cn\log_2 n - cn + n$$
For $T(n) \le cn\log_2 n$: need $-cn + n \le 0 \implies c \ge 1$. ✅ Holds for $c \ge 1, n \ge 2$.

---

### 📝 Quick Practice — Substitution Method

> **Q1:** Why might the guess $T(n) = O(n)$ fail for $T(n) = 2T(\lfloor n/2 \rfloor) + n$? What adjustment fixes it?
> **Answer:** Guess $T(n) \le cn$: substitute → $T(n) \le cn + n$. Need $cn + n \le cn$ → $n \le 0$ — false! The lower-order term $+n$ causes the proof to fail. Fix: guess $T(n) \le cn\log n$.

---

## 4. Method 2 — Homogeneous Recurrences (Characteristic Equation)

A linear recurrence with **no external forcing function** ($f(n) = 0$). Substitute $T(n) = r^n$ to get the Characteristic Equation.

### Worked Example: Fibonacci $T(n) = T(n-1) + T(n-2)$, $T(0)=0, T(1)=1$
1. Characteristic equation: $r^2 - r - 1 = 0$
2. Roots: $r_1 = \dfrac{1+\sqrt{5}}{2} \approx 1.618\ (\phi)$, $r_2 = \dfrac{1-\sqrt{5}}{2} \approx -0.618\ (\psi)$
3. General solution: $T(n) = c_1 \phi^n + c_2 \psi^n$
4. Apply base cases → Binet's Formula: $T(n) = \frac{1}{\sqrt{5}}\left[\phi^n - \psi^n\right] = \Theta(1.618^n)$

---

### 📝 Quick Practice — Homogeneous Recurrences

> **Q1:** When do we get a repeated root in the characteristic equation? Give an example recurrence.
> **Answer:** A repeated root occurs when the characteristic polynomial has a root of multiplicity > 1. Example: $T(n) = 2T(n-1) - T(n-2)$ has characteristic equation $r^2 - 2r + 1 = (r-1)^2 = 0$, so $r = 1$ with multiplicity 2. Solution: $T(n) = (c_1 + c_2 n) \cdot 1^n = c_1 + c_2 n = \Theta(n)$.

---

## 5. Method 3 — Non-Homogeneous Recurrences

Form: $a_0 T(n) + a_1 T(n-1) + \cdots + a_k T(n-k) = f(n)$.
Total Solution: $T(n) = T_h(n) + T_p(n)$ (Homogeneous + Particular).

### Worked Example: $T(n) - 2T(n-1) = 3^n$, $T(0) = 1$
1. **Homogeneous:** $r - 2 = 0 \implies r = 2 \implies T_h(n) = c_1 \cdot 2^n$
2. **Particular:** $f(n) = 3^n$. Root 3 is not 2. Guess $T_p = P \cdot 3^n$.
   $P \cdot 3^n - 2(P \cdot 3^{n-1}) = 3^n \implies P(1 - 2/3) = 1 \implies P = 3$. $T_p(n) = 3^{n+1}$.
3. **Total:** $T(n) = c_1 \cdot 2^n + 3^{n+1}$. Use $T(0)=1 \implies c_1 = -2$.
   Solution: $T(n) = 3^{n+1} - 2^{n+1} = \Theta(3^n)$.

---

### 📝 Quick Practice — Non-Homogeneous Recurrences

> **Q2:** Why do we multiply the particular solution guess by $n^m$ when the base $a$ IS a characteristic root of multiplicity $m$?
> **Answer:** When $a$ is a root, $a^n$ satisfies the homogeneous equation and would be absorbed into $T_h$, making the particular guess redundant (would give 0 on the left side). Multiplying by $n^m$ creates a linearly independent function.

---

## 6. Method 4 — Change of Variable (Domain Transformation)

When $T(\cdot)$ has a **non-linear argument** (e.g., $T(\sqrt{n})$). Substitute to linearize.

### Worked Example: $T(n) = 2T(\lfloor\sqrt{n}\rfloor) + \log_2 n$
1. Let $n = 2^m \implies \sqrt{n} = 2^{m/2}$, $\log_2 n = m$
2. Substitute: $T(2^m) = 2T(2^{m/2}) + m$
3. Let $S(m) = T(2^m)$: $S(m) = 2S(m/2) + m$
4. Apply Master Theorem Case 2: $S(m) = \Theta(m \log m)$
5. Substitute back $m = \log_2 n$: $\boxed{T(n) = \Theta(\log n \cdot \log\log n)}$

---

### 📝 Quick Practice — Change of Variable

> **Q2:** Why can't we directly apply Master Theorem to $T(n) = 2T(\sqrt{n}) + \log n$?
> **Answer:** The Master Theorem applies to recurrences of the form $T(n) = aT(n/b) + f(n)$ where $n/b$ is a **division** of $n$. Here the argument is $\sqrt{n} = n^{1/2}$, which is a *power* of $n$, not a division by a constant $b$.

---

## 7. Method 5 — Range Transformations

When the **value** of $T(n)$ is transformed — e.g., $T(n) = n \cdot [T(n/2)]^2$. Take logarithms on both sides to linearize the range.

### Worked Example: $T(n) = n \cdot [T(n/2)]^2$
Take $\log_2$: $\log_2 T(n) = \log_2 n + 2\log_2 T(n/2)$. Let $U(n) = \log_2 T(n)$.
$U(n) = 2U(n/2) + \log_2 n$. Master Theorem Case 1: $U(n) = \Theta(n)$.
Back-substitute: $\log_2 T(n) = \Theta(n) \implies T(n) = \Theta(2^{\Theta(n)})$.

---

## 8. Method 6 — Master Theorem

For $T(n) = aT(n/b) + f(n)$ where $a \ge 1, b > 1$. Let $c_{crit} = \log_b a$.

| Case | Condition on $f(n)$ | Solution $T(n)$ | Meaning |
| :--- | :--- | :--- | :--- |
| **1** | $f(n) = O(n^{c_{crit} - \epsilon})$ | $\Theta(n^{c_{crit}})$ | Leaf cost dominates |
| **2** | $f(n) = \Theta(n^{c_{crit}} \log^k n)$ | $\Theta(n^{c_{crit}} \log^{k+1} n)$ | Work is balanced across levels |
| **3** | $f(n) = \Omega(n^{c_{crit} + \epsilon})$ + regularity | $\Theta(f(n))$ | Root cost dominates |

---

### 📝 Quick Practice — Master Theorem

> **Q2:** Why does the Master Theorem fail for $T(n) = 2T(n/2) + n\log n$? What is the actual answer?
> **Answer:** Here $a=2, b=2, c_{crit}=1$. $f(n) = n\log n$. Is $f(n) = O(n^{1-\epsilon})$? No. Is $f(n) = \Omega(n^{1+\epsilon})$? No. Is $f(n) = \Theta(n)$? No. So $f(n) = \Theta(n^1 \cdot \log^1 n)$ which is the **extended Case 2** with $k=1$: $T(n) = \Theta(n \log^2 n)$.

---

## 9. Method 7 — Recurrence Tree Method

A **Recurrence Tree** visually expands the recursion, treating each node as the work done at that call. Sum across all levels.

### Comprehensive Trace: $T(n) = 3T(n/4) + cn^2$

| Level $j$ | # Nodes | Work per Node | **Total Work at Level $j$** |
| :--- | :--- | :--- | :--- |
| 0 | 1 | $cn^2$ | $cn^2$ |
| 1 | 3 | $c(n/4)^2 = cn^2/16$ | $3 \cdot cn^2/16 = \frac{3}{16}cn^2$ |
| 2 | $3^2 = 9$ | $c(n/16)^2 = cn^2/256$ | $9 \cdot cn^2/256 = \left(\frac{3}{16}\right)^2 cn^2$ |
| $j$ | $3^j$ | $c(n/4^j)^2$ | $\left(\dfrac{3}{16}\right)^j cn^2$ |
| $h = \log_4 n$ | $3^{\log_4 n} = n^{\log_4 3}$ | $\Theta(1)$ | $\Theta(n^{\log_4 3})$ |

Summing geometric series: $cn^2 \sum (\frac{3}{16})^j = \Theta(n^2)$.

---

## 10. Divide & Conquer Algorithms (Comprehensive Traces)

The Divide and Conquer paradigm: **Divide** → **Conquer** → **Combine**.

---

### Algorithm 1: Merge Sort

**Recurrence:** $T(n) = 2T(n/2) + \Theta(n) \implies T(n) = \Theta(n \log n)$

#### Comprehensive 16-Element Merge Sort Trace
Array: `[38, 27, 43, 3, 9, 82, 10, 19, 50, 4, 1, 99, 5, 23, 11, 7]`

**Phase 1: Divide (Split down to base cases of size 1)**
- `[38, 27, 43, 3, 9, 82, 10, 19]` | `[50, 4, 1, 99, 5, 23, 11, 7]`
- `[38, 27, 43, 3]` | `[9, 82, 10, 19]` || `[50, 4, 1, 99]` | `[5, 23, 11, 7]`
- `[38, 27]` | `[43, 3]` || `[9, 82]` | `[10, 19]` || `[50, 4]` | `[1, 99]` || `[5, 23]` | `[11, 7]`
- `[38]` `[27]` | `[43]` `[3]` || `[9]` `[82]` | `[10]` `[19]` || `[50]` `[4]` | `[1]` `[99]` || `[5]` `[23]` | `[11]` `[7]`

**Phase 2: Conquer & Combine (Merge sorted subarrays)**
- **Level 1 Merges:** `[27, 38]` | `[3, 43]` || `[9, 82]` | `[10, 19]` || `[4, 50]` | `[1, 99]` || `[5, 23]` | `[7, 11]`
- **Level 2 Merges:** `[3, 27, 38, 43]` || `[9, 10, 19, 82]` || `[1, 4, 50, 99]` || `[5, 7, 11, 23]`
- **Level 3 Merges:** `[3, 9, 10, 19, 27, 38, 43, 82]` || `[1, 4, 5, 7, 11, 23, 50, 99]`
- **Final Merge (Level 4):**
  - Compare 3 and 1 → take 1
  - Compare 3 and 4 → take 3
  - Compare 9 and 4 → take 4
  - Compare 9 and 5 → take 5
  - ... continues ...
  - `[1, 3, 4, 5, 7, 9, 10, 11, 19, 23, 27, 38, 43, 50, 82, 99]` ✅ Sorted!

---

### Algorithm 2: Quick Sort

**Recurrence (Average):** $T(n) = 2T(n/2) + \Theta(n) \implies \Theta(n \log n)$
**Recurrence (Worst):** $T(n) = T(n-1) + \Theta(n) \implies \Theta(n^2)$

#### Comprehensive 12-Element Partition Trace (Lomuto Scheme)
Array `A = [13, 19, 9, 5, 12, 8, 7, 4, 21, 2, 6, 11]`
Pivot = `A[high] = 11`. Let `i = -1`. Loop `j` from `0` to `10`.
Goal: Everything $\le 11$ goes left of `i`, everything $> 11$ goes right of `i`.

| j | A[j] | A[j] $\le$ pivot(11)? | Action (if true: `i++`, swap `A[i], A[j]`) | Array State After Iteration |
| :--- | :--- | :--- | :--- | :--- |
| 0 | 13 | 13 $\le$ 11 ❌ | Skip | `[13, 19, 9, 5, 12, 8, 7, 4, 21, 2, 6, 11]` |
| 1 | 19 | 19 $\le$ 11 ❌ | Skip | `[13, 19, 9, 5, 12, 8, 7, 4, 21, 2, 6, 11]` |
| 2 | 9 | 9 $\le$ 11 ✅ | `i=0`. Swap A[0](13) & A[2](9) | `[`**`9`**`, 19, `*`13`*`, 5, 12, 8, 7, 4, 21, 2, 6, 11]` |
| 3 | 5 | 5 $\le$ 11 ✅ | `i=1`. Swap A[1](19) & A[3](5) | `[9, `**`5`**`, 13, `*`19`*`, 12, 8, 7, 4, 21, 2, 6, 11]` |
| 4 | 12 | 12 $\le$ 11 ❌ | Skip | `[9, 5, 13, 19, 12, 8, 7, 4, 21, 2, 6, 11]` |
| 5 | 8 | 8 $\le$ 11 ✅ | `i=2`. Swap A[2](13) & A[5](8) | `[9, 5, `**`8`**`, 19, 12, `*`13`*`, 7, 4, 21, 2, 6, 11]` |
| 6 | 7 | 7 $\le$ 11 ✅ | `i=3`. Swap A[3](19) & A[6](7) | `[9, 5, 8, `**`7`**`, 12, 13, `*`19`*`, 4, 21, 2, 6, 11]` |
| 7 | 4 | 4 $\le$ 11 ✅ | `i=4`. Swap A[4](12) & A[7](4) | `[9, 5, 8, 7, `**`4`**`, 13, 19, `*`12`*`, 21, 2, 6, 11]` |
| 8 | 21 | 21 $\le$ 11 ❌ | Skip | `[9, 5, 8, 7, 4, 13, 19, 12, 21, 2, 6, 11]` |
| 9 | 2 | 2 $\le$ 11 ✅ | `i=5`. Swap A[5](13) & A[9](2) | `[9, 5, 8, 7, 4, `**`2`**`, 19, 12, 21, `*`13`*`, 6, 11]` |
| 10| 6 | 6 $\le$ 11 ✅ | `i=6`. Swap A[6](19) & A[10](6) | `[9, 5, 8, 7, 4, 2, `**`6`**`, 12, 21, 13, `*`19`*`, 11]` |

**Final Step:** Swap Pivot A[11](11) with A[i+1] = A[7](12).
**Result:** `[9, 5, 8, 7, 4, 2, 6, `**`11`**`, 21, 13, 19, 12]`
*(Pivot 11 is now at index 7. All elements to its left are $\le 11$. All to its right are $> 11$.)* ✅

---

### Algorithm 3: Deterministic Selection (Median of Medians)

**Recurrence:** $T(n) \le T(n/5) + T(7n/10) + O(n) \implies \Theta(n)$
Guarantees $O(n)$ worst-case selection of the $k$-th smallest element.

#### Comprehensive 25-Element Trace
Goal: Find the median of medians (the pivot) for array of 25 elements.
Array: `[12, 3, 9, 21, 7, 44, 2, 8, 19, 5, 33, 1, 14, 29, 6, 18, 10, 24, 15, 11, 27, 4, 22, 13, 20]`

**Step 1: Group into 5s**
- G1: `[12, 3, 9, 21, 7]`
- G2: `[44, 2, 8, 19, 5]`
- G3: `[33, 1, 14, 29, 6]`
- G4: `[18, 10, 24, 15, 11]`
- G5: `[27, 4, 22, 13, 20]`

**Step 2: Find Median of each group (sort 5 elements: O(1) time)**
- G1 Sorted: `[3, 7, 9, 12, 21]` → Median = **9**
- G2 Sorted: `[2, 5, 8, 19, 44]` → Median = **8**
- G3 Sorted: `[1, 6, 14, 29, 33]` → Median = **14**
- G4 Sorted: `[10, 11, 15, 18, 24]` → Median = **15**
- G5 Sorted: `[4, 13, 20, 22, 27]` → Median = **20**

**Step 3: Median of Medians**
- Array of medians: `[9, 8, 14, 15, 20]`
- Sort them: `[8, 9, 14, 15, 20]`
- Median of Medians = **14**.

**Step 4: Use 14 as Pivot to Partition the original 25 elements**
- The algorithm guarantees that at least $3n/10$ elements are $\le 14$, and at least $3n/10$ elements are $\ge 14$. This ensures a balanced partition, preventing the $O(n^2)$ worst case of QuickSort.

---

### Algorithm 4: Karatsuba Integer Multiplication

**Recurrence:** $T(n) = 3T(n/2) + O(n) \implies \Theta(n^{1.585})$
Standard multiplication requires 4 recursive calls. Karatsuba uses math to do it in 3.

#### Comprehensive 8-Digit Multiplication Trace
Multiply $X = 12345678$ and $Y = 87654321$ ($n=8$).
Split in half: $X_L=1234, X_R=5678, Y_L=8765, Y_R=4321$.

Instead of computing $X_L Y_L, X_L Y_R, X_R Y_L, X_R Y_R$, we compute 3 products:
1. $P_1 = X_L \times Y_L = 1234 \times 8765 = 10815910$
2. $P_2 = X_R \times Y_R = 5678 \times 4321 = 24534638$
3. $P_3 = (X_L + X_R) \times (Y_L + Y_R) = (1234 + 5678) \times (8765 + 4321) = 6912 \times 13086 = 90450432$

Compute the middle term:
$Middle = P_3 - P_1 - P_2 = 90450432 - 10815910 - 24534638 = 55099884$

Combine with base $10^8$ and $10^4$:
$Result = P_1 \times 10^8 + Middle \times 10^4 + P_2$
$Result = 1081591000000000 + 550998840000 + 24534638 = 1082142023414638$ ✅

---

### Algorithm 5: Strassen's Matrix Multiplication

**Recurrence:** $T(n) = 7T(n/2) + \Theta(n^2) \implies \Theta(n^{2.807})$
Multiplies two $n \times n$ matrices using 7 block multiplications instead of 8.

#### Block Decomposition Trace (4x4 to 2x2)
Given two $4 \times 4$ matrices $A$ and $B$, split into four $2 \times 2$ blocks:
$A = \begin{pmatrix} A_{11} & A_{12} \\ A_{21} & A_{22} \end{pmatrix}$ and $B = \begin{pmatrix} B_{11} & B_{12} \\ B_{21} & B_{22} \end{pmatrix}$

Compute 7 products (recursively!):
1. $M_1 = (A_{11} + A_{22})(B_{11} + B_{22})$
2. $M_2 = (A_{21} + A_{22})B_{11}$
3. $M_3 = A_{11}(B_{12} - B_{22})$
4. $M_4 = A_{22}(B_{21} - B_{11})$
5. $M_5 = (A_{11} + A_{12})B_{22}$
6. $M_6 = (A_{21} - A_{11})(B_{11} + B_{12})$
7. $M_7 = (A_{12} - A_{22})(B_{21} + B_{22})$

Reconstruct $C = A \times B$:
$C_{11} = M_1 + M_4 - M_5 + M_7$
$C_{12} = M_3 + M_5$
$C_{21} = M_2 + M_4$
$C_{22} = M_1 - M_2 + M_3 + M_6$

---

### Algorithm 6: Modular Exponentiation

**Recurrence:** $T(n) = T(n/2) + O(1) \implies \Theta(\log n)$
Compute $(a^n) \pmod m$ fast.

#### Comprehensive 21-Bit Binary Exponentiation Trace
Compute $3^{21} \pmod 7$.
21 in binary is $10101_2$. We process bits from LSB to MSB (or recursively).

```text
POWER(3, 21):
- n=21 (odd).  temp = POWER(3, 10). Return (3 * temp^2) mod 7
- n=10 (even). temp = POWER(3, 5).  Return (temp^2) mod 7
- n=5 (odd).   temp = POWER(3, 2).  Return (3 * temp^2) mod 7
- n=2 (even).  temp = POWER(3, 1).  Return (temp^2) mod 7
- n=1 (odd).   temp = POWER(3, 0).  Return (3 * temp^2) mod 7
- n=0.         Return 1
```

**Backwards Evaluation (Bottom-Up Modulo):**
| n | Even/Odd | Formula | Modulo 7 Arithmetic | Return Value |
| :--- | :--- | :--- | :--- | :--- |
| 0 | Base | 1 | 1 mod 7 | **1** |
| 1 | Odd | $3 \times temp^2$ | $3 \times 1^2 = 3 \pmod 7$ | **3** |
| 2 | Even | $temp^2$ | $3^2 = 9 \pmod 7$ | **2** |
| 5 | Odd | $3 \times temp^2$ | $3 \times 2^2 = 12 \pmod 7$ | **5** |
| 10| Even | $temp^2$ | $5^2 = 25 \pmod 7$ | **4** |
| 21| Odd | $3 \times temp^2$ | $3 \times 4^2 = 3 \times 16 = 48 \pmod 7$ | **6** |

Result: $3^{21} \pmod 7 = 6$. ✅ (Took 6 steps instead of 20 multiplications).

---

## 11. Formula Sheet & Definitions

| Term | Definition / Formula |
| :--- | :--- |
| **Master Theorem (D&C)** | $T(n) = a T(n/b) + f(n)$ |
| **Master Theorem (S&C)** | $T(n) = a T(n-b) + f(n)$ |
| **Merge Sort** | $T(n) = 2T(n/2) + \Theta(n) \implies \Theta(n \log n)$ |
| **Quick Sort (Expected)** | $T(n) = 2T(n/2) + \Theta(n) \implies \Theta(n \log n)$ |
| **Median of Medians** | $T(n) \le T(n/5) + T(7n/10) + O(n) \implies \Theta(n)$ |
| **Karatsuba** | $T(n) = 3T(n/2) + O(n) \implies \Theta(n^{\log_2 3}) \approx \Theta(n^{1.585})$ |
| **Strassen** | $T(n) = 7T(n/2) + \Theta(n^2) \implies \Theta(n^{\log_2 7}) \approx \Theta(n^{2.807})$ |

---

## 12. Exam-Oriented Review

1. **Substitution Method:** Prove that $T(n) = 2T(\lfloor n/2 \rfloor) + n$ has solution $T(n) = O(n \log n)$ by mathematical induction.
2. **Characteristic Roots:** Solve $T(n) - 5T(n-1) + 6T(n-2) = 0$ given $T(0) = 1, T(1) = 4$.
3. **Master Theorem:** Solve (a) $T(n) = 4T(n/2) + n$, (b) $T(n) = 4T(n/2) + n^2$, (c) $T(n) = 4T(n/2) + n^3$. Which case applies in each?
4. **Recurrence Tree:** Draw the recurrence tree for $T(n) = 3T(n/4) + cn^2$. Build the level-cost table and sum the geometric series.
5. **Karatsuba:** Compute $X = 1234 \times Y = 5678$ using Karatsuba's algorithm. Show how $P_3 - P_1 - P_2$ gives the middle term.
6. **Merge Sort vs Quick Sort:** Compare their recurrences, time complexities in all cases, space requirements, and stability. When would you choose each? Trace Quick Sort partition on `[8, 3, 9, 2, 6, 1, 5]` with pivot `5`.
7. **Median-of-Medians:** Why does grouping into 5 (not 3 or 7) work? Derive the recurrence $T(n) \le T(n/5) + T(7n/10) + O(n)$. Trace it on an array of 25 elements.
8. **Strassen's Algorithm:** Write the 7 formulas $M_1 \ldots M_7$ and verify $C_{22} = M_1 - M_2 + M_3 + M_6$.
9. **Modular Exponentiation:** Compute $(3^{13}) \bmod 7$ using Divide & Conquer binary exponentiation. Show each recursive call and the modulo math at each return step.
