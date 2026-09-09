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
3. The **complete 8086 instruction set**: Data Transfer, Arithmetic (including BCD/ASCII adjustments), Bitwise Logic, Shift/Rotate operations, Flag Manipulation, and Processor Control instructions — **every instruction with full assembly code examples**.

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

### Detailed Analysis of Each Addressing Mode

#### 1. Register Addressing Mode
The operand is stored entirely within one of the internal 8-bit or 16-bit CPU registers.
- **Mathematical Formula:** $EA = R$ (No memory access required).
- **Valid Registers:** 8-bit (`AL, AH, BL, BH, CL, CH, DL, DH`) or 16-bit (`AX, BX, CX, DX, SP, BP, SI, DI`).
- **Forbidden Transfers:**
  - `MOV BL, BX` → **ILLEGAL (Mixed operand widths).**
  - `MOV CS, AX` → **ILLEGAL (Code Segment cannot be destination).**
  - `MOV ES, DS` → **ILLEGAL (Segment-to-segment register transfer not permitted).**

```assembly
MOV BX, DX       ; Copy contents of DX into BX (register to register)
MOV AL, BH       ; Copy BH into AL (both 8-bit)
XCHG AX, CX      ; Swap AX and CX (exchange via register mode)
```

---

#### 2. Immediate Addressing Mode
The operand is constant numerical data encoded directly into the instruction byte sequence following the opcode.
- **Constraints:**
  - Cannot move immediate data directly into Segment Registers (`DS, ES, SS, CS`). Must route via general register:
    ```assembly
    MOV AX, 0123H    ; Load immediate into AX
    MOV DS, AX       ; Transfer from AX to DS
    ```
  - Immediate operand width must match destination register width (`MOV AL, 2AAH` is illegal — value exceeds 8-bit range).

```assembly
MOV AX, 2550H    ; Load immediate word 2550H into AX
MOV CL, 04H      ; Load immediate byte 04H into CL (shift count)
MOV BX, -1       ; Load -1 (FFFFh) into BX via sign-extended immediate
ADD AX, 100      ; Add decimal 100 (0064H) to AX
```

---

#### 3. Direct Addressing Mode
The 16-bit effective address ($EA$) is explicitly specified as a constant displacement within square brackets `[ ]`.
- **Formula:** $\text{Physical Address} = \text{DS} \times 10\text{H} + \text{Disp16}$
- **Worked Example:** If $\text{DS} = 2000\text{H}$ and instruction is `MOV DL, [2440H]`:

$$\text{Physical Address} = 20000\text{H} + 2440\text{H} = 22440\text{H}$$

```assembly
MOV DL, [2440H]       ; Load byte at DS:2440H into DL
MOV AX, [1000H]       ; Load word at DS:1000H into AX (reads 2 bytes)
MOV WORD_VAR, CX      ; Store CX into named data variable (direct by name)
ADD AX, COUNT         ; Add memory variable COUNT to AX
```

---

#### 4. Register Indirect Addressing Mode
The effective address of the operand in memory is held in a base register (`BX`, `BP`) or index register (`SI`, `DI`).
- **Segment Association Rules:**
  - `BX`, `SI`, `DI` default to **Data Segment (DS)**.
  - `BP` defaults to **Stack Segment (SS)**.
- **Worked Example:** If $\text{SS} = 2000\text{H}$, $\text{BP} = 0111\text{H}$, instruction is `MOV [BP], DL`:

$$\text{Physical Address} = 20000\text{H} + 0111\text{H} = 20111\text{H}$$

```assembly
MOV CX, [BX]          ; Load word at DS:BX into CX
MOV [DI], AX          ; Store AX at DS:DI
INC BYTE PTR [SI]     ; Increment byte at DS:SI (PTR needed for size)
MOV AL, [BP]          ; Load byte from SS:BP (stack frame)
```

---

#### 5. Base Relative Addressing Mode
The effective address is computed by adding an 8-bit or 16-bit signed displacement to a Base register (`BX` or `BP`).
- **Formula:** $EA = [\text{BX/BP}] + \text{Displacement}$
- **Displacement Ranges:** 8-bit signed ($-128$ to $+127$) or 16-bit signed ($-32,768$ to $+32,767$).
- **Worked Example:** If $\text{DS} = 4000\text{H}$, $\text{BX} = 2000\text{H}$, and instruction is `MOV AX, [BX + 10H]`:

$$EA = 2000\text{H} + 0010\text{H} = 2010\text{H}$$

$$\text{Physical Address} = 40000\text{H} + 2010\text{H} = 42010\text{H}$$

```assembly
MOV AX, [BX + 10H]    ; Load word at DS:(BX+10H)
MOV DL, [BP + 4]      ; Load byte from stack parameter at SS:(BP+4)
ADD CX, [BX + 02H]    ; Add memory word (BX+2 offset) to CX
MOV [BP - 2], AX      ; Store AX into local variable on stack
```

---

