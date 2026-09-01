# Complete DAA Notes: Unit 6 — Dynamic Programming

# Chapter 6 — Dynamic Programming

> **Course Code:** 3CS501CC24
> **Primary Source:** DAA_Unit6.pptx

## 1. Chapter Overview
This unit covers the foundational concepts of Dynamic Programming (DP), a powerful algorithmic paradigm used to solve optimization problems by breaking them down into simpler, overlapping subproblems. We explore the Principle of Optimality, and trace various classic problems including Binomial Coefficients, the Coin Change Problem, 0/1 Knapsack, Longest Common Subsequence (LCS), Matrix Chain Multiplication, and the Floyd-Warshall All-Pairs Shortest Path algorithm. 

---

## 2. Introduction to Dynamic Programming
Dynamic programming is an algorithm design technique used for solving optimization problems. Like divide-and-conquer, DP solves a problem by combining the solutions to sub-problems. However, unlike divide-and-conquer where sub-problems are independent, DP is applicable when sub-problems overlap (i.e., when they share sub-subproblems).

### Principle of Optimality (Bellman)
The principle of optimality states that "in an optimal sequence of decisions or choices, each subsequence must also be optimal." If a problem does not satisfy this principle, it cannot be solved optimally using DP.

### Two Key Properties of DP
1. **Optimal Substructure:** A problem exhibits optimal substructure if an optimal solution to the overall problem can be constructed from optimal solutions to its subproblems.
2. **Overlapping Subproblems:** The problem can be broken down into subproblems which are reused several times. Instead of solving the same subproblem repeatedly, DP stores the result (memoization/tabulation) so that it can be looked up in $O(1)$ time.

### Memoization (Top-Down) vs Tabulation (Bottom-Up)
- **Memoization (Top-Down):** Starts from the main problem and recursively breaks it down. The results of solved subproblems are stored in a data structure (like an array or hash map). If the subproblem is encountered again, its value is directly returned.
- **Tabulation (Bottom-Up):** Starts from the base cases (smallest subproblems) and iteratively builds up the solutions to larger subproblems using loops. Solutions are stored in a table sequentially.

### Greedy vs DP vs D&C Comparison
| Feature | Greedy Approach | Dynamic Programming | Divide & Conquer |
| :--- | :--- | :--- | :--- |
| **Completeness/Optimality** | Sometimes optimal (local optimum) | Always yields global optimum | Yields exact solution |
| **Subproblems** | No overlapping subproblems | Overlapping subproblems | Non-overlapping subproblems |
| **Direction** | Top-down decision making | Typically Bottom-up | Top-down |
| **Applicability** | Fractional Knapsack, MST | 0/1 Knapsack, LCS, Matrix Chain | Merge Sort, Quick Sort |

### General 4-Step Approach to DP
1. **Define Subproblem:** Characterize the structure of an optimal solution.
2. **Recurrence:** Recursively define the value of an optimal solution in terms of subproblems.
3. **Fill Table:** Compute the value of an optimal solution, typically in a bottom-up fashion (tabulation).
4. **Reconstruct:** Construct an optimal solution from computed information.

[Source: DAA_Unit6.pptx, Slide 3-26]

---

## 3. Problem: Binomial Coefficient
The binomial coefficient $C(n, k)$ counts the number of ways to choose $k$ items from a set of $n$ distinct items.

### Recurrence Relation
The value can be computed using the following standard recurrence:
$$
C(n, r) = C(n-1, r-1) + C(n-1, r)
$$
**Base Cases:**
$$
C(n, 0) = 1
$$
$$
C(n, n) = 1
$$

### DP Table Approach (Pascal's Triangle)
The DP approach builds a 2D table where `dp[i][j]` stores $C(i, j)$. This structure directly mirrors Pascal's Triangle.

### Pseudocode
```cpp
int binomialCoeff(int n, int r) {
    int C[n + 1][r + 1];
    for (int i = 0; i <= n; i++) {
        for (int j = 0; j <= min(i, r); j++) {
            if (j == 0 || j == i) {
                C[i][j] = 1;
            } else {
                C[i][j] = C[i - 1][j - 1] + C[i - 1][j];
            }
        }
    }
    return C[n][r];
}
```

### Complete Example $C(5,2)$
We want to calculate $C(5,2)$. We create a table up to $n=5$ and $r=2$.

