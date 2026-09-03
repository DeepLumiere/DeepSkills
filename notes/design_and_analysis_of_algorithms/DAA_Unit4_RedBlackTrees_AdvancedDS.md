# Chapter 4: Unit 4 — Advanced Data Structures & Amortized Analysis

> **Course Code:** 3CS501CC24
> **Focus:** Red-Black Trees, Binomial Heaps, Fibonacci Heaps & Amortized Analysis (Standardized Exam & Problem-Solving Guide)

---

## 1. Chapter Overview
This unit covers four essential advanced topics in algorithm design and data structures:
1. **Red-Black Trees:** Self-balancing binary search trees ensuring $O(\log n)$ worst-case bounds.
2. **Binomial Heaps:** Forest of Binomial Trees supporting efficient $O(\log n)$ union/merge operations.
3. **Fibonacci Heaps:** Lazy mergeable heaps supporting $O(1)$ amortized insertion, union, and decrease-key operations.
4. **Amortized Analysis:** Evaluating the average cost per operation over a worst-case sequence using Aggregate, Accounting, and Potential methods.

---

## 2. Red-Black Trees (RBT)

### Definition & The 5 Properties
A Red-Black Tree is a binary search tree where each node has a `color` attribute (**RED** or **BLACK**).
1. **Node Color Property:** Every node is either **RED** or **BLACK**.
2. **Root Property:** The root node is always **BLACK**.
3. **Leaf Property:** Every leaf (`NIL`) node is **BLACK**.
4. **Red Property (No Consecutive Reds):** If a node is **RED**, both of its children must be **BLACK**.
5. **Black-Height Property:** Every simple path from a node to any of its descendant `NIL` leaves contains the exact same number of **BLACK** nodes.

```mermaid
flowchart TD
    subgraph "Standard Red-Black Tree (Black Height = 2)"
        R["26 (BLACK)"] --- N17["17 (RED)"]
        R --- N41["41 (BLACK)"]
        N17 --- N14["14 (BLACK)"]
        N17 --- N21["21 (BLACK)"]
        N41 --- N30["30 (RED)"]
        N41 --- N47["47 (RED)"]

        style R fill:#000,stroke:#333,color:#fff
        style N17 fill:#f00,stroke:#333,color:#fff
        style N41 fill:#000,stroke:#333,color:#fff
        style N14 fill:#000,stroke:#333,color:#fff
        style N21 fill:#000,stroke:#333,color:#fff
        style N30 fill:#f00,stroke:#333,color:#fff
        style N47 fill:#f00,stroke:#333,color:#fff
    end
```

### Tree Rotations (Left-Rotate and Right-Rotate)
Rotations adjust tree height while maintaining the BST ordering invariant.

```mermaid
flowchart TD
    subgraph "Left Rotation around Node X"
        direction LR
        X1["X (BLACK)"] --- A1["Subtree alpha"]
        X1 --- Y1["Y (RED)"]
        Y1 --- B1["Subtree beta"]
        Y1 --- C1["Subtree gamma"]
    end

    subgraph "After Left-Rotate(T, X)"
        direction LR
        Y2["Y (RED)"] --- X2["X (BLACK)"]
        Y2 --- C2["Subtree gamma"]
        X2 --- A2["Subtree alpha"]
        X2 --- B2["Subtree beta"]
    end
```

### Red-Black Tree Insertion: Step-by-Step Rules & Cases
1. Insert key $Z$ using standard BST insertion and color $Z$ **RED**.
2. If $Z$ is root $\to$ Recolor $Z$ to **BLACK**.
3. If Parent $P$ is **RED** $\to$ Red-Red Conflict! Inspect $Z$'s **Uncle $U$** (sibling of $P$):

