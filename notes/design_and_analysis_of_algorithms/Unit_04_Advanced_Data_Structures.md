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
    if x.rank > y.rank then
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
    C --> C1["Assign Amortized Charge c_hat_i.<br>Store credit when c_hat_i > c_i; use credit when c_hat_i < c_i."]
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

---

## 7. Master Worked Problem: Unified Array Construction Across RBT, Binomial Heap, and Fibonacci Heap

> [!IMPORTANT]
> **Unified Exam Problem:**
> Given the input array of keys:
> **Keys:**  = [15, 32, 20, 4, 12, 25, 7]$

> Construct and demonstrate the complete step-by-step algorithmic procedures, state transitions, case resolutions, and final structures for:
> 1. **Red-Black Tree** (with Black-Height verification and Deletion Fixup)
> 2. **Binomial Heap** (with Binary Counter Analogy and Extract-Min)
> 3. **Fibonacci Heap** (with Root List Consolidation and Cascading Cut)

---

### Part 1: Red-Black Tree Construction Step-by-Step

We insert the sequence: $15, 32, 20, 4, 12, 25, 7$.
Standard BST rules apply first, followed by coloring newly inserted nodes **RED**, checking for Red-Red conflicts, and applying Cases 1, 2, or 3.

#### Step 1: Insert 15
- Standard BST insertion: 15 is root.
- **Rule 2 (Root Property):** Recolor root to **BLACK**.
- **Tree State:** Node `15 (BLACK)`. Black Height $bh = 1$.

#### Step 2: Insert 32
- BST insertion: $32 > 15 \implies$ Right child of 15.
- Color: $32$ is **RED**.
- Check: Parent 15 is BLACK $\implies$ No violation.

```mermaid
flowchart TD
    N15["15 (BLACK)"] --- NIL1[NIL]
    N15 --- N32["32 (RED)"]
    style N15 fill:#1e1e2e,stroke:#333,color:#fff
    style N32 fill:#f38ba8,stroke:#333,color:#11111b
    style NIL1 fill:#585b70,stroke:#333,color:#fff
```

#### Step 3: Insert 20
- BST insertion: $20 > 15$ and $20 < 32 \implies$ Left child of 32.
- Color: $20$ is **RED**.
- **Violation:** Red-Red conflict between Parent 32 (RED) and Child 20 (RED).
- **Uncle Check:** Uncle of 20 is Left child of Grandparent 15 $\implies$ `NIL (BLACK)`.
- **Case Identification:** Uncle is BLACK and nodes form a **Triangle (RL)** configuration: Grandparent 15 $	o$ Right Child 32 $	o$ Left Child 20.
  - **Substep 3a (Case 2 - Rotate Parent to Line):** Right-Rotate around Parent 32.
    - 20 becomes Right child of 15; 32 becomes Right child of 20.
  - **Substep 3b (Case 3 - Line Shape RR):** Left-Rotate around Grandparent 15.
    - Recolor Parent 20 $	o$ **BLACK**.
    - Recolor Grandparent 15 $	o$ **RED**.

```mermaid
flowchart TD
    subgraph "Step 3 Resolution: After Left-Rotate(15) and Recoloring"
        R20["20 (BLACK)"] --- L15["15 (RED)"]
        R20 --- R32["32 (RED)"]
        style R20 fill:#1e1e2e,stroke:#333,color:#fff
        style L15 fill:#f38ba8,stroke:#333,color:#11111b
        style R32 fill:#f38ba8,stroke:#333,color:#11111b
    end
```

#### Step 4: Insert 4
- BST insertion: $4 < 20$ and $4 < 15 \implies$ Left child of 15.
- Color: $4$ is **RED**.
- **Violation:** Red-Red conflict between Parent 15 (RED) and Child 4 (RED).
- **Uncle Check:** Uncle of 4 is Right child of Grandparent 20 $\implies$ Node 32 is **RED**!
- **Case 1 (Uncle is RED $\implies$ Recoloring Only):**
  - Recolor Parent 15 $	o$ **BLACK**.
  - Recolor Uncle 32 $	o$ **BLACK**.
  - Recolor Grandparent 20 $	o$ **RED**.
  - Root Property Check: 20 is root $\implies$ Recolor 20 back to **BLACK**.

