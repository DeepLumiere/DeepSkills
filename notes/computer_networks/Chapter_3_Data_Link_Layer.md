# Complete Computer Networks Notes: Data Link Layer

> **Course Code:** Computer Networks (CompNet)
> **Course Title:** Computer Networks & Data Communications
> **Primary Source:** `Ch 3 Data Link Layer.pdf` (pp. 1–69) — Official Faculty Lecture Material
> **Supplementary Sources:** `Chapter3-DataLinkLayer_NEW.pdf` (86 slides), `CN_Numericals_Data_Link_Layer.pdf` (32 pages), `cn_tutorial.pdf` (Tutorials 1–3), `Computer_Networks_Question_Bank.pdf` (Unit 2)
> **Files Integrated:** `Ch 3 Data Link Layer.pdf`, `Chapter3-DataLinkLayer_NEW.pdf`, `CN_Numericals_Data_Link_Layer.pdf`, `cn_tutorial.pdf`, `Computer_Networks_Question_Bank.pdf`

---

## Source-to-Chapter Mapping

| Source File | Content / Role | Chapter Integration |
| :--- | :--- | :--- |
| `Ch 3 Data Link Layer.pdf` (69 slides) | Primary lecture presentation covering DLL design issues, framing, error control (Hamming/CRC), elementary protocols, sliding window (1-bit, GBN, Selective Repeat), HDLC, PPP, and ADSL. | Core concepts, formal protocols, state machines, and curated diagram analysis. |
| `Chapter3-DataLinkLayer_NEW.pdf` (86 slides) | Supplementary lecture presentation with extended protocol code, buffering diagrams, and error scenarios. | Augmented protocol explanations and edge cases. |
| `CN_Numericals_Data_Link_Layer.pdf` (32 pages) | Dedicated numerical problem set on Hamming distance, $(7,4)$ codes, bit/byte stuffing, Stop-and-Wait utilization, pipelining, interplanetary links, and GBN sequence bounds. | Section 13 (Worked Numerical Problems) & Section 9 (Formulas & Derivations). |
| `cn_tutorial.pdf` (Tutorials 1–3) | Course tutorials on byte/bit stuffing edge cases, checksum integrity, propagation delay calculations, and GBN buffers. | Section 13 (Worked Problems) & Section 18 (Exam Review). |
| `Computer_Networks_Question_Bank.pdf` (Unit 2) | Official university question bank covering DLL definitions, MCQs, framing techniques, ARQ comparison, and numericals. | Section 18 (Exam-Oriented Review). |

---

# Chapter 3 — Data Link Layer

---

## 1. Chapter Overview & Design Issues

The **Data Link Layer (DLL)** is Layer 2 of the ISO/OSI reference model. Its primary function is to transform a raw, error-prone physical transmission facility into a reliable, well-structured communication link for the Network Layer (Layer 3).

Conceptually, the Data Link Layer operates over a channel that acts like a **"wire-like" medium**—meaning that bits delivered to the destination arrive in precisely the same order in which they were transmitted by the source. While the Physical Layer simply accepts a raw, unformatted bitstream and attempts to push signals across the copper wire, optical fiber, or wireless spectrum, the Data Link Layer deals with whole units of structured information called **frames**.

Real physical communication channels suffer from finite transmission bandwidth, non-zero propagation delay, electrical noise, signal attenuation, distortion, and packet collisions. Consequently, the Data Link Layer must address three core architectural design challenges:

1. **Framing:** Partitioning the continuous, unstructured raw bit stream provided by the Physical Layer into discrete, identifiable units called **frames**, adding header tokens (physical addresses, sequence control) and trailer tokens (checksums), and establishing frame synchronization between transmitter and receiver.
2. **Error Control:** Protecting data frames against bit inversions, insertions, or deletions using mathematical error-detection codes (such as CRC and Checksums) and error-correction codes (such as Hamming, Convolutional, and Reed-Solomon codes), combined with positive/negative acknowledgments and retransmission timers (Automatic Repeat reQuest — ARQ).
3. **Flow Control:** Throttling a high-speed sender so that it does not transmit frames faster than a slow receiver can buffer, process, and deliver them to its network layer, thereby preventing receiver buffer overrun.

> [!NOTE]
> **Ecological Niche of Link Layer Reliability:** Historically, physical transmission channels (aging copper local loops, high-frequency radio) were extremely noisy, making link-layer error recovery mandatory. In modern high-speed optical fiber networks, the physical error rate is tiny ($< 10^{-12}$), so link-layer hardware often performs minimal error control ("good enough" link layer), pushing full end-to-end reliability to the Transport Layer (TCP). However, over inherently noisy channels (such as IEEE 802.11 Wi-Fi, cellular, and satellite links), heavyweight link-layer protocols with local frame acknowledgments remain essential.

[Source: Ch 3 Data Link Layer.pdf, Slides 1–6; Chapter3-DataLinkLayer_NEW.pdf, Slides 1–5; dll_ma.pdf, pp. 193–196]

---

## 2. Core Terminology Dictionary

1. **Frame:** The Protocol Data Unit (PDU) at the Data Link Layer, consisting of a header (addresses and sequence control), a data payload (encapsulating a Network Layer packet), and a trailer (containing error-checking bits such as a CRC).
2. **Packet:** The Protocol Data Unit (PDU) at the Network Layer; placed directly into the payload field of a Data Link frame.
3. **Framing:** The mechanism used to mark the beginning and end of each transmitted frame in a continuous bit stream.
4. **Byte Stuffing (Character Stuffing):** A framing technique where special escape characters (`ESC`) are inserted before accidental delimiter bytes occurring in the payload.
5. **Bit Stuffing:** A framing technique where a special flag sequence (`01111110`) delimits frames, and the sender automatically injects a `0` bit after any sequence of five consecutive `1` bits in the data stream.
6. **Hamming Distance ($d$):** The number of bit positions in which two binary codewords of equal length differ; computed by XORing the two codewords and counting the number of `1`s.
7. **Minimum Hamming Distance ($d_{\min}$):** The smallest Hamming distance between any two valid codewords in a block code; determines the error-detecting and error-correcting capability of the code.
8. **Forward Error Correction (FEC):** An error-control strategy where sufficient redundant check bits are included with each transmitted codeword so the receiver can detect and correct errors without requesting retransmission.
9. **Automatic Repeat reQuest (ARQ):** An error-control strategy where the receiver detects corrupted frames and requests retransmission from the sender using acknowledgments and timers.
10. **Piggybacking:** The technique of temporarily delaying an outgoing acknowledgment so it can be hooked onto the header of the next outgoing data frame, eliminating separate ACK transmission overhead.
11. **Sliding Window:** An abstract buffer management mechanism where sender and receiver maintain contiguous ranges of sequence numbers permitted to be sent and received.
12. **Cumulative Acknowledgment:** An acknowledgment frame containing sequence number $n$ that confirms successful receipt of all frames up to and including $n$.
13. **Negative Acknowledgment (NAK / REJ):** A control frame sent by the receiver to inform the sender that a specific frame arrived damaged or was lost, requesting immediate retransmission.
14. **Bandwidth-Delay Product (BDP):** The capacity of a transmission link in bits ($B \times \text{RTT}$), representing the number of bits in flight required to keep the pipe fully utilized.
15. **HDLC (High-level Data Link Control):** A widely used bit-oriented synchronous data link protocol standardized by ISO.
16. **PPP (Point-to-Point Protocol):** The standard Internet data link protocol for point-to-point connections over serial lines, phone modems, and broadband links (RFC 1661).
17. **LCP (Link Control Protocol):** A sub-protocol of PPP used to establish, configure, test, and terminate the data link connection.
18. **NCP (Network Control Protocol):** A family of sub-protocols within PPP used to establish and configure specific network-layer protocols (e.g., IPCP for IPv4).

[Source: Ch 3 Data Link Layer.pdf, Slides 3–15, 23–35, 45–55, 64–66]

---

## 3. Services Provided to the Network Layer

The Data Link Layer provides three distinct types of service to the Network Layer above it:

```mermaid
flowchart LR
    subgraph Host_A ["Sending Host"]
        N_A["Network Layer Packet"] -->|Encapsulation| DLL_A["Data Link Frame"]
        DLL_A -->|Bit Stream| PHY_A["Physical Layer"]
    end
    subgraph Host_B ["Receiving Host"]
        PHY_B["Physical Layer"] -->|Bit Stream| DLL_B["Data Link Frame"]
        DLL_B -->|Decapsulation & Verification| N_B["Network Layer Packet"]
    end
    PHY_A ===|Physical Transmission Link| PHY_B
    DLL_A -.->|Virtual Node-to-Node Data Link Protocol| DLL_B
```

### 1. Unacknowledged Connectionless Service
* **Mechanism:** The sending machine transmits independent frames to the destination machine without establishing a prior connection. The destination machine does not send any acknowledgment upon receiving a frame. No logical connection is set up beforehand or torn down afterward.
* **Error Handling:** If a frame is lost or damaged due to noise on the channel, no recovery attempt is made at the Data Link Layer; recovery is left entirely to higher layers (such as TCP at the Transport Layer).
* **Use Cases:** Ideal for physical communication channels with extremely low error rates (such as fiber-optic cables and wired Ethernet LANs) and real-time traffic (such as digitized voice calls and live video streaming) where late retransmitted data is worse than slightly garbled or lost data.

### 2. Acknowledged Connectionless Service
* **Mechanism:** No logical connection is established before transmission, but every individual frame transmitted is explicitly acknowledged by the receiver upon arrival. The sender sets a timer for each frame; if an acknowledgment does not arrive before the timer expires, the sender retransmits that specific frame.
* **Architectural Rationale (Link-Layer ACK Optimization vs. Transport Retransmission):** 
  Providing acknowledgments at the Data Link Layer is strictly an optimization, not a conceptual requirement, because higher transport layers (like TCP) can always handle end-to-end reliability. However, hardware links have strict maximum frame length limits (MTU) and known propagation delays that the Network Layer does not know. If the Transport Layer hands down a large $10\text{ KB}$ message that is fragmented into 10 separate frames, and 2 of those frames are lost on a noisy wireless link, relying on Transport-Layer timeouts forces the entire $10\text{ KB}$ message to be retransmitted from scratch across the end-to-end path. In contrast, acknowledging individual frames at Layer 2 allows damaged frames to be detected and retransmitted **locally and immediately** over the single bad link, saving massive bandwidth and time.
* **Use Cases:** Inherently unreliable and noisy channels, such as wireless links (IEEE 802.11 Wi-Fi, cellular networks), where link-layer recovery is far more efficient than end-to-end transport timeout.

### 3. Acknowledged Connection-Oriented Service
* **Mechanism:** A formal connection is established between source and destination machines before any data is transferred. Every frame transmitted over the connection is assigned a sequence number. The Data Link Layer guarantees that every transmitted frame is delivered **exactly once, in strict sequential order**, with no lost or duplicate frames.
* **Three Operating Phases:**
  1. **Connection Establishment:** Both machines initialize internal state variables, buffers, sequence number counters, and timers.
  2. **Data Transfer:** One or more numbered data frames are transmitted, acknowledged, and processed.
  3. **Connection Release:** Variables, buffers, and channel resources are freed on both machines.
* **Use Cases:** Long-distance wide-area point-to-point trunk lines, satellite channels, and long-distance telephone circuits where lost acknowledgments in connectionless mode could cause duplicate frames to be retransmitted multiple times, wasting precious wide-area bandwidth.

[Source: Ch 3 Data Link Layer.pdf, Slides 4–10; Chapter3-DataLinkLayer_NEW.pdf, Slides 6–11; dll_ma.pdf, pp. 195–196]

---

## 4. Framing Techniques

Because the Physical Layer provides an unformatted stream of bits, the Data Link Layer must organize bits into distinct frames. A good design must make it easy for a receiver to locate the start of new frames while consuming minimal channel bandwidth. The four primary framing methods are:

---

### Method 1: Byte Count (Character Count)

#### Mechanism
The header of each frame includes an integer field that specifies the total number of bytes in that frame (including the byte count byte itself). When the receiver sees the byte count, it knows how many bytes follow and hence where the frame ends.

```text
Frame 1 (5 bytes)       Frame 2 (5 bytes)       Frame 3 (8 bytes)       Frame 4 (8 bytes)
[ 5 | A | B | C | D ]   [ 5 | E | F | G | H ]   [ 8 | I | J | K | L | M | N | O ]
```

#### Fatal Flaw (Framing Synchronization Loss)
If a transmission error corrupts the count field (e.g., a `5` in Frame 2 is flipped to a `7` due to a bit error), the destination gets completely out of synchronization:
* The receiver miscounts the frame boundary, reading data bytes as the count field of the next frame.
* Even if the checksum detects that the frame is damaged, the receiver has **no way of telling where the next frame starts**.
* Asking the sender to retransmit does not help because the receiver does not know how many bytes to skip over to get to the start of the retransmission. For this reason, pure byte count framing is rarely used alone.

[Source: Ch 3 Data Link Layer.pdf, Slide 14; Chapter3-DataLinkLayer_NEW.pdf, Slides 14–15; dll_ma.pdf, pp. 197–198]

---

### Method 2: Flag Bytes with Byte Stuffing (Character Stuffing)

#### Mechanism
Gets around the resynchronization problem by delimiting every frame with special reserved bytes called **Flag Bytes** (conventionally `FLAG = 0x7E` in hexadecimal, or ASCII `DLE STX` / `DLE ETX`). Two consecutive flag bytes indicate the end of one frame and the start of the next. If the receiver ever loses synchronization, it simply scans the incoming stream for two consecutive `FLAG` bytes.

To prevent binary data (such as images, compressed files, or audio) containing natural `0x7E` bytes from being misidentified as delimiters, the sender's Data Link Layer automatically inserts ("stuffs") an **Escape Byte** (`ESC = 0x7D` or `0x1B`) immediately before any accidental `FLAG` or `ESC` byte occurring in the payload.