| i / j | 0 | 1 | 2 |
| :--- | :--- | :--- | :--- |
| **0** | 1 | - | - |
| **1** | 1 | 1 | - |
| **2** | 1 | 2 | 1 |
| **3** | 1 | 3 | 3 |
| **4** | 1 | 4 | 6 |
| **5** | 1 | 5 | 10 |

The answer is $C(5,2) = 10$.

### Complexity
- **Time Complexity:** $O(n \cdot r)$ — Table is of size $n \times r$.
- **Space Complexity:** $O(n \cdot r)$ — Memory needed for 2D table.

[Source: DAA_Unit6.pptx, Slide 19-25]

---

## 4. Problem: Making Change (DP)
**Problem:** Find the minimum number of coins to make a given amount $A$ using a given set of coin denominations $d_1, d_2, \dots, d_N$. Assume infinite supply of each coin.

### Recurrence
Let $C[i][j]$ be the minimum number of coins needed to form amount $j$ using the first $i$ coin denominations.
$$
C[i][j] = \begin{cases} C[i-1][j] & \text{if } j < d_i \\ \min(C[i-1][j], 1 + C[i][j - d_i]) & \text{if } j \ge d_i \end{cases}
$$

### Complete Worked Example
**Denominations:** $d = \{1, 4, 6\}$
**Amount:** $A = 8$

| Coin (i) \ Amount (j) | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **0 (No coins)** | 0 | $\infty$ | $\infty$ | $\infty$ | $\infty$ | $\infty$ | $\infty$ | $\infty$ | $\infty$ |
| **1 (d=1)** | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 |
| **2 (d=1, 4)** | 0 | 1 | 2 | 3 | 1 | 2 | 3 | 4 | 2 |
| **3 (d=1, 4, 6)** | 0 | 1 | 2 | 3 | 1 | 2 | 1 | 2 | 2 |

**Traceback / Reconstruction:**
- $C[3][8] = 2$. It equals $C[2][8] = 2$. We did not use coin 6.
- $C[2][8] \neq C[1][8]$. $C[2][8] = 1 + C[2][4]$. Include coin $4$.
- Current amount $8 - 4 = 4$.
- $C[2][4] \neq C[1][4]$. $C[2][4] = 1 + C[2][0]$. Include coin $4$.
- Current amount $4 - 4 = 0$. Stop.
- **Solution:** Two coins of denomination 4.

### Note on Counting All Ways
If we want to find the *number of ways* to make a change, the recurrence is:
$$
DP[i][j] = DP[i-1][j] + DP[i][j - d_i]
$$
Complexity remains $O(N \cdot A)$ for both Time and Space.

[Source: DAA_Unit6.pptx, Slide 27-39]

---

## 5. Problem: Matrix Chain Multiplication ★★
**Problem:** Given a sequence of $n$ matrices $A_1, A_2, \dots, A_n$, find the optimal parenthesization of the product $A_1 \cdot A_2 \dots A_n$ that minimizes the total number of scalar multiplications.
Matrix $A_i$ has dimension $p_{i-1} \times p_i$.

### Why Order Matters
Suppose we have matrices $A$ ($10 \times 30$), $B$ ($30 \times 5$), and $C$ ($5 \times 60$).
- $(AB)C$: $(10 \times 30 \times 5) + (10 \times 5 \times 60) = 1500 + 3000 = 4500$ multiplications.
- $A(BC)$: $(30 \times 5 \times 60) + (10 \times 30 \times 60) = 9000 + 18000 = 27000$ multiplications.
Optimal parenthesization dramatically reduces the cost!

### Recurrence
Let $m[i,j]$ be the minimum number of scalar multiplications needed to compute the matrix $A_{i..j}$.
$$
m[i,j] = \begin{cases} 0 & \text{if } i = j \\ \min_{i \le k < j} \{ m[i,k] + m[k+1,j] + p_{i-1} \cdot p_k \cdot p_j \} & \text{if } i < j \end{cases}
$$

### Pseudocode
```text
MATRIX-CHAIN-ORDER(p)
    n = p.length - 1
    let m[1..n, 1..n] and s[1..n, 1..n] be new tables
    for i = 1 to n:
        m[i, i] = 0
    for l = 2 to n:          // l is the chain length
        for i = 1 to n - l + 1:
            j = i + l - 1
            m[i, j] = infinity
            for k = i to j - 1:
                q = m[i, k] + m[k+1, j] + p[i-1]*p[k]*p[j]
                if q < m[i, j]:
                    m[i, j] = q
                    s[i, j] = k   // split point
    return m, s
```