#### 6. Indexed Relative Addressing Mode
The effective address is computed by adding a signed displacement to an Index register (`SI` or `DI`).
- **Formula:** $EA = [\text{SI/DI}] + \text{Displacement}$ (Default segment: **DS**).
- **Worked Example:** If $\text{DS} = 2000\text{H}$, $\text{SI} = 5000\text{H}$, and $\text{ARRAY} = 1234\text{H}$, instruction `MOV DX, ARRAY[SI]`:

$$EA = 5000\text{H} + 1234\text{H} = 6234\text{H}$$

$$\text{Physical Address} = 20000\text{H} + 6234\text{H} = 26234\text{H}$$

```assembly
MOV DX, ARRAY[SI]     ; Load word from ARRAY + SI offset
MOV AL, STRING[DI]    ; Load byte from STRING + DI offset
CMP AL, LOOKUP[SI]    ; Compare AL with table entry at SI
MOV TABLE[DI], BL     ; Store BL into lookup table at DI offset
```

---

#### 7. Base Indexed Relative Addressing Mode
Combines one base register (`BX` or `BP`), one index register (`SI` or `DI`), and an optional displacement.
- **Formula:** $EA = [\text{BX/BP}] + [\text{SI/DI}] + \text{Displacement}$
  - Default Segment is **SS** if `BP` is used; otherwise defaults to **DS**.
- **Worked Example:** If $\text{DS} = 1200\text{H}$, $\text{BX} = 1000\text{H}$, $\text{SI} = 2000\text{H}$, $\text{BETA} = 1234\text{H}$:

$$EA = 1000\text{H} + 2000\text{H} + 1234\text{H} = 4234\text{H}$$

$$\text{Physical Address} = 12000\text{H} + 4234\text{H} = 16234\text{H}$$

```assembly
MOV AX, BETA[BX][SI]  ; Load word from BETA + BX + SI (2D array access)
MOV [BP + DI], CL     ; Store CL at SS:(BP+DI) (stack frame indexed)
ADD AX, MATRIX[BX][SI]; Add 2D matrix element to AX
MOV BH, TABLE[BX+SI]  ; Load byte from table using both base and index
```

[Source: 3CS526CC23 8086 Architecture, Slides 34–54]

---

## 3. 8086 Machine Instruction Encoding & Timings

### Figure 3.12: 8086 MOV Machine Instruction Template Format

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

### Register Bit Codes ($W=0$ vs $W=1$)
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
- Direction: Data moves into `CL` (Register) → $D = 1$
- Width: `CL` is 8-bit byte → $W = 0$
  $\implies \text{Byte 1} = 1000\,1010_2 = \mathbf{8AH}$
- Mode: Indirect `[BX]` with no displacement → $\text{MOD} = 00$
- Register `CL`: $\text{REG} = 001$
- R/M for `[BX]`: $\text{R/M} = 111$
  $\implies \text{Byte 2} = 00\,001\,111_2 = \mathbf{0FH}$
- **Final Machine Code:** `8A 0FH` (2 bytes).

#### Example 3.2: Encode `MOV CS:[BX], DL` (Segment Override Prefix)
When an operand accesses a segment other than its default, the assembler prepends a 1-byte **Segment Override Prefix**:
- Prefix for `CS`: `0010 1110_2 = 2EH`
- Opcode `MOV`: `100010`
- Direction: Data moves from `DL` (REG) to memory → $D = 0$
- Width: `DL` is Byte → $W = 0$
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
A 16-bit word aligned at an **even memory address** is transferred in **1 bus cycle (4 T-states)** with $\overline{\text{BHE}} = 0$ and $A_0 = 0$.
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
| **MOV** | `MOV dst, src` | $({\text{dst}}) \leftarrow ({\text{src}})$ | 2–17 | **None** | Moves byte/word between registers, memory, immediate. |
| **XCHG**| `XCHG dst, src`| $({\text{dst}}) \leftrightarrow ({\text{src}})$ | 3–17 | **None** | Swaps contents. Cannot swap memory to memory directly. |
| **XLAT**| `XLAT` / `XLATB`| $\text{AL} \leftarrow [({\text{BX}}) + ({\text{AL}})]$ | 11 | **None** | Table lookup translation. Converts code in AL via table at BX. |
| **LEA** | `LEA reg16, mem`| $({\text{reg16}}) \leftarrow EA$ | 2+EA | **None** | Loads 16-bit effective address (offset) into register. |
| **LDS** | `LDS reg16, mem32`| $({\text{reg16}}) \leftarrow ({\text{mem}})$, $\text{DS} \leftarrow ({\text{mem}}+2)$ | 16+EA | **None** | Loads 32-bit far pointer into register and DS. |
| **LES** | `LES reg16, mem32`| $({\text{reg16}}) \leftarrow ({\text{mem}})$, $\text{ES} \leftarrow ({\text{mem}}+2)$ | 16+EA | **None** | Loads 32-bit far pointer into register and ES. |
| **LAHF**| `LAHF` | $\text{AH} \leftarrow \text{Flags}[7..0]$ | 4 | **None** | Copies lower byte of flags ($SF, ZF, AF, PF, CF$) into AH. |
| **SAHF**| `SAHF` | $\text{Flags}[7..0] \leftarrow \text{AH}$| 4 | $SF, ZF, AF, PF, CF$ | Restores lower flag byte from AH. |
| **IN** | `IN AL/AX, port` | $\text{Acc} \leftarrow ({\text{port}})$ | 8–14 | **None** | Reads input port directly (8-bit port) or via DX (16-bit port). |
| **OUT** | `OUT port, AL/AX`| $({\text{port}}) \leftarrow \text{Acc}$ | 8–14 | **None** | Writes output port directly or via DX. |

