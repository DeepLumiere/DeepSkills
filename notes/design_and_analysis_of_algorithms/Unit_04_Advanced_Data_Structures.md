# Chapter 4: Advanced Data Structures & Amortized Analysis

> **Course Code:** 3CS501CC24
> **Focus:** Red-Black Trees, Interval Trees, Binomial Heaps, Fibonacci Heaps, Disjoint Set Structures & Amortized Analysis

---

## 1. Chapter Overview

This unit covers advanced data structures that guarantee logarithmic or constant amortized time complexities:
1. **Red-Black Trees (RBT):** Self-balancing binary search trees ensuring $O(\log n)$ worst-case bounds on search, insertion, and deletion.
2. **Interval Trees:** Augmented self-balancing search trees for dynamic interval management and overlap queries in $O(\log n)$ time.
3. **Binomial Heaps:** Forest of Binomial Trees supporting $O(\log n)$ worst-case merge/union operations.
4. **Fibonacci Heaps:** Lazy mergeable heaps supporting $O(1)$ amortized insertion, union, and decrease-key operations.
5. **Disjoint Set Structures:** Union-Find data structures with Path Compression and Union by Rank achieving $O(\alpha(n))$ amortized time.
6. **Amortized Analysis:** Evaluating average cost per operation over a sequence using Aggregate, Accounting, and Potential methods.

---

## 2. Red-Black Trees (RBT): Complete Case-by-Case Guide

### Definition & The 5 Red-Black Tree Properties
Every node in a Red-Black Tree has a `color` (**RED** or **BLACK**), `key`, `left`, `right`, and `parent`.
1. **Node Color:** Every node is either **RED** or **BLACK**.
2. **Root Property:** The root is always **BLACK**.
3. **Leaf Property:** Every leaf (`NIL`) is **BLACK**.
4. **Red Property (No Red-Red Conflict):** If a node is **RED**, both of its children must be **BLACK**.
5. **Black-Height Property:** Every simple path from a node to any of its descendant `NIL` leaves contains the exact same number of **BLACK** nodes.

```mermaid
flowchart TD
    subgraph "Valid Red-Black Tree Example (Black Height = 2)"
        R["26 (BLACK)"] --- N17["17 (RED)"]
        R --- N41["41 (BLACK)"]
        N17 --- N14["14 (BLACK)"]
        N17 --- N21["21 (BLACK)"]
        N41 --- N30["30 (RED)"]
        N41 --- N47["47 (RED)"]

        style R fill:#1e1e2e,stroke:#333,color:#fff
        style N17 fill:#f38ba8,stroke:#333,color:#11111b
        style N41 fill:#1e1e2e,stroke:#333,color:#fff
        style N14 fill:#1e1e2e,stroke:#333,color:#fff
        style N21 fill:#1e1e2e,stroke:#333,color:#fff
        style N30 fill:#f38ba8,stroke:#333,color:#11111b
        style N47 fill:#f38ba8,stroke:#333,color:#11111b
    end
```

---

### Tree Rotations (Left-Rotate and Right-Rotate)

```mermaid
flowchart TD
    subgraph "Left-Rotate around Node X"
        direction LR
        X1["X (BLACK)"] --- A1["Subtree alpha"]
        X1 --- Y1["Y (RED)"]
        Y1 --- B1["Subtree beta"]
        Y1 --- C1["Subtree gamma"]

        style X1 fill:#1e1e2e,stroke:#333,color:#fff
        style Y1 fill:#f38ba8,stroke:#333,color:#11111b
        style A1 fill:#89b4fa,stroke:#333,color:#11111b
        style B1 fill:#a6e3a1,stroke:#333,color:#11111b
        style C1 fill:#f9e2af,stroke:#333,color:#11111b
    end

    subgraph "After Left-Rotate(T, X)"
        direction LR
        Y2["Y (RED)"] --- X2["X (BLACK)"]
        Y2 --- C2["Subtree gamma"]
        X2 --- A2["Subtree alpha"]
        X2 --- B2["Subtree beta"]

        style Y2 fill:#f38ba8,stroke:#333,color:#11111b
        style X2 fill:#1e1e2e,stroke:#333,color:#fff
        style A2 fill:#89b4fa,stroke:#333,color:#11111b
        style B2 fill:#a6e3a1,stroke:#333,color:#11111b
        style C2 fill:#f9e2af,stroke:#333,color:#11111b
    end
```

---

### Red-Black Tree Insertion: All 3 Cases

