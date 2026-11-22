# CE701: A4-Compact Exam Revision & Flashcard Pack
## Microprocessors & Interfacing | High-Yield Reference & Assembly Blueprints

---

<!-- ===================================================================== -->
<!-- PAGE 1: INTEL 8254 PROGRAMMABLE INTERVAL TIMER (PIT)                  -->
<!-- ===================================================================== -->

<div class="page-container" style="page-break-after: always; break-after: page;">

# [PAGE 1 OF 5] Intel 8254 Programmable Interval Timer (PIT)

### 1. 8254 Control Word Format (8 Bits, Write to Port `Control Register`)

```text
+-------+-------+-------+-------+-------+-------+-------+-------+
|   D7  |   D6  |   D5  |   D4  |   D3  |   D2  |   D1  |   D0  |
+-------+-------+-------+-------+-------+-------+-------+-------+
|  SC1  |  SC0  |  RW1  |  RW0  |   M2  |   M1  |   M0  |  BCD  |
+-------+-------+-------+-------+-------+-------+-------+-------+
```

| Field | Bits | Binary | Function & Operational Description |
| :--- | :---: | :---: | :--- |
| **Select Counter** | $D_7, D_6$ | `00`<br>`01`<br>`10`<br>`11` | Select Counter 0<br>Select Counter 1<br>Select Counter 2<br>Read-Back Command (Latches count / status of selected counters) |
| **Read / Write Mode** | $D_5, D_4$ | `00`<br>`01`<br>`10`<br>`11` | **Counter Latch Command:** Latches count value into internal latch for CPU reading<br>**Read/Write LSB only:** 8-bit count operation<br>**Read/Write MSB only:** 8-bit count operation<br>**Read/Write LSB first, then MSB:** 16-bit operation (two sequential I/O bytes) |
| **Mode Select** | $D_3, D_2, D_1$ | `000`<br>`001`<br>`X10`<br>`X11`<br>`100`<br>`101` | **Mode 0:** Interrupt on Terminal Count<br>**Mode 1:** Hardware Retriggerable One-Shot<br>**Mode 2:** Rate Generator / Divide-by-N pulse (`010` or `110`)<br>**Mode 3:** Square Wave Generator (`011` or `111`)<br>**Mode 4:** Software Triggered Strobe<br>**Mode 5:** Hardware Triggered Strobe |
| **BCD / Binary** | $D_0$ | `0`<br>`1` | **Binary Counter:** 16-bit binary ($0000\text{H} - \text{FFFFH}$, Max Count $= 65,536$)<br>**BCD Counter:** 4-decade BCD ($0000 - 9999$, Max Count $= 10,000$) |

---

### 2. Master Operating Modes & GATE Pin Behavior Table

| Mode | Functional Name | Initial Out | Trigger Mechanism | GATE Pin Effect | Output Waveform Characteristic |
| :---: | :--- | :---: | :--- | :--- | :--- |
| **0** | Interrupt on Terminal Count | **LOW** | Software count write | $\text{High} = \text{Count}$; $\text{Low} = \text{Disable count}$ | Output goes **HIGH** when count reaches 0 and stays HIGH until reload. |
| **1** | Hardware Retriggerable One-Shot | **HIGH** | GATE rising edge ($\uparrow$) | $\uparrow = \text{Reload count \& trigger}$; $\text{Low} = \text{None}$ | Output goes **LOW** on trigger; returns HIGH after $N$ clock pulses. |
| **2** | Rate Generator (Divide-by-N) | **HIGH** | Software count write | $\text{Low} = \text{High Out \& Stop}$; $\uparrow = \text{Reload count}$ | Output is **HIGH for $N-1$ clocks, LOW for 1 clock**. Periodic pulse. |
| **3** | Square Wave Generator | **HIGH** | Software count write | $\text{Low} = \text{High Out \& Stop}$; $\uparrow = \text{Reload count}$ | **Symmetrical square wave**: Even $N$: $N/2$ H, $N/2$ L. Odd $N$: $(N+1)/2$ H, $(N-1)/2$ L. |
| **4** | Software Triggered Strobe | **HIGH** | Software count write | $\text{High} = \text{Count}$; $\text{Low} = \text{Disable count}$ | Output stays HIGH; emits a **1 clock LOW strobe** on Terminal Count. |
| **5** | Hardware Triggered Strobe | **HIGH** | GATE rising edge ($\uparrow$) | $\uparrow = \text{Reload count \& restart}$; $\text{Low} = \text{None}$ | Output stays HIGH; emits a **1 clock LOW strobe** $N$ cycles after trigger. |