#### Code Examples — Data Transfer

```assembly
; ─── MOV: Basic data moves ───────────────────────────────────────────
MOV AX, 1234H         ; Load immediate word into AX
MOV BX, AX            ; Copy AX into BX (register to register)
MOV [2000H], CX       ; Store CX into memory at DS:2000H
MOV DL, [BX]          ; Load byte from DS:BX into DL

; ─── XCHG: Swap values ──────────────────────────────────────────────
XCHG AX, BX           ; Swap AX and BX
XCHG AL, BH           ; Swap AL and BH (byte swap)
XCHG AX, [SI]         ; Swap AX with word at DS:SI

; ─── LEA vs MOV OFFSET ──────────────────────────────────────────────
LEA SI, ARRAY         ; Load OFFSET of ARRAY into SI (computes EA)
MOV SI, OFFSET ARRAY  ; Assembler resolves at link time — identical result

; ─── XLAT: Table lookup translation ─────────────────────────────────
MOV BX, OFFSET ASCII_TABLE  ; BX = base address of translation table
MOV AL, 03H                 ; AL = raw code (index into table)
XLAT                         ; AL = ASCII_TABLE[BX + 03H]

; ─── LDS/LES: Load far pointers ──────────────────────────────────────
LDS SI, FAR_POINTER   ; SI = word at [FAR_POINTER], DS = word at [FAR_POINTER+2]
LES DI, DEST_PTR      ; DI = word at [DEST_PTR], ES = word at [DEST_PTR+2]

; ─── IN/OUT: I/O port access ─────────────────────────────────────────
IN  AL, 60H           ; Read byte from I/O port 60H (keyboard data)
OUT 80H, AL           ; Write AL to I/O port 80H (debug port)
MOV DX, 03F8H         ; For 16-bit port address
IN  AL, DX            ; Read from COM1 serial port
OUT DX, AL            ; Write AL to COM1

; ─── LAHF/SAHF: Save and restore flags ──────────────────────────────
LAHF                  ; AH = SF:ZF:x:AF:x:PF:x:CF (lower 8 flag bits)
; ... do some work ...
SAHF                  ; Restore SF, ZF, AF, PF, CF from AH
```

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

#### Code Examples — Arithmetic