When inserting node $Z$:
1. Insert $Z$ using standard BST insertion and color $Z$ **RED**.
2. If $Z$ is root $\implies$ Recolor $Z$ to **BLACK**.
3. If $Z$'s parent $P$ is **RED** $\implies$ Red-Red Conflict! Look at $Z$'s **Uncle $U$**:

#### Case 1: Uncle $U$ is RED (Recoloring)
- **Steps:** Recolor Parent $P \to$ **BLACK**, Uncle $U \to$ **BLACK**, Grandparent $G \to$ **RED**. Set $Z = G$ and repeat checks.

#### Case 2: Uncle $U$ is BLACK/NIL & $Z$ is Triangle Child (Rotation to Line)
- **Steps:** Rotate Parent $P$ away from $Z$ (e.g., Left-Rotate around $P$). Converts into Case 3 (Line).

#### Case 3: Uncle $U$ is BLACK/NIL & $Z$ is Line Child (Rotation & Recoloring)
- **Steps:** Rotate Grandparent $G$ away from $P$ (e.g., Right-Rotate around $G$). Recolor Parent $P \to$ **BLACK**, Grandparent $G \to$ **RED**.

---

### Red-Black Tree Deletion (`RB-DELETE-FIXUP`)
When a BLACK node is deleted, its path loses 1 black node, creating a **Double Black** on replacement $X$. Let $W$ be $X$'s Sibling:
- **Case 1:** Sibling $W$ is RED $\implies$ Recolor $W \to$ BLACK, Parent $X.p \to$ RED, Left-Rotate($X.p$).
- **Case 2:** Sibling $W$ is BLACK and both children of $W$ are BLACK $\implies$ Recolor $W \to$ RED, move Double Black up to $X.p$.
- **Case 3:** Sibling $W$ is BLACK, Inner Child is RED, Outer Child is BLACK $\implies$ Recolor $W.\text{left} \to$ BLACK, $W \to$ RED, Right-Rotate($W$). Converts to Case 4.
- **Case 4:** Sibling $W$ is BLACK and Outer Child is RED $\implies$ Recolor $W \to$ Parent $X.p$'s color, $X.p \to$ BLACK, $W.\text{right} \to$ BLACK, Left-Rotate($X.p$). Double Black fully resolved!

---

## 3. Interval Trees: Step-by-Step Operations & Case Guide

An **Interval Tree** is an augmented Red-Black Tree that stores dynamic intervals $[i.low, i.high]$.

### Node Structure & Attributes
Each node $x$ contains:
1. $x.interval = [x.low, x.high]$
2. $x.key = x.interval.low$ (Ordered by low endpoint in BST)
3. $x.max = \max(x.interval.high, x.left.max, x.right.max)$ (Max high endpoint in subtree)

```mermaid
flowchart TD
    subgraph "Interval Tree Node Representation"
        Root["[16, 21] | max=30"] --- L["[8, 9] | max=23"]
        Root --- R["[25, 30] | max=30"]
        L --- LL["[5, 8] | max=8"]
        L --- LR["[15, 23] | max=23"]
        R --- RL["[17, 19] | max=19"]
        R --- RR["[26, 26] | max=26"]

        style Root fill:#89b4fa,stroke:#333,color:#11111b
        style L fill:#a6e3a1,stroke:#333,color:#11111b
        style R fill:#a6e3a1,stroke:#333,color:#11111b
    end
```

### Core Operations

#### 1. Overlap Check Function
Two intervals $i$ and $i'$ overlap if:

$$
i.low \le i'.high \quad \text{and} \quad i'.low \le i.high
$$

#### 2. Interval Search Algorithm (`INTERVAL-SEARCH(T, i)`)
Finds an interval in $T$ overlapping with target interval $i$:

```text
Algorithm INTERVAL-SEARCH(T, i)
    x = T.root
    while x != NIL and NOT OVERLAP(x.interval, i) do
        if x.left != NIL and x.left.max >= i.low then
            x = x.left
        else
            x = x.right
    return x
```

- **Proof of Branching Logic:**
  - If `x.left` $\neq \text{NIL}$ and `x.left.max` $\ge i.low$, then the left subtree is guaranteed to contain an overlapping interval if any exists in $T$.
  - If `x.left.max` $< i.low$, then no interval in the left subtree can possibly overlap $i$ because every high endpoint in the left subtree is $< i.low$. Going right is necessary.

