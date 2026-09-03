# Chapter 5 — 8086 Addressing Modes, Machine Encoding & Complete Instruction Set

> **Course Code:** 3CS526CC23  
> **Course Title:** Microprocessor and Interfacing [3 0 2 4]  
> **Governing Standard:** `notes_maker` Skill (Comprehensive Chapter Notes Generator)  
> **Primary Source:** Faculty Lecture Presentations (`3CS526CC23 8086 Architecture.pdf`, `8086_instruction_set_Basic.pdf`, `Assembler Language Instruction Set _part 2.pdf`) & Reference Literature (Liu & Gibson, Brey)  

---

## 1. Chapter Overview

This chapter delivers an exhaustive, textbook-grade presentation of the Intel 8086 16-bit instruction architecture. It covers:
1. The **7 core addressing modes** with effective address calculations, advantages, limitations, and circuit diagrams.
2. The **machine code instruction format** (Opcode, Direction bit $D$, Word bit $W$, Mode bits $\text{MOD}$, Register bits $\text{REG}$, and Register/Memory bits $R/M$), including segment overrides and execution timing penalties (even vs odd memory boundaries).
3. The **complete 8086 instruction set**: Data Transfer, Arithmetic (including BCD/ASCII adjustments), Bitwise Logic, Shift/Rotate operations, Flag Manipulation, and Processor Control instructions.

[Source: 3CS526CC23 8086 Architecture, Slides 34–71; 8086_instruction_set_Basic, Slides 1–36]

---

## 2. 8086 Addressing Modes (Exhaustive Analysis)

An addressing mode defines how the Execution Unit (EU) and Bus Interface Unit (BIU) locate instruction operands. The 8086 supports 7 distinct addressing modes for data operands:

### Summary Comparison Table of Addressing Modes

| Addressing Mode | Effective Address ($EA$) Formula | Physical Address Formula | Advantages | Disadvantages / Constraints | Assembly Example |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **1. Register** | None ($EA = R$) | None (Internal Registers) | Fastest; no memory bus cycles required. | Limited to internal CPU registers. | `MOV BX, DX` |
| **2. Immediate** | None (Part of Opcode) | Code Segment Physical Address | Fast execution; operand is immediately available. | Fixed constant; cannot be modified at runtime. Cannot load directly to Segment Registers. | `MOV AX, 2550H` |
| **3. Direct** | $EA = \text{Disp16}$ | $\text{DS} \times 10\text{H} + \text{Disp16}$ | Simple, direct access to variables. | Fixed memory location; cannot index dynamically. | `MOV DL, [2440H]` |
| **4. Register Indirect**| $EA = [R] \quad (R \in \{\text{BX}, \text{BP}, \text{SI}, \text{DI}\})$ | $\text{DS/SS} \times 10\text{H} + [R]$ | Dynamic pointer access; large addressable space. | Requires extra register setup step; memory bus latency. | `MOV CX, [BX]` |
| **5. Base Relative** | $EA = [\text{Base}] + \text{Disp}$ | $\text{DS/SS} \times 10\text{H} + EA$ | Ideal for records, structures, and stack parameters. | Requires 16-bit address arithmetic calculation. | `MOV AX, [BX + 10H]` |
| **6. Indexed Relative**| $EA = [\text{Index}] + \text{Disp}$ | $\text{DS} \times 10\text{H} + EA$ | Ideal for linear arrays, vectors, and string tables. | Limited to `SI` and `DI` index registers. | `MOV DX, ARRAY[SI]` |
| **7. Base Indexed Relative**| $EA = [\text{Base}] + [\text{Index}] + \text{Disp}$ | $\text{DS/SS} \times 10\text{H} + EA$ | Highly versatile; supports multi-dimensional 2D matrices. | Slowest effective address calculation (up to 12 clock cycles). | `MOV AX, BETA[BX][SI]` |

---

### Detailed Analysis of Each Addressing Mode with Embedded Circuit Diagrams