```assembly
; ─── ADD / ADC: Addition ─────────────────────────────────────────────
ADD AX, 2020H         ; AX = AX + 2020H
ADD AL, BL            ; AL = AL + BL (byte addition)
ADD AX, [BX]          ; AX = AX + word at DS:BX

; 32-bit addition using ADC (two 16-bit words):
; NUM1 is at [2000H] (low) and [2002H] (high)
; NUM2 is at [3000H] (low) and [3002H] (high)
MOV AX, [2000H]       ; Load low word of NUM1
ADD AX, [3000H]       ; Add low word of NUM2 → sets CF if carry
MOV [4000H], AX       ; Store low word of sum
MOV AX, [2002H]       ; Load high word of NUM1
ADC AX, [3002H]       ; Add high word of NUM2 + carry → CF chains carry
MOV [4002H], AX       ; Store high word of sum

; ─── SUB / SBB: Subtraction ─────────────────────────────────────────
SUB AX, 1000H         ; AX = AX - 1000H
SUB BX, CX            ; BX = BX - CX
CMP AX, BX            ; Flags = AX - BX (no change to AX or BX)

; Multi-word 32-bit subtraction:
MOV AX, [2000H]       ; Low word of minuend
SUB AX, [3000H]       ; Subtract low word of subtrahend → CF = borrow
MOV [4000H], AX
MOV AX, [2002H]       ; High word of minuend
SBB AX, [3002H]       ; Subtract high word with borrow chained
MOV [4002H], AX

; ─── INC / DEC: Increment and Decrement ─────────────────────────────
INC AX                ; AX = AX + 1 (CF NOT affected!)
DEC CX                ; CX = CX - 1 (CF NOT affected!)
INC BYTE PTR [BX]     ; Increment byte at DS:BX
DEC WORD PTR [SI]     ; Decrement word at DS:SI

; ─── NEG: Negate ─────────────────────────────────────────────────────
NEG AX                ; AX = 0 - AX (two's complement)
NEG BL                ; BL = -BL

; ─── MUL / IMUL: Multiplication ──────────────────────────────────────
; Unsigned 8-bit: AL * BL → AX
MOV AL, 0AH           ; AL = 10
MOV BL, 05H           ; BL = 5
MUL BL                ; AX = AL * BL = 10 * 5 = 50 = 0032H

; Signed 16-bit: AX * CX → DX:AX
MOV AX, 1000H         ; AX = 1000H (4096)
MOV CX, 0002H         ; CX = 2
IMUL CX               ; DX:AX = 4096 * 2 = 8192 = 00002000H

; ─── DIV / IDIV: Division ────────────────────────────────────────────
; Unsigned 8-bit: AX / BL → AL (quotient), AH (remainder)
MOV AX, 0203H         ; AX = 0203H (515 decimal)
MOV BL, 04H           ; BL = 4
DIV BL                ; AL = 0203H / 04H = 80H (128), AH = 03H (3)

; Signed 16-bit: DX:AX / CX → AX (quotient), DX (remainder)
MOV AX, 1000H         ; Low word of dividend
MOV DX, 0000H         ; High word (clear for unsigned-range signed value)
MOV CX, 0010H         ; Divisor = 0010H = 16
IDIV CX               ; AX = 0100H (256), DX = 0000H

; ─── CBW / CWD: Sign Extension ───────────────────────────────────────
MOV AL, 80H           ; AL = 80H = -128 signed
CBW                   ; AX = FF80H (sign-extended to word)
MOV AX, 8000H         ; AX = 8000H = -32768 signed
CWD                   ; DX:AX = FFFF:8000H (sign-extended to doubleword)

; ─── BCD Adjustments ────────────────────────────────────────────────
; DAA — After binary ADD of two BCD bytes:
MOV AL, 36H           ; AL = BCD 36
ADD AL, 47H           ; Binary sum: AL = 7DH (incorrect for BCD!)
DAA                   ; DAA corrects: AL = 83H (BCD 36 + 47 = 83), CF=0

; AAA — After binary ADD of two unpacked BCD digits:
MOV AL, 09H           ; Unpacked BCD 9
ADD AL, 06H           ; Binary: AL = 0FH
AAA                   ; AAA corrects: AL = 05H, AH = AH + 1 (carry to tens)
```

---

### 4.3 Logical Instructions
**Rule:** $CF = 0$ and $OF = 0$ for all bitwise operations. $SF, ZF, PF$ are updated. $AF$ is undefined.

| Mnemonic | Syntax | Operation | Flags Affected | Typical Use Case |
| :--- | :--- | :--- | :---: | :--- |
| **NOT** | `NOT dst` | $\text{dst} \leftarrow \overline{\text{dst}}$ | **None** | 1's complement bit inversion. |
| **AND** | `AND dst, src` | $\text{dst} \leftarrow \text{dst} \land \text{src}$ | $CF=0, OF=0, SF, ZF, PF$ | Masking / clearing specific bit positions. |
| **OR** | `OR dst, src` | $\text{dst} \leftarrow \text{dst} \lor \text{src}$ | $CF=0, OF=0, SF, ZF, PF$ | Forcing specific bits to 1. |
| **XOR** | `XOR dst, src` | $\text{dst} \leftarrow \text{dst} \oplus \text{src}$ | $CF=0, OF=0, SF, ZF, PF$ | Inverting bits; clearing register (`XOR AX, AX`). |
| **TEST**| `TEST op1, op2`| $\text{op1} \land \text{op2}$ (Result discarded) | $CF=0, OF=0, SF, ZF, PF$ | Checking if specific bit is set without altering operand. |

#### Code Examples — Logical Operations

