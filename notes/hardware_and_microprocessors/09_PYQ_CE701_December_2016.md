# CE701: Interfacing with Microprocessors — December 2016 Solved Paper

> **Institution:** Nirma University, Institute of Technology  
> **Degree & Semester:** B.Tech. in Computer Engineering, Semester-VII  
> **Examination:** Semester End Examination (IR), December 2016  
> **Course Code & Title:** CE701: Interfacing with Microprocessors  
> **Time Allowed:** 3 Hours | **Maximum Marks:** 100 Marks  
> **Instructions:** Attempt all questions. Figures to the right indicate full marks. Use section-wise separate answer books.  

---

# SECTION — I (50 Marks)

---

## Question 1 [18 Marks]

### Q1(a)(1) [4 Marks]
**Question:**  
*What is the purpose of segment register? If the content of DS and BX registers are 2500H and 1000H, respectively, from which memory location will the 8086 fetch the data, while executing instruction `MOV CX, [BX]`?*

#### 1. Concept & Architectural Foundation

- **Purpose of Segment Registers:** The 8086 possesses a 20-bit physical address bus ($2^{20} = 1,048,576\text{ bytes} = 1\text{ MB}$ space), but all internal registers (`AX, BX, CX, DX, SI, DI, BP, SP, IP`) are 16 bits wide. To bridge this gap, memory is organized into **logical segments** of up to 64 KB each. Segment registers (`CS, DS, SS, ES`) store the upper 16 bits of the 20-bit segment base address.
    - **Dynamic Relocation:** Programs can be loaded anywhere in physical memory simply by updating the segment registers without modifying operand offsets.
    - **Logical Separation:** Code (`CS`), Data (`DS`), Stack (`SS`), and Extra/Destination string space (`ES`) remain protected in disjoint memory areas.
- **Physical Address Formula:**

  $\text{Physical Address (PA)} = (\text{Segment Base Register} \times 10\text{H}) + \text{Effective Address (EA)}$

#### 2. Step-by-Step Numerical Calculation

- **Given:**
    - $\text{DS} = 2500\text{H}$
    - $\text{BX} = 1000\text{H}$
    - Instruction: `MOV CX, [BX]` (Destination is a 16-bit word register `CX`).
- **Calculation:**

  $\text{Segment Base Physical Address} = 2500\text{H} \times 10\text{H} = 25000\text{H}$

  $\text{Offset Address (EA)} = \text{BX} = 1000\text{H}$

  $\text{Physical Address for Lower Byte (CL)} = 25000\text{H} + 1000\text{H} = \mathbf{26000\text{H}}$

  $\text{Physical Address for Higher Byte (CH)} = 26000\text{H} + 1 = \mathbf{26001\text{H}}$

- **Final Answer:** The 8086 fetches the low byte (`CL`) from physical memory location **`26000H`** and the high byte (`CH`) from **`26001H`**.

---

### Q1(a)(2) [4 Marks]
**Question:**  
*Write the function of the DF, IF, TF and OF bits in the 8086.*

#### 1. Concept & Table Referred
The 8086 Flag register is 16 bits wide. Bits 8, 9, 10, and 11 represent control and status bits:

| Flag | Name | Bit Position | Type | Hardware Definition & Set Condition |
|:---:|:---:|:---:|:---:|:---|
| **DF** | Direction Flag | Bit 10 | Control | Controls string instruction autoincrement/decrement (`MOVS, LODS, STOS, CMPS, SCAS`).<br>• $\text{DF} = 0$ (`CLD`): Index registers (`SI`, `DI`) auto-increment.<br>• $\text{DF} = 1$ (`STD`): Index registers auto-decrement. |
| **IF** | Interrupt Flag | Bit 9 | Control | Masks/unmasks external hardware interrupt requests arriving on the `INTR` pin.<br>• $\text{IF} = 1$ (`STI`): CPU responds to `INTR` interrupts.<br>• $\text{IF} = 0$ (`CLI`): `INTR` requests are ignored (masked). Does not affect `NMI` or software interrupts. |
| **TF** | Trap Flag | Bit 8 | Control | Enables single-step instruction debugging.<br>• When $\text{TF} = 1$, the CPU internally vectors through **Interrupt Type 1** immediately after executing every single instruction. |
| **OF** | Overflow Flag | Bit 11 | Status | Set ($1$) if the signed result of an arithmetic operation exceeds the representation capacity of the destination register ($-128 \text{ to } +127$ for 8-bit, $-32768 \text{ to } +32767$ for 16-bit). Computed as: $\text{OF} = C_{\text{in}} \oplus C_{\text{out}}$ of the MSB. |