### Complete Worked Example
Dimensions: $A$ ($5 \times 4$), $B$ ($4 \times 6$), $C$ ($6 \times 2$), $D$ ($2 \times 7$)
$p = [5, 4, 6, 2, 7]$

**Length $l = 1$:**
$m[1,1] = m[2,2] = m[3,3] = m[4,4] = 0$

**Length $l = 2$:**
- $m[1,2] = m[1,1] + m[2,2] + p_0 p_1 p_2 = 0 + 0 + (5 \cdot 4 \cdot 6) = 120$
- $m[2,3] = m[2,2] + m[3,3] + p_1 p_2 p_3 = 0 + 0 + (4 \cdot 6 \cdot 2) = 48$
- $m[3,4] = m[3,3] + m[4,4] + p_2 p_3 p_4 = 0 + 0 + (6 \cdot 2 \cdot 7) = 84$

**Length $l = 3$:**
- $m[1,3]$ is min of:
  - $k=1$: $m[1,1] + m[2,3] + p_0 p_1 p_3 = 0 + 48 + 5 \cdot 4 \cdot 2 = 88$
  - $k=2$: $m[1,2] + m[3,3] + p_0 p_2 p_3 = 120 + 0 + 5 \cdot 6 \cdot 2 = 180$
  - Result: $m[1,3] = 88$ (split $k=1$)
- $m[2,4]$ is min of:
  - $k=2$: $m[2,2] + m[3,4] + p_1 p_2 p_4 = 0 + 84 + 4 \cdot 6 \cdot 7 = 252$
  - $k=3$: $m[2,3] + m[4,4] + p_1 p_3 p_4 = 48 + 0 + 4 \cdot 2 \cdot 7 = 104$
  - Result: $m[2,4] = 104$ (split $k=3$)

**Length $l = 4$:**
- $m[1,4]$ is min of:
  - $k=1$: $m[1,1] + m[2,4] + p_0 p_1 p_4 = 0 + 104 + 5 \cdot 4 \cdot 7 = 244$
  - $k=2$: $m[1,2] + m[3,4] + p_0 p_2 p_4 = 120 + 84 + 5 \cdot 6 \cdot 7 = 414$
  - $k=3$: $m[1,3] + m[4,4] + p_0 p_3 p_4 = 88 + 0 + 5 \cdot 2 \cdot 7 = 158$
  - Result: $m[1,4] = 158$ (split $k=3$)

**Optimal Matrix Table `m`:**
|   | 1 (A) | 2 (B) | 3 (C) | 4 (D) |
| :--- | :--- | :--- | :--- | :--- |
| **1** | 0 | 120 | 88 | 158 |
| **2** | - | 0 | 48 | 104 |
| **3** | - | - | 0 | 84 |
| **4** | - | - | - | 0 |

**Reconstruction:**
Optimal cost is 158. $s[1,4] = 3$. We split at $C$. 
$(A_1 \dots A_3) A_4$.
For $A_1 \dots A_3$, $s[1,3] = 1$. We split at $A$.
$A_1 (A_2 A_3)$.
Final parenthesization: **$(A (B C)) D$**

### Complexity
- **Time Complexity:** $O(n^3)$ — 3 nested loops (length, $i$, and $k$).
- **Space Complexity:** $O(n^2)$ — Two $n \times n$ tables.

[Source: DAA_Unit6.pptx, Slide 69-82]

---

## 6. Problem: Longest Common Subsequence (LCS) ★★
**Problem:** Given two sequences $X$ and $Y$, find the length of the longest subsequence present in both. A subsequence appears in the same relative order but is not necessarily contiguous. 

### Recurrence
Let $c[i,j]$ be the length of the LCS of $X[1..i]$ and $Y[1..j]$.
$$
c[i,j] = \begin{cases} 0 & \text{if } i = 0 \text{ or } j = 0 \\ c[i-1,j-1] + 1 & \text{if } X[i] = Y[j] \\ \max(c[i-1,j], c[i,j-1]) & \text{if } X[i] \neq Y[j] \end{cases}
$$