```mermaid
flowchart TD
    Start["Insert Node Z as RED"] --> CheckP{"Is Parent P RED?"}
    CheckP -- No --> Valid["Valid RBT! Done."]
    CheckP -- Yes --> CheckU{"Is Uncle U RED?"}

    CheckU -- "Yes (Case 1: Recoloring)" --> Case1["Case 1: Uncle U is RED
1. Recolor Parent P -> BLACK
2. Recolor Uncle U -> BLACK
3. Recolor Grandparent G -> RED
4. Set Z = G and repeat check up the tree"]
    CheckU -- "No (Uncle U is BLACK/NIL)" --> CheckShape{"Is Z-P-G in Triangle shape?"}

    CheckShape -- "Yes (Case 2: Rotation to Line)" --> Case2["Case 2: Triangle Shape (Left-Right / Right-Left)
1. Rotate Parent P away from Z
2. Set Z = P (transforms into Case 3 shape)"]
    CheckShape -- "No (Case 3: Line Shape)" --> Case3["Case 3: Line Shape (Left-Left / Right-Right)
1. Rotate Grandparent G away from P
2. Recolor Parent P -> BLACK
3. Recolor Grandparent G -> RED
4. Conflict Resolved! Done."]

    Case2 --> Case3
```

---

### Red-Black Tree Deletion: Step-by-Step Rules & Cases (`RB-DELETE-FIXUP`)
When a **BLACK** node is deleted, its path loses one black node. A **Double Black** is placed on its replacement $X$.

```mermaid
flowchart TD
    DB["Double Black at Node X"] --> CheckW{"Is Sibling W RED?"}

    CheckW -- "Yes (Case 1)" --> Case1["Case 1: Sibling W is RED
1. Recolor Sibling W -> BLACK
2. Recolor Parent X.p -> RED
3. Rotate Parent X.p towards X
4. New Sibling W is now BLACK -> Move to Case 2, 3, or 4"]

    CheckW -- "No (Sibling W is BLACK)" --> CheckChildren{"Are both children of W BLACK?"}

    CheckChildren -- "Yes (Case 2)" --> Case2["Case 2: Both Children of Sibling W are BLACK
1. Recolor Sibling W -> RED
2. Move Double Black up: X = X.p
3. Loop terminates if X.p was RED (recolor to BLACK), else repeat"]

    CheckChildren -- "No" --> CheckOuterChild{"Is Outer Child of W BLACK?"}

    CheckOuterChild -- "Yes (Case 3)" --> Case3["Case 3: Inner Child RED, Outer Child BLACK
1. Recolor Inner Child of W -> BLACK
2. Recolor Sibling W -> RED
3. Rotate Sibling W away from X
4. Transforms into Case 4"]

    CheckOuterChild -- "No (Outer Child RED) (Case 4)" --> Case4["Case 4: Outer Child of W is RED
1. Recolor Sibling W -> Parent X.p's color
2. Recolor Parent X.p -> BLACK
3. Recolor Outer Child of W -> BLACK
4. Rotate Parent X.p towards X
5. Double Black Eliminated! Done."]

    Case1 --> CheckChildren
    Case3 --> Case4
```

---

## 3. Binomial Heaps

### Definition & Binomial Tree $B_k$ Properties
A Binomial Heap is a collection of Binomial Trees $B_0, B_1, B_2, \dots, B_k$ satisfying:
1. **$B_k$ Tree Structure:** A Binomial Tree $B_k$ is formed by linking two $B_{k-1}$ trees together (one becomes the left child of the other).
2. **Node Count:** $B_k$ contains exactly $2^k$ nodes.
3. **Tree Height:** Height of $B_k$ is $k$.
4. **Root Degree:** The root of $B_k$ has degree $k$.
5. **Depth Distribution:** $B_k$ has exactly $\binom{k}{i}$ nodes at depth $i$.
6. **Min-Heap Order:** Key of parent $\le$ Key of children.

```mermaid
flowchart TD
    subgraph "Binomial Trees B0, B1, B2, B3"
        subgraph "B0 (1 Node)"
            r0["10"]
        end
        subgraph "B1 (2 Nodes)"
            r1["12"] --- c11["25"]
        end
        subgraph "B2 (4 Nodes)"
            r2["15"] --- c21["28"]
            r2 --- c22["33"]
            c21 --- c211["41"]
        end
    end
```

### Binomial Heap Union/Merge Algorithm: Step-by-Step Rules
1. **Merge Root Lists:** Merge the root lists of two heaps $H_1$ and $H_2$ in ascending order of tree degree.
2. **Consolidate Duplicate Degrees:** Traverse the merged list. If two adjacent trees have the same degree $k$:
   - Compare their roots. The root with the **smaller key** stays as root.
   - Link the root with the **larger key** as the leftmost child of the smaller root.
   - Increment degree of winning root to $k+1$.
   - Continue until all tree degrees in the root list are strictly distinct.

