# [PAGE 1 OF 5] Intel 8254 Programmable Interval Timer (PIT)
## CE701 Exam Revision Flashcards | Timing, Control Words & Modes

---

### 1. 8254 Control Word Format (8 Bits)

The 8254 Control Word is an 8-bit register loaded via CPU I/O write when $A_1 = 1, A_0 = 1$. It configures the selected counter's read/write byte mode, operational mode, and count format.

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

### 3. Read-Back Command & Status Byte Format

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

* $\text{OUT}$: Current physical state of OUT pin.
* $\text{NULL COUNT}$: $1 =$ Count written to CR but not yet loaded into counting element (CE); $0 =$ Valid count in CE.

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