### Pseudocode (Bottom-Up DP)
```cpp
int LCSLength(string X, string Y, int m, int n) {
    int L[m + 1][n + 1];
    for (int i = 0; i <= m; i++) {
        for (int j = 0; j <= n; j++) {
            if (i == 0 || j == 0)
                L[i][j] = 0;
            else if (X[i - 1] == Y[j - 1])
                L[i][j] = L[i - 1][j - 1] + 1;
            else
                L[i][j] = max(L[i - 1][j], L[i][j - 1]);
        }
    }
    return L[m][n];
}
```

### Complete Worked Example
**X:** `ABCBDAB`
**Y:** `BDCABA`

Let's compute the DP table $c[i,j]$:

| | $\emptyset$ | B | D | C | A | B | A |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **$\emptyset$** | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| **A** | 0 | 0 | 0 | 0 | 1 | 1 | 1 |
| **B** | 0 | 1 | 1 | 1 | 1 | 2 | 2 |
| **C** | 0 | 1 | 1 | 2 | 2 | 2 | 2 |
| **B** | 0 | 1 | 1 | 2 | 2 | 3 | 3 |
| **D** | 0 | 1 | 2 | 2 | 2 | 3 | 3 |
| **A** | 0 | 1 | 2 | 2 | 3 | 3 | 4 |
| **B** | 0 | 1 | 2 | 2 | 3 | 4 | 4 |

**Reconstruction:**
Starting from bottom-right (4), backtrack: if characters match, move diagonally left-up and output char. If not, move to the maximum of `up` or `left`.
Path: `B`, `A`, `D`, `B` (in reverse).
LCS: `BDAB` (length 4). Other valid LCSs: `BCAB`, `BCBA`.

### Complexity
- **Time Complexity:** $O(m \cdot n)$ — Size of the table.
- **Space Complexity:** $O(m \cdot n)$ — Table storage.

[Source: DAA_Unit6.pptx, Slide 54-68]

---

## 7. Problem: 0/1 Knapsack ★★
**Problem:** Given $n$ items, each with a weight $w_i$ and value $v_i$, and a knapsack of capacity $W$, select a subset of items to maximize the total value such that the total weight does not exceed $W$. Fractions of an item are not allowed (0 or 1 choice).

### Recurrence
Let $K[i, w]$ be the maximum value obtained by using the first $i$ items and a capacity of $w$.
$$
K[i,w] = \begin{cases} 0 & \text{if } i = 0 \text{ or } w = 0 \\ K[i-1,w] & \text{if } w_i > w \\ \max(K[i-1,w], v_i + K[i-1,w-w_i]) & \text{if } w_i \le w \end{cases}
$$

### Complete Worked Example
**Items:**
- Item 1: $w_1 = 1, v_1 = 1$
- Item 2: $w_2 = 2, v_2 = 6$
- Item 3: $w_3 = 5, v_3 = 18$
- Item 4: $w_4 = 6, v_4 = 22$
- Item 5: $w_5 = 7, v_5 = 28$

**Capacity:** $W = 11$

DP Table for $K[i, w]$:

| i \ w | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **0** | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| **1 (w=1,v=1)** | 0 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 |
| **2 (w=2,v=6)** | 0 | 1 | 6 | 7 | 7 | 7 | 7 | 7 | 7 | 7 | 7 | 7 |
| **3 (w=5,v=18)**| 0 | 1 | 6 | 7 | 7 | 18 | 19 | 24 | 25 | 25 | 25 | 25 |
| **4 (w=6,v=22)**| 0 | 1 | 6 | 7 | 7 | 18 | 22 | 24 | 28 | 29 | 29 | 40 |
| **5 (w=7,v=28)**| 0 | 1 | 6 | 7 | 7 | 18 | 22 | 28 | 29 | 34 | 35 | 40 |

**Reconstruction:**
- Start at $K[5, 11] = 40$. $K[5,11] = K[4,11]$, so Item 5 is **NOT** included.
- Move to $K[4, 11] = 40$. $K[4,11] \neq K[3,11]$. Thus, Item 4 **IS** included. Current capacity: $11 - 6 = 5$.
- Move to $K[3, 5] = 18$. $K[3,5] \neq K[2,5]$. Thus, Item 3 **IS** included. Current capacity: $5 - 5 = 0$.
- Stop. Items selected: 3 and 4. Total Value = 40. Total Weight = 11.