---

### Q1(a)(3) [4 Marks]
**Question:**  
*Whether 8086 architecture is a fixed length instruction or variable length instruction architecture? Justify your answer using MOV instruction template.*

#### 1. Concept & Architecture Verdict

- **Verdict:** The Intel 8086 microprocessor is strictly a **Variable Length Instruction Architecture**.
- **Justification using General MOV Instruction Template:**
  The standard 8086 `MOV` template varies between 2 bytes and 6 bytes depending on the addressing mode, displacement, and immediate data:

```
Byte 1: [Opcode (6 bits)][D (1 bit)][W (1 bit)]
Byte 2: [MOD (2 bits)][REG (3 bits)][R/M (3 bits)]
Byte 3: [Low-order displacement / Low-order data] (Optional)
Byte 4: [High-order displacement / High-order data] (Optional)
Byte 5: [Low-order immediate data] (Optional)
Byte 6: [High-order immediate data] (Optional)
```

- **Concrete Examples:**
    1. `MOV AL, BL` $\to$ **2 Bytes** (`88 D8H`): $\text{MOD}=11\text{b}$, no displacement.
    2. `MOV AX, [BX]` $\to$ **2 Bytes** (`8B 07H`): $\text{MOD}=00\text{b}$, no displacement.
    3. `MOV AL, [BX + 12H]` $\to$ **3 Bytes** (`8A 47 12H`): $\text{MOD}=01\text{b}$, 8-bit displacement.
    4. `MOV AX, [BX + SI + 1234H]` $\to$ **4 Bytes** (`8B 80 34 12H`): $\text{MOD}=10\text{b}$, 16-bit displacement.
    5. `MOV WORD PTR [BX + 1234H], 5678H` $\to$ **6 Bytes** (`C7 87 34 12 78 56H`): $\text{MOD}=10\text{b}$, 16-bit displacement + 16-bit immediate data.
- Since instructions vary dynamically from 1 byte (e.g. `NOP`, `STC`) up to 6 bytes, the instruction length is variable.

---

### Q1(b) [6 Marks]
**Question:**  
*Compare various types of unconditional jump instructions supported by the 8086 microprocessor.*

#### 1. Concept & Comparison Table
Unconditional jumps (`JMP`) transfer program control without evaluating flag conditions. The 8086 supports five types:

| Jump Type | Assembly Syntax | Displacement Size | Target Range | Modifies CS? | Target Address Calculation |
|:---|:---|:---:|:---:|:---:|:---|
| **Short Jump** | `JMP SHORT Label` | 1 Byte (Signed 8-bit) | $-128 \text{ to } +127\text{ bytes}$ | No | $\text{IP} = \text{IP} + \text{SignExtended}(\text{Disp8})$ |
| **Near Direct** | `JMP Label` | 2 Bytes (Signed 16-bit) | $-32768 \text{ to } +32767\text{ bytes}$ | No | $\text{IP} = \text{IP} + \text{Disp16}$ |
| **Near Indirect** | `JMP BX` / `JMP [BX]` | None (Register/Memory) | Anywhere within current 64 KB code segment | No | $\text{IP} = [\text{Register or Memory Pointer}]$ |
| **Far Direct** | `JMP FAR PTR Label` | 4 Bytes (2B IP + 2B CS) | Anywhere in 1 MB physical space | **Yes** | $\text{IP} = \text{Offset}(\text{Label})$, $\text{CS} = \text{Segment}(\text{Label})$ |
| **Far Indirect** | `JMP DWORD PTR [BX]`| Memory doubleword (4 Bytes)| Anywhere in 1 MB physical space | **Yes** | $\text{IP} = [\text{BX}]$, $\text{CS} = [\text{BX} + 2]$ |

---

### Q1(b) OR [6 Marks]
**Question:**  
*Write a set of instructions to initialize stack. What is significance of stack in call and return instruction?*

#### 1. Stack Initialization Code
```assembly
MOV AX, 7000H        ; Load segment base address for stack
MOV SS, AX           ; Initialize Stack Segment register
MOV SP, 0200H        ; Set Stack Pointer to top of stack (512 bytes capacity)
```

#### 2. Significance in CALL and RET