#### 1. Register Addressing Mode
The operand is stored entirely within one of the internal 8-bit or 16-bit CPU registers.
### Figure 3.5: Register Addressing Mode Circuit Diagram
![Figure 3.5: Register Addressing Mode](../images/8086_addressing_register.png)
- **Mathematical Formula:** $EA = R$ (No memory access required).
- **Valid Registers:** 8-bit (`AL, AH, BL, BH, CL, CH, DL, DH`) or 16-bit (`AX, BX, CX, DX, SP, BP, SI, DI`).
- **Forbidden Transfers:**
  - `MOV BL, BX` $\rightarrow$ **ILLEGAL (Mixed operand widths).**
  - `MOV CS, AX` $\rightarrow$ **ILLEGAL (Code Segment cannot be destination).**
  - `MOV ES, DS` $\rightarrow$ **ILLEGAL (Segment-to-segment register transfer not permitted).**

---

#### 2. Immediate Addressing Mode
The operand is constant numerical data encoded directly into the instruction byte sequence following the opcode.
### Figure 3.6: Immediate Addressing Mode Circuit Diagram
![Figure 3.6: Immediate Addressing Mode](../images/8086_addressing_immediate.png)
- **Constraints:**
  - Cannot move immediate data directly into Segment Registers (`DS, ES, SS, CS`). Must route via general register:
    ```assembly
    MOV AX, 0123H
    MOV DS, AX
    ```
  - Immediate operand width must match destination register width (`MOV AL, 2AAH` is illegal).

---

#### 3. Direct Addressing Mode
The 16-bit effective address ($EA$) is explicitly specified as a constant displacement within square brackets `[ ]`.
### Figure 3.7: Direct Addressing Mode Circuit Diagram
![Figure 3.7: Direct Addressing Mode](../images/8086_addressing_direct.png)
- **Formula:** $\text{Physical Address} = \text{DS} \times 10\text{H} + \text{Disp16}$
- **Worked Example:** If $\text{DS} = 2000\text{H}$ and instruction is `MOV DL, [2440H]`:
  $$\text{Physical Address} = 20000\text{H} + 2440\text{H} = 22440\text{H}$$

---

#### 4. Register Indirect Addressing Mode
The effective address of the operand in memory is held in a base register (`BX`, `BP`) or index register (`SI`, `DI`).
### Figure 3.8: Register Indirect Addressing Mode Circuit Diagram
![Figure 3.8: Register Indirect Addressing Mode](../images/8086_addressing_indirect.png)
- **Segment Association Rules:**
  - `BX`, `SI`, `DI` default to **Data Segment (DS)**.
  - `BP` defaults to **Stack Segment (SS)**.
- **Worked Example:** If $\text{SS} = 2000\text{H}$, $\text{BP} = 0111\text{H}$, instruction is `MOV [BP], DL`:
  $$\text{Physical Address} = 20000\text{H} + 0111\text{H} = 20111\text{H}$$

---

#### 5. Base Relative Addressing Mode
The effective address is computed by adding an 8-bit or 16-bit signed displacement to a Base register (`BX` or `BP`).
### Figure 3.9: Base Relative Addressing Mode Circuit Diagram
![Figure 3.9: Base Relative Addressing Mode](../images/8086_addressing_base_relative.png)
- **Formula:** $EA = [\text{BX/BP}] + \text{Displacement}$
- **Displacement Ranges:** 8-bit signed ($-128$ to $+127$) or 16-bit signed ($-32,768$ to $+32,767$).
- **Worked Example:** If $\text{DS} = 4000\text{H}$, $\text{BX} = 2000\text{H}$, and instruction is `MOV AX, [BX + 10H]`:
  $$EA = 2000\text{H} + 0010\text{H} = 2010\text{H}$$
  $$\text{Physical Address} = 40000\text{H} + 2010\text{H} = 42010\text{H} \quad (\text{Word accessed at } 42010\text{H} \text{ and } 42011\text{H})$$

---

