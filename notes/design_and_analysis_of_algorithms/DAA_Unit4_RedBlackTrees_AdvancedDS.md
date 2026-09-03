# Chapter 4: Unit 4 — Advanced Data Structures & Amortized Analysis

> **Course Code:** 3CS501CC24
> **Focus:** Red-Black Trees, Binomial Heaps, Fibonacci Heaps & Amortized Analysis (Comprehensive Exam & Problem-Solving Master Guide with Colorful Mermaid Diagrams)

---

## 1. Chapter Overview
This unit covers advanced data structures that guarantee logarithmic or constant amortized time complexities:
1. **Red-Black Trees (RBT):** Self-balancing binary search trees ensuring $O(\log n)$ worst-case bounds on search, insertion, and deletion.
2. **Binomial Heaps:** Forest of Binomial Trees supporting $O(\log n)$ worst-case merge/union operations.
3. **Fibonacci Heaps:** Lazy mergeable heaps supporting $O(1)$ amortized insertion, union, and decrease-key operations.
4. **Amortized Analysis:** Evaluating the average cost per operation over a sequence using Aggregate, Accounting, and Potential methods.

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

### Red-Black Tree Insertion: All 3 Cases with Diagrams

When inserting node $Z$:
1. Insert $Z$ using standard BST insertion and color $Z$ **RED**.
2. If $Z$ is root $\to$ Recolor $Z$ to **BLACK**.
3. If $Z$'s parent $P$ is **RED** $\to$ Red-Red Conflict! Look at $Z$'s **Uncle $U$** (sibling of $P$):

#### Case 1: Uncle $U$ is RED (Recoloring)
- **Condition:** Both Parent $P$ and Uncle $U$ are RED.
- **Steps:**
  1. Recolor Parent $P \to$ **BLACK**.
  2. Recolor Uncle $U \to$ **BLACK**.
  3. Recolor Grandparent $G \to$ **RED**.
  4. Set $Z = G$ and repeat check up the tree.

```mermaid
flowchart TD
    subgraph "Case 1 Before: Uncle U is RED"
        G1["G (BLACK)"] --- P1["P (RED)"]
        G1 --- U1["U (RED)"]
        P1 --- Z1["Z (RED)"]

        style G1 fill:#1e1e2e,stroke:#333,color:#fff
        style P1 fill:#f38ba8,stroke:#333,color:#11111b
        style U1 fill:#f38ba8,stroke:#333,color:#11111b
        style Z1 fill:#f38ba8,stroke:#333,color:#11111b
    end

    subgraph "Case 1 After: Recolored"
        G2["G (RED)"] --- P2["P (BLACK)"]
        G2 --- U2["U (BLACK)"]
        P2 --- Z2["Z (RED)"]

        style G2 fill:#f38ba8,stroke:#333,color:#11111b
        style P2 fill:#1e1e2e,stroke:#333,color:#fff
        style U2 fill:#1e1e2e,stroke:#333,color:#fff
        style Z2 fill:#f38ba8,stroke:#333,color:#11111b
    end
```

#### Case 2: Uncle $U$ is BLACK/NIL & $Z$ is a Triangle Child (Rotation to Line)
- **Condition:** Uncle $U$ is BLACK or NIL, $P$ is Left Child of $G$, and $Z$ is Right Child of $P$ (or vice-versa).
- **Steps:**
  1. Rotate Parent $P$ away from $Z$ (e.g. Left-Rotate around $P$).
  2. Set $Z = P$. $Z$ and $P$ are now in **Case 3 (Line)** shape.

```mermaid
flowchart TD
    subgraph "Case 2 Before: Triangle Shape (Uncle BLACK/NIL)"
        G1["G (BLACK)"] --- P1["P (RED)"]
        G1 --- U1["U (NIL BLACK)"]
        P1 --- Z1["Z (RED)"]

        style G1 fill:#1e1e2e,stroke:#333,color:#fff
        style P1 fill:#f38ba8,stroke:#333,color:#11111b
        style U1 fill:#1e1e2e,stroke:#333,color:#fff
        style Z1 fill:#f38ba8,stroke:#333,color:#11111b
    end

    subgraph "Case 2 After: Rotated P to Line Shape (Case 3)"
        G2["G (BLACK)"] --- Z2["Z (RED)"]
        G2 --- U2["U (NIL BLACK)"]
        Z2 --- P2["P (RED)"]

        style G2 fill:#1e1e2e,stroke:#333,color:#fff
        style Z2 fill:#f38ba8,stroke:#333,color:#11111b
        style U2 fill:#1e1e2e,stroke:#333,color:#fff
        style P2 fill:#f38ba8,stroke:#333,color:#11111b
    end
```

