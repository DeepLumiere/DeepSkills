# [PAGE 4 OF 5] Core Assembly Routines: Arrays & Strings
## CE701 Exam Revision Flashcards | Sorting, Searching & String Instructions

---

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

---

### 5. Linear Search & Occurrence Frequency Counter in Array

```assembly
; =====================================================================
; Routine: Find Frequency of Key in Array and Store Matching Offsets
; =====================================================================
MOV SI, OFFSET ARR      ; Pointer to word array
MOV DI, OFFSET MATCHES  ; Pointer to output index list
MOV CX, N               ; Number of elements
MOV AX, KEY_VAL         ; Search key
XOR BX, BX              ; Match count = 0

SEARCH_LOOP:
    CMP [SI], AX        ; Compare current element with key
    JNE SKIP_MATCH

    INC BX              ; Match count++
    MOV [DI], SI        ; Store pointer/index of matched element
    ADD DI, 2

SKIP_MATCH:
    ADD SI, 2           ; Move to next word
    LOOP SEARCH_LOOP

MOV MATCH_COUNT, BX     ; Total occurrences found
```