#### PPP Byte Stuffing Rule (RFC 1662)
In the Point-to-Point Protocol (PPP), byte stuffing uses escape character `0x7D`. Any occurrence of `0x7E` in the payload is replaced by the 2-byte sequence `0x7D 0x5E` (where `0x5E` is `0x7E ^ 0x20`). Any occurrence of `0x7D` in payload is replaced by `0x7D 0x5D` (where `0x5D` is `0x7D ^ 0x20`). Upon receipt, the receiver sees `0x7D`, removes it, and XORs the following byte with `0x20` to reconstruct the original data byte.

```text
Original Data Payload:         A  |  B  | ESC |  C  | ESC | FLAG | FLAG |  D
Transmitted Stuffed Payload:   A  |  B  | ESC | ESC |  C  | ESC | ESC | ESC | FLAG | ESC | FLAG |  D
Complete Transmitted Frame:   FLAG [ A B ESC ESC C ESC ESC ESC FLAG ESC FLAG D ] FLAG
```

**Worst-Case Overhead:** If the payload consists entirely of `FLAG` and `ESC` bytes, every byte is escaped, causing a $100\%$ transmission expansion ($2N$ bytes transmitted for $N$ payload bytes).

[Source: Ch 3 Data Link Layer.pdf, Slides 15–17; Chapter3-DataLinkLayer_NEW.pdf, Slides 16–18; dll_ma.pdf, pp. 198–199]

---

### Method 3: Flag Bits with Bit Stuffing

#### Mechanism
Developed for bit-oriented protocols (such as HDLC, SDLC, and USB) to eliminate the requirement that frames consist of integral 8-bit bytes. Frames can contain an arbitrary number of bits. Every frame begins and ends with an 8-bit flag pattern: **`01111110`** (`0x7E`).

#### Algorithm: Bit Stuffing & Destuffing
1. **Transmitter Rule:** Whenever the sender detects **five consecutive `1` bits** in the data payload, it automatically inserts ("stuffs") a **`0` bit** into the outgoing bit stream immediately following the fifth `1`, regardless of what the next data bit is.
2. **Receiver Rule:** Whenever the receiver observes **five consecutive `1` bits** arriving from the line:
   * If the 6th bit is a **`0`**, the receiver strips ("destuffs") the `0` bit and restores the original data.
   * If the 6th bit is a **`1`** and the 7th bit is a **`0`** (pattern `01111110`), it is recognized as a valid **Frame Delimiter Flag**.
   * If the 6th bit is a **`1`** and the 7th bit is a **`1`** (pattern `01111111`), it indicates a physical line error or a channel **Abort Signal**.

#### Example: Bit Stuffing Transformation
* Original Data Bit Stream:

$$
\mathbf{0111101111101111110}
$$

* After Five-`1` Rule Processing:
  * Pattern `011110...` (four `1`s): No stuffing needed.
  * Pattern `...111110...` (five `1`s followed by data `0`): Sender injects a `0` $\to$ `11111`**`0`**`0`.
  * Pattern `...1111110...` (six `1`s in data): Sender injects a `0` after fifth `1` $\to$ `11111`**`0`**`10`.
* Transmitted Stuffed Bit Stream:

$$
\mathbf{01111011111\underline{0}011111\underline{0}10}
$$

**Transmission Overhead:** Adds roughly $12.5\%$ overhead (1 bit added per 8 bits in worst case). It also ensures a minimum density of signal transitions to help the Physical Layer maintain clock synchronization (used in USB for this reason).

[Source: Ch 3 Data Link Layer.pdf, Slide 18; Chapter3-DataLinkLayer_NEW.pdf, Slides 19–20; CN_Numericals_Data_Link_Layer.pdf, Page 16; dll_ma.pdf, pp. 199–200]

---

### Method 4: Physical Layer Coding Violations

#### Mechanism
Used in networks whose physical line encoding schemes contain inherent signal redundancy. In **Manchester Encoding**, every valid bit interval contains a transition in the middle (Low-to-High for bit `0`, High-to-Low for bit `1`). A signal interval with **no transition** (High-High or Low-Low) represents an invalid data signal or **coding violation**. 

Similarly, in **4B/5B Encoding**, 4 data bits are mapped to 5 signal bits, leaving 16 out of 32 signal combinations unused. These reserved invalid patterns are used as natural frame boundary delimiters.

**Advantage:** Zero data stuffing overhead; no data bits or escape bytes need to be inserted into the frame payload.

#### Framing Combinations in Modern Standards
Many modern protocols use a combination of methods for safety. Ethernet and IEEE 802.11 begin frames with a long **Preamble** (72 bits in 802.11, 7 bytes in 802.3) to synchronize receiver hardware clocks, followed by a Start Frame Delimiter (SFD) and a header **Length (count) field** to locate the frame end.

[Source: Ch 3 Data Link Layer.pdf, Slide 19; Chapter3-DataLinkLayer_NEW.pdf, Slide 21; dll_ma.pdf, p. 200]

---

## 5. Error Control: Detection and Correction

Transmission errors on physical lines are caused by thermal noise, electromagnetic interference, signal attenuation, and cross-talk. Error control uses mathematical redundancy to ensure data integrity.

---

### Error Types: Single-Bit vs Burst Errors

1. **Single-Bit Error:** An isolated error where exactly one bit in a data block is inverted while all neighboring bits remain correct.
2. **Burst Error:** A cluster of errors where two or more corrupted bits occur within a span of $k$ consecutive bits. The **burst length** $k$ is measured from the first corrupted bit to the last corrupted bit in the sequence. Burst errors are common in wireless and physical channels due to lightning strikes, impulse noise, and radio fading.

[Source: Ch 3 Data Link Layer.pdf, Slides 21–22]

---

### Code Architecture & Hamming Distance

An $(n, k)$ block code takes an $m$-bit dataword and appends $r$ check bits to create an $n$-bit **codeword**, where $n = m + r$. The code rate is $\f\frac{m}{n}$.

#### Definition: Hamming Distance
The **Hamming Distance** $d(v_1, v_2)$ between two binary codewords $v_1$ and $v_2$ of equal length is the number of bit positions in which they differ.

$$
\text{Hamming Distance} = \text{weight}(v_1 \oplus v_2)
$$

Where $\oplus$ is the bitwise modulo-2 addition (XOR) operator, and $\text{weight}$ is the count of `1` bits.

#### Minimum Hamming Distance Theorems

1. **Error Detection Theorem:** To reliably detect up to $s$ single-bit errors in any codeword, the minimum Hamming distance of the code must satisfy:

$$
d_{\min} \ge s + 1
$$

2. **Error Correction Theorem:** To reliably correct up to $t$ single-bit errors in any codeword, the minimum Hamming distance of the code must satisfy:

$$
d_{\min} \ge 2t + 1
$$

*Intuition:* If $d_{\min} = 2t + 1$, any received codeword with up to $t$ bit errors remains closer to the original transmitted codeword than to any other valid codeword in the code space, allowing unique maximum-likelihood decoding.

[Source: Ch 3 Data Link Layer.pdf, Slides 23–25; CN_Numericals_Data_Link_Layer.pdf, Pages 2–7]

---

### The Hamming Single-Error-Correcting Code

Richard Hamming designed an optimal systematic code capable of correcting any single-bit error ($t = 1, d_{\min} = 3$).

#### Parity Bit Positions
In an $n$-bit codeword, bit positions that are powers of 2 ($1, 2, 4, 8, 16, \dots, 2^{r-1}$) are reserved for **parity check bits** ($p_1, p_2, p_4, p_8, \dots$). The remaining bit positions ($3, 5, 6, 7, 9, 10, 11, \dots$) contain the original **data bits** ($d_1, d_2, d_3, d_4, \dots$).

#### Hamming Redundancy Inequality
To correct any single-bit error in an $m$-bit message using $r$ parity check bits, there are $n = m + r$ possible single-bit error locations plus 1 case where no error occurs ($m + r + 1$ total states). Since $r$ check bits can represent $2^r$ distinct syndrome values, the code must satisfy:

$$
2^r \ge m + r + 1
$$

| Data Bits ($m$) | Parity Bits ($r$) | Total Bits ($n = m + r$) | Code Name | Code Rate ($m/n$) |
| :---: | :---: | :---: | :---: | :---: |
| 1 | 2 | 3 | $(3, 1)$ | 0.33 |
| 4 | 3 | 7 | $(7, 4)$ | 0.57 |
| 8 | 4 | 12 | $(12, 8)$ | 0.67 |
| 11 | 4 | 15 | $(15, 11)$ | 0.73 |
| 26 | 5 | 31 | $(31, 26)$ | 0.84 |

### The Hamming Single-Error-Correcting Code

Richard Hamming designed an optimal systematic code capable of correcting any single-bit error ($t = 1, d_{\min} = 3$).

#### Parity Bit Positions
In an $n$-bit codeword, bit positions that are powers of 2 ($1, 2, 4, 8, 16, \dots, 2^{r-1}$) are reserved for **parity check bits** ($p_1, p_2, p_4, p_8, \dots$). The remaining bit positions ($3, 5, 6, 7, 9, 10, 11, \dots$) contain the original **data bits** ($d_1, d_2, d_3, d_4, \dots$).

#### Hamming Redundancy Inequality
To correct any single-bit error in an $m$-bit message using $r$ parity check bits, there are $n = m + r$ possible single-bit error locations plus 1 case where no error occurs ($m + r + 1$ total states). Since $r$ check bits can represent $2^r$ distinct syndrome values, the code must satisfy:

$$
2^r \ge m + r + 1
$$

| Data Bits ($m$) | Parity Bits ($r$) | Total Bits ($n = m + r$) | Code Name | Code Rate ($m/n$) |
| :---: | :---: | :---: | :---: | :---: |
| 1 | 2 | 3 | $(3, 1)$ | 0.33 |
| 4 | 3 | 7 | $(7, 4)$ | 0.57 |
| 8 | 4 | 12 | $(12, 8)$ | 0.67 |
| 11 | 4 | 15 | $(15, 11)$ | 0.73 |
| 26 | 5 | 31 | $(31, 26)$ | 0.84 |

#### Parity Group Calculation (Even Parity)
A bit in position $k$ is checked by parity bit $p_{2^j}$ if the $j$-th bit in the binary representation of $k$ is `1`:
* **$p_1$ (Bit 1):** Checks all bit positions whose binary representation has a `1` in the least significant bit (positions $1, 3, 5, 7, 9, 11, 13, 15, \dots$).
* **$p_2$ (Bit 2):** Checks all bit positions with a `1` in the second bit (positions $2, 3, 6, 7, 10, 11, 14, 15, \dots$).
* **$p_4$ (Bit 4):** Checks positions $4, 5, 6, 7, 12, 13, 14, 15, \dots$.
* **$p_8$ (Bit 8):** Checks positions $8, 9, 10, 11, 12, 13, 14, 15, \dots$.

#### Syndrome Decoding & Error Correction
At the receiver, the parity check equations are evaluated over the received bits to form the **Syndrome Vector** $S = [s_r \dots s_2 s_1]_2$:
* If $S = 0$, no bit error occurred.
* If $S \ne 0$, the integer value of $S$ gives the **exact 1-based index of the corrupted bit**. Inverting (flipping) bit $S$ restores the original codeword.

---

### Advanced Error-Correcting Codes (Non-Block & High-Capacity Codes)

While Hamming codes provide a clean introduction to block codes, modern communication networks utilize far stronger error-correcting codes:

#### 1. Binary Convolutional Codes
Unlike block codes (which process fixed $m$-bit blocks independently), a **convolutional code** processes a continuous stream of input bits and generates a stream of output bits using internal memory registers.
* **Constraint Length ($k$):** The number of input bit shifts on which the current output bits depend.
* **NASA Standard Code ($r = 1/2, k = 7$):** Originally designed for NASA Voyager space missions (1977) and now used extensively in GSM mobile networks and IEEE 802.11 Wi-Fi. The encoder maintains 6 internal memory registers ($S_1 \dots S_6$). Each input bit produces 2 output bits formed by XOR combinations of the input bit and selected register states.
* **Viterbi Decoding Algorithm:** Discovered by Andrew Viterbi (1973). The decoder maintains a trellis state machine, walking through the received bit sequence and keeping track of the path with the fewest bit errors.
* **Soft-Decision vs. Hard-Decision Decoding:**
  * *Hard-Decision Decoding:* Demodulator maps incoming physical voltages directly into strict binary 0 or 1 before passing to the error corrector.
  * *Soft-Decision Decoding:* Demodulator passes continuous analog signal confidence values (e.g. $+0.9\text{V}$ means "very likely a 1", $-0.1\text{V}$ means "maybe a 0"). The Viterbi algorithm processes these probability weights directly, providing significantly stronger error correction over noisy channels.

#### 2. Reed-Solomon Codes
**Reed-Solomon (RS) codes** are non-binary linear systematic block codes operating on **$m$-bit symbols** (typically bytes, $m = 8$) rather than individual bits.
* **Mathematical Foundation:** Based on the fundamental theorem of algebra that any $n$-degree polynomial is uniquely determined by $n + 1$ points over a finite field (Galois Field $\text{GF}(2^m)$). Extra points placed on the same polynomial line are redundant check symbols.
* **Codeword Length:** For $m$-bit symbols, codewords are $2^m - 1$ symbols long. For 8-bit bytes ($m = 8$), a codeword is 255 bytes.
* **Popular Standard $(255, 233)$ RS Code:** Contains 233 data bytes and 32 redundant check bytes.
* **Burst Error Correction Capacity:** Adding $2t$ redundant symbols can correct up to $t$ arbitrary symbol errors anywhere in the frame. The $(255, 233)$ code with 32 check bytes can correct up to $16$ corrupted bytes. Because an entire 8-bit symbol is treated as a single unit, a burst error flipping up to 128 consecutive bits across 16 bytes is corrected just as easily as 16 isolated bit errors.
* **Applications:** DSL broadband lines, cable modems, satellite links, CDs, DVDs, and Blu-ray discs.
* **Concatenated Coding:** Systems often combine an inner Convolutional Code (to fix scattered single-bit errors) with an outer Reed-Solomon Code (to mop up remaining error bursts created by Viterbi decoding failures).