#### Case 3: Uncle $U$ is BLACK/NIL & $Z$ is a Line Child (Rotation & Recoloring)
- **Condition:** Uncle $U$ is BLACK or NIL, $P$ is Left Child of $G$, and $Z$ is Left Child of $P$ (or vice-versa).
- **Steps:**
  1. Rotate Grandparent $G$ away from $P$ (e.g. Right-Rotate around $G$).
  2. Recolor Parent $P \to$ **BLACK**.
  3. Recolor Grandparent $G \to$ **RED**.
  4. Red-Red conflict is fully resolved!

```mermaid
flowchart TD
    subgraph "Case 3 Before: Line Shape (Uncle BLACK/NIL)"
        G1["G (BLACK)"] --- P1["P (RED)"]
        G1 --- U1["U (NIL BLACK)"]
        P1 --- Z1["Z (RED)"]

        style G1 fill:#1e1e2e,stroke:#333,color:#fff
        style P1 fill:#f38ba8,stroke:#333,color:#11111b
        style U1 fill:#1e1e2e,stroke:#333,color:#fff
        style Z1 fill:#f38ba8,stroke:#333,color:#11111b
    end

    subgraph "Case 3 After: Right-Rotate G & Recolor"
        P2["P (BLACK)"] --- Z2["Z (RED)"]
        P2 --- G2["G (RED)"]
        G2 --- U2["U (NIL BLACK)"]

        style P2 fill:#1e1e2e,stroke:#333,color:#fff
        style Z2 fill:#f38ba8,stroke:#333,color:#11111b
        style G2 fill:#f38ba8,stroke:#333,color:#11111b
        style U2 fill:#1e1e2e,stroke:#333,color:#fff
    end
```

---

### Red-Black Tree Deletion: All 4 Cases (`RB-DELETE-FIXUP`)

When a BLACK node is deleted, its path loses 1 black node, creating a **Double Black** on replacement $X$. Let $W$ be $X$'s Sibling:

#### Case 1: Sibling $W$ is RED
- **Condition:** $W.\text{color} == \text{RED}$.
- **Steps:**
  1. Recolor Sibling $W \to$ **BLACK**.
  2. Recolor Parent $X.p \to$ **RED**.
  3. Left-Rotate($X.p$).
  4. New sibling is now BLACK $\to$ Proceed to Case 2, 3, or 4.

```mermaid
flowchart TD
    subgraph "Case 1 Before: Sibling W is RED"
        P1["X.p (BLACK)"] --- X1["X (Double Black)"]
        P1 --- W1["W (RED)"]
        W1 --- C1["Subtree A (BLACK)"]
        W1 --- C2["Subtree B (BLACK)"]

        style P1 fill:#1e1e2e,stroke:#333,color:#fff
        style X1 fill:#a6e3a1,stroke:#333,color:#11111b
        style W1 fill:#f38ba8,stroke:#333,color:#11111b
        style C1 fill:#1e1e2e,stroke:#333,color:#fff
        style C2 fill:#1e1e2e,stroke:#333,color:#fff
    end

    subgraph "Case 1 After: Recolor & Left-Rotate(X.p)"
        W2["W (BLACK)"] --- P2["X.p (RED)"]
        W2 --- C22["Subtree B (BLACK)"]
        P2 --- X2["X (Double Black)"]
        P2 --- C12["Subtree A (BLACK)"]

        style W2 fill:#1e1e2e,stroke:#333,color:#fff
        style P2 fill:#f38ba8,stroke:#333,color:#11111b
        style X2 fill:#a6e3a1,stroke:#333,color:#11111b
        style C12 fill:#1e1e2e,stroke:#333,color:#fff
        style C22 fill:#1e1e2e,stroke:#333,color:#fff
    end
```