### Complexity
- **Time Complexity:** $O(n \cdot W)$ — This is a pseudo-polynomial time algorithm.
- **Space Complexity:** $O(n \cdot W)$ — 2D array size.

[Source: DAA_Unit6.pptx, Slide 40-53]

---

## 8. Problem: Optimal Binary Search Tree
*(This topic was not present in the provided Unit 6 slides. Proceeding to Floyd-Warshall.)*

---

## 9. Problem: Floyd-Warshall All-Pairs Shortest Path ★★
**Problem:** Find the shortest paths between all pairs of vertices in a directed, weighted graph. The graph may have negative weight edges but no negative weight cycles.

### Recurrence
Let $D^{(k)}[i,j]$ be the shortest path from vertex $i$ to vertex $j$ using only vertices from the set $\{1, 2, \dots, k\}$ as intermediate vertices.
$$
D^{(0)}[i,j] = \begin{cases} 0 & \text{if } i = j \\ w(i,j) & \text{if edge } (i,j) \text{ exists} \\ \infty & \text{otherwise} \end{cases}
$$
$$
D^{(k)}[i,j] = \min(D^{(k-1)}[i,j], D^{(k-1)}[i,k] + D^{(k-1)}[k,j])
$$

### Pseudocode
```text
FLOYD-WARSHALL(W)
    n = W.rows
    D = W
    for k = 1 to n:
        for i = 1 to n:
            for j = 1 to n:
                D[i,j] = min(D[i,j], D[i,k] + D[k,j])
    return D
```

### Complete Worked Example
Consider a graph with 4 vertices and edges:
(1->2: 50), (2->3: 15), (2->4: 5), (3->1: 15), (4->1: 30), (4->3: 5)

**Initialization $D^{(0)}$:**
|   | 1 | 2 | 3 | 4 |
| :--- | :--- | :--- | :--- | :--- |
| **1** | 0 | 50 | $\infty$ | $\infty$ |
| **2** | $\infty$ | 0 | 15 | 5 |
| **3** | 15 | $\infty$ | 0 | $\infty$ |
| **4** | 30 | $\infty$ | 5 | 0 |

**Step 1 ($k=1$):** Intermediate node 1
Update paths going through node 1.
$D^{(1)}[3,2] = \min(\infty, D^{(0)}[3,1] + D^{(0)}[1,2]) = 15 + 50 = 65$
$D^{(1)}[4,2] = \min(\infty, D^{(0)}[4,1] + D^{(0)}[1,2]) = 30 + 50 = 80$

**Step 2 ($k=2$):** Intermediate node 2
Update paths going through node 2.
$D^{(2)}[1,3] = \min(\infty, 50 + 15) = 65$
$D^{(2)}[1,4] = \min(\infty, 50 + 5) = 55$

**Step 3 ($k=3$):** Intermediate node 3
Update paths going through node 3.
$D^{(3)}[2,1] = \min(\infty, 15 + 15) = 30$
$D^{(3)}[4,1] = \min(30, 5 + 15) = 20$

**Step 4 ($k=4$):** Intermediate node 4
Update paths going through node 4.
$D^{(4)}[2,1] = \min(30, 5 + 20) = 25$
$D^{(4)}[2,3] = \min(15, 5 + 5) = 10$
$D^{(4)}[1,1] = 0, D^{(4)}[1,2] = 50, D^{(4)}[1,3] = 60, D^{(4)}[1,4] = 55$

Final Output Matrix represents shortest paths between all pairs.

### Detecting Negative Cycles
If any diagonal element $D^{(n)}[i,i] < 0$, it means there is a negative weight cycle in the graph.

### Complexity
- **Time Complexity:** $O(V^3)$ — 3 nested loops of size $V$.
- **Space Complexity:** $O(V^2)$ — Storing a $V \times V$ matrix.

[Source: DAA_Unit6.pptx, Slide 83-95]

---

## 10. Problem: Bellman-Ford / TSP
*(These topics were not fully detailed as separate DP algorithms in the provided Unit 6 slides. Bellman-Ford is mentioned on slide 84 for context only. Proceeding to Summary Table.)*

---

## 11. Comparison Table: All DP Problems

