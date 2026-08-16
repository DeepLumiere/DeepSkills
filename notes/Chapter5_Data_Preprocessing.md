<Complete DAV Notes: Chapter 5 — Data Preprocessing>
> **Course:** Data Analysis and Visualization
> **Primary Source:** 5. data_preprocessing.pdf
> **Files Integrated:** `5. data_preprocessing.pdf`, `ch5_text.txt`
</Complete DAV Notes: Chapter 5 — Data Preprocessing>

# Chapter 5 — Data Preprocessing

## 1. Chapter Overview
Data preprocessing is an indispensable step in the data mining and data engineering pipeline. Real-world raw data is inherently incomplete, noisy, and inconsistent. Without quality data, there can be no quality results. This chapter presents the complete data preprocessing pipeline, covering data cleaning (handling missing and noisy data), data integration (resolving conflicts and redundancies), data transformation (normalization and aggregation), data reduction, and data discretization.

[Source: 5. data_preprocessing.pdf, Slides 1-8]

---

## 2. Fundamental Concepts

### Why is Data Dirty?
Data in the real world is frequently imperfect. The main categories of "dirty" data are:
*   **Incomplete data:** Lacking attribute values, lacking certain attributes of interest, or containing only aggregate data.
    *   *Causes:* "Not applicable" data value when collected; different considerations between the time of collection and analysis; human/hardware/software problems.
    *   *Example:* `occupation=" "`
*   **Noisy data:** Containing incorrect values, random errors, or outliers.
    *   *Causes:* Faulty data collection instruments; human or computer error at data entry; errors in data transmission; technology limitations; inconsistent naming conventions.
    *   *Example:* `Salary="-10"`
*   **Inconsistent data:** Containing discrepancies in codes or names.
    *   *Causes:* Different data sources; functional dependency violations (e.g., modifying some linked data without updating others); duplicate records.
    *   *Example:* `Age="42"` but `Birthday="03/07/1997"`; rating was "1,2,3" but is now "A, B, C"; discrepancies between duplicate records.

[Source: 5. data_preprocessing.pdf, Slides 2-3, 18]

### Why Data Preprocessing is Important
*   **No quality data $\rightarrow$ No quality results.**
*   Quality decisions require accurate, complete, and consistent data.
*   Missing or duplicate data leads to incorrect or misleading statistics.
*   Data warehouses require consistent, integrated quality data. Most of the effort in building a data warehouse involves extraction, cleaning, and transformation.

[Source: 5. data_preprocessing.pdf, Slide 7]

### Major Tasks in Data Preprocessing
1.  **Data Cleaning:** Fill in missing values, smooth noisy data, identify or remove outliers, and resolve inconsistencies.
2.  **Data Integration:** Integration of multiple databases, data cubes, or files into a coherent store.
3.  **Data Transformation:** Normalization and aggregation.
4.  **Data Reduction:** Obtains a reduced representation in volume but produces the same or similar analytical results.
5.  **Data Discretization:** Part of data reduction but with particular importance, especially for numerical data (e.g., binning).

[Source: 5. data_preprocessing.pdf, Slide 8]

---

## 3. Definitions

### Definition: Data Preprocessing
**Meaning:** The process of preparing raw data for analysis by cleaning and transforming it into a usable format.
**Formal definition:** In data mining, it refers to preparing raw data for mining by performing tasks like cleaning, transforming, and organizing it into a format suitable for mining algorithms.
[Source: 5. data_preprocessing.pdf, Slide 7]

### Definition: Noisy Data
**Meaning:** Data that contains incorrect values, random errors, or unwanted variance.
**Formal definition:** Random error or unwanted variance in measured variables.
[Source: 5. data_preprocessing.pdf, Slide 18]

---

## 4. Data Cleaning: Missing Data

Missing data is common (e.g., missing customer income in sales data).
**Causes:** Equipment malfunction, inconsistency leading to deletion, data not entered due to misunderstanding, data not considered important at entry time, or history/changes not registered.

### Strategies to Handle Missing Data

