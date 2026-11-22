# [PAGE 3 OF 5] 8086 Architectural & Hardware Reference Tables
## CE701 Exam Revision Flashcards | PSW, Memory Banks, Encoding & IVT

---

### 1. 16-Bit Processor Status Word (PSW / FLAGS Register)

```text
+----+----+----+----+----+----+----+----+----+----+----+----+----+----+----+----+
| 15 | 14 | 13 | 12 | 11 | 10 |  9 |  8 |  7 |  6 |  5 |  4 |  3 |  2 |  1 |  0 |
+----+----+----+----+----+----+----+----+----+----+----+----+----+----+----+----+
|  U |  U |  U |  U | OF | DF | IF | TF | SF | ZF |  U | AF |  U | PF |  U | CF |
+----+----+----+----+----+----+----+----+----+----+----+----+----+----+----+----+
```

| Bit | Name | Type | Set Condition (= 1) | Key Instructions |
| :---: | :--- | :---: | :--- | :--- |
| **0** | **CF** (Carry) | Status | Carry out of MSB (add) or borrow into MSB (sub) | `ADC`, `SBB`, `STC`, `CLC` |
| **2** | **PF** (Parity) | Status | Low 8 bits of result contain **even number of 1s** | `JP` / `JPE`, `JNP` / `JPO` |
| **4** | **AF** (Auxiliary) | Status | Carry out of bit $D_3$ into $D_4$ (half-carry for BCD) | `DAA`, `DAS`, `AAA`, `AAS` |
| **6** | **ZF** (Zero) | Status | Result of operation is exactly zero (`00H` / `0000H`) | `JZ` / `JE`, `JNZ` / `JNE` |
| **7** | **SF** (Sign) | Status | MSB of result is 1 (negative in 2's complement) | `JS`, `JNS` |
| **8** | **TF** (Trap) | Control | Single-step mode: CPU raises Type 1 interrupt after each instruction | Internal debugger traps |
| **9** | **IF** (Interrupt) | Control | Maskable hardware interrupts on `INTR` pin enabled | `STI` (Set), `CLI` (Clear) |
| **10** | **DF** (Direction) | Control | Auto-decrement string pointers (`STD` $\to$ backward; `CLD` $\to$ forward) | `CLD`, `STD` |
| **11** | **OF** (Overflow) | Status | Signed arithmetic overflow (exceeded 8/16-bit range) | `JO`, `JNO`, `INTO` |

---

### 2. Segment Registers & 20-Bit Physical Address Formula

$$\text{Physical Address (PA)} = (\text{Segment Register} \times 10\text{H}) + \text{Effective Address (Offset)}$$

| Logical Segment | Segment Register | Default Pointer | Permitted Alternate Offsets | Memory Purpose |
| :--- | :---: | :---: | :---: | :--- |
| **Code** | `CS` | `IP` | None (fixed fetch) | Instruction execution opcodes |
| **Data** | `DS` | `EA` via `BX`, `SI`, `DI`, Disp | Any memory addressing mode | Program variables, lookup tables |
| **Stack** | `SS` | `SP`, `BP` | `[BP + Disp]`, `[BP + SI/DI]` | Stack frames, parameters, local variables |
| **Extra** | `ES` | `DI` (String Destination) | Any memory addressing mode | String targets, secondary data segment |

---

### 3. Memory Banks Truth Table ($A_0$ & $\overline{\text{BHE}}$)

```text
                  +-------------------------+
                  |  8086 Physical Address  |
                  +-------------------------+
                               |
               +---------------+---------------+
               v                               v
    +--------------------+           +--------------------+
    |   Even Bank (512K) |           |   Odd Bank (512K)  |
    |  Data Lines D0-D7  |           |  Data Lines D8-D15 |
    |  Enable Pin: A0    |           |  Enable Pin: /BHE  |
    +--------------------+           +--------------------+
```

| $\overline{\text{BHE}}$ | $A_0$ | Bus Operation | Active Data Lines | Bus Cycles |
| :---: | :---: | :--- | :---: | :---: |
| **`0`** | **`0`** | Whole 16-bit word transfer at **Even Address** | $D_0 - D_{15}$ | **1 Cycle** |
| **`1`** | **`0`** | 8-bit byte transfer from **Even Address** | $D_0 - D_7$ (Lower) | **1 Cycle** |
| **`0`** | **`1`** | 8-bit byte transfer from **Odd Address** | $D_8 - D_{15}$ (Upper) | **1 Cycle** |
| **`0`** | **`1`** | Whole 16-bit word transfer at **Odd Address** | Cycle 1: $D_8-D_{15}$<br>Cycle 2: $D_0-D_7$ | **2 Cycles** (Unaligned penalty) |

---

### 4. Machine Instruction Byte Format & MOD / R/M Field Decoding

```text
+-------------------+-------------------+-------------------+-------------------+
|  Byte 1: Opcode   |   Byte 2: MOD/RM  |   Byte 3: Low Disp|   Byte 4: High Disp
+-------------------+-------------------+-------------------+-------------------+
| 6b Opcode | D | W | MOD |  REG  | R/M |  8/16-bit Displacement / Immediate    |
+-----------+---+---+-----+-------+-----+---------------------------------------+
```

| MOD | R/M = 000 | R/M = 001 | R/M = 010 | R/M = 011 | R/M = 100 | R/M = 101 | R/M = 110 | R/M = 111 |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **`00`** | `[BX+SI]` | `[BX+DI]` | `[BP+SI]` | `[BP+DI]` | `[SI]` | `[DI]` | **Direct (`Disp16`)** | `[BX]` |
| **`01`** | `[BX+SI+d8]` | `[BX+DI+d8]` | `[BP+SI+d8]` | `[BP+DI+d8]` | `[SI+d8]` | `[DI+d8]` | `[BP+d8]` | `[BX+d8]` |
| **`10`** | `[BX+SI+d16]`| `[BX+DI+d16]`| `[BP+SI+d16]`| `[BP+DI+d16]`| `[SI+d16]`| `[DI+d16]`| `[BP+d16]`| `[BX+d16]`|
| **`11` ($W=0$)** | `AL` | `CL` | `DL` | `BL` | `AH` | `CH` | `DH` | `BH` |
| **`11` ($W=1$)** | `AX` | `CX` | `DX` | `BX` | `SP` | `BP` | `SI` | `DI` |

---

### 5. Interrupt Vector Table (IVT) Memory Map ($00000\text{H} - 003\text{FF}\text{H}$)

$$\text{IVT Base Address} = \text{Type Number} \times 4$$

| Type | Physical Address Range | Vector Purpose | Dedicated Hardware Handler Trigger |
| :---: | :---: | :--- | :--- |
| **0** | $00000\text{H} - 00003\text{H}$ | **Divide Error** | Division by zero or quotient larger than register |
| **1** | $00004\text{H} - 00007\text{H}$ | **Single Step / Trap** | CPU traps after each instruction if Trap Flag $TF = 1$ |
| **2** | $00008\text{H} - 0000\text{B}\text{H}$ | **Non-Maskable Interrupt (NMI)** | Hardware edge on NMI pin (Power failure, RAM parity) |
| **3** | $0000\text{C}\text{H} - 0000\text{F}\text{H}$ | **1-Byte Breakpoint (`INT 3`)** | Debugger software breakpoint insertion (`0CCH`) |
| **4** | $00010\text{H} - 00013\text{H}$ | **Overflow Trap (`INTO`)** | Triggered if Overflow Flag $OF = 1$ upon executing `INTO` |
| **5–31** | $00014\text{H} - 0007\text{F}\text{H}$ | **Intel Reserved** | Boundaries, coprocessors, segment protection faults |
| **32–255**| $00080\text{H} - 003\text{FF}\text{H}$ | **User / OS / Hardware Vectors** | 8259A hardware interrupts & DOS dispatcher (`INT 21H` at $00084\text{H}$) |