- **Subroutine Call (`CALL`):**
    - **Near CALL:** Decrements `SP` by 2 and pushes the 16-bit return address (`IP` of next instruction) onto the stack:

    $\text{SP} \leftarrow \text{SP} - 2;\quad [\text{SS}:\text{SP}] \leftarrow \text{IP}$

    - **Far CALL:** Decrements `SP` by 4; pushes `CS` first, then pushes `IP`:

    $\text{SP} \leftarrow \text{SP} - 2;\quad [\text{SS}:\text{SP}] \leftarrow \text{CS}$

    $\text{SP} \leftarrow \text{SP} - 2;\quad [\text{SS}:\text{SP}] \leftarrow \text{IP}$

- **Return from Subroutine (`RET` / `RETF`):**
    - Restores the saved execution context from stack back into `IP` (and `CS` for far returns), seamlessly transferring control back to the caller instruction.
    - Allows nested subroutine calls and recursive algorithms without overwriting return vectors.

---

## Question 2 [16 Marks]

### Q2(a) [10 Marks]
**Question:**  
*What is difference between a macro and a procedure? Write a macro to read two digit number from keyboard (similar to atoi() function of 'C' language for two digit only). Hint: input from keyboard is in the form of ASCII code.*

#### 1. Concept: Macro vs Procedure

| Feature | Macro | Procedure |
|:---|:---|:---|
| **Mechanism** | Textual inline code expansion at each invocation point during assembly. | Reusable code block assembled once; reached at runtime via `CALL`. |
| **Memory Consumption** | Increases object code size each time invoked. | Conserves memory (single footprint regardless of call count). |
| **Execution Overhead** | Zero runtime call overhead; executes at maximum speed. | Incurs stack push/pop overhead for `IP`/`CS` parameters. |
| **Parameter Passing** | Preprocessor string substitution. | Passed through registers, dedicated memory, or runtime stack frames. |
| **Directives** | `MACRO ... ENDM` | `PROC ... ENDP` |

#### 2. Macro Implementation (`READ_2DIGIT_ATOI`)
```assembly
; =====================================================================
; Macro: READ_2DIGIT_ATOI
; Description: Reads 2 ASCII digits from keyboard, converts them to an
;              integer (00 to 99), and stores result in destination register/var.
; Formula: Result = (Digit1 - '0') * 10 + (Digit2 - '0')
; =====================================================================
READ_2DIGIT_ATOI MACRO DEST
    LOCAL READ_D1, READ_D2

    ; Read First Character (Tens Digit)
    MOV AH, 01H
    INT 21H             ; AL = ASCII code of 1st digit
    SUB AL, '0'         ; Convert ASCII to numerical value
    MOV BL, 10
    MUL BL              ; AL = Digit1 * 10
    MOV BH, AL          ; Store tens component in BH

    ; Read Second Character (Units Digit)
    MOV AH, 01H
    INT 21H             ; AL = ASCII code of 2nd digit
    SUB AL, '0'         ; Convert ASCII to numerical value

    ; Add tens and units components
    ADD AL, BH          ; AL = (Digit1 * 10) + Digit2
    MOV DEST, AL        ; Store into user destination
ENDM
```

---

### Q2(b)(1) [3 Marks]
**Question:**  
*Is it possible for a segment in the 8086 microprocessor to begin at memory address that is not divisible by 16? Why?*

#### 1. Solution

- **Answer:** **No, it is strictly impossible.**
- **Architectural Reason:** The 8086 Bus Interface Unit (BIU) computes physical addresses by shifting the 16-bit segment register 4 bits to the left (multiplying by $10\text{H} = 16_{10}$):

  $\text{Base Physical Address} = \text{Segment Register} \times 16_{10}$
  Every integer multiplied by 16 has its least significant hexadecimal digit equal to `0H`. Therefore, segments can only begin on 16-byte boundaries (known as **Paragraph Boundaries**).

---

### Q2(b)(2) [3 Marks]
**Question:**  
*Is it possible for two segments to overlap in the 8086? Why?*

#### 1. Solution

- **Answer:** **Yes, segments can fully or partially overlap.**
- **Reason:** Paragraph boundaries occur every 16 bytes, but each segment spans up to 64 KB ($65,536\text{ bytes}$). If two segment registers are loaded with base values differing by less than $1000\text{H}$ ($4096\text{ paragraphs} = 64\text{ KB}$), their memory ranges overlap. For instance, if $\text{DS} = 1000\text{H}$ and $\text{ES} = 1050\text{H}$, their physical regions overlap substantially.