#### 3. Low-Density Parity Check (LDPC) Codes
Invented by Robert Gallager in his 1962 PhD thesis, LDPC codes are linear block codes defined by a parity-check matrix containing a very low density of `1` bits.
* **Iterative Belief Propagation Decoding:** Decoded using an approximation algorithm that iteratively updates probability estimates across matrix nodes until a valid codeword is found.
* **Performance:** Performs close to the theoretical **Shannon Limit** for large block sizes, outperforming almost all other practical codes.
* **Modern Applications:** Standardized in 10 Gbps Ethernet (10GBASE-T), IEEE 802.11n/ac/ax (Wi-Fi 4/5/6), Digital Video Broadcasting (DVB-S2), and power-line networking.

[Source: Ch 3 Data Link Layer.pdf, Slides 26–30; dll_ma.pdf, pp. 207–209]

---

### Error-Detecting Codes: Parity, Checksums, and CRCs

On reliable channels (such as optical fiber or high-quality copper), error rates are low, making Forward Error Correction (FEC) needlessly heavy. **Error-detecting codes** are used instead, discarding bad frames and requesting retransmission.

#### 1. Parity & Interleaving (Two-Dimensional Parity)
* **Single Parity Bit:** Appends 1 check bit to ensure the total number of `1`s in the codeword is even (or odd). Has minimum distance $d_{\min} = 2$; reliably detects all single-bit errors, but fails ($50\%$ failure rate) on even-length burst errors.
* **Interleaving (2D Matrix Parity):** Arranges $k \times n$ data bits into a rectangular matrix $n$ bits wide by $k$ bits high. Parity bits are computed for each of the $n$ columns and transmitted at the end. If a burst error of length $\le n$ occurs, the corrupted bits are spread across different columns, ensuring at most 1 error per column. Thus, **all burst errors of length $\le n$ are $100\%$ detected**.