#### 6. Indexed Relative Addressing Mode
The effective address is computed by adding a signed displacement to an Index register (`SI` or `DI`).
### Figure 3.10: Indexed Relative Addressing Mode Circuit Diagram
![Figure 3.10: Indexed Relative Addressing Mode](../images/8086_addressing_indexed_relative.png)
- **Formula:** $EA = [\text{SI/DI}] + \text{Displacement}$ (Default segment: **DS**).
- **Worked Example:** If $\text{DS} = 2000\text{H}$, $\text{SI} = 5000\text{H}$, and $\text{ARRAY} = 1234\text{H}$, instruction `MOV DX, ARRAY[SI]`:
  $$EA = 5000\text{H} + 1234\text{H} = 6234\text{H}$$
  $$\text{Physical Address} = 20000\text{H} + 6234\text{H} = 26234\text{H}$$

---

#### 7. Base Indexed Relative Addressing Mode
Combines one base register (`BX` or `BP`), one index register (`SI` or `DI`), and an optional displacement.
### Figure 3.11: Base Indexed Relative Addressing Mode Circuit Diagram
![Figure 3.11: Base Indexed Relative Addressing Mode](../images/8086_addressing_base_indexed.png)
- **Formula:** $EA = [\text{BX/BP}] + [\text{SI/DI}] + \text{Displacement}$
  - Default Segment is **SS** if `BP` is used; otherwise defaults to **DS**.
- **Worked Example:** If $\text{DS} = 1200\text{H}$, $\text{BX} = 1000\text{H}$, $\text{SI} = 2000\text{H}$, $\text{BETA} = 1234\text{H}$:
  $$EA = 1000\text{H} + 2000\text{H} + 1234\text{H} = 4234\text{H}$$
  $$\text{Physical Address} = 12000\text{H} + 4234\text{H} = 16234\text{H}$$

[Source: 3CS526CC23 8086 Architecture, Slides 34–54]

---

## 3. 8086 Machine Instruction Encoding & Timings

### Figure 3.12: 8086 MOV Machine Instruction Template Format
![Figure 3.12: 8086 MOV Instruction Template Format](../images/8086_instruction_format_mov.png)

An 8086 instruction comprises 1 to 6 bytes:
```text
Byte 1:  [  Opcode (6 bits)  | D | W ]
Byte 2:  [ MOD (2 bits) | REG (3 bits) | R/M (3 bits) ]
Byte 3:  Low-order Displacement / Direct Address Low Byte
Byte 4:  High-order Displacement / Direct Address High Byte
Byte 5:  Low-order Immediate Data (if present)
Byte 6:  High-order Immediate Data (if present)
```

### Bit Fields Explanation

1. **Opcode (6 bits):** Fundamental machine operation code (`100010_2` for general `MOV`).
2. **D (Direction Bit, 1 bit):**
   - $D = 0$: Transfer data **from** `REG` register **to** `R/M` operand.
   - $D = 1$: Transfer data **to** `REG` register **from** `R/M` operand.
3. **W (Word/Byte Bit, 1 bit):**
   - $W = 0$: 8-bit Byte operation.
   - $W = 1$: 16-bit Word operation.
4. **MOD (Mode Field, 2 bits):**
   - $\text{MOD} = 00$: Memory mode, no displacement (except direct addressing if $\text{R/M}=110$).
   - $\text{MOD} = 01$: Memory mode, 8-bit signed displacement follows ($D_8$).
   - $\text{MOD} = 10$: Memory mode, 16-bit displacement follows ($D_{16}$).
   - $\text{MOD} = 11$: Register mode (no memory access; `R/M` specifies second register).
5. **REG Field (3 bits):** Selects register operand according to $W$ bit.

---

### Figure 3.13: 8086 MOD and R/M Encoding Matrix
![Figure 3.13: 8086 MOD and R/M Encoding Matrix](../images/8086_mod_rm_table.png)