```mermaid
flowchart TD
    subgraph "Step 4: Tree After Case 1 Recoloring"
        T20["20 (BLACK)"] --- T15["15 (BLACK)"]
        T20 --- T32["32 (BLACK)"]
        T15 --- T4["4 (RED)"]
        T15 --- NIL2[NIL]
        style T20 fill:#1e1e2e,stroke:#333,color:#fff
        style T15 fill:#1e1e2e,stroke:#333,color:#fff
        style T32 fill:#1e1e2e,stroke:#333,color:#fff
        style T4 fill:#f38ba8,stroke:#333,color:#11111b
        style NIL2 fill:#585b70,stroke:#333,color:#fff
    end
```

#### Step 5: Insert 12
- BST insertion: $12 < 20$, $12 < 15$, $12 > 4 \implies$ Right child of 4.
- Color: $12$ is **RED**.
- Check: Parent 4 is RED $\implies$ Red-Red Conflict!
- **Uncle Check:** Uncle of 12 is Right child of 15 $\implies$ `NIL (BLACK)`.
- **Case Identification:** Uncle is BLACK, Triangle (LR) shape (15 $	o$ 4 $	o$ 12).
  - **Substep 5a (Case 2 $	o$ Rotate Parent):** Left-Rotate around Parent 4 $\implies$ Line shape LL (15 $	o$ 12 $	o$ 4).
  - **Substep 5b (Case 3 $	o$ Rotate Grandparent & Recolor):** Right-Rotate around Grandparent 15.
    - Recolor 12 $	o$ **BLACK**.
    - Recolor 15 $	o$ **RED**.

```mermaid
flowchart TD
    subgraph "Step 5: After Resolving LR Triangle Violation"
        N20_5["20 (BLACK)"] --- N12_5["12 (BLACK)"]
        N20_5 --- N32_5["32 (BLACK)"]
        N12_5 --- N4_5["4 (RED)"]
        N12_5 --- N15_5["15 (RED)"]
        style N20_5 fill:#1e1e2e,stroke:#333,color:#fff
        style N12_5 fill:#1e1e2e,stroke:#333,color:#fff
        style N32_5 fill:#1e1e2e,stroke:#333,color:#fff
        style N4_5 fill:#f38ba8,stroke:#333,color:#11111b
        style N15_5 fill:#f38ba8,stroke:#333,color:#11111b
    end
```

#### Step 6: Insert 25
- BST insertion: $25 > 20$, $25 < 32 \implies$ Left child of 32.
- Color: $25$ is **RED**.
- Check: Parent 32 is BLACK $\implies$ No violation! Black height preserved.

#### Step 7: Insert 7
- BST insertion: $7 < 20$, $7 < 12$, $7 > 4 \implies$ Right child of 4.
- Color: $7$ is **RED**.
- **Violation:** Parent 4 is RED, Child 7 is RED.
- **Uncle Check:** Uncle of 7 is Right child of 12 $\implies$ Node 15 is **RED**!
- **Case 1 (Uncle RED):**
  - Recolor Parent 4 $	o$ **BLACK**.
  - Recolor Uncle 15 $	o$ **BLACK**.
  - Recolor Grandparent 12 $	o$ **RED**.
  - Check Grandparent 12: Parent of 12 is 20 (BLACK) $\implies$ No further violation!

```mermaid
flowchart TD
    subgraph "Final Completed Red-Black Tree for Array [15, 32, 20, 4, 12, 25, 7]"
        Root["20 (BLACK)"] --- C12["12 (RED)"]
        Root --- C32["32 (BLACK)"]
        C12 --- C4["4 (BLACK)"]
        C12 --- C15["15 (BLACK)"]
        C4 --- NIL_L[NIL]
        C4 --- C7["7 (RED)"]
        C32 --- C25["25 (RED)"]
        C32 --- NIL_R[NIL]

        style Root fill:#1e1e2e,stroke:#333,color:#fff
        style C12 fill:#f38ba8,stroke:#333,color:#11111b
        style C32 fill:#1e1e2e,stroke:#333,color:#fff
        style C4 fill:#1e1e2e,stroke:#333,color:#fff
        style C15 fill:#1e1e2e,stroke:#333,color:#fff
        style C7 fill:#f38ba8,stroke:#333,color:#11111b
        style C25 fill:#f38ba8,stroke:#333,color:#11111b
        style NIL_L fill:#585b70,stroke:#333,color:#fff
        style NIL_R fill:#585b70,stroke:#333,color:#fff
    end
```

