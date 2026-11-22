# [PAGE 2 OF 5] Intel 8259A Priority Interrupt Controller (PIC)
## CE701 Exam Revision Flashcards | Architecture, Handshake & ICWs

---

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

### 5. 8259A Master Assembly Blueprint (Vectors 08H–0FH)

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