#### Register Bit Codes ($W=0$ vs $W=1$)
| Code | $W=0$ (Byte) | $W=1$ (Word) | Segment Register Code |
| :---: | :---: | :---: | :---: |
| `000` | AL | AX | ES (`00`) |
| `001` | CL | CX | CS (`01`) |
| `010` | DL | DX | SS (`10`) |
| `011` | BL | BX | DS (`11`) |
| `100` | AH | SP | - |
| `101` | CH | BP | - |
| `110` | DH | SI | - |
| `111` | BH | DI | - |

---

### Worked Machine Encoding Examples

#### Example 3.1: Encode `MOV CL, [BX]`
- Opcode for `MOV`: `100010`
- Direction: Data moves into `CL` (Register) $\rightarrow D = 1$
- Width: `CL` is 8-bit byte $\rightarrow W = 0$
  $\implies \text{Byte 1} = 1000\,1010_2 = \mathbf{8AH}$
- Mode: Indirect `[BX]` with no displacement $\rightarrow \text{MOD} = 00$
- Register `CL`: $\text{REG} = 001$
- R/M for `[BX]`: $\text{R/M} = 111$
  $\implies \text{Byte 2} = 00\,001\,111_2 = \mathbf{0FH}$
- **Final Machine Code:** `8A 0FH` (2 bytes).

#### Example 3.2: Encode `MOV CS:[BX], DL` (Segment Override Prefix)
When an operand accesses a segment other than its default, the assembler prepends a 1-byte **Segment Override Prefix**:
- Prefix for `CS`: `0010 1110_2 = 2EH`
- Opcode `MOV`: `100010`
- Direction: Data moves from `DL` (REG) to memory $\rightarrow D = 0$
- Width: `DL` is Byte $\rightarrow W = 0$
  $\implies \text{Byte 2} = 1000\,1000_2 = \mathbf{88H}$
- $\text{MOD} = 00$, $\text{REG} = 010$ (`DL`), $\text{R/M} = 111$ (`[BX]`)
  $\implies \text{Byte 3} = 00\,010\,111_2 = \mathbf{17H}$
- **Final Machine Code:** `2E 88 17H` (3 bytes).

---

### Execution Timings & Bus Alignment Penalties

| Addressing Mode / Operation | Basic Clock Cycles | Number of Bus Transfers | Extra Cycles for Odd Address Word |
| :--- | :---: | :---: | :---: |
| **Register to Register** | 3 | 0 | 0 |
| **Immediate to Register**| 4 | 0 | 0 |
| **Memory to Register** | $9 + EA$ | 1 | +4 |
| **Register to Memory** | $16 + EA$ | 2 | +4 |
| **Immediate to Memory** | $17 + EA$ | 2 | +4 |

#### Effective Address ($EA$) Calculation Times
- Direct: **6 cycles**
- Register Indirect: **5 cycles**
- Base or Indexed Relative: **9 cycles**
- Based Indexed Relative: **7 to 12 cycles** ($\text{BP}+\text{DI} = 7$, $\text{BP}+\text{SI}+\text{DISP} = 12$)

#### Critical Bus Boundary Penalty Rule
A 16-bit word aligned at an **even memory address** is transferred across the 16-bit data bus ($D_{15}-D_0$) in **1 bus cycle (4 T-states)** with $\overline{\text{BHE}} = 0$ and $A_0 = 0$.  
A 16-bit word located at an **odd memory address** requires **2 separate bus cycles (8 T-states)**:
1. Low byte read from odd address ($A_0 = 1, \overline{\text{BHE}} = 1$).
2. High byte read from next even address ($A_0 = 0, \overline{\text{BHE}} = 0$).  
This incurs a **4 clock cycle penalty** (+4 cycles) per memory word access!

[Source: 3CS526CC23 8086 Architecture, Slides 55–71]

---

## 4. Complete 8086 Instruction Set Reference

### 4.1 Data Transfer Instructions
**Rule:** Flags are **never affected**, except `SAHF` and `POPF`.