---

### 3. Read-Back & Status Commands

* **Read-Back Command Word ($A_1=1, A_0=1$, Bits $D_7-D_6 = 11$):**

```text
+----+----+---------------+---------------+------+------+------+----+
| D7 | D6 |       D5      |       D4      |  D3  |  D2  |  D1  | D0 |
+----+----+---------------+---------------+------+------+------+----+
|  1 |  1 | /COUNT LATCH  | /STATUS LATCH | CNT2 | CNT1 | CNT0 |  0 |
+----+----+---------------+---------------+------+------+------+----+
```

* **Status Byte Format (Returned on Read):**

```text
+-----+------------+-----+-----+----+----+----+-----+
|  D7 |     D6     |  D5 |  D4 | D3 | D2 | D1 |  D0 |
+-----+------------+-----+-----+----+----+----+-----+
| OUT | NULL COUNT | RW1 | RW0 | M2 | M1 | M0 | BCD |
+-----+------------+-----+-----+----+----+----+-----+
```

---

### 4. Frequency Divisor Calculation & Assembly Blueprint

$$\text{Divisor Count } N = \frac{f_{\text{CLK}}}{f_{\text{OUT}}}$$

* **Exam Problem:** Input $f_{\text{CLK}} = 2\text{ MHz}$, generate $1\text{ kHz}$ Square Wave on Counter 0 (Mode 3, 16-bit binary).
    * $N = \frac{2,000,000\text{ Hz}}{1,000\text{ Hz}} = 2000_{10} = 07\text{D}0\text{H}$.
    * Control Word: Counter 0 (`00`), R/W LSB then MSB (`11`), Mode 3 (`011`), Binary (`0`) $\implies \mathbf{36}\text{H}$.
    * Ports: `00H` (Counter 0), `02H` (Counter 1), `04H` (Counter 2), `06H` (Control Register).

```assembly
; =====================================================================
; 8254 Counter 0 Setup: 2 MHz -> 1 kHz Square Wave Generator
; =====================================================================
MOV AL, 36H             ; Control Word: Counter 0, Mode 3, 16-bit binary
OUT 06H, AL             ; Write Control Word to Control Register

MOV AL, 0D0H            ; LSB of divisor (2000 = 07D0H)
OUT 00H, AL             ; Write LSB to Counter 0 Register

MOV AL, 07H             ; MSB of divisor
OUT 00H, AL             ; Write MSB to Counter 0 Register
```

</div>

---

<!-- ===================================================================== -->
<!-- PAGE 2: INTEL 8259A PRIORITY INTERRUPT CONTROLLER (PIC)              -->
<!-- ===================================================================== -->

<div class="page-container" style="page-break-after: always; break-after: page;">

# [PAGE 2 OF 5] Intel 8259A Priority Interrupt Controller (PIC)

### 1. Internal Block Diagram & Operational Blocks

```text
               +---------------------------------------+
IR0 - IR7 ---> | IRR (Interrupt Request Register - 8b) | <--- Latches pending inputs
               +---------------------------------------+
                                  |
                                  v
               +---------------------------------------+
IMR (8b) ----> |    Priority Resolver Logic (PR)       | <--- Resolves highest unmasked bit
               +---------------------------------------+
                                  |
                                  v
               +---------------------------------------+
               |   ISR (In-Service Register - 8 bits)  | <--- Stores currently executing level
               +---------------------------------------+
                                  |
   INT <--------------------------+
  /INTA ------------------------> Dual /INTA Cycle Controller & Cascade Buffer
```