#### Black-Height Verification Matrix

| Path from Root (20) to Leaf | Nodes on Simple Path | Black Nodes Count | Path Black-Height ($bh$) | Property Valid? |
| :--- | :--- | :--- | :--- | :--- |
| Path 1 | $20 	o 12 	o 4 	o 	ext{NIL}$ | $20, 4, 	ext{NIL}$ | **2** (excluding root) | Valid |
| Path 2 | $20 	o 12 	o 4 	o 7 	o 	ext{NIL}$ | $20, 4, 	ext{NIL}$ | **2** (excluding root) | Valid |
| Path 3 | $20 	o 12 	o 15 	o 	ext{NIL}$ | $20, 15, 	ext{NIL}$ | **2** (excluding root) | Valid |
| Path 4 | $20 	o 32 	o 25 	o 	ext{NIL}$ | $20, 32, 	ext{NIL}$ | **2** (excluding root) | Valid |
| Path 5 | $20 	o 32 	o 	ext{NIL}$ | $20, 32, 	ext{NIL}$ | **2** (excluding root) | Valid |

---

### Part 2: Binomial Heap Construction Step-by-Step

We insert the same array $A = [15, 32, 20, 4, 12, 25, 7]$.
A Binomial Heap maintains a collection of binomial trees where no two trees share the same degree. Insertion is isomorphic to **binary addition**:


2885
	ext{Count } n = 7_{10} = 111_2 \implies 	ext{Final Heap must contain } B_2 + B_1 + B_0
2885


#### Step-by-Step State Transitions:

1. **Insert 15:**
   - Binary representation: $1_2 \implies B_0(15)$.
   - Forest: $\{ B_0(15) \}$.

2. **Insert 32:**
   - New single node: $B_0(32)$.
   - Binary representation: $2_{10} = 10_2$.
   - Conflict: Two $B_0$ trees ($B_0(15)$ and $B_0(32)$).
   - **Link Rule:** $\min(15, 32) = 15$. Node 32 becomes child of 15.
   - Resulting Tree: $B_1(15)$.
   - Forest: $\{ B_1(15) \}$.

3. **Insert 20:**
   - New node: $B_0(20)$.
   - Binary representation: $3_{10} = 11_2$.
   - Degrees present: Degree 0 and Degree 1. No conflict!
   - Forest: $\{ B_0(20), B_1(15) \}$.

4. **Insert 4:**
   - New node: $B_0(4)$.
   - Binary representation: $4_{10} = 100_2$ (triggers carry chain).
   - Collision 1: Two $B_0$ trees ($B_0(20)$ and $B_0(4)$).
     - $\min(4, 20) = 4 \implies 20$ links under $4 \implies B_1(4)$.
   - Collision 2: Two $B_1$ trees ($B_1(15)$ and $B_1(4)$).
     - $\min(4, 15) = 4 \implies 15$ links under $4 \implies B_2(4)$.
   - Forest: $\{ B_2(4) \}$.

5. **Insert 12:**
   - Binary: $5_{10} = 101_2$.
   - Forest: $\{ B_0(12), B_2(4) \}$.

6. **Insert 25:**
   - Binary: $6_{10} = 110_2$.
   - New $B_0(25)$ collides with $B_0(12)$:
     - $\min(12, 25) = 12 \implies 25$ links under $12 \implies B_1(12)$.
   - Forest: $\{ B_1(12), B_2(4) \}$.

7. **Insert 7:**
   - Binary: $7_{10} = 111_2$.
   - New node: $B_0(7)$.
   - No collisions!
   - Final Forest: $\{ B_0(7), B_1(12), B_2(4) \}$.