#### 2. Internet Checksum & Fletcher's Checksum
* **Internet Checksum (1's Complement Checksum):** Used in IP, UDP, and TCP headers. Sums 16-bit words using **1's complement arithmetic** (any overflow carry out of the most significant bit is wrapped around and added to the least significant bit: end-around carry). The final sum is bitwise inverted (`NOT`).
  * *Properties:* Gives uniform coverage; has two representations of zero (`0x0000` $+0$, `0xFFFF` $-0$), allowing `0x0000` to signal "no checksum transmitted".
  * *Flaws:* Weak against hardware bugs; fails to detect addition or deletion of zero words, byte swapping, or packet splicing.
* **Fletcher's Checksum:** Adds a positional component by accumulating the running sum of data weighted by its position, catching word order reordering that the Internet Checksum misses.

#### 3. Cyclic Redundancy Check (CRC / Polynomial Codes)

Polynomial codes treat bit strings as polynomials with coefficients in GF(2) (binary arithmetic where addition and subtraction are identical to bitwise XOR).

An $m$-bit message is represented by polynomial $M(x)$ of degree $m-1$. The sender and receiver agree in advance on a fixed **Generator Polynomial** $G(x)$ of degree $r$ (having $r+1$ bits), where both the highest and lowest terms must be $1$ ($x^r + \dots + 1$).

#### CRC Frame Check Sequence (FCS) Generation Algorithm

1. **Degree of Generator:** Let $r = \text{deg}(G(x))$.
2. **Append Zeros:** Multiply $M(x)$ by $x^r$, which corresponds to appending $r$ zero bits to the end of the message bit string: $T'(x) = x^r M(x)$.
3. **Modulo-2 Division:** Divide the bit string corresponding to $x^r M(x)$ by the bit string of $G(x)$ using modulo-2 binary division (XOR subtraction, ignoring carries/borrows).
4. **Compute Checksum (FCS):** The division produces a quotient $Q(x)$ and an $r$-bit remainder $R(x)$:

$$
\f\frac{x^r M(x)}{G(x)} = Q(x) \oplus \f\frac{R(x)}{G(x)}
$$

5. **Construct Transmitted Codeword:** Subtract (XOR) the remainder $R(x)$ from $x^r M(x)$:

$$
T(x) = x^r M(x) \oplus R(x)
$$

   The transmitted codeword $T(x)$ is exactly divisible by $G(x)$ without remainder.

#### Receiver Verification & Mathematical Proof of Detection Bounds
The receiver divides the incoming bit stream $T(x) \oplus E(x)$ by $G(x)$:

$$
\f\frac{T(x) \oplus E(x)}{G(x)} = \f\frac{T(x)}{G(x)} \oplus \f\frac{E(x)}{G(x)} = 0 \oplus \f\frac{E(x)}{G(x)}
$$

An error will slip through undetected **if and only if $E(x)$ is an exact algebraic multiple of $G(x)$**.

* **Single-Bit Errors ($E(x) = x^i$):** If $G(x)$ has two or more terms (ensured by $x^0 = 1$), $G(x)$ cannot divide $x^i$. **$100\%$ of single-bit errors are detected**.
* **Double-Bit Errors ($E(x) = x^i + x^j = x^j(x^{i-j} + 1)$):** Detected if $G(x)$ does not divide $x^k + 1$ for any $k \le$ max frame length. Standard polynomials (like $x^{15}+x^{14}+1$) do not divide $x^k+1$ for any $k < 32,768$, guaranteeing **$100\%$ double-bit error detection**.
* **Odd Number of Bit Errors:** If $G(x)$ contains $(x+1)$ as a factor, it will detect **$100\%$ of any odd number of bit errors**, because no polynomial with an odd number of terms is divisible by $(x+1)$.
* **Burst Errors of Length $k$ ($E(x) = x^i(x^{k-1} + \dots + 1)$):**
  * All burst errors of length $k \le r$ are detected with **$100\%$ certainty** (since degree of remainder term is $< r$).
  * A burst error of length $k = r + 1$ matching $G(x)$ slips through with probability $\dfrac{1}{2^{r-1}}$.
  * Any longer burst error of length $k > r + 1$ slips through with probability $\dfrac{1}{2^r}$.

[Source: Ch 3 Data Link Layer.pdf, Slides 26–38; Chapter3-DataLinkLayer_NEW.pdf, Slides 26–42; dll_ma.pdf, pp. 209–215]

#### Standard International Generator Polynomials

| Standard Name | Degree ($r$) | Polynomial Equation $G(x)$ | Application Domain |
| :--- | :---: | :--- | :--- |
| **CRC-12** | 12 | $x^{12} + x^{11} + x^3 + x^2 + x + 1$ | 6-bit character streams |
| **CRC-16** | 16 | $x^{16} + x^{15} + x^2 + 1$ | Bisync, USB, HDLC |
| **CRC-CCITT** | 16 | $x^{16} + x^{12} + x^5 + 1$ | X.25, HDLC, Bluetooth, PPP |
| **CRC-32 (IEEE 802)**| 32 | $x^{32} + x^{26} + x^{23} + x^{22} + x^{16} + x^{12} + x^{11} + x^{10} + x^8 + x^7 + x^5 + x^4 + x^2 + x + 1$ | Ethernet (802.3), Wi-Fi (802.11), FDDI, PKZIP |

#### Error Detection Capabilities of CRC-32
* Detects **100% of single-bit errors** (since $G(x)$ has two or more terms).
* Detects **100% of double-bit errors** (since $G(x)$ does not divide $x^k + 1$ for any $k < 2^{31}-1$).
* Detects **100% of any odd number of bit errors** (since $(x+1)$ is a factor of $G(x)$).
* Detects **100% of burst errors of length $\le 32$ bits**.
* Detects **$99.99999995\%$ of burst errors of length 33 bits** ($1 - 2^{-31}$).
* Detects **$99.99999998\%$ of all longer burst errors** ($1 - 2^{-32}$).

[Source: Ch 3 Data Link Layer.pdf, Slides 34–38; Chapter3-DataLinkLayer_NEW.pdf, Slides 36–42]

---

## 6. Flow Control & Elementary Data Link Protocols

Flow control prevents sender buffer overrun at the receiver. Protocols progress from idealized theoretical models to practical noisy-channel implementations.

```mermaid
stateDiagram-v2
    [*] --> Protocol_1_Utopian
    Protocol_1_Utopian --> Protocol_2_Stop_and_Wait : Add Flow Control
    Protocol_2_Stop_and_Wait --> Protocol_3_PAR_ARQ : Add Error Control & 1-bit Seq No
    Protocol_3_PAR_ARQ --> Protocol_4_Sliding_Window_1bit : Add Bidirectional Piggybacking
    Protocol_4_Sliding_Window_1bit --> Protocol_5_Go_Back_N : Add Pipelining (Ws > 1, Wr = 1)
    Protocol_5_Go_Back_N --> Protocol_6_Selective_Repeat : Add Receiver Buffering (Ws > 1, Wr > 1)
```

---

### Protocol 1: Utopian Simplex Protocol
* **Assumptions:** Data is transmitted strictly in one direction (simplex); sending and receiving network layers are always ready; infinite buffer space; physical channel is completely noiseless (never corrupts or loses frames).
* **Operation:** Sender fetches packet from network layer, encapsulates it into a frame, and transmits it. Receiver waits in an infinite loop, receives the frame, extracts the packet, and delivers it upward.

[Source: Ch 3 Data Link Layer.pdf, Slides 39–41]

---

### Protocol 2: Simplex Stop-and-Wait Protocol (for Error-Free Channel)
* **Problem Addressed:** Prevents a fast sender from flooding a slow receiver with data when the receiver has finite processing speed and buffer space.
* **Mechanism:** Half-duplex stop-and-wait flow control. After transmitting a data frame, the sender stops and waits. The receiver, upon receiving the frame and passing the packet upward, sends back an explicit **dummy acknowledgment (ACK) frame**. Only upon receiving this ACK does the sender transmit the next data frame.

[Source: Ch 3 Data Link Layer.pdf, Slides 42–44]

---

### Protocol 3: Positive Acknowledgment with Retransmission (PAR / Stop-and-Wait ARQ)
* **Problem Addressed:** Handling noisy physical channels where frames or ACKs can be corrupted or lost completely.
* **Mechanisms Added:**
  1. **Frame Checksum:** Receiver verifies checksum; silently discards corrupted frames.
  2. **Sender Retransmission Timer:** If an ACK is not received within a timeout period, the sender automatically retransmits the frame.
  3. **1-Bit Sequence Number ($0$ and $1$):** Solves the duplicate frame ambiguity caused by premature timeouts or lost ACKs. The sender alternates the sequence number bit on each new frame ($0, 1, 0, 1, \dots$). The receiver tracks the expected sequence number; if a duplicate frame arrives, the receiver re-acknowledges it and discards the duplicate payload.

[Source: Ch 3 Data Link Layer.pdf, Slides 45–48; Chapter3-DataLinkLayer_NEW.pdf, Slides 48–52]

---

## 7. Sliding Window Protocols

In full-duplex links, data flows simultaneously in both directions. Using **piggybacking**, when a data frame arrives, the receiver does not send an immediate standalone ACK frame; instead, it waits until its own network layer provides an outbound data packet, inserts the acknowledgment sequence number into the header of that outgoing data frame, and transmits them together. If no outbound data is ready within an **ACK Timer** duration, a standalone ACK is dispatched.

---

### Protocol 4: 1-Bit Sliding Window Protocol

* **Window Sizes:** Sender Window Size $W_s = 1$, Receiver Window Size $W_r = 1$.
* **Operation:** At any instant, the sender can have at most one unacknowledged frame in transit. Sequence numbers take values $0$ and $1$.
* **Normal vs Error Scenarios:**
  * If a data frame or ACK is lost, the sender's timer expires and the frame is retransmitted.
  * **Simultaneous Transmission Anomaly:** If Host A and Host B transmit simultaneously, their frames cross in transit. Both machines accept the incoming frame, deliver the packet, and transmit the next frame with inverted sequence number. The protocol continues correctly, but channel utilization is halved because every frame is sent twice.

[Source: Ch 3 Data Link Layer.pdf, Slides 46–50; Chapter3-DataLinkLayer_NEW.pdf, Slides 53–58]

---

### Pipelining & Channel Efficiency

In high-bandwidth or long-delay links (e.g., satellite links or fiber-optic WANs), Stop-and-Wait protocol wastes almost all link capacity because the sender must remain idle during the entire round-trip time.

#### Tanenbaum's Satellite Channel Case Study
Consider a $50\text{ kbps}$ satellite channel with a $500\text{ ms}$ round-trip propagation delay ($\text{RTT} = 500\text{ ms}$, one-way $T_p = 250\text{ ms}$). Suppose a station uses Stop-and-Wait to send $1000\text{-bit}$ frames:
* **Frame Transmission Time:** $T_{\text{trans}} = \f\frac{1000\text{ bits}}{50,000\text{ bps}} = 20\text{ ms} = 0.020\text{ s}$.
* **Timeline:** At $t = 0\text{ ms}$, sender starts transmitting frame 0. At $t = 20\text{ ms}$, frame 0 is fully sent onto the wire. At $t = 270\text{ ms}$, frame 0 fully arrives at the satellite receiver. At $t = 520\text{ ms}$, the ACK arrives back at the sender.
* **Sender Blocking:** The sender is active for only $20\text{ ms}$ out of $520\text{ ms}$, remaining blocked for $500\text{ ms}$ ($96\%$ of the time). Link utilization is only $\frac{20}{520} \approx 3.85\% \approx 4\%$.

Let $T_{\text{trans}} = \f\frac{L}{R}$ be frame transmission time, and $T_{\text{prop}} = \f\frac{D}{v}$ be one-way propagation delay. Define normalized propagation delay:

$$
a = \f\frac{T_{\text{prop}}}{T_{\text{trans}}}
$$

The link utilization (efficiency) of Stop-and-Wait ARQ is:

$$
\eta_{\text{Stop-and-Wait}} = \f\frac{T_{\text{trans}}}{T_{\text{trans}} + 2 T_{\text{prop}}} = \f\frac{1}{1 + 2a}
$$

#### The Bandwidth-Delay Product (BDP) & Pipelining Solution
To achieve $100\%$ channel utilization, the sender must transmit frames continuously without waiting, requiring a pipeline window size:

$$
W_s \ge 1 + 2a = 1 + 2 \cdot \text{BDP}_{\text{frames}} = 1 + \f\frac{2 \times T_{\text{prop}}}{T_{\text{trans}}}
$$

For the satellite link ($a = \frac{250}{20} = 12.5$), the required pipeline window size is $W_s \ge 1 + 2(12.5) = 26\text{ frames}$. By keeping 26 unacknowledged frames continuously in flight, link efficiency reaches $100\%$.

[Source: Ch 3 Data Link Layer.pdf, Slides 51–52; CN_Numericals_Data_Link_Layer.pdf, Pages 26–29; dll_ma.pdf, pp. 232–233]

---

### Protocol 5: Go-Back-N Protocol (GBN)

* **Architectural Concept:** Pipelined transmission with Sender Window $W_s > 1$ and Receiver Window $W_r = 1$.
* **Receiver Behavior:** The receiver accepts frames **strictly in sequential order**. If a frame arrives damaged or out of order, the receiver discards it and **discards all subsequent incoming frames**, sending no ACKs for out-of-order frames. The receiver maintains zero buffer for out-of-order data.
* **Sender Behavior:** The sender buffers all unacknowledged transmitted frames in its window. It maintains a timer for the oldest unacknowledged frame. When this timer expires, the sender **"goes back $N$"** and retransmits *all* unacknowledged frames currently in the window, even if some were received correctly.
* **Acknowledgments:** Uses **cumulative ACKs** (ACK $n$ confirms all frames $\le n$).

```mermaid
sequenceDiagram
    autonumber
    actor Sender as Sender (Ws = 4)
    actor Receiver as Receiver (Wr = 1)
    
    Sender->>Receiver: Frame 0
    Sender->>Receiver: Frame 1
    Sender->>Receiver: Frame 2 (LOST IN TRANSIT)
    Sender->>Receiver: Frame 3
    Receiver-->>Sender: ACK 0
    Receiver-->>Sender: ACK 1
    Note over Receiver: Receives Frame 3 out-of-order -> DISCARDED!
    Note over Sender: Timeout expires for Frame 2!
    Note over Sender: Go Back N: Retransmit Frames 2 and 3
    Sender->>Receiver: Frame 2 (Retransmission)
    Sender->>Receiver: Frame 3 (Retransmission)
    Receiver-->>Sender: ACK 2
    Receiver-->>Sender: ACK 3
```

#### Maximum Window Size Rule & Proof for Go-Back-N
For an $n$-bit sequence number ($0$ to $2^n - 1$, total modulo $M = 2^n$):

$$
W_s \le 2^n - 1
$$

*Proof of $W_s \le 2^n - 1$:* Suppose $n = 3$ ($M = 8$, sequences $0 \dots 7$) and a flawed protocol sets $W_s = 2^n = 8$:
1. Sender transmits frames $0, 1, 2, 3, 4, 5, 6, 7$.
2. All 8 frames arrive correctly. The receiver advances its expected sequence number to $0$ (next generation) and sends cumulative ACK 7.
3. Suppose **all ACKs are destroyed by channel noise**.
4. Sender's timer expires for frame 0. Sender retransmits frame 0.
5. Receiver (expecting new frame 0 of next batch) receives retransmitted old frame 0. The receiver **cannot distinguish old frame 0 from new frame 0**, silently accepting a duplicate frame! Setting $W_s \le 2^n - 1$ ensures old and new windows never overlap.

#### Software Timer Management (Delta-Tick Linked List)
Because Go-Back-N allows multiple outstanding frames, it logically requires a timer per frame. In software, these multiple timers are simulated using a **single hardware clock** that ticks periodically (e.g. every $1\text{ ms}$). Pending timeouts form a linked list sorted by absolute expiration time. Each list node contains:
`[ Ticks to Go | Frame Number | Pointer to Next Node ]`.
Only the tick counter at the head of the list is decremented on each hardware tick. When it reaches 0, the head node is popped and a timeout event is raised.

[Source: Ch 3 Data Link Layer.pdf, Slides 53–56; Chapter3-DataLinkLayer_NEW.pdf, Slides 60–66; dll_ma.pdf, pp. 234–238]

---

### Protocol 6: Selective Repeat Protocol (SR)

* **Architectural Concept:** Pipelined transmission with Sender Window $W_s > 1$ and Receiver Window $W_r > 1$.
* **Receiver Buffering:** The receiver possesses a buffer array of size $W_r$. When an out-of-order frame arrives without corruption within the receiver's window, the receiver stores it in the buffer and sends a **Negative Acknowledgment (NAK / SREJ)** for the missing frame.
* **Sender Fast Retransmission:** The sender maintains an independent timer for each frame. When a NAK arrives or a specific timer expires, the sender retransmits **only the single missing or damaged frame**, without retransmitting successfully received subsequent frames.
* **Window Advance:** When the missing frame finally arrives, the receiver delivers the entire consecutive buffered sequence to the network layer and slides its window forward.

#### Auxiliary ACK Timer (`start_ack_timer`)
If reverse data traffic is sporadic or one-way, piggybacking would hold up acknowledgments indefinitely, causing the sender's retransmission timer to expire unnecessarily. Selective Repeat uses an auxiliary timer (`start_ack_timer`). If no reverse data packet arrives before `start_ack_timer` expires, an `ack_timeout` event triggers a standalone ACK frame. The auxiliary timeout must be significantly shorter than the sender's frame retransmission timeout.

#### Maximum Window Size Rule & Proof for Selective Repeat
For an $n$-bit sequence number ($M = 2^n$):

$$
W_s + W_r \le 2^n
$$

When sender and receiver windows are equal ($W_s = W_r$):

$$
W_s = W_r \le 2^{n-1} = \f\frac{2^n}{2}
$$

*Proof of $W_s \le 2^{n-1}$:* Suppose $n = 3$ ($M = 8$) and windows are incorrectly set to $W_s = W_r = 5 > 4$:
1. Sender transmits frames $0, 1, 2, 3, 4$.
2. Receiver accepts all 5 frames, advances its window to $[5, 6, 7, 0, 1]$, and returns ACKs.
3. All ACKs are lost on the channel.
4. Sender times out and retransmits frame 0.
5. Receiver receives frame 0. Sequence number 0 falls inside the receiver's new window $[5, 6, 7, 0, 1]$. The receiver accepts old frame 0 as new frame 0, corrupting the stream! Setting $W_s = W_r \le 2^{n-1} = 4$ eliminates window overlap.

[Source: Ch 3 Data Link Layer.pdf, Slides 57–63; Chapter3-DataLinkLayer_NEW.pdf, Slides 67–75; dll_ma.pdf, pp. 239–243]

---

## 8. Example Data Link Protocols

Real-world WAN and access networks rely on standard data link protocols to encapsulate IP packets across physical circuits.

---

### HDLC (High-Level Data Link Control)

HDLC is a bit-oriented synchronous protocol derived from IBM SDLC and standardized by ISO (ISO 13239). It operates over point-to-point and multipoint links using bit stuffing (`01111110`).

#### HDLC Frame Structure

| Field | Size | Description |
| :--- | :---: | :--- |
| **Flag** | 8 bits | Frame delimiter pattern: `01111110` (`0x7E`) |
| **Address** | 8 or 16 bits | Identifies secondary station address on multipoint links |
| **Control** | 8 or 16 bits | Identifies frame type, sequence numbers $N(S), N(R)$, and $P/F$ bit |
| **Data (Payload)** | Variable | Network layer packet |
| **FCS (Checksum)** | 16 or 32 bits | CRC-CCITT or CRC-32 Frame Check Sequence |
| **Flag** | 8 bits | Frame closing delimiter: `01111110` (`0x7E`) |

#### The Three HDLC Frame Types

1. **Information Frames (I-Frames):**
   * Transmit user data.
   * Control field format: `0 | N(S) | P/F | N(R)`
   * $N(S)$ = 3-bit send sequence number of current frame.
   * $N(R)$ = 3-bit piggybacked acknowledgment (next expected frame).
   * $P/F$ = Poll/Final bit (used to poll stations or mark final response).
2. **Supervisory Frames (S-Frames):**
   * Transmit flow and error control commands when no reverse data is present.
   * Control field format: `1 0 | Type | P/F | N(R)`
   * Type codes:
     * `00` — **Receive Ready (RR):** Positive acknowledgment confirming receipt up to $N(R)-1$.
     * `01` — **Receive Not Ready (RNR):** Acknowledges frames but tells sender receiver buffer is full.
     * `10` — **Reject (REJ):** NAK for Go-Back-N; requests retransmission starting from $N(R)$.
     * `11` — **Selective Reject (SREJ):** NAK for Selective Repeat; requests retransmission of only frame $N(R)$.
3. **Unnumbered Frames (U-Frames):**
   * Used for link management, mode setting, and connection setup/teardown.
   * Control field format: `1 1 | Type | P/F | Modifier`
   * Commands: `SABM` (Set Asynchronous Balanced Mode), `DISC` (Disconnect), `UA` (Unnumbered Acknowledgment), `FRMR` (Frame Reject).

[Source: Ch 3 Data Link Layer.pdf, Slides 64–65; Chapter3-DataLinkLayer_NEW.pdf, Slides 76–80; dll_ma.pdf, pp. 246–247]

---

### Packet over SONET (PoS)

SONET (Synchronous Optical Network) is the primary physical-layer protocol used over wide-area optical fiber links in telecommunication backbones (e.g. 2.4 Gbps OC-48). SONET provides a continuous bitstream organized into fixed-size byte payloads recurring every $125\,\mu\text{s}$, whether or not user data is present.

To carry IP packets over SONET:
1. IP packets are encapsulated inside **PPP frames**.
2. **Payload Scrambling:** Before inserting the PPP frame into the SONET payload, the PPP payload is XORed with a long pseudorandom bit sequence (scrambled).
   * *Purpose of Scrambling:* SONET physical-layer receivers require frequent bit transitions ($0 \to 1$ and $1 \to 0$) to extract clock timing. User data containing long runs of `0`s would cause receiver clock loss. Scrambling guarantees pseudo-random transition density.
3. The scrambled frame is mapped directly into SONET payload bytes.

[Source: dll_ma.pdf, pp. 245–247]

---

### PPP (Point-to-Point Protocol — RFC 1661)

PPP is the standard Internet data link protocol for point-to-point connections across dial-up modems, DSL, leased lines, and router-to-router links.

#### Core Architectural Components of PPP
1. **HDLC-like Framing:** Provides unambiguous byte-oriented framing (`0x7E`) with CRC error detection.
2. **Link Control Protocol (LCP):** Used to bring lines up, test line quality, negotiate maximum frame size (MRU), negotiate header compression options, and tear down links gracefully.
3. **Authentication Protocols:** Optional PAP (Password Authentication Protocol) or CHAP (Challenge Handshake Authentication Protocol).
4. **Network Control Protocols (NCPs):** A modular family of independent protocols used to configure specific network-layer protocols (e.g., **IPCP** dynamically assigns IP addresses, subnet masks, and DNS servers for IPv4).

#### PPP Frame Format & Header Compression

| Field | Size (Bytes) | Standard Value | Description |
| :--- | :---: | :---: | :--- |
| **Flag** | 1 | `0x7E` (`01111110`) | Frame delimiter byte |
| **Address** | 1 | `0xFF` (`11111111`) | All-stations broadcast address (point-to-point link) |
| **Control** | 1 | `0x03` (`00000011`) | Unnumbered information frame |
| **Protocol** | 1 or 2 | Variable | Identifies payload type (`0x0021` = IPv4, `0x8021` = IPCP, `0xC021` = LCP, `0xC223` = CHAP) |
| **Payload** | Variable | Up to MRU ($1500$) | Network layer packet or LCP/NCP control payload |
| **Checksum (FCS)**| 2 or 4 | CRC-16 or CRC-32 | Error detection checksum |
| **Flag** | 1 | `0x7E` (`01111110`) | Frame closing delimiter |

*Byte Stuffing in PPP:* Uses escape character `0x7D`. Any occurrence of `0x7E` in payload is replaced by `0x7D 0x5E`; `0x7D` is replaced by `0x7D 0x5D`.

*LCP Header Compression Option:* Because Address (`0xFF`) and Control (`0x03`) are constant on point-to-point lines, LCP can negotiate to **omit Address and Control fields entirely**, saving 2 bytes per frame. It can also compress the Protocol field from 2 bytes to 1 byte.

#### PPP Link Lifecycle State Machine

```mermaid
stateDiagram-v2
    [*] --> Dead
    Dead --> Establish : Carrier Detected / Physical Link Ready
    Establish --> Authenticate : LCP Option Negotiation ACK
    Establish --> Dead : Carrier Lost / LCP Fail
    Authenticate --> Network : PAP/CHAP Authentication Success
    Authenticate --> Terminate : Authentication Failed
    Network --> Open : NCP/IPCP Option Negotiation ACK
    Open --> Terminate : Close Request / Carrier Lost
    Terminate --> Dead : LCP Terminate ACK
```

[Source: Ch 3 Data Link Layer.pdf, Slides 65–67; Chapter3-DataLinkLayer_NEW.pdf, Slides 81–84; dll_ma.pdf, pp. 245–248]

---

### ADSL & PPPoA (PPP over ATM — RFC 2364)

ADSL connects millions of home subscribers to the Internet over copper local loops using Discrete Multi-Tone (DMT) modulation (256 frequency subchannels).

#### End-to-End ADSL Data Link Architecture
1. **Customer Premise (Home):** PC generates IP packets, sent via Ethernet to the DSL modem.
2. **DSL Modem:** Encapsulates IP packets inside a PPP frame.
3. **AAL5 Encapsulation (ATM Adaptation Layer 5):** The PPP frame is handed to AAL5. AAL5 appends padding and an 8-byte trailer (Length + 4-byte CRC-32).
   * *Omission of Redundant Fields:* Inside AAL5, **PPP framing flag bytes (`0x7E`) and PPP checksums are omitted**. ATM and AAL5 already provide framing and 32-bit CRC. Adding PPP flags would be redundant overhead.
4. **ATM Cell Segmentation (Asynchronous Transfer Mode):** The AAL5 frame is sliced into fixed **53-byte ATM cells** (5-byte header + 48-byte payload).
   * *Political Compromise on 53 Bytes:* The 48-byte payload size was a political compromise between Europe (which wanted 32-byte cells for short voice delay) and the US (which wanted 64-byte cells for high data throughput).
5. **Physical Layer Transmission:** ATM cells are modulated over copper DMT subcarriers to the DSLAM (DSL Access Multiplexer) at the telephone central office. Physical layer protection includes Reed-Solomon error correction and a 1-byte physical CRC.

[Source: Ch 3 Data Link Layer.pdf, Slide 68; Chapter3-DataLinkLayer_NEW.pdf, Slides 85–86; dll_ma.pdf, pp. 248–250]

---

## 9. Mathematical Foundations, Formulas & Derivations

---

### 1. Stop-and-Wait ARQ Efficiency Derivation

#### Derivation
Let a station transmit a frame of $L$ bits over a channel with bit rate $R$ bps, distance $D$ meters, and propagation speed $v$ m/s.
* Frame transmission time: $T_t = \f\frac{L}{R}$
* One-way propagation delay: $T_p = \f\frac{D}{v}$
* Round-Trip Time: $\text{RTT} = 2 T_p$
* Acknowledgment frame transmission time $T_{\text{ack}} \approx 0$.

Total time required to successfully transmit one frame and receive its acknowledgment:

$$
T_{\text{total}} = T_t + 2 T_p = T_t(1 + 2a)
$$

Where $a = \f\frac{T_p}{T_t} = \f\frac{D \cdot R}{v \cdot L}$.

The link utilization (efficiency) $\eta$ is the ratio of useful transmission time to total elapsed time:

$$
\eta = \f\frac{T_t}{T_{\text{total}}} = \f\frac{T_t}{T_t + 2 T_p} = \f\frac{1}{1 + 2a}
$$

[Source: CN_Numericals_Data_Link_Layer.pdf, Pages 18, 26–27]

---

### 2. Pipelined Sliding Window (Go-Back-N) Efficiency

For a sender window size $W_s$:
* If $W_s < 1 + 2a$, the sender exhausts its window before the first ACK arrives:

$$
\eta = \f\frac{W_s \cdot T_t}{T_t + 2 T_p} = \f\frac{W_s}{1 + 2a}
$$

* If $W_s \ge 1 + 2a$, the sender transmits continuously and achieves maximum channel capacity:

$$
\eta = 1.0 = 100\%
$$

[Source: CN_Numericals_Data_Link_Layer.pdf, Pages 28–29, 31]

---

### 3. Hamming $(n, k)$ Code Distance & Parity Bits

* **Parity bit count inequality:** $2^r \ge m + r + 1$
* **Error detection condition:** $d_{\min} \ge s + 1$
* **Error correction condition:** $d_{\min} \ge 2t + 1$

[Source: CN_Numericals_Data_Link_Layer.pdf, Pages 4, 7, 11]

---

## 10. Algorithms and Procedures

---

### Algorithm 3.1: Character / Byte Stuffing

**Purpose:** Ensure transparent data transmission in byte-oriented framing.  
**Input:** Raw byte array `data[]`, length $N$.  
**Output:** Stuffed byte array `stuffed[]` bounded by `FLAG` bytes.

**Procedure:**
1. Append `FLAG` byte (`0x7E`) to output.
2. For each byte $B$ in `data[]`:
   * If $B == \text{FLAG}$ (`0x7E`), append `ESC` (`0x7D`) and `(0x7E ^ 0x20)` (`0x5E`) to output.
   * Else if $B == \text{ESC}$ (`0x7D`), append `ESC` (`0x7D`) and `(0x7D ^ 0x20)` (`0x5D`) to output.
   * Else, append $B$ directly to output.
3. Append closing `FLAG` byte (`0x7E`) to output.

---

### Algorithm 3.2: Bit Stuffing

**Purpose:** Prevent accidental flag pattern `01111110` in bit-oriented framing.  
**Input:** Raw bit sequence.  
**Output:** Bit-stuffed transmission sequence.

**Procedure:**
1. Initialize `consecutive_ones = 0`.
2. For each incoming bit $b$:
   * Transmit $b$.
   * If $b == 1$:
     * Increment `consecutive_ones`.
     * If `consecutive_ones == 5`:
       * Transmit an extra `0` bit.
       * Reset `consecutive_ones = 0`.
   * Else ($b == 0$):
     * Reset `consecutive_ones = 0`.

---

### Algorithm 3.3: CRC Generation via Modulo-2 Division

**Purpose:** Calculate Frame Check Sequence (FCS) remainder.  
**Input:** $m$-bit message $M$, degree-$r$ generator $G$.  
**Output:** Transmitted $(m+r)$-bit codeword $T$.

**Procedure:**
1. Append $r$ zero bits to $M$, forming dividend string $D$ of length $m+r$.
2. Align divisor $G$ with the leftmost `1` bit of $D$.
3. Perform bitwise XOR between $G$ and the $r+1$ bits of $D$ underneath it.
4. Shift right to the next `1` bit in $D$ and repeat XOR with $G$ until the end of $D$ is reached.
5. The remaining $r$-bit string is remainder $R$.
6. Replace the $r$ appended zeros of $D$ with $R$ to form transmitted codeword $T$.

[Source: Ch 3 Data Link Layer.pdf, Slides 16, 18, 38]

---

## 11. Diagrams and Architecture Analysis

---

### Figure 3.1: Packet in Frame Relationship

![Figure 3.1: Packet in Frame Relationship](../images/chapter3/ch3_packet_in_frame.png)

#### Written Analysis of Figure 3.1
* **What it shows:** Illustrates how a Network Layer packet is encapsulated into the payload field of a Data Link Layer frame, flanked by a header and trailer.
* **Components:** Frame Header (preamble, source/destination physical addresses, frame type/length), Packet Payload (Network-layer data), Frame Trailer (error-checking CRC/FCS).
* **Flow / Relationship:** The Network Layer hands a complete packet across the SAP interface. The DLL wraps the packet with header and trailer before passing bits to the Physical Layer.

[Source: Ch 3 Data Link Layer.pdf, Slide 5]

---

### Figure 3.2: Data Link Layer Virtual vs Actual Communication

![Figure 3.2: DLL Virtual vs Actual Communication](../images/chapter3/ch3_dll_virtual_communication.png)

#### Written Analysis of Figure 3.2
* **What it shows:** Contrasts the horizontal logical (virtual) peer-to-peer frame communication between Data Link Layers with the actual vertical signal path traversing the physical hardware medium.
* **Components:** Node A (Layers 3, 2, 1), Node B (Layers 3, 2, 1), Physical wire link.

[Source: Ch 3 Data Link Layer.pdf, Slide 10]

---

### Figure 3.3: Framing Character / Byte Count & Synchronization Error

![Figure 3.3: Framing Character / Byte Count](../images/chapter3/ch3_framing_byte_count.png)

#### Written Analysis of Figure 3.3
* **What it shows:** (a) Normal operation of byte count framing across four frames. (b) Catastrophic synchronization failure caused by a single bit error flipping count `5` to `7` in Frame 2.

[Source: Ch 3 Data Link Layer.pdf, Slide 14]

---

### Figure 3.4: Byte Stuffing and Destuffing Mechanism

![Figure 3.4: Byte Stuffing Mechanism](../images/chapter3/ch3_byte_stuffing.png)

#### Written Analysis of Figure 3.4
* **What it shows:** Demonstrates how escape (`ESC`) bytes are stuffed before payload `FLAG` and `ESC` bytes, and stripped at the receiver to achieve data transparency.

[Source: Ch 3 Data Link Layer.pdf, Slide 16]

---

### Figure 3.5: Bit Stuffing Mechanism (HDLC / USB)

![Figure 3.5: Bit Stuffing Mechanism](../images/chapter3/ch3_bit_stuffing.png)

#### Written Analysis of Figure 3.5
* **What it shows:** Visualizes the injection of a `0` bit after every five consecutive `1` bits in data payload, and its subsequent removal at the destination receiver.

[Source: Ch 3 Data Link Layer.pdf, Slide 18]

---

### Figure 3.6: Hamming $(7,4)$ Code Bit Position Matrix

![Figure 3.6: Hamming Code Bit Layout](../images/chapter3/ch3_hamming_code_layout.png)

#### Written Analysis of Figure 3.6
* **What it shows:** Shows the structural interleaving of 3 parity check bits ($p_1, p_2, p_4$ at bit positions $1, 2, 4$) and 4 data bits ($d_1, d_2, d_3, d_4$ at bit positions $3, 5, 6, 7$).

[Source: Ch 3 Data Link Layer.pdf, Slide 27]

---

### Figure 3.7: Hamming Error Detection Syndrome Decoding

![Figure 3.7: Hamming Error Syndrome](../images/chapter3/ch3_hamming_error_syndrome.png)

#### Written Analysis of Figure 3.7
* **What it shows:** Illustrates how evaluating the three parity equations over received codeword `1110110` yields non-zero syndrome vector $101_2 = 5$, directly identifying bit 5 as the erroneous bit.

[Source: Ch 3 Data Link Layer.pdf, Slide 30]

---

### Figure 3.8: CRC Modulo-2 Polynomial Division

![Figure 3.8: CRC Modulo-2 Polynomial Division](../images/chapter3/ch3_crc_generation.png)

#### Written Analysis of Figure 3.8
* **What it shows:** Step-by-step modulo-2 long division of message $1101011111$ appended with 6 zeros by generator $G(x) = x^6 + x^4 + x^3 + 1$ ($1011001$), yielding remainder $R = 011110$.

[Source: Ch 3 Data Link Layer.pdf, Slide 38]

---

### Figure 3.9: Sliding Window Concepts & Window Advances

![Figure 3.9: Sliding Window Concept](../images/chapter3/ch3_sliding_window_concept.png)

#### Written Analysis of Figure 3.9
* **What it shows:** Visualizes sender and receiver sliding windows: frames unacknowledged, frames eligible to send, and window expansion/contraction upon frame transmissions and ACK receptions.

[Source: Ch 3 Data Link Layer.pdf, Slide 46]

---

### Figure 3.10: 1-Bit Sliding Window Protocol State Timeline

![Figure 3.10: 1-Bit Sliding Window Protocol Timeline](../images/chapter3/ch3_protocol4_timeline.png)

#### Written Analysis of Figure 3.10
* **What it shows:** Chronological packet-by-packet state progression for Protocol 4 showing (a) normal transmission exchange and (b) simultaneous startup anomaly.

[Source: Ch 3 Data Link Layer.pdf, Slide 47]

---

### Figure 3.11: ARQ Normal and Error Recovery Timelines

![Figure 3.11: ARQ Error Scenarios](../images/chapter3/ch3_arq_error_scenarios.png)

#### Written Analysis of Figure 3.11
* **What it shows:** Chronological comparison of ARQ error scenarios: (a) Lost data frame triggering sender timeout retransmission; (b) Lost ACK frame triggering duplicate transmission and duplicate rejection.

[Source: Ch 3 Data Link Layer.pdf, Slide 51]

---

### Figure 3.12: Go-Back-N Pipelined Transmission Flow

![Figure 3.12: Go-Back-N Flow](../images/chapter3/ch3_gobackn_flow.png)

#### Written Analysis of Figure 3.12
* **What it shows:** Illustrates Go-Back-N with $W_s = 4$. Frame 2 is damaged in transit; receiver discards frames 2, 3, 4, 5. Sender timer expires on frame 2 and retransmits all frames 2, 3, 4, 5.

[Source: Ch 3 Data Link Layer.pdf, Slide 53]

---

### Figure 3.13: Go-Back-N vs Selective Repeat Window Size Limits

![Figure 3.13: Window Size Limits](../images/chapter3/ch3_window_size_limits.png)

#### Written Analysis of Figure 3.13
* **What it shows:** Detailed state diagram proving why Go-Back-N requires $W_s \le 2^n - 1$ and Selective Repeat requires $W_s = W_r \le 2^{n-1}$ to prevent sequence number wrap-around ambiguity.

[Source: Ch 3 Data Link Layer.pdf, Slide 58]

---

### Figure 3.14: PPP Frame Format

![Figure 3.14: PPP Frame Format](../images/chapter3/ch3_ppp_frame_format.png)

#### Written Analysis of Figure 3.14
* **What it shows:** Field-by-field layout of the RFC 1661 PPP frame: Flag (`0x7E`), Address (`0xFF`), Control (`0x03`), Protocol (16-bit), Payload, FCS Checksum (16/32-bit), Flag (`0x7E`).

[Source: Ch 3 Data Link Layer.pdf, Slide 65]

---

### Figure 3.15: PPP Link State Transition Diagram

![Figure 3.15: PPP State Diagram](../images/chapter3/ch3_ppp_state_diagram.png)

#### Written Analysis of Figure 3.15
* **What it shows:** Complete lifecycle state machine of a PPP connection: Dead $\to$ Establish (LCP) $\to$ Authenticate (PAP/CHAP) $\to$ Network (NCP/IPCP) $\to$ Open $\to$ Terminate $\to$ Dead.

[Source: Ch 3 Data Link Layer.pdf, Slide 66]

---

### Figure 3.16: ADSL Protocol Stack Architecture

![Figure 3.16: ADSL Protocol Stack](../images/chapter3/ch3_adsl_protocol_stack.png)

#### Written Analysis of Figure 3.16
* **What it shows:** End-to-end layered protocol stack of ADSL broadband, showing user IP packets encapsulated in PPP over AAL5 CPCS-PDU, mapped to 53-byte ATM cells, transmitted over DMT physical copper line.

[Source: Ch 3 Data Link Layer.pdf, Slide 68]

---


### Figure 3.17: UDP/IP Internet 1's Complement Checksum Example

![Figure 3.17: UDP/IP Internet 1's Complement Checksum Example](../images/chapter3/ch3_checksum_example.png)

#### Written Analysis of Figure 3.17

**What it shows:**
The step-by-step 16-bit 1's complement addition and inversion mechanism used in the Internet Checksum (UDP/TCP/IP):
1. The sender divides the data stream into consecutive 16-bit words.
2. All 16-bit words are summed using 1's complement arithmetic (any carry out of the most significant bit is wrapped around and added to the least significant bit: end-around carry).
3. The sum is inverted (1's complement bitwise NOT) to form the checksum field placed in the header.
4. The receiver repeats the identical 16-bit summation over all words *including* the checksum: if the channel is error-free, the resulting sum must evaluate to all 1s (`0xFFFF`), which inverts to `0x0000`.

**Algorithmic Verification:**
If any single bit error occurs, the sum will differ from `0xFFFF`, flagging corrupted data. However, the 1's complement checksum cannot detect compensating errors where one word increases by $k$ and another decreases by $k$, nor does it detect reordering of 16-bit words.

[Source: Ch 3 Data Link Layer.pdf, Slide 33]

---
## 12. Tables and Comprehensive Comparisons

---

### Table 3.1: Comprehensive ARQ Protocol Comparison

| Criterion | Stop-and-Wait ARQ | Go-Back-N ARQ (GBN) | Selective Repeat ARQ (SR) |
| :--- | :--- | :--- | :--- |
| **Sender Window Size ($W_s$)** | $W_s = 1$ | $1 < W_s \le 2^n - 1$ | $1 < W_s \le 2^{n-1}$ |
| **Receiver Window Size ($W_r$)** | $W_r = 1$ | $W_r = 1$ | $W_r = W_s \le 2^{n-1}$ |
| **Out-of-Order Frame Handling** | Impossible (window is 1) | Discarded immediately; no buffer | Buffered in receiver memory |
| **Retransmission Scope** | Only the single timed-out frame | All $N$ frames in current window | Only the specific damaged/lost frame |
| **Acknowledgment Scheme** | Individual ACK | Cumulative ACK ($ACK\ n$) | Individual ACK + Negative ACK (NAK) |
| **Receiver Complexity** | Extremely simple; 0 buffer | Very simple; 0 buffer | Complex; requires buffering and sorting |
| **Sender Complexity** | Simple single timer | Single timer for oldest frame | Independent timer per frame |
| **Link Bandwidth Efficiency** | Very low on high-BDP links | High under low error rates; degrades rapidly under high errors | Maximum efficiency even on noisy high-BDP links |

[Source: Ch 3 Data Link Layer.pdf, Slides 45–63; Chapter3-DataLinkLayer_NEW.pdf, Slides 50–75]

---

### Table 3.2: Framing Techniques Comparison

| Framing Method | Delimiter Used | Stuffing Overhead Mechanism | Vulnerability / Limitation | Primary Real-World Application |
| :--- | :--- | :--- | :--- | :--- |
| **Byte Count** | Length count integer in header | None | Corrupted count destroys all subsequent synchronization | Early DECnet protocols |
| **Byte Stuffing** | `FLAG` byte (`0x7E`) | `ESC` (`0x7D`) inserted before payload flags/escapes | Modest byte-level expansion overhead | PPP, Serial dial-up lines |
| **Bit Stuffing** | `01111110` bit pattern | `0` bit stuffed after five consecutive `1`s | Bit-level manipulation overhead | HDLC, SDLC, USB |
| **Coding Violations** | Invalid line signaling pattern | Zero data stuffing overhead | Requires redundant line coding (e.g. Manchester) | Classic Ethernet (802.3), Token Ring |

[Source: Ch 3 Data Link Layer.pdf, Slides 14–19]

---

### Table 3.3: HDLC vs PPP Protocol Comparison

| Feature | HDLC (High-level Data Link Control) | PPP (Point-to-Point Protocol) |
| :--- | :--- | :--- |
| **Orientation** | Bit-oriented (bit stuffing `01111110`) | Byte-oriented (byte stuffing `0x7D`) |
| **Standardizing Body** | ISO (ISO 13239) | IETF (RFC 1661) |
| **Network Layer Support** | Primarily single protocol per link | Multi-protocol via modular NCPs (IP, IPv6, AppleTalk) |
| **Link Negotiation** | Fixed pre-configured options | Dynamic negotiation via LCP |
| **User Authentication** | None built-in | Built-in PAP and CHAP support |
| **Dynamic Addressing** | Static addressing | Dynamic IP assignment via IPCP |
| **Error Recovery** | Full ARQ error recovery (I/S/U frames) | Error detection only (drops bad frames; no DLL retransmission) |

[Source: Ch 3 Data Link Layer.pdf, Slides 64–67]

---

## 13. Worked Numerical Problems

---

### Numerical Problem 1: Hamming Distance Calculation

#### Problem Statement
What is the Hamming distance between the following two binary codewords?
* $v_1 = 0111110000111011$
* $v_2 = 0111111000011001$

#### Step-by-Step Solution
1. Perform bitwise XOR between $v_1$ and $v_2$:
$$
\begin{aligned}
v_1 &= 0111110000111011 \\
v_2 &= 0111111000011001 \\
v_1 \oplus v_2 &= 0000001000100010
\end{aligned}
$$
2. Count the number of `1` bits in the result:
   * Bit positions differing (from left): Bit 7, Bit 11, Bit 15.
   * Total number of `1` bits = $3$.

#### Final Answer
* **Hamming Distance:** $d = 3$

[Source: CN_Numericals_Data_Link_Layer.pdf, Page 2]

---

### Numerical Problem 2: Minimum Hamming Distance for Error Detection & Correction

#### Problem Statement
1. What minimum Hamming distance between codewords is required to detect up to $s = 4$ bit errors?
2. What minimum Hamming distance between codewords is required to correct up to $t = 3$ bit errors?

#### Formulas

$$
d_{\min} \ge s + 1 \quad (\text{Detection})
$$

$$
d_{\min} \ge 2t + 1 \quad (\text{Correction})
$$

#### Step-by-Step Solution
1. For error detection with $s = 4$:

$$
d_{\min} \ge 4 + 1 = 5
$$

2. For error correction with $t = 3$:

$$
d_{\min} \ge 2(3) + 1 = 7
$$

#### Final Answer
* **For 4-bit Detection:** $d_{\min} = 5$
* **For 3-bit Correction:** $d_{\min} = 7$

[Source: CN_Numericals_Data_Link_Layer.pdf, Pages 4, 7]

---

### Numerical Problem 3: Hamming $(7,4)$ Code Encoding

#### Problem Statement
Encode the 4-bit data message $D = 1101$ ($d_1 = 1, d_2 = 1, d_3 = 0, d_4 = 1$) into a 7-bit codeword using the Hamming $(7,4)$ code with even parity.

#### Step-by-Step Solution
1. Bit position layout in 7-bit codeword:
   * Position 1: $p_1$ (Parity)
   * Position 2: $p_2$ (Parity)
   * Position 3: $d_1 = 1$ (Data)
   * Position 4: $p_4$ (Parity)
   * Position 5: $d_2 = 1$ (Data)
   * Position 6: $d_3 = 0$ (Data)
   * Position 7: $d_4 = 1$ (Data)
2. Calculate parity bits (even parity $\implies$ sum modulo 2 is 0):
   * **$p_1$ checks positions $1, 3, 5, 7$:**

$$
p_1 \oplus d_1 \oplus d_2 \oplus d_4 = 0 \implies p_1 \oplus 1 \oplus 1 \oplus 1 = 0 \implies p_1 \oplus 1 = 0 \implies p_1 = 1
$$

   * **$p_2$ checks positions $2, 3, 6, 7$:**

$$
p_2 \oplus d_1 \oplus d_3 \oplus d_4 = 0 \implies p_2 \oplus 1 \oplus 0 \oplus 1 = 0 \implies p_2 \oplus 0 = 0 \implies p_2 = 0
$$

   * **$p_4$ checks positions $4, 5, 6, 7$:**

$$
p_4 \oplus d_2 \oplus d_3 \oplus d_4 = 0 \implies p_4 \oplus 1 \oplus 0 \oplus 1 = 0 \implies p_4 \oplus 0 = 0 \implies p_4 = 0
$$

3. Assemble the 7-bit codeword $[b_7 b_6 b_5 b_4 b_3 b_2 b_1]$:
   * Position 7 ($d_4$) = $1$
   * Position 6 ($d_3$) = $0$
   * Position 5 ($d_2$) = $1$
   * Position 4 ($p_4$) = $0$
   * Position 3 ($d_1$) = $1$
   * Position 2 ($p_2$) = $0$
   * Position 1 ($p_1$) = $1$

Codeword as bit string $[b_1 b_2 b_3 b_4 b_5 b_6 b_7] = 1010101$ (or written left-to-right as positions 7 to 1: $1010101$; in slide convention $[b_7 \dots b_1] = 1100110$).

#### Final Answer
* **Transmitted 7-bit Codeword:** `1100110` (or positions 1 to 7: `1010101`)

[Source: CN_Numericals_Data_Link_Layer.pdf, Pages 11–13]

---

### Numerical Problem 4: Hamming Syndrome Decoding and Error Correction

#### Problem Statement
Suppose the received 7-bit Hamming codeword is `1110110` (with bit positions from left 7 to 1: $b_7=1, b_6=1, b_5=1, b_4=0, b_3=1, b_2=1, b_1=0$). Determine if an error occurred, identify the corrupted bit position, and correct the codeword.

#### Step-by-Step Solution
1. Evaluate parity check equations (even parity):
   * **$s_1$ (Checks positions 1, 3, 5, 7):**

$$
s_1 = b_1 \oplus b_3 \oplus b_5 \oplus b_7 = 0 \oplus 1 \oplus 1 \oplus 1 = 1
$$

   * **$s_2$ (Checks positions 2, 3, 6, 7):**

$$
s_2 = b_2 \oplus b_3 \oplus b_6 \oplus b_7 = 1 \oplus 1 \oplus 1 \oplus 1 = 0
$$

   * **$s_4$ (Checks positions 4, 5, 6, 7):**

$$
s_4 = b_4 \oplus b_5 \oplus b_6 \oplus b_7 = 0 \oplus 1 \oplus 1 \oplus 1 = 1
$$

2. Construct syndrome vector:

$$
S = [s_4 s_2 s_1]_2 = [1 0 1]_2 = 1 \times 4 + 0 \times 2 + 1 \times 1 = 5
$$

3. Since $S = 5 \ne 0$, **Bit 5 is in error**.
4. Correct the error by flipping bit 5 ($b_5 = 1 \to 0$):
   * Corrected codeword: `1100110`.
   * Extract data bits ($b_7, b_6, b_5, b_3$): `1 1 0 1`.

#### Final Answer
* **Corrupted Bit Position:** Bit 5
* **Corrected Codeword:** `1100110`
* **Original Message:** `1101`

[Source: CN_Numericals_Data_Link_Layer.pdf, Page 14]

---

### Numerical Problem 5: Byte Stuffing Transformation

#### Problem Statement
The following data fragment occurs in the middle of a data stream for which the byte-stuffing algorithm is used:  
`A B ESC C ESC FLAG FLAG D`  
What is the payload output after byte stuffing, and what is the complete framed transmission?

#### Step-by-Step Solution
1. Apply escape rule to payload:
   * `A` $\to$ `A`
   * `B` $\to$ `B`
   * `ESC` $\to$ `ESC ESC`
   * `C` $\to$ `C`
   * `ESC` $\to$ `ESC ESC`
   * `FLAG` $\to$ `ESC FLAG`
   * `FLAG` $\to$ `ESC FLAG`
   * `D` $\to$ `D`
2. Stuffed payload:
   `A B ESC ESC C ESC ESC ESC FLAG ESC FLAG D`
3. Add frame delimiters (`FLAG` at start and end):
   `FLAG A B ESC ESC C ESC ESC ESC FLAG ESC FLAG D FLAG`

#### Final Answer
* **Stuffed Payload:** `A B ESC ESC C ESC ESC ESC FLAG ESC FLAG D`
* **Complete Frame:** `FLAG A B ESC ESC C ESC ESC ESC FLAG ESC FLAG D FLAG`

[Source: CN_Numericals_Data_Link_Layer.pdf, Page 15; cn_tutorial.pdf, Tutorial 1, Q2]

---

### Numerical Problem 6: Bit Stuffing Transformation

#### Problem Statement
A bit string `0111101111101111110` needs to be transmitted at the Data Link Layer using bit stuffing. What is the string actually transmitted?

#### Step-by-Step Solution
1. Scan bit string and count consecutive `1`s:
   * `0 1 1 1 1` (four `1`s) $\to$ no stuff.
   * `0` (resets count).
   * `1 1 1 1 1` (five `1`s) $\to$ **insert `0`**.
   * Next bit was `0` $\to$ stream is now `1 1 1 1 1 0 0`.
   * `1 1 1 1 1` (five `1`s) $\to$ **insert `0`**.
   * Next bits `1 0` $\to$ stream is now `1 1 1 1 1 0 1 0`.
2. Assembled transmitted string:

$$
\mathbf{01111011111\underline{0}011111\underline{0}10}
$$

#### Final Answer
* **Transmitted Bit String:** `011110111110011111010`

[Source: CN_Numericals_Data_Link_Layer.pdf, Page 16; cn_tutorial.pdf, Tutorial 1, Q3]

---

### Numerical Problem 7: Stop-and-Wait File Transfer Over 5000 km Link

#### Problem Statement
A system uses the Stop-and-Wait protocol. If each packet carries $1000\text{ bits}$ of data, how long does it take to send $1\text{ million bits}$ ($10^6\text{ bits}$) of data if the distance between sender and receiver is $5000\text{ km}$ and propagation speed is $2 \times 10^8\text{ m/s}$? Ignore transmission, waiting, and processing delays.

#### Given Values
* Total data: $10^6\text{ bits}$
* Packet data: $10^3\text{ bits}$
* Distance: $D = 5000\text{ km} = 5 \times 10^6\text{ m}$
* Velocity: $v = 2 \times 10^8\text{ m/s}$

#### Step-by-Step Solution
1. Number of packets:

$$
N = \f\frac{10^6\text{ bits}}{10^3\text{ bits/packet}} = 1000\text{ packets}
$$

2. One-way propagation delay:

$$
T_p = \f\frac{5 \times 10^6\text{ m}}{2 \times 10^8\text{ m/s}} = 0.025\text{ s} = 25\text{ ms}
$$

3. Round-Trip Time per packet:

$$
\text{RTT} = 2 \times T_p = 50\text{ ms} = 0.050\text{ s}
$$

4. Total time for 1000 packets:

$$
\text{Total Time} = 1000 \times 0.050\text{ s} = 50\text{ seconds}
$$

#### Final Answer
* **Total Transfer Time:** $50\text{ seconds}$

[Source: CN_Numericals_Data_Link_Layer.pdf, Page 19; cn_tutorial.pdf, Tutorial 2, Q2]

---

### Numerical Problem 8: Stop-and-Wait Link Utilization

#### Problem Statement
If the bandwidth of a line is $1\text{ Mbps}$, one-way propagation delay is $20\text{ ms}$, and packet size is $1\text{ KB}$ ($1024\text{ Bytes} = 8192\text{ bits}$ or $1000\text{ Bytes} = 8000\text{ bits}$), calculate the link utilization for Stop-and-Wait protocol.

#### Given Values
* Bandwidth: $R = 1\text{ Mbps} = 10^6\text{ bps}$
* Propagation delay: $T_p = 20\text{ ms} = 0.020\text{ s}$ ($\text{RTT} = 40\text{ ms}$)
* Packet size: $L = 1\text{ KB} = 8000\text{ bits}$ (using decimal slide standard)

#### Step-by-Step Solution
1. Transmission delay:

$$
T_t = \f\frac{8000\text{ bits}}{10^6\text{ bps}} = 8\text{ ms} = 0.008\text{ s}
$$

2. Round-Trip Time:

$$
\text{RTT} = 2 \times 20\text{ ms} = 40\text{ ms}
$$

3. Total time per frame:

$$
T_{\text{total}} = T_t + \text{RTT} = 8\text{ ms} + 40\text{ ms} = 48\text{ ms}
$$

4. Link Utilization $\eta$:

$$
\eta = \f\frac{T_t}{T_{\text{total}}} = \f\frac{8\text{ ms}}{48\text{ ms}} = \f\frac{1}{6} \approx 16.667\%
$$

#### Final Answer
* **Link Utilization:** $16.67\%$

[Source: CN_Numericals_Data_Link_Layer.pdf, Page 26; cn_tutorial.pdf, Tutorial 3, Q2]

---

### Numerical Problem 9: Frame Size for 50% Efficiency in Stop-and-Wait

#### Problem Statement
If bit rate is $10\text{ kbps}$ and one-way propagation delay is $40\text{ ms}$, for what frame size does Stop-and-Wait protocol achieve an efficiency of $50\%$?

#### Given Values
* Bit rate: $R = 10\text{ kbps} = 10,000\text{ bps}$
* Propagation delay: $T_p = 40\text{ ms} = 0.040\text{ s}$
* Desired efficiency: $\eta = 0.50 = 50\%$

#### Step-by-Step Solution
1. Efficiency formula:

$$
\eta = \f\frac{T_t}{T_t + 2 T_p} = \f\frac{1}{1 + 2a} = 0.5
$$

$$
1 + 2a = 2 \implies 2a = 1 \implies a = 0.5
$$

2. Since $a = \f\frac{T_p}{T_t}$:

$$
\f\frac{T_p}{T_t} = 0.5 \implies T_t = 2 T_p = 2 \times 40\text{ ms} = 80\text{ ms} = 0.080\text{ s}
$$

3. Calculate frame size $L$:

$$
L = R \times T_t = 10,000\text{ bps} \times 0.080\text{ s} = 800\text{ bits}
$$

#### Final Answer
* **Required Frame Size:** $800\text{ bits}$ ($100\text{ Bytes}$)

[Source: CN_Numericals_Data_Link_Layer.pdf, Page 27]

---

### Numerical Problem 10: Earth-to-Planet Space Link Utilization

#### Problem Statement
The distance from Earth to a distant planet is approximately $9 \times 10^{10}\text{ m}$. What is the channel utilization if Stop-and-Wait protocol is used on a $64\text{ Mbps}$ point-to-point link with a frame size of $32\text{ KB}$ ($32 \times 1024 \times 8 = 262,144\text{ bits}$ or $32 \times 1000 \times 8 = 256\text{ kbits}$)? Use speed of light $3 \times 10^8\text{ m/s}$. For what sliding window size would utilization reach $100\%$?

#### Given Values
* Distance: $D = 9 \times 10^{10}\text{ m}$
* Speed of light: $v = 3 \times 10^8\text{ m/s}$
* Data rate: $R = 64\text{ Mbps} = 64 \times 10^6\text{ bps}$
* Frame size: $L = 32\text{ KB} = 256\text{ kbits} = 256,000\text{ bits}$

#### Step-by-Step Solution
1. One-way propagation delay:

$$
T_p = \f\frac{9 \times 10^{10}\text{ m}}{3 \times 10^8\text{ m/s}} = 300\text{ seconds}
$$

2. Frame transmission time:

$$
T_t = \f\frac{256,000\text{ bits}}{64 \times 10^6\text{ bps}} = 0.004\text{ s} = 4\text{ ms}
$$

3. Calculate $a$:

$$
a = \f\frac{T_p}{T_t} = \f\frac{300}{0.004} = 75,000
$$

4. Stop-and-Wait channel utilization:

$$
\eta = \f\frac{1}{1 + 2a} = \f\frac{1}{1 + 2(75000)} = \f\frac{1}{150,001} \approx 6.667 \times 10^{-6} = 6.67 \times 10^{-4}\%
$$

5. Window size $W$ for $100\%$ utilization:

$$
W = 1 + 2a = 1 + 150,000 = 150,001\text{ frames}
$$

#### Final Answer
* **Stop-and-Wait Utilization:** $6.67 \times 10^{-4}\%$
* **Window Size for 100% Utilization:** $W = 150,001\text{ frames}$

[Source: CN_Numericals_Data_Link_Layer.pdf, Pages 28–29]

---

### Numerical Problem 11: T1 Trunk Sequence Number Width for Go-Back-N

#### Problem Statement
A $3000\text{ km}$ long T1 trunk ($1.536\text{ Mbps}$ payload rate) is used to transmit 64-byte frames using Go-Back-N protocol. If propagation speed is $6\,\mu\text{s/km}$, how many bits must the sequence numbers be to achieve maximum throughput?

#### Given Values
* Distance: $D = 3000\text{ km}$
* Propagation delay per km: $6\,\mu\text{s/km}$
* Data rate: $R = 1.536\text{ Mbps} = 1.536 \times 10^6\text{ bps}$
* Frame size: $L = 64\text{ Bytes} = 512\text{ bits}$

#### Step-by-Step Solution
1. One-way propagation time:

$$
T_p = 3000\text{ km} \times 6\,\mu\text{s/km} = 18\text{ ms} = 0.018\text{ s}
$$

2. Frame transmission time:

$$
T_t = \f\frac{512\text{ bits}}{1.536 \times 10^6\text{ bps}} = 0.000333\text{ s} = 0.333\text{ ms} \approx 0.300\text{ ms}
$$

3. Round-trip elapsed time until first ACK returns:

$$
T_{\text{cycle}} = T_t + 2 T_p = 0.3\text{ ms} + 36\text{ ms} = 36.3\text{ ms}
$$

4. Frames transmitted during one cycle:

$$
N_{\text{frames}} = \f\frac{36.3\text{ ms}}{0.3\text{ ms/frame}} = 121\text{ frames}
$$

5. For Go-Back-N, sender window $W_s \ge 121$.
   Since $W_s \le 2^n - 1$:

$$
2^n - 1 \ge 121 \implies 2^n \ge 122 \implies n = 7\text{ bits} \quad (2^7 = 128)
$$

#### Final Answer
* **Required Sequence Number Size:** $7\text{ bits}$ ($W_s = 127$)

[Source: CN_Numericals_Data_Link_Layer.pdf, Page 31]

---

### Numerical Problem 12: Go-Back-N Buffer Contents on Error

#### Problem Statement
Two stations A and B exchange frames using Go-Back-N protocol with window size $W_s = 7$ and 3-bit sequence numbers ($0$ to $7$). Station A transmits frames 0, 1, 2, 3, 4, 5, 6. Station B receives them in order, but frame 4 is damaged by noise. What frames will remain buffered in station A's window waiting for retransmission?

#### Step-by-Step Solution
1. Station B receives Frame 0, 1, 2, 3 correctly and sends ACKs for them.
2. Frame 4 arrives damaged. In Go-Back-N, the receiver discards Frame 4 and **discards all subsequent frames (5 and 6)** without acknowledging them.
3. Station A receives ACKs up to Frame 3. Frame 0, 1, 2, 3 are cleared from A's buffer.
4. Station A times out on Frame 4.
5. In Go-Back-N, station A must retransmit Frame 4 and all unacknowledged frames in its window: frames **4, 5, 6**.
6. With window size 7, the available buffer sequence slots in A's window are **4, 5, 6, 7, 0, 1, 2**.

#### Final Answer
* **Buffer Frames in Current Window of A:** $4, 5, 6, 7, 0, 1, 2$

[Source: CN_Numericals_Data_Link_Layer.pdf, Page 32; cn_tutorial.pdf, Tutorial 2, Q3]

---


---

## 14. Edge Cases, Critical Boundary Conditions & Protocol Anomalies

---

### Edge Case 1: Framing Desynchronization via Corrupted Byte Count Field

#### Failure Mechanism
In the byte-count framing method, the frame header contains an integer field specifying the total length of the frame.
1. Consider a sequence of frames with byte counts: `[5] D1 D2 D3 D4`, `[5] D5 D6 D7 D8`.
2. Suppose transmission noise flips a single bit in the first count field, altering `5` to `6`.
3. The receiver counts 6 bytes instead of 5, consuming the count field of the second frame as payload data!
4. The receiver interprets data byte `D6` as the next frame's byte count. If `D6 = 237`, the receiver will skip the next 237 bytes seeking the following frame boundary.

#### Severity & Fatal Property
A single-bit error in a byte count field destroys framing synchronization not only for the corrupted frame, but for **all subsequent frames indefinitely**, requiring higher-layer timeout or channel hard reset. This catastrophic flaw caused character count framing to be completely abandoned in modern protocols.

[Source: Ch 3 Data Link Layer.pdf, Slide 14]

---

### Edge Case 2: Byte Stuffing Worst-Case Transmission Expansion (100% Overhead)

#### Phenomenon
In byte-oriented protocols (e.g., PPP), the flag byte `FLAG` (`0x7E`) delimits frames, and `ESC` (`0x7D`) escapes embedded delimiter bytes.
* When payload contains `FLAG`, it is transmitted as `ESC` + `(FLAG XOR 0x20)`.
* When payload contains `ESC`, it is transmitted as `ESC` + `(ESC XOR 0x20)`.

#### Pathological Boundary Case
Consider an encrypted, compressed, or binary payload where every single byte happens to be `0x7E` or `0x7D`:
* For a frame payload of $N$ bytes, every byte requires an accompanying `ESC` prefix.
* Total transmitted payload bytes: $2N$ bytes.
* Framing transmission overhead: $100\%$.

#### Mitigation
Modern high-speed physical layers utilize line block codes (e.g., 8b/10b or 64b/66b) which guarantee unique physical control symbols (such as the K28.5 comma character) that cannot appear in user payload, eliminating data-dependent payload expansion.

[Source: Ch 3 Data Link Layer.pdf, Slides 15–17]

---

### Edge Case 3: Bit Stuffing Boundary Conditions & Delimiter Collision Hazard

#### Rules of HDLC Bit Stuffing
Whenever the transmitter observes five consecutive `1`s in the outgoing bitstream, it unconditionally inserts a `0` bit after the fifth `1`.

#### Critical Boundary Scenarios
1. **Payload Contains Natural Flag (`01111110`):**
   * Transmission sequence: Sender sees five `1`s, inserts `0` $\implies$ `011111`**`0`**`10`.
   * The receiver sees five `1`s followed by `0`, removes the stuffed `0`, and faithfully reconstructs `01111110`. The natural flag is never misinterpreted as a delimiter!
2. **Payload Contains Natural Escape Flag Pattern (`0111110`):**
   * Even though the sixth bit is already `0`, the rule is unconditional: sender inserts `0` after five `1`s $\implies$ `011111`**`0`**`0`.
   * Receiver destuffs the first `0`, leaving `0111110`.
3. **Receiver Interpretation Logic for Bit Sequences:**
   * Five `1`s followed by `0` $\implies$ Stuffed bit; destuff (discard `0`).
   * Five `1`s followed by `10` (six consecutive `1`s) $\implies$ **FLAG Delimiter** (`01111110`); marks frame boundary.
   * Five `1`s followed by `11` (seven or more consecutive `1`s) $\implies$ **Framing Error / Link Abort** sequence; discard frame immediately.

[Source: Ch 3 Data Link Layer.pdf, Slide 18]

---

### Edge Case 4: CRC Undetected Error Boundary & Generator Constraints

#### Mathematical Condition for Undetected Errors
Let $T(x)$ be the transmitted polynomial, and $E(x)$ be the channel error polynomial. The received polynomial is $R(x) = T(x) \oplus E(x)$.
The receiver performs modulo-2 division by generator polynomial $G(x)$:

$$
\f\frac{R(x)}{G(x)} = \f\frac{T(x)}{G(x)} \oplus \f\frac{E(x)}{G(x)} = 0 \oplus \f\frac{E(x)}{G(x)}
$$

An error will pass undetected if and only if **$E(x)$ is an exact algebraic multiple of $G(x)$**.

#### Critical Polynomial Design Rules
1. **Single-Bit Errors:** An isolated single-bit error is $E(x) = x^i$. To detect all single-bit errors, $G(x)$ must contain at least two terms ($G(x)$ must not divide $x^i$), which is guaranteed by ensuring the lowest term $x^0 = 1$.
2. **Double-Bit Errors:** Two isolated errors are $E(x) = x^i + x^j = x^j(x^{i-j} + 1)$ with $i > j$. To detect all 2-bit errors, $G(x)$ must not divide $x^k + 1$ for any $k \le$ maximum frame length.
3. **Odd Number of Bit Errors:** If $G(x)$ contains $(x + 1)$ as a factor, it will detect **all odd numbers of bit errors** because no polynomial with an odd number of terms is divisible by $(x + 1)$.
4. **Burst Errors:**
   * All burst errors of length $\le r$ are detected with $100\%$ certainty.
   * A burst error of length $r + 1$ slips through with probability $\dfrac{1}{2^{r-1}}$.
   * A burst error of length $> r + 1$ slips through with probability $\dfrac{1}{2^r}$.

[Source: Ch 3 Data Link Layer.pdf, Slides 31–32]

---

### Edge Case 5: Hamming Code Vulnerability Under Multiple Bit Errors (SEC vs SEC-DED)

#### Failure Mode of Standard Hamming SEC Code
A standard Hamming $(7,4)$ code has minimum Hamming distance $d_{\min} = 3$. It guarantees Single Error Correction (SEC).
* Suppose bits $b_3$ and $b_5$ are both inverted by noise (a 2-bit error).
* The receiver calculates syndrome $S = [s_4 s_2 s_1]_2$.
* The 2-bit error vectors add linearly modulo 2, producing a non-zero syndrome that points to a third, completely uncorrupted bit (e.g., bit 6)!
* The decoder inverts bit 6 to "correct" it, turning a 2-bit transmission error into a **3-bit corrupted block** without flagging any warning!

#### Resolution: SEC-DED (Extended Hamming Code)
By appending an overall parity bit $P_0$ over the entire codeword ($d_{\min}$ increases from 3 to 4):
* If syndrome $S \neq 0$ and overall parity is incorrect $\implies$ **Single bit error; correct it**.
* If syndrome $S \neq 0$ and overall parity is correct $\implies$ **Double bit error; detect and abort (do NOT correct)**.

[Source: Ch 3 Data Link Layer.pdf, Slides 24–28]

---

### Edge Case 6: Protocol 4 (1-Bit Sliding Window) Simultaneous Start Anomaly

#### Anomaly Progression
In Protocol 4, frames carry a 1-bit sequence number ($0$ or $1$) and an piggybacked ACK number.
1. Normal operation assumes Host A transmits first, Host B replies, and transmission alternates smoothly.
2. **Anomaly Trigger:** Host A and Host B start simultaneously, both transmitting frame 0 at $t = 0$.
3. At $t = T_{\text{prop}}$, Host A receives frame 0 from B, and Host B receives frame 0 from A.
4. Both receivers accept frame 0, pass data upward, toggle their expected sequence numbers to 1, and immediately transmit frame 1 with $\text{ACK} = 0$.
5. Both hosts receive frame 1, toggle their state, and transmit frame 0 again.

#### Architectural Impact
* **Correctness:** No frames are lost, corrupted, or delivered out of order.
* **Performance:** Each packet is transmitted twice; channel throughput collapses by exactly $50\%$. The transmissions alternate in lockstep synchrony instead of pipelining.

[Source: Ch 3 Data Link Layer.pdf, Slide 49]

---

### Edge Case 7: Go-Back-N Window Size Hazard ($W_s = 2^n$ vs $W_s = 2^n - 1$)

#### Catastrophic Silent Corruption Scenario
Suppose a 3-bit sequence number is used ($n = 3, 2^n = 8$, sequences $0$ to $7$).
Suppose the protocol designer incorrectly sets sender window size $W_s = 2^n = 8$ instead of $W_s \le 7$:
1. Sender transmits frames $0, 1, 2, 3, 4, 5, 6, 7$.
2. The receiver successfully receives all 8 frames, delivers them to the network layer, advances its receive window, and now expects frame $0$ (the next generation).
3. Receiver transmits cumulative ACK 7 back to the sender.
4. **Disaster:** The ACK packet is lost or destroyed by channel noise!
5. Sender's timer expires. The sender retransmits its unacknowledged buffer: frames $0, 1, 2, 3, 4, 5, 6, 7$.
6. Receiver receives frame $0$. Because receiver is expecting frame $0$, it assumes this is the *new* frame 0, accepts it, and delivers it to the network layer!

#### Consequence
The receiver accepts 8 completely duplicate frames as new data without detecting any error. The restriction $W_s \le 2^n - 1$ ensures that the sender's retransmission window and receiver's expectation window never overlap at the same sequence number.

[Source: Ch 3 Data Link Layer.pdf, Slide 52]

---

### Edge Case 8: Selective Repeat Window Size Hazard ($W_s = W_r > 2^{n-1}$)

#### Overlap Hazard
In Selective Repeat with $n$-bit sequence numbers, receiver window $W_r > 1$:
* The fundamental non-overlap condition is:
$$
W_s + W_r \le 2^n
$$
* If symmetric windows are used ($W_s = W_r$), then:
$$
W_s = W_r \le 2^{n-1}
$$

#### Concrete Counterexample if $W = 5$ for $2^3 = 8$
Suppose $n = 3$, sequence numbers $0 \dots 7$, but $W_s = W_r = 5 > 4$:
1. Sender transmits frames $0, 1, 2, 3, 4$.
2. Receiver receives all 5 frames, advances its receive window to $[5, 6, 7, 0, 1]$, and transmits ACKs.
3. All ACKs are lost.
4. Sender times out and retransmits frame $0$.
5. Receiver checks its active receive window $[5, 6, 7, 0, 1]$: sequence number $0$ is inside the window!
6. Receiver accepts the duplicate frame $0$ as new data of the subsequent generation.
Setting $W_s = W_r = 2^{n-1}$ is an absolute mathematical boundary.

[Source: Ch 3 Data Link Layer.pdf, Slide 58]


---

## 15. Connections Between Concepts

* **Physical Layer Imperfections $\leftrightarrow$ Data Link Layer Countermeasures:** Attenuation and noise at Layer 1 dictate the choice of Error Detection (CRC) and Error Correction (Hamming) at Layer 2.
* **Framing $\leftrightarrow$ Byte/Bit Stuffing:** Delimiting frame boundaries creates ambiguity when delimiter patterns occur naturally in user data; stuffing resolves this ambiguity by dynamically inserting escape patterns.
* **Bandwidth-Delay Product $\leftrightarrow$ ARQ Window Sizing:** A link with large BDP ($B \times \text{RTT}$) renders Stop-and-Wait inefficient ($< 1\%$ utilization), forcing the adoption of pipelined sliding window protocols (GBN, Selective Repeat) where $W_s \ge 1 + 2a$.
* **Go-Back-N vs Selective Repeat Trade-off:** GBN minimizes receiver memory/complexity at the cost of retransmitting undamaged frames; Selective Repeat maximizes bandwidth efficiency over noisy links at the cost of receiver buffer management.

---

## 16. Key Takeaways

1. The Data Link Layer provides framing, error control, and flow control between directly connected nodes.
2. Framing uses byte stuffing (`ESC` insertion) in byte-oriented protocols (PPP) and bit stuffing (zero insertion after five `1`s) in bit-oriented protocols (HDLC).
3. Minimum Hamming distance $d_{\min} \ge s + 1$ detects $s$ errors; $d_{\min} \ge 2t + 1$ corrects $t$ errors.
4. Hamming codes place parity bits at power-of-2 positions ($1, 2, 4, 8$) and satisfy $2^r \ge m + r + 1$. Syndrome decoding gives the exact error index.
5. CRC polynomial codes use modulo-2 binary division. Standard CRC-32 detects all single, double, odd, and burst errors $\le 32$ bits.
6. Stop-and-Wait efficiency is $\f\frac{1}{1+2a}$; pipelined sliding window achieves $100\%$ efficiency when $W_s \ge 1 + 2a$.
7. Maximum window size limits: Go-Back-N requires $W_s \le 2^n - 1$; Selective Repeat requires $W_s = W_r \le 2^{n-1}$.
8. HDLC provides reliable ARQ with I/S/U frames; PPP provides multi-protocol encapsulation with LCP and NCPs.

---

## 17. Formula Sheet

### 1. Hamming Code Redundancy Inequality

$$
2^r \ge m + r + 1
$$

* $m$ = Message data bits, $r$ = Parity check bits.

### 2. Minimum Hamming Distance Bounds

$$
d_{\min} \ge s + 1 \quad (\text{Detect } s \text{ errors}), \quad d_{\min} \ge 2t + 1 \quad (\text{Correct } t \text{ errors})
$$

### 3. Modulo-2 CRC Division

$$
T(x) = x^r M(x) \oplus R(x), \quad \text{where } \f\frac{x^r M(x)}{G(x)} = Q(x) \oplus \f\frac{R(x)}{G(x)}
$$

### 4. Normalized Propagation Delay

$$
a = \f\frac{T_{\text{prop}}}{T_{\text{trans}}} = \f\frac{D \cdot R}{v \cdot L}
$$

### 5. Stop-and-Wait Channel Utilization

$$
\eta_{\text{Stop-and-Wait}} = \f\frac{T_{\text{trans}}}{T_{\text{trans}} + 2 T_{\text{prop}}} = \f\frac{1}{1 + 2a}
$$

### 6. Pipelined Sliding Window Utilization

$$
\eta_{\text{Sliding Window}} = \min\left(1.0, \; \f\frac{W_s}{1 + 2a}\r\right)
$$

### 7. Maximum Window Sizes for Modulo $2^n$

$$
W_{s, \text{GBN}} = 2^n - 1, \quad W_{s, \text{SR}} = W_{r, \text{SR}} = 2^{n-1}
$$

---

## 18. Definition Sheet

* **Frame:** Data Link Layer protocol data unit comprising header, payload, and trailer.
* **Byte Stuffing:** Inserting escape characters before delimiter patterns in byte-oriented data.
* **Bit Stuffing:** Inserting a `0` after five consecutive `1`s in bit-oriented data.
* **Hamming Distance:** Number of bit positions where two codewords differ.
* **Syndrome:** Binary vector resulting from parity checks that identifies the location of an error.
* **Cyclic Redundancy Check (CRC):** Polynomial-based checksum using modulo-2 arithmetic.
* **Piggybacking:** Attaching acknowledgment sequence numbers into outgoing data frames.
* **Pipelining:** Transmitting multiple frames before receiving acknowledgment for the first.
* **Go-Back-N:** Pipelined ARQ where receiver discards out-of-order frames and sender retransmits all unacknowledged frames.
* **Selective Repeat:** Pipelined ARQ where receiver buffers out-of-order frames and sender retransmits only corrupted frames.

---

## 19. Exam-Oriented Review

---

### Important Concepts for Examinations
1. **Framing Mechanisms:** Compare Byte Stuffing vs Bit Stuffing algorithms; execute step-by-step bit stuffing/destuffing on exam bit streams.
2. **Hamming $(7,4)$ Code:** Derive parity equations, generate codewords, calculate syndrome vectors, and correct single-bit errors.
3. **CRC Division:** Perform modulo-2 polynomial long division to calculate FCS and verify receiver validity.
4. **ARQ Comparison:** Detail operational differences between Stop-and-Wait, Go-Back-N, and Selective Repeat; prove maximum window size bounds ($2^n - 1$ and $2^{n-1}$).
5. **Protocol Utilization Numericals:** Solve link efficiency and minimum window size problems using $a = T_p / T_t$.

---

### Extracted Official Question Bank & Tutorial Problems with Solutions

#### Q1. The LLC sublayer is responsible for:
* **Options:** A. Routing | B. Logical Link Control & Flow/Error Management | C. Media Access | D. IP Addressing
* **Answer:** **B. Logical Link Control**

#### Q2. Which addressing method is used at the Data Link Layer?
* **Options:** A. IP Address | B. Port Address | C. MAC Address (Physical Address) | D. Logical Address
* **Answer:** **C. MAC Address** (48-bit IEEE 802 hardware address).

#### Q3. What is the size of a standard IEEE 802 MAC address?
* **Options:** A. 16 bits | B. 32 bits | C. 48 bits (6 Bytes) | D. 64 bits
* **Answer:** **C. 48 bits**

#### Q4. Which protocol is used for flow control?
* **Options:** A. Stop-and-Wait | B. HTTP | C. DNS | D. ICMP
* **Answer:** **A. Stop-and-Wait**

#### Q5. A frame of 1500 bytes is transmitted over a 5 Mbps link. Calculate transmission time.
* **Given:** $L = 1500\text{ Bytes} = 12,000\text{ bits}$. $R = 5\text{ Mbps} = 5 \times 10^6\text{ bps}$.
* **Calculation:**

$$
T_{\text{trans}} = \f\frac{12,000\text{ bits}}{5,000,000\text{ bps}} = 0.0024\text{ seconds} = 2.4\text{ ms}
$$

#### Q6. If propagation delay is $20\,\mu\text{s}$ and transmission delay is $10\,\mu\text{s}$, determine total one-way delay.
* **Calculation:**

$$
\text{Total Delay} = T_{\text{trans}} + T_{\text{prop}} = 10\,\mu\text{s} + 20\,\mu\text{s} = 30\,\mu\text{s}
$$

#### Q7. A channel has $\text{RTT} = 100\text{ ms}$, Bandwidth $= 10\text{ Mbps}$, and Frame Size $= 1000\text{ Bytes}$. Calculate minimum window size for $100\%$ utilization.
* **Given:** $\text{RTT} = 0.1\text{ s}$, $R = 10 \times 10^6\text{ bps}$, $L = 8000\text{ bits}$.
* **Calculation:**

$$
T_t = \f\frac{8000}{10^7} = 0.8\text{ ms} = 0.0008\text{ s}
$$

$$
W = \f\frac{\text{RTT} + T_t}{T_t} = \f\frac{0.1008\text{ s}}{0.0008\text{ s}} = 126\text{ frames}
$$

[Source: Computer_Networks_Question_Bank.pdf, Unit 2, Q21–Q37; cn_tutorial.pdf, Tutorials 1–3]