#### 3. Insertion & Rotation Maintenance
- Insert node $z$ using $z.interval.low$ as the key into the Red-Black Tree.
- Set $z.max = z.interval.high$.
- During upward traversal and rotations (Left-Rotate / Right-Rotate), update $x.max$ for affected nodes:

$$
x.max = \max(x.interval.high, x.left.max, x.right.max)
$$

- **Complexity:** All operations (Insert, Delete, Search) run in $O(\log n)$ worst-case time.

---

## 4. Binomial Heaps: Structure & Operations

### Binomial Tree $B_k$ Properties
1. $B_k$ has $2^k$ total nodes and height $k$.
2. Root degree of $B_k$ is $k$.
3. $B_k$ is formed by linking two $B_{k-1}$ trees (smaller root becomes parent).

```mermaid
flowchart TD
    subgraph "Binomial Trees B0, B1, B2"
        subgraph "B0"
            r0[10]
        end
        subgraph "B1"
            r1[12] --- c11[25]
        end
        subgraph "B2"
            r2[15] --- c21[28]
            r2 --- c22[33]
            c21 --- c211[41]
        end
    end
```

### Union Algorithm
1. Merge root lists of $H_1$ and $H_2$ in ascending order of degree.
2. Link trees with duplicate degrees using pointers `prev`, `curr`, `next`:
   - If `curr.key <= next.key`: Link `next` under `curr`.
   - If `curr.key` $> \text{next.key}$: Link `curr` under `next`.
- **Complexity:** $O(\log n)$ worst-case.

---

## 5. Fibonacci Heaps: Lazy Operations & Amortized Bounds

### Key Features
- **Lazy Structure:** Trees are unstructured in circular root list until `Extract-Min`.
- **Marked Bit:** `mark[x]` tracks whether node $x$ lost a child since $x$ was made a child of another node.

```mermaid
flowchart TD
    subgraph "Fibonacci Heap Structure"
        minPtr["min pointer"] --> N3["3 (Min Root, Degree 2)"]
        N3 --- N17["17 (Degree 1)"]
        N3 --- N24["24 (Degree 0)"]
        N17 --- N30["30 (Degree 0)"]
        N3 <--> N7["7 (Root, Degree 0)"]
        N7 <--> N18["18 (Root, Degree 1, Marked)"]
        N18 --- N52["52 (Degree 0)"]

        style minPtr fill:#fab387,stroke:#333,color:#11111b
        style N3 fill:#a6e3a1,stroke:#333,color:#11111b
        style N18 fill:#f38ba8,stroke:#333,color:#11111b
    end
```

### Key Operations & Amortized Costs
1. **Insert & Union:** Add node / concatenate root lists in $\Theta(1)$ amortized time.
2. **Extract-Min & Consolidation:** Remove min node, add children to root list, consolidate same-degree roots using array $A[0 \dots D(n)]$. Amortized time $O(\log n)$.
3. **Decrease-Key & Cascading Cut:**
   - If $x.key < x.parent.key$, `CUT(x, y)` moves $x$ to root list.
   - `CASCADING-CUT(y)` recursively cuts ancestors if they are already marked (`mark == TRUE`). Amortized time $\Theta(1)$.

---

## 6. Disjoint Set Structures (Union-Find)

Maintains non-overlapping dynamic sets supporting `MAKE-SET(x)`, `FIND-SET(x)`, and `UNION(x, y)`.

### Optimized Pseudocode
```text
Algorithm MAKE-SET(x)
    x.parent = x
    x.rank = 0

Algorithm FIND-SET(x)
    if x != x.parent then
        x.parent = FIND-SET(x.parent)  // Path Compression
    return x.parent

Algorithm UNION(x, y)
    LINK(FIND-SET(x), FIND-SET(y))

Algorithm LINK(x, y)
    if x.rank &gt; y.rank then
        y.parent = x
    else
        x.parent = y
        if x.rank == y.rank then
            y.rank = y.rank + 1
```

```mermaid
flowchart TD
    subgraph "Path Compression Visualization"
        direction LR
        subgraph "Before Find(4)"
            A1[1] --> A2[2] --> A3[3] --> A4[4]
        end
        subgraph "After Find(4)"
            B1[1] --> B2[2]
            B1 --> B3[3]
            B1 --> B4[4]
        end
    end
```

### Amortized Complexity
Using **Union by Rank** and **Path Compression**, a sequence of $m$ operations on $n$ elements takes $O(m \cdot \alpha(n))$ time, where $\alpha(n) \le 4$ is the Inverse Ackermann function. Amortized cost per operation is $\Theta(1)$.

---

## 7. Amortized Analysis Methods

