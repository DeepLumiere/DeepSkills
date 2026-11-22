# CE701: Interfacing with Microprocessors — Exam Paper Solutions (December 2019)

**Course:** CE701 — Interfacing with Microprocessors  
**Institution:** Nirma University, Institute of Technology  
**Program:** B.Tech. in Computer Engineering, Semester-VII  
**Exam:** Semester End Examination (IR), December 2019  
**Time Allowed:** 3 Hours  
**Maximum Marks:** 100 Marks  

---

## Table of Contents
- [Section I (50 Marks)](#section-i-50-marks)
  - [Question 1](#question-1)
    - [Q-1(a) [5 Marks] — Significance of Each Flag Bit in 8086 PSW](#q-1a-5-marks--significance-of-each-flag-bit-in-8086-psw)
    - [Q-1(b) [5 Marks] — Logical Register Groups in 8086 Architecture](#q-1b-5-marks--logical-register-groups-in-8086-architecture)
    - [Q-1(c) [5 Marks] — Address/Data Lines, 1 MB Memory Calculation & Segmentation](#q-1c-5-marks--addressdata-lines-1-mb-memory-calculation--segmentation)
  - [Question 2](#question-2)
    - [Q-2(a) [5 Marks] — Identification of Data Movement Instructions & Addressing Modes](#q-2a-5-marks--identification-of-data-movement-instructions--addressing-modes)
    - [Q-2(b) [5 Marks] — Memory Bank Organization & Byte/Word Control Signals](#q-2b-5-marks--memory-bank-organization--byteword-control-signals)
    - [Q-2(b) OR [5 Marks] — Selectors and Descriptors in Protected Mode Addressing](#q-2b-or-5-marks--selectors-and-descriptors-in-protected-mode-addressing)
    - [Q-2(c) [5 Marks] — Minimum Mode 16-bit Word Read Timing Diagram](#q-2c-5-marks--minimum-mode-16-bit-word-read-timing-diagram)
  - [Question 3](#question-3)
    - [Q-3(a) [10 Marks] — Segment Override Prefix Encoding & Machine Code Generation](#q-3a-10-marks--segment-override-prefix-encoding--machine-code-generation)
    - [Q-3(a) OR [10 Marks] — Physical Address Calculations & Addressing Modes](#q-3a-or-10-marks--physical-address-calculations--addressing-modes)
    - [Q-3(b) [10 Marks] — Assembly Program: ASCII Decimal String to Binary via Near Procedure](#q-3b-10-marks--assembly-program-ascii-decimal-string-to-binary-via-near-procedure)
- [Section II (50 Marks)](#section-ii-50-marks)
  - [Question 4](#question-4)
    - [Q-4(a) [5 Marks] — Macro for 16-bit Word Multiplication](#q-4a-5-marks--macro-for-16-bit-word-multiplication)
    - [Q-4(b) [5 Marks] — 100-Word Stack Configuration & Setting Carry Flag via Stack](#q-4b-5-marks--100-word-stack-configuration--setting-carry-flag-via-stack)
    - [Q-4(c) [5 Marks] — Error Detection and Syntax Analysis in Assembly Instructions](#q-4c-5-marks--error-detection-and-syntax-analysis-in-assembly-instructions)
  - [Question 5](#question-5)
    - [Q-5(a) [5 Marks] — Bit Manipulation on AX (Set, Clear, Invert Selected Bits)](#q-5a-5-marks--bit-manipulation-on-ax-set-clear-invert-selected-bits)
    - [Q-5(b) [5 Marks] — Trace of Shift and Rotate Instructions (SHL, SAL, ROL, RCL)](#q-5b-5-marks--trace-of-shift-and-rotate-instructions-shl-sal-rol-rcl)
    - [Q-5(b) OR [5 Marks] — String Transfer without MOV, MOVSB, MOVSW, or LOOP](#q-5b-or-5-marks--string-transfer-without-mov-movsb-movsw-or-loop)
    - [Q-5(c) [5 Marks] — Find Maximum of Array using a Near Procedure](#q-5c-5-marks--find-maximum-of-array-using-a-near-procedure)
  - [Question 6](#question-6)
    - [Q-6(a) [5 Marks] — Interrupt Vector Table (IVT) Architecture & Role](#q-6a-5-marks--interrupt-vector-table-ivt-architecture--role)
    - [Q-6(b) [5 Marks] — Exact Stack Trace & Register State for INT 8 Instruction](#q-6b-5-marks--exact-stack-trace--register-state-for-int-8-instruction)
    - [Q-6(b) OR [5 Marks] — Master-Slave Cascading of 8259 PIC (CAS0-CAS2, SP#/EN#)](#q-6b-or-5-marks--master-slave-cascading-of-8259-pic-cas0-cas2-spen)
    - [Q-6(c) [5 Marks] — Interrupt-Driven Keyboard Character Display Program](#q-6c-5-marks--interrupt-driven-keyboard-character-display-program)
    - [Q-6(d) [5 Marks] — Control Logic and Counter Operations of 8253/8254 PIT](#q-6d-5-marks--control-logic-and-counter-operations-of-82538254-pit)

---

# SECTION-I (50 Marks)

## Question 1

### Q-1(a) [5 Marks] — Significance of Each Flag Bit in 8086 PSW

> **Question:**  
> Write the significance of each flag bit of PSW (Processor Status Word) of 8086 microprocessor.

#### 1. PSW Architecture & Layout
The 8086 Processor Status Word (PSW) is a 16-bit register containing **9 active flags**: 6 conditional status flags reflecting ALU results and 3 control flags governing CPU operation.

```text
Bit:   15  14  13  12  11  10   9   8   7   6   5   4   3   2   1   0
     +---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+
PSW: | - | - | - | - | OF| DF| IF| TF| SF| ZF| - | AF| - | PF| - | CF|
     +---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+
```

#### 2. Detailed Significance of All 9 Flags

##### A. Status / Conditional Flags (ALU Driven):
1. **CF (Carry Flag, Bit 0):** Set to 1 if an unsigned arithmetic operation generates a carry out of the MSB (addition) or a borrow into the MSB (subtraction). Also receives shifted/rotated bits during bit manipulation.
2. **PF (Parity Flag, Bit 2):** Set to 1 if the lower 8 bits of an ALU result contain an **even number of 1s** (even parity); cleared to 0 for odd parity. Used in communication error checking.
3. **AF (Auxiliary Carry Flag, Bit 4):** Set to 1 if there is an arithmetic carry out of bit 3 into bit 4 or borrow from bit 4 into bit 3 (between lower and upper nybbles). Used by BCD instructions (`DAA`, `DAS`).
4. **ZF (Zero Flag, Bit 6):** Set to 1 if the ALU result is strictly zero (`00H` or `0000H`); cleared to 0 if non-zero. Fundamental for conditional branching (`JZ`, `JNZ`).
5. **SF (Sign Flag, Bit 7):** Matches the MSB of the result ($D_7$ for byte, $D_{15}$ for word). In signed two's complement, $1 = \text{negative}$ and $0 = \text{positive}$.
6. **OF (Overflow Flag, Bit 11):** Set to 1 if the signed result exceeds the capacity of the destination register (signed overflow: $-128$ to $+127$ for byte, $-32768$ to $+32767$ for word). Formally: $OF = C_{in\_msb} \oplus C_{out\_msb}$.

##### B. Control Flags (Instruction Controlled):
1. **TF (Trap Flag, Bit 8):** Puts the processor into single-step execution mode when set to 1. An internal Type-1 interrupt is generated automatically after each instruction, allowing interactive debugging.
2. **IF (Interrupt Flag, Bit 9):** Enables external maskable hardware interrupts (`INTR`) when set to 1 (`STI`). Disables them when cleared to 0 (`CLI`).
3. **DF (Direction Flag, Bit 10):** Governs string instruction autoincrement/autodecrement (`MOVS`, `LODS`, `STOS`, `CMPS`, `SCAS`). $DF = 0$ (`CLD`) autoincrements index registers (`SI`, `DI`); $DF = 1$ (`STD`) autodecrements them.

---

### Q-1(b) [5 Marks] — Logical Register Groups in 8086 Architecture

> **Question:**  
> The registers in 8086 are logically grouped into different groups depending upon the kind of data stored. Specify the logical groups and write the significance of each group with corresponding registers of that group.

#### 1. Register Classification Overview
The 8086 internal registers (14 registers of 16 bits each) are grouped into four logical functional categories:

```text
                               +----------------------------+
                               |     8086 REGISTER SET      |
                               +----------------------------+
                                             |
     +--------------------+------------------+------------------+--------------------+
     |                    |                                     |                    |
     v                    v                                     v                    v
[ Data Registers ]  [ Pointer & Index Registers ]    [ Segment Registers ]  [ Status & Control ]
  AX (AH/AL)          SP (Stack Pointer)               CS (Code Segment)      FLAGS (PSW)
  BX (BH/BL)          BP (Base Pointer)                DS (Data Segment)      IP (Instruction Ptr)
  CX (CH/CL)          SI (Source Index)                SS (Stack Segment)
  DX (DH/DL)          DI (Destination Index)           ES (Extra Segment)
```

#### 2. Detailed Functionality by Group:

1. **General Purpose / Data Registers (`AX`, `BX`, `CX`, `DX`):**
   - Can be accessed as 16-bit words or individual 8-bit bytes (`AH`, `AL`, `BH`, `BL`, etc.).
   - **`AX` (Accumulator):** Optimized for I/O operations, arithmetic calculations, ASCII adjustments, and fast multiplication/division.
   - **`BX` (Base Register):** The only general data register that can serve as a base pointer for memory indirect addressing (`[BX]`). Also holds translate table base (`XLAT`).
   - **`CX` (Count Register):** Serves as an automatic loop counter for `LOOP` instructions, repeat counter for string operations (`REP`), and shift/rotate count (`CL`).
   - **`DX` (Data Register):** Holds upper 16 bits of 32-bit products/dividends (`DX:AX`) and holds variable 16-bit I/O port addresses (`IN AL, DX`).

2. **Pointer and Index Registers (`SP`, `BP`, `SI`, `DI`):**
   - Provide 16-bit offset displacements within memory segments:
   - **`SP` (Stack Pointer):** Points to the current top of the stack within the Stack Segment (`SS`). Automatically adjusted by `PUSH`, `POP`, `CALL`, `RET`.
   - **`BP` (Base Pointer):** Accesses data on the stack (stack frame parameters/local variables). Default segment is `SS`.
   - **`SI` (Source Index):** Offsets source memory in data movement; default source pointer for string instructions (`DS:SI`).
   - **`DI` (Destination Index):** Offsets destination memory; string instructions hardwire destination to Extra Segment (`ES:DI`).

3. **Segment Registers (`CS`, `DS`, `SS`, `ES`):**
   - Hold the 16-bit upper base addresses of 64 KB logical memory segments.
   - **`CS` (Code Segment):** Base of program instruction code.
   - **`DS` (Data Segment):** Base of global variables and static program data.
   - **`SS` (Stack Segment):** Base of subroutine stack, return addresses, and local parameters.
   - **`ES` (Extra Segment):** Supplemental segment primarily used for string operations and dynamic data buffers.

4. **Status and Instruction Control Registers (`IP`, `FLAGS`):**
   - **`IP` (Instruction Pointer):** Holds the 16-bit offset of the next instruction byte to be fetched from `CS`.
   - **`FLAGS` (PSW):** Holds the 9 conditional and control status flags.

---

### Q-1(c) [5 Marks] — Address/Data Lines, 1 MB Memory Calculation & Segmentation

> **Question:**  
> Identify the address and data lines present in 8086 architecture and calculate the memory addressable using these address lines. Draw the logical segmentation of the memory and specify the size of each segment.

#### 1. Address and Data Bus Specifications
- **Address Bus:** The 8086 features **20 physical address lines** ($A_0$ to $A_{19}$).
  - Multiplexed as $AD_0$–$AD_{15}$ (Address/Data) during $T_1$, and $A_{16}/S_3$–$A_{19}/S_6$ (Address/Status).
- **Data Bus:** The 8086 features **16 data lines** ($D_0$ to $D_{15}$).
  - Multiplexed on $AD_0$–$AD_{15}$ during clock cycles $T_2, T_3, T_w, T_4$.

#### 2. Maximum Addressable Memory Space Calculation:
$$\text{Total Addressable Memory} = 2^{\text{Number of Address Lines}} = 2^{20} \text{ bytes}$$
$$2^{20} = 1,048,576 \text{ bytes} = \mathbf{1\text{ MB}}$$
The memory address range spans from physical address **`00000H`** to **`FFFFFH`**.

#### 3. Logical Memory Segmentation Architecture
Because internal registers are only 16 bits wide, a single register can directly offset up to:
$$2^{16} \text{ bytes} = 65,536 \text{ bytes} = \mathbf{64\text{ KB}}$$
The 1 MB physical address space is divided into logical segments of up to 64 KB each. Up to **four segments** can be actively referenced simultaneously:

```text
1 MB Physical Address Space (00000H to FFFFFH)
+------------------------------------+ FFFFFH
|                                    |
|   EXTRA SEGMENT (ES)               | Size: Up to 64 KB
|   Base = ES * 10H                  |
|                                    |
+------------------------------------+
|                                    |
|   STACK SEGMENT (SS)               | Size: Up to 64 KB
|   Base = SS * 10H                  |
|                                    |
+------------------------------------+
|                                    |
|   DATA SEGMENT (DS)                | Size: Up to 64 KB
|   Base = DS * 10H                  |
|                                    |
+------------------------------------+
|                                    |
|   CODE SEGMENT (CS)                | Size: Up to 64 KB
|   Base = CS * 10H                  |
|                                    |
+------------------------------------+ 00000H
```

- **Physical Address Formula:**
  $$\text{Physical Address} = (\text{Segment Register} \times 16_{10}) + \text{16-bit Offset}$$

---

## Question 2

### Q-2(a) [5 Marks] — Identification of Data Movement Instructions & Addressing Modes

> **Question:**  
> Identify data movement instructions and write the addressing modes for the identified instructions in the following code fragment:  
> ```assembly
> Code segment
> Start: Assume CS:Code, DS:data
> MOV AX, data
> MOV DS, AX
> MOV CX, [BX]
> MOV [BX+777H], AX
> MOV [DI-1], BL
> MOV AX, [SI+BP]
> MOV [DI+BP+1111H], BX
> Code ends
> ```

#### Solution & Step-by-Step Analysis
All 7 instructions are `MOV` instructions, belonging to the **Data Movement Instruction Group**.

| # | Instruction | Source Operand Mode | Destination Operand Mode | Effective Addressing Mode of Instruction | Default Segment |
|:---:|:---|:---|:---|:---|:---:|
| 1 | `MOV AX, data` | Immediate (or Direct Memory if `data` is a variable) | Register (`AX`) | **Immediate Addressing Mode** (constant segment address into register) | `CS` |
| 2 | `MOV DS, AX` | Register (`AX`) | Segment Register (`DS`) | **Register Addressing Mode** | Internal |
| 3 | `MOV CX, [BX]` | Based Indirect (`[BX]`) | Register (`CX`) | **Based Indirect Addressing Mode** | `DS` |
| 4 | `MOV [BX+777H], AX` | Register (`AX`) | Based with Displacement | **Based Relative Addressing Mode** (Displacement $= 777\text{H}$) | `DS` |
| 5 | `MOV [DI-1], BL` | Register (`BL`) | Indexed with Displacement | **Indexed Relative Addressing Mode** (Displacement $= -1 = \text{0FFFFH}$ / signed byte $\text{FFH}$) | `DS` |
| 6 | `MOV AX, [SI+BP]` | Based Indexed (`[BP+SI]`) | Register (`AX`) | **Based Indexed Addressing Mode** | `SS` |
| 7 | `MOV [DI+BP+1111H], BX` | Register (`BX`) | Based Indexed with Displacement | **Based Indexed Relative Addressing Mode** (Displacement $= 1111\text{H}$) | `SS` |

---

### Q-2(b) [5 Marks] — Memory Bank Organization & Byte/Word Control Signals

> **Question:**  
> With a neat illustration show the memory bank organization of 8086 microprocessor and specify the detail signals for byte and word operations.

#### 1. Hardware Architecture & Block Diagram
The 1 MB physical memory is partitioned into two 512 KB interleaved memory banks:
- **Even Bank (Bank 0):** Connected to lower data bus lines $D_7$–$D_0$. Activated by address line $A_0 = 0$.
- **Odd Bank (Bank 1):** Connected to upper data bus lines $D_{15}$–$D_8$. Activated by Bus High Enable $\overline{\text{BHE}} = 0$.

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
                 |                                     |
                 +------------------+------------------+
                                    |
                              [ Control Logic ]
                                RD#, WR#, M/IO#
```

#### 2. Control Signal Summary Table for All Operations

| Operation Performed | $\overline{\text{BHE}}$ | $A_0$ | Active Memory Bank | Active Data Bus Lines | Required Bus Cycles |
|:---|:---:|:---:|:---|:---:|:---:|
| **Read/Write Byte at Even Address** | **1** | **0** | Even Bank only | $D_7$–$D_0$ | 1 Cycle (4 Clocks) |
| **Read/Write Byte at Odd Address** | **0** | **1** | Odd Bank only | $D_{15}$–$D_8$ | 1 Cycle (4 Clocks) |
| **Read/Write 16-bit Word at Even Address (Aligned)** | **0** | **0** | Both Banks simultaneously | $D_{15}$–$D_0$ | 1 Cycle (4 Clocks) |
| **Read/Write 16-bit Word at Odd Address (Misaligned)** | Cycle 1: **0**<br>Cycle 2: **1** | **1**<br>**0** | Cycle 1: Odd Bank (Low byte)<br>Cycle 2: Even Bank (High byte) | $D_{15}$–$D_8$<br>$D_7$–$D_0$ | **2 Cycles** (8 Clocks) |

---

### Q-2(b) OR [5 Marks] — Selectors and Descriptors in Protected Mode Addressing

> **Question (OR):**  
> Discuss in detail the significance of selectors and descriptors in the protected mode memory addressing.

#### 1. Protected Mode Addressing Concept
Introduced in the 80286, **Protected Mode** replaces physical segment base addresses with an indexed table lookup mechanism that enforces privilege rings, task isolation, and virtual memory protection.

#### 2. Segment Selector Format (16 Bits in Segment Register)
Instead of containing a physical address, `CS`, `DS`, `SS`, `ES`, `FS`, `GS` store a 16-bit **Selector**:

```text
 15                                      3   2   1   0
+------------------------------------------+---+-------+
|            Descriptor Index              | TI|  RPL  |
|               (13 bits)                  | 1 | 2 bits|
+------------------------------------------+---+-------+
```
- **Index (Bits 15–3):** 13-bit index selecting 1 of $2^{13} = 8,192$ descriptors.
- **TI (Table Indicator, Bit 2):**  
  - $TI = 0 \implies$ Global Descriptor Table (GDT) shared by all tasks.
  - $TI = 1 \implies$ Local Descriptor Table (LDT) private to the active task.
- **RPL (Requested Privilege Level, Bits 1–0):** Rings 0 (OS Kernel) to 3 (User App).

#### 3. Segment Descriptor Format (8 Bytes / 64 Bits in Memory)
The selected descriptor defines the memory segment:

```text
Byte 7        Byte 6        Byte 5        Byte 4        Byte 3        Byte 2        Byte 1        Byte 0
+-------------+-------------+-------------+-------------+-------------+-------------+-------------+-------------+
| Base 31..24 | Gran/Limits | Access Byte | Base 23..16 |       Base 15..00         |       Limit 15..00          |
+-------------+-------------+-------------+-------------+-------------+-------------+-------------+-------------+
```
1. **Base Address (32 bits):** Starting linear address of the segment anywhere in the 4 GB address space.
2. **Segment Limit (20 bits):** Maximum allowable segment size (from 1 byte up to 4 GB with 4 KB granularity $G=1$). Any access exceeding the limit triggers an immediate **General Protection Fault (#GP)**.
3. **Access Rights Byte:**
   - **$P$ (Present):** 1 if segment is loaded in RAM; 0 if swapped to disk (Page/Segment fault).
   - **$DPL$ (Descriptor Privilege Level - 2 bits):** Defines minimum privilege level (0–3) needed to access the segment.
   - **$S$ (System):** 1 = Code/Data segment; 0 = System descriptor (TSS, Gate).
   - **Type (4 bits):** Code (Executable, Readable, Conforming) or Data (Read-only, Read/Write, Expand-Down).

---

### Q-2(c) [5 Marks] — Minimum Mode 16-bit Word Read Timing Diagram

> **Question:**  
> Draw the minimum mode 8086 timing diagram to read a 16 bit data from a memory location to a register. Show all necessary pins and their state during the operation.

#### 1. Conditions for 16-bit Word Read (Aligned, Even Address)
To read a 16-bit word in 1 bus cycle:
- Address line $A_0 = 0$ (Even bank enabled).
- Control pin $\overline{\text{BHE}} = 0$ (Odd bank enabled).
- $M/\overline{\text{IO}} = 1$ (Memory operation).
- $DT/\overline{R} = 0$ (Data receive mode).

#### 2. Timing Diagram Across Clock States $T_1$ to $T_4$

```text
Clock (CLK)      |--- T1 ---|--- T2 ---|--- T3 ---|--- T4 ---|
                 _    _     _    _     _    _     _    _     
                | |__| |___| |__| |___| |__| |___| |__| |____
                 
ALE             ____/------\_________________________________ (Latches address in T1)

A19-A16 / S6-S3 ---< Mem Addr >----< Status Signals S6-S3 >-- (Status in T2-T4)

AD15 - AD0      ---< Mem Addr >---(Float)-< Valid Data D15-D0 > (Data in T3-T4)

BHE# / S7       \__________Low____________/------- S7 ------- (BHE# = 0 for full word)

A0              ___________Low_______________________________ (A0 = 0 for full word)

M/IO#           =================== HIGH ==================== (Held HIGH for Memory)

RD#             ------------------\____________/------------- (Active LOW in T2, T3)

DT/R#           =================== LOW ===================== (Held LOW = Receive)

DEN#            ------------------\____________/------------- (Active LOW enables buffers)
```

---

## Question 3

### Q-3(a) [10 Marks] — Segment Override Prefix Encoding & Machine Code Generation

> **Question:**  
> Show how the segment override prefix is encoded in Intel 8086 instruction coding template. Write the coding template in hexadecimal format for the following instruction:  
> 1. `MOV ES:[BX], AX`  
> 2. `MOV CX, [7534h][SI]`

#### 1. Concept: Segment Override Prefix Encoding
By default, 8086 instructions use specific segment registers depending on the base/index registers used. A **Segment Override Prefix (SOP)** is a 1-byte prefix inserted directly before the instruction opcode to override the default segment.

```text
Segment Override Prefix Byte Format:
 Bit:  7   6   5   4   3   2   1   0
     +---+---+---+---+---+---+---+---+
     | 0 | 0 | 1 |  REG  | 1 | 1 | 0 |
     +---+---+---+---+---+---+---+---+
```

| Segment Overridden | REG Field (Bits 4–3) | Prefix Byte (Binary) | Prefix Byte (Hex) |
|:---:|:---:|:---:|:---:|
| **`ES`** | `00` | `0010 0110` | **`26H`** |
| **`CS`** | `01` | `0010 1110` | **`2EH`** |
| **`SS`** | `10` | `0011 0110` | **`36H`** |
| **`DS`** | `11` | `0011 1110` | **`3EH`** |

---

#### 2. Hex Encoding for Instruction 1: `MOV ES:[BX], AX`
- **Default Segment for `[BX]`:** Data Segment (`DS`).
- **Segment Override Prefix:** Instruction explicitly prefixes `ES:` $\implies$ **`26H`**.
- **Instruction Template:**
  $$\text{Byte 1: Opcode (6 bits) } + D (1) + W (1)$$
  - Opcode for `MOV` = `100010`
  - Direction $D = 0$: Source is register `AX` (in `REG` field); Destination is memory `[BX]` (in `MOD R/M`).
  - Word $W = 1$: 16-bit word transfer (`AX`).
  - Byte 1 $= 10001001_2 = \mathbf{89}\text{H}$.
- **Byte 2 (MOD-REG-R/M):**
  - $MOD = 00_2$ (Memory indirect without displacement).
  - $REG = 000_2$ (Register `AX`).
  - $R/M = 111_2$ (Addressing operand `[BX]`).
  - Byte 2 $= 00\ 000\ 111_2 = \mathbf{07}\text{H}$.
- **Complete Hex Encoding:**
  $$\mathbf{26\ 89\ 07}\text{ H}$$
  *(Note: Alternately, with $D=1, REG=AX, R/M=[BX]$, Byte 1 = 8BH and Byte 2 = 07H with reversed roles; 89 07H is standard MASM output).*

---

#### 3. Hex Encoding for Instruction 2: `MOV CX, [7534h][SI]`
- **Default Segment for `[SI]`:** Data Segment (`DS`). No override required.
- **Instruction Template:**
  - Opcode for `MOV` = `100010`
  - Direction $D = 1$: Destination is register `CX` (in `REG` field); Source is memory (in `MOD R/M`).
  - Word $W = 1$: 16-bit word register `CX`.
  - Byte 1 $= 10001011_2 = \mathbf{8B}\text{H}$.
- **Byte 2 (MOD-REG-R/M):**
  - Displacement is 16-bit ($7534\text{H}$) $\implies MOD = 10_2$.
  - Register operand is `CX` $\implies REG = 001_2$.
  - Memory base/index is `[SI]` $\implies R/M = 100_2$.
  - Byte 2 $= 10\ 001\ 100_2 = \mathbf{8C}\text{H}$.
- **Bytes 3 & 4 (16-bit Displacement in Little-Endian):**
  - Disp-Low: $\mathbf{34}\text{H}$
  - Disp-High: $\mathbf{75}\text{H}$
- **Complete Hex Encoding:**
  $$\mathbf{8B\ 8C\ 34\ 75}\text{ H}$$

---

### Q-3(a) OR [10 Marks] — Physical Address Calculations & Addressing Modes

> **Question (OR):**  
> Compute physical address using given register values and also specify the addressing modes for the following instructions:  
> $BX=0222H, DS=1000H, SS=2000H, BP=0111H, SI=3333H, DI=0111H, \text{Data}=1234H$.  
> 1. `MOV CL, [BP]`  
> 2. `MOV [DI + 1778h], AX`  
> 3. `MOV [BX - 1], BL`  
> 4. `MOV AX, [SI][BX]`  
> 5. `MOV [DI+BP+1111H], BX`

#### Formula:
$$\text{Physical Address (PA)} = (\text{Segment Base} \times 10\text{H}) + \text{Effective Address (EA)}$$

---

#### 1. `MOV CL, [BP]`
- **Addressing Mode:** **Based Indirect Addressing Mode**.
- **Default Segment:** Base Pointer `BP` defaults to **Stack Segment (`SS`)**.
  - $\text{Segment Base} = SS = 2000\text{H}$
- **Effective Address:** $\text{EA} = [BP] = 0111\text{H}$
- **Physical Address:**
  $$\text{PA} = (2000\text{H} \times 10\text{H}) + 0111\text{H} = 20000\text{H} + 0111\text{H} = \mathbf{20111}\text{H}$$

---

#### 2. `MOV [DI + 1778h], AX`
- **Addressing Mode:** **Indexed Relative (Indexed with Displacement) Addressing Mode**.
- **Default Segment:** Destination Index `DI` defaults to **Data Segment (`DS`)**.
  - $\text{Segment Base} = DS = 1000\text{H}$
- **Effective Address:**
  $$\text{EA} = [DI] + 1778\text{H} = 0111\text{H} + 1778\text{H} = 1889\text{H}$$
- **Physical Address:**
  $$\text{PA} = (1000\text{H} \times 10\text{H}) + 1889\text{H} = 10000\text{H} + 1889\text{H} = \mathbf{11889}\text{H}$$
- Accesses two bytes: Low byte (`AL`) to $\mathbf{11889}\text{H}$, High byte (`AH`) to $\mathbf{1188A}\text{H}$.

---

#### 3. `MOV [BX - 1], BL`
- **Addressing Mode:** **Based Relative (Based with Displacement) Addressing Mode**.
- **Default Segment:** Base register `BX` defaults to **Data Segment (`DS`)**.
  - $\text{Segment Base} = DS = 1000\text{H}$
- **Effective Address:**
  $$\text{EA} = [BX] - 1 = 0222\text{H} - 0001\text{H} = 0221\text{H}$$
- **Physical Address:**
  $$\text{PA} = (1000\text{H} \times 10\text{H}) + 0221\text{H} = 10000\text{H} + 0221\text{H} = \mathbf{10221}\text{H}$$

---

#### 4. `MOV AX, [SI][BX]`
- **Addressing Mode:** **Based Indexed Addressing Mode**.
- **Default Segment:** Base register `BX` defaults to **Data Segment (`DS`)**.
  - $\text{Segment Base} = DS = 1000\text{H}$
- **Effective Address:**
  $$\text{EA} = [BX] + [SI] = 0222\text{H} + 3333\text{H} = 3555\text{H}$$
- **Physical Address:**
  $$\text{PA} = (1000\text{H} \times 10\text{H}) + 3555\text{H} = 10000\text{H} + 3555\text{H} = \mathbf{13555}\text{H}$$
- Accesses two bytes: $\mathbf{13555}\text{H}$ into `AL`, $\mathbf{13556}\text{H}$ into `AH`.

---

#### 5. `MOV [DI+BP+1111H], BX`
- **Addressing Mode:** **Based Indexed Relative (with Displacement) Addressing Mode**.
- **Default Segment:** Register `BP` defaults to **Stack Segment (`SS`)**.
  - $\text{Segment Base} = SS = 2000\text{H}$
- **Effective Address:**
  $$\text{EA} = [BP] + [DI] + 1111\text{H} = 0111\text{H} + 0111\text{H} + 1111\text{H} = 0222\text{H} + 1111\text{H} = 1333\text{H}$$
- **Physical Address:**
  $$\text{PA} = (2000\text{H} \times 10\text{H}) + 1333\text{H} = 20000\text{H} + 1333\text{H} = \mathbf{21333}\text{H}$$
- Accesses two bytes: Low byte (`BL`) to $\mathbf{21333}\text{H}$, High byte (`BH`) to $\mathbf{21334}\text{H}$.

---

### Q-3(b) [10 Marks] — Assembly Program: ASCII Decimal String to Binary via Near Procedure

> **Question:**  
> Write an 8086 assembly language program to convert ASCII coded decimal number to its binary equivalent using near procedure.

#### 1. Concept: Positional Base-10 to Binary Accumulation
An ASCII decimal string (e.g., `'1'`, `'2'`, `'3'`, `'4'`) is converted to its 16-bit binary equivalent via Horner's multiplication method:
$$\text{Binary Value} = (\dots((\text{Digit}_0 \times 10) + \text{Digit}_1) \times 10 \dots) + \text{Digit}_n$$
1. Initialize accumulated 16-bit total $= 0$.
2. For each ASCII character:
   - Subtract $30\text{H}$ to obtain numerical digit ($0$–$9$).
   - Multiply current accumulated total by $10$.
   - Add new digit to total.
3. Continue until carriage return or null character.

#### 2. Complete Assembly Implementation

```assembly
;====================================================================
; Program: Convert ASCII Decimal String to 16-bit Binary
;          using a NEAR Procedure
; Example: "1234" -> 04D2H (1234 in decimal)
;====================================================================
.MODEL SMALL
.STACK 100H

.DATA
    ASCII_STR DB '1234', '$'       ; ASCII input string terminated by '$'
    BIN_RESULT DW ?                ; Holds converted 16-bit binary value
    PROMPT    DB 'Original ASCII String: 1234', 0DH, 0AH, '$'

.CODE
MAIN PROC
    MOV AX, @DATA
    MOV DS, AX

    ; Display banner
    LEA DX, PROMPT
    MOV AH, 09H
    INT 21H

    ; Set up parameter for Near Procedure
    ; SI points to start of ASCII string
    LEA SI, ASCII_STR
    CALL ASCII_TO_BIN             ; Call Near Procedure

    ; Save returned binary value (returned in AX)
    MOV BIN_RESULT, AX

    ; Clean program exit
    MOV AX, 4C00H
    INT 21H
MAIN ENDP

;--------------------------------------------------------------------
; Procedure: ASCII_TO_BIN (NEAR Procedure)
; Inputs:    DS:SI = Pointer to '$'-terminated ASCII decimal string
; Outputs:   AX = 16-bit unsigned binary equivalent value
; Destroys:  BX, CX, DX
;--------------------------------------------------------------------
ASCII_TO_BIN PROC NEAR
    PUSH BX
    PUSH CX
    PUSH DX
    PUSH SI

    XOR BX, BX                    ; BX = Accumulated binary total (initially 0)
    MOV CX, 10                    ; Multiplier base = 10

CONVERT_LOOP:
    MOV AL, [SI]                  ; Fetch ASCII character
    CMP AL, '$'                   ; Check for string terminator
    JE DONE_CONVERT
    CMP AL, '0'                   ; Validate range '0' - '9'
    JB DONE_CONVERT
    CMP AL, '9'
    JA DONE_CONVERT

    SUB AL, '0'                   ; Convert ASCII to digit (e.g., '4' -> 04H)
    XOR AH, AH                    ; Zero-extend AL into AX

    ; Save incoming digit
    PUSH AX

    ; Multiply current total in BX by 10
    MOV AX, BX
    MUL CX                        ; AX = AX * 10 (Result in DX:AX)
    MOV BX, AX                    ; Update BX with (Total * 10)

    ; Add new digit to accumulated total
    POP AX
    ADD BX, AX                    ; Total = (Total * 10) + Digit

    INC SI                        ; Next ASCII character
    JMP CONVERT_LOOP

DONE_CONVERT:
    MOV AX, BX                    ; Return 16-bit binary result in AX

    POP SI
    POP DX
    POP CX
    POP BX
    RET                           ; Near return (pops 16-bit IP)
ASCII_TO_BIN ENDP

END MAIN
```

---

# SECTION-II (50 Marks)

## Question 4

### Q-4(a) [5 Marks] — Macro for 16-bit Word Multiplication

> **Question:**  
> Write a macro for multiplying two word operands and storing result in third operand.

#### 1. Concept: 16-bit Multiplication Constraints
When two 16-bit word operands are multiplied via `MUL` (unsigned) or `IMUL` (signed):
- Multiplicand is placed in register `AX`.
- Multiplier is specified in a register or memory operand.
- The product is **32 bits wide**, with the high word stored in `DX` and the low word stored in `AX` (`DX:AX`).
- If the third operand is a doubleword (`DWORD`), the macro stores both `AX` and `DX`. If it is a word (`WORD`), it stores the lower 16 bits in the destination.

#### 2. Macro Implementation

```assembly
;====================================================================
; Macro: MULTIPLY_WORDS
; Parameters:
;   OP1  - First 16-bit word operand (Memory or Register)
;   OP2  - Second 16-bit word operand (Memory or Register)
;   DEST - 32-bit Destination memory operand (DWORD)
;====================================================================
MULTIPLY_WORDS MACRO OP1, OP2, DEST
    PUSH AX
    PUSH DX

    MOV AX, OP1           ; Load first operand into Accumulator AX
    MUL OP2               ; Unsigned multiply: DX:AX = AX * OP2

    MOV WORD PTR [DEST], AX     ; Store low 16 bits of product
    MOV WORD PTR [DEST+2], DX   ; Store high 16 bits of product

    POP DX
    POP AX
ENDM

; Demonstration of macro usage:
.MODEL SMALL
.DATA
    VAL1   DW 1200H
    VAL2   DW 0050H
    RESULT DD ?           ; 32-bit doubleword destination

.CODE
START:
    MOV AX, @DATA
    MOV DS, AX

    ; Invoke macro
    MULTIPLY_WORDS VAL1, VAL2, RESULT

    MOV AX, 4C00H
    INT 21H
END START
```

---

### Q-4(b) [5 Marks] — 100-Word Stack Configuration & Setting Carry Flag via Stack

> **Question:**  
> Write the steps to configure the use of stack segment of 100 words in 8086 microprocessor. Write an assembly language program to set the carry flag using stack.

#### 1. Steps to Configure a Stack Segment of 100 Words:
1. **Define Stack Segment:** Use the `STACK` segment directive or `SEGMENT` definition specifying $100 \times 2 = 200\text{ bytes}$ of uninitialized space (`100 DUP(?)`).
2. **Initialize Segment Register `SS`:** Load the segment base address of the stack segment into register `SS` via a temporary register:
   ```assembly
   MOV AX, STACK_SEG
   MOV SS, AX
   ```
3. **Initialize Stack Pointer `SP`:** Since the 8086 stack grows **downward** (from high address to low address), initialize `SP` to point to the address **immediately past the top** of the allocated buffer (offset `200` or `100*2`):
   ```assembly
   MOV SP, 200
   ```

#### 2. Assembly Program to Set Carry Flag (CF) Exclusively via Stack:
The carry flag corresponds to **Bit 0** of the Processor Status Word (PSW).
- Step 1: Push current flags onto stack using `PUSHF`.
- Step 2: Use Base Pointer (`BP`) to modify the stacked PSW in memory, setting Bit 0 to 1 (`OR WORD PTR [BP], 0001H`).
- Step 3: Pop the modified value back into the Flag register using `POPF`.

```assembly
;====================================================================
; Program: Configure 100-word stack and set Carry Flag via stack
;====================================================================
STACK_SEG SEGMENT STACK
    DW 100 DUP(?)         ; Allocate 100 words (200 bytes)
STACK_TOP LABEL WORD
STACK_SEG ENDS

.CODE
MAIN PROC
    ; Step 1: Configure Stack Segment and Stack Pointer
    MOV AX, STACK_SEG
    MOV SS, AX
    LEA SP, STACK_TOP     ; SP points to offset 200 (top of stack)

    ; Step 2: Set Carry Flag (Bit 0) via stack
    PUSHF                 ; Push current 16-bit PSW onto stack (SP decrements by 2)
    MOV BP, SP            ; BP points to the pushed PSW on top of stack
    OR WORD PTR SS:[BP], 0001H ; Set bit 0 (Carry Flag) to 1
    POPF                  ; Pop modified word into PSW -> CF is now SET!

    ; Terminate cleanly
    MOV AX, 4C00H
    INT 21H
MAIN ENDP
END MAIN
```

---

### Q-4(c) [5 Marks] — Error Detection and Syntax Analysis in Assembly Instructions

> **Question:**  
> Given that V1 and V2 are word variables, find the errors if any in the following instructions:  
> 1. `ADD V1, V2`  
> 2. `SUB AL, V1`  
> 3. `MOV AX, [CX]`  
> 4. `JNZ [BX]`  
> 5. `IMUL V1, V2`

#### Detailed Technical Analysis:

1. **`ADD V1, V2`**
   - **Error:** **Memory-to-Memory operation is illegal in 8086 architecture.**
   - *Explanation:* The 8086 instruction encoding format permits only one memory operand per instruction (either source or destination).
   - *Correction:* Move one operand into a register first:
     ```assembly
     MOV AX, V2
     ADD V1, AX
     ```

2. **`SUB AL, V1`**
   - **Error:** **Operand Size Mismatch.**
   - *Explanation:* `AL` is an 8-bit byte register, while `V1` is declared as a 16-bit `WORD` variable. Operands must be of matching sizes.
   - *Correction:*
     ```assembly
     SUB AX, V1      ; For word subtraction
     ; OR
     SUB AL, BYTE PTR V1 ; If subtracting lower byte only
     ```

3. **`MOV AX, [CX]`**
   - **Error:** **Invalid Base/Index Register for Indirect Addressing.**
   - *Explanation:* In 16-bit real mode 8086, only four registers can be enclosed in square brackets for memory indirect addressing: `BX`, `BP` (Base registers) and `SI`, `DI` (Index registers). `CX` is a data/count register and cannot be used as an indirect memory pointer.
   - *Correction:*
     ```assembly
     MOV SI, CX
     MOV AX, [SI]    ; Valid indirect reference
     ```

4. **`JNZ [BX]`**
   - **Error:** **Conditional Jump instructions do NOT support Indirect Memory Addressing.**
   - *Explanation:* All 8086 conditional jumps (`JZ`, `JNZ`, `JC`, etc.) require a **relative 8-bit signed label displacement** (`-128` to `+127` bytes). They do not support register-indirect or memory-indirect targets (indirect jumps are supported only on unconditional `JMP`).
   - *Correction:* Use conditional branch around an unconditional indirect jump:
     ```assembly
         JZ SKIP_JMP
         JMP WORD PTR [BX]   ; Valid unconditional indirect jump
     SKIP_JMP:
     ```

5. **`IMUL V1, V2`**
   - **Error:** **Invalid Operand Format for 8086 `IMUL`.**
   - *Explanation:* On the original 8086/8088 processor, `IMUL` takes **only a single operand** (`IMUL source`). The other operand is implicitly the accumulator (`AL` or `AX`), and the destination is hardwired to `AX` or `DX:AX`. (Two-operand and three-operand `IMUL` forms were introduced later in the 80186/80286).
   - *Correction:*
     ```assembly
     MOV AX, V1
     IMUL V2         ; Legal 8086 form: DX:AX = AX * V2
     ```

---

## Question 5

### Q-5(a) [5 Marks] — Bit Manipulation on AX (Set, Clear, Invert Selected Bits)

> **Question:**  
> Write sequence of instructions that sets the rightmost four bits of AX register and clears the leftmost three bits of AX and inverts bits 7, 8 and 9 of AX irrespective of the contents of the AX register.

#### 1. Bit Position Analysis for 16-bit Register `AX`:
- Bits are numbered $15$ (MSB, leftmost) down to $0$ (LSB, rightmost).
- **Operation 1: Set the rightmost four bits (Bits 3, 2, 1, 0):**
  - Use bitwise `OR` with mask bit positions set to 1.
  - Mask $= 0000\ 0000\ 0000\ 1111_2 = \mathbf{000F}\text{H}$.
- **Operation 2: Clear the leftmost three bits (Bits 15, 14, 13):**
  - Use bitwise `AND` with mask bit positions set to 0 and all others 1.
  - Mask $= 0001\ 1111\ 1111\ 1111_2 = \mathbf{1FFF}\text{H}$.
- **Operation 3: Invert bits 7, 8, and 9:**
  - Use bitwise `XOR` with toggle bit positions set to 1.
  - Bit 9 $= 2^9 = 512 = 0200\text{H}$
  - Bit 8 $= 2^8 = 256 = 0100\text{H}$
  - Bit 7 $= 2^7 = 128 = 0080\text{H}$
  - Mask $= 0000\ 0011\ 1000\ 0000_2 = \mathbf{0380}\text{H}$.

#### 2. Instruction Sequence:
```assembly
OR  AX, 000FH     ; Sets bits 0, 1, 2, 3 to 1
AND AX, 1FFFH     ; Clears bits 13, 14, 15 to 0
XOR AX, 0380H     ; Inverts bits 7, 8, 9
```

---

### Q-5(b) [5 Marks] — Trace of Shift and Rotate Instructions (SHL, SAL, ROL, RCL)

> **Question:**  
> If the content of $DL = 93H$, content of $CL = 4H$ and content of $CF = 1$ then what will be the content of $DL$ after executing following instruction separately with same $DL = 93H$ value. Assume that the following instructions are independent, not sequential:  
> 1. `SHL DL, CL`  
> 2. `SAL DL, CL`  
> 3. `ROL DL, CL`  
> 4. `RCL DL, CL`

#### Initial Conditions:
$$DL = 93\text{H} = 1001\ 0011_2, \quad CL = 4, \quad CF = 1$$

---

#### 1. `SHL DL, CL` (Shift Logical Left by 4 bits)
- Shifts bits left; zeroes enter LSB; bits exiting MSB pass through Carry Flag ($CF$).
- Trace:
  - Initial: $1001\ 0011_2, CF=1$
  - Shift 1: $0010\ 0110_2, CF=1$
  - Shift 2: $0100\ 1100_2, CF=0$
  - Shift 3: $1001\ 1000_2, CF=0$
  - Shift 4: $0011\ 0000_2, CF=1$
- Result: **$DL = 30\text{H}$**, $CF = 1$

---

#### 2. `SAL DL, CL` (Shift Arithmetic Left by 4 bits)
- In the 8086 architecture, `SAL` and `SHL` have **identical machine encodings and bitwise operation**. Zeroes are shifted in from the right.
- Result: **$DL = 30\text{H}$**, $CF = 1$

---

#### 3. `ROL DL, CL` (Rotate Left by 4 bits)
- Circular 8-bit rotation without incorporating $CF$ into the loop (though $CF$ is updated with each bit rotated out of MSB).
- Rotating an 8-bit byte left by 4 positions simply swaps the upper and lower nybbles:
  - Initial: $[9][3] = 1001\ 0011_2$
  - After 4 rotates: $[3][9] = 0011\ 1001_2 = \mathbf{39}\text{H}$
  - Last bit rotated out (Bit 4 of original) was $1 \implies CF = 1$.
- Result: **$DL = 39\text{H}$**, $CF = 1$

---

#### 4. `RCL DL, CL` (Rotate Left through Carry by 4 bits)
- 9-bit circular rotation including the Carry Flag: $\{CF, D_7, D_6, D_5, D_4, D_3, D_2, D_1, D_0\}$.
- Initial 9-bit sequence:
  $$\{CF, DL\} = \{1,\ 1001\ 0011_2\}$$
- Shift 1: $CF = 1, DL = 0010\ 0111_2$ (old CF=1 entered LSB)
- Shift 2: $CF = 0, DL = 0100\ 1111_2$ (old CF=1 entered LSB)
- Shift 3: $CF = 0, DL = 1001\ 1110_2$ (old CF=0 entered LSB)
- Shift 4: $CF = 1, DL = 0011\ 1100_2$ (old CF=0 entered LSB)
- Binary result in $DL$: $0011\ 1100_2 = \mathbf{3C}\text{H}$, $CF = 1$.
- Result: **$DL = 3C\text{H}$**, $CF = 1$

---

### Q-5(b) OR [5 Marks] — String Transfer without MOV, MOVSB, MOVSW, or LOOP

> **Question (OR):**  
> Write an 8086 program to move a string from data segment to extra segment without using `MOV`, `MOVSB`, `MOVSW` or `LOOP` instruction.

#### 1. Concept: Register-Free Memory Transfer via Stack
- Forbidden instructions: `MOV`, `MOVSB`, `MOVSW`, `LOOP`.
- **Solution Strategy:**
  - Segment base setup: Can use `PUSH data_seg` followed by `POP DS` and `POP ES` to avoid `MOV` into segment registers!
  - Data transfer: Use `PUSH WORD PTR [SI]` / `POP WORD PTR ES:[DI]` or use string store instruction `STOSB`/`STOSW` with `LODSB`/`LODSW` (only `MOVS` variants are prohibited!).
  - Alternatively, stack `PUSH` from DS followed by `POP` to ES handles memory transfer without any `MOV` or `MOVS*` instructions.
  - Branching: Use `DEC CX` followed by `JNZ` instead of `LOOP`.

#### 2. Assembly Program Implementation

```assembly
;====================================================================
; Program: Move string from DS to ES WITHOUT MOV, MOVSB, MOVSW, or LOOP
; Strategy: Stack PUSH/POP for segment & memory data transfer;
;           JNZ for iteration control
;====================================================================
.MODEL SMALL

.DATA
    SOURCE DB 'Transfer this string without prohibited opcodes!'
    STR_LEN EQU $ - SOURCE

.DATA?
    EXTRA_SEG SEGMENT
        DEST DB 64 DUP(?)
    EXTRA_SEG ENDS

.CODE
START:
    ; Initialize DS using stack PUSH/POP (No MOV used!)
    PUSH @DATA
    POP DS

    ; Initialize ES using stack PUSH/POP (No MOV used!)
    PUSH EXTRA_SEG
    POP ES

    ; Initialize pointers using LEA (No MOV used!)
    LEA SI, SOURCE
    LEA DI, DEST
    PUSH STR_LEN
    POP CX                ; CX = String Length (No MOV used!)

TRANSFER_LOOP:
    ; Read byte from DS:[SI] and push to stack
    PUSH WORD PTR DS:[SI] ; Push word from source
    POP WORD PTR ES:[DI]  ; Pop word directly to destination in ES!

    INC SI                ; Advance source pointer
    INC DI                ; Advance destination pointer

    DEC CX                ; Decrement counter (No LOOP used!)
    JNZ TRANSFER_LOOP     ; Conditional jump (No LOOP used!)

    ; Exit
    PUSH 4C00H
    POP AX
    INT 21H
END START
```

---

### Q-5(c) [5 Marks] — Find Maximum of Array using a Near Procedure

> **Question:**  
> Write an 8086 program to find maximum of a list of numbers using near procedure.

#### 1. Concept: Near Procedure Max-Scan
- Array of unsigned or signed word values is traversed sequentially.
- A register (`AX`) holds the candidate maximum value, initialized to the first array element.
- The procedure loops through the remaining $N-1$ elements:
  - If `[SI] > AX`, `AX` is updated with `[SI]`.
- Upon return, `AX` contains the maximum number.

#### 2. Assembly Program Implementation

```assembly
;====================================================================
; Program: Find Maximum in an Array of Word Numbers using NEAR Procedure
;====================================================================
.MODEL SMALL
.STACK 64

.DATA
    NUM_LIST DW 2500H, 89ABH, 1234H, 0FFFFH, 7456H, 4321H
    LIST_LEN DW 6
    MAX_VAL  DW ?

.CODE
MAIN PROC
    MOV AX, @DATA
    MOV DS, AX

    ; Prepare procedure arguments
    LEA SI, NUM_LIST      ; SI points to array
    MOV CX, LIST_LEN      ; CX = number of elements
    CALL FIND_MAX         ; Call Near Procedure

    ; Store result
    MOV MAX_VAL, AX

    ; Clean exit
    MOV AX, 4C00H
    INT 21H
MAIN ENDP

;--------------------------------------------------------------------
; Procedure: FIND_MAX (NEAR Procedure)
; Inputs:    DS:SI = Pointer to word array, CX = Element count
; Outputs:   AX = Maximum value found in array
;--------------------------------------------------------------------
FIND_MAX PROC NEAR
    PUSH BX
    PUSH CX
    PUSH SI

    MOV AX, [SI]          ; Initialize MAX with first element
    DEC CX                ; First element already processed
    JZ MAX_DONE           ; If only 1 element, exit immediately

CHECK_NEXT:
    ADD SI, 2             ; Point to next word
    MOV BX, [SI]
    CMP BX, AX            ; Compare current element with current MAX
    JBE SKIP_UPDATE       ; If BX <= AX, keep current MAX
    MOV AX, BX            ; If BX > AX, update MAX

SKIP_UPDATE:
    DEC CX
    JNZ CHECK_NEXT

MAX_DONE:
    POP SI
    POP CX
    POP BX
    RET                   ; Near return
FIND_MAX ENDP

END MAIN
```

---

## Question 6

### Q-6(a) [5 Marks] — Interrupt Vector Table (IVT) Architecture & Role

> **Question:**  
> Draw interrupt vector table of 8086 microprocessor and specify the significance of interrupt vector table to handle interrupts.

#### 1. Interrupt Vector Table (IVT) Architecture
The IVT occupies the lowest 1024 bytes of physical memory ($00000\text{H}$ to $003\text{FFH}$):
- Accommodates **256 distinct interrupt types** (Types 0 to 255).
- Each vector entry requires **4 bytes** (32 bits) storing the starting address of the Interrupt Service Routine (ISR):
  - Lower 2 bytes: Offset address (`IP`)
  - Upper 2 bytes: Segment address (`CS`)
- Formula for vector memory base:
  $$\text{Vector Base Address} = \text{Type Number } (N) \times 4$$

```text
Physical Memory Address:                 IVT Entry Format:
+-----------------------------+ 003FFH   +-----------------------------+
| Vector for Type 255 (FFH)   |          | CS High Byte (Address N*4+3)|
+-----------------------------+          +-----------------------------+
|             ...             |          | CS Low Byte  (Address N*4+2)|
+-----------------------------+          +-----------------------------+
| Vector for Type 32 (20H)    |          | IP High Byte (Address N*4+1)|
| (User-defined / Hardware)   |          +-----------------------------+
+-----------------------------+          | IP Low Byte  (Address N*4+0)|
| Type 4: INTO (Overflow)     | 00010H   +-----------------------------+
+-----------------------------+ 0000FH
| Type 3: One-Byte Breakpoint | 0000CH
+-----------------------------+ 0000BH
| Type 2: Non-Maskable (NMI)  | 00008H
+-----------------------------+ 00007H
| Type 1: Single-Step (Trap)  | 00004H
+-----------------------------+ 00003H
| Type 0: Divide-by-Zero      | 00000H
+-----------------------------+
```

#### 2. Significance in Interrupt Handling:
1. **Decoupled Hardware/Software Interface:** The processor hardware does not need hardwired ISR addresses. An interrupting peripheral simply places an 8-bit vector number ($N$) on the data bus, and the CPU looks up the vector table.
2. **Dynamic Vector Relocation:** Operating systems and debuggers can easily hook or replace any ISR by updating the 4 bytes in the IVT at runtime.

---

### Q-6(b) [5 Marks] — Exact Stack Trace & Register State for INT 8 Instruction

> **Question:**  
> Given that $SP=0100H, SS=0300H, PSW=0240H$ and the content of following location $00020H=0040H$ and $00022H=0100H$ and instruction `INT 8` has an offset of $00A0H$ and segment address is $0900H$, determine the contents of $SP, SS, IP, CS, PSW$ and the top three words on the stack after the interrupt sequence caused by the `INT 8` instruction is executed.

#### 1. Architectural Interrupt Execution Sequence for `INT 8`:
- Vector Type $N = 8$.
- IVT Address calculation:
  $$\text{IVT Address} = 8 \times 4 = 32_{10} = \mathbf{00020}\text{H}$$
  - From given data: $[00020\text{H}] = 0040\text{H} \implies \text{New } IP = \mathbf{0040}\text{H}$
  - From given data: $[00022\text{H}] = 0100\text{H} \implies \text{New } CS = \mathbf{0100}\text{H}$
- Next sequential instruction pointer after `INT 8`:
  - `INT 8` is a 2-byte instruction (`CD 08H`).
  - Next sequential $IP = 00\text{A0H} + 2 = \mathbf{00A2}\text{H}$.
  - Current $CS = \mathbf{0900}\text{H}$.

#### 2. Push Sequence onto Stack (Stack Segment $SS = 0300\text{H}$):
1. **Push PSW ($0240\text{H}$):**
   - $SP \leftarrow 0100\text{H} - 2 = \mathbf{00FE}\text{H}$
   - Stack memory at $[00FE\text{H}] = \mathbf{0240}\text{H}$
2. **Clear Control Flags:**
   - $IF \leftarrow 0, TF \leftarrow 0$.
   - $PSW = 0240\text{H} \text{ with } IF=0 \implies \mathbf{0040}\text{H}$ (since bit 9 was 1, $0240\text{H} - 0200\text{H} = 0040\text{H}$).
3. **Push Return CS ($0900\text{H}$):**
   - $SP \leftarrow 00FE\text{H} - 2 = \mathbf{00FC}\text{H}$
   - Stack memory at $[00FC\text{H}] = \mathbf{0900}\text{H}$
4. **Push Return IP ($00A2\text{H}$):**
   - $SP \leftarrow 00FC\text{H} - 2 = \mathbf{00FA}\text{H}$
   - Stack memory at $[00FA\text{H}] = \mathbf{00A2}\text{H}$

#### 3. Summary of Register & Stack Values:

| Item | Value | Explanation |
|:---|:---:|:---|
| **`SP`** | **`00FAH`** | Decremented by 6 bytes (3 pushes) |
| **`SS`** | **`0300H`** | Unchanged |
| **`IP`** | **`0040H`** | Loaded from IVT location $00020\text{H}$ |
| **`CS`** | **`0100H`** | Loaded from IVT location $00022\text{H}$ |
| **`PSW`** | **`0040H`** | $IF$ and $TF$ cleared ($0240\text{H} \to 0040\text{H}$) |
| **Top Word on Stack (`[00FAH]`)** | **`00A2H`** | Return Instruction Pointer (`IP`) |
| **Second Word on Stack (`[00FCH]`)** | **`0900H`** | Return Code Segment (`CS`) |
| **Third Word on Stack (`[00FEH]`)** | **`0240H`** | Saved Processor Status Word (`PSW`) |

---

### Q-6(b) OR [5 Marks] — Master-Slave Cascading of 8259 PIC (CAS0-CAS2, SP#/EN#)

> **Question (OR):**  
> With the pins CAS0, CAS1 and CAS2 show how master slave cascading of 8259 chip is done.

#### 1. Concept: Cascaded 8259 Hierarchy
A single 8259 provides 8 interrupt request inputs (`IR0`–`IR7`). To expand to up to **64 interrupt inputs**, multiple 8259 chips are cascaded in a Master-Slave arrangement:
- Exactly **one Master 8259** connects its `INT` output directly to the 8086 `INTR` pin.
- Up to **8 Slave 8259s** have their `INT` outputs connected to individual `IR` lines of the Master.
- The 3 cascade lines **`CAS0`, `CAS1`, `CAS2`** form a dedicated 3-bit local bus connecting the Master to all Slaves.

```text
                           +-------------------------+
                           |       MASTER 8259       |
                           |                         |
               SP#/EN#=1 ->| SP#/EN#             INT |===> To 8086 INTR pin
                           |                         |
                           | IR0 <--- Slave 0 INT    |
                           | IR1 <--- Slave 1 INT    |
                           |  ...                    |
                           | CAS0   CAS1   CAS2      |
                           +--+------+------+--------+
                              |      |      |
             +----------------+------+------+----------------+
             | 3-bit Cascade Bus (CAS0, CAS1, CAS2)          |
             v                                               v
  +--------------------+                          +--------------------+
  |    SLAVE 0 8259    |                          |    SLAVE 1 8259    |
  | SP#/EN# = 0        |                          | SP#/EN# = 0        |
  | (Configured as 000)|                          | (Configured as 001)|
  | INT ---> Master IR0|                          | INT ---> Master IR1|
  | Inputs: IR0 - IR7  |                          | Inputs: IR0 - IR7  |
  +--------------------+                          +--------------------+
```

#### 2. Functional Role of Pins:
1. **$\overline{\text{SP}}/\overline{\text{EN}}$ (Slave Program / Enable Buffer):**
   - On the **Master 8259**, this pin is tied to **$+5\text{V}$ (Logic 1)** to designate it as the master.
   - On **Slave 8259s**, this pin is tied to **$GND$ (Logic 0)** to designate them as slaves.
2. **`CAS0`, `CAS1`, `CAS2` (Cascade Lines):**
   - Function as **outputs** on the Master and **inputs** on the Slaves.
   - When a Slave asserts an interrupt via the Master, the CPU sends the first $\overline{\text{INTA}}$ pulse.
   - The Master detects that the active interrupt originates from a cascaded slave, and broadcasts that slave's 3-bit hardware ID ($000_2$ to $111_2$) over `CAS0`–`CAS2`.
   - The designated Slave recognizes its ID, and during the second $\overline{\text{INTA}}$ pulse, releases its programmed 8-bit interrupt vector onto the system data bus.

---

### Q-6(c) [5 Marks] — Interrupt-Driven Keyboard Character Display Program

> **Question:**  
> Write an interrupt based 8086 program that loads the key pressed into memory variable `KEY_PRESSED` and displays it to the user with appropriate message.

#### 1. Concept: Keyboard Input via BIOS / DOS Interrupts
- Reading keypress without waiting or polling can be implemented using BIOS keyboard interrupt `INT 16H` (Service `AH = 00H` or `01H`) or DOS character input interrupt `INT 21H, AH = 01H`.
- Program reads key, saves it into memory variable `KEY_PRESSED`, and uses DOS string display `INT 21H, AH = 09H` to present the result.

#### 2. Assembly Program Implementation

```assembly
;====================================================================
; Program: Interrupt-based key reading, variable storage, and display
;====================================================================
.MODEL SMALL
.STACK 64

.DATA
    KEY_PRESSED DB ?
    PROMPT      DB 'Press any key on the keyboard: $'
    MSG_OUT     DB 0DH, 0AH, 'You pressed the key: ['
    DISP_CHAR   DB ?, ']', 0DH, 0AH, '$'

.CODE
MAIN PROC
    MOV AX, @DATA
    MOV DS, AX

    ; Display initial prompt
    LEA DX, PROMPT
    MOV AH, 09H
    INT 21H

    ; Interrupt-based read key from keyboard (BIOS INT 16H)
    ; AH = 00H: Wait for keystroke and read character
    ; Returns: AL = ASCII character, AH = Scan code
    MOV AH, 00H
    INT 16H

    ; Store key in memory variable
    MOV KEY_PRESSED, AL
    MOV DISP_CHAR, AL     ; Also store in display message buffer

    ; Display formatted output message
    LEA DX, MSG_OUT
    MOV AH, 09H
    INT 21H

    ; Exit program
    MOV AX, 4C00H
    INT 21H
MAIN ENDP
END MAIN
```

---

### Q-6(d) [5 Marks] — Control Logic and Counter Operations of 8253/8254 PIT

> **Question:**  
> Discuss in detail the control logic of 8253/8254 programmable interval timer.

#### 1. Architectural Control Logic Function
The control logic in the 8253/8254 Programmable Interval Timer interfaces the system bus with three independent 16-bit counters. It contains:
1. **Bus Interface Decoders:** Decodes `CS#`, `RD#`, `WR#`, and address lines $A_1, A_0$.
2. **Control Word Register (CWR):** Dedicated write-only register selected when $A_1 A_0 = 11_2$.

#### 2. Control Word Format (8 Bits):

```text
Bit:    7     6     5     4     3     2     1     0
     +-----+-----+-----+-----+-----+-----+-----+-----+
     | SC1 | SC0 | RW1 | RW0 | M2  | M1  | M0  | BCD |
     +-----+-----+-----+-----+-----+-----+-----+-----+
```

1. **Select Counter (SC1, SC0 — Bits 7, 6):**
   - `00`: Counter 0
   - `01`: Counter 1
   - `10`: Counter 2
   - `11`: Read-Back Command (8254 only) / Illegal (8253).
2. **Read/Write Format (RW1, RW0 — Bits 5, 4):**
   - `00`: **Counter Latch Command** (latches count on the fly into internal buffer without disturbing ongoing decrement).
   - `01`: Read/Write Least Significant Byte (LSB) only.
   - `10`: Read/Write Most Significant Byte (MSB) only.
   - `11`: Read/Write LSB first, followed immediately by MSB.
3. **Mode Select (M2, M1, M0 — Bits 3, 2, 1):**
   - `000` (Mode 0): Interrupt on Terminal Count.
   - `001` (Mode 1): Hardware Retriggerable One-Shot.
   - `X10` (Mode 2): Rate Generator (Divide-by-N periodic pulse).
   - `X11` (Mode 3): Square Wave Generator.
   - `100` (Mode 4): Software Triggered Strobe.
   - `101` (Mode 5): Hardware Triggered Strobe.
4. **BCD Bit (Bit 0):**
   - `0`: 16-bit Binary Counter (Range: `0000H`–`FFFFH`).
   - `1`: 4-decade Binary Coded Decimal (BCD) Counter (Range: `0000`–`9999`).

#### 3. Counter Latch and Read-Back Logic
- When a processor writes `RW1 RW0 = 00` to the CWR, the control logic triggers the counter latch circuit for the specified counter. The current count is latched into an internal output latch register (OLR), allowing the CPU to read a stable 16-bit count while the counter continues running in real time.