1. **IRR (Interrupt Request Register):** 8-bit register that stores all interrupt requests pending service on pins $IR_0 - IR_7$.
2. **ISR (In-Service Register):** 8-bit register tracking the interrupt currently being serviced by the 8086 CPU. Set on 1st $\overline{\text{INTA}}$, cleared by EOI.
3. **IMR (Interrupt Mask Register):** 8-bit programmable mask register ($1 =$ Mask/Disable; $0 =$ Unmask/Enable).
4. **Priority Resolver (PR):** Decodes IRR and IMR to determine the highest priority request and drives it to the ISR.
5. **Cascade Buffer / Comparator:** Manages Master-Slave cascading lines ($CAS_0 - CAS_2$) for multi-PIC systems (up to 64 inputs).

---

### 2. Dual $\overline{\text{INTA}}$ Handshake Timing Sequence

```text
CPU INTR       : __________/------------------------------------------\______
CPU /INTA      : ------------\_______/-------------------\_______/------------
                               (Cycle 1)                   (Cycle 2)
8259 Action    :             Lock Priority,              Release 8-bit
                             Set ISR, Clear IRR          Vector Byte N
CPU Data Bus   : ----------------------------------------< Vector N >---------
```

* **Bus Cycle 1 (Priority Acknowledgment & Lock):**
    * 8086 pulses $\overline{\text{INTA}}$ LOW.
    * 8259 Priority Resolver locks the highest priority bit.
    * Bit is **set in ISR** and **cleared in IRR**.
    * If Master with Slaves, Master broadcasts the 3-bit Slave ID on $CAS_0 - CAS_2$. Data bus remains in high impedance ($Z$).
* **Bus Cycle 2 (Vector Transfer):**
    * 8086 pulses $\overline{\text{INTA}}$ LOW a second time.
    * The addressing 8259 places the **8-bit Interrupt Vector Type $N$** ($T_7-T_3$ plus $IR$ level) on data bus lines $D_0 - D_7$.
    * 8086 multiplies vector $N$ by 4 ($N \times 4$) and fetches the 4-byte ISR address (`IP` and `CS`) from the Interrupt Vector Table.

---

### 3. Initialization Command Words (ICW1 – ICW4)

```text
[ RESET ] ---> [ ICW1 (A0=0, D4=1) ] ---> [ ICW2 (A0=1) ] ---> [ SNGL=0? ] -YES-> [ ICW3 (A0=1) ]
                                                                       |                   |
                                                                       NO <----------------+
                                                                       |
                                                                       v
                                                                [ IC4=1? ] -YES-> [ ICW4 (A0=1) ]
```

* **ICW1 ($A_0 = 0$, $D_4 = 1$):**
    * $LTIM$: $0 =$ Edge-triggered; $1 =$ Level-triggered inputs.
    * $SNGL$: $1 =$ Single PIC; $0 =$ Cascaded Master/Slave.
    * $IC4$: **$1 =$ ICW4 required (Mandatory for 8086)**; $0 =$ ICW4 not needed.
* **ICW2 ($A_0 = 1$):** Interrupt Vector Base Address.
    * Bits $T_7 - T_3$ set high 5 bits of vector type ($D_7-D_3$). Bits $D_2-D_0$ are automatically inserted by 8259 ($000$ to $111$).
* **ICW3 ($A_0 = 1$, only if $SNGL = 0$):**
    * **Master:** 8-bit bitmap ($S_7 - S_0$). Set $S_k = 1$ if Slave is attached to $IR_k$.
    * **Slave:** 3-bit binary ID in bits $D_2 - D_0$ ($000 - 111$) matching Master $IR$ line.
* **ICW4 ($A_0 = 1$, only if $IC4 = 1$):**
    * $\mu PM$: **$1 = 8086/8088 \text{ Mode}$**; $0 = 8085 \text{ Mode}$.
    * $AEOI$: $1 =$ Automatic EOI (clears ISR on 2nd $\overline{\text{INTA}}$); $0 =$ Normal EOI (requires explicit command).
    * $SFNM$: $1 =$ Special Fully Nested Mode (for cascaded master); $0 =$ Disabled.

---

### 4. Operational Command Words (OCW1 – OCW3)

* **OCW1 ($A_0 = 1$):** Write to Interrupt Mask Register (IMR). $1 =$ Mask $IR_k$; $0 =$ Enable $IR_k$.
* **OCW2 ($A_0 = 0, D_4=0, D_3=0$):**
    * `00100000b` (`20H`) = **Non-Specific EOI** (clears highest active priority ISR bit).
    * `01100xxx_b` = **Specific EOI** (clears $IR_x$ indicated by $L_2 - L_0$).