| Strategy | Procedure | Pros | Cons |
| :--- | :--- | :--- | :--- |
| **1. Ignore the Tuple** | Remove the record (row) with missing values. Commonly used when the class label is missing in classification tasks. | Complete removal results in a robust model. Deleting a row/column with no info avoids incorrect weightage. | Loss of information/data. Works poorly if the percentage of missing values is high (e.g., $>30\%$). |
| **2. Fill Manually** | Manually enter the missing data using domain knowledge. | Highly accurate if done correctly by domain experts. | Time-consuming and often infeasible for large datasets. |
| **3a. Global Constant** | Replace missing values with a fixed value (e.g., "Unknown" or "NA"). | Preserves data size, simple to implement. | May distort distributions or create an artificial class. |
| **3b. Attribute Mean/Mode** | Replace with the overall mean (or mode) of the attribute. | Better approach when data size is small. Prevents data loss compared to tuple removal. | Adds variance and bias. Works poorly compared to multiple-imputation methods. |
| **3c. Class-Specific Mean** | Replace with the mean calculated for all samples in the same class. | More accurate than global mean. | Still introduces some bias within the class. |
| **3d. Most Probable Value** | Predict missing values using Bayesian formulas, decision trees, or regression models. | Highly accurate, preserves inter-variable relationships. | Computationally expensive. |
| **4. Assign Unique Category** | (For categorical features) Assign a new class, e.g., 'U' for 'unknown' (like for Cabin or Embarked in Titanic). | Less possibilities with one extra category $\rightarrow$ low variance after one-hot encoding. Negates data loss. | Adds less variance. Adds another feature during encoding, which may hurt model performance. |

[Source: 5. data_preprocessing.pdf, Slides 11-17]

---

## 5. Data Cleaning: Noisy Data

Noise lowers data quality, leading to misleading analysis and poor model performance.

### How to Handle Noisy Data
1.  **Binning:** Smooth a sorted data value by consulting its "neighborhood" (values around it). Sort data, partition into bins (e.g., equal-frequency), and smooth by bin means, bin medians, or bin boundaries.
2.  **Regression:** Smooth data by fitting it into regression functions (linear or multiple linear regression).
3.  **Clustering:** Detect and remove outliers by organizing similar values into groups (clusters).
4.  **Semi-automated method:** Combined computer and human inspection to detect suspicious values and check manually.

[Source: 5. data_preprocessing.pdf, Slide 19]

### Binning Methods

**1. Equal-width (distance) partitioning:**
Divides the range into $N$ intervals of equal size (uniform grid). If $A$ and $B$ are the lowest and highest values, the width $W$ is:
$$
W = \frac{B - A}{N}
$$
*   *Pros:* Straightforward.
*   *Cons:* Outliers may dominate the presentation; skewed data is not handled well.

**2. Equal-depth (frequency) partitioning:**
Divides the range into $N$ intervals, each containing approximately the same number of samples.
*   *Pros:* Good data scaling.
*   *Cons:* Managing categorical attributes can be tricky.

[Source: 5. data_preprocessing.pdf, Slide 20]

### Example: Binning for Data Smoothing

**Given sorted data for price (in dollars):**
$V = [4, 8, 9, 15, 21, 21, 24, 25, 26, 28, 29, 34]$

**Step 1: Partition into equal-frequency (equi-depth) bins**
Since $N=12$, creating 3 bins means each bin gets $12/3 = 4$ values.
*   **Bin 1:** $[4, 8, 9, 15]$
*   **Bin 2:** $[21, 21, 24, 25]$
*   **Bin 3:** $[26, 28, 29, 34]$

**Step 2: Smoothing by bin means**
Each value in a bin is replaced by the mean of that bin.
*   Mean(Bin 1) = $(4+8+9+15)/4 = 36/4 = 9 \implies [9, 9, 9, 9]$
*   Mean(Bin 2) = $(21+21+24+25)/4 = 91/4 = 22.75 \implies$ (Rounded in source to $23$) $\implies [23, 23, 23, 23]$
*   Mean(Bin 3) = $(26+28+29+34)/4 = 117/4 = 29.25 \implies$ (Rounded in source to $29$) $\implies [29, 29, 29, 29]$