```mermaid
flowchart TD
    subgraph "Final Binomial Heap Forest: B0(7) + B1(12) + B2(4)"
        subgraph "B0 (Degree 0, 1 Node)"
            BH_7[7]
            style BH_7 fill:#89b4fa,stroke:#333,color:#11111b
        end

        subgraph "B1 (Degree 1, 2 Nodes)"
            BH_12[12] --- BH_25[25]
            style BH_12 fill:#89b4fa,stroke:#333,color:#11111b
            style BH_25 fill:#a6e3a1,stroke:#333,color:#11111b
        end

        subgraph "B2 (Degree 2, 4 Nodes)"
            BH_4["4 (Min Root)"] --- BH_15[15]
            BH_4 --- BH_20[20]
            BH_15 --- BH_32[32]
            style BH_4 fill:#f38ba8,stroke:#333,color:#11111b
            style BH_15 fill:#a6e3a1,stroke:#333,color:#11111b
            style BH_20 fill:#a6e3a1,stroke:#333,color:#11111b
            style BH_32 fill:#f9e2af,stroke:#333,color:#11111b
        end
    end
```

#### Extract-Min Execution on this Binomial Heap:
1. Scan root list roots $\{ 7, 12, 4 \} \implies 	ext{Minimum root is } 4$.
2. Remove root 4 from heap.
3. Children of 4 are $B_1(15)$ and $B_0(20)$.
4. Reverse children list to ascending degree order: $H'' = \{ B_0(20), B_1(15) \}$.
5. Remaining heap $H = \{ B_0(7), B_1(12) \}$.
6. Perform `Binomial-Heap-Union(H, H'')`:
   - Merge roots: $[B_0(7), B_0(20), B_1(12), B_1(15)]$.
   - Link $B_0(7)$ and $B_0(20) \implies B_1(7)$.
   - Link $B_1(7)$ and $B_1(12) \implies B_2(7)$.
   - Combine with $B_1(15) \implies$ Final heap after Extract-Min has $\{ B_1(15), B_2(7) \}$ (6 nodes $= 110_2$).

---

### Part 3: Fibonacci Heap Construction Step-by-Step

We insert the same array $A = [15, 32, 20, 4, 12, 25, 7]$.
Fibonacci Heaps use **lazy insertion**: new nodes are simply spliced into the circular doubly-linked root list in $O(1)$ amortized time without merging trees immediately.

#### Step 1: Sequential Insertion
- All 7 nodes are added directly to the circular root list:

2885
	ext{Root List: } [15 \leftrightarrow 32 \leftrightarrow 20 \leftrightarrow 4 \leftrightarrow 12 \leftrightarrow 25 \leftrightarrow 7]
2885

- The pointer `H.min` is updated on each insert:
  `H.min` points to **Node 4**.
- All node degrees $= 0$, `mark = FALSE`.

```mermaid
flowchart LR
    subgraph "Fibonacci Heap Root List After 7 Lazy Insertions"
        direction LR
        N15[15] <--> N32[32]
        N32 <--> N20[20]
        N20 <--> MIN["4 (H.min)"]
        MIN <--> N12[12]
        N12 <--> N25[25]
        N25 <--> N7[7]
        N7 <--> N15

        style MIN fill:#f38ba8,stroke:#333,color:#11111b
        style N15 fill:#89b4fa,stroke:#333,color:#11111b
        style N32 fill:#89b4fa,stroke:#333,color:#11111b
        style N20 fill:#89b4fa,stroke:#333,color:#11111b
        style N12 fill:#89b4fa,stroke:#333,color:#11111b
        style N25 fill:#89b4fa,stroke:#333,color:#11111b
        style N7 fill:#89b4fa,stroke:#333,color:#11111b
    end
```

#### Step 2: Extract-Min & Degree Consolidation
1. Remove `H.min` (Node 4).
   - Node 4 has 0 children $\implies$ Root list now has 6 nodes: $[15, 32, 20, 12, 25, 7]$.