| Mnemonic | Syntax | Operation | Clocks | Flags Affected | Operational Description |
| :--- | :--- | :--- | :---: | :---: | :--- |
| **MOV** | `MOV dst, src` | $(\text{dst}) \leftarrow (\text{src})$ | 2–17 | **None** | Moves byte/word between registers, memory, immediate. |
| **XCHG**| `XCHG dst, src`| $(\text{dst}) \leftrightarrow (\text{src})$ | 3–17 | **None** | Swaps contents. Cannot swap memory to memory directly. |
| **XLAT**| `XLAT` / `XLATB`| $\text{AL} \leftarrow [(\text{BX}) + (\text{AL})]$ | 11 | **None** | Table lookup translation. Converts code in AL via table at BX. |
| **LEA** | `LEA reg16, mem`| $(\text{reg16}) \leftarrow EA$ | 2+EA | **None** | Loads 16-bit effective address (offset) into register. |
| **LDS** | `LDS reg16, mem32`| $(\text{reg16}) \leftarrow (\text{mem})$, $\text{DS} \leftarrow (\text{mem}+2)$ | 16+EA | **None** | Loads 32-bit far pointer into register and DS. |
| **LES** | `LES reg16, mem32`| $(\text{reg16}) \leftarrow (\text{mem})$, $\text{ES} \leftarrow (\text{mem}+2)$ | 16+EA | **None** | Loads 32-bit far pointer into register and ES. |
| **LAHF**| `LAHF` | $\text{AH} \leftarrow \text{Flags}[7..0]$ | 4 | **None** | Copies lower byte of flags ($SF, ZF, AF, PF, CF$) into AH. |
| **SAHF**| `SAHF` | $\text{Flags}[7..0] \leftarrow \text{AH}$ | 4 | $SF, ZF, AF, PF, CF$ | Restores lower flag byte from AH. |
| **IN** | `IN AL/AX, port` | $\text{Acc} \leftarrow (\text{port})$ | 8–14 | **None** | Reads input port directly (8-bit port) or via DX (16-bit port). |
| **OUT** | `OUT port, AL/AX`| $(\text{port}) \leftarrow \text{Acc}$ | 8–14 | **None** | Writes output port directly or via DX. |

---

### 4.2 Arithmetic Instructions
**Rule:** Condition flags ($CF, PF, AF, ZF, SF, OF$) are updated, except where noted.

