# [PAGE 5 OF 5] Advanced Routines, Interfacing & Protected Mode
## CE701 Exam Revision Flashcards | Multi-Precision, Procedures, IVT & 8255

---

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