#### Case 2: Sibling $W$ is BLACK and Both Children of $W$ are BLACK
- **Condition:** $W.\text{color} == \text{BLACK}$, $W.\text{left}.\text{color} == \text{BLACK}$, $W.\text{right}.\text{color} == \text{BLACK}$.
- **Steps:**
  1. Recolor Sibling $W \to$ **RED**.
  2. Move Double Black up: Set $X = X.p$.
  3. If $X.p$ was RED, recolor $X \to$ **BLACK** and finish; otherwise repeat loop.

```mermaid
flowchart TD
    subgraph "Case 2 Before: Sibling W & Children BLACK"
        P1["X.p (Parent)"] --- X1["X (Double Black)"]
        P1 --- W1["W (BLACK)"]
        W1 --- C1["Left Child (BLACK)"]
        W1 --- C2["Right Child (BLACK)"]

        style P1 fill:#fab387,stroke:#333,color:#11111b
        style X1 fill:#a6e3a1,stroke:#333,color:#11111b
        style W1 fill:#1e1e2e,stroke:#333,color:#fff
        style C1 fill:#1e1e2e,stroke:#333,color:#fff
        style C2 fill:#1e1e2e,stroke:#333,color:#fff
    end

    subgraph "Case 2 After: W becomes RED, Double Black moves to X.p"
        P2["X.p (New X: Double Black)"] --- X2["X (Single Black)"]
        P2 --- W2["W (RED)"]
        W2 --- C12["Left Child (BLACK)"]
        W2 --- C22["Right Child (BLACK)"]

        style P2 fill:#a6e3a1,stroke:#333,color:#11111b
        style X2 fill:#1e1e2e,stroke:#333,color:#fff
        style W2 fill:#f38ba8,stroke:#333,color:#11111b
        style C12 fill:#1e1e2e,stroke:#333,color:#fff
        style C22 fill:#1e1e2e,stroke:#333,color:#fff
    end
```

#### Case 3: Sibling $W$ is BLACK, Inner Child is RED, Outer Child is BLACK
- **Condition:** $W.\text{left}.\text{color} == \text{RED}, W.\text{right}.\text{color} == \text{BLACK}$.
- **Steps:**
  1. Recolor $W.\text{left} \to$ **BLACK**.
  2. Recolor Sibling $W \to$ **RED**.
  3. Right-Rotate($W$).
  4. Transforms into **Case 4**.

```mermaid
flowchart TD
    subgraph "Case 3 Before: Inner Child RED, Outer Child BLACK"
        P1["X.p"] --- X1["X (Double Black)"]
        P1 --- W1["W (BLACK)"]
        W1 --- WL1["W.left (RED)"]
        W1 --- WR1["W.right (BLACK)"]

        style P1 fill:#fab387,stroke:#333,color:#11111b
        style X1 fill:#a6e3a1,stroke:#333,color:#11111b
        style W1 fill:#1e1e2e,stroke:#333,color:#fff
        style WL1 fill:#f38ba8,stroke:#333,color:#11111b
        style WR1 fill:#1e1e2e,stroke:#333,color:#fff
    end

    subgraph "Case 3 After: Right-Rotate(W) -> Converted to Case 4"
        P2["X.p"] --- X2["X (Double Black)"]
        P2 --- WL2["New W: W.left (BLACK)"]
        WL2 --- Sub1["Subtree"]
        WL2 --- W2["Old W (RED)"]
        W2 --- WR2["W.right (BLACK)"]

        style P2 fill:#fab387,stroke:#333,color:#11111b
        style X2 fill:#a6e3a1,stroke:#333,color:#11111b
        style WL2 fill:#1e1e2e,stroke:#333,color:#fff
        style Sub1 fill:#1e1e2e,stroke:#333,color:#fff
        style W2 fill:#f38ba8,stroke:#333,color:#11111b
        style WR2 fill:#1e1e2e,stroke:#333,color:#fff
    end
```