---

### Q2(b) OR [6 Marks]
**Question:**  
*Explain Length, Offset and Even assembler directives.*

#### 1. Solution & Examples

- **`OFFSET`:** Returns the distance in bytes of a variable or label from the beginning of the segment in which it is defined.
    - *Example:* `MOV SI, OFFSET ARRAY` loads the 16-bit effective address of `ARRAY` into `SI`.
- **`LENGTH`:** Returns the number of data items allocated in a single variable statement using the `DUP` operator. If `DUP` is not present, it returns 1.
    - *Example:* `BUFFER DW 50 DUP(0)` $\to$ `MOV CX, LENGTH BUFFER` loads $50$ into `CX`.
- **`EVEN`:** Instructs the assembler to advance the location counter to the next even memory address by inserting a padding byte (`NOP` or null) if the current address is odd.
    - *Significance:* Aligns 16-bit word variables with the 8086 Even Memory Bank ($A_0 = 0$), allowing 16-bit words to be fetched in **one bus cycle** instead of two.

---

## Question 3 [16 Marks]

### Q3(a) [10 Marks]
**Question:**  
*Write an assembly language program to concatenate two strings using a reentrant far procedure in different ASM files. The address of string is passed to the procedure using stack. Describe the stack content at the time of the call and return from the procedure.*

#### 1. Implementation Across Separate Files

##### File 1: `MAIN.ASM`
```assembly
.MODEL LARGE
.STACK 200H

EXTRN STR_CONCAT:FAR    ; Declare far procedure located in secondary module

.DATA
    STR1    DB 'Hello, ', 0
    STR2    DB 'World!$', 0
    DEST    DB 64 DUP(0)

.CODE
START:
    MOV AX, @DATA
    MOV DS, AX
    MOV ES, AX

    ; Push parameters onto stack: 3 Far Pointers (Segment then Offset)
    PUSH SEG STR1
    PUSH OFFSET STR1

    PUSH SEG STR2
    PUSH OFFSET STR2

    PUSH SEG DEST
    PUSH OFFSET DEST

    CALL STR_CONCAT     ; Far Call: Pushes CS, then pushes IP

    ; Display concatenated result
    LEA DX, DEST
    MOV AH, 09H
    INT 21H

    MOV AH, 4CH
    INT 21H
END START
```

##### File 2: `CONCAT.ASM` (Reentrant Far Procedure)
```assembly
.MODEL LARGE
PUBLIC STR_CONCAT

.CODE
STR_CONCAT PROC FAR
    PUSH BP
    MOV BP, SP
    PUSHA               ; Preserve AX, CX, DX, BX, SP, BP, SI, DI
    PUSH DS
    PUSH ES

    ; Load Destination Pointer into ES:DI
    LES DI, [BP+6]      ; [BP+6]=Dest Offset, [BP+8]=Dest Segment

    ; Step 1: Copy First String
    LDS SI, [BP+14]     ; [BP+14]=STR1 Offset, [BP+16]=STR1 Segment
COPY_1:
    LODSB
    CMP AL, 0
    JE PREP_STR2
    STOSB
    JMP COPY_1

PREP_STR2:
    ; Step 2: Copy Second String
    LDS SI, [BP+10]     ; [BP+10]=STR2 Offset, [BP+12]=STR2 Segment
COPY_2:
    LODSB
    STOSB
    CMP AL, `'$'`
    JE CONCAT_DONE
    CMP AL, 0
    JE CONCAT_DONE
    JMP COPY_2

CONCAT_DONE:
    POP ES
    POP DS
    POPA
    POP BP
    RET 12              ; Return and pop 6 parameter words (12 bytes)
STR_CONCAT ENDP
END
```

#### 2. Stack Frame Diagram
```
High Memory
+--------------------------+ [BP + 16] STR1 Segment
+--------------------------+ [BP + 14] STR1 Offset
+--------------------------+ [BP + 12] STR2 Segment
+--------------------------+ [BP + 10] STR2 Offset
+--------------------------+ [BP + 08] DEST Segment
+--------------------------+ [BP + 06] DEST Offset
+--------------------------+ [BP + 04] Caller Return CS (Pushed by Far CALL)
+--------------------------+ [BP + 02] Caller Return IP (Pushed by Far CALL)
+--------------------------+ [BP + 00] Old BP Saved <-- BP points here
Lower Memory
```

---

