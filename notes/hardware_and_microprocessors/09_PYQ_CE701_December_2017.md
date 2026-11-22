# CE701: Interfacing with Microprocessors — Exam Paper Solutions (December 2017)

**Course:** CE701 — Interfacing with Microprocessors  
**Institution:** Nirma University, Institute of Technology  
**Program:** B.Tech. in Computer Engineering, Semester-VII  
**Exam:** Semester End Examination (IR), December 2017  
**Time Allowed:** 3 Hours  
**Maximum Marks:** 100 Marks  

---

## Table of Contents

- [Section I](#section-i)
    - [Question 1](#question-1)
    - [Q-1(a) [5 Marks] — Physical Address Calculation Process for 8086 Segments](#q-1a-5-marks--physical-address-calculation-process-for-8086-segments)
    - [Q-1(b) [5 Marks] — Effective Address & MOV Instructions Across Addressing Modes](#q-1b-5-marks--effective-address--mov-instructions-across-addressing-modes)
    - [Q-1(c) [5 Marks] — Importance of Control Signals: DT/R#, ALE, DEN#, INTA#, NMI](#q-1c-5-marks--importance-of-control-signals-dtr-ale-den-inta-nmi)
    - [Question 2](#question-2)
    - [Q-2(a) [5 Marks] — Timing Diagrams with Wait States: Memory Read & I/O Write Cycles](#q-2a-5-marks--timing-diagrams-with-wait-states-memory-read--io-write-cycles)
    - [Q-2(b) [5 Marks] — Pros and Cons of 8086 Memory Segmentation](#q-2b-5-marks--pros-and-cons-of-8086-memory-segmentation)
    - [Q-2(b) OR [5 Marks] — Importance and Structure of 80286 Descriptors](#q-2b-or-5-marks--importance-and-structure-of-80286-descriptors)
    - [Q-2(c) [5 Marks] — Memory Banking: Two Bus Cycles for Odd-Addressed Words](#q-2c-5-marks--memory-banking-two-bus-cycles-for-odd-addressed-words)
    - [Question 3](#question-3)
    - [Q-3(a) [10 Marks] — Stack Initialization (120 Words) & Recursive Factorial with Stack Trace](#q-3a-10-marks--stack-initialization-120-words--recursive-factorial-with-stack-trace)
    - [Q-3(a) OR [10 Marks] — NMI ISR: Vector Addition of 100 Bytes Across Far Segments](#q-3a-or-10-marks--nmi-isr-vector-addition-of-100-bytes-across-far-segments)
    - [Q-3(b) [10 Marks] — Symbol Table Search (100 Entries, 80 Bytes Each)](#q-3b-10-marks--symbol-table-search-100-entries-80-bytes-each)
- [Section II](#section-ii)
    - [Question 4](#question-4)
    - [Q-4(a) [5 Marks] — Interrupt Processing Steps & Role of IF/TF Flags](#q-4a-5-marks--interrupt-processing-steps--role-of-iftf-flags)
    - [Q-4(b) [5 Marks] — Stack Pointer & Memory Trace for Subroutine with RET 4](#q-4b-5-marks--stack-pointer--memory-trace-for-subroutine-with-ret-4)
    - [Q-4(c) [5 Marks] — Differentiations: RET vs IRET, ENDS vs ENDP, GLOBAL vs PUBLIC, DQ vs DT](#q-4c-5-marks--differentiations-ret-vs-iret-ends-vs-endp-global-vs-public-dq-vs-dt)
    - [Question 5](#question-5)
    - [Q-5(a) [5 Marks] — 32-bit x 32-bit Doubleword Unsigned Multiplication into ES](#q-5a-5-marks--32-bit-x-32-bit-doubleword-unsigned-multiplication-into-es)
    - [Q-5(a) OR [5 Marks] — String Concatenation Macro (STR1 + STR2 -> STR3)](#q-5a-or-5-marks--string-concatenation-macro-str1--str2---str3)
    - [Q-5(b) [5 Marks] — Error Identification in Given Assembly Instructions](#q-5b-5-marks--error-identification-in-given-assembly-instructions)
    - [Q-5(c) [5 Marks] — Convert 10 Packed BCD Numbers to Unpacked BCD](#q-5c-5-marks--convert-10-packed-bcd-numbers-to-unpacked-bcd)
    - [Question 6](#question-6)
    - [Q-6(a) [5 Marks] — Real Mode vs Protected Mode Memory Addressing](#q-6a-5-marks--real-mode-vs-protected-mode-memory-addressing)
    - [Q-6(b) [5 Marks] — 8259 PIC Block Diagram & Functional Components](#q-6b-5-marks--8259-pic-block-diagram--functional-components)
    - [Q-6(c) [5 Marks] — 8255A PPI Block Diagram & Operating Modes](#q-6c-5-marks--8255a-ppi-block-diagram--operating-modes)
    - [Q-6(c) OR [5 Marks] — 8254 PIT Control Word Format & Square Wave Program](#q-6c-or-5-marks--8254-pit-control-word-format--square-wave-program)
    - [Q-6(d) [5 Marks] — 8237 DMA Controller Modes & Bidirectional Bus Signals](#q-6d-5-marks--8237-dma-controller-modes--bidirectional-bus-signals)

---

# SECTION-I

## Question 1

### Q-1(a) [5 Marks] — Physical Address Calculation Process for 8086 Segments

> **Question:**  
> Show the physical address calculation process for 8086 microprocessor for various segments with neat illustration.

#### 1. Fundamental Concept
The 8086 has a **20-bit physical address bus** (allowing it to address $2^{20} = 1,048,576\text{ bytes} = 1\text{ MB}$ of memory), but its internal registers, ALUs, and data pathways are **16 bits wide**.  
To generate a 20-bit physical address from 16-bit registers, the hardware **Bus Interface Unit (BIU)** shifts the 16-bit segment register contents 4 bits to the left (multiplying by $16_{10}$ or $10\text{H}$) and adds the 16-bit **Effective Address (Offset)**:

$$\text{Physical Address (20 bits)} = (\text{Segment Register} \times 10\text{H}) + \text{Effective Address (Offset)}$$

```text
 16-bit Segment Register:       [ S15 | S14 | ... | S1 | S0 ]
 Left Shift by 4 bits (* 16) -> [ S15 | S14 | ... | S1 | S0 | 0 | 0 | 0 | 0 ]  (20-bit Segment Base)
                                                              +
 16-bit Offset (EA):                        [ E15 | E14 | ... | E1 | E0 ]      (Zero-extended)
                               ==============================================
 20-bit Physical Address:       [ A19 | A18 | ... | A3 | A2 | A1 | A0 ]
```

#### 2. Segment Register and Default Offset Mappings

| Segment Type | Segment Register | Default Offset Pointer | Default Purpose | Typical Instruction |
|:---|:---:|:---:|:---|:---|
| **Code Segment** | `CS` | `IP` (Instruction Pointer) | Machine code instruction stream | Next instruction opcode fetch |
| **Data Segment** | `DS` | `BX`, `SI`, `DI`, 16-bit Direct Address | Global variables and static arrays | `MOV AX, [BX+SI]` |
| **Stack Segment** | `SS` | `SP` (Stack Pointer), `BP` (Base Pointer) | LIFO stack frames and local variables | `PUSH AX`, `MOV AX, [BP+4]` |
| **Extra Segment** | `ES` | `DI` (Destination Index) | Destination string buffers & far data | `MOVSB`, `STOSW` |

---

### Q-1(b) [5 Marks] — Effective Address & MOV Instructions Across Addressing Modes

> **Question:**  
> Given data: $BX = 0017H, DI = 10C5H, \text{Displacement} = 1C58H$ and $DS = 1000H$.  
> Give example `MOV` instructions and determine the effective address for the following addressing modes:  
>
> 1. Direct addressing mode  
> 2. Register indirect assuming `BX` register  
> 3. Register relative assuming `BX` register  
> 4. Base indexed  
> 5. Register relative base indexed

#### Given Register Values:

$$DS = 1000\text{H}, \quad BX = 0017\text{H}, \quad DI = 10\text{C}5\text{H}, \quad \text{Disp} = 1\text{C}58\text{H}$$

---

#### 1. Direct Addressing Mode

- **Instruction Example:** `MOV AX, [1C58H]`
- **Effective Address (EA):** $\text{EA} = \text{Disp} = \mathbf{1C58}\text{H}$
- *Physical Address:* $(1000\text{H} \times 10\text{H}) + 1\text{C}58\text{H} = 10000\text{H} + 1\text{C}58\text{H} = \mathbf{11C58}\text{H}$

---

#### 2. Register Indirect Mode (using BX)

- **Instruction Example:** `MOV AX, [BX]`
- **Effective Address (EA):** $\text{EA} = [BX] = \mathbf{0017}\text{H}$
- *Physical Address:* $10000\text{H} + 0017\text{H} = \mathbf{10017}\text{H}$

---

#### 3. Register Relative Mode (using BX)

- **Instruction Example:** `MOV AX, [BX + 1C58H]`
- **Effective Address (EA):**

  $\text{EA} = [BX] + \text{Disp} = 0017\text{H} + 1\text{C}58\text{H} = \mathbf{1C6F}\text{H}$

- *Physical Address:* $10000\text{H} + 1\text{C}6\text{FH} = \mathbf{11C6F}\text{H}$

---

#### 4. Base Indexed Mode

- **Instruction Example:** `MOV AX, [BX + DI]`
- **Effective Address (EA):**

  $\text{EA} = [BX] + [DI] = 0017\text{H} + 10\text{C}5\text{H} = \mathbf{10DC}\text{H}$

- *Physical Address:* $10000\text{H} + 10\text{DCH} = \mathbf{110DC}\text{H}$

---

#### 5. Register Relative Base Indexed Mode

- **Instruction Example:** `MOV AX, [BX + DI + 1C58H]`
- **Effective Address (EA):**

  $\text{EA} = [BX] + [DI] + \text{Disp} = 0017\text{H} + 10\text{C}5\text{H} + 1\text{C}58\text{H}$

  $\text{EA} = 10\text{DCH} + 1\text{C}58\text{H} = \mathbf{2D34}\text{H}$

- *Physical Address:* $10000\text{H} + 2\text{D}34\text{H} = \mathbf{12D34}\text{H}$

---

### Q-1(c) [5 Marks] — Importance of Control Signals: DT/R#, ALE, DEN#, INTA#, NMI

> **Question:**  
> Give the importance of $DT/\overline{R}$, $\text{ALE}$, $\overline{\text{DEN}}$, $\overline{\text{INTA}}$ and $\text{NMI}$ control signals of 8086 microprocessor.

#### 1. $DT/\overline{R}$ (Data Transmit / Receive — Output, Pin 27 in Min Mode):

- **Function:** Controls the direction of data flow through bidirectional external octal bus transceivers (e.g., 74LS245).
- **Importance:** When HIGH ($1$), the 8086 is **transmitting** data (Memory/IO Write). When LOW ($0$), the 8086 is **receiving** data (Memory/IO Read). Prevents bus contention by orienting transceiver buffers prior to data strobe assertion.

#### 2. $\text{ALE}$ (Address Latch Enable — Output, Pin 25 in Min Mode):

- **Function:** Active-high pulse generated during state $T_1$ of every machine cycle.
- **Importance:** Latches the multiplexed address lines ($AD_0$–$AD_{15}$ and $A_{16}/S_3$–$A_{19}/S_6$) into external transparent latches (74LS373), providing a stable, demultiplexed 20-bit address across states $T_2$–$T_4$.

#### 3. $\overline{\text{DEN}}$ (Data Enable — Output, Pin 26 in Min Mode):

- **Function:** Active-low signal asserted during states $T_2, T_3, T_w, T_4$ of read/write bus cycles.
- **Importance:** Drives the Output Enable ($\overline{OE}$) of the 74LS245 data transceivers, isolating the CPU local data bus from the system data bus during $T_1$ while address lines are active.

#### 4. $\overline{\text{INTA}}$ (Interrupt Acknowledge — Output, Pin 24 in Min Mode):

- **Function:** Active-low handshake pulse generated in response to an interrupt request on `INTR`.
- **Importance:** Emitted in pairs: the first pulse signals the interrupt controller (8259) to freeze priority and resolve the requesting device; the second pulse commands the 8259 to put the 8-bit vector type ($N$) onto data bus lines $D_7$–$D_0$.

#### 5. $\text{NMI}$ (Non-Maskable Interrupt — Input, Pin 17):

- **Function:** Edge-triggered, high-priority hardware interrupt input.
- **Importance:** Cannot be masked by software (unaffected by $IF = 0$). Hardwired to Type-2 in the IVT ($00008\text{H}$). Dedicated to catastrophic hardware events like power failure detection, RAM parity errors, or watchdog timer expirations.

---

## Question 2

### Q-2(a) [5 Marks] — Timing Diagrams with Wait States: Memory Read & I/O Write Cycles

> **Question:**  
> Draw separate timing diagram of 8086 microprocessor with wait states for memory-read and IO-write machine cycles with all necessary control signals.

#### 1. Memory Read Machine Cycle with Wait State ($T_w$)
A slow memory device pulls the `READY` line LOW during state $T_3$, causing the CPU to insert wait states ($T_w$) between $T_3$ and $T_4$:

```text
Clock (CLK)      |--- T1 ---|--- T2 ---|--- T3 ---|--- Tw ---|--- T4 ---|
                 _    _     _    _     _    _     _    _     _    _     
                | |__| |___| |__| |___| |__| |___| |__| |___| |__| |____
                 
ALE             ____/------\____________________________________________ (Pulsed in T1)

A19-A16/S6-S3   ---< Memory Address >--< Status S6-S3 >-----------------

AD15 - AD0      ---< Memory Address >--(Float)-----< Valid Data Read >--

M/IO#           ========================== HIGH ======================== (Memory Access)

RD#             -------------------\____________________________/------- (Active T2-Tw)

READY           ============================\______/==================== (Sampled low in T3)

DT/R#           ========================== LOW ========================= (Receive)

DEN#            -------------------\____________________________/------- (Buffer Enabled)
```

#### 2. I/O Write Machine Cycle with Wait State ($T_w$)
During an I/O Write (`OUT` instruction):

- $M/\overline{\text{IO}} = \text{LOW}$ (I/O operation).
- $DT/\overline{R} = \text{HIGH}$ (Transmit mode).
- $\overline{\text{WR}}$ is asserted LOW across $T_2, T_3, T_w$.

```text
Clock (CLK)      |--- T1 ---|--- T2 ---|--- T3 ---|--- Tw ---|--- T4 ---|
                 _    _     _    _     _    _     _    _     _    _     
                | |__| |___| |__| |___| |__| |___| |__| |___| |__| |____
                 
ALE             ____/------\____________________________________________ (Pulsed in T1)

A15 - A0        ---< 16-bit Port Addr >--------------------------------- (Driven in T1)

AD15 - AD0      ---< 16-bit Port Addr >-< Valid Output Data Driven >---- (Driven T2-T4)

M/IO#           ========================== LOW ========================= (I/O Access)

WR#             -------------------\____________________________/------- (Active T2-Tw)

READY           ============================\______/==================== (Sampled low in T3)

DT/R#           ========================== HIGH ======================== (Transmit)

DEN#            -------------------\____________________________/------- (Buffer Enabled)
```

---

### Q-2(b) [5 Marks] — Pros and Cons of 8086 Memory Segmentation

> **Question:**  
> Give pros and cons of 8086 microprocessor segmentation.

#### 1. Pros of Memory Segmentation:

1. **Physical Address Expansion:** Enables 16-bit internal registers to address 1 MB ($2^{20}$ bytes) of physical memory space without requiring 32-bit registers or ALU expansions.
2. **Code & Data Relocatability:** Programs can be loaded and executed anywhere in memory simply by setting the segment registers (`CS`, `DS`, `SS`), without recompilation or address rebinding.
3. **Logical Modularity:** Naturally divides programs into distinct code, data, and stack segments, preventing unintended cross-segment clobbering.
4. **Compact Machine Code:** Displacements and pointer variables only need 16 bits rather than 20 or 32 bits, reducing instruction size and bus traffic.

#### 2. Cons of Memory Segmentation:

1. **64 KB Segment Barrier:** Single data structures (arrays, matrices, buffers) larger than 64 KB cannot be indexed with a standard 16-bit pointer and require clumsy multi-segment normalization.
2. **Address Generation Overhead:** Computing $(\text{Segment} \times 16) + \text{Offset}$ introduces hardware addition latency on every memory access.
3. **Complex Pointer Types:** Compilers must differentiate between *Near Pointers* (16-bit offset) and *Far Pointers* (32-bit segment:offset), adding software complexity and subtle bugs.
4. **Lack of Hardware Protection:** In Real Mode 8086, segments can overlap arbitrarily, and any code can overwrite any segment without privilege checks.

---

### Q-2(b) OR [5 Marks] — Importance and Structure of 80286 Descriptors

> **Question (OR):**  
> Give the importance and the information stored in descriptor of 80286 processor.

#### 1. Importance of Descriptors in 80286
The 80286 introduced hardware-enforced **Protected Mode**. Segment registers no longer store physical addresses; instead, they hold 16-bit **Selectors** that index an entry in a **Descriptor Table** (GDT or LDT).  

- Descriptors prevent application tasks from accessing kernel data or executing non-code segments.
- They implement hardware bounds checking, catching memory violations instantly.

#### 2. Information Stored in an 8-Byte 80286 Segment Descriptor:

```text
Byte 7    Byte 6    Byte 5       Byte 4    Byte 3    Byte 2    Byte 1    Byte 0
+---------+---------+------------+---------+---------+---------+---------+---------+
| Reserved (00H)    | Access Byte|     Base Address (23..0)    |  Segment Limit (15..0)|
+---------+---------+------------+---------+---------+---------+---------+---------+
```

1. **Segment Limit (16 bits, Bytes 0–1):** Specifies the maximum byte size of the segment ($0000\text{H}$ to $\text{FFFFH}$, up to 64 KB). Any offset beyond this limit raises an exception.
2. **Base Address (24 bits, Bytes 2–4):** The starting physical address in the 16 MB 80286 address space ($2^{24} = 16\text{ MB}$).
3. **Access Rights Byte (8 bits, Byte 5):**
   - **$P$ (Present Bit, Bit 7):** $1 =$ Segment loaded in RAM; $0 =$ Segment swapped to disk (triggers segment fault).
   - **$DPL$ (Descriptor Privilege Level, Bits 6–5):** Rings 0 (OS Kernel) to 3 (User App).
   - **$S$ (System Descriptor, Bit 4):** $1 =$ Application segment; $0 =$ System segment (Gate/TSS).
   - **Type (Bits 3–0):** Specifies segment type: Code (Executable, Readable, Conforming) or Data (Read-only, Read/Write, Expand-down).
4. **Reserved (16 bits, Bytes 6–7):** Must be 0 for 80286 compatibility (later expanded to 32-bit base/limit in 80386).

---

### Q-2(c) [5 Marks] — Memory Banking: Two Bus Cycles for Odd-Addressed Words

> **Question:**  
> With detailed 8086 memory bank organization show that it requires two machine cycles to complete one read or write operation if word data is stored beginning from odd address. Also specify the associated signals for byte and word operations.

#### 1. Memory Banking Organization
The 8086 interfaces with 1 MB of memory divided into two 512 KB banks:

- **Even Bank ($D_7$–$D_0$):** Selected by $A_0 = 0$.
- **Odd Bank ($D_{15}$–$D_8$):** Selected by $\overline{\text{BHE}} = 0$.

```text
                           +-------------------------+
                           |   8086 MICROPROCESSOR   |
                           +------------+------------+
                                        |
                 +----------------------+----------------------+
                 | AD15 - AD8                          | AD7 - AD0
                 v                                     v
       +--------------------+                +--------------------+
BHE# ->|   ODD (UPPER) BANK |                |  EVEN (LOWER) BANK |<- A0
       |       512 KB       |                |       512 KB       |
       | Addresses:         |                | Addresses:         |
       | 00001H, 00003H,... |                | 00000H, 00002H,... |
       +--------------------+                +--------------------+
```

#### 2. Signals for Byte and Word Operations

| Operation | $\overline{\text{BHE}}$ | $A_0$ | Active Data Bus | Active Bank | Cycles |
|:---|:---:|:---:|:---:|:---|:---:|
| **Byte access at Even Address** | **1** | **0** | $D_7$–$D_0$ | Even Bank | 1 |
| **Byte access at Odd Address** | **0** | **1** | $D_{15}$–$D_8$ | Odd Bank | 1 |
| **Word access at Even Address (Aligned)** | **0** | **0** | $D_{15}$–$D_0$ | Both Banks | **1** |
| **Word access at Odd Address (Misaligned)** | Cycle 1: **0**<br>Cycle 2: **1** | **1**<br>**0** | Cycle 1: $D_{15}$–$D_8$<br>Cycle 2: $D_7$–$D_0$ | Cycle 1: Odd Bank<br>Cycle 2: Even Bank | **2** |

#### 3. Why Misaligned Word Requires Two Cycles:
Consider 16-bit word at odd address $00003\text{H}$:

- Low byte of word is at $00003\text{H}$ (in Odd Bank).
- High byte of word is at $00004\text{H}$ (in Even Bank).
- The processor cannot drive address $00003\text{H}$ and $00004\text{H}$ at the same time.
- **Cycle 1:** CPU accesses address $00003\text{H}$ with $\overline{\text{BHE}}=0, A_0=1$. Low byte is fetched from upper data bus $D_{15}$–$D_8$ and routed internally to `AL`.
- **Cycle 2:** CPU increments address to $00004\text{H}$ with $\overline{\text{BHE}}=1, A_0=0$. High byte is fetched from lower data bus $D_7$–$D_0$ and routed internally to `AH`.
- Hence, word access at an odd address requires **two machine cycles** (8 clock states).

---

## Question 3

### Q-3(a) [10 Marks] — Stack Initialization (120 Words) & Recursive Factorial with Stack Trace

> **Question:**  
> Write 8086 microprocessor assembly program module with all necessary instructions to initialize a stack segment of 120 words. Write a reentrant recursive procedure to compute factorial of a given number and trace the contents of the stack for computing factorial of $n=3$.

#### 1. Stack Initialization (120 Words = 240 Bytes)
```assembly
STACK_SEG SEGMENT STACK
    DW 120 DUP(?)         ; 120 words (240 bytes)
STACK_TOP LABEL WORD
STACK_SEG ENDS
```

#### 2. Reentrant Recursive Factorial Procedure Implementation

```assembly
;====================================================================
; Recursive Factorial Program in 8086 MASM Assembly
; Input:  Number N pushed onto stack as parameter
; Output: Factorial returned in AX register
;====================================================================
.MODEL SMALL

STACK_SEG SEGMENT STACK
    DW 120 DUP(?)
STACK_TOP LABEL WORD
STACK_SEG ENDS

.DATA
    N DW 3
    RESULT DW ?

.CODE
MAIN PROC
    ; Initialize Stack Segment & Pointer
    MOV AX, STACK_SEG
    MOV SS, AX
    LEA SP, STACK_TOP

    ; Initialize Data Segment
    MOV AX, @DATA
    MOV DS, AX

    ; Push argument n=3 onto stack and call recursive procedure
    PUSH N
    CALL FACTORIAL
    ADD SP, 2             ; Clean parameter from stack
    MOV RESULT, AX        ; AX holds 3! = 6

    MOV AX, 4C00H
    INT 21H
MAIN ENDP

;--------------------------------------------------------------------
; Procedure: FACTORIAL (Recursive & Reentrant)
; Stack Frame on entry: [BP+4] = n, [BP+2] = Return IP
;--------------------------------------------------------------------
FACTORIAL PROC NEAR
    PUSH BP
    MOV BP, SP
    PUSH BX               ; Preserve BX

    MOV BX, [BP+4]        ; BX = n
    CMP BX, 1             ; Base Case: n <= 1
    JBE BASE_CASE

    ; Recursive step: Compute Factorial(n - 1)
    DEC BX
    PUSH BX               ; Push (n - 1)
    CALL FACTORIAL        ; Recursive Call -> returns (n-1)! in AX
    ADD SP, 2             ; Clean parameter

    ; Multiply AX by n: AX = n * (n - 1)!
    MOV BX, [BP+4]
    MUL BX                ; AX = AX * BX
    JMP FACT_EXIT

BASE_CASE:
    MOV AX, 1             ; 1! = 1

FACT_EXIT:
    POP BX
    POP BP
    RET
FACTORIAL ENDP

END MAIN
```

#### 3. Stack Trace for Computing Factorial of $n = 3$:

Assume initial $SP = 00F0\text{H}$:

```text
1. Call FACTORIAL(3):
   [00EEH]: Parameter n = 3
   [00ECH]: Return IP to MAIN
   [00EAH]: Saved BP_main
   [00E8H]: Saved BX

2. Recursive Call FACTORIAL(2):
   [00E6H]: Parameter n = 2
   [00E4H]: Return IP in FACTORIAL
   [00E2H]: Saved BP_fact1
   [00E0H]: Saved BX

3. Recursive Call FACTORIAL(1) (Base Case):
   [00DEH]: Parameter n = 1
   [00DCH]: Return IP in FACTORIAL
   [00DAH]: Saved BP_fact2
   [00D8H]: Saved BX  <--- Lowest SP reached

4. Unwinding:
   - FACTORIAL(1) returns AX = 1. Pops BX, BP, IP. Stack shrinks to [00E6H].
   - FACTORIAL(2) multiplies AX = 1 * 2 = 2. Pops BX, BP, IP. Stack shrinks to [00EEH].
   - FACTORIAL(3) multiplies AX = 2 * 3 = 6. Pops BX, BP, IP. Returns to MAIN with AX = 6.
```

---

### Q-3(a) OR [10 Marks] — NMI ISR: Vector Addition of 100 Bytes Across Far Segments

> **Question (OR):**  
> Write 8086 microprocessor interrupt service routine for a NMI interrupt to add byte type data stored in an array of size 100, starting at address 2000H:5000H in memory with the corresponding data in another array of size 100, stored in memory starting at the address 3000H:5000H. Store the result in another array of size 100 stored at address 4000H:5000H. Neglect the carry generated during addition.

#### 1. Concept: Multi-Segment ISR

- Source Array 1: Segment `2000H`, Offset `5000H`
- Source Array 2: Segment `3000H`, Offset `5000H`
- Destination Array: Segment `4000H`, Offset `5000H`
- Since NMI is an Interrupt Service Routine, it **must preserve all modified registers** and terminate with **`IRET`**.

#### 2. Assembly ISR Implementation

```assembly
;====================================================================
; ISR: Non-Maskable Interrupt (NMI, Type 2) Service Routine
; Vector Addition of 100 bytes across three independent segments
;====================================================================
NMI_ISR PROC FAR
    ; Save all modified processor registers
    PUSH AX
    PUSH BX
    PUSH CX
    PUSH SI
    PUSH DI
    PUSH DS
    PUSH ES

    MOV CX, 100           ; Loop counter = 100 bytes
    XOR SI, SI            ; Index displacement = 0

ADD_LOOP:
    ; Read byte from Source Array 1 (2000H:5000H + SI)
    MOV AX, 2000H
    MOV DS, AX
    MOV AL, DS:[5000H + SI]

    ; Add corresponding byte from Source Array 2 (3000H:5000H + SI)
    MOV BX, 3000H
    MOV DS, BX
    ADD AL, DS:[5000H + SI] ; Neglect carry as specified

    ; Store sum byte to Destination Array (4000H:5000H + SI)
    MOV BX, 4000H
    MOV ES, BX
    MOV ES:[5000H + SI], AL

    INC SI                ; Point to next element
    LOOP ADD_LOOP         ; Repeat for all 100 bytes

    ; Restore all saved registers
    POP ES
    POP DS
    POP DI
    POP SI
    POP CX
    POP BX
    POP AX

    IRET                  ; Interrupt Return (pops IP, CS, and FLAGS)
NMI_ISR ENDP
```

---

### Q-3(b) [10 Marks] — Symbol Table Search (100 Entries, 80 Bytes Each)

> **Question:**  
> Assume a symbol table with name as TABLE consisting of 100 entries. Each entry has 80 bytes with the first 8 bytes representing the name field of an entity and the remaining 72 bytes represents information about the name entity. Write 8086 assembly program sequence to search this TABLE for a given name stored in a variable SEARCH_NAME and if SEARCH_NAME is found in TABLE then the program should copy 72 bytes of information in variable NAME_INFO. If SEARCH NAME is not found then NAME_INFO should contain `'$'` symbol.

#### 1. Concept: Structured Table Search

- Table structure: 100 records $\times$ 80 bytes $= 8000\text{ bytes}$.
- Each record:
    - Offset $+0$ to $+7$: 8-byte entity name (`CMPSB`).
    - Offset $+8$ to $+79$: 72-byte entity information (`MOVSB`).
- Search loop iterates at most 100 times, advancing table pointer by 80 bytes on mismatch.

#### 2. Assembly Program Implementation

```assembly
;====================================================================
; Program: Search 100-entry symbol table (80 bytes/entry)
;====================================================================
.MODEL SMALL
.STACK 128

.DATA
    SEARCH_NAME DB 'ALPHA001'      ; 8-byte name to find
    NAME_INFO   DB 72 DUP(?)      ; 72-byte buffer for retrieved info
    NOT_FOUND_CHAR EQU `'$'`

    ; Assume TABLE is declared with 100 entries of 80 bytes
    TABLE       DB 100 DUP( 8 DUP('?'), 72 DUP(0) )

.CODE
MAIN PROC
    MOV AX, @DATA
    MOV DS, AX
    MOV ES, AX            ; String operations require ES = DS

    LEA BX, TABLE         ; BX points to base of TABLE
    MOV DX, 100           ; 100 entries to check

SEARCH_ENTRIES:
    ; Compare 8-byte SEARCH_NAME with TABLE entry name
    LEA SI, SEARCH_NAME   ; DS:SI points to target name
    MOV DI, BX            ; ES:DI points to entry name in TABLE
    MOV CX, 8             ; 8 characters
    CLD                   ; Autoincrement
    REPE CMPSB            ; Compare string bytes while equal
    JE FOUND_MATCH        ; If all 8 bytes match, jump!

    ; Mismatch: advance BX to next 80-byte entry
    ADD BX, 80
    DEC DX
    JNZ SEARCH_ENTRIES

    ; NOT FOUND: Store `'$'` into NAME_INFO
    MOV NAME_INFO, NOT_FOUND_CHAR
    JMP DONE

FOUND_MATCH:
    ; Copy 72 bytes of information (starting at BX + 8) into NAME_INFO
    LEA SI, [BX + 8]      ; Source: Information field in TABLE
    LEA DI, NAME_INFO     ; Destination: NAME_INFO buffer
    MOV CX, 72            ; 72 bytes
    CLD
    REP MOVSB             ; Copy 72 bytes

DONE:
    MOV AX, 4C00H
    INT 21H
MAIN ENDP
END MAIN
```

---

# SECTION-II

## Question 4

### Q-4(a) [5 Marks] — Interrupt Processing Steps & Role of IF/TF Flags

> **Question:**  
> Explain the sequence of steps that are executed when 8086 responds to interrupts. Give the importance of IF and TF flag while handling interrupts from hardware and software sources.

#### 1. Interrupt Response Sequence:

1. **Fetch & Finish:** Completes the currently executing instruction.
2. **Push PSW:** Decrements `SP` by 2 and pushes the 16-bit **Processor Status Word (FLAGS)** onto the stack.
3. **Clear Control Flags:**
   - **$IF \leftarrow 0$:** Disables further maskable hardware interrupts (`INTR`).
   - **$TF \leftarrow 0$:** Disables single-step trap mode.
4. **Push Return Address:**
   - Pushes current **`CS`** onto stack ($SP \leftarrow SP - 2$).
   - Pushes **`IP`** of next sequential instruction ($SP \leftarrow SP - 2$).
5. **Fetch Vector from IVT:** Multiplies vector type $N$ by 4, loads `IP` from $N \times 4$, and loads `CS` from $N \times 4 + 2$.
6. **Execute ISR:** Jumps to the Interrupt Service Routine.

#### 2. Importance of IF and TF Flags:

- **IF (Interrupt Flag):**
    - Crucial for protecting the ISR entry sequence. When an interrupt occurs, the hardware automatically clears $IF = 0$ so that an incoming lower or equal priority hardware interrupt cannot interrupt the critical vector setup. If an ISR is re-entrant or nestable, the programmer explicitly enables interrupts via `STI` inside the ISR.
- **TF (Trap Flag):**
    - When single-stepping with a debugger ($TF = 1$), an interrupt occurring naturally pushes $TF$ to the stack and then clears $TF = 0$. This ensures that the debugger's *own* service routine executes at full speed without trapping each of its internal instructions! Upon `IRET`, the stacked $TF = 1$ is restored, continuing user single-step execution.

---

### Q-4(b) [5 Marks] — Stack Pointer & Memory Trace for Subroutine with RET 4

> **Question:**  
> Illustrate with a neat diagram the effect of the following instructions on the stack pointer and on the contents of the stack and other used registers if the values of the registers are given as:  
> $SS = 2000H, SP = 6000H, SI = 1111H, CX = 2222H, DX = 3333H, AX = 4444H$.  
> ```assembly
> PUSH SI
> PUSH CX
> PUSH DX
> CALL SAMPLE
> POP SI
> JMP NEXT
> SAMPLE PROC NEAR
> PUSHF
> PUSH DX
> ADD AX, DX
> POP DX
> POPF
> RET 4
> SAMPLE ENDP
> NEXT: END
> ```

#### 1. Step-by-Step Execution Trace:

| Step / Instruction | Action | $SP$ Value | Stack Memory at $SS:SP$ | Affected Registers |
|:---|:---|:---:|:---:|:---|
| **Initial State** | Base of stack | **`6000H`** | — | $AX=4444\text{H}, DX=3333\text{H}$ |
| `PUSH SI` | Pushes $1111\text{H}$ | **`5FFEH`** | `[25FFEH] = 1111H` | — |
| `PUSH CX` | Pushes $2222\text{H}$ | **`5FFCH`** | `[25FFCH] = 2222H` | — |
| `PUSH DX` | Pushes $3333\text{H}$ | **`5FFAH`** | `[25FFAH] = 3333H` | — |
| `CALL SAMPLE` | Pushes Return IP (`IP_pop`) | **`5FF8H`** | `[25FF8H] = IP_pop` | — |
| `PUSHF` (in proc) | Pushes PSW | **`5FF6H`** | `[25FF6H] = PSW` | — |
| `PUSH DX` | Pushes $3333\text{H}$ | **`5FF4H`** | `[25FF4H] = 3333H` | — |
| `ADD AX, DX` | $AX \leftarrow 4444\text{H} + 3333\text{H}$ | `5FF4H` | Unchanged | **$AX = \mathbf{7777}\text{H}$** |
| `POP DX` | Restores $3333\text{H}$ | **`5FF6H`** | Unchanged | $DX = 3333\text{H}$ |
| `POPF` | Restores PSW | **`5FF8H`** | Unchanged | Flags restored |
| **`RET 4`** | 1. Pops Return `IP`<br>2. Adds 4 to $SP$ | **`5FFEH`** | Pops `IP_pop` ($SP \to 5\text{FFAH}$), then $SP \leftarrow 5\text{FFAH} + 4 = \mathbf{5FFEH}$ | Discards pushed `DX` ($3333\text{H}$) and `CX` ($2222\text{H}$)! |
| `POP SI` | Pops value into `SI` | **`6000H`** | Value popped is `[5FFEH]` $= 1111\text{H}$ | **$SI = 1111\text{H}$** |

#### 2. Final Register State:

- **`SP` = `6000H`** (Cleanly restored to initial position!)
- **`AX` = `7777H`**
- **`DX` = `3333H`**, **`CX` = `2222H`**, **`SI` = `1111H`**

---

### Q-4(c) [5 Marks] — Differentiations: RET vs IRET, ENDS vs ENDP, GLOBAL vs PUBLIC, DQ vs DT

> **Question:**  
> Identify the difference between the following:  
>
> 1. `RET` and `IRET`  
> 2. `ENDS` and `ENDP`  
> 3. `GLOBAL` and `PUBLIC`  
> 4. `DQ` and `DT`

#### 1. `RET` vs `IRET`:

- **`RET` (Return from Procedure):** Used at the end of standard procedures (`CALL`). Pops only the return instruction pointer (`IP` for near, `IP` and `CS` for far) from the stack. Does not alter the flag register.
- **`IRET` (Interrupt Return):** Used exclusively at the end of Interrupt Service Routines (ISRs). Pops 3 words: return `IP`, return `CS`, and the saved `FLAGS` (PSW) register, restoring processor status.

#### 2. `ENDS` vs `ENDP`:

- **`ENDS` (End Segment):** Closes a logical memory segment block (`SEGMENT ... ENDS`).
- **`ENDP` (End Procedure):** Closes a callable subroutine or procedure definition (`PROC ... ENDP`).

#### 3. `GLOBAL` vs `PUBLIC`:

- **`PUBLIC`:** Directive used within a module to declare labels, variables, or procedures so that other external modules can link and reference them.
- **`GLOBAL` / `EXTRN`:** Directive declaring that a symbol used in the current module is defined in an external module (`EXTRN`) or acts as both public and extern (`GLOBAL` in some assemblers).

#### 4. `DQ` vs `DT`:

- **`DQ` (Define Quadword):** Allocates **8 bytes (64 bits)** of memory storage for 64-bit integers or IEEE 754 double-precision floating-point values.
- **`DT` (Define Tenbytes):** Allocates **10 bytes (80 bits)** of memory storage for 80-bit extended-precision floating-point numbers or 18-digit packed BCD numbers.

---

## Question 5

### Q-5(a) [5 Marks] — 32-bit x 32-bit Doubleword Unsigned Multiplication into ES

> **Question:**  
> Write an 8086 assembly language code to multiply two double word unsigned number. Store the result in consecutive memory locations of extra segment.

#### 1. Concept: Partial Products for 32-bit Multiplication
Let $A = (A_H \times 2^{16} + A_L)$ and $B = (B_H \times 2^{16} + B_L)$.  
The 64-bit product is:

$$A \times B = (A_L \times B_L) + ((A_L \times B_H + A_H \times B_L) \times 2^{16}) + (A_H \times B_H \times 2^{32})$$

Requires four 16-bit multiplications combined with carry accumulation across four 16-bit words ($W_0, W_1, W_2, W_3$).

#### 2. Assembly Program Implementation

```assembly
;====================================================================
; Program: 32-bit by 32-bit Unsigned Multiplication -> 64-bit Result
; Result stored into ES:PRODUCT (8 consecutive bytes)
;====================================================================
.MODEL SMALL

.DATA
    NUM1_LOW  DW 1234H
    NUM1_HIGH DW 0ABCDH
    NUM2_LOW  DW 5678H
    NUM2_HIGH DW 0002H

.DATA?
    EXTRA_SEG SEGMENT
        PRODUCT DW 4 DUP(?) ; 64-bit product (4 words: W0, W1, W2, W3)
    EXTRA_SEG ENDS

.CODE
START:
    MOV AX, @DATA
    MOV DS, AX
    MOV AX, EXTRA_SEG
    MOV ES, AX

    ; Initialize 64-bit product buffer to 0
    XOR AX, AX
    MOV ES:[PRODUCT+0], AX
    MOV ES:[PRODUCT+2], AX
    MOV ES:[PRODUCT+4], AX
    MOV ES:[PRODUCT+6], AX

    ; 1. A_LOW * B_LOW -> DX:AX
    MOV AX, NUM1_LOW
    MUL NUM2_LOW
    MOV ES:[PRODUCT+0], AX ; W0
    MOV ES:[PRODUCT+2], DX ; W1 temp

    ; 2. A_LOW * B_HIGH -> DX:AX
    MOV AX, NUM1_LOW
    MUL NUM2_HIGH
    ADD ES:[PRODUCT+2], AX ; Add to W1
    ADC ES:[PRODUCT+4], DX ; Carry into W2
    ADC WORD PTR ES:[PRODUCT+6], 0 ; Carry into W3

    ; 3. A_HIGH * B_LOW -> DX:AX
    MOV AX, NUM1_HIGH
    MUL NUM2_LOW
    ADD ES:[PRODUCT+2], AX ; Add to W1
    ADC ES:[PRODUCT+4], DX ; Carry into W2
    ADC WORD PTR ES:[PRODUCT+6], 0 ; Carry into W3

    ; 4. A_HIGH * B_HIGH -> DX:AX
    MOV AX, NUM1_HIGH
    MUL NUM2_HIGH
    ADD ES:[PRODUCT+4], AX ; Add to W2
    ADC ES:[PRODUCT+6], DX ; Add to W3

    MOV AX, 4C00H
    INT 21H
END START
```

---

### Q-5(a) OR [5 Marks] — String Concatenation Macro (STR1 + STR2 -> STR3)

> **Question (OR):**  
> Write 8086 program that contains macro definition which accepts two string variables `STR1` and `STR2` and concatenates them into a third string variable `STR3`.

#### Macro Implementation

```assembly
;====================================================================
; Macro: CONCAT_STRINGS STR1, STR2, STR3
; Concatenates `'$'`-terminated strings STR1 and STR2 into STR3
;====================================================================
CONCAT_STRINGS MACRO STR1, STR2, STR3
    LOCAL COPY1, COPY2, DONE_CONCAT
    PUSH SI
    PUSH DI
    PUSH AX

    LEA SI, STR1
    LEA DI, STR3

COPY1:
    MOV AL, [SI]
    CMP AL, `'$'`
    JE START_STR2
    MOV [DI], AL
    INC SI
    INC DI
    JMP COPY1

START_STR2:
    LEA SI, STR2

COPY2:
    MOV AL, [SI]
    MOV [DI], AL
    CMP AL, `'$'`
    JE DONE_CONCAT
    INC SI
    INC DI
    JMP COPY2

DONE_CONCAT:
    POP AX
    POP DI
    POP SI
ENDM

; Usage:
.MODEL SMALL
.DATA
    S1 DB 'Hello, $'
    S2 DB 'World!$', 0
    S3 DB 30 DUP(?)

.CODE
MAIN PROC
    MOV AX, @DATA
    MOV DS, AX
    CONCAT_STRINGS S1, S2, S3
    MOV AX, 4C00H
    INT 21H
MAIN ENDP
END MAIN
```

---

### Q-5(b) [5 Marks] — Error Identification in Given Assembly Instructions

> **Question:**  
> Identify the errors for each of the given instructions referring the following data segment:  
> ```assembly
> DATA SEGMENT WORD PUBLIC
> A DW 45H
> B DW 60H
> DATA ENDS
> ```  
>
> 1. `AAA DX`  
> 2. `SUB AL, A`  
> 3. `JNZ A`  
> 4. `ADD A, B`  
> 5. `MOV [DX], AL`

#### Solutions:

1. **`AAA DX`:** **Invalid operand.** `AAA` takes no operands (implicitly acts on `AL`/`AH`).
2. **`SUB AL, A`:** **Operand size mismatch.** `AL` is an 8-bit byte; `A` is a 16-bit `WORD`.
3. **`JNZ A`:** **Invalid target operand for conditional branch.** `JNZ` requires a code label within relative range ($-128$ to $+127$ bytes); `A` is a data segment variable.
4. **`ADD A, B`:** **Memory-to-memory operation is illegal in 8086.** One operand must be a register.
5. **`MOV [DX], AL`:** **Invalid indirect addressing register.** `DX` cannot be used as an indirect memory base or index register (only `BX`, `BP`, `SI`, `DI`).

---

### Q-5(c) [5 Marks] — Convert 10 Packed BCD Numbers to Unpacked BCD

> **Question:**  
> Write an assembly language code to convert ten, 8-bit packed BCD number to unpacked BCD number.

```assembly
;====================================================================
; Program: Unpack 10 Packed BCD numbers into 20 Unpacked BCD bytes
;====================================================================
.MODEL SMALL
.STACK 64

.DATA
    PACKED   DB 12H, 34H, 56H, 78H, 90H, 21H, 43H, 65H, 87H, 09H ; 10 bytes
    UNPACKED DB 20 DUP(?)                                         ; 20 bytes

.CODE
MAIN PROC
    MOV AX, @DATA
    MOV DS, AX

    LEA SI, PACKED
    LEA DI, UNPACKED
    MOV DX, 10            ; Counter for 10 packed bytes

UNPACK_LOOP:
    MOV AL, [SI]          ; Read packed BCD (e.g., 56H)
    MOV BL, AL

    ; Extract Tens digit
    SHR AL, 1
    SHR AL, 1
    SHR AL, 1
    SHR AL, 1
    MOV [DI], AL
    INC DI

    ; Extract Units digit
    MOV AL, BL
    AND AL, 0FH
    MOV [DI], AL
    INC DI

    INC SI
    DEC DX
    JNZ UNPACK_LOOP

    MOV AX, 4C00H
    INT 21H
MAIN ENDP
END MAIN
```

---

## Question 6

### Q-6(a) [5 Marks] — Real Mode vs Protected Mode Memory Addressing

> **Question:**  
> Discuss in detail differences between real mode and protected mode memory addressing in 80286 through Core2 microprocessors and other advance 80x86 architectures.

| Feature | Real Mode Addressing | Protected Mode Addressing |
|:---|:---|:---|
| **Segment Register Role** | Holds literal 16-bit segment base address. | Holds a 16-bit **Selector** indexing a descriptor table. |
| **Address Translation** | $\text{Base} \times 16 + \text{Offset}$ | Base address read from **Segment Descriptor** in GDT/LDT. |
| **Memory Limit** | Fixed strictly at **1 MB** ($00000\text{H}$–$\text{FFFFFH}$). | **16 MB** on 80286; **4 GB** on 80386+; up to **64 GB** with PAE. |
| **Privilege Rings** | No protection (all code runs with Ring 0 access). | 4 privilege rings (Ring 0 = Kernel, Ring 3 = Applications). |
| **Segmentation Checks** | No bounds checking; buffer overflow permitted. | Hardware checks: Segment Limit, Access Rights, Read/Write status. |
| **Paging Support** | Not available. | Supported (80386+ translates linear addresses to physical pages). |

---

### Q-6(b) [5 Marks] — 8259 PIC Block Diagram & Functional Components

> **Question:**  
> Draw and state the function of each component of 8259 Programmable Interrupt Controller.

```text
                  +-------------------------------------------------+
                  |      8259 PROGRAMMABLE INTERRUPT CONTROLLER     |
                  +-------------------------------------------------+

  D7 - D0 <=======> [ Data Bus Buffer ] <========> Internal Bus
                            ^
  RD#    ---------\         |
  WR#    ----------+-> [ Read/Write ]
  A0     ---------/    [ Logic      ]
  CS#    ---------/
                            |
  CAS0-CAS2 <=====> [ Cascade Buffer / ]
  SP#/EN#   <=====> [ Comparator       ]
                            |
  INT    <--------- [ Control Logic    ] <-------- [ Interrupt Status Logic ]
  INTA#  --------->                                    ^         ^         ^
                                                       |         |         |
                    [ Priority Resolver ] -------------+         |         |
                                                                 |         |
                    [ In-Service Register (ISR) ] ---------------+         |
                                                                           |
                    [ Interrupt Mask Register (IMR) ] ---------------------+
                                                                           |
  IR0 - IR7 -------> [ Interrupt Request Register (IRR) ] -----------------+
```

- **IRR:** Holds pending requests on lines `IR0`–`IR7`.
- **IMR:** Stores programmable mask bits to selectively disable interrupt lines.
- **ISR:** Stores the interrupt level currently being serviced by the CPU.
- **Priority Resolver (PR):** Determines whether an incoming request has higher priority than the routine in service.
- **Control Logic & Cascade Buffer:** Decodes dual $\overline{\text{INTA}}$ pulses and controls multi-chip cascading up to 64 inputs.

---

### Q-6(c) [5 Marks] — 8255A PPI Block Diagram & Operating Modes

> **Question:**  
> Give the block diagram of 8255A programmable peripheral interface and different modes of operation.

#### 1. 8255A Operating Modes:

1. **Mode 0 (Basic I/O):** Unlatched input or latched output for Port A, Port B, and Port C (two 4-bit ports: $C_U, C_L$). No handshaking.
2. **Mode 1 (Strobed I/O):** Handshaking I/O for Port A and/or Port B. Port C lines provide control/strobe signals (`STB#`, `IBF`, `INTR`, `ACK#`, `OBF#`).
3. **Mode 2 (Strobed Bidirectional Bus I/O):** Port A acts as an 8-bit bidirectional bus using 5 lines of Port C for handshake controls.
4. **BSR Mode (Bit Set/Reset):** Individual bits of Port C can be set or reset via dedicated control words without affecting other bits.

---

### Q-6(c) OR [5 Marks] — 8254 PIT Control Word Format & Square Wave Program

> **Question (OR):**  
> Explain control word format of 8253/8254 Programmable Interval Timer and write an assembly program module to generate a square wave.

#### 1. Control Word Register (CWR) Format:

- Bits 7–6: **SC1, SC0** (00 = Counter 0, 01 = Counter 1, 10 = Counter 2).
- Bits 5–4: **RW1, RW0** (11 = Read/Write LSB first, then MSB).
- Bits 3–1: **M2, M1, M0** (011 = **Mode 3: Square Wave Generator**).
- Bit 0: **BCD** (0 = 16-bit Binary, 1 = BCD).

#### 2. Assembly Program Module to Generate Square Wave on Counter 0:
Let Counter 0 divide clock by $2000_{10} = 07\text{D}0\text{H}$:

- CWR byte: `00 11 011 0` $= \mathbf{36}\text{H}$.
- Counter 0 Port $= 40\text{H}$, CWR Port $= 43\text{H}$.

```assembly
MOV AL, 36H           ; Counter 0, LSB then MSB, Mode 3, Binary
OUT 43H, AL           ; Write to Control Word Register

MOV AX, 2000          ; Division factor = 2000
OUT 40H, AL           ; Send Low byte (D0H)
MOV AL, AH
OUT 40H, AL           ; Send High byte (07H)
; Counter 0 OUT pin now emits a symmetric square wave!
```

---

### Q-6(d) [5 Marks] — 8237 DMA Controller Modes & Bidirectional Bus Signals

> **Question:**  
> Discuss in detail different modes of operation of 8237 DMA controller and why read and write control signals are bidirectional.

#### 1. Operating Modes of the 8237 DMA Controller:

1. **Single Transfer Mode:** DMA transfers exactly one byte per request, then yields the bus back to the CPU.
2. **Block Transfer Mode:** Activated by DREQ; transfers the entire continuous block of data until terminal count ($TC$) is reached before releasing the bus.
3. **Demand Transfer Mode:** Continues transferring data bytes as long as the requesting I/O device keeps `DREQ` active; suspends transfer if DREQ drops inactive.
4. **Cascade Mode:** Multiple 8237 chips are cascaded without CPU bus contention.

#### 2. Why Control Signals ($\overline{\text{MEMR}}, \overline{\text{MEMW}}, \overline{\text{IOR}}, \overline{\text{IOW}}$) Are Bidirectional:

- **Slave Mode (Idle / Programming State):** The CPU controls the bus. The 8237 acts as a peripheral slave. $\overline{\text{IOR}}$ and $\overline{\text{IOW}}$ are **inputs** so the CPU can read from and write to the internal 8237 registers.
- **Master Mode (Active DMA Transfer State):** The 8237 takes complete control of the system bus via `HRQ`/`HLDA`. The 8237 drives $\overline{\text{MEMR}}$, $\overline{\text{MEMW}}$, $\overline{\text{IOR}}$, and $\overline{\text{IOW}}$ as **outputs** to directly strobe memory and peripheral devices simultaneously for single-cycle flyby data transfer!