```assembly
; ─── NOT: One's Complement ──────────────────────────────────────────
NOT AL                ; AL = ~AL  (all bits flipped; no flags changed)
NOT AX                ; AX = ~AX

; ─── AND: Bit Masking (Clear specific bits) ──────────────────────────
; Clear bits 3 and 4 of AL (mask = 1110 0111 = E7H):
AND AL, 0E7H          ; Bits 3,4 of AL = 0; other bits unchanged

; Extract lower nibble (bits 0-3) from AX:
AND AX, 000FH         ; AX = AX & 000FH → only lower 4 bits remain

; Verify a flag is byte-aligned (force even address in BX):
AND BX, 0FFFEH        ; Clear bit 0 of BX → make even

; ─── OR: Bit Setting (Force specific bits to 1) ──────────────────────
; Set bits 0 and 2 of DL (mask = 0000 0101 = 05H):
OR DL, 05H            ; Bits 0,2 of DL = 1; other bits unchanged

; Convert lowercase ASCII to uppercase (clear bit 5):
MOV AL, 'a'           ; AL = 61H = 0110 0001
AND AL, 0DFH          ; Clear bit 5: AL = 41H = 'A'

; Convert uppercase to lowercase (set bit 5):
MOV AL, 'A'           ; AL = 41H
OR AL, 20H            ; Set bit 5: AL = 61H = 'a'

; ─── XOR: Bit Toggling / Clearing ────────────────────────────────────
; Clear AX efficiently (fastest zero-fill):
XOR AX, AX            ; AX = AX ^ AX = 0000H (also clears ZF=1, CF=0)

; Toggle bits 1 and 6 of DL (mask = 0100 0010 = 42H):
XOR DL, 42H           ; Bits 1,6 flip; other bits unchanged

; Simple encryption/decryption (XOR cipher with key):
MOV AL, 'S'           ; Plaintext character
XOR AL, 55H           ; Encrypted: AL = 06H
XOR AL, 55H           ; Decrypted back: AL = 'S' (XOR is its own inverse)

; ─── TEST: Non-Destructive Bit Inspection ────────────────────────────
; Test if bit 7 (Sign/Negative flag) is set in AL:
TEST AL, 80H          ; ZF=0 if bit 7 is set, ZF=1 if bit 7 is clear
JNZ NEGATIVE          ; Jump if bit 7 was set (non-zero AND result)

; Test if AL is zero without modifying it:
TEST AL, 0FFH         ; ZF=1 if AL=00H; ZF=0 if AL non-zero
JZ IS_ZERO

; Test if bit 0 (LSB) is set — check for odd number:
TEST BL, 01H          ; ZF=0 if BL is odd, ZF=1 if even
JNZ IS_ODD

; ─── Combined Bit Manipulation Program ──────────────────────────────
; Task: Set bits 0,2; toggle bits 1,6; clear bits 3,4; test bits 1,7
OR  DL, 00000101B     ; Set bits 0 and 2 of DL (mask: 05H)
XOR DL, 01000010B     ; Toggle bits 1 and 6 of DL (mask: 42H)
AND DL, 11100111B     ; Clear bits 3 and 4 of DL (mask: E7H)
TEST DL, 10000010B    ; Non-destructively test bits 1 and 7
JZ  EXIT              ; Jump if tested bits are both zero
; (fall through if one or both tested bits are set)
```

---

### 4.4 Shift and Rotate Instructions
**Operand Rules:** Count `CNT` must be `1` (immediate) or held in register `CL` for counts $> 1$.

```mermaid
flowchart LR
    subgraph Shift_Left["SHL / SAL: Shift Left"]
        direction LR
        CF1[CF] <--|MSB out| RegL["D7 ... D0"] <--|0 shifted in| Zero1[0]
    end

    subgraph Shift_Right["SHR: Shift Logical Right"]
        direction LR
        Zero2[0] -->|0 shifted in| RegR["D7 ... D0"] -->|LSB out| CF2[CF]
    end

    subgraph SAR_Right["SAR: Shift Arithmetic Right"]
        direction LR
        SignBit["Sign (D7)"] -->|Preserve Sign| RegSAR["D7 ... D0"] -->|LSB out| CF3[CF]
    end
```

| Mnemonic | Type | Bit Flow Mechanics | Carry Flag (CF) State | Mathematical Interpretation |
| :--- | :--- | :--- | :---: | :--- |
| **SHL / SAL** | Logical/Arith Left | Bits shift left; $0$ enters LSB. | Last bit shifted out of MSB enters CF. | Multiplies unsigned/signed integer by $2^{\text{CNT}}$. |
| **SHR** | Logical Right | Bits shift right; $0$ enters MSB. | Last bit shifted out of LSB enters CF. | Divides unsigned integer by $2^{\text{CNT}}$. |
| **SAR** | Arithmetic Right | Bits shift right; **original MSB is duplicated**. | Last bit shifted out of LSB enters CF. | Divides signed integer by $2^{\text{CNT}}$ (preserves sign). |
| **ROL** | Rotate Left | Circular left: bit out of MSB enters LSB. | CF reflects last bit rotated out of MSB. | Circular bit rotation without data loss. |
| **ROR** | Rotate Right | Circular right: bit out of LSB enters MSB. | CF reflects last bit rotated out of LSB. | Circular bit rotation without data loss. |
| **RCL** | Rotate Left Thru Carry | 9-bit/17-bit loop: MSB → CF → LSB. | Old CF bit enters LSB; old MSB enters CF. | Multi-word shifting across registers. |
| **RCR** | Rotate Right Thru Carry| 9-bit/17-bit loop: LSB → CF → MSB. | Old CF bit enters MSB; old LSB enters CF. | Multi-word shifting across registers. |

#### Code Examples — Shift & Rotate