```mermaid
flowchart TD
    A["Amortized Analysis Methods"] --> B["1. Aggregate Method"]
    A --> C["2. Accounting Method (Banker's)"]
    A --> D["3. Potential Method (Physicist's)"]

    B --> B1["Amortized Cost = Total Cost T(n) / n"]
    C --> C1["Assign Amortized Charge c_hat_i.<br>Store credit when c_hat_i &gt; c_i; use credit when c_hat_i &lt; c_i."]
    D --> D1["Define Potential Function Phi(D_i).<br>Amortized Cost c_hat_i = c_i + Phi(D_i) - Phi(D_i-1)."]
```

---

## 8. Formula Sheet

- **Red-Black Tree Height:** $h \le 2 \log_2(n + 1)$.
- **Binomial Tree $B_k$:** Nodes $= 2^k$, Height $= k$, Root Degree $= k$.
- **Fibonacci Heap Potential Function:** $\Phi(H) = t(H) + 2 m(H)$ (where $t(H)$ is root count, $m(H)$ is marked node count).
- **Disjoint Set Operations Amortized Cost:** $O(\alpha(n)) \approx \Theta(1)$.
- **Interval Overlap Condition:** $i.low \le i'.high \text{ and } i'.low \le i.high$.

---

## 9. Definition Sheet

1. **Red-Black Tree:** A self-balancing binary search tree with colored nodes that guarantees $O(\log n)$ height.
2. **Interval Tree:** An augmented search tree for storing intervals and performing overlap queries in $O(\log n)$ time.
3. **Binomial Heap:** A collection of binomial trees satisfying min-heap property and unique degrees.
4. **Fibonacci Heap:** A min-heap structure achieving $O(1)$ amortized insertion, union, and decrease-key via lazy consolidation.
5. **Path Compression:** A technique in Union-Find that points all visited nodes directly to the root during `FIND-SET`.
6. **Inverse Ackermann Function ($\alpha(n)$):** An extremely slow-growing function ($\alpha(n) \le 4$ for all practical inputs) describing Disjoint Set efficiency.

---

## 10. Exam-Oriented Review

1. List the 5 Red-Black Tree properties and prove why the maximum height is $2 \log_2(n+1)$.
2. Trace Red-Black Tree insertion for keys $[15, 32, 20, 4, 12, 25, 7]$. Show all rotations and recoloring steps.
3. Explain the node structure of an Interval Tree. How is `x.max` updated during tree rotations?
4. Write the algorithm for `Interval-Search(T, i)` and prove why going left when `x.left.max >= i.low` is correct.
5. Explain how Fibonacci Heaps achieve $O(1)$ amortized time for `Decrease-Key` using Cascading Cuts.
6. Describe Union by Rank and Path Compression in Disjoint Sets. Derive the $O(\alpha(n))$ time complexity.
7. Compare Binary Heap, Binomial Heap, and Fibonacci Heap across all priority queue operations.

- **Red-Black Tree Height:** $h \le 2 \log_2(n + 1)$.
- **Binomial Tree $B_k$:** Nodes $= 2^k$, Height $= k$, Root Degree $= k$.
- **Fibonacci Heap Potential Function:** $\Phi(H) = t(H) + 2 m(H)$ (where $t(H)$ is root count, $m(H)$ is marked node count).
- **Disjoint Set Operations Amortized Cost:** $O(\alpha(n)) \approx \Theta(1)$.
- **Interval Overlap Condition:** $i.low \le i'.high \text{ and } i'.low \le i.high$.

---

## 9. Definition Sheet

1. **Red-Black Tree:** A self-balancing binary search tree with colored nodes that guarantees $O(\log n)$ height.
2. **Interval Tree:** An augmented search tree for storing intervals and performing overlap queries in $O(\log n)$ time.
3. **Binomial Heap:** A collection of binomial trees satisfying min-heap property and unique degrees.
4. **Fibonacci Heap:** A min-heap structure achieving $O(1)$ amortized insertion, union, and decrease-key via lazy consolidation.
5. **Path Compression:** A technique in Union-Find that points all visited nodes directly to the root during `FIND-SET`.
6. **Inverse Ackermann Function ($\alpha(n)$):** An extremely slow-growing function ($\alpha(n) \le 4$ for all practical inputs) describing Disjoint Set efficiency.

---

## 10. Exam-Oriented Review