2. Initialize degree array: $D(n) \le \lfloor \log_\phi 6 
floor \implies A[0 \dots 2] = [	ext{NIL}, 	ext{NIL}, 	ext{NIL}]$.
3. Iterate through root list nodes:
   - **Node 15 (deg 0):** $A[0] = 	ext{NIL} \implies A[0] = 15$.
   - **Node 32 (deg 0):** $A[0]$ occupied by 15. Collision!
     - Link smaller root 15 with 32: 32 becomes child of $15 \implies$ Tree with root 15 has **degree 1**.
     - $A[0] = 	ext{NIL}$. $A[1]$ is empty $\implies A[1] = 15$.
   - **Node 20 (deg 0):** $A[0]$ empty $\implies A[0] = 20$.
   - **Node 12 (deg 0):** $A[0]$ occupied by 20. Collision!
     - Link: $\min(12, 20) = 12 \implies 20$ under $12 \implies$ Tree 12 has **degree 1**.
     - $A[0] = 	ext{NIL}$.
     - Check $A[1]$: $A[1]$ occupied by 15! Collision of degree 1 trees!
     - Link: $\min(12, 15) = 12 \implies 15$ under $12 \implies$ Tree 12 has **degree 2**.
     - $A[1] = 	ext{NIL}$. $A[2]$ is empty $\implies A[2] = 12$.
   - **Node 25 (deg 0):** $A[0]$ empty $\implies A[0] = 25$.
   - **Node 7 (deg 0):** $A[0]$ occupied by 25. Collision!
     - Link: $\min(7, 25) = 7 \implies 25$ under $7 \implies$ Tree 7 has **degree 1**.
     - $A[0] = 	ext{NIL}$. $A[1]$ is empty $\implies A[1] = 7$.
4. Reconstruction of root list:
   - Active roots in degree array: $A[1] = 7$, $A[2] = 12$.
   - New root list: $[7 \leftrightarrow 12]$.
   - `H.min` set to $\min(7, 12) = \mathbf{7}$.

```mermaid
flowchart TD
    subgraph "Consolidated Fibonacci Heap After Extract-Min"
        subgraph "Root 7 (Degree 1, H.min)"
            F7["7 (H.min)"] --- F25[25]
            style F7 fill:#f38ba8,stroke:#333,color:#11111b
            style F25 fill:#a6e3a1,stroke:#333,color:#11111b
        end

        subgraph "Root 12 (Degree 2)"
            F12[12] --- F20[20]
            F12 --- F15[15]
            F15 --- F32[32]
            style F12 fill:#89b4fa,stroke:#333,color:#11111b
            style F20 fill:#a6e3a1,stroke:#333,color:#11111b
            style F15 fill:#a6e3a1,stroke:#333,color:#11111b
            style F32 fill:#f9e2af,stroke:#333,color:#11111b
        end
    end
```

#### Step 3: Decrease-Key & Cascading Cut Demonstration
Suppose we call $	ext{Decrease-Key}(H, 	ext{Node } 32, 2)$:
1. Key 32 becomes **2**.
2. Violates min-heap property: Child $2 < 	ext{Parent } 15$.
3. **Cut:** Cut Node 2 from child list of 15, add 2 to root list, set $2.	ext{mark} = 	ext{FALSE}$.
4. **Cascading Cut on Parent 15:**
   - Check $15.	ext{mark}$:
     - If $15.	ext{mark} == 	ext{FALSE} \implies$ Set $15.	ext{mark} = 	ext{TRUE}$ (Node 15 has now lost its first child).
     - If Node 15 subsequently loses another child $\implies$ It will be cut immediately and moved to root list.
5. Update `H.min`: Since $2 < 7$, `H.min` now points to **Node 2**!

---

### Part 4: Master Performance & Complexity Matrix

| Operation | Standard Binary Heap | Binomial Heap (Worst-Case) | Fibonacci Heap (Amortized) | Red-Black Tree (Worst-Case) |
| :--- | :--- | :--- | :--- | :--- |
| **Make-Heap** | $\Theta(1)$ | $\Theta(1)$ | $\Theta(1)$ | $\Theta(1)$ |
| **Insert** | $O(\log n)$ | $O(\log n)$ | **$\Theta(1)$** | $O(\log n)$ |
| **Find-Min / Search** | $\Theta(1)$ | $O(\log n)$ or $O(1)^*$ | **$\Theta(1)$** | $O(\log n)$ |
| **Extract-Min / Delete** | $O(\log n)$ | $O(\log n)$ | $O(\log n)$ | $O(\log n)$ |
| **Decrease-Key** | $O(\log n)$ | $O(\log n)$ | **$\Theta(1)$** | $N/A$ (Update: $O(\log n)$) |
| **Union / Merge** | $\Theta(n)$ | $O(\log n)$ | **$\Theta(1)$** | $O(n)$ |
| **Space Complexity** | $\Theta(n)$ | $\Theta(n)$ | $\Theta(n)$ | $\Theta(n)$ |

$^*$ With auxiliary pointer tracking min root.