#### Case 4: Sibling $W$ is BLACK and Outer Child is RED
- **Condition:** $W.\text{right}.\text{color} == \text{RED}$.
- **Steps:**
  1. Recolor Sibling $W \to$ Parent $X.p$'s color.
  2. Recolor Parent $X.p \to$ **BLACK**.
  3. Recolor $W.\text{right} \to$ **BLACK**.
  4. Left-Rotate($X.p$).
  5. Set $X = T.\text{root}$ $\implies$ **Double Black fully eliminated!**

```mermaid
flowchart TD
    subgraph "Case 4 Before: Outer Child is RED"
        P1["X.p (Parent)"] --- X1["X (Double Black)"]
        P1 --- W1["W (BLACK)"]
        W1 --- WL1["W.left"]
        W1 --- WR1["W.right (RED)"]

        style P1 fill:#fab387,stroke:#333,color:#11111b
        style X1 fill:#a6e3a1,stroke:#333,color:#11111b
        style W1 fill:#1e1e2e,stroke:#333,color:#fff
        style WL1 fill:#1e1e2e,stroke:#333,color:#fff
        style WR1 fill:#f38ba8,stroke:#333,color:#11111b
    end

    subgraph "Case 4 After: Recolor & Left-Rotate(X.p) -> Double Black Resolved!"
        W2["W (Parent Color)"] --- P2["X.p (BLACK)"]
        W2 --- WR2["W.right (BLACK)"]
        P2 --- X2["X (Single Black)"]
        P2 --- WL2["W.left"]

        style W2 fill:#fab387,stroke:#333,color:#11111b
        style P2 fill:#1e1e2e,stroke:#333,color:#fff
        style WR2 fill:#1e1e2e,stroke:#333,color:#fff
        style X2 fill:#1e1e2e,stroke:#333,color:#fff
        style WL2 fill:#1e1e2e,stroke:#333,color:#fff
    end
```

---

## 3. Binomial Heaps: Step-by-Step Operations & Cases

### Binomial Tree $B_k$ Properties
1. $B_k$ has $2^k$ total nodes.
2. Height of $B_k$ is $k$.
3. Root degree of $B_k$ is $k$.
4. $B_k$ is formed by making one $B_{k-1}$ the left child of another $B_{k-1}$.

```mermaid
flowchart TD
    subgraph "Binomial Trees B0, B1, B2, B3"
        subgraph "B0 (Degree 0, 1 Node)"
            r0["10"]
            style r0 fill:#89b4fa,stroke:#333,color:#11111b
        end
        subgraph "B1 (Degree 1, 2 Nodes)"
            r1["12"] --- c11["25"]
            style r1 fill:#89b4fa,stroke:#333,color:#11111b
            style c11 fill:#a6e3a1,stroke:#333,color:#11111b
        end
        subgraph "B2 (Degree 2, 4 Nodes)"
            r2["15"] --- c21["28"]
            r2 --- c22["33"]
            c21 --- c211["41"]
            style r2 fill:#89b4fa,stroke:#333,color:#11111b
            style c21 fill:#a6e3a1,stroke:#333,color:#11111b
            style c22 fill:#a6e3a1,stroke:#333,color:#11111b
            style c211 fill:#f9e2af,stroke:#333,color:#11111b
        end
    end
```

---

### Binomial Heap Union/Merge Algorithm (All Cases)

Given two Binomial Heaps $H_1$ and $H_2$:
1. **Merge Root Lists:** Merge root lists in ascending order of tree degree.
2. **Consolidate Equal Degrees:** Traverse root list with pointers `prev`, `curr`, `next`.
   - **Case A (Degrees Different):** `curr.degree != next.degree` $\implies$ Advance pointers.
   - **Case B (3 Equal Degrees):** `curr.degree == next.degree == next.next.degree` $\implies$ Advance pointers.
   - **Case C (2 Equal Degrees, `curr.key <= next.key`):** Link `next` under `curr` $\implies$ `curr` becomes parent of `next`. Degree of `curr` becomes $k+1$.
   - **Case D (2 Equal Degrees, `curr.key &gt; next.key`):** Link `curr` under `next` $\implies$ `next` becomes parent of `curr`.