| Problem | Recurrence | Table Size | Time | Space |
| :--- | :--- | :--- | :--- | :--- |
| **Binomial Coefficient** | $C(n,r) = C(n-1,r-1) + C(n-1,r)$ | $n \times r$ | $O(n \cdot r)$ | $O(n \cdot r)$ |
| **Coin Change** | $C[i,j] = \min(C[i-1,j], 1 + C[i,j-d_i])$ | $N \times A$ | $O(N \cdot A)$ | $O(N \cdot A)$ |
| **0/1 Knapsack** | $K[i,w] = \max(K[i-1,w], v_i + K[i-1,w-w_i])$ | $N \times W$ | $O(N \cdot W)$ | $O(N \cdot W)$ |
| **LCS** | $c[i,j] = \max(c[i-1,j], c[i,j-1])$ (if $X_i \neq Y_j$) | $m \times n$ | $O(m \cdot n)$ | $O(m \cdot n)$ |
| **Matrix Chain** | $m[i,j] = \min_{k} \{ m[i,k] + m[k+1,j] + p_{i-1} p_k p_j \}$ | $n \times n$ | $O(n^3)$ | $O(n^2)$ |
| **Floyd-Warshall**| $D^{(k)}[i,j] = \min(D^{(k-1)}[i,j], D^{(k-1)}[i,k] + D^{(k-1)}[k,j])$| $V \times V$ | $O(V^3)$ | $O(V^2)$ |

---

## 12. Formula Sheet
- **Principle of Optimality:** Local optimal choices lead to global optimum.
- **Matrix Multiplications:** For $A (p \times q)$ and $B (q \times r)$, cost is $p \cdot q \cdot r$.
- **Subsequences count:** A sequence of length $n$ has $2^n$ subsequences.
- **Parenthesization count:** $n$ matrices can be parenthesized in $C(2n-2, n-1)/n$ (Catalan number) ways.

---

## 13. Definition Sheet
- **Dynamic Programming:** An optimization method to solve problems by combining solutions to overlapping subproblems.
- **Memoization:** A top-down DP approach where results of recursive calls are cached in a table to prevent redundant work.
- **Tabulation:** A bottom-up DP approach that iteratively solves smaller subproblems first and builds up to the target solution.
- **Optimal Substructure:** A property where optimal solutions to subproblems can be used to assemble the optimal solution to the overall problem.
- **Overlapping Subproblems:** Subproblems are repeatedly encountered during the execution of a recursive algorithm.
- **Subsequence:** A sequence derived from another sequence by deleting some elements without changing the relative order of the remaining elements.

---

## 14. Exam-Oriented Review

1. **Explain the Principle of Optimality with an example.** 
   *Ans: States that every subsequence of an optimal sequence is optimal. Example: Shortest path from A to C via B means the path from A to B and B to C must also be optimal.*
2. **Differentiate Memoization and Tabulation.**
   *Ans: Memoization is top-down recursion with caching; Tabulation is bottom-up iteration filling a table.*
3. **Write the recurrence for the 0/1 Knapsack Problem.**
   *Ans: $K[i,w] = \max(K[i-1,w], v_i + K[i-1,w-w_i])$*
4. **Determine the LCS of `AGORT` and `BGPOAT`.**
   *Ans: `G, O, T` (Length 3)*
5. **Analyze the time complexity of Matrix Chain Multiplication.**
   *Ans: $O(n^3)$ due to three nested loops checking subchains and split points $k$.*
6. **Show how Floyd-Warshall handles intermediate vertices.**
   *Ans: At step $k$, it evaluates whether a path through node $k$ is shorter than the direct/previously found path using nodes $1..k-1$.*
7. **Trace the DP table for 0/1 Knapsack given W=4, items (wt=[1,2,3], val=[2,3,5]).**
   *(Expect students to construct a $3 \times 4$ matrix and output 7).*
8. **Why does the Greedy algorithm fail for the 0/1 Knapsack problem?**
   *Ans: Because selecting an item with highest value-to-weight ratio might not leave enough space to pack remaining items optimally, and we cannot take fractions.*
9. **Explain why $2^n$ subsequences exist for a string of length $n$.**
   *Ans: Each character can either be included or excluded in a subsequence, leading to $2^n$ possible subsets.*
10. **Write the algorithm to extract the chosen matrices order from the `s` table in Matrix Chain.**
   *Ans: Recursively branch at `s[i, j]`. Print '(' before printing `s[i, k]` side, and ')' after `s[k+1, j]`.*

