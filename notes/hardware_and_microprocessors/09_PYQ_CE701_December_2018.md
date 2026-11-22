# CE701: Interfacing with Microprocessors — Exam Paper Solutions (December 2018)

**Course:** CE701 — Interfacing with Microprocessors  
**Institution:** Nirma University, Institute of Technology  
**Program:** B.Tech. in Computer Engineering, Semester-VII  
**Exam:** Semester End Examination (IR), December 2018  
**Time Allowed:** 3 Hours  
**Maximum Marks:** 100 Marks  

---

## Table of Contents

- [Section I](#section-i)
    - [Question 1](#question-1)
    - [Q-1(a) [5 Marks] — 16-bit Processor Status Word (PSW) Bits & Significance](#q-1a-5-marks--16-bit-processor-status-word-psw-bits--significance)
    - [Q-1(b) [5 Marks] — 8086 Architecture: BIU vs EU & Functional Units](#q-1b-5-marks--8086-architecture-biu-vs-eu--functional-units)
    - [Q-1(c) [5 Marks] — Assembler Directives: EVEN, LABEL, PTR, OFFSET, EQU](#q-1c-5-marks--assembler-directives-even-label-ptr-offset-equ)
    - [Question 2](#question-2)
    - [Q-2(a) [5 Marks] — Pin Functions: BHE#, MN/MX#, TEST#, ALE, RD#](#q-2a-5-marks--pin-functions-bhe-mnmx-test-ale-rd)
    - [Q-2(b) [5 Marks] — T-State, Machine Cycle, Instruction Cycle & Read Timing Diagram](#q-2b-5-marks--t-state-machine-cycle-instruction-cycle--read-timing-diagram)
    - [Q-2(c) [5 Marks] — Addressing Mode Identification](#q-2c-5-marks--addressing-mode-identification)
    - [Q-2(c) OR [5 Marks] — Physical Address Calculations](#q-2c-or-5-marks--physical-address-calculations)
    - [Question 3](#question-3)
    - [Q-3(a) [10 Marks] — Word Fetch at Odd Address: Two Machine Cycles & Memory Banks](#q-3a-10-marks--word-fetch-at-odd-address-two-machine-cycles--memory-banks)
    - [Q-3(b) [10 Marks] — Machine Instruction Template & Hex Code Generation](#q-3b-10-marks--machine-instruction-template--hex-code-generation)
- [Section II](#section-ii)
    - [Question 4](#question-4)
    - [Q-4(a) [5 Marks] — Read 2-Digit Number via Keyboard & Pack to BCD in CL](#q-4a-5-marks--read-2-digit-number-via-keyboard--pack-to-bcd-in-cl)
    - [Q-4(b) [5 Marks] — Assembly Program to Reset Entire Flag Register to 0000H](#q-4b-5-marks--assembly-program-to-reset-entire-flag-register-to-0000h)
    - [Q-4(c) [5 Marks] — Count Words in an Input String](#q-4c-5-marks--count-words-in-an-input-string)
    - [Q-4(c) OR [5 Marks] — Block Move of 50 Characters without String Instructions](#q-4c-or-5-marks--block-move-of-50-characters-without-string-instructions)
    - [Question 5](#question-5)
    - [Q-5(a) [5 Marks] — Macro to Clear Segment, Index, Pointer, and GPRs](#q-5a-5-marks--macro-to-clear-segment-index-pointer-and-gprs)
    - [Q-5(a) OR [5 Marks] — Linear Search Near Procedure with Count and Index Array](#q-5a-or-5-marks--linear-search-near-procedure-with-count-and-index-array)
    - [Q-5(b) [5 Marks] — Arithmetic Expression Evaluation: D = 6 * (A + B) / (B + C)](#q-5b-5-marks--arithmetic-expression-evaluation-d--6--a--b--b--c)
    - [Q-5(c) [5 Marks] — Memory Allocation & Physical Address Map](#q-5c-5-marks--memory-allocation--physical-address-map)
    - [Question 6](#question-6)
    - [Q-6(a) [5 Marks] — 8259 PIC Block Diagram & Functional Units](#q-6a-5-marks--8259-pic-block-diagram--functional-units)
    - [Q-6(b) [5 Marks] — 8253/8254 PIT Block Diagram & Control Logic](#q-6b-5-marks--82538254-pit-block-diagram--control-logic)
    - [Q-6(b) OR [5 Marks] — Flat Mode Memory System](#q-6b-or-5-marks--flat-mode-memory-system)
    - [Q-6(c) [5 Marks] — Protected Mode Addressing in 80286+](#q-6c-5-marks--protected-mode-addressing-in-80286)
    - [Q-6(c) OR [5 Marks] — Paging Mechanism in 80386 through Core 2](#q-6c-or-5-marks--paging-mechanism-in-80386-through-core-2)
    - [Q-6(d) [5 Marks] — Steps Taken in Response to Type-1 (Single Step) Interrupt](#q-6d-5-marks--steps-taken-in-response-to-type-1-single-step-interrupt)

---

# SECTION-I

## Question 1

### Q-1(a) [5 Marks] — 16-bit Processor Status Word (PSW) Bits & Significance

> **Question:**  
> Show the contents of 16-bit PSW (Processor Status Word). Give the significance of each flag bit in the PSW.

#### 1. Concept & Register Bit Layout
The 8086 **Processor Status Word (PSW)** is a 16-bit register consisting of **9 active flags** (6 conditional status flags and 3 control flags) and 7 undefined bits:

```text
Bit:   15  14  13  12  11  10   9   8   7   6   5   4   3   2   1   0
     +---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+
PSW: | X | X | X | X | OF| DF| IF| TF| SF| ZF| X | AF| X | PF| X | CF|
     +---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+
       U   U   U   U   C   R   R   R   C   C   U   C   U   C   U   C

Legend:
C = Conditional / Status Flag
R = Control Flag
X / U = Undefined (always read as indeterminate / logic 1 on initial power-up)
```

#### 2. Detailed Breakdown of All 9 Active Flags

##### A. Conditional (Status) Flags (Updated by ALU operations):

1. **CF (Carry Flag — Bit 0):** Set to 1 if there is a carry out of the MSB ($D_7$ for byte, $D_{15}$ for word) during addition, or a borrow into the MSB during subtraction. Otherwise 0. Also used by shift/rotate instructions.
2. **PF (Parity Flag — Bit 2):** Set to 1 if the lower 8 bits (byte result) contains an **even number of logic 1s** (even parity); 0 for odd parity.
3. **AF (Auxiliary Carry Flag — Bit 4):** Set to 1 if there is a carry out of bit $D_3$ into $D_4$ or a borrow from $D_4$ into $D_3$. Essential for BCD arithmetic (`DAA`, `DAS`).
4. **ZF (Zero Flag — Bit 6):** Set to 1 if the mathematical/logical result of an operation is exactly zero (`00H` or `0000H`); 0 if non-zero.
5. **SF (Sign Flag — Bit 7):** Equal to the MSB of the result ($D_7$ for 8-bit, $D_{15}$ for 16-bit). In signed two's complement arithmetic, $SF=1$ indicates negative; $SF=0$ indicates positive.
6. **OF (Overflow Flag — Bit 11):** Set to 1 if a signed arithmetic operation yields a result that exceeds the capacity of the destination register (signed magnitude overflow: $+127$ to $-128$ for byte; $+32767$ to $-32768$ for word). Formally: $OF = C_{in\_msb} \oplus C_{out\_msb}$.

##### B. Control Flags (Programmer-controlled execution behavior):

1. **TF (Trap Flag — Bit 8):** When set to 1, puts the processor into single-step execution mode. An internal Type-1 interrupt is generated automatically after each instruction executes, enabling debugging.
2. **IF (Interrupt Enable Flag — Bit 9):** When set to 1 (`STI`), the 8086 recognizes maskable hardware interrupt requests on the `INTR` pin. When cleared to 0 (`CLI`), `INTR` is ignored. Does not affect `NMI` or software interrupts.
3. **DF (Direction Flag — Bit 10):** Controls the direction of pointer movement in string operations (`MOVS`, `CMPS`, `SCAS`, `LODS`, `STOS`). If $DF=0$ (`CLD`), index registers (`SI`, `DI`) auto-increment. If $DF=1$ (`STD`), they auto-decrement.

---

### Q-1(b) [5 Marks] — 8086 Architecture: BIU vs EU & Functional Units

> **Question:**  
> Explain the architecture of 8086 microprocessor. Differentiate BIU and EU and specify the importance of any two functional units.

#### 1. Concept: Pipelined Two-Stage Architecture
The 8086 internal architecture is decoupled into two independent asynchronous processing units: the **Bus Interface Unit (BIU)** and the **Execution Unit (EU)**. This separation implements instruction prefetching and pipelined execution.

```text
+--------------------------------------------------------------------------+
| BUS INTERFACE UNIT (BIU)                                                 |
|                                                                          |
|  [CS] [DS] [SS] [ES] [IP]                                                |
|       |                                                                  |
|       v                                                                  |
|  20-bit Dedicated Adder ====> 20-bit Address Bus (AD0-AD15, A16-A19)    |
|                                                                          |
|  +-----------------------------+                                         |
|  | 6-Byte Instruction Queue     | <==== Read Bus Cycle via Memory         |
|  | [B1] [B2] [B3] [B4] [B5] [B6]|                                         |
|  +--------------+--------------+                                         |
+-----------------|--------------------------------------------------------+
                  | FIFO Byte Stream
+-----------------v--------------------------------------------------------+
| EXECUTION UNIT (EU)                                                      |
|                                                                          |
|  Control Logic & Decoder  <--- Decodes Opcode from Queue                 |
|                                                                          |
|  General Data Registers:     Pointer & Index Registers:                  |
|  [ AH | AL ] (AX)            [ SP ] Stack Pointer                        |
|  [ BH | BL ] (BX)            [ BP ] Base Pointer                         |
|  [ CH | CL ] (CX)            [ SI ] Source Index                         |
|  [ DH | DL ] (DX)            [ DI ] Destination Index                    |
|                                                                          |
|  [ 16-bit ALU ] <=======> [ 16-bit Flag Register / PSW ]                |
+--------------------------------------------------------------------------+
```

#### 2. Architectural Comparison: BIU vs EU

| Feature | Bus Interface Unit (BIU) | Execution Unit (EU) |
|:---|:---|:---|
| **Primary Role** | External memory and I/O bus interface, address generation, instruction prefetch. | Instruction decoding, arithmetic/logical computation, execution. |
| **Registers** | `CS`, `DS`, `SS`, `ES`, `IP`, 6-byte instruction FIFO queue. | `AX`, `BX`, `CX`, `DX`, `SP`, `BP`, `SI`, `DI`, `FLAGS`, ALU, Control Logic. |
| **Bus Connection** | Physically drives external address/data multiplexed buses (`AD0`–`AD15`, `A16`–`A19`). | Operates completely internally; communicates only via BIU internal buses. |
| **Clock Synchronization**| Drives bus cycles ($T_1, T_2, T_3, T_4$) to interact with external memory/devices. | Executes instructions in clock cycles independently of bus wait states. |
| **Pipelining Action** | Prefetches next sequential instruction bytes whenever 2 or more queue bytes are free. | Consumes instructions from the queue without waiting for memory fetch latency. |

#### 3. Importance of Two Functional Units

1. **6-Byte Instruction FIFO Queue (in BIU):**
   - *Significance:* Eliminates memory fetch latency from the execution cycle. While the EU is busy executing arithmetic or multi-cycle instructions (e.g., `MUL`, `DIV`), the BIU keeps fetching instructions ahead of time over idle system buses. When the EU finishes, the next opcode is immediately available without bus wait states.
2. **20-bit Dedicated Address Adder (in BIU):**
   - *Significance:* Enables 1 MB physical address reach from 16-bit internal registers using the formula:

     $\text{Physical Address} = (\text{Segment Base} \times 16_{10}) + \text{Effective Address Offset}$

   - Performs this hardware shift-add in a single cycle without consuming ALU processing time.

---

### Q-1(c) [5 Marks] — Assembler Directives: EVEN, LABEL, PTR, OFFSET, EQU

> **Question:**  
> Write details of the following assembler directives with suitable example:  
> `EVEN`, `LABEL`, `PTR`, `OFFSET`, `EQU`.

#### 1. Concept & Detailed Explanations

1. **`EVEN` Directive:**
   - *Function:* Forces the assembler to align the next instruction or data definition on an **even memory address boundary** (divisible by 2). If the current location counter (`$`) is odd, the assembler inserts a dummy `NOP` byte (for code) or zero byte (for data).
   - *Significance:* On 8086, word memory accesses at even addresses require **1 bus cycle** (2 clock states), whereas at odd addresses they require **2 bus cycles** (8 clock states).
   - *Example:*
     ```assembly
     DATA_SEG SEGMENT
         BYTE1 DB 55H         ; Located at odd address (e.g., 0005H)
         EVEN                 ; Advances location counter to 0006H
         WORD1 DW 1234H       ; Now aligned on even address 0006H for single-cycle fetch
     DATA_SEG ENDS
     ```

2. **`LABEL` Directive:**
   - *Function:* Assigns an identifier name, a type attribute (`BYTE`, `WORD`, `DWORD`, `NEAR`, `FAR`), and the current offset address without allocating additional memory storage.
   - *Significance:* Allows accessing the exact same memory storage under different names and data types.
   - *Example:*
     ```assembly
     DATA_SEG SEGMENT
         ARRAY_WORDS LABEL WORD   ; Creates label pointing to offset 0000H with type WORD
         ARRAY_BYTES DB 100 DUP(0); Allocates 100 bytes starting at offset 0000H
     DATA_SEG ENDS
     ; Code can access ARRAY_WORDS as 16-bit words or ARRAY_BYTES as 8-bit bytes
     ```

3. **`PTR` (Pointer) Directive:**
   - *Function:* Type-cast operator used within an instruction to explicitly specify whether a memory operand refers to a `BYTE`, `WORD`, `DWORD`, etc., resolving operand size ambiguity.
   - *Significance:* Necessary when an instruction involves an immediate value and an indirect memory reference without register size context.
   - *Example:*
     ```assembly
     MOV BYTE PTR [BX], 25H    ; Stores 1 byte (25H) at [BX]
     MOV WORD PTR [BX], 25H    ; Stores 2 bytes (0025H) at [BX] and [BX+1]
     ```

4. **`OFFSET` Directive:**
   - *Function:* An operator that returns the displacement (offset distance in bytes) of a variable or label from the base of the logical segment where it is defined.
   - *Significance:* Used to initialize index or pointer registers (`BX`, `SI`, `DI`, `BP`) with the memory address of data structures.
   - *Example:*
     ```assembly
     MOV SI, OFFSET STRING_DATA  ; Loads 16-bit offset of STRING_DATA into SI
     LEA SI, STRING_DATA         ; Equivalent runtime machine instruction
     ```

5. **`EQU` (Equate) Directive:**
   - *Function:* Assigns a symbolic name to a numerical constant, an address, or a string of text. The assembler replaces all occurrences of the symbol with the defined expression during assembly. It does not allocate storage in the generated object code.
   - *Significance:* Improves code readability, parameterization, and maintainability.
   - *Example:*
     ```assembly
     BUFFER_SIZE EQU 1024
     CR          EQU 0DH
     LF          EQU 0AH
     
     BUFFER DB BUFFER_SIZE DUP(?) ; Allocates 1024 bytes
     ```

---

## Question 2

### Q-2(a) [5 Marks] — Pin Functions: BHE#, MN/MX#, TEST#, ALE, RD#

> **Question:**  
> Write the functions of the following pins of 8086 microprocessor:  
> $\overline{\text{BHE}}$, $\text{MN}/\overline{\text{MX}}$, $\overline{\text{TEST}}$, $\text{ALE}$, $\overline{\text{RD}}$.

#### 1. Concept & Pin Descriptions

1. **$\overline{\text{BHE}}$ / $S_7$ (Bus High Enable / Status, Pin 34 — Output):**
   - Active-low control signal combined with address line $A_0$ to control 16-bit memory banking:
     - When asserted low ($\overline{\text{BHE}}=0$), it enables the **Odd Memory Bank** ($D_{15}$–$D_8$).
     - During $T_1$, it functions as $\overline{\text{BHE}}$; during $T_2, T_3, T_4$, it outputs status signal $S_7$.
     - $\overline{\text{BHE}}=0, A_0=0 \implies$ Whole 16-bit word transferred in 1 cycle.
     - $\overline{\text{BHE}}=0, A_0=1 \implies$ High byte transferred from odd address.

2. **$\text{MN}/\overline{\text{MX}}$ (Minimum / Maximum Mode, Pin 33 — Input):**
   - Hardware configuration pin tied to either $+5\text{V}$ ($V_{CC}$) or Ground ($GND$):
     - When tied to $+5\text{V}$ (Logic 1), processor operates in **Minimum Mode** (single-processor, generates its own bus control signals: `RD#`, `WR#`, `M/IO#`, `ALE`).
     - When tied to $GND$ (Logic 0), processor operates in **Maximum Mode** (multiprocessor, emits status lines $\overline{S_0}, \overline{S_1}, \overline{S_2}$ to an external 8288 Bus Controller).

3. **$\overline{\text{TEST}}$ (Test Input, Pin 23 — Input):**
   - Active-low hardware synchronization input evaluated by the `WAIT` instruction.
   - If $\overline{\text{TEST}}$ is high (Logic 1), the processor enters an idle wait loop and continues executing wait states.
   - As soon as an external coprocessor (e.g., 8087 Numeric Co-processor) pulls $\overline{\text{TEST}}$ low (Logic 0), the 8086 resumes execution with the next sequential instruction.

4. **$\text{ALE}$ (Address Latch Enable, Pin 25 — Output):**
   - Active-high strobe signal pulse generated by the 8086 (in Minimum Mode) during state $T_1$ of every bus cycle.
   - Connected to the strobe ($G$/$LE$) pin of external octal transparent latches (e.g., 74LS373) to demultiplex the combined address/data bus, latching the 20-bit address ($A_0$–$A_{19}$) before lines switch to data in $T_2$–$T_4$.

5. **$\overline{\text{RD}}$ (Read Control, Pin 32 — Output):**
   - Active-low control signal asserted during states $T_2, T_3, T_w$ of a read bus cycle.
   - Stabs the memory or I/O device output enable ($\overline{OE}$) pins, signaling the addressed device to place its data onto the data bus ($AD_0$–$AD_{15}$).

---

### Q-2(b) [5 Marks] — T-State, Machine Cycle, Instruction Cycle & Read Timing Diagram

> **Question:**  
> Identify the relation between state, machine cycle and instruction cycle.  
> Draw the timing diagram with necessary control signals to read byte data from a memory location with physical address as $\text{FFFF0H}$.

#### 1. Fundamental Timing Concepts & Mathematical Relationship

- **T-State (Clock State):** The smallest basic unit of processor timing, corresponding to one complete period of the master system clock frequency:

  $T = \frac{1}{f_{CLK}} \quad (\text{e.g., } 200\text{ ns at } 5\text{ MHz})$

- **Machine Cycle (Bus Cycle):** The sequence of clock states required to perform a single basic external bus operation (Memory Read, Memory Write, I/O Read, I/O Write, or Interrupt Acknowledge). A standard 8086 bus cycle consists of **4 active clock states** ($T_1, T_2, T_3, T_4$) plus optional wait states ($T_w$).
- **Instruction Cycle:** The total time and sequence of machine cycles required to fetch, decode, and fully execute a complete machine instruction.
- **Hierarchical Relationship:**

  $\text{Instruction Cycle} = \sum_{i=1}^{k} \text{Machine Cycle}_i = \sum_{j=1}^{n} T\text{-State}_j \quad (n \ge 4)$

#### 2. Read Timing Diagram for Byte at Physical Address $\text{FFFF0H}$
$\text{FFFF0H}$ is an **Even Address** ($A_0 = 0$).  
To read an 8-bit byte from an even address:

- $A_0 = 0$ (Even bank enabled)
- $\overline{\text{BHE}} = 1$ (Odd bank disabled)
- Lines utilized: Lower byte lines $D_7$–$D_0$ ($AD_7$–$AD_0$)

```text
Clock (CLK)    |--T1---|--T2---|--T3---|--T4---|
               _   _   _   _   _   _   _   _   
              | |_| |_| |_| |_| |_| |_| |_| |_|
               
ALE            ___/-----\______________________  (Pulsed high in T1 to latch address)

A19-A16/S6-S3  ---< F H >---< S6-S3 >----------  (Memory Address high nybble in T1)

AD15-AD8       ---< FFH >---( Tristate/Float )-  (High address byte; float as BHE#=1)

AD7-AD0        ---< F0H >---< Valid Data Read >  (Address in T1, Data driven by mem in T3-T4)

BHE#/S7        -------------\__________________  (Held HIGH = 1 throughout to disable odd bank)

A0             _____________/------------------  (A0 = LOW = 0 to enable even bank)

M/IO#          ==============HIGH==============  (Held HIGH for entire Memory Access)

RD#            -------------/________\_________  (Active-Low during T2, T3, early T4)

DT/R#          ==============LOW===============  (Held LOW = Receive data into 8086)

DEN#           -------------/________\_________  (Active-Low data transceiver enable)
```

---

### Q-2(c) [5 Marks] — Addressing Mode Identification

> **Question:**  
> Identify the addressing modes for the following instructions:  
>
> 1. `MOV DX, [BP]`  
> 2. `MOV CL, 1024h[BX][SI]`  
> 3. `MOV 124h[BX], CL`  
> 4. `MOV ES:675h[SI], AL`  
> 5. `MOV SS:[1234h], DX`

#### Solution:

1. **`MOV DX, [BP]`**
   - **Addressing Mode:** **Based Indirect Addressing Mode** (or Register Indirect using Base Pointer `BP`).
   - *Segment Used:* Stack Segment (`SS`).
2. **`MOV CL, 1024h[BX][SI]`**
   - **Addressing Mode:** **Based Indexed with Displacement Addressing Mode** (Base register `BX`, Index register `SI`, 16-bit displacement `1024H`).
   - *Segment Used:* Data Segment (`DS`).
3. **`MOV 124h[BX], CL`**
   - **Addressing Mode:** **Based with Displacement Addressing Mode** (Base register `BX`, 16-bit displacement `0124H`).
   - *Segment Used:* Data Segment (`DS`).
4. **`MOV ES:675h[SI], AL`**
   - **Addressing Mode:** **Indexed with Displacement Addressing Mode with Segment Override Prefix** (Index register `SI`, 16-bit displacement `0675H`, overridden to Extra Segment `ES`).
5. **`MOV SS:[1234h], DX`**
   - **Addressing Mode:** **Direct Addressing Mode with Segment Override Prefix** (16-bit direct memory displacement `1234H`, overridden to Stack Segment `SS`).

---

### Q-2(c) OR [5 Marks] — Physical Address Calculations

> **Question (OR):**  
> Compute physical address of the memory to fetch data through the following instructions with given register values:  
> $DS=1126H, SS=4434H, ES=8124H, CS=6124H, SP=1010H, BP=0BCDH,$  
> $SI=0A91H, DI=0164H, AX=0712H, BX=1230H, CX=0012H, DX=004BH$.  
>
> 1. `MOV 1234h[BP], AX`  
> 2. `MOV DX, ES:[BX][SI+4ACh]`

#### Formula:

$$\text{Physical Address (PA)} = (\text{Segment Register} \times 10\text{H}) + \text{Effective Address (EA)}$$

#### 1. Instruction 1: `MOV 1234h[BP], AX`

- **Default Segment:** Register `BP` uses **Stack Segment (`SS`)** by default.
    - $\text{Segment Base} = SS = 4434\text{H}$
- **Effective Address (EA):**

  $\text{EA} = [BP] + \text{Disp} = 0\text{BCDH} + 1234\text{H}$

  $\text{EA} = 0\text{BCDH} + 1234\text{H} = 1\text{E01H}$

- **Physical Address Calculation:**

  $\text{Segment Base Address} = 4434\text{H} \times 10\text{H} = 44340\text{H}$

  $\text{PA} = 44340\text{H} + 1\text{E01H} = 46141\text{H}$

- Since `AX` is a 16-bit word, bytes are written to **$46141\text{H}$** (holding `AL = 12H`) and **$46142\text{H}$** (holding `AH = 07H`).

#### 2. Instruction 2: `MOV DX, ES:[BX][SI+4ACh]`

- **Segment:** Segment Override Prefix specifies **Extra Segment (`ES`)**.
    - $\text{Segment Base} = ES = 8124\text{H}$
- **Effective Address (EA):**

  $\text{EA} = [BX] + [SI] + \text{Disp} = 1230\text{H} + 0\text{A91H} + 04\text{ACH}$

  $\text{EA} = 1\text{CC1H} + 04\text{ACH} = 216\text{DH}$

- **Physical Address Calculation:**

  $\text{Segment Base Address} = 8124\text{H} \times 10\text{H} = 81240\text{H}$

  $\text{PA} = 81240\text{H} + 216\text{DH} = 833\text{ADH}$

- Since `DX` is a 16-bit word, bytes are fetched from **$833\text{ADH}$** (into `DL`) and **$833\text{AEH}$** (into `DH`).

---

## Question 3

### Q-3(a) [10 Marks] — Word Fetch at Odd Address: Two Machine Cycles & Memory Banks

> **Question:**  
> "It takes two machine cycles to fetch a word data stored in a memory location with an odd address". Justify your answer with a suitable block diagram of memory banks and specify necessary control signals required to fetch data with odd and even memory locations.

#### 1. Architectural Justification & Memory Banking
The 8086 has a 16-bit physical data bus ($D_{15}$–$D_0$), but memory is organized in **bytes**. To support byte and word access while maintaining high performance, the 1 MB memory address space is physically partitioned into two parallel 512 KB memory banks:

1. **Even Bank (Lower Bank):** Contains all bytes with even addresses ($00000\text{H}, 00002\text{H}, \dots$). Connected to data bus lines $D_7$–$D_0$. Selected by active-low address line $A_0 = 0$.
2. **Odd Bank (Higher Bank):** Contains all bytes with odd addresses ($00001\text{H}, 00003\text{H}, \dots$). Connected to data bus lines $D_{15}$–$D_8$. Selected by active-low bus high enable $\overline{\text{BHE}} = 0$.

```text
                          +-------------------------+
                          |   8086 MICROPROCESSOR   |
                          |  AD15..AD8     AD7..AD0 |
                          +-----+--------------+----+
                                |              |
        BHE#                    |              |                A0
         |                      |              |                |
         |         +------------+              +------------+   |
         |         |                                        |   |
         v         v                                        v   v
    +-----------------------+                      +-----------------------+
    |   ODD (UPPER) BANK    |                      |   EVEN (LOWER) BANK   |
    |        512 KB         |                      |        512 KB         |
    |  D15 - D8             |                      |  D7 - D0              |
    |  Addresses:           |                      |  Addresses:           |
    |  00001H, 00003H, ...  |                      |  00000H, 00002H, ...  |
    |  Enabled by BHE# = 0  |                      |  Enabled by A0 = 0    |
    +-----------------------+                      +-----------------------+
```

#### 2. Control Signal Truth Table for Bank Selection

| $\overline{\text{BHE}}$ | $A_0$ | Operation Type | Active Bank | Active Data Bus Lines | Machine Cycles |
|:---:|:---:|:---|:---|:---|:---:|
| **0** | **0** | 16-bit Word access at **Even Address** | Both Banks (Aligned) | $D_{15}$–$D_0$ | **1 Cycle** |
| **0** | **1** | 8-bit Byte access at **Odd Address** | Odd Bank Only | $D_{15}$–$D_8$ | **1 Cycle** |
| **1** | **0** | 8-bit Byte access at **Even Address** | Even Bank Only | $D_7$–$D_0$ | **1 Cycle** |
| **1** | **1** | No memory bank selected / Idle bus | None | Tristate | N/A |

#### 3. Step-by-Step Breakdown: Word Fetch at an Odd Address (e.g., Address $00005\text{H}$)
A 16-bit word at odd address $00005\text{H}$ consists of:

- Byte 1 (Low byte of word) at address $00005\text{H}$ (in Odd Bank).
- Byte 2 (High byte of word) at address $00006\text{H}$ (in Even Bank).

Because the external bus cannot route the Odd Bank ($D_{15}$–$D_8$) to the lower half of internal register (`AL`), and cannot activate bank address lines $00005\text{H}$ and $00006\text{H}$ simultaneously, the BIU must automatically execute **two sequential machine cycles**:

##### Cycle 1 (Fetch Low Byte from Odd Address $00005\text{H}$):

- Address emitted: $00005\text{H}$ ($A_0 = 1$).
- Bank control: $\overline{\text{BHE}} = 0$ (Odd bank enabled), $A_0 = 1$ (Even bank disabled).
- Data byte transferred: Placed on upper data bus $D_{15}$–$D_8$.
- Internal BIU routing: Latched into an internal holding register and shifted to the lower byte of the destination register (`AL`).

##### Cycle 2 (Fetch High Byte from Even Address $00006\text{H}$):

- Address emitted: $00006\text{H}$ ($A_0 = 0$).
- Bank control: $\overline{\text{BHE}} = 1$ (Odd bank disabled), $A_0 = 0$ (Even bank enabled).
- Data byte transferred: Placed on lower data bus $D_7$–$D_0$.
- Internal BIU routing: Routed directly to the high byte of the destination register (`AH`).

**Conclusion:** Storing 16-bit words at odd addresses incurs a **100% bus penalty** (requires 2 bus cycles / 8 clock cycles instead of 1 cycle / 4 clock cycles).

---

### Q-3(b) [10 Marks] — Machine Instruction Template & Hex Code Generation

> **Question:**  
> Write the instruction coding template for Intel 8086 microprocessor and specify the significance of each field in the template.  
> Assume opcode for `MOV` instruction as `100010` and write the machine instruction code for the following instructions:  
>
> 1. `MOV AX, [BX][SI][1234h]`  
> 2. `MOV CX, [SI][0ACDh]`

#### 1. General Instruction Coding Template
8086 machine instructions range from 1 to 6 bytes in length. The general 2-operand register/memory template is structured as follows:

```text
 Byte 1 (Opcode Byte):        Byte 2 (MOD-REG-R/M):        Bytes 3 - 6:
+-------------------+       +-----+---------+-----+       +-----------------------+
|  Opcode   | D | W |       | MOD |   REG   | R/M |  ==>  | Disp-Low  | Disp-High |
+-------------------+       +-----+---------+-----+       +-----------------------+
   6 bits     1   1          2 bits  3 bits  3 bits        (Optional: Data-Low, High)
```

#### 2. Significance of Each Field:

1. **Opcode (6 bits):** Specifies the basic machine operation to perform (for `MOV`, Opcode = `100010`).
2. **D (Direction Bit, 1 bit):**
   - $D = 1$: Destination operand is specified by the `REG` field; Source is specified by `MOD R/M`. (Register $\leftarrow$ Memory/Register)
   - $D = 0$: Source operand is specified by the `REG` field; Destination is specified by `MOD R/M`. (Memory/Register $\leftarrow$ Register)
3. **W (Word/Byte Bit, 1 bit):**
   - $W = 0$: Byte operation (8-bit operands: `AL`, `CL`, `DL`, `BL`, `AH`, `CH`, `DH`, `BH`).
   - $W = 1$: Word operation (16-bit operands: `AX`, `CX`, `DX`, `BX`, `SP`, `BP`, `SI`, `DI`).
4. **MOD (Mode Field, 2 bits):** Defines addressing mode and displacement length:
   - `00`: Memory mode with no displacement (except direct addressing when $R/M = 110$).
   - `01`: Memory mode with 8-bit sign-extended displacement (`Disp-Low`).
   - `10`: Memory mode with 16-bit displacement (`Disp-Low`, `Disp-High`).
   - `11`: Register-to-register mode (no memory displacement; `R/M` specifies register).
5. **REG Field (3 bits):** Specifies the register operand:
   - For $W = 1$: `000` = AX, `001` = CX, `010` = DX, `011` = BX, `100` = SP, `101` = BP, `110` = SI, `111` = DI.
6. **R/M (Register/Memory Field, 3 bits when $MOD \ne 11$):**
   - `000` = `[BX + SI]`
   - `001` = `[BX + DI]`
   - `010` = `[BP + SI]`
   - `011` = `[BP + DI]`
   - `100` = `[SI]`
   - `101` = `[DI]`
   - `110` = `[BP]` (or 16-bit Direct Address if $MOD = 00$)
   - `111` = `[BX]`

---

#### 3. Encoding Instruction 1: `MOV AX, [BX][SI][1234h]`

- **Opcode:** `100010`
- **Direction (D):** Destination is register `AX` $\implies D = 1$.
- **Word/Byte (W):** `AX` is a 16-bit register $\implies W = 1$.
- **Byte 1:**

  $\text{Binary: } 10001011_2 \implies \mathbf{8B}\text{H}$

- **Addressing Mode Fields:**
    - Displacement is $1234\text{H}$ (16-bit non-zero value) $\implies MOD = 10_2$.
    - Destination register is `AX` $\implies REG = 000_2$.
    - Memory base/index is `[BX + SI]` $\implies R/M = 000_2$.
- **Byte 2 (MOD-REG-R/M):**

  $\text{Binary: } 10\ 000\ 000_2 \implies \mathbf{80}\text{H}$

- **Displacement Bytes (16-bit Little-Endian):**
    - Disp-Low: $34\text{H}$
    - Disp-High: $12\text{H}$
- **Complete Hex Encoding:**

  $\mathbf{8B\ 80\ 34\ 12}\text{ H}$

---

#### 4. Encoding Instruction 2: `MOV CX, [SI][0ACDh]`

- **Opcode:** `100010`
- **Direction (D):** Destination is register `CX` $\implies D = 1$.
- **Word/Byte (W):** `CX` is a 16-bit register $\implies W = 1$.
- **Byte 1:**

  $\text{Binary: } 10001011_2 \implies \mathbf{8B}\text{H}$

- **Addressing Mode Fields:**
    - Displacement is $0\text{ACDH}$ (16-bit non-zero value) $\implies MOD = 10_2$.
    - Destination register is `CX` $\implies REG = 001_2$.
    - Memory base/index is `[SI]` $\implies R/M = 100_2$.
- **Byte 2 (MOD-REG-R/M):**

  $\text{Binary: } 10\ 001\ 100_2 \implies \mathbf{8C}\text{H}$

- **Displacement Bytes (16-bit Little-Endian):**
    - Disp-Low: $\text{CDH}$
    - Disp-High: $0\text{AH}$
- **Complete Hex Encoding:**

  $\mathbf{8B\ 8C\ CD\ 0A}\text{ H}$

---

# SECTION-II

## Question 4

### Q-4(a) [5 Marks] — Read 2-Digit Number via Keyboard & Pack to BCD in CL

> **Question:**  
> Write an 8086 assembly program to read a two-digit number from keyboard through an interrupt and convert it into a packed BCD number and store the number in CL register.

#### 1. Concept & BCD Packing
When keyboard digits are read using DOS `INT 21H, AH = 01H`, characters arrive as ASCII codes:

- Digits `'0'` to `'9'` have ASCII values $30\text{H}$ to $39\text{H}$.
- Masking off the upper nybble (`SUB AL, 30H` or `AND AL, 0FH`) extracts the raw BCD digit ($0\text{H}$ to $9\text{H}$).
- For a two-digit number $D_1 D_0$:
    - First read $D_1$: multiply or shift left by 4 bit positions: $D_1 \ll 4$.
    - Second read $D_0$: unmask to lower nybble.
    - Combine via bitwise OR: $\text{Packed BCD} = (D_1 \ll 4) \mid D_0$.

#### 2. Assembly Program Implementation

```assembly
;====================================================================
; Program: Read two-digit number from keyboard and pack into BCD in CL
; Input:   Two single-digit keypresses from user (e.g., '4', '7')
; Output:  Packed BCD in CL (e.g., 47H)
;====================================================================
.MODEL SMALL
.STACK 64

.DATA
    PROMPT DB 'Enter two decimal digits (00-99): $'

.CODE
MAIN PROC
    MOV AX, @DATA
    MOV DS, AX

    ; Display user prompt
    LEA DX, PROMPT
    MOV AH, 09H
    INT 21H

    ; Step 1: Read first digit (Tens digit D1)
    MOV AH, 01H           ; DOS character input with echo
    INT 21H               ; AL contains ASCII code of first digit (e.g., '4' = 34H)
    SUB AL, 30H           ; Unpack to raw BCD (04H)
    MOV CL, 4
    SHL AL, CL            ; Shift left 4 bits to become upper nybble (40H)
    MOV BL, AL            ; Save tens nybble in BL

    ; Step 2: Read second digit (Units digit D0)
    MOV AH, 01H
    INT 21H               ; AL contains ASCII code of second digit (e.g., '7' = 37H)
    SUB AL, 30H           ; Unpack to raw BCD (07H)

    ; Step 3: Combine upper and lower nybbles into packed BCD
    OR AL, BL             ; AL = 40H OR 07H = 47H
    MOV CL, AL            ; Result successfully stored in CL register

    ; Terminate program cleanly
    MOV AH, 4CH
    INT 21H
MAIN ENDP
END MAIN
```

---

### Q-4(b) [5 Marks] — Assembly Program to Reset Entire Flag Register to 0000H

> **Question:**  
> Write an 8086 assembly program that resets the entire sixteen bit flag register. After the execution of the program the contents of the flag register should be 0000h.

#### 1. Concept: Stack Manipulation of Flag Register
The 8086 processor does not have a direct instruction like `MOV FLAGS, 0000H`.  
However, the processor provides:

- `PUSHF`: Pushes the 16-bit Processor Status Word (PSW) onto the stack.
- `POPF`: Pops the 16-bit word at the top of the stack directly into the PSW register.

Therefore, by pushing `0000H` onto the stack and executing `POPF`, all modifiable flag bits (`OF`, `DF`, `IF`, `TF`, `SF`, `ZF`, `AF`, `PF`, `CF`) are loaded with 0.

#### 2. Assembly Program Implementation

```assembly
;====================================================================
; Program: Reset all 16 bits of the Flag Register to 0000H
;====================================================================
.MODEL SMALL
.STACK 64

.CODE
START:
    ; Method 1: Direct Stack Loading via Register
    MOV AX, 0000H         ; Load 16-bit zero pattern
    PUSH AX               ; Push 0000H onto stack
    POPF                  ; Pop 0000H directly into Flag Register (PSW)
                          ; CF=0, PF=0, AF=0, ZF=0, SF=0, TF=0, IF=0, DF=0, OF=0

    ; Terminate program
    MOV AX, 4C00H
    INT 21H
END START
```

> **Note on Reserved Bits:** In physical 8086 hardware, bits 15, 14, 13, 12, and bit 1 are hardware-fixed to logic 1 on some silicon revisions, while bits 3 and 5 are logic 0. All 9 architecturally defined flags are guaranteed reset to logic 0.

---

### Q-4(c) [5 Marks] — Count Words in an Input String

> **Question:**  
> Write an 8086 assembly program which accepts a string from a user and counts the number of words present in the entered string.

#### 1. Concept & Word Boundary Logic
A word is defined as a contiguous sequence of non-space characters separated by one or more blank spaces (`' '`, ASCII `20H`).  
A state variable (`IN_WORD`, 0 = outside word, 1 = inside word) prevents multiple consecutive spaces from inflating the word count.

#### 2. Assembly Program Implementation

```assembly
;====================================================================
; Program: Read string from user and count total words
;====================================================================
.MODEL SMALL
.STACK 128

.DATA
    PROMPT     DB 'Enter a sentence: $'
    MSG_COUNT  DB 0DH, 0AH, 'Total number of words = $'
    MAX_BUF    DB 80
    ACT_LEN    DB ?
    STR_BUF    DB 80 DUP(?)
    WORD_COUNT DW 0

.CODE
MAIN PROC
    MOV AX, @DATA
    MOV DS, AX

    ; Prompt user
    LEA DX, PROMPT
    MOV AH, 09H
    INT 21H

    ; Buffered keyboard input (INT 21H, AH = 0AH)
    LEA DX, MAX_BUF
    MOV AH, 0AH
    INT 21H

    ; Check if string is empty
    MOV CL, ACT_LEN
    CMP CL, 0
    JE DISPLAY_RESULT
    XOR CH, CH            ; CX = character count

    LEA SI, STR_BUF       ; Pointer to entered characters
    XOR DX, DX            ; DX will hold word count
    MOV BL, 0             ; BL = IN_WORD flag (0 = false, 1 = true)

PARSE_LOOP:
    MOV AL, [SI]
    CMP AL, ' '           ; Is current character a space?
    JE WAS_SPACE

    ; Non-space character
    CMP BL, 0             ; Were we outside a word?
    JNE NEXT_CHAR         ; If already inside word, continue
    INC DX                ; New word detected, increment word count
    MOV BL, 1             ; Set IN_WORD = 1
    JMP NEXT_CHAR

WAS_SPACE:
    MOV BL, 0             ; Exited word; reset IN_WORD = 0

NEXT_CHAR:
    INC SI
    LOOP PARSE_LOOP

    MOV WORD_COUNT, DX

DISPLAY_RESULT:
    LEA DX, MSG_COUNT
    MOV AH, 09H
    INT 21H

    ; Print word count (DX converted to decimal ASCII)
    MOV AX, WORD_COUNT
    ADD AL, '0'           ; For counts <= 9; standard single-digit ASCII print
    MOV DL, AL
    MOV AH, 02H
    INT 21H

    MOV AH, 4CH
    INT 21H
MAIN ENDP
END MAIN
```

---

### Q-4(c) OR [5 Marks] — Block Move of 50 Characters without String Instructions

> **Question (OR):**  
> Write an 8086 assembly program that transfers a string of 50 characters stored in a memory location named SOURCE in data segment to another location DESTINATION present in extra segment without using any of MOVS, MOVSB and MOVSW string instruction.

#### 1. Concept: Memory-to-Memory Transfer via Register
Since 8086 instructions cannot move data directly from memory to memory (`MOV [DI], [SI]` is illegal), data bytes must be moved through a general-purpose processor register (e.g., `AL`):

1. Load byte from `DS:[SI]` into `AL`.
2. Store byte from `AL` into `ES:[DI]`.
3. Increment pointers `SI` and `DI`.
4. Decrement loop counter (`CX`) until 50 characters are moved.

#### 2. Assembly Program Implementation

```assembly
;====================================================================
; Program: Transfer 50 characters from DS:SOURCE to ES:DESTINATION
;          without using MOVS, MOVSB, or MOVSW
;====================================================================
.MODEL SMALL

.DATA
    SOURCE DB 'Microprocessors and Interfacing CE701 Exam Solutions!!' ; 50 characters

.DATA?
    ; Extra segment will hold destination buffer
    EXT_SEG SEGMENT
        DESTINATION DB 50 DUP(?)
    EXT_SEG ENDS

.CODE
START:
    ; Initialize Data Segment (DS)
    MOV AX, @DATA
    MOV DS, AX

    ; Initialize Extra Segment (ES)
    MOV AX, EXT_SEG
    MOV ES, AX

    ; Initialize pointers and count
    LEA SI, SOURCE          ; Source offset in DS
    MOV DI, OFFSET DESTINATION ; Destination offset in ES
    MOV CX, 50              ; Loop count = 50 bytes

COPY_LOOP:
    MOV AL, DS:[SI]         ; Read byte from source in Data Segment
    MOV ES:[DI], AL         ; Write byte to destination in Extra Segment
    INC SI                  ; Advance source pointer
    INC DI                  ; Advance destination pointer
    DEC CX                  ; Decrement remaining count
    JNZ COPY_LOOP           ; Repeat until CX reaches 0

    ; Terminate cleanly
    MOV AX, 4C00H
    INT 21H
END START
```

---

## Question 5

### Q-5(a) [5 Marks] — Macro to Clear Segment, Index, Pointer, and GPRs

> **Question:**  
> Write an 8086 assembly program with a macro definition to clear the content of all possible segment, index, pointer and other general purpose registers.

#### 1. Concept & Architectural Constraints

- **General Purpose Registers (GPRs):** `AX`, `BX`, `CX`, `DX` (can be cleared via `XOR reg, reg` or `MOV reg, 0`).
- **Pointer and Index Registers:** `SP`, `BP`, `SI`, `DI`.
- **Segment Registers:** `DS`, `ES`, `SS`.
- **Architectural Constraint:** `CS` (Code Segment) **CANNOT** be cleared to zero while executing code, because clearing `CS` would cause the processor to jump out of the executing code segment into vector memory (`0000H`). `IP` cannot be directly loaded with 0 without a far jump. `SP` (Stack Pointer) can be zeroed, but subsequent stack operations will wrap around to `FFFEH`.

#### 2. Macro and Program Implementation

```assembly
;====================================================================
; Macro: CLEAR_ALL_REGS
; Clears all possible Segment, Pointer, Index, and Data registers
;====================================================================
CLEAR_ALL_REGS MACRO
    ; 1. Clear General Purpose Data Registers
    XOR AX, AX
    XOR BX, BX
    XOR CX, CX
    XOR DX, DX

    ; 2. Clear Pointer and Index Registers
    XOR SI, SI
    XOR DI, DI
    XOR BP, BP
    XOR SP, SP

    ; 3. Clear Modifiable Segment Registers
    ; (Direct XOR on segment registers is illegal; use cleared AX)
    MOV DS, AX
    MOV ES, AX
    MOV SS, AX
    ; NOTE: CS cannot be cleared as it contains the executing code segment.
ENDM

.MODEL SMALL
.CODE
START:
    ; Invoke Macro to clear all registers
    CLEAR_ALL_REGS

    ; Halt processor (since registers and stack are cleared)
    HLT
END START
```

---

### Q-5(a) OR [5 Marks] — Linear Search Near Procedure with Count and Index Array

> **Question (OR):**  
> Implement linear search algorithm in 8086 assembly language. The program should contain a near procedure SEARCH that searches an array of word data for a given key. The number of occurrences of the key stores in a variable named COUNT. Further the index of each occurrence is stored in an INDEX array.

#### 1. Concept: Multi-Match Linear Search

- Array elements are 16-bit words (indexed $0, 1, 2, \dots, N-1$).
- Procedure compares each element against `KEY`.
- If match occurs:
    - Increment `COUNT`.
    - Store the current logical loop index into `INDEX` array.
    - Advance `INDEX` array pointer.

#### 2. Assembly Program Implementation

```assembly
;====================================================================
; Program: Linear search near procedure storing match COUNT and INDEXES
;====================================================================
.MODEL SMALL
.STACK 64

.DATA
    ARRAY       DW 1024H, 2048H, 1024H, 4096H, 1024H, 5000H
    ARRAY_LEN   DW 6
    KEY         DW 1024H
    COUNT       DW 0
    INDEX_ARR   DW 6 DUP(0)

.CODE
MAIN PROC
    MOV AX, @DATA
    MOV DS, AX

    ; Call linear search near procedure
    CALL SEARCH

    ; Terminate cleanly
    MOV AX, 4C00H
    INT 21H
MAIN ENDP

;--------------------------------------------------------------------
; Procedure: SEARCH (Near Procedure)
; Inputs:    DS points to data segment containing ARRAY, KEY, ARRAY_LEN
; Outputs:   COUNT updated; INDEX_ARR populated
;--------------------------------------------------------------------
SEARCH PROC NEAR
    PUSH AX
    PUSH BX
    PUSH CX
    PUSH SI
    PUSH DI

    LEA SI, ARRAY         ; SI points to start of word array
    LEA DI, INDEX_ARR     ; DI points to output index array
    MOV AX, KEY           ; AX holds target key
    MOV CX, ARRAY_LEN     ; CX = number of elements
    MOV BX, 0             ; BX = current logical element index (0, 1, 2...)
    MOV COUNT, 0          ; Initialize match counter

SEARCH_LOOP:
    CMP [SI], AX          ; Compare array word with key
    JNE NO_MATCH

    ; Match found!
    INC COUNT             ; Increment occurrence count
    MOV [DI], BX          ; Store current index into INDEX array
    ADD DI, 2             ; Advance INDEX array word pointer

NO_MATCH:
    ADD SI, 2             ; Advance to next word in source array
    INC BX                ; Advance logical element index
    LOOP SEARCH_LOOP      ; Decrement CX and loop if not zero

    POP DI
    POP SI
    POP CX
    POP BX
    POP AX
    RET                   ; Near return (pops 16-bit IP)
SEARCH ENDP

END MAIN
```

---

### Q-5(b) [5 Marks] — Arithmetic Expression Evaluation: D = 6 * (A + B) / (B + C)

> **Question:**  
> Write an 8086 assembly program that performs the following computation:  
> $D = 6 \times (A + B) / (B + C)$
> $A, B, C$ and $D$ are memory variables of type word declared in main module.

#### 1. Concept: Multi-Precision Word Arithmetic & Division

- Operands $A, B, C, D$ are 16-bit unsigned/signed words.
- Numerator: $6 \times (A + B)$. Since word multiplication yields a 32-bit product, `DX:AX` holds the numerator.
- Denominator: $(B + C)$. Stored in a temporary register or memory variable (`BX`).
- Division: `DIV BX` divides 32-bit `DX:AX` by 16-bit `BX`. Quotient is stored in `AX` (assigned to $D$), remainder in `DX`.

#### 2. Assembly Program Implementation

```assembly
;====================================================================
; Program: Compute D = 6 * (A + B) / (B + C) for word variables
;====================================================================
.MODEL SMALL
.STACK 64

.DATA
    A DW 20
    B DW 10
    C DW 5
    D DW ?

.CODE
MAIN PROC
    MOV AX, @DATA
    MOV DS, AX

    ; Step 1: Compute Denominator = (B + C)
    MOV BX, B
    ADD BX, C             ; BX = B + C

    ; Step 2: Compute (A + B)
    MOV AX, A
    ADD AX, B             ; AX = A + B

    ; Step 3: Compute Numerator = 6 * (A + B)
    MOV CX, 6
    MUL CX                ; Unsigned multiply AX * CX -> 32-bit result in DX:AX

    ; Step 4: Divide DX:AX by Denominator (BX)
    ; Quotient -> AX, Remainder -> DX
    DIV BX

    ; Step 5: Store Quotient in variable D
    MOV D, AX

    ; Terminate
    MOV AX, 4C00H
    INT 21H
MAIN ENDP
END MAIN
```

---

### Q-5(c) [5 Marks] — Memory Allocation & Physical Address Map

> **Question:**  
> Show the contents of memory with physical address for the following data segment with segment register value $DS=1234H$:
> ```assembly
> Data Segment
> WORD_VAR DW 0ABh, 2456h, 123h
> BYTE_VAR DB 'B', 56
> `DWORD_VAR EQU $ - BYTE_VAR`
> Data Ends
> ```

#### 1. Concept: Memory Layout & Little-Endian Storage

- Segment Base Address $= DS \times 10\text{H} = 1234\text{H} \times 10\text{H} = \mathbf{12340}\text{H}$.
- **Little-Endian Rule:** 16-bit words store the least significant byte at the lower memory address and the most significant byte at the higher memory address.
- Character `'B'` $= 42\text{H}$ in ASCII.
- Number $56$ (decimal) $= 38\text{H}$ in hexadecimal.
- `EQU` Directive: `$-BYTE_VAR` computes the difference between current location counter (`$`) and offset of `BYTE_VAR`. It is an assembler symbol, allocating **0 bytes of physical memory**.

#### 2. Step-by-Step Memory Map

| Variable Name | Offset | Physical Address | Content (Hex) | Description / Notes |
|:---|:---:|:---:|:---:|:---|
| `WORD_VAR` | `0000H` | **`12340H`** | **`ABH`** | Low byte of `00ABH` |
| | `0001H` | **`12341H`** | **`00H`** | High byte of `00ABH` |
| | `0002H` | **`12342H`** | **`56H`** | Low byte of `2456H` |
| | `0003H` | **`12343H`** | **`24H`** | High byte of `2456H` |
| | `0004H` | **`12344H`** | **`23H`** | Low byte of `0123H` |
| | `0005H` | **`12345H`** | **`01H`** | High byte of `0123H` |
| `BYTE_VAR` | `0006H` | **`12346H`** | **`42H`** | ASCII code of `'B'` |
| | `0007H` | **`12347H`** | **`38H`** | Decimal $56 = 38\text{H}$ |
| `DWORD_VAR` | — | — | — | **EQU constant:** $= 0008\text{H} - 0006\text{H} = 2$. Allocates **no memory bytes**. |

---

## Question 6

### Q-6(a) [5 Marks] — 8259 PIC Block Diagram & Functional Units

> **Question:**  
> Draw the block diagram of 8259 Programmable Interrupt Controller and write the significance of each block.

#### 1. Internal Block Diagram

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

#### 2. Functional Significance of Each Internal Block:

1. **Interrupt Request Register (IRR):**
   - 8-bit register that stores the asynchronous interrupt requests arriving on input pins `IR0` through `IR7`. A bit is set to 1 when a device asserts a request on that line.
2. **In-Service Register (ISR):**
   - 8-bit register storing the interrupt level currently being serviced by the CPU. When the CPU acknowledges an interrupt via $\overline{\text{INTA}}$, the highest priority bit from IRR is transferred to ISR.
3. **Interrupt Mask Register (IMR):**
   - 8-bit programmable register operated via OCW1. Writing a logic 1 to bit $M_i$ selectively masks (disables) input line $IR_i$. Masked lines cannot trigger an interrupt request.
4. **Priority Resolver (PR):**
   - Combinational logic block that compares IRR, ISR, and IMR to decide whether a new incoming request has higher priority than the routine currently being executed.
5. **Control Logic:**
   - Controls the generation of the `INT` output to the 8086 and decodes dual $\overline{\text{INTA}}$ pulses from the CPU to release the programmed 8-bit interrupt vector onto the data bus.
6. **Data Bus Buffer & Read/Write Logic:**
   - 8-bit bidirectional buffer connecting to CPU data bus ($D_7$–$D_0$). Decodes `RD#`, `WR#`, `CS#`, and $A_0$ to read status or receive ICWs/OCWs.
7. **Cascade Buffer / Comparator:**
   - Enables multi-chip cascading up to 64 interrupt lines (1 Master + 8 Slaves) using lines `CAS0`, `CAS1`, `CAS2`, and `SP#/EN#`.

---

### Q-6(b) [5 Marks] — 8253/8254 PIT Block Diagram & Control Logic

> **Question:**  
> Draw block diagram of 8253/8254 programmable interval timer and give details of the control logic of the timer.

#### 1. Internal Block Diagram

```text
                  +-------------------------------------------------+
                  |      8253 / 8254 PROGRAMMABLE INTERVAL TIMER    |
                  +-------------------------------------------------+

  D7 - D0 <=======> [ Data Bus Buffer ] <========> Internal Bus
                            ^
  RD#    ---------\         |                      +------------------------+
  WR#    ----------+-> [ Read/Write Logic ] =====> | Control Word Register  |
  A0, A1 ---------/                                +------------------------+
  CS#    ---------/                                      |      |      |
                                                         v      v      v
                                                   +------------------------+
  CLK0   ---------\                                | Counter 0 (16-bit)     |
  GATE0  ----------+-> [ Counter 0 Logic ] ======> | CLK0, GATE0, OUT0      |
  OUT0   <--------/                                +------------------------+
                                                         |
  CLK1   ---------\                                +------------------------+
  GATE1  ----------+-> [ Counter 1 Logic ] ======> | Counter 1 (16-bit)     |
  OUT1   <--------/                                | CLK1, GATE1, OUT1      |
                                                   +------------------------+
                                                         |
  CLK2   ---------\                                +------------------------+
  GATE2  ----------+-> [ Counter 2 Logic ] ======> | Counter 2 (16-bit)     |
  OUT2   <--------/                                | CLK2, GATE2, OUT2      |
                                                   +------------------------+
```

#### 2. Details of the Control Logic
The internal control logic orchestrates reading, writing, and decrementing the 3 identical, independent 16-bit down counters:

1. **Port Selection via Address Pins $A_1, A_0$:**
   - $A_1 A_0 = 00_2 \implies$ Counter 0
   - $A_1 A_0 = 01_2 \implies$ Counter 1
   - $A_1 A_0 = 10_2 \implies$ Counter 2
   - $A_1 A_0 = 11_2 \implies$ Control Word Register (Write only)
2. **Control Word Register (CWR):**
   - Programmed with an 8-bit control word specifying:
     - **SC1, SC0 (Bits 7-6):** Select Counter (00 = Counter 0, 01 = Counter 1, 10 = Counter 2, 11 = Read-Back command on 8254).
     - **RW1, RW0 (Bits 5-4):** Read/Write format (00 = Counter Latch, 01 = Read/Write LSB only, 10 = Read/Write MSB only, 11 = Read/Write LSB followed by MSB).
     - **M2, M1, M0 (Bits 3-1):** Mode select (000 = Mode 0 to 101 = Mode 5).
     - **BCD (Bit 0):** `0` = 16-bit Binary counter (0000H–FFFFH); `1` = 4-decade BCD counter (0000–9999).
3. **GATE Pin Control:**
   - Dynamically enables, disables, or restarts counting depending on the programmed mode (e.g., acts as level-sensitive gate in Mode 0/2/3, or positive edge-trigger in Mode 1/5).

---

### Q-6(b) OR [5 Marks] — Flat Mode Memory System

> **Question (OR):**  
> Discuss in detail about flat mode memory system.

#### 1. Concept: Flat vs Segmented Memory

- In **Real Mode** or traditional **Segmented Protected Mode**, memory addresses are formed by adding an offset to a shifted segment base address.
- In a **Flat Mode Memory System** (adopted by modern 32-bit and 64-bit operating systems like Linux and 32/64-bit Windows):
    - Segmentation is effectively disabled or minimized.
    - All segment descriptor registers (`CS`, `DS`, `ES`, `SS`) are loaded with segment base addresses initialized to **$\text{00000000H}$** and segment limits configured to the maximum possible address space (**$\text{FFFFFFFFH} = 4\text{ GB}$** in 32-bit mode).
    - Consequently, **Effective Address (Offset) = Linear Address**.

```text
Segment Base = 00000000H ----------------------------------------------------->
                         [ Linear Address Space: 00000000H to FFFFFFFFH (4 GB) ]
Offset EIP/ESP/EAX   =========================================================>
```

#### 2. Key Characteristics of Flat Mode:

1. **Unrestricted Pointer Arithmetic:** A 32-bit pointer directly references any byte in the entire 4 GB address space without segment switching.
2. **Compiler Simplicity:** High-level language compilers (C/C++) treat all memory as a contiguous linear array, simplifying register allocation and pointer operations.
3. **Paging Integration:** Protection and virtual memory management are offloaded entirely to the hardware **Paging Unit**, which operates on uniform 4 KB pages.

---

### Q-6(c) [5 Marks] — Protected Mode Addressing in 80286+

> **Question:**  
> Write details about protected mode memory addressing present in 80286 and above architectures.

#### 1. Concept: Selectors and Descriptors
In Protected Mode, segment registers no longer hold base addresses directly. Instead, they hold a 16-bit **Segment Selector** that indexes into a **Descriptor Table** (Global Descriptor Table - GDT, or Local Descriptor Table - LDT):

```text
16-bit Segment Selector:
 15                                      3   2   1   0
+------------------------------------------+---+-------+
|            Descriptor Index              | TI|  RPL  |
|               (13 bits)                  | 1 | 2 bits|
+------------------------------------------+---+-------+
```

- **Index (Bits 15–3):** Selects 1 of up to 8,192 descriptors in the table.
- **TI (Table Indicator - Bit 2):** $0 = \text{GDT}$; $1 = \text{LDT}$.
- **RPL (Requested Privilege Level - Bits 1–0):** Privilege level of selector (Ring 0 = Highest/Kernel, Ring 3 = Lowest/User).

#### 2. Segment Descriptor Format (80286 8-byte format):
Each descriptor contains:

1. **Base Address (24 bits in 80286, 32 bits in 80386):** The starting physical address of the segment.
2. **Segment Limit (16 bits in 80286, 20 bits in 80386):** The maximum allowable offset within the segment. Any access beyond this limit raises a General Protection Fault (#GP).
3. **Access Rights Byte:** Contains:
   - $P$ (Present bit): 1 if segment resides in physical memory.
   - $DPL$ (Descriptor Privilege Level - 2 bits): Defines privilege ring (0 to 3) required to access this segment.
   - $S$ (Descriptor type): 1 = Application segment, 0 = System segment.
   - Type bits: Code (Execute-only / Read-only) or Data (Read-only / Read-Write).

---

### Q-6(c) OR [5 Marks] — Paging Mechanism in 80386 through Core 2

> **Question (OR):**  
> With suitable illustration show paging mechanism in 80386 through Core 2 microprocessors.

#### 1. Concept: Two-Level Paging Architecture
The Paging mechanism translates a 32-bit **Linear Address** (produced by segmentation) into a 32-bit **Physical Address**. It divides the 4 GB memory space into uniform **4 KB Pages**.

The 32-bit linear address is divided into three fields:
```text
 31                  22 21                  12 11                        0
+----------------------+----------------------+---------------------------+
|  Directory Index     |   Page Table Index   |        Page Offset        |
|      (10 bits)       |       (10 bits)      |         (12 bits)         |
+----------------------+----------------------+---------------------------+
```

```text
CR3 Register (PDBR)
     |
     v
+--------------+
| Page Dir Base|
+--------------+
       |
       v (Index: Bits 31-22)
+-----------------------+
| PAGE DIRECTORY (4 KB) |
| (1024 PDE entries)    | =====> Points to Base of Page Table
+-----------------------+
            |
            v (Index: Bits 21-12)
      +--------------------+
      | PAGE TABLE (4 KB)  |
      | (1024 PTE entries) | =====> Points to 4 KB Physical Page Frame Base
      +--------------------+
                  |
                  v (Offset: Bits 11-0 added)
            +---------------------------+
            | PHYSICAL MEMORY BYTE      |
            +---------------------------+
```

#### 2. Translation Steps:

1. **CR3 (Page Directory Base Register):** Holds the physical base address of the Page Directory (must be 4 KB page-aligned).
2. **Page Directory Entry (PDE):** The upper 10 bits ($31$–$22$) index one of 1024 32-bit PDEs in the Page Directory. The PDE provides the physical base address of a Page Table.
3. **Page Table Entry (PTE):** The middle 10 bits ($21$–$12$) index one of 1024 32-bit PTEs in the selected Page Table. The PTE provides the 20-bit physical base address of the target 4 KB page frame.
4. **Physical Address:** The lower 12 bits ($11$–$0$) are concatenated directly with the 20-bit page frame base to address the exact byte:

   $\text{Physical Address} = (\text{PTE Base Address}) \mid \text{Offset}$

---

### Q-6(d) [5 Marks] — Steps Taken in Response to Type-1 (Single Step) Interrupt

> **Question:**  
> List the steps that are taken in response to a TYPE-1 interrupt.

#### 1. Concept: Trap Flag & Single-Step Mechanism
A **Type-1 Interrupt** is generated internally by the 8086 processor after executing any instruction if the **Trap Flag (TF, Bit 8 of PSW)** is set to logic 1. It is primarily used by debuggers to allow step-by-step examination of registers and memory.

#### 2. Detailed Execution Sequence:

1. **Instruction Execution:** The 8086 finishes executing the current machine instruction completely.
2. **Trap Check:** At the end of the instruction, the internal control logic samples the Trap Flag. Since $TF = 1$, a Type-1 interrupt sequence begins.
3. **Push PSW:** The processor decrements the Stack Pointer by 2 ($SP \leftarrow SP - 2$) and pushes the 16-bit **Processor Status Word (Flags)** onto the stack.
4. **Clear Control Flags:**
   - The **Trap Flag (TF) is cleared to 0**. This prevents the debugger's own Interrupt Service Routine (ISR) from single-stepping itself.
   - The **Interrupt Flag (IF) is cleared to 0**. This disables external maskable hardware interrupts (`INTR`) during ISR entry.
5. **Push Return Address:**
   - $SP \leftarrow SP - 2$; Pushes the current **Code Segment (`CS`)** onto the stack.
   - $SP \leftarrow SP - 2$; Pushes the **Instruction Pointer (`IP`)** of the *next* instruction to be executed onto the stack.
6. **Fetch ISR Vector from IVT:**
   - Vector type $N = 1$. The vector address in the Interrupt Vector Table is calculated as:

     $\text{IVT Address} = 1 \times 4 = 00004\text{H}$

   - Loads the 16-bit offset into `IP` from memory locations $00004\text{H}$ and $00005\text{H}$.
   - Loads the 16-bit segment into `CS` from memory locations $00006\text{H}$ and $00007\text{H}$.
7. **Service Routine Execution:** Control transfers to the debugger's Type-1 ISR.
8. **Restoration on `IRET`:** When the debugger finishes its single-step display and executes `IRET`, the processor pops `IP`, `CS`, and `FLAGS` (restoring $TF = 1$), causing the subsequent user instruction to execute and immediately trigger the next Type-1 trap.