```mermaid
flowchart TD
    subgraph "Linking Two B2 Trees (Roots 12 and 18)"
        rA["12 (Degree 2)"] --- cA1["20"]
        rA --- cA2["25"]

        rB["18 (Degree 2)"] --- cB1["30"]
        rB --- cB2["35"]

        style rA fill:#a6e3a1,stroke:#333,color:#11111b
        style rB fill:#f38ba8,stroke:#333,color:#11111b
    end

    subgraph "Merged B3 Tree (Root 12)"
        rRes["12 (Degree 3)"] --- rB2["18 (Degree 2)"]
        rRes --- cA12["20"]
        rRes --- cA22["25"]
        rB2 --- cB12["30"]
        rB2 --- cB22["35"]

        style rRes fill:#a6e3a1,stroke:#333,color:#11111b
        style rB2 fill:#f38ba8,stroke:#333,color:#11111b
    end
```

---

### Step-by-Step Solved Problem: Binomial Heap Operations

#### 1. Insert(H, x)
- Create a new single-node Binomial Heap $H'$ containing $x$ (a $B_0$ tree).
- Call `Binomial-Heap-Union(H, H')`.
- **Complexity:** $O(\log n)$.

#### 2. Extract-Min(H)
- Find root $x$ with minimum key in root list.
- Remove $x$ from root list.
- Reverse the order of $x$'s child subtrees to form a new Binomial Heap $H''$.
- Call `Binomial-Heap-Union(H, H'')`.
- **Complexity:** $O(\log n)$.

```mermaid
flowchart TD
    subgraph "Extract-Min Flow"
        Step1["1. Search Root List -> Locate Min Root X"] --> Step2["2. Remove X from Root List"]
        Step2 --> Step3["3. Reverse X's Children to form new Heap H''"]
        Step3 --> Step4["4. Call Binomial-Heap-Union(H, H'')"]
    end
```

#### 3. Decrease-Key(H, x, k)
- Set $x.\text{key} = k$.
- While $x$ is not root and $x.\text{key} < x.\text{parent}.\text{key}$:
  - Swap key and satellite data between $x$ and $x.\text{parent}$.
  - Set $x = x.\text{parent}$.
- **Complexity:** $O(\log n)$.

---

## 4. Fibonacci Heaps: Step-by-Step Operations & Cases

### Key Attributes
- **Lazy Structure:** Trees are unstructured in root list until `Extract-Min`.
- **Min Pointer:** Points directly to root with minimum key.
- **Marked Attribute:** `mark[x]` is `TRUE` if node $x$ lost a child since $x$ was made a child of another node.

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
        style N7 fill:#89b4fa,stroke:#333,color:#11111b
        style N18 fill:#f38ba8,stroke:#333,color:#11111b
    end
