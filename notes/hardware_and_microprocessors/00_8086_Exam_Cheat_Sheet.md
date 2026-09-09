# 00 — 8086 Exam Cheat Sheet: Complete Quick Reference

> **Course:** 3CS526CC23 — Microprocessor and Interfacing
> **Scope:** All topics: Addressing Modes, Encoding, Directives, Strings, Stack, Looping, DOS/C++

---

## 1. Physical Address Formula

$$\boxed{\text{Physical Address} = \text{Segment} \times 10\text{H} + \text{Effective Address (EA)}}$$

| Mode | EA Formula | Default Seg |
|:---|:---|:---:|
| Register | N/A | — |
| Immediate | N/A | CS (in code) |
| Direct | `Disp16` | DS |
| Register Indirect | `[BX]` / `[BP]` / `[SI]` / `[DI]` | DS or SS |
| Base Relative | `[BX/BP] + Disp` | DS or SS |
| Indexed Relative | `[SI/DI] + Disp` | DS |
| Base Indexed Relative | `[BX/BP] + [SI/DI] + Disp` | DS or SS |

**Segment override bytes:** `CS:=2EH`, `SS:=36H`, `DS:=3EH`, `ES:=26H`

---

## 2. Machine Encoding — Key Fields

```
Byte 1:  [OPCODE(6)] [D] [W]
Byte 2:  [MOD(2)] [REG(3)] [R/M(3)]
```

**D bit:** D=1 → REG is DESTINATION | D=0 → REG is SOURCE
**W bit:** W=0 → Byte operation | W=1 → Word operation

**MOD field:**
| MOD | Meaning |
|:---:|:---|
| `00` | Memory, no displacement (except R/M=110 → Direct addr) |
| `01` | Memory + 8-bit signed displacement |
| `10` | Memory + 16-bit signed displacement |
| `11` | Register-to-register (R/M = register code) |

**REG codes:**
| Code | W=0 (Byte) | W=1 (Word) |
|:---:|:---:|:---:|
| 000 | AL | AX |
| 001 | CL | CX |
| 010 | DL | DX |
| 011 | BL | BX |
| 100 | AH | SP |
| 101 | CH | BP |
| 110 | DH | SI |
| 111 | BH | DI |

**R/M Memory Codes (MOD ≠ 11):**
| R/M | EA |
|:---:|:---|
| 000 | [BX+SI] |
| 001 | [BX+DI] |
| 010 | [BP+SI] |
| 011 | [BP+DI] |
| 100 | [SI] |
| 101 | [DI] |
| 110 | [BP] (or Direct if MOD=00) |
| 111 | [BX] |

**Jump displacement:** `D8 = Target_Addr − Next_Instruction_Addr` (signed byte, −128 to +127)

---

## 3. Critical Opcode Quick List

| Instruction | Opcode | Notes |
|:---|:---:|:---|
| MOV r, r/m (byte) | `8AH` | D=1,W=0 |
| MOV r, r/m (word) | `8BH` | D=1,W=1 |
| MOV r/m, r (byte) | `88H` | D=0,W=0 |
| MOV r/m, r (word) | `89H` | D=0,W=1 |
| PUSH reg | `50H`–`57H` | AX=50H, BX=53H, etc. |
| POP reg | `58H`–`5FH` | AX=58H, BX=5BH, etc. |
| INC reg | `40H`–`47H` | AX=40H, CX=41H, etc. |
| DEC reg | `48H`–`4FH` | Short form |
| ADD r, r/m | `02H`/`03H` | Byte/Word |
| JZ / JE | `74H` | ZF=1 |
| JNZ / JNE | `75H` | ZF=0 |
| JC / JB | `72H` | CF=1 |
| JNC / JAE | `73H` | CF=0 |
| JA / JNBE | `77H` | CF=0 AND ZF=0 |
| JG / JNLE | `7FH` | ZF=0 AND SF=OF |
| JL / JNGE | `7CH` | SF≠OF |
| LOOP | `E2H` | CX≠0 after DEC |
| LOOPE/LOOPZ | `E1H` | CX≠0 AND ZF=1 |
| LOOPNE/LOOPNZ | `E0H` | CX≠0 AND ZF=0 |
| JCXZ | `E3H` | CX=0 (no DEC!) |
| CALL near | `E8H` | Pushes IP |
| RET near | `C3H` | Pops IP |
| INT n | `CDH + n` | Software interrupt |
| NOP | `90H` | No operation |
| CLD | `FCH` | DF=0 (forward) |
| STD | `FDH` | DF=1 (backward) |
| MOVSB | `A4H` | Move string byte |
| MOVSW | `A5H` | Move string word |
| CMPSB | `A6H` | Compare string byte |
| SCASB | `AEH` | Scan string byte |
| LODSB | `ACH` | Load string byte |
| STOSB | `AAH` | Store string byte |
| REP | `F3H` | Repeat prefix |
| REPNE | `F2H` | Repeat-not-equal |