| Mnemonic | Syntax | Operation | Flags Affected | Important Behavioral Notes |
| :--- | :--- | :--- | :---: | :--- |
| **ADD** | `ADD dst, src` | $\text{dst} \leftarrow \text{dst} + \text{src}$ | All | Standard binary addition. |
| **ADC** | `ADC dst, src` | $\text{dst} \leftarrow \text{dst} + \text{src} + CF$ | All | Multi-precision addition chaining carry. |
| **SUB** | `SUB dst, src` | $\text{dst} \leftarrow \text{dst} - \text{src}$ | All | Standard binary subtraction. |
| **SBB** | `SBB dst, src` | $\text{dst} \leftarrow \text{dst} - \text{src} - CF$ | All | Multi-precision subtraction with borrow. |
| **INC** | `INC dst` | $\text{dst} \leftarrow \text{dst} + 1$ | $OF, SF, ZF, AF, PF$ | **CF IS NOT AFFECTED!** Preserves loop carry state. |
| **DEC** | `DEC dst` | $\text{dst} \leftarrow \text{dst} - 1$ | $OF, SF, ZF, AF, PF$ | **CF IS NOT AFFECTED!** Preserves loop carry state. |
| **NEG** | `NEG dst` | $\text{dst} \leftarrow 0 - \text{dst}$ | All ($CF=1$ if dst $\neq 0$) | Computes 2's complement negation. |
| **CMP** | `CMP op1, op2` | $\text{op1} - \text{op2}$ (Result discarded) | All | Subtracts to set flags; operands remain unaltered. |
| **MUL** | `MUL src` | Byte: $\text{AX} = \text{AL} \times \text{src}$<br>Word: $\text{DX:AX} = \text{AX} \times \text{src}$ | $CF, OF$ ($1$ if high half non-zero) | Unsigned multiplication. Source cannot be immediate. |
| **IMUL**| `IMUL src` | Byte: $\text{AX} = \text{AL} \times \text{src}$<br>Word: $\text{DX:AX} = \text{AX} \times \text{src}$ | $CF, OF$ ($1$ if high half has sign bits) | Signed 2's complement multiplication. |
| **DIV** | `DIV src` | Byte: $\text{AL} = \text{AX}/\text{src}, \text{AH} = \text{rem}$<br>Word: $\text{AX} = \text{DX:AX}/\text{src}, \text{DX} = \text{rem}$ | Undefined | Unsigned division. Quotient too large triggers INT 0! |
| **IDIV**| `IDIV src` | Signed division as above. | Undefined | Remainder adopts sign of dividend. |
| **CBW** | `CBW` | Extends sign bit of AL across AH. | **None** | No operands. Used prior to 8-bit signed division. |
| **CWD** | `CWD` | Extends sign bit of AX across DX. | **None** | No operands. Used prior to 16-bit signed division. |
| **DAA** | `DAA` | Decimal Adjust for Addition | $CF, AF, SF, ZF, PF$ | Adjusts binary sum in AL to BCD format. |
| **DAS** | `DAS` | Decimal Adjust for Subtraction | $CF, AF, SF, ZF, PF$ | Adjusts binary difference in AL to BCD format. |
| **AAA** | `AAA` | ASCII Adjust for Addition | $AF, CF$ ($OF, SF, ZF, PF$ undef) | Adjusts unpacked BCD sum in AL after addition. |
| **AAS** | `AAS` | ASCII Adjust for Subtraction | $AF, CF$ | Adjusts unpacked BCD difference in AL. |
| **AAM** | `AAM` | ASCII Adjust for Multiply | $SF, ZF, PF$ | Unpacks binary product in AL into AH:AL ($AL/10$). |
| **AAD** | `AAD` | ASCII Adjust for Division | $SF, ZF, PF$ | Prepares unpacked BCD in AH:AL for division ($\text{AH}\times 10 + \text{AL}$). |

---

### 4.3 Logical Instructions
**Rule:** $CF = 0$ and $OF = 0$ for all bitwise operations. $SF, ZF, PF$ are updated. $AF$ is undefined.

| Mnemonic | Syntax | Operation | Flags Affected | Typical Use Case |
| :--- | :--- | :--- | :---: | :--- |
| **NOT** | `NOT dst` | $\text{dst} \leftarrow \overline{\text{dst}}$ | **None** | 1's complement bit inversion. |
| **AND** | `AND dst, src` | $\text{dst} \leftarrow \text{dst} \land \text{src}$ | $CF=0, OF=0, SF, ZF, PF$ | Masking / clearing specific bit positions. |
| **OR** | `OR dst, src` | $\text{dst} \leftarrow \text{dst} \lor \text{src}$ | $CF=0, OF=0, SF, ZF, PF$ | Forcing specific bits to 1. |
| **XOR** | `XOR dst, src` | $\text{dst} \leftarrow \text{dst} \oplus \text{src}$ | $CF=0, OF=0, SF, ZF, PF$ | Inverting bits; clearing register (`XOR AX, AX`). |
| **TEST**| `TEST op1, op2`| $\text{op1} \land \text{op2}$ (Result discarded)| $CF=0, OF=0, SF, ZF, PF$ | Checking if specific bit is set without altering operand. |

---

### 4.4 Shift and Rotate Instructions
**Operand Rules:** Count `CNT` must be `1` (immediate) or held in register `CL` for counts $> 1$.

