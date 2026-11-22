# CE701: Interfacing with Microprocessors — Exam Paper Solutions (February 2022)

**Course:** CE701 — Interfacing with Microprocessors  
**Institution:** Nirma University, Institute of Technology  
**Program:** B.Tech. in Computer Engineering, Semester-VII  
**Exam:** Semester End Examination (IR/RPR) / SPE, February 2022  
**Time Allowed:** 2 Hours  
**Maximum Marks:** 50 Marks  

---

## Table of Contents
- [Question 1 (18 Marks)](#question-1-18-marks)
  - [Q-1(a) [6 Marks] — 8086 Processor Architecture Block Diagram & Explanation](#q-1a-6-marks--8086-processor-architecture-block-diagram--explanation)
  - [Q-1(b) [6 Marks] — Stack Operations in 8086 Assembly Language](#q-1b-6-marks--stack-operations-in-8086-assembly-language)
  - [Q-1(c) [6 Marks] — Physical Address Calculations & Addressing Modes](#q-1c-6-marks--physical-address-calculations--addressing-modes)
- [Question 2 (18 Marks)](#question-2-18-marks)
  - [Q-2(a) [6 Marks] — Syntax & Architectural Error Analysis in 6 Assembly Instructions](#q-2a-6-marks--syntax--architectural-error-analysis-in-6-assembly-instructions)
  - [Q-2(b) [6 Marks] — Assembler Directives: EQU, LABEL, ORG, EVEN](#q-2b-6-marks--assembler-directives-equ-label-org-even)
  - [Q-2(c) [6 Marks] — 8086 Assembly Program: Count Blank Spaces in String](#q-2c-6-marks--8086-assembly-program-count-blank-spaces-in-string)
- [Question 3 (14 Marks)](#question-3-14-marks)
  - [Q-3(a) [7 Marks] — Interrupt Vector Table (IVT) Architecture & Layout](#q-3a-7-marks--interrupt-vector-table-ivt-architecture--layout)
  - [Q-3(a) OR [7 Marks] — 8086 Assembly Program: Multi-Precision Addition of 10 Packed BCD Numbers](#q-3a-or-7-marks--8086-assembly-program-multi-precision-addition-of-10-packed-bcd-numbers)
  - [Q-3(b) [7 Marks] — 8254 PIT Operating Modes (0 to 5) with Practical Applications](#q-3b-7-marks--8254-pit-operating-modes-0-to-5-with-practical-applications)
  - [Q-3(b) OR [7 Marks] — Step-by-Step Stack & Register Trace for INT 8 Instruction](#q-3b-or-7-marks--step-by-step-stack--register-trace-for-int-8-instruction)

---

# Question 1 (18 Marks)

### Q-1(a) [6 Marks] — 8086 Processor Architecture Block Diagram & Explanation

> **Question:**  
> Draw and explain block diagram of 8086 processor architecture.

#### 1. Architectural Block Diagram
The 8086 architecture is divided into two independent, asynchronously operating processing sections: the **Bus Interface Unit (BIU)** and the **Execution Unit (EU)**.

```text
+--------------------------------------------------------------------------+
| BUS INTERFACE UNIT (BIU)                                                 |
|                                                                          |
|  Segment Registers:                                                      |
|  [ CS ] Code Segment           [ IP ] Instruction Pointer                |
|  [ DS ] Data Segment                                                     |
|  [ SS ] Stack Segment                |                                   |
|  [ ES ] Extra Segment                v                                   |
|       |                     20-bit Dedicated Adder                       |
|       +--------------------> (Segment * 16 + Offset)                     |
|                                      |                                   |
|                                      v                                   |
|                        20-bit System Address Bus                         |
|                        (AD0-AD15, A16/S3-A19/S6)                         |
|                                                                          |
|  +----------------------------------------------------+                  |
|  | 6-Byte Instruction FIFO Queue                      |                  |
|  | [Byte 1] [Byte 2] [Byte 3] [Byte 4] [Byte 5] [Byte 6]                 |
|  +-------------------------+--------------------------+                  |
+----------------------------|---------------------------------------------+
                             | 8-bit Prefetched Instruction Stream
+----------------------------v---------------------------------------------+
| EXECUTION UNIT (EU)                                                      |
|                                                                          |
|  [ Instruction Decoder & Machine Cycle Controller ]                      |
|                            |                                             |
|  General Purpose Data:     |   Pointer & Index:                          |
|  [ AH | AL ] (AX)          |   [ SP ] Stack Pointer                      |
|  [ BH | BL ] (BX)          +-> [ BP ] Base Pointer                       |
|  [ CH | CL ] (CX)              [ SI ] Source Index                       |
|  [ DH | DL ] (DX)              [ DI ] Destination Index                  |
|            |                        |                                    |
|            +-----------+------------+                                    |
|                        |                                                 |
|                        v                                                 |
|              [ 16-bit ALU ] <=======> [ 16-bit Flag Register / PSW ]     |
+--------------------------------------------------------------------------+
```

#### 2. Functional Description of Units:

1. **Bus Interface Unit (BIU):**
   - **Role:** Interfaces directly with external memory and peripheral devices.
   - **Segment Registers (`CS`, `DS`, `SS`, `ES`):** Hold the base segment addresses.
   - **Instruction Pointer (`IP`):** Contains the offset of the next instruction byte to fetch.
   - **20-bit Dedicated Adder:** Computes physical address ($\text{Segment Base} \times 16_{10} + \text{Offset}$) in hardware without consuming ALU time.
   - **6-Byte Instruction Queue:** Implements hardware pipelining by prefetching up to 6 bytes of instructions from memory whenever at least 2 bytes in the FIFO queue become vacant while the EU is busy executing.

2. **Execution Unit (EU):**
   - **Role:** Fetches instruction opcodes from the FIFO queue, decodes them, and executes arithmetic/logical operations.
   - **Control Logic & Instruction Decoder:** Decodes instructions into microcode timing signals.
   - **16-bit Arithmetic and Logic Unit (ALU):** Performs 8-bit and 16-bit addition, subtraction, AND, OR, XOR, shifts, and rotates.
   - **General Purpose Registers (`AX`, `BX`, `CX`, `DX`):** Store temporary calculation values.
   - **Pointer and Index Registers (`SP`, `BP`, `SI`, `DI`):** Provide memory offset addresses for stack and data structures.
   - **Flag Register (PSW):** 16-bit register containing 9 active condition and control flags (`CF`, `PF`, `AF`, `ZF`, `SF`, `TF`, `IF`, `DF`, `OF`).

---

### Q-1(b) [6 Marks] — Stack Operations in 8086 Assembly Language

> **Question:**  
> Explain stack operations in 8086 assembly language.

#### 1. Architectural Concept: Downward-Growing Stack
In 8086 architecture, the stack is a Last-In, First-Out (LIFO) data structure located within the **Stack Segment (`SS`)**.  
- The **Stack Pointer (`SP`)** points to the physical byte at the current top-of-stack.
- The 8086 stack **grows downward** (toward lower memory addresses). Pushing decrements `SP`, and popping increments `SP`.
- Stack operations **always operate on 16-bit words** (never single bytes).

```text
Memory Address
    High   +-----------------------+
           | Unused Stack Space    |
           +-----------------------+ <--- Initial SP (e.g., 0100H)
           | Pushed Word 1 (High)  |
           | Pushed Word 1 (Low)   |
           +-----------------------+
           | Pushed Word 2 (High)  |
           | Pushed Word 2 (Low)   |
    Low    +-----------------------+ <--- Current SP after Pushes
```

#### 2. Core Stack Instructions & Micro-Operations:

1. **`PUSH Source` (Word Register or Memory):**
   - Micro-operations:
     $$SP \leftarrow SP - 1$$
     $$[SS:SP] \leftarrow \text{High Byte of Operand}$$
     $$SP \leftarrow SP - 1$$
     $$[SS:SP] \leftarrow \text{Low Byte of Operand}$$
   - Effectively: $SP \leftarrow SP - 2$, then writes 16-bit word at `SS:SP`.
   - *Example:* `PUSH AX`, `PUSH [BX]`

2. **`POP Destination` (Word Register or Memory):**
   - Micro-operations:
     $$\text{Low Byte of Operand} \leftarrow [SS:SP]$$
     $$SP \leftarrow SP + 1$$
     $$\text{High Byte of Operand} \leftarrow [SS:SP]$$
     $$SP \leftarrow SP + 1$$
   - Effectively: reads 16-bit word from `SS:SP`, then $SP \leftarrow SP + 2$.
   - *Example:* `POP DX`, `POP [DI]`

3. **`PUSHF` & `POPF`:**
   - `PUSHF`: Pushes entire 16-bit Processor Status Word (PSW/FLAGS) onto stack.
   - `POPF`: Pops 16-bit word from stack directly into the Flag register.

4. **`CALL` & `RET`:**
   - **Near `CALL`:** Pushes 16-bit return `IP` onto stack ($SP \leftarrow SP - 2$). Near `RET` pops it back into `IP`.
   - **Far `CALL`:** Pushes `CS` then `IP` ($SP \leftarrow SP - 4$). Far `RET` pops both `IP` and `CS`.

5. **Stack Frame Referencing via `BP`:**
   - Subroutines access parameters passed on the stack without popping:
     ```assembly
     PUSH BP          ; Save caller's base pointer
     MOV BP, SP       ; Establish new stack frame
     MOV AX, [BP+4]   ; Read parameter 1 passed before call
     MOV BX, [BP+6]   ; Read parameter 2
     ...
     MOV SP, BP       ; Destroy local variables
     POP BP           ; Restore caller's BP
     RET 4            ; Return and clean 4 parameter bytes from stack
     ```

---

### Q-1(c) [6 Marks] — Physical Address Calculations & Addressing Modes

> **Question:**  
> Compute physical address using given register values and also specify the addressing modes for the following instructions:  
> $BX=0222H, DS=1000H, SS=2000H, BP=0111H, DI=0111H$.  
> 1. `MOV CX, [BP]`  
> 2. `MOV [DI + 3111h], AX`  
> 3. `MOV [BX - 5], BL`

#### Formula:
$$\text{Physical Address (PA)} = (\text{Segment Base} \times 10\text{H}) + \text{Effective Address (EA)}$$

---

#### 1. `MOV CX, [BP]`
- **Addressing Mode:** **Based Indirect Addressing Mode**.
- **Default Segment:** Base Pointer `BP` defaults to **Stack Segment (`SS`)**.
  - $\text{Segment Base} = SS = 2000\text{H}$
- **Effective Address:** $\text{EA} = [BP] = 0111\text{H}$
- **Physical Address:**
  $$\text{PA} = (2000\text{H} \times 10\text{H}) + 0111\text{H} = 20000\text{H} + 0111\text{H} = \mathbf{20111}\text{H}$$
- Accesses 16-bit word: Low byte (`CL`) from $\mathbf{20111}\text{H}$, High byte (`CH`) from $\mathbf{20112}\text{H}$.

---

#### 2. `MOV [DI + 3111h], AX`
- **Addressing Mode:** **Indexed Relative Addressing Mode** (Indexed with 16-bit Displacement).
- **Default Segment:** Destination Index `DI` defaults to **Data Segment (`DS`)**.
  - $\text{Segment Base} = DS = 1000\text{H}$
- **Effective Address:**
  $$\text{EA} = [DI] + 3111\text{H} = 0111\text{H} + 3111\text{H} = 3222\text{H}$$
- **Physical Address:**
  $$\text{PA} = (1000\text{H} \times 10\text{H}) + 3222\text{H} = 10000\text{H} + 3222\text{H} = \mathbf{13222}\text{H}$$
- Writes 16-bit word: Low byte (`AL`) to $\mathbf{13222}\text{H}$, High byte (`AH`) to $\mathbf{13223}\text{H}$.

---

#### 3. `MOV [BX - 5], BL`
- **Addressing Mode:** **Based Relative Addressing Mode** (Based with Negative Displacement).
- **Default Segment:** Base register `BX` defaults to **Data Segment (`DS`)**.
  - $\text{Segment Base} = DS = 1000\text{H}$
- **Effective Address:**
  $$\text{EA} = [BX] - 5 = 0222\text{H} - 0005\text{H} = 021\text{DH}$$
- **Physical Address:**
  $$\text{PA} = (1000\text{H} \times 10\text{H}) + 021\text{DH} = 10000\text{H} + 021\text{DH} = \mathbf{1021D}\text{H}$$
- Writes 8-bit byte from `BL` into physical memory address $\mathbf{1021D}\text{H}$.

---

# Question 2 (18 Marks)

### Q-2(a) [6 Marks] — Syntax & Architectural Error Analysis in 6 Assembly Instructions

> **Question:**  
> Find the error in the following instructions: (`VAR1` and `VAR2` are word variables.)  
> 1. `AAA DX`  
> 2. `XOR AL, VAR1`  
> 3. `ADD VAR1, VAR2`  
> 4. `DIV 2`  
> 5. `INC [BX]`  
> 6. `MUL AX, VAR2`

#### Technical Analysis & Corrections:

1. **`AAA DX`**
   - **Error:** **Instruction takes no operands.**
   - *Explanation:* ASCII Adjust After Addition (`AAA`) is an implicit single-byte instruction (opcode `37H`). It implicitly checks and adjusts accumulator registers `AL` and `AH`. Specifying an explicit operand like `DX` is illegal.
   - *Correction:* `AAA`

2. **`XOR AL, VAR1`**
   - **Error:** **Operand Size Mismatch.**
   - *Explanation:* `AL` is an 8-bit byte register, whereas `VAR1` is explicitly defined as a 16-bit `WORD` variable. 8086 instructions require both operands to have identical data types.
   - *Correction:* `XOR AX, VAR1` (for 16-bit) or `XOR AL, BYTE PTR VAR1` (for 8-bit).

3. **`ADD VAR1, VAR2`**
   - **Error:** **Memory-to-Memory operation is not permitted.**
   - *Explanation:* The 8086 instruction set architecture allows at most one memory operand per instruction. Both source and destination cannot reside in memory simultaneously.
   - *Correction:*
     ```assembly
     MOV AX, VAR2
     ADD VAR1, AX
     ```

4. **`DIV 2`**
   - **Error:** **Immediate divisor is illegal in 8086.**
   - *Explanation:* In the 8086 instruction set, division instructions (`DIV`, `IDIV`) do not accept immediate operands. The divisor must reside in a general-purpose register or a memory location.
   - *Correction:*
     ```assembly
     MOV BL, 2
     DIV BL          ; Divides AX by BL
     ```

5. **`INC [BX]`**
   - **Error:** **Ambiguous operand size (Cannot determine memory pointer type).**
   - *Explanation:* Since `[BX]` points to memory and there is no accompanying register to provide operand size context, the assembler cannot determine whether to increment an 8-bit byte (`BYTE PTR`) or a 16-bit word (`WORD PTR`).
   - *Correction:* `INC BYTE PTR [BX]` or `INC WORD PTR [BX]`.

6. **`MUL AX, VAR2`**
   - **Error:** **Invalid operand count for `MUL`.**
   - *Explanation:* The 8086 unsigned multiplication instruction `MUL` accepts **only a single operand** (`MUL source`). The multiplicand is implicitly assumed to be in `AL` (for 8-bit) or `AX` (for 16-bit). Two-operand `MUL` is invalid.
   - *Correction:*
     ```assembly
     MOV AX, VAR1    ; Ensure multiplicand is in AX
     MUL VAR2        ; Multiplies AX by VAR2, result in DX:AX
     ```

---

### Q-2(b) [6 Marks] — Assembler Directives: EQU, LABEL, ORG, EVEN

> **Question:**  
> Explain following assembler directives in brief:  
> `EQU`, `LABEL`, `ORG`, `EVEN`.

#### 1. `EQU` (Equate Directive):
- **Function:** Assigns a symbolic name to a numerical constant, register, or string expression. The assembler replaces every occurrence of the symbol with the assigned value at assembly time without allocating physical memory.
- **Example:**
  ```assembly
  MAX_STUDENTS EQU 60
  CR           EQU 0DH
  MOV CX, MAX_STUDENTS   ; Assembles to MOV CX, 60
  ```

#### 2. `LABEL` Directive:
- **Function:** Defines an alternate name and type attribute (`BYTE`, `WORD`, `DWORD`, `FAR`, `NEAR`) for the current location counter ($) without reserving new memory storage.
- **Example:**
  ```assembly
  ARRAY_WORDS LABEL WORD      ; Access 100 bytes as 50 words
  ARRAY_BYTES DB 100 DUP(0)
  MOV AX, ARRAY_WORDS         ; Fetches 16-bit word from offset 0
  ```

#### 3. `ORG` (Origin Directive):
- **Function:** Sets the assembler's Location Counter ($) to a specified numerical offset value within the current segment.
- **Significance:** Standard for MS-DOS `.COM` executable files, which require the code segment origin set to offset `100H` (to leave room for the 256-byte Program Segment Prefix - PSP).
- **Example:**
  ```assembly
  CSEG SEGMENT
      ORG 100H        ; Start assembling code at offset 0100H
  START:
      MOV AH, 4CH
  CSEG ENDS
  ```

#### 4. `EVEN` Directive:
- **Function:** Forces the subsequent instruction or data definition to align on an **even memory address boundary** (address divisible by 2). If the current location counter is odd, the assembler advances it by 1 by inserting a dummy `NOP` byte or zero pad byte.
- **Significance:** Enables 16-bit words to be fetched in **one single bus cycle** (4 clocks) rather than two bus cycles (8 clocks).
- **Example:**
  ```assembly
  DATA_SEG SEGMENT
      B_VAL DB 01H     ; Offset 0000H (1 byte)
      EVEN             ; Advances offset counter from 0001H to 0002H
      W_VAL DW 1234H   ; Aligned at even offset 0002H
  DATA_SEG ENDS
  ```

---

### Q-2(c) [6 Marks] — 8086 Assembly Program: Count Blank Spaces in String

> **Question:**  
> Write an assembly language program to count the blank spaces in given string.

#### 1. Concept: Character Scanning & Space Comparison
- String is traversed character by character until the terminating null character (`00H`) or '$' symbol is reached.
- Each character is compared against ASCII space `' '` ($20\text{H}$).
- If a match is found, counter `SPACE_COUNT` is incremented.

#### 2. Assembly Program Implementation

```assembly
;====================================================================
; Program: Count blank spaces (' ', 20H) in a given string
;====================================================================
.MODEL SMALL
.STACK 64

.DATA
    STRING      DB 'Microprocessors and Interfacing CE701 Exam 2022', 0 ; Null-terminated
    SPACE_COUNT DW 0
    MSG_RESULT  DB 0DH, 0AH, 'Total blank spaces = $'

.CODE
MAIN PROC
    MOV AX, @DATA
    MOV DS, AX

    LEA SI, STRING        ; SI points to start of string
    XOR DX, DX            ; DX will accumulate total spaces (initially 0)

SCAN_LOOP:
    MOV AL, [SI]          ; Read current character
    CMP AL, 0             ; Check for end of string (null character)
    JE FINISHED

    CMP AL, ' '           ; Check if character is blank space (20H)
    JNE NOT_A_SPACE

    INC DX                ; Blank space detected, increment count

NOT_A_SPACE:
    INC SI                ; Point to next character
    JMP SCAN_LOOP

FINISHED:
    MOV SPACE_COUNT, DX   ; Store result in memory variable

    ; Display output message
    LEA DX, MSG_RESULT
    MOV AH, 09H
    INT 21H

    ; Print single digit count (for counts <= 9)
    MOV AX, SPACE_COUNT
    ADD AL, '0'
    MOV DL, AL
    MOV AH, 02H
    INT 21H

    ; Exit cleanly
    MOV AX, 4C00H
    INT 21H
MAIN ENDP
END MAIN
```

---

# Question 3 (14 Marks)

### Q-3(a) [7 Marks] — Interrupt Vector Table (IVT) Architecture & Layout

> **Question:**  
> Draw and explain Interrupt vector table.

#### 1. Interrupt Vector Table (IVT) Architecture
The IVT occupies the lowest 1024 bytes of physical memory ($00000\text{H}$ to $003\text{FFH}$) in the 8086 address space:
- Supports **256 distinct interrupt types** (Type 0 to Type 255).
- Each vector requires **4 bytes** (32 bits) storing the Interrupt Service Routine (ISR) entry pointer:
  - Byte 0: `IP` Low Byte
  - Byte 1: `IP` High Byte
  - Byte 2: `CS` Low Byte
  - Byte 3: `CS` High Byte
- Formula:
  $$\text{Vector Physical Address} = \text{Type Number } (N) \times 4$$

```text
Physical Address Range:                 Interrupt Vector Assignment:
+-------------------------------+ 003FFH
| Type 255 Vector (CS:IP)       |       User Available Hardware & Software Interrupts
+-------------------------------+       (Types 32 to 255)
|              ...              |
+-------------------------------+ 00080H
| Type 32 Vector (CS:IP)        |
+-------------------------------+ 0007FH
| Reserved by Intel             |       Reserved for System Growth
+-------------------------------+ 00014H (Types 5 to 31)
| Type 4: INTO (Overflow)       | 00010H
+-------------------------------+ 0000FH
| Type 3: One-Byte Breakpoint   | 0000CH
+-------------------------------+ 0000BH
| Type 2: Non-Maskable (NMI)    | 00008H Dedicated Hardware & Processor Exceptions
+-------------------------------+ 00007H (Types 0 to 4)
| Type 1: Single Step (TF Trap) | 00004H
+-------------------------------+ 00003H
| Type 0: Divide by Zero Error  | 00000H
+-------------------------------+
```

#### 2. Detailed Explanation of Dedicated Vectors (Types 0 to 4):
1. **Type 0 (Divide Error):** Generated automatically by the CPU whenever a `DIV` or `IDIV` instruction produces a quotient that overflows the destination register, or when division by zero is attempted.
2. **Type 1 (Single Step Trap):** Generated automatically after every instruction if the Trap Flag ($TF$) is set to 1. Used by interactive debuggers to pause execution after each step.
3. **Type 2 (NMI — Non-Maskable Interrupt):** Triggered by an external positive edge on the dedicated `NMI` input pin. Cannot be disabled by `CLI`. Used for catastrophic system events (power failure, RAM parity error).
4. **Type 3 (Breakpoint):** Single-byte instruction `INT 3` (opcode `CCH`). Inserted by debuggers over user instructions to set execution breakpoints.
5. **Type 4 (Overflow — INTO):** Conditional software interrupt triggered by the `INTO` instruction if the Overflow Flag ($OF$) is set to 1.

---

### Q-3(a) OR [7 Marks] — 8086 Assembly Program: Multi-Precision Addition of 10 Packed BCD Numbers

> **Question (OR):**  
> Write an assembly language program to add 10 packed BCD numbers.

#### 1. Concept: Packed BCD Addition with `DAA`
- Packed BCD bytes store two decimal digits ($00$–$99$) per byte.
- When two packed BCD numbers are added using binary addition (`ADD` or `ADC`), the result may produce non-BCD values (digits $> 9$ or carries between nybbles).
- The **`DAA` (Decimal Adjust After Addition)** instruction checks `AF` and `CF` and automatically adjusts `AL` to valid packed BCD by adding $06\text{H}$ or $60\text{H}$.
- Carries out of `AL` into the next higher BCD place are captured in `CF` and accumulated into the high byte.

#### 2. Assembly Program Implementation

```assembly
;====================================================================
; Program: Add 10 Packed BCD numbers using DAA instruction
; Array:   10 Packed BCD bytes
; Result:  16-bit Packed BCD sum in DX:AX (or BCD_SUM_HIGH : BCD_SUM_LOW)
;====================================================================
.MODEL SMALL
.STACK 64

.DATA
    BCD_ARRAY    DB 15H, 25H, 35H, 45H, 55H, 10H, 20H, 30H, 40H, 50H ; 10 Packed BCD bytes
    ARRAY_LEN    EQU 10
    BCD_SUM_LOW  DB 0    ; Holds lower 2 BCD digits
    BCD_SUM_HIGH DB 0    ; Holds upper 2 BCD digits (carries)

.CODE
MAIN PROC
    MOV AX, @DATA
    MOV DS, AX

    LEA SI, BCD_ARRAY    ; SI points to start of array
    MOV CX, ARRAY_LEN    ; Counter CX = 10
    XOR AL, AL           ; Clear running BCD sum (lower 2 digits)
    XOR BL, BL           ; Clear carry accumulator (upper 2 digits)

ADD_BCD_LOOP:
    ADD AL, [SI]         ; Binary add next packed BCD byte
    DAA                  ; Decimal Adjust after Addition -> AL is valid BCD!
    JNC NO_BCD_CARRY     ; If no carry out of AL, skip high byte increment

    ; Carry occurred! Increment BCD high byte
    INC BL               ; Accumulate carry
    ; (If BL could exceed 9, use: PUSH AX; MOV AL, BL; ADD AL, 1; DAA; MOV BL, AL; POP AX)

NO_BCD_CARRY:
    INC SI               ; Advance to next packed BCD byte
    LOOP ADD_BCD_LOOP    ; Decrement CX and repeat

    ; Store results
    MOV BCD_SUM_LOW, AL  ; Lower 2 digits
    MOV BCD_SUM_HIGH, BL ; Upper carry digits

    ; Terminate cleanly
    MOV AX, 4C00H
    INT 21H
MAIN ENDP
END MAIN
```

---

### Q-3(b) [7 Marks] — 8254 PIT Operating Modes (0 to 5) with Practical Applications

> **Question:**  
> Discuss different modes of 8254 programmable interval timer and give one application of each.

#### The 6 Operating Modes of the 8254 PIT:

```text
Mode 0: Interrupt on TC       Mode 1: Retriggerable One-Shot
  OUT __________/==========     OUT ======\___________/======
       <-- Count N -->                     <-- Count N -->

Mode 2: Rate Generator        Mode 3: Square Wave Generator
  OUT =====\__/=====\__/===     OUT ======\______/======\____
       <-N->   <-N->                       <-N/2-><-N/2->

Mode 4: Software Strobe       Mode 5: Hardware Strobe
  OUT ============\__/=====     OUT ============\__/=========
       <-- Count N -->               GATE _/--\
```

#### Detailed Mode Descriptions & Applications:

1. **Mode 0: Interrupt on Terminal Count:**
   - *Operation:* When the control word is written, `OUT` goes LOW and remains LOW until the count decrements to 0. At terminal count, `OUT` transitions HIGH and stays HIGH until reloaded. `GATE = 1` enables counting; `GATE = 0` freezes counting.
   - *Application:* **Event Counter / Timeout Interrupt** (e.g., triggering a CPU interrupt after elapsed time).

2. **Mode 1: Hardware Retriggerable One-Shot:**
   - *Operation:* `OUT` is initially HIGH. A positive rising edge on `GATE` triggers the counter, driving `OUT` LOW on the next clock pulse. `OUT` remains LOW for the programmed $N$ clock cycles, then returns HIGH. A new trigger on `GATE` while counting reloads the count and restarts the pulse.
   - *Application:* **Monostable Multivibrator / Pulse Width Modulation (PWM)** for driving servo motors or generating fixed-width reset pulses.

3. **Mode 2: Rate Generator (Divide-by-N Counter):**
   - *Operation:* Acts as a frequency divider. `OUT` remains HIGH for $N-1$ clock periods, drops LOW for exactly **1 clock period**, and then automatically reloads and repeats indefinitely.
   - *Application:* **Real-Time Clock (RTC) Heartbeat / Baud Rate Generator** for serial communication (8251 UART).

4. **Mode 3: Square Wave Generator:**
   - *Operation:* Similar to Mode 2, but produces a periodic **symmetric square wave** with a 50% duty cycle. If $N$ is even, `OUT` stays HIGH for $N/2$ clocks and LOW for $N/2$ clocks. If $N$ is odd, `OUT` is HIGH for $(N+1)/2$ and LOW for $(N-1)/2$.
   - *Application:* **PC Speaker Sound Tone Generation / System Master Clock Generation**.

5. **Mode 4: Software Triggered Strobe:**
   - *Operation:* `OUT` starts HIGH. Once the count is written into the register, counting begins immediately. When count reaches zero, `OUT` pulses LOW for **1 clock period** and immediately goes HIGH again.
   - *Application:* **Software Delay Generator / Digital Delay Line**.

6. **Mode 5: Hardware Triggered Strobe:**
   - *Operation:* `OUT` starts HIGH. Counting does not start until a rising edge occurs on `GATE`. At terminal count, `OUT` pulses LOW for **1 clock period** and returns HIGH. Retriggerable by subsequent GATE rising edges.
   - *Application:* **Hardware-Synchronized Strobe / External Event Sampler** (e.g., triggering an ADC conversion precisely $N$ microseconds after an external sensor trigger).

---

### Q-3(b) OR [7 Marks] — Step-by-Step Stack & Register Trace for INT 8 Instruction

> **Question (OR):**  
> Given that $SP=0100H, SS=0300H, PSW=0240H$ and the content of following location $00020H=0040H$ and $00022H=0100H$ and instruction `INT 8` has an offset of $00A0H$ and segment address is $0900H$, determine the contents of $SP, SS, IP, CS, PSW$ and the top three words on the stack after the interrupt sequence caused by the `INT 8` instruction is executed.

#### 1. Initial State & IVT Resolution:
- Current Registers:
  - Stack Pointer: $SP = 0100\text{H}$
  - Stack Segment: $SS = 0300\text{H}$
  - Processor Status Word: $PSW = 0240\text{H}$
  - Code Segment: $CS = 0900\text{H}$
  - Offset of `INT 8`: $00\text{A0H}$
- `INT 8` is a 2-byte instruction (`CD 08H`).
  - Next sequential instruction address (Return Address):
    $$\text{Return } IP = 00\text{A0H} + 2 = \mathbf{00A2}\text{H}$$
    $$\text{Return } CS = \mathbf{0900}\text{H}$$
- **Vector Base Address in IVT:**
  $$\text{Vector Address} = 8 \times 4 = 32_{10} = \mathbf{00020}\text{H}$$
  - Given IVT Contents:
    - $[00020\text{H}] = \mathbf{0040}\text{H} \implies \text{New } IP$
    - $[00022\text{H}] = \mathbf{0100}\text{H} \implies \text{New } CS$

#### 2. Detailed Interrupt Push Sequence onto Stack:
1. **Push PSW ($0240\text{H}$):**
   - $SP \leftarrow SP - 2 = 0100\text{H} - 2 = \mathbf{00FE}\text{H}$
   - Memory at $[SS:00FE\text{H}] \leftarrow \mathbf{0240}\text{H}$
2. **Clear Control Flags ($IF = 0, TF = 0$):**
   - In initial $PSW = 0240\text{H}$, Bit 9 ($IF$) is 1.
   - Clearing $IF$ and $TF$ yields:
     $$\text{New } PSW = 0240\text{H} \text{ with } IF=0 \implies \mathbf{0040}\text{H}$$
3. **Push Return CS ($0900\text{H}$):**
   - $SP \leftarrow SP - 2 = 00FE\text{H} - 2 = \mathbf{00FC}\text{H}$
   - Memory at $[SS:00FC\text{H}] \leftarrow \mathbf{0900}\text{H}$
4. **Push Return IP ($00A2\text{H}$):**
   - $SP \leftarrow SP - 2 = 00FC\text{H} - 2 = \mathbf{00FA}\text{H}$
   - Memory at $[SS:00FA\text{H}] \leftarrow \mathbf{00A2}\text{H}$
5. **Load New CS and IP:**
   - $IP \leftarrow \mathbf{0040}\text{H}$
   - $CS \leftarrow \mathbf{0100}\text{H}$

#### 3. Summary of Resulting Registers & Stack Contents:

| Register / Memory Location | Value (Hex) | Description |
|:---|:---:|:---|
| **`SP`** | **`00FAH`** | Decremented by 6 bytes (3 word pushes) |
| **`SS`** | **`0300H`** | Unchanged |
| **`IP`** | **`0040H`** | ISR starting offset loaded from IVT $[00020\text{H}]$ |
| **`CS`** | **`0100H`** | ISR segment base loaded from IVT $[00022\text{H}]$ |
| **`PSW`** | **`0040H`** | $IF$ (bit 9) and $TF$ (bit 8) cleared to 0 |
| **Top Word on Stack (`[SS:00FAH]`)** | **`00A2H`** | Return Instruction Pointer (`IP`) |
| **Second Word on Stack (`[SS:00FCH]`)** | **`0900H`** | Return Code Segment (`CS`) |
| **Third Word on Stack (`[SS:00FEH]`)** | **`0240H`** | Saved Processor Status Word (`PSW`) |