### Q3(b) [6 Marks]
**Question:**  
*Which of the following are invalid instructions? State the error for each invalid instruction. Assume that all the variables are of word size (16 bits).*

1. `LEA BX, AX`
2. `MOV BX, SUM`
3. `CBW AL, BL`
4. `IMUL BYTE PTR [BX]`
5. `MOVS S1, S2`
6. `ROL [BP], 3`

#### 1. Instruction-by-Instruction Error Analysis

1. `LEA BX, AX`: **Invalid.** The source operand of `LEA` (Load Effective Address) must be a **memory location**, not a register.
2. `MOV BX, SUM`: **Valid.** Transfers the 16-bit word stored in variable `SUM` into register `BX`.
3. `CBW AL, BL`: **Invalid.** `CBW` (Convert Byte to Word) takes **no operands**. It implicitly sign-extends register `AL` into `AX`.
4. `IMUL BYTE PTR [BX]`: **Valid in 8086.** In single-operand format, `IMUL r/m8` multiplies register `AL` by the byte memory operand, storing the signed 16-bit result in `AX`.
5. `MOVS S1, S2`: **Invalid.** The `MOVS` instruction cannot encode memory operands directly in machine language; it strictly operates via fixed pointers `DS:SI` $\to$ `ES:DI`.
6. `ROL [BP], 3`: **Invalid.** Immediate rotation counts greater than 1 cannot be encoded directly in 8086 machine code. Counts $> 1$ must be placed in `CL`: `MOV CL, 3; ROL WORD PTR [BP], CL`.

---

# SECTION — II (50 Marks)

---

## Question 4 [18 Marks]

### Q4(a) [10 Marks]
**Question:**  
*Draw timing diagram of the memory read/write machine cycle(s) of the following instruction: `AND [BX], AL`. Assume DS=D000H and BX=AAAAH.*

#### 1. Architectural Analysis

- **Address Computation:**

  $\text{Physical Address} = \text{D000H} \times 10\text{H} + \text{AAAAH} = \mathbf{\text{DAAAAH}}$

    - Address $\text{DAAAAH}$ is **Even** ($A_0 = 0$).
    - Bank selection: Lower Even Bank ($D_0 - D_7$) active $\implies \overline{\text{BHE}} = 1, A_0 = 0$.
- **Operation Nature:** Read-Modify-Write:
    1. **Cycle 1 (Memory Read):** Fetch byte from $\text{DAAAAH}$ (4 T-states).
    2. **Internal ALU Execution:** Perform bitwise AND with `AL`.
    3. **Cycle 2 (Memory Write):** Write modified byte back to $\text{DAAAAH}$ (4 T-states).

#### 2. Timing Diagram
```
                     |<------ Memory Read Cycle ------>|<------ Memory Write Cycle ----->|
Signals              |   T1   |   T2   |   T3   |   T4   |   T1   |   T2   |   T3   |   T4   |
---------------------+--------+--------+--------+--------+--------+--------+--------+--------+
CLK                  |   _    |   _    |   _    |   _    |   _    |   _    |   _    |   _    |
                     | _| |_  | _| |_  | _| |_  | _| |_  | _| |_  | _| |_  | _| |_  | _| |_  |
ALE                  |~~|__   |________|________|________|~~|__   |________|________|________|
AD0-AD7              | DAAAAH | Float  | Data In from Mem| DAAAAH | Data Out from ALU ALU  |
AD8-AD15             | Status | Float  | Float  | Float  | Status | High-Z | High-Z | High-Z |
A16-A19/S3-S6        | Addr   | Status (S3-S6)  | Status | Addr   | Status (S3-S6)  | Status |
BHE#                 |~~~~~~~ |~~~~~~~~~~~~~~~~~~~~~~~~~|~~~~~~~ |~~~~~~~~~~~~~~~~~~~~~~~~~| (1 = Even Bank)
A0                   |_______ |_________________________|_______ |_________________________| (0 = Even Addr)
RD#                  |~~~~~~~ |________|________|~~~~~~~~|~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|
WR#                  |~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|~~~~~~~ |________|________|~~~~~~~~|
M/IO#                |~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~| (1 = Memory)
DT/R#                |___________________________________|~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~| (0=Read, 1=Write)
DEN#                 |~~~~~~~ |________|________|~~~~~~~~|~~~~~~~ |________|________|~~~~~~~~|
```

---