---

## 4. Status Flags Reference

| Flag | Name | Set When |
|:---:|:---|:---|
| **CF** | Carry Flag | Unsigned overflow / borrow |
| **PF** | Parity Flag | Even number of 1-bits in low byte |
| **AF** | Auxiliary Carry | Carry from bit 3→4 (BCD) |
| **ZF** | Zero Flag | Result = 0 |
| **SF** | Sign Flag | Result MSB = 1 (negative) |
| **OF** | Overflow Flag | Signed overflow |
| **DF** | Direction Flag | String direction (CLD=0, STD=1) |
| **IF** | Interrupt Flag | Enables maskable interrupts |
| **TF** | Trap Flag | Single-step debug mode |

**INC/DEC affect:** SF, ZF, AF, PF, OF — **NOT CF!**
**Logical ops (AND/OR/XOR):** Always set CF=0, OF=0

---

## 5. All Conditional Jumps

| Mnemonic | Alias | Condition | Use After |
|:---|:---|:---|:---|
| JZ | JE | ZF=1 | Equal / Zero result |
| JNZ | JNE | ZF=0 | Not equal / Non-zero |
| JS | — | SF=1 | Negative result |
| JNS | — | SF=0 | Positive result |
| JC | JB, JNAE | CF=1 | Unsigned below / Carry |
| JNC | JAE, JNB | CF=0 | Unsigned above or equal |
| JO | — | OF=1 | Signed overflow |
| JNO | — | OF=0 | No overflow |
| JP | JPE | PF=1 | Even parity |
| JNP | JPO | PF=0 | Odd parity |
| JA | JNBE | CF=0 AND ZF=0 | Unsigned above |
| JBE | JNA | CF=1 OR ZF=1 | Unsigned below or equal |
| JG | JNLE | ZF=0 AND SF=OF | Signed greater |
| JGE | JNL | SF=OF | Signed greater or equal |
| JL | JNGE | SF≠OF | Signed less |
| JLE | JNG | ZF=1 OR SF≠OF | Signed less or equal |

---

## 6. String Instructions Quick Reference

| Instruction | Operation | Flags | Pointer Updated |
|:---|:---|:---:|:---|
| `MOVSB/W` | `[ES:DI] ← [DS:SI]` | None | SI and DI ±1/±2 |
| `CMPSB/W` | `[DS:SI] − [ES:DI]` (flags) | All | SI and DI ±1/±2 |
| `SCASB/W` | `AL/AX − [ES:DI]` (flags) | All | DI ±1/±2 |
| `LODSB/W` | `AL/AX ← [DS:SI]` | None | SI ±1/±2 |
| `STOSB/W` | `[ES:DI] ← AL/AX` | None | DI ±1/±2 |

| Prefix | Terminates When | Used With |
|:---|:---|:---|
| `REP` | CX = 0 | MOVS, STOS |
| `REPE/REPZ` | CX=0 OR ZF=0 (mismatch) | CMPS, SCAS |
| `REPNE/REPNZ` | CX=0 OR ZF=1 (match found) | CMPS, SCAS |

**Rules:**
- Source: always `DS:SI` (can override DS with prefix)
- Destination: always **`ES:DI`** (CANNOT be overridden!)
- `CLD` → DF=0 → forward (SI/DI increment)
- `STD` → DF=1 → backward (SI/DI decrement)