**Step 3: Smoothing by bin boundaries**
The minimum and maximum values of the bin are its boundaries. Each value in the bin is replaced by the closest boundary value.
*   **Bin 1 Boundaries:** $4$ and $15$.
    *   $4 \rightarrow 4$
    *   $8 \rightarrow 4$ (closer to $4$ than $15$)
    *   $9 \rightarrow 4$ (closer to $4$ than $15$)
    *   $15 \rightarrow 15$
    *   Result: $[4, 4, 4, 15]$
*   **Bin 2 Boundaries:** $21$ and $25$.
    *   $21 \rightarrow 21$
    *   $21 \rightarrow 21$
    *   $24 \rightarrow 25$
    *   $25 \rightarrow 25$
    *   Result: $[21, 21, 25, 25]$
*   **Bin 3 Boundaries:** $26$ and $34$.
    *   $26 \rightarrow 26$
    *   $28 \rightarrow 26$
    *   $29 \rightarrow 26$
    *   $34 \rightarrow 34$
    *   Result: $[26, 26, 26, 34]$

[Source: 5. data_preprocessing.pdf, Slides 21-22]

---

## 6. Data Integration

Data integration combines data from multiple sources into a coherent store.

### Key Issues
1.  **Schema Integration:** Integrating metadata from different sources (e.g., `cust-id` vs `cust-no`).
    *   *Entity identification problem:* Identifying real-world entities from multiple data sources (e.g., "Bill Clinton" = "William Clinton").
2.  **Detecting and Resolving Data Value Conflicts:** For the same real-world entity, attribute values from different sources are different.
    *   *Reasons:* Different representations, different scales (e.g., metric vs. British units).
3.  **Handling Redundancy:** Redundant data often occurs when integrating databases.
    *   *Object identification:* Same attribute/object may have different names (e.g., linking Aadhar card and PAN card).
    *   *Derivable data:* One attribute may be derived in another table (e.g., annual revenue, age).
    *   *Tuple duplication:* Increases redundancy and inconsistency.

[Source: 5. data_preprocessing.pdf, Slides 27-28]

### Correlation Analysis (Categorical Data) - Chi-Square Test

Used to detect redundancy between categorical attributes.
$$
\chi^2 = \sum_{i=1}^{R} \sum_{j=1}^{C} \frac{(O_{ij} - E_{ij})^2}{E_{ij}}
$$
Where expected frequency $E_{ij}$:
$$
E_{ij} = \frac{(\text{Row}_i \text{ Sum}) \times (\text{Col}_j \text{ Sum})}{N}
$$
Degrees of freedom $= (R-1)(C-1)$.

**Example: Gender vs Preferred Reading**
*   **Null Hypothesis:** There is no relationship between the two categorical variables (independent).
*   **Acceptable (Alternate) Hypothesis:** There is a relationship (not independent).

Assume we calculate $\chi^2$ and the degrees of freedom is $1$. For a $0.001$ significance level, the tabular threshold is $10.828$.
If $\chi^2_{\text{calculated}} > 10.828$, we reject the null hypothesis and conclude that gender and preferred reading are strongly correlated.

[Source: 5. data_preprocessing.pdf, Slides 30-33]

### Correlation Analysis (Numerical Data) - Pearson Correlation

Measures the linear correlation between two continuous variables.
$$
r_{A,B} = \frac{\sum_{i=1}^{n}(A_i - \bar{A})(B_i - \bar{B})}{\sqrt{\sum_{i=1}^{n}(A_i - \bar{A})^2 \sum_{i=1}^{n}(B_i - \bar{B})^2}}
$$
Alternatively expressed as:
$$
r = \frac{n(\sum xy) - (\sum x)(\sum y)}{\sqrt{[n\sum x^2 - (\sum x)^2][n\sum y^2 - (\sum y)^2]}}
$$
*   $r > 0$: Positively correlated (A increases as B increases).
*   $r = 0$: Independent.
*   $r < 0$: Negatively correlated.