* **OCW3 ($A_0 = 0, D_4=0, D_3=1$):**
    * `00001010b` (`0AH`) = **Read IRR** on next read cycle.
    * `00001011b` (`0BH`) = **Read ISR** on next read cycle.
    * `00001100b` (`0CH`) = **Poll Command** ($D_7 = 1$ if interrupt pending).

---

### 5. 8259A Assembly Blueprint: Master Setup (Vectors 08H–0FH)

```assembly
; =====================================================================
; 8259A PIC Master Initialization for 8086 (Vectors 08H - 0FH)
; Ports: 20H (A0 = 0), 21H (A0 = 1)
; =====================================================================
CLI                     ; Disable external interrupts during configuration

MOV AL, 00010011B       ; ICW1: Edge-triggered, Single PIC, ICW4 needed
OUT 20H, AL             ; Write to Port A0 = 0

MOV AL, 00001000B       ; ICW2: Base Interrupt Vector = 08H (08H - 0FH)
OUT 21H, AL             ; Write to Port A0 = 1

MOV AL, 00000001B       ; ICW4: 8086 mode (uPM=1), Normal EOI (AEOI=0)
OUT 21H, AL             ; Write to Port A0 = 1

MOV AL, 11111000B       ; OCW1: Unmask IR0-IR2 (0), Mask IR3-IR7 (1)
OUT 21H, AL             ; Write to IMR Register

STI                     ; Re-enable interrupts
```

</div>

---

<!-- ===================================================================== -->
<!-- PAGE 3: 8086 ARCHITECTURAL & HARDWARE REFERENCE TABLES               -->
<!-- ===================================================================== -->

<div class="page-container" style="page-break-after: always; break-after: page;">

# [PAGE 3 OF 5] 8086 Architectural & Hardware Tables

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

</div>

---

<!-- ===================================================================== -->
<!-- PAGE 4: 8086 CORE ASSEMBLY ROUTINES (ARRAYS, STRINGS & SORTING)       -->
<!-- ===================================================================== -->

<div class="page-container" style="page-break-after: always; break-after: page;">

# [PAGE 4 OF 5] Core Assembly Routines: Arrays & Strings

### 1. Count Positive, Negative, and Zero Elements in 16-Bit Array

```assembly
; =====================================================================
; Routine: Count Positive, Negative, and Zero 16-Bit Signed Elements
; =====================================================================
MOV SI, OFFSET ARRAY    ; SI points to start of word array
MOV CX, N               ; CX = element count
XOR BX, BX              ; BX = Positive Counter
XOR DX, DX              ; DX = Negative Counter
XOR DI, DI              ; DI = Zero Counter

SCAN_LOOP:
    MOV AX, [SI]        ; Read 16-bit signed integer
    CMP AX, 0           ; Evaluate sign and zero condition
    JE  IS_ZERO
    JL  IS_NEG
    INC BX              ; AX > 0: Positive count++
    JMP NEXT_ELEM

IS_NEG:
    INC DX              ; AX < 0: Negative count++
    JMP NEXT_ELEM

IS_ZERO:
    INC DI              ; AX == 0: Zero count++

NEXT_ELEM:
    ADD SI, 2           ; Advance word pointer by 2 bytes
    LOOP SCAN_LOOP

MOV POS_CNT, BX
MOV NEG_CNT, DX
MOV ZER_CNT, DI
```

---

### 2. Bubble Sort on 16-Bit Word Array (Ascending Order)

```assembly
; =====================================================================
; Routine: Bubble Sort on Array of N 16-Bit Words (Ascending)
; =====================================================================
MOV DX, COUNT - 1       ; Outer loop pass counter (N - 1 passes)

OUTER_LOOP:
    MOV CX, DX          ; Inner loop comparisons for this pass
    MOV SI, OFFSET ARR  ; SI points to first array element

INNER_LOOP:
    MOV AX, [SI]        ; AX = ARR[j]
    MOV BX, [SI+2]      ; BX = ARR[j+1]
    CMP AX, BX          ; Compare adjacent words
    JLE NO_SWAP         ; If AX <= BX, order is correct

    ; Swap adjacent words in memory
    MOV [SI], BX
    MOV [SI+2], AX

NO_SWAP:
    ADD SI, 2           ; Advance to next adjacent word pair
    LOOP INNER_LOOP

    DEC DX              ; Decrement outer loop pass count
    JNZ OUTER_LOOP
```