```assembly
; ─── SHL / SAL: Logical/Arithmetic Shift Left ───────────────────────
; Shift left by 1 = multiply by 2:
MOV AX, 0004H         ; AX = 4
SHL AX, 1             ; AX = 0008H (4 * 2 = 8), CF = 0

; Multiply AX by 8 (2^3): use CL for count > 1
MOV AX, 0003H         ; AX = 3
MOV CL, 3             ; Shift count = 3
SHL AX, CL            ; AX = 0018H (3 * 8 = 24)

; Compact bit manipulation — shift to align nibble in upper byte:
MOV AL, 0FH           ; AL = 0000 1111
SHL AL, 4             ; AL = 1111 0000 (nibble moved to upper position)

; ─── SHR: Logical Shift Right (Unsigned division) ────────────────────
; Divide AX by 4 (2^2):
MOV AX, 0010H         ; AX = 16
MOV CL, 2
SHR AX, CL            ; AX = 0004H (16 / 4 = 4), zeros fill from left

; Isolate high nibble of AL:
MOV AL, 0B3H          ; AL = 1011 0011
SHR AL, 4             ; AL = 0000 1011 (high nibble now in low position)

; ─── SAR: Arithmetic Shift Right (Signed division) ───────────────────
; Divide signed AX (-16 = FFF0H) by 2:
MOV AX, 0FFF0H        ; AX = -16 in 2's complement
SAR AX, 1             ; AX = FFF8H = -8 (sign bit preserved!)

; Convert signed byte AL to absolute value (floor division):
MOV AL, 0C0H          ; AL = -64 in signed
SAR AL, 2             ; AL = 0F0H = -16 (signed division by 4)

; ─── ROL: Rotate Left (no data loss) ────────────────────────────────
; Rotate AL left by 1 position:
MOV AL, 10110001B     ; AL = B1H
ROL AL, 1             ; AL = 01100011 = 63H, CF = 1 (bit 7 came out)

; Circular left rotation by 4 (swap nibbles):
MOV AL, 0ABH          ; AL = 1010 1011
MOV CL, 4
ROL AL, CL            ; AL = 1011 1010 = BAH (nibbles swapped)

; ─── ROR: Rotate Right ───────────────────────────────────────────────
MOV AL, 11000110B     ; AL = C6H
ROR AL, 1             ; AL = 01100011 = 63H, CF = 0 (LSB came out)

; Test if AL is a palindrome in binary (same forward/backward):
MOV AL, 10011001B     ; AL = 99H (palindrome bits!)
MOV CL, 4
ROR AL, CL            ; AL = 10011001B — identical! (confirm by CMP)
CMP AL, 99H
JE IS_PALINDROME      ; Jump if rotated == original

; ─── RCL: Rotate Left Through Carry ─────────────────────────────────
; 17-bit (AX + CF) left rotate for multi-word shift:
CLC                   ; CF = 0 (clear carry to start clean)
MOV AX, 8001H         ; AX = 1000 0000 0000 0001
RCL AX, 1            ; AX = 0000 0000 0000 0011, CF = 1 (old bit 15 → CF)

; 32-bit left shift via two 16-bit registers (DX:AX):
; Shift 32-bit value in DX:AX left by 1:
SHL AX, 1             ; Shift AX left; old bit 15 of AX goes into CF
RCL DX, 1             ; Shift DX left; CF (from AX's old bit 15) → DX bit 0

; ─── RCR: Rotate Right Through Carry ────────────────────────────────
; 32-bit right shift via two registers (DX:AX):
; Shift 32-bit value in DX:AX right by 1:
SHR DX, 1             ; Shift DX right; old bit 0 of DX → CF
RCR AX, 1             ; Shift AX right; CF (from DX's old bit 0) → AX bit 15
```

[Source: 8086_instruction_set_Basic, Slides 33–36]

---

### 4.5 String Manipulation Instructions

String operations automatically utilize source index `SI` (relative to `DS`) and destination index `DI` (relative to `ES`). The Direction Flag (`DF`) controls pointer auto-increment (`CLD` via `DF=0`) or auto-decrement (`STD` via `DF=1`).

| Instruction | Mnemonic / Syntax | Bit Width | Operation & Pointer Behavior |
| :--- | :--- | :--- | :--- |
| **Move String** | `MOVSB` / `MOVSW` | Byte / Word | `ES:[DI] ← DS:[SI]`; Increment/decrement `SI` and `DI` by 1 or 2. |
| **Compare String** | `CMPSB` / `CMPSW` | Byte / Word | Subtract `ES:[DI]` from `DS:[SI]` to set flags; update `SI` and `DI`. |
| **Scan String** | `SCASB` / `SCASW` | Byte / Word | Subtract `ES:[DI]` from `AL`/`AX` to set flags; update `DI`. |
| **Load String** | `LODSB` / `LODSW` | Byte / Word | `AL ← DS:[SI]` / `AX ← DS:[SI]`; update `SI`. |
| **Store String** | `STOSB` / `STOSW` | Byte / Word | `ES:[DI] ← AL` / `ES:[DI] ← AX`; update `DI`. |

#### Repeat Prefixes (`REP`, `REPE`/`REPZ`, `REPNE`/`REPNZ`)
- **`REP`:** Repeat while `CX ≠ 0`. (Used with `MOVS`, `STOS`).
- **`REPE` / `REPZ`:** Repeat while `CX ≠ 0` AND `ZF = 1` (equal).
- **`REPNE` / `REPNZ`:** Repeat while `CX ≠ 0` AND `ZF = 0` (not equal).

#### Code Examples — String Instructions