### Example: Pearson Correlation Calculation
**Given:** $n=6$, $\sum x = 247$, $\sum y = 486$, $\sum xy = 20,485$, $\sum x^2 = 11,409$, $\sum y^2 = 40,022$.
**Find:** Correlation coefficient $r$.

**Solution:**
$$
\begin{aligned}
r &= \frac{6(20485) - (247 \times 486)}{\sqrt{[6(11409) - (247)^2] \times [6(40022) - (486)^2]}} \\
&= \frac{122910 - 120042}{\sqrt{[68454 - 61009] \times [240132 - 236196]}} \\
&= \frac{2868}{\sqrt{7445 \times 3936}} \\
&= \frac{2868}{\sqrt{29303520}} \\
&= \frac{2868}{5413.27} \\
&= 0.5298
\end{aligned}
$$
**Result:** $r \approx 0.53$. This means the variables have a moderate positive correlation (52.98%).
[Source: 5. data_preprocessing.pdf, Slide 46]

### Covariance (Numeric Data)

Covariance is similar to correlation.
$$
\text{Cov}(A,B) = \frac{\sum_{i=1}^{n} (A_i - \bar{A})(B_i - \bar{B})}{n} = E(AB) - E(A)E(B)
$$
*   **Positive covariance:** If $\text{Cov}(A,B) > 0$, A and B both tend to be larger than their expected values.
*   **Negative covariance:** If $\text{Cov}(A,B) < 0$, if A is larger than expected, B is likely smaller.
*   **Independence:** If independent, $\text{Cov}(A,B) = 0$. However, $\text{Cov}(A,B) = 0$ does not strictly imply independence unless under specific assumptions (like multivariate normal distribution).

### Example: Covariance Calculation
Suppose two stocks A and B have the following values: $(2, 5), (3, 8), (5, 10), (4, 11), (6, 14)$.
Will their prices rise or fall together?

**Solution:**
1.  Find $E(A)$: $(2+3+5+4+6)/5 = 20/5 = 4$
2.  Find $E(B)$: $(5+8+10+11+14)/5 = 48/5 = 9.6$
3.  Find $\text{Cov}(A,B)$:
    $$
    \begin{aligned}
    \text{Cov}(A,B) &= \frac{(2\times5) + (3\times8) + (5\times10) + (4\times11) + (6\times14)}{5} - (4 \times 9.6) \\
    &= \frac{10 + 24 + 50 + 44 + 84}{5} - 38.4 \\
    &= \frac{212}{5} - 38.4 \\
    &= 42.4 - 38.4 \\
    &= 4.0
    \end{aligned}
    $$
**Result:** $\text{Cov}(A, B) = 4$. Since covariance is positive, A and B rise together.
[Source: 5. data_preprocessing.pdf, Slide 48]

---

## 7. Data Transformation

Transforms data into appropriate forms for mining. Methods include:
1.  **Smoothing:** Remove noise.
2.  **Aggregation:** Summarization, data cube construction.
3.  **Generalization:** Concept hierarchy climbing.
4.  **Normalization:** Scale to fall within a small, specified range (e.g., 0 to 1).
5.  **Attribute/feature construction:** New attributes constructed from given ones.

### Normalization Methods

**1. Min-Max Normalization**
Linearly maps values to a new range $[\text{new\_min}_A, \text{new\_max}_A]$.
$$
v' = \frac{v - \min_A}{\max_A - \min_A} (\text{new\_max}_A - \text{new\_min}_A) + \text{new\_min}_A
$$

**2. Z-score Normalization**
Normalizes based on mean ($\mu$) and standard deviation ($\sigma$).
$$
v' = \frac{v - \mu_A}{\sigma_A}
$$