---

### 3. In-Place String Reversal (Without String Primitives)

```assembly
; =====================================================================
; Routine: In-Place ASCII String Reversal (Two-Pointer Mirroring)
; =====================================================================
MOV SI, OFFSET STR              ; SI = Left pointer (start of string)
MOV DI, OFFSET STR + LEN - 1    ; DI = Right pointer (end of string)

REVERSE_LOOP:
    CMP SI, DI                  ; Check if pointers have met or crossed
    JAE REVERSE_DONE

    MOV AL, [SI]                ; Swap characters [SI] and [DI]
    MOV BL, [DI]
    MOV [SI], BL
    MOV [DI], AL

    INC SI                      ; Move left pointer forward
    DEC DI                      ; Move right pointer backward
    JMP REVERSE_LOOP

REVERSE_DONE:
```

---

### 4. String Block Copy (`MOVSB`) & Substring Search (`SCASB`)

```assembly
; =====================================================================
; Routine: High-Speed Block Copy and Key Character Search
; =====================================================================
MOV AX, @DATA
MOV DS, AX
MOV ES, AX              ; ES MUST equal DS for string instructions

; --- Part 1: High-Speed Memory Block Copy ---
CLD                     ; DF = 0: auto-increment SI and DI
MOV SI, OFFSET SRC_STR  ; DS:SI points to source string
MOV DI, OFFSET DEST_STR ; ES:DI points to destination buffer
MOV CX, STR_LEN         ; CX = byte transfer count
REP MOVSB               ; Copy byte-by-byte while CX != 0

; --- Part 2: Scan for Character Key using SCASB ---
CLD
MOV DI, OFFSET DEST_STR ; ES:DI points to target search string
MOV CX, STR_LEN
MOV AL, 'U'             ; AL holds character to search for
REPNE SCASB             ; Scan while [ES:DI] != AL and CX != 0
JNZ NOT_FOUND
MOV MATCH_FOUND, 1      ; Found! (DI - 1 points to matched byte)

NOT_FOUND:
```

</div>

---

<!-- ===================================================================== -->
<!-- PAGE 5: ADVANCED ROUTINES, INTERFACING & PROTECTED MODE              -->
<!-- ===================================================================== -->

<div class="page-container">

# [PAGE 5 OF 5] Advanced Routines & System Interfacing

### 1. Multi-Precision 32-Bit $\times$ 32-Bit Multiplication (64-Bit Product)

$$X \times Y = (X_L \times Y_L) + ((X_L \times Y_H + X_H \times Y_L) \ll 16) + (X_H \times Y_H \ll 32)$$

```assembly
; =====================================================================
; Routine: 32-bit by 32-bit Multiply -> 64-bit Result in RES0..RES3
; Multiplicand X = X_H : X_L, Multiplier Y = Y_H : Y_L
; =====================================================================
MOV AX, X_L
MUL Y_L                 ; DX:AX = X_L * Y_L
MOV RES0, AX            ; Bits 15..0
MOV RES1, DX            ; Partial carry into word 1

MOV AX, X_L
MUL Y_H                 ; DX:AX = X_L * Y_H
ADD RES1, AX
ADC DX, 0
MOV RES2, DX            ; Initial word 2

MOV AX, X_H
MUL Y_L                 ; DX:AX = X_H * Y_L
ADD RES1, AX            ; Bits 31..16
ADC RES2, DX
ADC RES3, 0             ; Propagate carry into word 3

MOV AX, X_H
MUL Y_H                 ; DX:AX = X_H * Y_H
ADD RES2, AX            ; Bits 47..32
ADC RES3, DX            ; Bits 63..48
```

---

### 2. Standard Reentrant Procedure Stack Frame & Parameters