### Q4(b) [8 Marks]
**Question:**  
*Describe the segmentation based memory access in protected mode in 80286 processor. Clearly describe significance of all the data structures and registers used in the process. How it differs from the real mode memory access?*

#### 1. Concept & Data Structures
In 80286 Protected Mode, memory segmentation transitions from physical base calculations to descriptor-based protection:

1. **Segment Selector (16 bits):** Stored in segment registers (`CS, DS, SS, ES`).
   - Bits 3–15: **Index (13 bits)** $\implies$ Selects 1 of 8,192 descriptors.
   - Bit 2: **Table Indicator (TI)** $\implies$ $0 = \text{GDT}$, $1 = \text{LDT}$.
   - Bits 0–1: **RPL (Requested Privilege Level)** $\implies$ Ring 0 (Kernel) to Ring 3 (User).
2. **Descriptor Table Registers (`GDTR` and `LDTR`):** Store the physical base and limit of the Global and Local Descriptor Tables in RAM.
3. **8-Byte Segment Descriptor:**
   - **Base Address (24 bits):** Physical base location ($16\text{ MB}$ space).
   - **Segment Limit (16 bits):** Maximum offset ($64\text{ KB}$ max).
   - **Access Rights Byte:** Contains Present bit (`P`), Privilege level (`DPL`), Executable/Data descriptor type, and Read/Write rights.

#### 2. Comparison with Real Mode

| Parameter | 8086 / 80286 Real Mode | 80286 Protected Mode |
|:---|:---|:---|
| **Address Generation** | $\text{Segment} \times 16 + \text{Offset}$ | $\text{Descriptor Base Address} + \text{Offset}$ |
| **Address Space** | 1 MB ($00000\text{H} - \text{FFFFF}\text{H}$) | 16 MB physical ($000000\text{H} - \text{FFFFFF}\text{H}$), 1 GB virtual |
| **Protection** | None. Any instruction can overwrite any memory. | 4 Privilege Rings (0–3), limit boundary check, read/write/execute check. |
| **Segment Register Contents**| Physical segment paragraph base. | 16-bit Selector indexing into GDT/LDT. |

---

## Question 5 [16 Marks]

### Q5(a) [10 Marks]
**Question:**  
*Design an interrupt service routine (ISR) that executes in response to the divide overflow. The routine should set the carry flag. Write a main line program that carries out division of two vectors (each having n elements). The dividend vector contains n elements of 16-bit size whereas the divisor vector contains n elements of 8-bit size. If overflow is generated in any division, the result vector should have all the elements FFH; else, the result vector should contain the quotient of the division. Hint: divide overflow corresponds to type-0 interrupt.*

#### 1. Concept & Table Referred

- **Interrupt Type 0 (Divide Overflow):** Triggered automatically by 8086 hardware when a `DIV` instruction produces a quotient exceeding destination capacity (e.g., dividing by zero or quotient $> 255$ for 8-bit divisor).
- **IVT Location:** Bytes $00000\text{H} - 00003\text{H}$ ($\text{Base} = 0 \times 4 = 00000\text{H}$).

#### 2. Complete Assembly Program
```assembly
.MODEL SMALL
.STACK 200H
.DATA
    N           EQU 4
    V1          DW 100, 1000, 200, 300    ; 16-bit dividends
    V2          DB 2, 2, 2, 3             ; 8-bit divisors
    RESULT      DB N DUP(0)
    ERR_FLAG    DB 0

    OLD_IP      DW ?
    OLD_CS      DW ?

.CODE
; ---------------------------------------------------------------------
; Type 0 Interrupt Service Routine
; ---------------------------------------------------------------------
DIV_ISR PROC FAR
    PUSH BP
    MOV BP, SP

    MOV CS:ERR_FLAG, 1      ; Mark error flag

    ; Advance return IP by 2 to bypass the faulting DIV BL instruction
    ; Stack frame: [BP+0]=Old BP, [BP+2]=IP, [BP+4]=CS, [BP+6]=Flags
    ADD WORD PTR [BP+2], 2

    ; Set Carry Flag in saved Flags register on stack
    OR WORD PTR [BP+6], 0001H

    POP BP
    IRET
DIV_ISR ENDP

MAIN PROC
    MOV AX, @DATA
    MOV DS, AX

    ; Install custom Type 0 ISR into IVT
    CLI
    XOR AX, AX
    MOV ES, AX
    MOV AX, ES:[0000H]
    MOV OLD_IP, AX
    MOV AX, ES:[0002H]
    MOV OLD_CS, AX

    MOV WORD PTR ES:[0000H], OFFSET DIV_ISR
    MOV WORD PTR ES:[0002H], CS
    STI

    ; Divide Vector Elements
    XOR SI, SI          ; SI indexes V1 (word step = 2)
    XOR DI, DI          ; DI indexes V2 & RESULT (byte step = 1)
    MOV CX, N

DIV_LOOP:
    MOV AX, V1[SI]
    MOV BL, V2[DI]
    DIV BL              ; Triggers Type 0 if overflow occurs

    CMP ERR_FLAG, 1
    JE OVERFLOW_DETECTED

    MOV RESULT[DI], AL
    ADD SI, 2
    INC DI
    LOOP DIV_LOOP
    JMP RESTORE_EXIT

OVERFLOW_DETECTED:
    ; Fill entire result vector with FFH
    MOV CX, N
    XOR DI, DI
FILL_FF:
    MOV RESULT[DI], 0FFH
    INC DI
    LOOP FILL_FF

RESTORE_EXIT:
    ; Restore original IVT entry
    CLI
    XOR AX, AX
    MOV ES, AX
    MOV AX, OLD_IP
    MOV ES:[0000H], AX
    MOV AX, OLD_CS
    MOV ES:[0002H], AX
    STI

    MOV AH, 4CH
    INT 21H
MAIN ENDP
END MAIN
```