**3. Decimal Scaling**
Moves the decimal point of values based on the maximum absolute value.
$$
v' = \frac{v}{10^j}
$$
Where $j$ is the smallest integer such that $\max(|v'|) < 1$.

[Source: 5. data_preprocessing.pdf, Slides 50-51]

### Examples: Normalization

**Min-Max Example:**
*   **Given:** Feature `income` ranges from $\$12,000$ to $\$98,000$. Target range is $[0.0, 1.0]$.
*   **Transform:** $v = \$73,600$.
*   **Solution:**
    $$
    v' = \frac{73600 - 12000}{98000 - 12000}(1.0 - 0.0) + 0.0 = \frac{61600}{86000} \approx 0.7163
    $$

**Z-score Example:**
*   **Given:** Mean $\mu = \$54,000$, Std Dev $\sigma = \$16,000$.
*   **Transform:** $v = \$73,600$.
*   **Solution:**
    $$
    v' = \frac{73600 - 54000}{16000} = \frac{19600}{16000} = 1.225
    $$

**Decimal Scaling Example:**
*   **Given:** Range of values is $-986$ to $917$.
*   **Transform:** Maximum absolute value is $|-986| = 986$. Therefore, $j=3$ (since $986/1000 = 0.986 < 1$).
*   **Solution:**
    *   $-986 \rightarrow -986 / 10^3 = -0.986$
    *   $917 \rightarrow 917 / 10^3 = 0.917$

[Source: 5. data_preprocessing.pdf, Slides 53-57]

---

## 8. Data Reduction & Discretization

### Data Reduction
*   **Purpose:** Obtains a reduced representation in volume but produces the same or similar analytical results.
*   **Techniques:** Dimensionality reduction (e.g., PCA), numerosity reduction, and data compression.

### Data Discretization
*   Part of data reduction but highly important for continuous numeric data.
*   Methods include binning (discussed earlier).
*   **Sturges' Rule** for determining the number of bins $k$ for ungrouped continuous data:
    $$
    k = \lceil 1 + \log_2(n) \rceil
    $$

[Source: 5. data_preprocessing.pdf, Slides 8, 19-20]

---

## 9. Edge Cases & Troubleshooting

| Edge Case | Problem / Risk | Handling Strategy |
| :--- | :--- | :--- |
| **Zero Range ($\max_A = \min_A$)** | Min-Max normalization divides by zero. | Set $v' = 0$ for all instances or drop the constant feature. |
| **Zero Std Dev ($\sigma_A = 0$)** | Z-score normalization divides by zero. | Feature is constant; drop before scaling. |
| **Outliers in Min-Max** | Extreme values compress normal data into a tiny range. | Use Z-score normalization instead. |
| **Categorical features with missing values** | Mean imputation doesn't work. | Use Mode imputation or "Assign Unique Category" ('Unknown'). |

---

## Formula Sheet

### 1. Equal-Width Binning
$$
W = \frac{B - A}{N}
$$
*   $W$ = width of each bin
*   $A, B$ = lowest and highest values
*   $N$ = number of intervals

### 2. Chi-Square ($\chi^2$)
$$
\chi^2 = \sum_{i=1}^{R} \sum_{j=1}^{C} \frac{(O_{ij} - E_{ij})^2}{E_{ij}}
$$
$$
E_{ij} = \frac{(\text{Row}_i \text{ Sum}) \times (\text{Col}_j \text{ Sum})}{N}
$$
*   Degrees of Freedom $= (R-1)(C-1)$

### 3. Pearson Correlation Coefficient ($r$)
$$
r = \frac{n(\sum xy) - (\sum x)(\sum y)}{\sqrt{[n\sum x^2 - (\sum x)^2][n\sum y^2 - (\sum y)^2]}}
$$

### 4. Covariance
$$
\text{Cov}(A,B) = \frac{\sum_{i=1}^{n} (A_i - \bar{A})(B_i - \bar{B})}{n} = E(AB) - E(A)E(B)
$$

### 5. Min-Max Normalization
$$
v' = \frac{v - \min_A}{\max_A - \min_A} (\text{new\_max}_A - \text{new\_min}_A) + \text{new\_min}_A
$$

### 6. Z-Score Normalization
$$
v' = \frac{v - \mu_A}{\sigma_A}
$$

### 7. Decimal Scaling
$$
v' = \frac{v}{10^j} \quad \text{where } \max(|v'|) < 1
$$