---

## 7. Looping Instructions Quick Reference

| Instruction | Decrements CX? | Jump Condition | Flags Changed? |
|:---|:---:|:---|:---:|
| `LOOP target` | Yes | CX ≠ 0 | No |
| `LOOPE/LOOPZ target` | Yes | CX ≠ 0 AND ZF = 1 | No |
| `LOOPNE/LOOPNZ target` | Yes | CX ≠ 0 AND ZF = 0 | No |
| `JCXZ target` | **No** | CX = 0 | No |

> **Critical:** Always place `JCXZ SKIP` before any LOOP to handle CX=0 input.

---

## 8. Stack Quick Reference

```
PUSH word:  SP = SP - 2; [SS:SP] = word
POP word:   word = [SS:SP]; SP = SP + 2

Physical TOS Address = SS × 10H + SP

Stack grows DOWNWARD (SP decrements on PUSH)
```

**Rules:**
- Can PUSH/POP: AX, BX, CX, DX, SI, DI, BP, SP, CS, DS, ES, SS
- Cannot: `PUSH AL` (8-bit push illegal), `POP CS` (forbidden)
- `PUSHF` / `POPF` → Save/Restore entire FLAGS register

**Stack Frame Layout (after PUSH BP; MOV BP,SP; SUB SP, locals):**
```
[BP + 6]  = 2nd parameter
[BP + 4]  = 1st parameter
[BP + 2]  = Return IP (pushed by CALL)
[BP + 0]  = Saved old BP   ← BP points here
[BP - 2]  = Local variable 1
[BP - 4]  = Local variable 2  ← SP points here
```