```assembly
; =====================================================================
; Routine: Stack Frame Construction with Pushed Args and Local Vars
; Stack: [BP+6]=Arg2, [BP+4]=Arg1, [BP+2]=Near IP, [BP]=Old BP, [BP-2]=Local1
; =====================================================================
MY_PROC PROC NEAR
    PUSH BP             ; 1. Preserve caller's base pointer
    MOV  BP, SP         ; 2. Establish new frame base pointer
    SUB  SP, 4          ; 3. Allocate 4 bytes for 2 local word variables

    MOV  AX, [BP+4]     ; Fetch 1st parameter from stack
    MOV  BX, [BP+6]     ; Fetch 2nd parameter from stack
    MOV  [BP-2], AX     ; Store into local stack variable 1
    MOV  [BP-4], BX     ; Store into local stack variable 2

    ADD  AX, BX         ; Return result in AX

    MOV  SP, BP         ; Release local variable storage
    POP  BP             ; Restore caller's BP
    RET  4              ; Return and purge 4 bytes of pushed arguments!
MY_PROC ENDP
```

---

### 3. Installing Custom Interrupt Handler into IVT

```assembly
; =====================================================================
; Routine: Install Custom ISR into Vector 65H (Physical Base 00194H)
; =====================================================================
CLI                     ; Disable external interrupts
XOR AX, AX
MOV ES, AX              ; ES = 0000H (Segment of IVT)
MOV DI, 65H * 4         ; DI = Offset in IVT (65H * 4 = 194H)

MOV WORD PTR ES:[DI], OFFSET MY_ISR ; Install new ISR offset (IP)
MOV WORD PTR ES:[DI+2], CS          ; Install current segment (CS)
STI                     ; Re-enable interrupts
; Note: MY_ISR MUST be FAR and terminate with IRET (pops IP, CS, FLAGS)
```

---

### 4. 8255A PPI Mode Formats & Port C BSR Control Words

* **I/O Mode Control Word ($D_7 = 1$):**
    * $D_6, D_5$: Mode A (`00` = Mode 0 Basic I/O, `01` = Mode 1 Strobed, `1X` = Mode 2 Bi-directional).
    * $D_4$: Port A ($1 =$ Input, $0 =$ Output).
    * $D_3$: Port C Upper ($1 =$ Input, $0 =$ Output).
    * $D_2$: Mode B ($0 =$ Mode 0, $1 =$ Mode 1).
    * $D_1$: Port B ($1 =$ Input, $0 =$ Output).
    * $D_0$: Port C Lower ($1 =$ Input, $0 =$ Output).
* **Port C BSR Mode Control Word ($D_7 = 0$):**
    * $D_3 - D_1$: Bit Select (`000` for $PC_0$ to `111` for $PC_7$).
    * $D_0$: Set/Reset ($1 = \text{Set to 1}$; $0 = \text{Reset to 0}$). Sets/resets 1 bit without disturbing others.

---

### 5. 80286/80386 Protected Mode: Segment Selector & Descriptor

```text
+----+----+----+----+----+----+----+----+----+----+----+----+----+----+----+----+
| 15 | 14 | 13 | 12 | 11 | 10 |  9 |  8 |  7 |  6 |  5 |  4 |  3 |  2 |  1 |  0 |
+----+----+----+----+----+----+----+----+----+----+----+----+----+----+----+----+
|                         Descriptor Index (13 bits)              | TI |   RPL  |
+----+----+----+----+----+----+----+----+----+----+----+----+----+----+----+----+
```

* **Index (Bits 3–15):** Selects 1 of up to 8,192 ($2^{13}$) descriptors in the GDT/LDT.
* **TI (Table Indicator, Bit 2):** $0 = \text{Global Descriptor Table (GDT)}$; $1 = \text{Local Descriptor Table (LDT)}$.
* **RPL (Privilege Level, Bits 0–1):** Rings 0 (Kernel) to 3 (User App).
* **8-Byte Descriptor Format:**
    * Base Address: 24-bit (80286, 16 MB max) or 32-bit (80386+, 4 GB max).
    * Limit: 16-bit (80286, 64 KB max) or 20-bit (80386+, up to 4 GB with $G=1$, 4 KB pages).
    * Access Byte (Byte 5): $P$ (Present, Bit 7), $DPL$ (Privilege Rings 0–3, Bits 6–5), $S$ ($1=$ Code/Data, $0=$ System, Bit 4), $Type$ (Bits 3–0).

</div>
