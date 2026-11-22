# CE701: Interfacing with Microprocessors — Exam Paper Solutions (December 2021)

**Course:** CE701 — Interfacing with Microprocessors  
**Institution:** Nirma University, Institute of Technology  
**Program:** B.Tech. in Computer Engineering, Semester-VII  
**Exam:** Semester End Examination (IR), December 2021  
**Time Allowed:** 2 Hours  
**Maximum Marks:** 50 Marks  

---

## Table of Contents

- [Question 1 (18 Marks)](#question-1-18-marks)
    - [Q-1(a) [6 Marks] — Register Organization of 8086 & Applications of Each Register](#q-1a-6-marks--register-organization-of-8086--applications-of-each-register)
    - [Q-1(b) [6 Marks] — Purpose of Segment Registers & Physical Address for MOV CX, [BX]](#q-1b-6-marks--purpose-of-segment-registers--physical-address-for-mov-cx-bx)
    - [Q-1(c) [6 Marks] — Addressing Modes & Memory Physical Address Calculations](#q-1c-6-marks--addressing-modes--memory-physical-address-calculations)
- [Question 2 (18 Marks)](#question-2-18-marks)
    - [Q-2(a) [6 Marks] — Six Fundamental 8086 Assembly Statements](#q-2a-6-marks--six-fundamental-8086-assembly-statements)
    - [Q-2(b) [6 Marks] — 8086 Assembly Program: Word Array Linear Search](#q-2b-6-marks--8086-assembly-program-word-array-linear-search)
    - [Q-2(c) [6 Marks] — Comparison of Unconditional Jump Instructions in 8086](#q-2c-6-marks--comparison-of-unconditional-jump-instructions-in-8086)
- [Question 3 (14 Marks)](#question-3-14-marks)
    - [Q-3(a) [7 Marks] — 8254 PIT Block Diagram & Functional Units](#q-3a-7-marks--8254-pit-block-diagram--functional-units)
    - [Q-3(a) OR [7 Marks] — Assembly Program to Unpack 10 Packed BCD Numbers](#q-3a-or-7-marks--assembly-program-to-unpack-10-packed-bcd-numbers)
    - [Q-3(b) [7 Marks] — 8086 Interrupt Handling Steps & Interrupt Vector Table (IVT)](#q-3b-7-marks--8086-interrupt-handling-steps--interrupt-vector-table-ivt)
    - [Q-3(b) OR [7 Marks] — 8259 Programmable Interrupt Controller (PIC) Block Diagram](#q-3b-or-7-marks--8259-programmable-interrupt-controller-pic-block-diagram)

---

# Question 1 (18 Marks)

### Q-1(a) [6 Marks] — Register Organization of 8086 & Applications of Each Register

> **Question:**  
> Draw the register organization of the 8086 and explain typical applications of each register.

#### 1. 8086 Register Organization Diagram
The 8086 contains **fourteen 16-bit registers**, categorized into four functional groups:

```text
+-------------------------------------------------------------------------------+
|                       8086 CPU REGISTER ORGANIZATION                          |
+-------------------------------------------------------------------------------+

 1. GENERAL DATA REGISTERS (Byte or Word Accessible):
    15               8 7               0
    +-----------------+-----------------+
 AX |   AH (High)     |   AL (Low)      |  Accumulator
    +-----------------+-----------------+
 BX |   BH (High)     |   BL (Low)      |  Base Register
    +-----------------+-----------------+
 CX |   CH (High)     |   CL (Low)      |  Count Register
    +-----------------+-----------------+
 DX |   DH (High)     |   DL (Low)      |  Data Register
    +-----------------+-----------------+

 2. POINTER AND INDEX REGISTERS:
    15                                 0
    +-----------------------------------+
 SP |            Stack Pointer          |  Offset in Stack Segment
    +-----------------------------------+
 BP |            Base Pointer           |  Base Offset for Stack Parameters
    +-----------------------------------+
 SI |            Source Index           |  Source Offset for String/Block Move
    +-----------------------------------+
 DI |         Destination Index         |  Destination Offset for Strings
    +-----------------------------------+

 3. SEGMENT REGISTERS:
    15                                 0
    +-----------------------------------+
 CS |            Code Segment           |  Base address of Program Instructions
    +-----------------------------------+
 DS |            Data Segment           |  Base address of Global Variables
    +-----------------------------------+
 SS |            Stack Segment          |  Base address of Stack Memory
    +-----------------------------------+
 ES |            Extra Segment          |  Base address of Auxiliary Data
    +-----------------------------------+

 4. INSTRUCTION POINTER & STATUS FLAGS:
    15                                 0
    +-----------------------------------+
 IP |        Instruction Pointer        |  Offset of Next Instruction in CS
    +-----------------------------------+
PSW |      16-bit FLAGS Register        |  Status and Control Flags
    +-----------------------------------+
```

#### 2. Typical Applications of Each Register:

1. **`AX` (Accumulator Register):**
   - Central arithmetic and logic register.
   - Required implicitly by multiplication (`MUL`, `IMUL`), division (`DIV`, `IDIV`), BCD decimal adjustments (`DAA`, `DAS`, `AAA`, `AAS`), and I/O bus instructions (`IN`, `OUT`).
2. **`BX` (Base Register):**
   - General arithmetic/data register and the only data register that can serve as a base pointer in memory indirect addressing (`[BX]`).
   - Holds table offset in table translation (`XLAT`).
3. **`CX` (Count Register):**
   - Serves as default hardware counter for loop control (`LOOP`, `LOOPE`, `LOOPNE`).
   - Serves as repeat counter for string instructions (`REP`, `REPE`, `REPNE`).
   - Lower byte `CL` specifies dynamic shift/rotate count (`SHL AX, CL`).
4. **`DX` (Data Register):**
   - Holds the high-order 16 bits of 32-bit products and dividends (`DX:AX`).
   - Holds 16-bit variable I/O port numbers for external device addressing (`IN AL, DX`).
5. **`SP` (Stack Pointer):**
   - Tracks current top-of-stack offset. Automatically decremented by `PUSH`/`CALL` and incremented by `POP`/`RET`.
6. **`BP` (Base Pointer):**
   - Used to reference parameters and local variables passed on the stack frame (`[BP+6]`, `[BP-4]`). Default segment is `SS`.
7. **`SI` (Source Index):**
   - Provides offset addressing for data structures; acts as default source pointer for string operations (`DS:SI`).
8. **`DI` (Destination Index):**
   - Provides offset addressing for data structures; acts as default destination pointer for string operations (`ES:DI`).
9. **`CS`, `DS`, `SS`, `ES` (Segment Registers):**
   - Define the upper 16 bits of the four active 64 KB memory segments, enabling 1 MB physical memory expansion via hardware shift-add.
10. **`IP` (Instruction Pointer):**
    - Tracks sequential code execution; automatically updated by the Bus Interface Unit (BIU) and branching instructions.

---

### Q-1(b) [6 Marks] — Purpose of Segment Registers & Physical Address for MOV CX, [BX]

> **Question:**  
> What is the purpose of segment register? If the content of DS and BX registers is 2500H and 1000H, respectively, from which memory location will the 8086 fetch the data, while executing instruction `MOV CX, [BX]`?

#### 1. Purpose of Segment Registers
The 8086 utilizes a 20-bit physical address bus (accessing 1 MB of physical RAM), but its internal arithmetic unit and registers are strictly 16 bits wide. Segment registers solve this limitation by implementing **segmented memory architecture**:

1. **Memory Reach:** A 16-bit register alone can address only $2^{16} = 64\text{ KB}$. Segment registers shift the base address left by 4 bits ($\times 16_{10}$), allowing four independent 64 KB segments to be located anywhere within the 1 MB address space.
2. **Program Relocatability:** Programs can be dynamically relocated anywhere in RAM simply by updating the segment registers without modifying instruction offset addresses.
3. **Modular Code Organization:** Hardware enforces natural modularity by separating program code (`CS`), global data (`DS`), runtime stack (`SS`), and extra strings/buffers (`ES`).

#### 2. Physical Address Calculation for `MOV CX, [BX]`

- **Given:**
    - Data Segment Register: $DS = 2500\text{H}$
    - Base Register (Offset): $BX = 1000\text{H}$
- **Formula:**

  $\text{Physical Address} = (\text{Segment Base} \times 10\text{H}) + \text{Effective Address Offset}$

- **Calculation:**

  $\text{Segment Base Address} = 2500\text{H} \times 10\text{H} = 25000\text{H}$

  $\text{Physical Address (PA)} = 25000\text{H} + 1000\text{H} = \mathbf{26000}\text{H}$

#### 3. Bytes Fetched for 16-bit Word Register `CX`:
Since `CX` is a 16-bit word register, the 8086 fetches **two contiguous bytes** from memory:

1. **Lower Byte (`CL`):** Fetched from physical address **`26000H`**.
2. **Higher Byte (`CH`):** Fetched from physical address **`26001H`**.
- Because `26000H` is an **even address**, this 16-bit word fetch completes in a **single bus cycle** (both memory banks active simultaneously: $\overline{\text{BHE}}=0, A_0=0$).

---

### Q-1(c) [6 Marks] — Addressing Modes & Memory Physical Address Calculations

> **Question:**  
> Write the addressing modes of each of the following instructions. Find the address of the data that will be transferred if the content of the registers are:  
> $BX=1234H, DS=7000H, SS=2222H, BP=4321H, DI=1011H$.  
>
> 1. `MOV CX, [BP]`  
> 2. `MOV [BX+111H], AH`  
> 3. `MOV AL, [DI+BP]`

#### Formula:

$$\text{Physical Address} = (\text{Segment Register} \times 10\text{H}) + \text{Effective Address (EA)}$$

---

#### 1. `MOV CX, [BP]`

- **Addressing Mode:** **Based Indirect Addressing Mode** (or Register Indirect using Base Pointer).
- **Default Segment:** Base Pointer `BP` defaults to **Stack Segment (`SS`)**.
    - $\text{Segment Base} = SS = 2222\text{H}$
- **Effective Address:** $\text{EA} = [BP] = 4321\text{H}$
- **Physical Address Calculation:**

  $\text{Segment Base Address} = 2222\text{H} \times 10\text{H} = 22220\text{H}$

  $\text{PA} = 22220\text{H} + 4321\text{H} = \mathbf{26541}\text{H}$

- **Data Transfer Details:** Fetches 16-bit word into `CX`:
    - `CL` fetched from $\mathbf{26541}\text{H}$
    - `CH` fetched from $\mathbf{26542}\text{H}$

---

#### 2. `MOV [BX+111H], AH`

- **Addressing Mode:** **Based Relative Addressing Mode** (Based with 16-bit Displacement).
- **Default Segment:** Base register `BX` defaults to **Data Segment (`DS`)**.
    - $\text{Segment Base} = DS = 7000\text{H}$
- **Effective Address:**

  $\text{EA} = [BX] + 0111\text{H} = 1234\text{H} + 0111\text{H} = 1345\text{H}$

- **Physical Address Calculation:**

  $\text{Segment Base Address} = 7000\text{H} \times 10\text{H} = 70000\text{H}$

  $\text{PA} = 70000\text{H} + 1345\text{H} = \mathbf{71345}\text{H}$

- **Data Transfer Details:** Writes 8-bit byte from `AH` into physical memory address $\mathbf{71345}\text{H}$.

---

#### 3. `MOV AL, [DI+BP]`

- **Addressing Mode:** **Based Indexed Addressing Mode**.
- **Default Segment:** Whenever `BP` is part of the effective address calculation, the default segment is **Stack Segment (`SS`)**.
    - $\text{Segment Base} = SS = 2222\text{H}$
- **Effective Address:**

  $\text{EA} = [BP] + [DI] = 4321\text{H} + 1011\text{H} = 5332\text{H}$

- **Physical Address Calculation:**

  $\text{Segment Base Address} = 2222\text{H} \times 10\text{H} = 22220\text{H}$

  $\text{PA} = 22220\text{H} + 5332\text{H} = \mathbf{27552}\text{H}$

- **Data Transfer Details:** Fetches 8-bit byte from physical memory address $\mathbf{27552}\text{H}$ into `AL`.

---

# Question 2 (18 Marks)

### Q-2(a) [6 Marks] — Six Fundamental 8086 Assembly Statements

> **Question:**  
> Write the 8086 assembly language statement which will perform the following operations:  
>
> 1. Load the number 10H at the address specified by BX register.  
> 2. Increment the content of memory location specified by DI register.  
> 3. Clear the LSB of AX register.  
> 4. Add content of AX, BX and previous carry bit.  
> 5. Clear the direction flag.  
> 6. Logical shift right of AX register by count 3.

#### Solutions:

1. **Load 10H at memory address specified by BX register:**
   ```assembly
   MOV BYTE PTR [BX], 10H
   ```

   *(Note: `BYTE PTR` is mandatory because immediate constant `10H` has ambiguous size).*

2. **Increment the content of memory location specified by DI register:**
   ```assembly
   INC WORD PTR [DI]    ; For 16-bit word memory increment
   ; OR:
   INC BYTE PTR [DI]    ; For 8-bit byte memory increment
   ```

3. **Clear the LSB (Least Significant Bit, Bit 0) of AX register:**
   ```assembly
   AND AX, 0FFFEH
   ```

   *(Mask: $1111\ 1111\ 1111\ 1110_2 = \text{FFFEH}$; forces Bit 0 to 0 while leaving bits 15–1 unchanged).*

4. **Add content of AX, BX and previous carry bit:**
   ```assembly
   ADC AX, BX
   ```

   *(Performs: $AX \leftarrow AX + BX + CF$).*

5. **Clear the direction flag:**
   ```assembly
   CLD
   ```

   *(Clears $DF$ to 0, ensuring string operations autoincrement `SI` and `DI`).*

6. **Logical shift right of AX register by count 3:**
   ```assembly
   MOV CL, 3
   SHR AX, CL
   ```

   *(Note: In 8086 architecture, multi-bit shifts require the shift count loaded into register `CL`).*

---

### Q-2(b) [6 Marks] — 8086 Assembly Program: Word Array Linear Search

> **Question:**  
> Write an 8086 assembly language program to search a number in an array of word data.

#### 1. Concept: Linear Search on 16-bit Words

- Array elements are 16-bit words (increment pointer by 2).
- Loop iterates through the array comparing each element against `KEY`.
- If match is found: sets `FOUND = 1`, saves index in `MATCH_POS`, and exits.
- If loop finishes with no match: `FOUND` remains 0.

#### 2. Assembly Program Implementation

```assembly
;====================================================================
; Program: Linear search for a 16-bit word key in an array
;====================================================================
.MODEL SMALL
.STACK 64

.DATA
    ARRAY     DW 1111H, 2222H, 3333H, 4444H, 5555H, 6666H
    ARRAY_LEN DW 6
    KEY       DW 4444H
    FOUND     DB 0           ; 0 = Not found, 1 = Found
    MATCH_POS DW ?           ; Holds 0-based index of matched element

.CODE
MAIN PROC
    MOV AX, @DATA
    MOV DS, AX

    LEA SI, ARRAY            ; SI points to start of word array
    MOV CX, ARRAY_LEN        ; CX = number of elements
    MOV AX, KEY              ; AX = value to search for
    MOV BX, 0                ; BX = current element index (0, 1, 2...)

SEARCH_LOOP:
    CMP [SI], AX             ; Compare current array word with KEY
    JE MATCH_FOUND           ; Jump if match is detected

    ADD SI, 2                ; Advance pointer by 2 bytes (word size)
    INC BX                   ; Increment element index
    LOOP SEARCH_LOOP         ; Decrement CX and continue if not zero

    ; If loop terminates naturally, key was not found
    MOV FOUND, 0
    JMP DONE

MATCH_FOUND:
    MOV FOUND, 1             ; Set found flag
    MOV MATCH_POS, BX        ; Save index of matched element

DONE:
    MOV AX, 4C00H
    INT 21H
MAIN ENDP
END MAIN
```

---

### Q-2(c) [6 Marks] — Comparison of Unconditional Jump Instructions in 8086

> **Question:**  
> Compare various types of unconditional jump instructions supported by the 8086 microprocessor.

#### Detailed Comparative Matrix of Unconditional Jumps

| Jump Type | Mnemonic Syntax | Target Reach | Instruction Size | Encoding / Target Mechanism | Registers Updated |
|:---|:---|:---:|:---:|:---|:---|
| **Short Jump** | `JMP SHORT Label` | **$-128$ to $+127$ bytes** | **2 Bytes** | Opcode `EB` followed by 1-byte signed relative displacement. | $IP \leftarrow IP + \text{disp8}$ |
| **Near Direct Jump** | `JMP NEAR PTR Label` (or `JMP Label`) | **Within current 64 KB Code Segment** ($-32768$ to $+32767$) | **3 Bytes** | Opcode `E9` followed by 16-bit signed relative displacement. | $IP \leftarrow IP + \text{disp16}$ |
| **Near Indirect Jump** | `JMP Reg` / `JMP WORD PTR [Mem]` | **Anywhere within current 64 KB Code Segment** | **2 to 4 Bytes** | Opcode `FF /4`. Target offset is loaded directly from a register or memory location. | $IP \leftarrow [Reg \text{ or } Mem]$ |
| **Far Direct Jump** | `JMP FAR PTR Label` | **Anywhere in 1 MB physical memory** (Inter-segment) | **5 Bytes** | Opcode `EA` followed by 16-bit offset and 16-bit segment base. | $IP \leftarrow \text{Offset16}$<br>$CS \leftarrow \text{Segment16}$ |
| **Far Indirect Jump** | `JMP DWORD PTR [Mem]` | **Anywhere in 1 MB physical memory** (Inter-segment) | **2 to 4 Bytes** | Opcode `FF /5`. Loads 4 contiguous bytes from memory into IP (low word) and CS (high word). | $IP \leftarrow [Mem]$<br>$CS \leftarrow [Mem+2]$ |

---

# Question 3 (14 Marks)

### Q-3(a) [7 Marks] — 8254 PIT Block Diagram & Functional Units

> **Question:**  
> Draw the block diagram of 8254 programmable interval timer and give the details of each block.

#### 1. Internal Block Diagram

```text
                  +-------------------------------------------------+
                  |      8254 PROGRAMMABLE INTERVAL TIMER           |
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

#### 2. Functional Details of Each Block:

1. **Data Bus Buffer:**
   - 8-bit bidirectional, 3-state buffer connecting the 8254 to the system data bus ($D_7$–$D_0$). Transmits control words, status bytes, and counter values.
2. **Read/Write Control Logic:**
   - Accepts inputs from CPU control buses: $\overline{\text{RD}}$, $\overline{\text{WR}}$, $\overline{\text{CS}}$, and address lines $A_1, A_0$.
   - Selects Counter 0 ($00_2$), Counter 1 ($01_2$), Counter 2 ($10_2$), or Control Word Register ($11_2$).
3. **Control Word Register (CWR):**
   - Write-only register that receives mode definition, counting format, and read-back commands.
4. **Three Independent 16-bit Counters (Counter 0, 1, 2):**
   - Each contains an identical 16-bit presettable down-counter capable of binary or BCD counting across Modes 0 through 5.
   - Each counter has 3 dedicated hardware pins:
     - `CLK`: Input clock signal (up to 8 MHz for 8254, 10 MHz for 8254-2).
     - `GATE`: Hardware gating control input (enables/disables/re-triggers counter).
     - `OUT`: Output waveform/strobe signal.

---

### Q-3(a) OR [7 Marks] — Assembly Program to Unpack 10 Packed BCD Numbers

> **Question (OR):**  
> Write an 8086 assembly language program to unpack 10 packed BCD numbers stored in memory.

#### 1. Concept: Unpacking Packed BCD

- Each byte of **Packed BCD** contains two decimal digits (e.g., $58\text{H}$ represents $5$ and $8$).
- To unpack into two separate memory bytes:
    - **Upper Digit:** Shift right by 4 bit positions (`SHR AL, 4` or `AND AL, 0F0H` + shift).
    - **Lower Digit:** Mask off the upper nybble (`AND AL, 0FH`).
- 10 packed BCD bytes expand to **20 unpacked BCD bytes**.

#### 2. Assembly Program Implementation

```assembly
;====================================================================
; Program: Unpack 10 Packed BCD numbers into 20 Unpacked BCD bytes
; Example: 47H -> 04H, 07H
;====================================================================
.MODEL SMALL
.STACK 64

.DATA
    PACKED_ARR   DB 12H, 34H, 56H, 78H, 90H, 23H, 45H, 67H, 89H, 15H ; 10 bytes
    COUNT        EQU 10
    UNPACKED_ARR DB 20 DUP(?)                                         ; 20 bytes

.CODE
MAIN PROC
    MOV AX, @DATA
    MOV DS, AX

    LEA SI, PACKED_ARR       ; Source pointer (Packed BCD)
    LEA DI, UNPACKED_ARR     ; Destination pointer (Unpacked BCD)
    MOV CX, COUNT            ; Process 10 bytes

UNPACK_LOOP:
    MOV AL, [SI]             ; Read packed byte (e.g., 47H)
    MOV BL, AL               ; Make duplicate copy in BL

    ; Extract Tens Digit (Upper Nybble)
    MOV CL, 4
    SHR AL, CL               ; AL = 04H
    MOV [DI], AL             ; Store upper unpacked digit
    INC DI

    ; Extract Units Digit (Lower Nybble)
    MOV AL, BL
    AND AL, 0FH              ; AL = 07H
    MOV [DI], AL             ; Store lower unpacked digit
    INC DI

    INC SI                   ; Next packed BCD byte
    MOV CX, 10               ; Restore loop counter context (or use DX as loop counter)
    ; Better register management:
MAIN ENDP
```

*(Refined loop with dedicated counter `DX` to avoid `CL` clobbering during shift):*

```assembly
; Cleaned version avoiding CL clobber:
    LEA SI, PACKED_ARR
    LEA DI, UNPACKED_ARR
    MOV DX, 10               ; DX = 10 packed bytes

UNPACK_LOOP:
    MOV AL, [SI]
    MOV BL, AL

    SHR AL, 1
    SHR AL, 1
    SHR AL, 1
    SHR AL, 1                ; AL = Upper nybble
    MOV [DI], AL
    INC DI

    MOV AL, BL
    AND AL, 0FH              ; AL = Lower nybble
    MOV [DI], AL
    INC DI

    INC SI
    DEC DX
    JNZ UNPACK_LOOP

    MOV AX, 4C00H
    INT 21H
```

---

### Q-3(b) [7 Marks] — 8086 Interrupt Handling Steps & Interrupt Vector Table (IVT)

> **Question:**  
> Write the steps to handle interrupts request by 8086 processor. Draw interrupt vector table of 8086 microprocessor and specify the significance of interrupt vector table to handle interrupts.

#### 1. Step-by-Step Interrupt Response Sequence in 8086:
When an interrupt is recognized (hardware `INTR`, `NMI`, or software `INT n`):

1. **Complete Current Instruction:** The processor completes execution of the currently executing instruction.
2. **Acknowledge Interrupt (Hardware only):** For `INTR`, the BIU generates two negative pulses on $\overline{\text{INTA}}$. On the second pulse, the interrupting controller (8259) places the 8-bit vector type $N$ on data lines $D_7$–$D_0$.
3. **Save Processor Flags:** Decrements `SP` by 2 and pushes the 16-bit **Processor Status Word (PSW/FLAGS)** onto the stack.
4. **Disable Future Interrupts:** Automatically clears **$IF = 0$** (disabling maskable interrupts) and **$TF = 0$** (disabling single-step traps).
5. **Save Return Address:**
   - Decrements `SP` by 2 and pushes **`CS`** onto the stack.
   - Decrements `SP` by 2 and pushes **`IP`** (return address of next instruction) onto the stack.
6. **Fetch ISR Starting Address from IVT:**
   - Calculates vector memory address: $\text{IVT Address} = N \times 4$.
   - Loads lower word into `IP` from $N \times 4$ and $N \times 4 + 1$.
   - Loads upper word into `CS` from $N \times 4 + 2$ and $N \times 4 + 3$.
7. **Execute ISR & Return:** Processor executes the service routine until encountering `IRET`, which pops `IP`, `CS`, and `FLAGS` in reverse order.

#### 2. Interrupt Vector Table Diagram
Occupies $00000\text{H}$ to $003\text{FFH}$ (first 1024 bytes of physical memory):

```text
Memory Address:                       Vector Type:
+-------------------------------+ 003FFH
| Vector 255 (CS:IP)            | Type 255 (User Hardware / Software)
+-------------------------------+
|              ...              |
+-------------------------------+ 00080H
| Vector 32 (CS:IP)             | Type 32 (First User Interrupt)
+-------------------------------+ 0007FH
| Reserved by Intel             | Types 5 to 31
+-------------------------------+ 00014H
| Vector 4 (CS:IP)              | Type 4 (INTO Overflow Trap)
+-------------------------------+ 00010H
| Vector 3 (CS:IP)              | Type 3 (One-Byte Breakpoint)
+-------------------------------+ 0000CH
| Vector 2 (CS:IP)              | Type 2 (NMI Pin)
+-------------------------------+ 00008H
| Vector 1 (CS:IP)              | Type 1 (Single Step Trap)
+-------------------------------+ 00004H
| Vector 0 (CS:IP)              | Type 0 (Divide Error)
+-------------------------------+ 00000H
```

---

### Q-3(b) OR [7 Marks] — 8259 Programmable Interrupt Controller (PIC) Block Diagram

> **Question (OR):**  
> Draw block diagram of 8259 Programmable Interrupt Controller and explain each block.

#### 1. Block Diagram

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

#### 2. Explanation of Each Block:

1. **Interrupt Request Register (IRR):** Stores pending interrupt requests arriving on lines `IR0` through `IR7`.
2. **Interrupt Mask Register (IMR):** Stores mask bits programmed via OCW1; disables individual interrupt lines.
3. **In-Service Register (ISR):** Tracks which interrupt level is currently being serviced by the CPU.
4. **Priority Resolver (PR):** Decides whether an incoming request in IRR has higher priority than the level in ISR.
5. **Cascade Buffer/Comparator:** Manages Master/Slave cascading up to 64 lines via `CAS0`–`CAS2` and `SP#/EN#`.
6. **Read/Write and Control Logic:** Decodes bus control signals (`RD#`, `WR#`, `CS#`, $A_0$) and controls handshaking on `INT` and dual $\overline{\text{INTA}}$ pulses.