```assembly
; ─── MOVSB / MOVSW: Copy String / Memory Block ──────────────────────
; Copy 10 bytes from DS:SI to ES:DI:
CLD                      ; DF=0 → forward direction (auto-increment)
LEA SI, SOURCE           ; SI = offset of source string
LEA DI, DEST             ; DI = offset of destination buffer
MOV CX, 10               ; CX = byte count
REP MOVSB                ; Copy 10 bytes: [ES:DI] = [DS:SI], SI++, DI++, CX--

; Copy 5 words (10 bytes) using MOVSW:
CLD
LEA SI, WORD_SRC
LEA DI, WORD_DST
MOV CX, 5                ; Word count
REP MOVSW                ; Copy 5 words (auto-increments by 2 each time)

; Reverse-direction copy (copy backward, for overlapping buffers):
STD                      ; DF=1 → backward direction (auto-decrement)
LEA SI, SRC_END          ; SI = last byte of source
LEA DI, DST_END          ; DI = last byte of destination
MOV CX, LENGTH_STR
REP MOVSB                ; Copy backward to safely handle overlap

; ─── CMPSB / CMPSW: Compare Two Strings ─────────────────────────────
; Compare two strings of length 5 for equality:
CLD
LEA SI, STRING1          ; DS:SI → string 1
LEA DI, STRING2          ; ES:DI → string 2
MOV CX, 5                ; Length to compare
REPE CMPSB               ; Compare until mismatch (ZF=0) or CX=0
JE  STRINGS_EQUAL        ; If ZF=1 after loop: strings are equal
JL  STR1_LESS            ; If CF=1 after loop: string1 char < string2 char
JG  STR1_GREATER         ; If CF=0, ZF=0: string1 char > string2 char

; Find position of first difference between two buffers:
CLD
LEA SI, BUFFER1
LEA DI, BUFFER2
MOV CX, 100              ; Compare up to 100 bytes
REPE CMPSB               ; Stop at first mismatch
JE  NO_DIFF              ; Identical for all 100 bytes
DEC SI                   ; SI now points to mismatching byte in BUFFER1
SUB SI, OFFSET BUFFER1   ; Calculate index of mismatch

; ─── SCASB / SCASW: Search / Scan String for Character ──────────────
; Find character '$' in a string; exit when found:
CLD
LEA DI, TEXT_STRING      ; ES:DI → start of string
MOV CX, MAX_LEN          ; Maximum search length
MOV AL, '$'              ; Character to find
REPNE SCASB              ; Scan until AL == [ES:DI] (ZF=1) or CX=0
JNZ  NOT_FOUND           ; ZF=0 → '$' not found in string
DEC DI                   ; DI now points to position of '$' (SCASB advances past it)
SUB DI, OFFSET TEXT_STRING; Compute zero-based character index

; Scan for space (20H) in a filename:
MOV AL, 20H              ; Space character
LEA DI, FILENAME
MOV CX, 12               ; Max 12 chars (8.3 format)
REPNE SCASB              ; Search for space
JZ   FOUND_SPACE

; ─── LODSB / LODSW: Load String Character ────────────────────────────
; Process each character of a string (convert to uppercase):
CLD
LEA SI, LOWER_STR        ; DS:SI = source string
MOV CX, STR_LEN          ; Length of string

UPPER_LOOP:
LODSB                    ; AL = [DS:SI], SI++
CMP AL, 'a'              ; Is it lowercase?
JB  STORE_CHAR
CMP AL, 'z'
JA  STORE_CHAR
AND AL, 0DFH             ; Convert: clear bit 5 → uppercase
STORE_CHAR:
MOV [DI], AL             ; Store result
INC DI
LOOP UPPER_LOOP          ; Decrement CX and loop

; Count vowels in a string using LODSB:
CLD
LEA SI, INPUT_TEXT
MOV CX, TEXT_LEN
MOV BL, 0                ; BL = vowel counter

COUNT_VOWELS:
LODSB                    ; AL = next character
OR  AL, 20H              ; Normalize to lowercase for comparison
CMP AL, 'a'
JE  IS_VOWEL
CMP AL, 'e'
JE  IS_VOWEL
CMP AL, 'i'
JE  IS_VOWEL
CMP AL, 'o'
JE  IS_VOWEL
CMP AL, 'u'
JE  IS_VOWEL
JMP NEXT_CHAR
IS_VOWEL:
INC BL
NEXT_CHAR:
LOOP COUNT_VOWELS        ; BL = total vowel count

; ─── STOSB / STOSW: Store / Initialize Memory ────────────────────────
; Initialize 100-byte buffer to all zeros:
CLD
LEA DI, BUFFER           ; ES:DI = buffer start
MOV CX, 100              ; Byte count
MOV AL, 00H              ; Fill value = 0
REP STOSB                ; Store AL=0 at [ES:DI++] 100 times

; Fill an array with value FFH:
MOV AL, 0FFH
LEA DI, ARRAY_REGION
MOV CX, ARRAY_SIZE
REP STOSB

; Initialize word array to value 0000H:
CLD
MOV AX, 0000H            ; Word fill value
LEA DI, WORD_ARRAY
MOV CX, 50               ; Word count (100 bytes / 2)
REP STOSW                ; Store AX=0 at [ES:DI], DI += 2, CX--

; ─── Complete String Copy Program ────────────────────────────────────
DATA SEGMENT
    SOURCE_STR DB 'University Microprocessor Lab'
    LEN        EQU $ - SOURCE_STR
DATA ENDS

EXTRA SEGMENT
    DEST_STR   DB LEN DUP(?)
EXTRA ENDS

CODE SEGMENT
    ASSUME CS:CODE, DS:DATA, ES:EXTRA
START:
    MOV AX, DATA
    MOV DS, AX
    MOV AX, EXTRA
    MOV ES, AX

    CLD                      ; DF=0 (forward direction)
    LEA SI, SOURCE_STR       ; DS:SI → source
    LEA DI, DEST_STR         ; ES:DI → destination
    MOV CX, LEN              ; Length in bytes
    REP MOVSB                ; Copy entire string

    MOV AH, 4CH
    INT 21H
CODE ENDS
END START
```

