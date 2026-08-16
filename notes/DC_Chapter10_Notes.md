# Chapter 10 — Error Detection and Correction

## 1. Types of Errors & Redundancy

- **Single-Bit Error:** Only 1 bit in data unit changed from 1 to 0 or 0 to 1.

- **Burst Error:** 2 or more bits in data unit changed.

[Source: Reference Material - Chapter 10.pptx, Slides 3-6]

## 2. Block Coding & Hamming Distance

### Hamming Distance $d(x, y)$

The number of differences between corresponding bits in two binary words of equal length.

$$
d_{\min} = s + 1 \quad (\text{for detecting } s \text{ errors})
$$

$$
d_{\min} = 2t + 1 \quad (\text{for correcting } t \text{ errors})
$$

[Source: Reference Material - Chapter 10.pptx, Slide 15]

## 3. Cyclic Redundancy Check (CRC)

### Worked Example: CRC Division

**Data:** `100100`, **Generator Polynomial $G(x)$:** $x^3 + x + 1$ (Binary `1011`, length $n=4$).

1. Append $n-1 = 3$ zeros to data: `100100000`.

2. Perform modulo-2 binary division by `1011` to obtain remainder (CRC checksum).

3. Transmitted Frame = Data + Remainder.

[Source: Reference Material - Chapter 10.pptx, Slide 28]