```mermaid
flowchart TD
    subgraph "Merging Two B2 Trees (Roots 12 and 18)"
        rA["12 (Degree 2)"] --- cA1["20"]
        rA --- cA2["25"]

        rB["18 (Degree 2)"] --- cB1["30"]
        rB --- cB2["35"]
    end

    subgraph "Resulting B3 Tree (Root 12)"
        rRes["12 (Degree 3)"] --- rB2["18 (Degree 2)"]
        rRes --- cA12["20"]
        rRes --- cA22["25"]
        rB2 --- cB12["30"]
        rB2 --- cB22["35"]
    end
```

---

## 4. Fibonacci Heaps

### Structure & Key Concept
A Fibonacci Heap is a collection of min-heap-ordered trees utilizing **lazy operations**. Trees are not merged immediately during `Insert` or `Union`; merging is deferred until `Extract-Min`.

Node Attributes:
- `key`, `degree`, `mark` (boolean: `TRUE` if node lost a child since becoming child of parent), `parent`, `child`, `left`, `right`.

### Step-by-Step Operation Rules

```mermaid
flowchart TD
    subgraph "Fibonacci Heap Core Operations Flow"
        Ins["INSERT(x)"] --> InsStep["Create node x -> Add x to Root List -> Update min pointer -> O(1)"]

        Uni["UNION(H1, H2)"] --> UniStep["Concatenate Root Lists of H1 and H2 -> Update min pointer -> O(1)"]

        EM["EXTRACT-MIN"] --> EM1["1. Remove min node Z from root list
2. Move all children of Z to root list"]
        EM1 --> EM2["3. CONSOLIDATE: Merge trees of equal degree using Degree Table A[] until all degrees distinct
4. Update min pointer -> O(log n)"]

        DK["DECREASE-KEY(x, k)"] --> DK1["1. Set x.key = k"]
        DK1 --> DK2{"Is x.key < x.parent.key?"}
        DK2 -- No --> DKDone["Valid Min-Heap -> Done"]
        DK2 -- Yes --> DK3["2. Cut x from parent -> Move x to root list -> Unmark x"]
        DK3 --> DK4{"Is x.parent marked?"}
        DK4 -- Yes --> DK5["3. CASCADING CUT: Cut x.parent, move to root list, repeat up"]
        DK4 -- No --> DK6["4. Mark x.parent = TRUE -> Done"]
    end
```

---

## 5. Amortised Analysis Methods

```mermaid
flowchart TD
    A["Amortised Analysis Methods"] --> B["1. Aggregate Method"]
    A --> C["2. Accounting Method (Banker's)"]
    A --> D["3. Potential Method (Physicist's)"]

    B --> B1["Amortized Cost = Total Cost T(n) / n
Same cost for all operations in sequence"]
    C --> C1["Assign Amortized Charges c_hat_i
Overcharge cheap ops (Store Credit)
Use Credit to pay for expensive ops
Rule: Total Credit >= 0 always"]
    D --> D1["Define Potential Function Phi(D_i)
Amortized Cost = Actual Cost c_i + Phi(D_i) - Phi(D_i-1)
Rule: Phi(D_n) >= Phi(D_0)"]
```

---

## 6. Exam-Oriented Review & Formula Sheet

1. **Red-Black Tree Height Guarantee:** $h \le 2 \log_2(n+1)$.
2. **RBT Insertion Rule:** Uncle RED $\implies$ Case 1 (Recolor). Uncle BLACK $\implies$ Case 2 (Rotate to Line) / Case 3 (Rotate Grandparent).
3. **RBT Deletion Rule:** Sibling RED $\implies$ Case 1. Sibling BLACK + 2 Black Children $\implies$ Case 2. Sibling BLACK + Outer Red Child $\implies$ Case 4 (Eliminate Double Black).
4. **Binomial Tree $B_k$:** $2^k$ nodes, degree $k$, height $k$.
5. **Fibonacci Heap Amortized Complexity:** $O(1)$ for Insert, Union, Decrease-Key; $O(\log n)$ for Extract-Min.
6. **Potential Equation:** $\hat{c}_i = c_i + \Phi(D_i) - \Phi(D_{i-1})$.