**CALL/RET:**
- NEAR CALL: pushes IP (2 bytes); RET pops IP
- FAR CALL: pushes CS then IP (4 bytes); RETF pops IP then CS
- `RET n` = RET + `SP += n` (clean caller's parameters)

---

## 9. Assembler Directives Quick Reference

| Directive | Purpose | Example |
|:---|:---|:---|
| `DB` | Define Byte (1 byte) | `VAR DB 10H` |
| `DW` | Define Word (2 bytes) | `NUM DW 1234H` |
| `DD` | Define Dword (4 bytes) | `PTR DD 0` |
| `DQ` | Define Qword (8 bytes) | `BIG DQ ?` |
| `DUP` | Duplicate initializer | `BUF DB 100 DUP(0)` |
| `EQU` | Permanent constant | `SIZE EQU 100` |
| `=` | Redefinable constant | `CNT = 0` |
| `PTR` | Type override | `INC BYTE PTR [BX]` |
| `LABEL` | Alias at same address | `BARRAY LABEL BYTE` |
| `OFFSET` | Get variable's offset | `MOV BX, OFFSET ARR` |
| `SEG` | Get variable's segment | `MOV AX, SEG ARR` |
| `LENGTH` | DUP repetition count | `MOV CX, LENGTH A` |
| `SIZE` | Total bytes (LEN×TYPE) | `MOV CX, SIZE A` |
| `TYPE` | Element size in bytes | `ADD SI, TYPE A` |
| `SEGMENT/ENDS` | Define segment | `DATA SEGMENT ... DATA ENDS` |
| `ASSUME` | Assign seg regs | `ASSUME CS:CODE, DS:DATA` |
| `PROC/ENDP` | Define procedure | `P PROC NEAR ... P ENDP` |
| `MACRO/ENDM` | Define macro | `M MACRO p ... ENDM` |
| `LOCAL` | Unique labels in macro | `LOCAL L1, L2` |
| `PUBLIC` | Export symbol | `PUBLIC MY_FUNC` |
| `EXTRN` | Import symbol | `EXTRN F:NEAR` |
| `EVEN` | Align to even address | `EVEN` |
| `ORG` | Set location counter | `ORG 0100H` |
| `END` | End of source file | `END START` |

---

## 10. INT 21H DOS Services Quick Card

| AH | Service | Input | Output |
|:---:|:---|:---|:---|
| `01H` | Read char (echo) | — | AL = char |
| `02H` | Display char | DL = char | — |
| `07H` | Read char (no echo) | — | AL = char |
| `09H` | Display string | DS:DX → '$'-terminated | — |
| `0AH` | Buffered input | DS:DX → buffer | Buffer filled |
| `2AH` | Get date | — | CX=yr, DH=mon, DL=day |
| `2CH` | Get time | — | CH=hr, CL=min, DH=sec |
| `3CH` | Create file | DS:DX→name, CX=attr | AX=handle (CF=err) |
| `3DH` | Open file | DS:DX→name, AL=mode | AX=handle (CF=err) |
| `3EH` | Close file | BX=handle | CF=err |
| `3FH` | Read file | BX=hnd, CX=bytes, DS:DX→buf | AX=bytes |
| `40H` | Write file | BX=hnd, CX=bytes, DS:DX→data | AX=bytes |
| `4CH` | Exit to DOS | AL=exit code | Program ends |

**Inline Assembly in Turbo C++:**
```cpp
asm {
    MOV AH, 09H
    LEA DX, myMsg   // myMsg must end with '$'
    INT 21H
}
```

---

## 11. Common ASCII Values

| Char | Hex | | Char | Hex |
|:---:|:---:|---|:---:|:---:|
| `NUL` | 00H | | `Space` | 20H |
| `CR` | 0DH | | `0`–`9` | 30H–39H |
| `LF` | 0AH | | `A`–`Z` | 41H–5AH |
| `$` | 24H | | `a`–`z` | 61H–7AH |

**Key conversions:**
- `digit → int`: `AL - 30H` (subtract '0')
- `int → digit`: `AL + 30H` (add '0')  
- `upper → lower`: `OR AL, 20H`
- `lower → upper`: `AND AL, DFH`

---

## 12. Standard Program Template (TASM)

```assembly
; ─── Minimal working TASM program template ───────────────────────
DATA SEGMENT
    ; Variables here
    MSG DB 'Hello$'
DATA ENDS

STACK_SEG SEGMENT STACK
    DW 64 DUP(?)        ; 128-byte stack
STACK_SEG ENDS

CODE SEGMENT
    ASSUME CS:CODE, DS:DATA, SS:STACK_SEG
START:
    MOV AX, DATA        ; Initialize DS
    MOV DS, AX

    ; ─── Your code here ──────────────────────────────────────────
    MOV AH, 09H
    LEA DX, MSG
    INT 21H
    ; ─────────────────────────────────────────────────────────────

    MOV AH, 4CH         ; Exit to DOS
    MOV AL, 00H
    INT 21H
CODE ENDS
END START
```

---

## 13. Top 15 Exam-Must-Know Facts

1. `INC`/`DEC` do **NOT** affect the Carry Flag (CF).
2. `LOOP` decrements CX **first**, then checks CX ≠ 0.
3. `JCXZ` does **NOT** decrement CX — it only reads CX.
4. If CX = 0 before `LOOP` → loops 65,536 times! Use `JCXZ` guard.
5. String destination is **ALWAYS `ES:DI`** — cannot be overridden.
6. `PUSH AL` is **ILLEGAL** — stack only accepts 16-bit words.
7. `POP CS` is **ILLEGAL** — CS can only change via JMP FAR/CALL FAR.
8. `MOV DS, 1000H` is **ILLEGAL** — must route through AX: `MOV AX,1000H; MOV DS,AX`.
9. `MOV CS, AX` is **ILLEGAL** — CS register is read-only via MOV.
10. Conditional jump range: **−128 to +127 bytes** from next instruction.
11. `JE` and `JZ` are **identical** (opcode 74H). Same for JNE/JNZ, JB/JC, JAE/JNC.
12. After `REPE CMPSB`: `ZF=1` → strings equal; `ZF=0` → mismatch found.
13. `NOT CX` after `REPNE SCASB` (with initial CX=FFFFh) gives string length.
14. `PUSHA`/`POPA` are **80286 instructions** — NOT available on 8086.
15. INT 21H / AH=4CH must end **every** program; forgetting it causes crash.