1. List the 5 Red-Black Tree properties and prove why the maximum height is $2 \log_2(n+1)$.
2. Trace Red-Black Tree insertion for keys $[15, 32, 20, 4, 12, 25, 7]$. Show all rotations and recoloring steps.
3. Explain the node structure of an Interval Tree. How is `x.max` updated during tree rotations?
4. Write the algorithm for `Interval-Search(T, i)` and prove why going left when `x.left.max >= i.low` is correct.
5. Explain how Fibonacci Heaps achieve $O(1)$ amortized time for `Decrease-Key` using Cascading Cuts.
6. Describe Union by Rank and Path Compression in Disjoint Sets. Derive the $O(\alpha(n))$ time complexity.
7. Compare Binary Heap, Binomial Heap, and Fibonacci Heap across all priority queue operations.

---

Algorithm LINK(x, y)
    if x.rank &gt; y.rank then
        y.parent = x
    else
        x.parent = y
        if x.rank == y.rank then
            y.rank = y.rank + 1
```

```mermaid
flowchart TD
    subgraph "Path Compression Visualization"
        direction LR
        subgraph "Before Find(4)"
            A1[1] --> A2[2] --> A3[3] --> A4[4]
        end
        subgraph "After Find(4)"
            B1[1] --> B2[2]
            B1 --> B3[3]
            B1 --> B4[4]
        end
    end
```

### Amortized Complexity
Using **Union by Rank** and **Path Compression**, a sequence of $m$ operations on $n$ elements takes $O(m \cdot \alpha(n))$ time, where $\alpha(n) \le 4$ is the Inverse Ackermann function. Amortized cost per operation is $\Theta(1)$.

---

## 7. Amortized Analysis Methods

```mermaid
flowchart TD
    A["Amortized Analysis Methods"] --> B["1. Aggregate Method"]
    A --> C["2. Accounting Method (Banker's)"]
    A --> D["3. Potential Method (Physicist's)"]

    B --> B1["Amortized Cost = Total Cost T(n) / n"]
    C --> C1["Assign Amortized Charge c_hat_i.<br>Store credit when c_hat_i &gt; c_i; use credit when c_hat_i &lt; c_i."]
    D --> D1["Define Potential Function Phi(D_i).<br>Amortized Cost c_hat_i = c_i + Phi(D_i) - Phi(D_i-1)."]
```

---

## 8. Formula Sheet

- **Red-Black Tree Height:** $h \le 2 \log_2(n + 1)$.
- **Binomial Tree $B_k$:** Nodes $= 2^k$, Height $= k$, Root Degree $= k$.
- **Fibonacci Heap Potential Function:** $\Phi(H) = t(H) + 2 m(H)$ (where $t(H)$ is root count, $m(H)$ is marked node count).
- **Disjoint Set Operations Amortized Cost:** $O(\alpha(n)) \approx \Theta(1)$.
- **Interval Overlap Condition:** $i.low \le i'.high \text{ and } i'.low \le i.high$.

---

## 9. Definition Sheet

1. **Red-Black Tree:** A self-balancing binary search tree with colored nodes that guarantees $O(\log n)$ height.
2. **Interval Tree:** An augmented search tree for storing intervals and performing overlap queries in $O(\log n)$ time.
3. **Binomial Heap:** A collection of binomial trees satisfying min-heap property and unique degrees.
4. **Fibonacci Heap:** A min-heap structure achieving $O(1)$ amortized insertion, union, and decrease-key via lazy consolidation.
5. **Path Compression:** A technique in Union-Find that points all visited nodes directly to the root during `FIND-SET`.
6. **Inverse Ackermann Function ($\alpha(n)$):** An extremely slow-growing function ($\alpha(n) \le 4$ for all practical inputs) describing Disjoint Set efficiency.

---

## 10. Exam-Oriented Review

1. List the 5 Red-Black Tree properties and prove why the maximum height is $2 \log_2(n+1)$.
2. Trace Red-Black Tree insertion for keys $[15, 32, 20, 4, 12, 25, 7]$. Show all rotations and recoloring steps.
3. Explain the node structure of an Interval Tree. How is `x.max` updated during tree rotations?
4. Write the algorithm for `Interval-Search(T, i)` and prove why going left when `x.left.max >= i.low` is correct.
5. Explain how Fibonacci Heaps achieve $O(1)$ amortized time for `Decrease-Key` using Cascading Cuts.
6. Describe Union by Rank and Path Compression in Disjoint Sets. Derive the $O(\alpha(n))$ time complexity.
7. Compare Binary Heap, Binomial Heap, and Fibonacci Heap across all priority queue operations.