```mermaid
flowchart LR
    subgraph Shift_Left["SHL / SAL: Shift Left"]
        direction LR
        CF1["CF"] <-- "MSB out" -- RegL["D7 ... D0"] <-- "0 shifted in" -- Zero1["0"]
    end

    subgraph Shift_Right["SHR: Shift Logical Right"]
        direction LR
        Zero2["0"] --> "0 shifted in" --> RegR["D7 ... D0"] --> "LSB out" --> CF2["CF"]
    end

    subgraph SAR_Right["SAR: Shift Arithmetic Right"]
        direction LR
        SignBit["Sign (D7)"] --> "Preserve Sign" --> RegSAR["D7 ... D0"] --> "LSB out" --> CF3["CF"]
    end
```

| Mnemonic | Type | Bit Flow Mechanics | Carry Flag (CF) State | Mathematical Interpretation |
| :--- | :--- | :--- | :---: | :--- |
| **SHL / SAL** | Logical/Arith Left | Bits shift left; $0$ enters LSB. | Last bit shifted out of MSB enters CF. | Multiplies unsigned/signed integer by $2^{\text{CNT}}$. |
| **SHR** | Logical Right | Bits shift right; $0$ enters MSB. | Last bit shifted out of LSB enters CF. | Divides unsigned integer by $2^{\text{CNT}}$. |
| **SAR** | Arithmetic Right | Bits shift right; **original MSB is duplicated**. | Last bit shifted out of LSB enters CF. | Divides signed integer by $2^{\text{CNT}}$ (preserves sign). |
| **ROL** | Rotate Left | Circular left: bit out of MSB enters LSB. | CF reflects last bit rotated out of MSB. | Circular bit rotation without data loss. |
| **ROR** | Rotate Right | Circular right: bit out of LSB enters MSB. | CF reflects last bit rotated out of LSB. | Circular bit rotation without data loss. |
| **RCL** | Rotate Left Thru Carry | 9-bit/17-bit loop: MSB $\to$ CF $\to$ LSB. | Old CF bit enters LSB; old MSB enters CF. | Multi-word shifting across registers. |
| **RCR** | Rotate Right Thru Carry| 9-bit/17-bit loop: LSB $\to$ CF $\to$ MSB. | Old CF bit enters MSB; old LSB enters CF. | Multi-word shifting across registers. |

[Source: 8086_instruction_set_Basic, Slides 33–36]

---

## 5. Exam-Oriented Review & High-Frequency Questions

1. **Calculate the execution time for `ADD AX, [BX+SI+0100H]` on a 5 MHz 8086.**  
   *Solution:*
   - Clock period $T = \frac{1}{5\text{ MHz}} = 0.2\,\mu\text{s}$.
   - Memory to register addition: $\text{Base Clocks} = 9 + EA$.
   - $EA$ for Based Indexed Relative ($\text{BX}+\text{SI}+\text{Disp}$) = 11 clock cycles.
   - Total clock cycles (assuming aligned even address) = $9 + 11 = 20\text{ cycles}$.
   - Execution Time = $20 \times 0.2\,\mu\text{s} = \mathbf{4.0\,\mu\text{s}}$. (If at an odd address, $+4\text{ cycles} = 24 \times 0.2\,\mu\text{s} = 4.8\,\mu\text{s}$).

2. **Differentiate between `SUB` and `CMP` instructions.**  
   *Answer:* Both execute $(\text{Destination}) - (\text{Source})$ and update all conditional flags identically. However, `SUB` stores the computed difference in the destination operand, whereas `CMP` discards the result, preserving the destination contents.

3. **Why are `CBW` and `CWD` necessary before executing `IDIV`?**  
   *Answer:* `IDIV` requires the dividend to be twice the bit-width of the divisor ($16\text{-bit AX} \div 8\text{-bit divisor}$, or $32\text{-bit DX:AX} \div 16\text{-bit divisor}$). `CBW` properly sign-extends a signed 8-bit dividend into 16-bit AX, and `CWD` extends a 16-bit signed dividend in AX into 32-bit DX:AX, preventing arithmetic errors from garbage bits in AH or DX.