### 8. Sturges' Rule (Bin count)
$$
k = \lceil 1 + \log_2(n) \rceil
$$

---

## Definition Sheet

*   **Data Preprocessing:** The process of cleaning, transforming, and organizing raw data into a usable format for mining algorithms.
*   **Noisy Data:** Data containing random errors or unwanted variance.
*   **Binning:** A smoothing technique that groups sorted data into local "neighborhoods" (bins).
*   **Data Integration:** Combining data from multiple sources into a coherent store, addressing schema conflicts and redundancies.
*   **Normalization:** Scaling numerical data to fall within a small, specified range to prevent large-magnitude features from dominating distance calculations.
*   **Min-Max Normalization:** Linear scaling mapping attribute values into a specified range, typically $[0, 1]$.
*   **Z-Score Normalization:** Scaling technique centering data at mean $0$ with standard deviation $1$.
*   **Decimal Scaling:** Normalization by shifting decimal places based on the maximum absolute value.

---

## Exam-Oriented Review

**Q1: List three reasons why real-world data is dirty.**
**A:** 1) Incomplete (missing values due to equipment failure or "not applicable" fields). 2) Noisy (errors during data entry or transmission). 3) Inconsistent (discrepancies in naming conventions or duplicate records with conflicting data).

**Q2: What are the pros and cons of replacing missing values with a global constant?**
**A:** *Pros:* Preserves data set size and is simple to implement. *Cons:* It may distort feature distributions or trick a learning algorithm into treating the constant (e.g., "Unknown") as a legitimate, meaningful class.

**Q3: Perform equal-frequency binning with 3 bins on the following data: $2, 6, 7, 9, 13, 15, 17, 21, 24$, and smooth by bin means.**
**A:**
*   Sort: Already sorted. $N=9$. 3 bins $\rightarrow$ 3 items per bin.
*   Bin 1: $[2, 6, 7] \rightarrow \text{Mean} = (2+6+7)/3 = 5 \rightarrow [5, 5, 5]$
*   Bin 2: $[9, 13, 15] \rightarrow \text{Mean} = (9+13+15)/3 = 37/3 \approx 12.33 \rightarrow [12.33, 12.33, 12.33]$
*   Bin 3: $[17, 21, 24] \rightarrow \text{Mean} = (17+21+24)/3 = 62/3 \approx 20.67 \rightarrow [20.67, 20.67, 20.67]$

**Q4: How does Min-Max normalization differ from Z-score normalization in handling outliers?**
**A:** Min-Max normalization scales values strictly between a defined min and max range. Extreme outliers will become the new max or min, compressing the rest of the normal data into a tiny numerical window. Z-score normalization handles outliers better because it scales based on the mean and standard deviation, allowing outliers to remain as large magnitude values without heavily compressing the bulk distribution.

**Q5: Normalize the value $v=500$ to the range $[0, 1]$ if the attribute's minimum is $100$ and maximum is $900$.**
**A:** $v' = \frac{500 - 100}{900 - 100}(1 - 0) + 0 = \frac{400}{800} = 0.5$.

**Q6: What is the purpose of the Chi-Square test in data integration?**
**A:** To detect redundancy between categorical (discrete) attributes. It tests the null hypothesis that two variables are independent. If $\chi^2$ is large (greater than a critical threshold), the variables are dependent and strongly correlated, meaning one might be redundant.

**Q7: If the Pearson correlation coefficient between two features is $r = 0.95$, what does this imply?**
**A:** It implies a very strong positive linear correlation. The features rise and fall together. In the context of data preprocessing, this highly redundant information might mean one of the features can be safely removed to reduce dimensionality.

**Q8: Using decimal scaling, normalize the sequence $[-45, 8, 924, -1005]$.**
**A:** The maximum absolute value is $|-1005| = 1005$. To make it less than $1$, we divide by $10,000$ ($10^4$), so $j=4$.
Result: $[-0.0045, 0.0008, 0.0924, -0.1005]$.