---

### 4.6 Flag Manipulation & Processor Control Instructions

```assembly
; ─── Carry Flag Control ──────────────────────────────────────────────
CLC                   ; Clear Carry Flag: CF = 0
STC                   ; Set Carry Flag:   CF = 1
CMC                   ; Complement Carry: CF = ~CF

; ─── Direction Flag Control (for String Operations) ──────────────────
CLD                   ; Clear Direction: DF = 0 → SI/DI auto-increment
STD                   ; Set Direction:   DF = 1 → SI/DI auto-decrement

; ─── Interrupt Flag Control ──────────────────────────────────────────
STI                   ; Set Interrupt:  IF = 1 → Enable maskable INTR
CLI                   ; Clear Interrupt: IF = 0 → Disable maskable INTR

; ─── Halt and No-Operation ────────────────────────────────────────────
NOP                   ; No Operation: consumes 3 clocks, PC += 1
HLT                   ; Halt: CPU freezes until hardware interrupt or RESET

; ─── PUSHF / POPF: Save and Restore Flag Register ────────────────────
PUSHF                 ; Push entire 16-bit Flag Register onto stack
; ... critical section modifying flags ...
POPF                  ; Pop 16-bit word from stack into Flags (ALL flags restored)
```

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
   *Answer:* Both execute $({\text{Destination}}) - ({\text{Source}})$ and update all conditional flags identically. However, `SUB` stores the computed difference in the destination operand, whereas `CMP` discards the result, preserving the destination contents.

3. **Why are `CBW` and `CWD` necessary before executing `IDIV`?**
   *Answer:* `IDIV` requires the dividend to be twice the bit-width of the divisor ($16\text{-bit AX} \div 8\text{-bit divisor}$, or $32\text{-bit DX:AX} \div 16\text{-bit divisor}$). `CBW` properly sign-extends a signed 8-bit dividend into 16-bit AX, and `CWD` extends a 16-bit signed dividend in AX into 32-bit DX:AX, preventing arithmetic errors from garbage bits in AH or DX.

4. **Why must the destination string always use `ES:DI` and not any other segment?**
   *Answer:* The 8086 hardware permanently hardwires the `MOVS`, `STOS`, `SCAS`, and `CMPS` destination pointer to use the Extra Segment (`ES`) register via `DI`. Unlike the source pointer (`DS:SI`) which can be overridden with a segment prefix, the destination segment is fixed in hardware and cannot be overridden by software.

5. **What is the difference between `SHR` and `SAR` when applied to a negative signed number?**
   *Answer:* `SHR` (Shift Logical Right) always fills vacated bit positions with `0`, making it suitable only for unsigned numbers (unsigned divide by $2^n$). `SAR` (Shift Arithmetic Right) copies the original sign bit (MSB) into vacated positions, preserving the algebraic sign. Thus `SAR` correctly divides signed negative numbers by powers of 2, while `SHR` would produce incorrect positive results.

---

## 6. Definition Sheet

1. **Addressing Mode:** The technique or specification used by an instruction to identify the location of an operand.
2. **Effective Address (EA):** The 16-bit offset of a memory operand relative to its segment register.
3. **Direction Flag (DF):** Control flag governing auto-increment (`CLD`, $DF=0$) or auto-decrement (`STD`, $DF=1$) of `SI` and `DI` in string operations.
4. **Segment Override Prefix:** A 1-byte prefix prepended to a machine instruction that substitutes a non-default segment register for memory access.
5. **Bus Alignment Penalty:** The extra 4 clock cycles required when a 16-bit word is accessed at an odd physical memory address (requiring two bus cycles).
6. **Repeat Prefix:** A 1-byte instruction prefix (`REP`, `REPE`, `REPNE`) that causes a string primitive to execute automatically in a hardware loop governed by `CX` and optionally `ZF`.