---

### Q5(b) [6 Marks]
**Question:**  
*Discuss the generic memory bank mechanism used in 80x86 microprocessor family. How it improves memory access time? Explain using the example of 8086 microprocessor.*

#### 1. Concept & Architectural Explanation

- **Bank Organization:** The 8086 possesses a 16-bit external data bus ($D_0 - D_{15}$) connected to two physical 512 KB memory banks:
    1. **Even Bank (Lower Bank):** Connected to $D_0 - D_7$, activated when address line $A_0 = 0$.
    2. **Odd Bank (Upper Bank):** Connected to $D_8 - D_{15}$, activated when $\overline{\text{BHE}} = 0$.
- **Performance Improvement (Memory Access Time):**
    - **Aligned Word Transfer:** When a 16-bit word is stored at an **even physical address**, $A_0 = 0$ and $\overline{\text{BHE}} = 0$ simultaneously activate both banks. The CPU transfers all 16 bits in a **single bus cycle (4 T-states)**.
    - In an 8-bit non-banked processor (like 8088/8085), reading a 16-bit word always requires two bus cycles. The 8086 memory banking effectively **doubles memory bandwidth** for aligned data.

---

## Question 6 [16 Marks]

### Q6(a) [6 Marks]
**Question:**  
*Draw and explain the functional block diagram of 8255 Programmable Peripheral Interface.*

#### 1. Functional Blocks
```
             +-------------------------------------------------------+
             |                 Intel 8255A PPI                       |
             |                                                       |
D0-D7 <=====>| Data Bus Buffer              Group A Control =======>| Port A (PA0-PA7)
             |                                                       |
RD#   ------>| Read/Write                   Group A Control =======>| Port C Upper (PC4-PC7)
WR#   ------>| Control Logic                                         |
A0,A1 ------>|                              Group B Control =======>| Port C Lower (PC0-PC3)
CS#   ------>|                                                       |
RESET ------>|                              Group B Control =======>| Port B (PB0-PB7)
             +-------------------------------------------------------+
```

1. **Data Bus Buffer (8-bit bidirectional):** Interfaces internal 8255 circuitry to CPU system data bus ($D_0 - D_7$).
2. **Read/Write Control Logic:** Accepts system inputs ($\overline{\text{CS}}, \overline{\text{RD}}, \overline{\text{WR}}, A_1, A_0, \text{RESET}$) and decodes them to direct internal data flows.
3. **Group A Control:** Configures Port A (8 bits) and Port C Upper ($PC_4 - PC_7$, 4 bits) in Mode 0, 1, or 2.
4. **Group B Control:** Configures Port B (8 bits) and Port C Lower ($PC_0 - PC_3$, 4 bits) in Mode 0 or 1.

---

### Q6(a) OR [6 Marks]
**Question:**  
*Write a program with appropriate comments to generate 1KHz square wave using Counter 1 of 8254 timer. The clock frequency of 8254 is 2MHz. Assume that the address of counter 1 is C000, and that of control register is C003. Hint: mode 3 of 8254 permits square wave generation and the 8-bit control word format is: select counter(2), read/write(2), mode (3), BCD(1).*