```

---

### Step-by-Step Fibonacci Heap Operations

#### 1. Insert(H, x) & Union(H1, H2)
- **Insert:** Create node $x$, add $x$ to $H$'s root list, update `min` pointer if $x.\text{key} < \text{min}.\text{key}$. Amortized Cost = $O(1)$.
- **Union:** Concatenate root lists of $H_1$ and $H_2$, update `min` pointer. Amortized Cost = $O(1)$.

#### 2. Extract-Min(H) & Consolidation
1. Remove `min` node $Z$ from root list.
2. Add all children of $Z$ to root list.
3. **Consolidate Root List:**
   - Initialize Degree Table $A[0 \dots D(n)] = \text{NIL}$.
   - For each node $x$ in root list:
     - $d = x.\text{degree}$.
     - While $A[d] \neq \text{NIL}$:
       - $y = A[d]$ (another root with degree $d$).
       - If $x.\text{key} > y.\text{key}$, swap $x$ and $y$.
       - Link $y$ under $x$ (`Fibonacci-Heap-Link`).
       - $A[d] = \text{NIL}, d = d + 1$.
     - $A[d] = x$.
4. Rebuild root list from $A[]$ and set `min` pointer. Amortized Cost = $O(\log n)$.

```mermaid
flowchart TD
    subgraph "Fibonacci Extract-Min Consolidation Flow"
        E1["Extract Min Z"] --> E2["Move Children of Z to Root List"]
        E2 --> E3["Loop Nodes in Root List"]
        E3 --> CheckA{"Is A[degree] occupied?"}
        CheckA -- Yes --> Link["Link Roots: Larger Key becomes child of Smaller Key
Increment Degree -> Repeat Check"]
        CheckA -- No --> Store["Store Root in A[degree]"]
        Link --> CheckA
        Store --> Done["Reconstruct Root List & Update min pointer"]
    end
```

#### 3. Decrease-Key(H, x, k) & Cascading Cut
1. Set $x.\text{key} = k$.
2. If $x.\text{key} < x.\text{parent}.\text{key}$:
   - **Cut(H, x, y):** Remove $x$ from child list of $y = x.\text{parent}$, add $x$ to root list, set $x.\text{mark} = \text{FALSE}$.
   - **Cascading-Cut(H, y):**
     - $z = y.\text{parent}$.
     - If $y$ is not root:
       - If $y.\text{mark} == \text{FALSE} \implies$ Set $y.\text{mark} = \text{TRUE}$.
       - If $y.\text{mark} == \text{TRUE} \implies$ Cut $y$ from $z$, add $y$ to root list, recursively call `Cascading-Cut(H, z)`.

```mermaid
flowchart TD
    subgraph "Cascading Cut Case Logic"
        DK["Decrease-Key(x, k)"] --> CheckViol{"Is x.key < x.parent.key?"}
        CheckViol -- No --> Valid["Heap Valid -> Done"]
        CheckViol -- Yes --> CutX["Cut x from Parent P -> Move x to Root List -> Unmark x"]
        CutX --> CheckP{"Is Parent P Marked?"}
        CheckP -- "No (P is Unmarked)" --> MarkP["Mark P = TRUE -> Done"]
        CheckP -- "Yes (P is Already Marked)" --> CutP["CASCADING CUT: Cut P from its Parent -> Move P to Root List -> Unmark P"]
        CutP --> RecP["Recursively Apply Cascading Cut to P's Parent"]
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
Guarantees average cost per op over worst-case sequence"]
    C --> C1["Assign Amortized Charge c_hat_i to each op
If c_hat_i > c_i -> Store Credit in Data Structure
If c_hat_i < c_i -> Use Credit to pay for op
Rule: Total Credit >= 0 always"]
    D --> D1["Define Potential Function Phi(D_i) mapping state to real number
Amortized Cost c_hat_i = c_i + Phi(D_i) - Phi(D_i-1)
Rule: Phi(D_n) >= Phi(D_0) always"]

    style A fill:#fab387,stroke:#333,color:#11111b
    style B fill:#89b4fa,stroke:#333,color:#11111b
    style C fill:#a6e3a1,stroke:#333,color:#11111b
    style D fill:#f38ba8,stroke:#333,color:#11111b
```

---

## 6. Exam-Oriented Review & Formula Sheet

1. **Red-Black Tree Height Guarantee:** $h \le 2 \log_2(n+1)$.
2. **RBT Insertion Cases:**
   - **Case 1:** Uncle RED $\implies$ Recolor Parent, Uncle, Grandparent.
   - **Case 2:** Uncle BLACK, Triangle $\implies$ Rotate Parent to Line.
   - **Case 3:** Uncle BLACK, Line $\implies$ Rotate Grandparent & Recolor.
3. **RBT Deletion Fixup Cases:**
   - **Case 1:** Sibling RED $\implies$ Recolor & Rotate Parent towards $X$.
   - **Case 2:** Sibling BLACK, 2 Black Children $\implies$ Recolor Sibling RED, move Double Black up.
   - **Case 3:** Sibling BLACK, Inner Red Child $\implies$ Rotate Sibling away from $X$ (converts to Case 4).
   - **Case 4:** Sibling BLACK, Outer Red Child $\implies$ Recolor & Rotate Parent towards $X$ (Eliminates Double Black).
4. **Binomial Tree $B_k$:** $2^k$ nodes, degree $k$, height $k$.
5. **Fibonacci Heap Amortized Complexity:** $O(1)$ for Insert, Union, Decrease-Key; $O(\log n)$ for Extract-Min and Delete.
6. **Potential Method Equation:** $\hat{c}_i = c_i + \Phi(D_i) - \Phi(D_{i-1})$.