#### 1. Calculation & Control Word

- **Count Calculation:**

  $\text{Count } N = \frac{F_{\text{clk}}}{F_{\text{out}}} = \frac{2,000,000\text{ Hz}}{1,000\text{ Hz}} = \mathbf{2000_{10}} = \mathbf{07\text{D}0\text{H}}$

- **Control Word Formulation:**
    - Counter 1 $\to SC_1 SC_0 = \mathbf{01b}$
    - Read/Write LSB then MSB $\to RW_1 RW_0 = \mathbf{11b}$
    - Mode 3 (Square Wave) $\to M_2 M_1 M_0 = \mathbf{011b}$
    - Binary count $\to \text{BCD} = \mathbf{0b}$
    - **Control Word:** `01110110b` = **`76H`**

#### 2. Assembly Program
```assembly
.MODEL SMALL
.CODE
    ; Control Register = C003H, Counter 1 = C000H (as specified in problem)
    MOV DX, 0C003H      ; Control Register I/O Port
    MOV AL, 76H         ; Counter 1, Mode 3, LSB then MSB, Binary
    OUT DX, AL

    ; Write LSB of Count (D0H)
    MOV DX, 0C000H      ; Counter 1 I/O Port
    MOV AL, 0D0H
    OUT DX, AL

    ; Write MSB of Count (07H)
    MOV AL, 07H
    OUT DX, AL
.EXIT
END
```

---

### Q6(b) [6 Marks]
**Question:**  
*How the 8259 Programmable Interrupt Controller enables communication with multiple IO devices through INTR line of the microprocessor. Also explain significance of Interrupt Acknowledgement machine cycle for generating customized response to interrupt from every device.*

#### 1. Interfacing Multiple I/O Devices

- The 8259A PIC accepts up to 8 prioritized interrupt requests ($IR_0 - IR_7$). By cascading up to 8 slave 8259s to a master 8259 using lines $CAS_0 - CAS_2$, up to **64 vectored devices** can share the single CPU `INTR` line.

#### 2. Significance of Dual $\overline{\text{INTA}}$ Machine Cycles

- **Cycle 1:** The CPU asserts the first $\overline{\text{INTA}}$ low pulse. The 8259 resolves priorities among pending requests in its Interrupt Request Register (`IRR`), sets the corresponding bit in the In-Service Register (`ISR`), and locks out lower-priority interrupts. In cascaded setups, the master places the 3-bit cascade ID on lines $CAS_0 - CAS_2$.
- **Cycle 2:** The CPU asserts the second $\overline{\text{INTA}}$ pulse. The active 8259 places its pre-programmed 8-bit Interrupt Vector Type byte onto the data bus ($D_0 - D_7$). The CPU reads this byte, multiplies by 4, and branches to the device's unique ISR.

---

### Q6(b) OR [6 Marks]
**Question:**  
*(i) Draw and explain the functional block diagram of the 8237 Direct Memory Access controller?  
(ii) What is difference between Local Descriptor Table Register (LDTR) and Global Descriptor Table Register (GDTR) in terms of interpretation of their contents?*

#### 1. 8237 DMA Controller Architecture

- **Channels:** 4 independent DMA channels (Channels 0–3).
- **Internal Registers:** Current Address Register, Current Word Count Register, Base Address & Count Registers, Command Register, Mode Register, and Mask Register.
- **Timing & Control:** Drives bus lines ($\text{MEMR}\#$, $\text{MEMW}\#$, $\text{IOR}\#$, $\text{IOW}\#$, $\text{HRQ}$, $\text{HLDA}$). Transfers data directly between I/O peripherals and memory at maximum bus speed without CPU intervention.

#### 2. GDTR vs LDTR Interpretation

| Parameter | GDTR (Global Descriptor Table Register) | LDTR (Local Descriptor Table Register) |
|:---|:---|:---|
| **Content Interpretation** | Holds the **linear base physical address (32-bit)** and table limit (16-bit) directly. | Holds a **16-bit Segment Selector** that indexes into the Global Descriptor Table (GDT). |
| **System Scope** | Single global table shared by all tasks and OS kernel. | Per-task local table; changes automatically during task switches. |
| **Hardware Reloading** | Loaded via `LGDT [mem]` with a 48-bit pseudo-descriptor pointer. | Loaded via `LLDT reg16` with a standard segment selector. |
