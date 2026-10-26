import { SourceFile, ExamNotesResult } from '../types';

export const SAMPLE_FILES: SourceFile[] = [
  {
    id: 'syl-1',
    name: 'os_syllabus_unit2.pdf',
    role: 'syllabus',
    status: 'ready',
    size: 420000,
    pageCount: 3,
    extractedText: `UNIT 2: PROCESS MANAGEMENT & SYNCHRONIZATION
1. Processes: Process Concept, Process States, Process Control Block (PCB), Context Switching, Process Scheduling Queues.
2. CPU Scheduling: Scheduling Criteria, Preemptive vs Non-Preemptive, First-Come-First-Served (FCFS), Shortest Job First (SJF), Round Robin (RR), Priority Scheduling, Multi-level Queue Scheduling.
3. Process Synchronization: Critical Section Problem, Mutual Exclusion, Peterson's Solution, Semaphores, Classic Problems of Synchronization (Producer-Consumer, Dining Philosophers).
4. Deadlocks: Deadlock Characterization, 4 Necessary Conditions (Mutual Exclusion, Hold & Wait, No Preemption, Circular Wait), Resource Allocation Graph (RAG), Deadlock Prevention, Deadlock Avoidance (Banker's Algorithm), Deadlock Detection and Recovery.`,
    summary: 'Prescribed syllabus for Unit 2 OS covering Process lifecycle, Scheduling algorithms, Synchronization, and Deadlock management.',
    keyTopics: ['Process States', 'CPU Scheduling', 'Critical Section', 'Bankers Algorithm', 'Deadlocks']
  },
  {
    id: 'paper-1',
    name: 'os_model_papers_2024.pdf',
    role: 'model_paper',
    status: 'ready',
    size: 780000,
    pageCount: 5,
    extractedText: `ANNUAL SEMESTER EXAMINATION - MODEL QUESTION PAPER
Subject: Operating Systems (CS-402)
SECTION A (2 Marks Each - Answer in 2-3 sentences with definition):
Q1(a). Define Context Switching. Why is it an overhead?
Q1(b). What is a Race Condition?
Q1(c). State the four necessary conditions for Deadlock to occur.
Q1(d). Differentiate between Preemptive and Non-Preemptive CPU Scheduling.

SECTION B (5 Marks Each - Conceptual explanation with diagram):
Q4(a). Explain Peterson's solution for 2-process mutual exclusion with algorithm code.
Q4(b). Describe the structure of a Process Control Block (PCB) with a labeled diagram.

SECTION C (10 Marks Each - Comprehensive answer with formulas, Gantt chart, or matrices):
Q7. Consider 5 processes P0 through P4 and 3 resource types A (10 instances), B (5 instances), C (7 instances). At time T0, current allocation and max demand are given.
    (i) Is the system in a safe state? Apply Banker's Safety Algorithm step-by-step.
    (ii) If a request from process P1 arrives for (1, 0, 2), can it be granted immediately?
Q8. Compare FCFS, SJF, and Round Robin scheduling (Time Quantum = 2ms) for processes P1(burst=6), P2(burst=4), P3(burst=2). Draw Gantt charts and calculate Average Turnaround Time and Average Waiting Time.`,
    summary: 'Recent university model question paper revealing high-frequency 10-mark questions on Banker\'s algorithm and CPU scheduling Gantt charts.',
    keyTopics: ['Bankers Safety Algorithm', 'Gantt Charts', '4 Deadlock Conditions', 'Peterson Solution']
  },
  {
    id: 'ho-1',
    name: 'OS_System_HO.pdf',
    role: 'other',
    status: 'ready',
    size: 1250000,
    pageCount: 14,
    extractedText: `PROFESSOR HANDOUT - LECTURE NOTES & EXAM TIPS
Topic: Unit 2 Deep Dive
Note for Examiners: Full marks are awarded when students draw the Process State Transition diagram with 5 states (New, Ready, Running, Waiting, Terminated).
Key Formulae:
- Turnaround Time (TAT) = Completion Time - Arrival Time
- Waiting Time (WT) = Turnaround Time - Burst Time
- Response Time = First CPU response - Arrival Time

Deadlock Mnemonic: "M-H-N-C"
1. M = Mutual Exclusion (at least one non-shareable resource)
2. H = Hold and Wait (process holds 1 resource and requests another)
3. N = No Preemption (resources cannot be forcibly taken)
4. C = Circular Wait (P0 waiting for P1, P1 waiting for P2... Pn waiting for P0)

Banker's Algorithm Formula:
Need Matrix = Max Matrix - Allocation Matrix.
Vector Work = Available. Finish[i] = false for all i.
If Need[i] <= Work and Finish[i] == false: Work = Work + Allocation[i]; Finish[i] = true. Repeat.`,
    summary: 'Comprehensive lecture handouts with official formulas, marking criteria, and memory mnemonics.',
    keyTopics: ['Process State Transition', 'Turnaround & Waiting Time Formulas', 'MHNC Mnemonic', 'Need Matrix Calculation']
  }
];

export const INITIAL_EXAM_NOTES: ExamNotesResult = {
  id: 'notes-os-u2',
  title: 'Operating Systems – Unit 2: Process Management & Deadlocks',
  subject: 'Operating Systems (CS-402)',
  unit: 'Unit 2',
  depth: 'standard',
  generatedAt: '2026-10-26T10:20:00Z',
  executiveSummary: 'This high-yield exam guide covers Unit 2 core university concepts: Process lifecycle & PCB, CPU Scheduling with Gantt charts, and Deadlock characterization with Banker’s safety algorithm. Structured to maximize marks for 2M, 5M, and 10M questions.',
  sections: [
    {
      id: 'sec-1',
      heading: '1. Process Lifecycle & Process Control Block (PCB)',
      targetMarks: '5-Mark',
      keyDefinition: 'A Process is a program in execution containing program code, current activity (PC, registers), process stack, data section, and heap memory.',
      bulletPoints: [
        '5 Main States: New (being created), Ready (in main memory waiting for CPU), Running (instructions executing), Waiting/Blocked (waiting for I/O event), Terminated (execution finished).',
        'PCB (Task Control Block): Data structure containing PID, Program Counter, CPU registers, CPU scheduling info, Memory management info, and I/O status info.',
        'Context Switch Overhead: The mechanism to store the state of the active process and restore another. It is pure computational overhead as no useful work is done during switching.'
      ],
      mnemonic: 'N-R-R-W-T ("New Runners Run With Timing")',
      diagram: {
        type: 'mermaid',
        code: `graph LR
    New([New]) -->|admitted| Ready([Ready])
    Ready -->|scheduler dispatch| Running([Running])
    Running -->|interrupt| Ready
    Running -->|I/O or event wait| Waiting([Waiting])
    Waiting -->|I/O or event completion| Ready
    Running -->|exit| Terminated([Terminated])`,
        caption: 'Figure 1: 5-State Process Transition Diagram (Mandatory for 5M in Semester Exams)'
      },
      examAnswerStructure: {
        question: 'Explain Process Control Block (PCB) and the 5-state process transition model with a diagram. [5 Marks]',
        stepByStepAnswer: [
          'Step 1: Define Process and state that PCB is its digital passport in the kernel.',
          'Step 2: Draw the 5-state lifecycle diagram showing New -> Ready <-> Running -> Terminated and Waiting.',
          'Step 3: List key PCB fields: PID, PC, CPU Registers, Memory Limits, Accounting.',
          'Step 4: Mention Context Switch definition and why hardware support (registers) minimizes its overhead.'
        ],
        scoringTips: [
          'Always label transition arrows (e.g. "scheduler dispatch", "interrupt", "I/O completion"). Missing labels loses 1 mark.',
          'Highlight that PCB resides in protected kernel memory space.'
        ]
      },
      sourceCitations: [
        {
          fileId: 'syl-1',
          fileName: 'os_syllabus_unit2.pdf',
          pageNumber: 1,
          snippet: 'Processes: Process Concept, Process States, Process Control Block (PCB), Context Switching',
          role: 'syllabus'
        },
        {
          fileId: 'ho-1',
          fileName: 'OS_System_HO.pdf',
          pageNumber: 2,
          snippet: 'Full marks are awarded when students draw the Process State Transition diagram with 5 states.',
          role: 'other'
        }
      ]
    },
    {
      id: 'sec-2',
      heading: '2. CPU Scheduling Algorithms & Gantt Chart Solving',
      targetMarks: '10-Mark',
      keyDefinition: 'CPU Scheduling is the process by which the scheduler allocates CPU time slices among ready processes to optimize CPU utilization, throughput, turnaround time, waiting time, and response time.',
      bulletPoints: [
        'Preemptive vs Non-Preemptive: Preemptive preempts running processes when higher priority arrives (e.g., Round Robin, SRTF); Non-Preemptive lets process run till CPU burst finishes or voluntary yield (e.g., FCFS, standard SJF).',
        'Turnaround Time (TAT) = Completion Time (CT) - Arrival Time (AT)',
        'Waiting Time (WT) = Turnaround Time (TAT) - Burst Time (BT)',
        'Convoy Effect: In FCFS, short processes get stuck waiting behind long CPU-bound process, degrading average WT.'
      ],
      mnemonic: 'TAT = CT - AT | WT = TAT - BT ("Cat Cat, Water Bat")',
      formulaOrSyntax: 'Average WT = \\frac{\\sum_{i=1}^{n} WT_i}{n} \\quad \\text{and} \\quad \\text{Throughput} = \\frac{\\text{Completed Processes}}{\\text{Total Time Elapsed}}',
      diagram: {
        type: 'mermaid',
        code: `gantt
    title CPU Scheduling Gantt Chart (Round Robin q=2ms)
    dateFormat X
    axisFormat %s
    section CPU
    P1 (0-2)    :active, 0, 2
    P2 (2-4)    :2, 4
    P3 (4-6)    :crit, 4, 6
    P1 (6-8)    :active, 6, 8
    P1 (8-10)   :active, 8, 10`,
        caption: 'Figure 2: Gantt Chart for RR (q=2) - P1:6ms, P2:4ms, P3:2ms. Total elapsed: 10ms.'
      },
      examAnswerStructure: {
        question: 'Solve Round Robin (q=2ms) vs SJF for given burst times. Compute average waiting time and turnaround time with Gantt charts. [10 Marks]',
        stepByStepAnswer: [
          'Step 1: Construct the Ready Queue timeline as processes arrive and time quantum expires.',
          'Step 2: Draw the horizontal Gantt chart showing time marks 0, 2, 4, 6, 8, 10.',
          'Step 3: Build table with columns: Process | Arrival Time | Burst Time | Completion Time | TAT (CT-AT) | WT (TAT-BT).',
          'Step 4: Sum the columns and compute averages with clear units (ms).'
        ],
        scoringTips: [
          'Draw the Gantt chart clearly with time markers at every switch point.',
          'Double check that WT >= 0; if you get a negative WT, your completion time is wrong.'
        ]
      },
      sourceCitations: [
        {
          fileId: 'paper-1',
          fileName: 'os_model_papers_2024.pdf',
          pageNumber: 3,
          snippet: 'Q8. Compare FCFS, SJF, and Round Robin scheduling (Time Quantum = 2ms) ... Draw Gantt charts',
          role: 'model_paper'
        },
        {
          fileId: 'ho-1',
          fileName: 'OS_System_HO.pdf',
          pageNumber: 4,
          snippet: 'Formula: TAT = CT - AT, WT = TAT - BT. Check average turnaround time.',
          role: 'other'
        }
      ]
    },
    {
      id: 'sec-3',
      heading: '3. Deadlocks & Banker’s Safety Algorithm',
      targetMarks: '10-Mark',
      keyDefinition: 'A Deadlock is a situation where a set of processes are permanently blocked because each process is holding a resource and waiting for another resource acquired by some other process in the set.',
      bulletPoints: [
        '4 Coffman Necessary Conditions: Mutual Exclusion, Hold & Wait, No Preemption, Circular Wait (All 4 must hold simultaneously).',
        'Deadlock Handling Strategies: Prevention (negate 1 of 4 conditions), Avoidance (Banker\'s Algorithm, stay in safe state), Detection & Recovery (kill process or preempt resource), Ignorance (Ostrich algorithm).',
        'Need Matrix Calculation: Need[i][j] = Max[i][j] - Allocation[i][j].',
        'Safety Algorithm: Check if there exists process where Need <= Work. If yes, process finishes, returns allocation to Work vector: Work = Work + Allocation[i].'
      ],
      mnemonic: 'M-H-N-C ("Must Have No Circularity")',
      formulaOrSyntax: '\\text{Need}[i] = \\text{Max}[i] - \\text{Allocation}[i] \\implies \\text{If } \\text{Need}[i] \\le \\text{Work} \\implies \\text{Work} \\leftarrow \\text{Work} + \\text{Alloc}[i]',
      diagram: {
        type: 'mermaid',
        code: `graph TD
    A[Start: Work = Available, Finish = all False] --> B{Find Pi: Finish==false AND Need <= Work}
    B -- Found Pi --> C[Work = Work + Allocation[i]<br/>Finish[i] = true]
    C --> B
    B -- None Found --> D{Are all Finish == true?}
    D -- Yes --> E([SAFE STATE: System is Deadlock Free!])
    D -- No --> F([UNSAFE STATE: Potential Deadlock!])`,
        caption: 'Figure 3: Banker’s Safety Algorithm Decision Flowchart'
      },
      examAnswerStructure: {
        question: 'State the 4 conditions for deadlock and demonstrate Banker\'s Algorithm on a 5-process, 3-resource system. [10 Marks]',
        stepByStepAnswer: [
          'Step 1: State and explain M-H-N-C (Mutual exclusion, Hold & wait, No preemption, Circular wait).',
          'Step 2: Calculate the Need matrix: Need = Max - Allocation for each process P0 to P4.',
          'Step 3: Initialize Work = Available = [3, 3, 2]. Test each process in loop.',
          'Step 4: Show the step-by-step transition of Work vector as each process safely finishes.',
          'Step 5: Write the final Safe Sequence: < P1, P3, P4, P0, P2 >.'
        ],
        scoringTips: [
          'Writing the safe sequence in angle brackets < P1, P3... > is mandatory.',
          'Underline or box the final Available / Work vector at each iteration.'
        ]
      },
      sourceCitations: [
        {
          fileId: 'paper-1',
          fileName: 'os_model_papers_2024.pdf',
          pageNumber: 4,
          snippet: 'Q7. Consider 5 processes P0 through P4 and 3 resource types ... Apply Banker\'s Safety Algorithm',
          role: 'model_paper'
        },
        {
          fileId: 'syl-1',
          fileName: 'os_syllabus_unit2.pdf',
          pageNumber: 3,
          snippet: '4. Deadlocks: 4 Necessary Conditions, Resource Allocation Graph, Deadlock Avoidance (Banker\'s Algorithm)',
          role: 'syllabus'
        }
      ]
    },
    {
      id: 'sec-4',
      heading: '4. Process Synchronization & Peterson’s Algorithm',
      targetMarks: '5-Mark',
      keyDefinition: 'The Critical Section is a segment of code where shared resources (variables, files) are accessed. The Critical Section Problem requires Mutual Exclusion, Progress, and Bounded Waiting.',
      bulletPoints: [
        'Race Condition: Outcome depends on execution order of competing threads.',
        'Peterson’s Solution: Classic software 2-process solution using two variables: boolean flag[2] (intention to enter) and int turn (whose turn it is).',
        'Semaphores: Synchronization primitive with atomic wait() (P) and signal() (V) operations.'
      ],
      mnemonic: 'M-P-B ("Must Protect Boundaries" = Mutual Exclusion, Progress, Bounded Waiting)',
      examAnswerStructure: {
        question: 'Explain Peterson’s Algorithm for mutual exclusion with code syntax and 3 criteria satisfaction. [5 Marks]',
        stepByStepAnswer: [
          'Step 1: Define Critical Section and 3 requirements (Mutual Exclusion, Progress, Bounded Waiting).',
          'Step 2: Write Peterson\'s while loop: flag[i] = true; turn = j; while(flag[j] && turn == j); /* critical section */ flag[i] = false;',
          'Step 3: Prove Mutual Exclusion: both cannot enter simultaneously because turn can only hold one value at a time.'
        ],
        scoringTips: [
          'Do not forget the semicolon after the busy-waiting while loop!',
          'Explicitly address how Bounded Waiting is met by yielding turn to process j.'
        ]
      },
      sourceCitations: [
        {
          fileId: 'syl-1',
          fileName: 'os_syllabus_unit2.pdf',
          pageNumber: 2,
          snippet: 'Process Synchronization: Critical Section Problem, Mutual Exclusion, Peterson\'s Solution',
          role: 'syllabus'
        }
      ]
    }
  ],
  importantQuestions: [
    {
      id: 'q-1',
      question: 'Apply Banker’s Algorithm for Deadlock Avoidance to determine if the system is in a safe state, and derive the Safe Execution Sequence. [10 Marks]',
      marks: 10,
      frequency: 'Repeated',
      appearedInYears: ['2024 Model Paper', '2023 End-Sem', '2022 Makeup'],
      modelPaperRef: 'Model Paper Q7',
      keyPointsToHit: [
        'Calculate Need Matrix = Max - Allocation',
        'State initial Work = Available vector',
        'Iterate through processes showing Work updates after each termination',
        'Conclude with explicit Safe Sequence < P1, P3, P4, P0, P2 >'
      ]
    },
    {
      id: 'q-2',
      question: 'Calculate average Turnaround Time and Waiting Time for Round Robin (q=2) and SJF with Gantt charts. [10 Marks]',
      marks: 10,
      frequency: 'High',
      appearedInYears: ['2024 Model Paper', '2023 Mid-Sem'],
      modelPaperRef: 'Model Paper Q8',
      keyPointsToHit: [
        'Clear horizontal Gantt chart with time scale',
        'Formula: TAT = Completion - Arrival',
        'Formula: WT = TAT - Burst',
        'Summary table and calculated average metrics'
      ]
    },
    {
      id: 'q-3',
      question: 'State and explain the 4 Coffman necessary conditions for Deadlock occurrence. [5 Marks]',
      marks: 5,
      frequency: 'High',
      appearedInYears: ['2024 Model Paper Q1(c)', '2022 End-Sem'],
      modelPaperRef: 'Model Paper Q1(c)',
      keyPointsToHit: [
        'Mutual Exclusion (non-shareable resources)',
        'Hold and Wait (holding while requesting)',
        'No Preemption (cannot forcibly confiscate)',
        'Circular Wait (closed loop of requests)'
      ]
    },
    {
      id: 'q-4',
      question: 'Explain the 5-state Process Lifecycle with a neat labeled state transition diagram. [5 Marks]',
      marks: 5,
      frequency: 'Probable',
      appearedInYears: ['2023 End-Sem', '2021 Mid-Sem'],
      modelPaperRef: 'Model Paper Q4(b)',
      keyPointsToHit: [
        '5 states: New, Ready, Running, Waiting, Terminated',
        'Transition triggers (Scheduler dispatch, I/O wait, Interrupt)',
        'PCB role as process state repository'
      ]
    },
    {
      id: 'q-5',
      question: 'Define Context Switching and explain why it is treated as a computational overhead. [2 Marks]',
      marks: 2,
      frequency: 'High',
      appearedInYears: ['2024 Model Paper Q1(a)', '2023 Mid-Sem'],
      modelPaperRef: 'Model Paper Q1(a)',
      keyPointsToHit: [
        'Saving state of old process into its PCB & loading new process PCB',
        'Overhead because CPU does no useful application work during switch'
      ]
    }
  ],
  comparisons: [
    {
      id: 'comp-1',
      title: 'Preemptive vs Non-Preemptive CPU Scheduling',
      topicA: 'Preemptive Scheduling',
      topicB: 'Non-Preemptive Scheduling',
      rows: [
        { parameter: 'CPU Allocation', featureA: 'CPU can be taken away before burst completion', featureB: 'CPU cannot be taken away until process terminates/yields' },
        { parameter: 'Overhead', featureA: 'High due to frequent context switching', featureB: 'Low, minimal context switches' },
        { parameter: 'Starvation', featureA: 'Possible for long processes (e.g. in SRTF)', featureB: 'Possible if long process arrives first (convoy effect)' },
        { parameter: 'Examples', featureA: 'Round Robin, SRTF, Preemptive Priority', featureB: 'FCFS, standard Non-Preemptive SJF' },
        { parameter: 'Responsiveness', featureA: 'High (ideal for interactive / time-sharing systems)', featureB: 'Low (suited for batch processing systems)' }
      ]
    },
    {
      id: 'comp-2',
      title: 'Deadlock Prevention vs Deadlock Avoidance',
      topicA: 'Deadlock Prevention',
      topicB: 'Deadlock Avoidance',
      rows: [
        { parameter: 'Basic Idea', featureA: 'Invalidate at least 1 of the 4 Coffman conditions', featureB: 'Dynamically evaluate resource allocation state' },
        { parameter: 'Algorithm', featureA: 'Design-time protocol (e.g., total resource ordering)', featureB: 'Runtime algorithm (Banker\'s Safety Algorithm)' },
        { parameter: 'Resource Utilization', featureA: 'Very low due to rigid conservative rules', featureB: 'Higher than prevention, dynamically tracked' },
        { parameter: 'Prior Information', featureA: 'No prior information needed from process', featureB: 'Requires process to declare Maximum claim in advance' }
      ]
    }
  ],
  flashcards: [
    {
      id: 'fc-1',
      category: 'Deadlocks',
      front: 'What are the 4 Coffman conditions for deadlock?',
      back: 'M-H-N-C: 1) Mutual Exclusion, 2) Hold and Wait, 3) No Preemption, 4) Circular Wait. All four must exist simultaneously.'
    },
    {
      id: 'fc-2',
      category: 'CPU Scheduling',
      front: 'Formula for Turnaround Time (TAT) and Waiting Time (WT)?',
      back: 'TAT = Completion Time - Arrival Time\nWT = Turnaround Time - Burst Time'
    },
    {
      id: 'fc-3',
      category: 'Banker’s Algorithm',
      front: 'How is the Need Matrix calculated in Banker\'s Algorithm?',
      back: 'Need[i][j] = Max[i][j] - Allocation[i][j]'
    },
    {
      id: 'fc-4',
      category: 'Process Management',
      front: 'What happens during a Context Switch?',
      back: 'The OS saves the context/registers of the currently running process into its PCB, and loads the saved context of the next scheduled process.'
    },
    {
      id: 'fc-5',
      category: 'Synchronization',
      front: 'What are the 3 criteria for solving the Critical Section Problem?',
      back: '1. Mutual Exclusion (only 1 inside CS)\n2. Progress (selection not indefinitely delayed)\n3. Bounded Waiting (limit on waiting times to prevent starvation)'
    }
  ],
  sourcesUsed: [
    {
      fileName: 'os_syl.pdf',
      page: 'p. 1-3',
      role: 'syllabus',
      relevance: 'Prescribed university topics for Unit 2: Process management, CPU Scheduling, Deadlocks, Banker\'s Algorithm'
    },
    {
      fileName: 'os_paper.pdf',
      page: 'p. 1, 3, 4',
      role: 'model_paper',
      relevance: 'Identified recurring 10M questions on Banker\'s algorithm, Gantt chart, and 2M definitions'
    },
    {
      fileName: 'HO.pdf',
      page: 'p. 2, 4, 14',
      role: 'other',
      relevance: 'Source for TAT/WT formulas, MHNC mnemonic, and marking scheme tips'
    }
  ]
};

// ──────────────────────────────────────────────────────────────
// DSA (Data Structures & Algorithms) Sample Pack
// ──────────────────────────────────────────────────────────────
export const DSA_SAMPLE_FILES: SourceFile[] = [
  {
    id: 'dsa-syl',
    name: 'dsa_syllabus_unit3.pdf',
    role: 'syllabus',
    status: 'ready',
    size: 390000,
    pageCount: 2,
    extractedText: `UNIT 3: SORTING, TREES & GRAPH ALGORITHMS
1. Sorting Algorithms: Bubble Sort, Selection Sort, Insertion Sort, Merge Sort, Quick Sort, Heap Sort. Time & Space complexity analysis using Big-O notation.
2. Trees: Binary Trees, Binary Search Trees (BST), AVL Trees (rotations), B-Trees, Heap (Min-Heap, Max-Heap). Tree traversals: Inorder, Preorder, Postorder, Level-order.
3. Graphs: Representation (Adjacency Matrix, Adjacency List), BFS, DFS, Shortest Path (Dijkstra, Bellman-Ford), Minimum Spanning Tree (Prim, Kruskal).`,
    summary: 'DSA Unit 3 covering sorting algorithms, tree structures, and graph algorithms with complexity analysis.',
    keyTopics: ['Quick Sort', 'AVL Rotations', 'Dijkstra\'s Algorithm', 'Kruskal MST', 'Heap Sort']
  },
  {
    id: 'dsa-paper',
    name: 'dsa_model_papers_2024.pdf',
    role: 'model_paper',
    status: 'ready',
    size: 640000,
    pageCount: 4,
    extractedText: `SEMESTER EXAMINATION - DATA STRUCTURES & ALGORITHMS
10 Marks: Trace Quick Sort on [64, 34, 25, 12, 22, 11, 90] showing pivots, partitions, and recursion depth. Analyze best/worst/average case complexity.
10 Marks: Insert keys 50, 30, 70, 20, 40, 60, 80 into an AVL tree. Show all rotations and balance factors after each insertion.
5 Marks: Apply Dijkstra's Shortest Path algorithm on a weighted graph from source vertex A. Show all relaxations step-by-step.
5 Marks: Build a Max-Heap from [3, 10, 5, 1, 15, 9, 7]. Show heapify process.
2 Marks: What is the time complexity of Merge Sort and why is it preferred over Quick Sort in the worst case?`,
    summary: 'High-frequency DSA exam questions on Quick Sort tracing, AVL insertions, and Dijkstra step-by-step.',
    keyTopics: ['Quick Sort trace', 'AVL LL/RR/LR/RL rotations', 'Dijkstra relaxations', 'Heapify']
  },
  {
    id: 'dsa-notes',
    name: 'CLRS_DSA_LectureNotes.pdf',
    role: 'other',
    status: 'ready',
    size: 1420000,
    pageCount: 18,
    extractedText: `LECTURE NOTES - CLRS Reference
Quicksort: Partition selects pivot (last element). Lomuto partition scheme: maintain i for boundary of smaller elements.
Time: Best O(n log n) [balanced partitions], Worst O(n^2) [sorted input], Average O(n log n).
AVL Tree: Height-balanced BST. |Height(left) - Height(right)| <= 1.
Four rotation types: LL (right rotate), RR (left rotate), LR (left-right: left rotate on child then right rotate on root), RL (right-left).
Dijkstra: Uses min-priority queue. Time O((V+E) log V) with binary heap.
Kruskal: Sort edges by weight, use Union-Find (Disjoint Set Union) to detect cycles. Time O(E log E).`,
    summary: 'Authoritative CLRS-based lecture notes with exact rotation cases, complexity proofs, and algorithm pseudocode.',
    keyTopics: ['Lomuto partition', 'AVL rotation conditions', 'Dijkstra priority queue', 'Kruskal Union-Find']
  }
];

export const DSA_EXAM_NOTES: ExamNotesResult = {
  id: 'notes-dsa-u3',
  title: 'Data Structures & Algorithms – Unit 3: Sorting, Trees & Graphs',
  subject: 'Data Structures & Algorithms (CS-301)',
  unit: 'Unit 3',
  depth: 'standard',
  generatedAt: new Date().toISOString(),
  executiveSummary: 'High-yield exam guide covering the 3 pillars of DSA Unit 3: Sorting algorithms (Quick Sort with pivot tracing), AVL Tree insertions with 4 rotation types, and Graph algorithms (Dijkstra shortest path, Kruskal MST). Structured for 2M, 5M, and 10M university exam questions.',
  sections: [
    {
      id: 'dsa-sec-1',
      heading: '1. Quick Sort – Partitioning & Complexity Analysis',
      targetMarks: '10-Mark',
      keyDefinition: 'Quick Sort is a divide-and-conquer comparison-based sorting algorithm that selects a pivot element, partitions the array into elements ≤ pivot and elements > pivot, then recursively sorts each partition.',
      bulletPoints: [
        'Lomuto Partition Scheme: Uses last element as pivot. Scans left-to-right; swaps elements ≤ pivot to a growing left sub-array (boundary tracked by index i).',
        'Time Complexity: Best/Average O(n log n) when partitions are balanced; Worst O(n²) when input is already sorted (pivot always becomes min/max).',
        'Space Complexity: O(log n) average stack space due to recursion depth.',
        'Improvement: Randomized Quick Sort selects a random pivot, reducing worst-case probability to near-zero in practice.',
        'Stability: NOT stable — equal elements may be reordered during partitioning.'
      ],
      mnemonic: 'QS = "Quickly Splits" → Pick Pivot, Partition, Recurse Left & Right',
      formulaOrSyntax: `QUICKSORT(A, lo, hi):
  if lo < hi:
    p = PARTITION(A, lo, hi)   // returns pivot index
    QUICKSORT(A, lo, p-1)
    QUICKSORT(A, p+1, hi)

PARTITION(A, lo, hi):
  pivot = A[hi]; i = lo - 1
  for j = lo to hi-1:
    if A[j] <= pivot: i++, swap(A[i], A[j])
  swap(A[i+1], A[hi])
  return i + 1`,
      diagram: {
        type: 'mermaid',
        code: `graph TD
    A["Array: [64,34,25,12,22,11,90]"] --> B["Pivot=90, Partition → [64,34,25,12,22,11 | 90]"]
    B --> C["Pivot=11, Left=[11,34,25,12,22,64]"]
    B --> D["Right=[] (empty)"]
    C --> E["Pivot=64, Left=[11,34,25,12,22] | Right=[]"]
    E --> F["Continue partitioning recursively..."]
    F --> G["Sorted: [11,12,22,25,34,64,90]"]`,
        caption: 'Figure 1: Quick Sort Recursion Tree with Lomuto Partitioning'
      },
      examAnswerStructure: {
        question: 'Trace Quick Sort on [64, 34, 25, 12, 22, 11, 90] showing pivots and partitions at each level. Analyze time complexity. [10 Marks]',
        stepByStepAnswer: [
          'Step 1: State definition and choose Lomuto scheme (pivot = last element).',
          'Step 2: Round 1 – Pivot=90 (index 6). No elements > 90 on right. Partition: [64,34,25,12,22,11 | 90]. Pivot placed at position 6.',
          'Step 3: Round 2 – Recurse left sub-array [64,34,25,12,22,11]. Pivot=11. Partition: [11 | 34,25,12,22,64].',
          'Step 4: Continue recursively showing each pivot selection and partition result.',
          'Step 5: Complexity – Best O(n log n), Worst O(n²). Mention randomized pivot to avoid worst case.',
          'Step 6: Final sorted array: [11, 12, 22, 25, 34, 64, 90].'
        ],
        scoringTips: [
          'Draw a tree diagram showing recursive calls and array state at each level — worth 4 marks.',
          'Always state the pivot value explicitly (e.g., "Pivot = 90 at index 6") in each step.',
          'Mention that Merge Sort is preferred over Quick Sort for guaranteed O(n log n) worst case.'
        ]
      },
      sourceCitations: [
        { fileId: 'dsa-syl', fileName: 'dsa_syllabus_unit3.pdf', pageNumber: 1, snippet: 'Quick Sort. Time & Space complexity analysis using Big-O notation.', role: 'syllabus' },
        { fileId: 'dsa-paper', fileName: 'dsa_model_papers_2024.pdf', pageNumber: 1, snippet: '10 Marks: Trace Quick Sort on [64,34,25,12,22,11,90]', role: 'model_paper' }
      ]
    },
    {
      id: 'dsa-sec-2',
      heading: '2. AVL Trees – Insertions & Four Rotation Types',
      targetMarks: '10-Mark',
      keyDefinition: 'An AVL Tree (Adelson-Velsky and Landis) is a self-balancing Binary Search Tree where the balance factor (Height(left subtree) − Height(right subtree)) for every node is −1, 0, or +1.',
      bulletPoints: [
        'Balance Factor (BF) = Height(Left Subtree) − Height(Right Subtree). BF ∈ {-1, 0, +1} for balanced nodes.',
        'LL Imbalance (BF > 1, left-heavy): Fix with Single Right Rotation.',
        'RR Imbalance (BF < -1, right-heavy): Fix with Single Left Rotation.',
        'LR Imbalance (BF > 1 on root, right-heavy on left child): Fix with Left Rotate on left child, then Right Rotate on root.',
        'RL Imbalance (BF < -1 on root, left-heavy on right child): Fix with Right Rotate on right child, then Left Rotate on root.',
        'Height after n insertions: O(log n) guaranteed, unlike plain BST which degenerates to O(n).'
      ],
      mnemonic: '"LL=Right, RR=Left, LR=Left-then-Right, RL=Right-then-Left" (mirror opposites!)',
      diagram: {
        type: 'mermaid',
        code: `graph TD
    A["Detect Imbalance"] --> B{"BF of Unbalanced Node"}
    B -->|"+2 (Left Heavy)"| C{"BF of Left Child"}
    B -->|"-2 (Right Heavy)"| D{"BF of Right Child"}
    C -->|"+1 (LL Case)"| E["✅ Single Right Rotation"]
    C -->|"-1 (LR Case)"| F["⚡ Left Rot on Child → Right Rot on Root"]
    D -->|"-1 (RR Case)"| G["✅ Single Left Rotation"]
    D -->|"+1 (RL Case)"| H["⚡ Right Rot on Child → Left Rot on Root"]`,
        caption: 'Figure 2: AVL Rotation Decision Tree – Identify Case → Apply Fix'
      },
      examAnswerStructure: {
        question: 'Insert keys 50, 30, 70, 20, 40, 60, 80 into an AVL tree. Show all rotations and balance factors. [10 Marks]',
        stepByStepAnswer: [
          'Step 1: Insert 50 (root, BF=0). Insert 30 (left of 50, BF=1). Insert 70 (right of 50, BF=0).',
          'Step 2: Insert 20 (left of 30). BF of 50 becomes 2 (LL case). Apply Right Rotation on 50.',
          'Step 3: After rotation, 30 becomes root. Tree: 30(root) with left=20, right=50(with right=70).',
          'Step 4: Insert 40 (right of 20). BF stays balanced. Insert 60 (left of 70). BF stays balanced.',
          'Step 5: Insert 80 (right of 70). BF of 50 becomes −2 (RR case). Apply Left Rotation on 50.',
          'Step 6: Draw final balanced AVL tree with all BF values labeled.'
        ],
        scoringTips: [
          'Show balance factor at EVERY node after EVERY insertion — losing BF values loses marks.',
          'Draw the tree state before rotation and after rotation side-by-side.',
          'Label rotation type explicitly: e.g., "LL imbalance → Single Right Rotation at node 50".'
        ]
      },
      sourceCitations: [
        { fileId: 'dsa-paper', fileName: 'dsa_model_papers_2024.pdf', pageNumber: 2, snippet: '10 Marks: Insert keys 50,30,70,20,40,60,80 into an AVL tree', role: 'model_paper' },
        { fileId: 'dsa-notes', fileName: 'CLRS_DSA_LectureNotes.pdf', pageNumber: 5, snippet: 'Four rotation types: LL, RR, LR, RL', role: 'other' }
      ]
    },
    {
      id: 'dsa-sec-3',
      heading: '3. Dijkstra\'s Shortest Path Algorithm',
      targetMarks: '5-Mark',
      keyDefinition: 'Dijkstra\'s Algorithm finds the shortest path from a source vertex to all other vertices in a weighted directed graph with non-negative edge weights using a greedy min-priority queue approach.',
      bulletPoints: [
        'Initialization: dist[source] = 0; dist[all others] = ∞. Add all vertices to min-priority queue.',
        'Greedy Step: At each iteration, extract vertex u with minimum dist[u] from queue.',
        'Relaxation: For each neighbor v of u: if dist[u] + weight(u,v) < dist[v], update dist[v] = dist[u] + weight(u,v).',
        'Time Complexity: O((V + E) log V) with binary heap priority queue.',
        'Limitation: Does NOT work with negative edge weights (use Bellman-Ford instead).'
      ],
      mnemonic: '"Dijkstra = Greedy Min-Distance" — always pick the closest unvisited vertex',
      examAnswerStructure: {
        question: 'Apply Dijkstra\'s shortest path algorithm on the given weighted graph from source A. Show all relaxations. [5 Marks]',
        stepByStepAnswer: [
          'Step 1: Initialize: dist[A]=0, dist[all others]=∞. Priority queue: {A:0, B:∞, C:∞, D:∞}.',
          'Step 2: Extract A (min=0). Relax neighbors: dist[B]=min(∞, 0+4)=4, dist[C]=min(∞, 0+2)=2.',
          'Step 3: Extract C (min=2). Relax: dist[B]=min(4, 2+1)=3, dist[D]=min(∞, 2+5)=7.',
          'Step 4: Extract B (min=3). Relax: dist[D]=min(7, 3+2)=5.',
          'Step 5: Extract D (min=5). No further updates. Final: dist={A:0, B:3, C:2, D:5}.'
        ],
        scoringTips: [
          'Draw a table with columns: Iteration | Extracted | dist[A] | dist[B] | dist[C] | dist[D].',
          'Show the priority queue state at each step for full marks.'
        ]
      },
      sourceCitations: [
        { fileId: 'dsa-syl', fileName: 'dsa_syllabus_unit3.pdf', pageNumber: 2, snippet: 'Shortest Path: Dijkstra, Bellman-Ford', role: 'syllabus' },
        { fileId: 'dsa-notes', fileName: 'CLRS_DSA_LectureNotes.pdf', pageNumber: 14, snippet: 'Dijkstra: Uses min-priority queue. Time O((V+E) log V)', role: 'other' }
      ]
    }
  ],
  importantQuestions: [
    {
      id: 'dsa-q1',
      question: 'Trace Quick Sort algorithm on [64, 34, 25, 12, 22, 11, 90] showing pivot selection, partitions at each level, and analyze time complexity. [10 Marks]',
      marks: 10,
      frequency: 'Repeated',
      appearedInYears: ['2024 Model Paper', '2023 End-Sem', '2022 Mid-Sem'],
      modelPaperRef: 'Model Paper Q1',
      keyPointsToHit: ['Pivot selection', 'Partition array state at each step', 'Recursion tree', 'Best/Worst/Avg complexity']
    },
    {
      id: 'dsa-q2',
      question: 'Insert the given sequence into an AVL tree showing all rotations and balance factors. [10 Marks]',
      marks: 10,
      frequency: 'High',
      appearedInYears: ['2024 Model Paper', '2023 End-Sem'],
      modelPaperRef: 'Model Paper Q2',
      keyPointsToHit: ['BF after each insertion', 'LL/RR/LR/RL rotation identification', 'Draw tree before & after rotation']
    },
    {
      id: 'dsa-q3',
      question: 'Apply Dijkstra\'s shortest path algorithm showing relaxation of each edge step-by-step. [5 Marks]',
      marks: 5,
      frequency: 'High',
      appearedInYears: ['2024 Model Paper', '2022 End-Sem'],
      modelPaperRef: 'Model Paper Q3',
      keyPointsToHit: ['Initialize dist table', 'Min-priority queue', 'Relaxation at each step', 'Final distances']
    },
    {
      id: 'dsa-q4',
      question: 'What is the time complexity of Merge Sort and why is it preferred over Quick Sort in the worst case? [2 Marks]',
      marks: 2,
      frequency: 'High',
      appearedInYears: ['2024 Model Paper Q1(a)'],
      modelPaperRef: 'Model Paper Q1(a)',
      keyPointsToHit: ['Merge Sort O(n log n) always', 'Quick Sort O(n²) worst', 'Merge Sort guaranteed performance']
    }
  ],
  comparisons: [
    {
      id: 'dsa-comp-1',
      title: 'Quick Sort vs Merge Sort',
      topicA: 'Quick Sort',
      topicB: 'Merge Sort',
      rows: [
        { parameter: 'Worst Case', featureA: 'O(n²) — sorted input with bad pivot', featureB: 'O(n log n) — always guaranteed' },
        { parameter: 'Average Case', featureA: 'O(n log n)', featureB: 'O(n log n)' },
        { parameter: 'Space', featureA: 'O(log n) in-place recursion', featureB: 'O(n) auxiliary array needed' },
        { parameter: 'Stability', featureA: 'NOT stable', featureB: 'STABLE (preserves equal element order)' },
        { parameter: 'Preferred For', featureA: 'In-memory arrays (cache friendly)', featureB: 'External sorting, linked lists' }
      ]
    },
    {
      id: 'dsa-comp-2',
      title: 'BFS vs DFS Graph Traversal',
      topicA: 'BFS (Breadth First Search)',
      topicB: 'DFS (Depth First Search)',
      rows: [
        { parameter: 'Data Structure', featureA: 'Queue (FIFO)', featureB: 'Stack (LIFO) or Recursion' },
        { parameter: 'Shortest Path', featureA: 'Yes — finds shortest path in unweighted graphs', featureB: 'No guarantee' },
        { parameter: 'Memory', featureA: 'O(V) — stores all frontier nodes', featureB: 'O(h) — h = max depth of recursion' },
        { parameter: 'Use Cases', featureA: 'Level-order traversal, shortest unweighted paths', featureB: 'Cycle detection, topological sort, connected components' }
      ]
    }
  ],
  flashcards: [
    {
      id: 'dsa-fc-1',
      category: 'Sorting',
      front: 'What is the time complexity of Quick Sort in best, average, and worst cases?',
      back: 'Best: O(n log n) — balanced partitions\nAverage: O(n log n)\nWorst: O(n²) — sorted/reverse-sorted array with naive pivot\nSpace: O(log n) for recursion stack'
    },
    {
      id: 'dsa-fc-2',
      category: 'AVL Trees',
      front: 'When does an LR rotation occur and how is it fixed?',
      back: 'LR imbalance: Root BF = +2 (left heavy) BUT left child BF = -1 (right heavy).\nFix: 1) Left Rotate on left child → converts to LL case. 2) Right Rotate on root.'
    },
    {
      id: 'dsa-fc-3',
      category: 'Graphs',
      front: 'Why can\'t Dijkstra\'s algorithm handle negative edge weights?',
      back: 'Dijkstra greedily assumes once a node is finalized its distance is minimum. A negative edge later could provide a shorter path, violating the greedy invariant. Use Bellman-Ford for graphs with negative edges (runs V-1 relaxation passes).'
    },
    {
      id: 'dsa-fc-4',
      category: 'Sorting',
      front: 'What makes Merge Sort stable and Quick Sort unstable?',
      back: 'Merge Sort: The merge step always picks left element first when values are equal, preserving relative order → STABLE.\nQuick Sort: The partition swap can move equal elements past each other → NOT STABLE.'
    }
  ],
  sourcesUsed: [
    { fileName: 'dsa_syllabus_unit3.pdf', page: 'p. 1-2', role: 'syllabus', relevance: 'Defines scope: Sorting, Trees, Graphs' },
    { fileName: 'dsa_model_papers_2024.pdf', page: 'p. 1-4', role: 'model_paper', relevance: 'High-frequency 10M questions on Quick Sort trace and AVL insertions' },
    { fileName: 'CLRS_DSA_LectureNotes.pdf', page: 'p. 1-18', role: 'other', relevance: 'Technical proofs, pseudocode, rotation cases, and complexity derivations' }
  ]
};

// ──────────────────────────────────────────────────────────────
// DBMS (Database Management Systems) Sample Pack
// ──────────────────────────────────────────────────────────────
export const DBMS_SAMPLE_FILES: SourceFile[] = [
  {
    id: 'dbms-syl',
    name: 'dbms_syllabus_unit2.pdf',
    role: 'syllabus',
    status: 'ready',
    size: 350000,
    pageCount: 2,
    extractedText: `UNIT 2: RELATIONAL MODEL, SQL & NORMALIZATION
1. Relational Model: Relations, Attributes, Tuples, Keys (Primary, Foreign, Candidate, Super). Relational Algebra: Select (σ), Project (π), Union (∪), Difference (−), Cartesian Product (×), Join (⋈).
2. SQL: DDL (CREATE, ALTER, DROP), DML (SELECT, INSERT, UPDATE, DELETE), DCL (GRANT, REVOKE), Aggregate Functions, GROUP BY, HAVING, Subqueries, Joins (INNER, LEFT, RIGHT, FULL).
3. Normalization: 1NF, 2NF, 3NF, BCNF. Functional Dependencies, Partial Dependency, Transitive Dependency.
4. Transaction Management: ACID Properties, Concurrency Control, Two-Phase Locking (2PL), Deadlock in DBMS.`,
    summary: 'DBMS Unit 2 covering relational algebra, SQL queries, normalization forms, and ACID transaction properties.',
    keyTopics: ['Relational Algebra', 'SQL Joins', 'BCNF', 'ACID', '2PL']
  },
  {
    id: 'dbms-paper',
    name: 'dbms_model_papers_2024.pdf',
    role: 'model_paper',
    status: 'ready',
    size: 590000,
    pageCount: 4,
    extractedText: `SEMESTER EXAMINATION - DATABASE MANAGEMENT SYSTEMS
10 Marks: Normalize the following relation schema to BCNF. Schema: R(A,B,C,D,E) with FDs: A→BC, CD→E, B→D, E→A. Show decomposition at each normal form step.
10 Marks: Write SQL queries for a University database: (i) Find students who scored above 80 in all subjects (ii) List departments with more than 5 faculty members (iii) Show 3rd highest salary using subquery.
5 Marks: Explain Two-Phase Locking (2PL) protocol. How does Strict 2PL prevent cascading rollbacks?
5 Marks: Convert the given ER diagram into a relational schema with proper primary and foreign keys.
2 Marks: Differentiate between HAVING and WHERE clause in SQL with examples.
2 Marks: State all four ACID properties of a database transaction.`,
    summary: 'University DBMS exam paper with BCNF normalization, SQL subqueries, and 2PL concurrency control questions.',
    keyTopics: ['BCNF decomposition', 'SQL subqueries', 'Two-Phase Locking', 'ER-to-relational']
  },
  {
    id: 'dbms-notes',
    name: 'DBMS_Ramakrishnan_Notes.pdf',
    role: 'other',
    status: 'ready',
    size: 1250000,
    pageCount: 16,
    extractedText: `TEXTBOOK NOTES - Ramakrishnan & Gehrke "Database Management Systems"
Normalization Decision Tree:
- 1NF: All attributes must be atomic (no repeating groups or multi-valued attributes).
- 2NF: Must be in 1NF AND no partial dependency (non-prime attribute dependent on part of composite key).
- 3NF: Must be in 2NF AND no transitive dependency (non-prime → non-prime attribute chain).
- BCNF: For every non-trivial FD X→Y, X must be a superkey.

ACID: Atomicity (all-or-nothing), Consistency (DB valid before and after), Isolation (concurrent txns don't interfere), Durability (committed changes persist).

SQL Joins: INNER JOIN returns matching rows only. LEFT JOIN returns all left rows + matching right rows. RIGHT JOIN vice versa. FULL OUTER JOIN returns all rows.`,
    summary: 'Authoritative textbook excerpts with normalization decision rules, ACID definitions, and SQL join semantics.',
    keyTopics: ['1NF/2NF/3NF/BCNF rules', 'ACID definitions', 'SQL JOIN types', 'Functional dependency']
  }
];

export const DBMS_EXAM_NOTES: ExamNotesResult = {
  id: 'notes-dbms-u2',
  title: 'DBMS – Unit 2: SQL, Normalization & Transaction Management',
  subject: 'Database Management Systems (CS-404)',
  unit: 'Unit 2',
  depth: 'standard',
  generatedAt: new Date().toISOString(),
  executiveSummary: 'Comprehensive DBMS exam guide covering Normalization (1NF→BCNF) with decomposition steps, SQL joins and subqueries with examples, ACID transaction properties, and Two-Phase Locking for concurrency control. Structured for 2M, 5M, and 10M answers.',
  sections: [
    {
      id: 'dbms-sec-1',
      heading: '1. Normalization – 1NF to BCNF',
      targetMarks: '10-Mark',
      keyDefinition: 'Normalization is the process of organizing a relational database schema to reduce data redundancy and improve data integrity by decomposing tables based on functional dependencies into progressively higher normal forms.',
      bulletPoints: [
        '1NF: Eliminate repeating groups. All attributes must be atomic (single-valued). Every row must be unique.',
        '2NF: Must be in 1NF. Remove Partial Dependencies — every non-key attribute must be fully functionally dependent on the ENTIRE primary key (only applicable when PK is composite).',
        '3NF: Must be in 2NF. Remove Transitive Dependencies — no non-key attribute should depend on another non-key attribute.',
        'BCNF (Boyce-Codd NF): Stronger than 3NF. For every non-trivial FD X→Y, X must be a superkey. BCNF eliminates ALL anomalies.',
        'Trade-off: Higher normal forms reduce redundancy but may require more joins, impacting query performance.'
      ],
      mnemonic: '"1-No Repeating, 2-No Partial, 3-No Transitive, B-Superkey Always" — 1-2-3-B!',
      diagram: {
        type: 'mermaid',
        code: `graph TD
    A["Relation R(A,B,C,D,E)"] --> B{"1NF?\n(Atomic Values?)"}
    B -->|"Yes"| C{"2NF?\n(No Partial Deps?)"}
    B -->|"No"| B1["Decompose: Remove\nmulti-valued attributes"]
    C -->|"Yes"| D{"3NF?\n(No Transitive Deps?)"}
    C -->|"No"| C1["Decompose: Split out\npartially-dependent attrs"]
    D -->|"Yes"| E{"BCNF?\n(Every FD LHS = Superkey?)"}
    D -->|"No"| D1["Decompose: Remove\ntransitive dependency"]
    E -->|"Yes"| F(["✅ BCNF Achieved"])
    E -->|"No"| E1["Decompose: FDs where\nLHS is not superkey"]`,
        caption: 'Figure 1: Normalization Decision Tree — Step-by-step from 1NF to BCNF'
      },
      examAnswerStructure: {
        question: 'Normalize R(A,B,C,D,E) with FDs: A→BC, CD→E, B→D, E→A to BCNF. Show each step. [10 Marks]',
        stepByStepAnswer: [
          'Step 1: Find Candidate Keys. Closure of A: A⁺ = {A,B,C,D,E}. So A is a CK. Closure of CD: CD⁺ = {C,D,E,A,B} = all → CD is a CK. CKs = {A, CD, E}.',
          'Step 2: Check 2NF. FD B→D: B is part of CK CD but B is not a superkey → Partial dependency. Decompose: R1(B,D) with FD B→D, R2(A,B,C,E) with FDs A→BC, E→A, CD→E.',
          'Step 3: Check 3NF on R2. All FDs have superkey on LHS. R2 is in 3NF.',
          'Step 4: Check BCNF. In original R, E→A but E is not a superkey in context of R → BCNF violation. Decompose: R3(E,A) and R4(B,C,D,E).',
          'Step 5: Verify no further violations. Final relations: R1(B,D), R3(E,A), R4(B,C,D,E) — all in BCNF.'
        ],
        scoringTips: [
          'Always compute attribute closure (A⁺) to find candidate keys before any normalization step.',
          'State which Normal Form is violated and which FD causes it before decomposing.',
          'Draw the FD diagram — it is worth 2-3 marks in a 10M question.'
        ]
      },
      sourceCitations: [
        { fileId: 'dbms-syl', fileName: 'dbms_syllabus_unit2.pdf', pageNumber: 1, snippet: 'Normalization: 1NF, 2NF, 3NF, BCNF. Functional Dependencies', role: 'syllabus' },
        { fileId: 'dbms-paper', fileName: 'dbms_model_papers_2024.pdf', pageNumber: 1, snippet: '10 Marks: Normalize to BCNF. Schema: R(A,B,C,D,E)', role: 'model_paper' }
      ]
    },
    {
      id: 'dbms-sec-2',
      heading: '2. SQL Joins & Advanced Queries',
      targetMarks: '10-Mark',
      keyDefinition: 'SQL (Structured Query Language) is a declarative language for managing relational databases. Joins combine rows from multiple tables based on a related column (typically a foreign key relationship).',
      bulletPoints: [
        'INNER JOIN: Returns only rows where join condition matches in BOTH tables.',
        'LEFT OUTER JOIN: Returns ALL rows from left table + matching rows from right table (NULLs for non-matches).',
        'RIGHT OUTER JOIN: Returns ALL rows from right table + matching rows from left table.',
        'FULL OUTER JOIN: Returns ALL rows from BOTH tables (NULLs where no match).',
        'Subquery: A query nested inside another query. Correlated subquery re-executes for each outer row (slower but powerful).',
        'GROUP BY + HAVING: GROUP BY aggregates rows with same value; HAVING filters groups (like WHERE but for aggregated results).'
      ],
      mnemonic: 'SQL Joins: "In the INNER circle, Left Leads, Right Rules, Full equals both"',
      formulaOrSyntax: `-- Find students scoring above 80 in ALL subjects
SELECT StudentID, Name FROM Students S
WHERE NOT EXISTS (
  SELECT * FROM Grades G
  WHERE G.StudentID = S.StudentID AND G.Score <= 80
);

-- Departments with more than 5 faculty
SELECT DeptID, DeptName, COUNT(FacultyID) AS FacultyCount
FROM Faculty
GROUP BY DeptID, DeptName
HAVING COUNT(FacultyID) > 5;

-- 3rd Highest Salary (using subquery)
SELECT MIN(Salary) FROM Employee
WHERE Salary IN (
  SELECT DISTINCT TOP 3 Salary FROM Employee ORDER BY Salary DESC
);`,
      examAnswerStructure: {
        question: 'Write SQL queries to: (i) Find students scoring >80 in ALL subjects (ii) Departments with >5 faculty (iii) 3rd highest salary. [10 Marks]',
        stepByStepAnswer: [
          'Step 1: Query (i) — Use NOT EXISTS correlated subquery: Select student where no grade <= 80 exists for them.',
          'Step 2: Query (ii) — Use GROUP BY DeptID with HAVING COUNT(FacultyID) > 5.',
          'Step 3: Query (iii) — Use nested SELECT with TOP/LIMIT: select MIN from top-3 distinct salaries.',
          'Step 4: Explain WHERE vs HAVING: WHERE filters rows before grouping; HAVING filters groups after GROUP BY aggregation.'
        ],
        scoringTips: [
          'Always specify table aliases (e.g., S for Students, G for Grades) in multi-table queries.',
          'Use NOT EXISTS for "for all" queries — using NOT IN can give wrong results with NULLs.'
        ]
      },
      sourceCitations: [
        { fileId: 'dbms-paper', fileName: 'dbms_model_papers_2024.pdf', pageNumber: 2, snippet: '10M: Write SQL queries for University database', role: 'model_paper' },
        { fileId: 'dbms-notes', fileName: 'DBMS_Ramakrishnan_Notes.pdf', pageNumber: 8, snippet: 'SQL Joins: INNER, LEFT, RIGHT, FULL OUTER JOIN semantics', role: 'other' }
      ]
    },
    {
      id: 'dbms-sec-3',
      heading: '3. ACID Properties & Two-Phase Locking',
      targetMarks: '5-Mark',
      keyDefinition: 'ACID is a set of four properties (Atomicity, Consistency, Isolation, Durability) that guarantee database transactions are processed reliably even in the presence of errors, power failures, or concurrent access.',
      bulletPoints: [
        'Atomicity: Transaction is treated as a single unit — either ALL operations succeed (COMMIT) or ALL are undone (ROLLBACK). No partial execution.',
        'Consistency: Transaction brings database from one valid state to another. All integrity constraints must hold before and after.',
        'Isolation: Concurrent transactions execute as if sequentially. Intermediate states are not visible to other transactions.',
        'Durability: Once committed, changes are permanently stored — even system crash cannot undo them (WAL / redo logs).',
        'Two-Phase Locking (2PL): Growing Phase — only acquire locks (no releasing). Shrinking Phase — only release locks (no acquiring). Guarantees serializability.',
        'Strict 2PL: Hold ALL exclusive locks until COMMIT. Prevents cascading rollbacks (dirty reads).'
      ],
      mnemonic: 'ACID = "All Commitments are Isolated and Durable" — "A-C-I-D cleans the DB!"',
      examAnswerStructure: {
        question: 'Explain Two-Phase Locking. How does Strict 2PL prevent cascading rollbacks? [5 Marks]',
        stepByStepAnswer: [
          'Step 1: Define 2PL: Two phases — Growing Phase (only acquire locks), Shrinking Phase (only release locks).',
          'Step 2: Draw the lock count over time graph: lock count rises in growing phase, falls in shrinking phase.',
          'Step 3: Strict 2PL extension: All exclusive (write) locks held until transaction COMMIT/ABORT.',
          'Step 4: Why it prevents cascading rollback: If T1 holds write lock until commit, T2 cannot read T1\'s dirty data → no cascading rollback chain.',
          'Step 5: Limitation: Deadlock is still possible (T1 waits for T2\'s lock, T2 waits for T1\'s lock).'
        ],
        scoringTips: [
          'Draw the 2PL timeline diagram showing growing and shrinking phases.',
          'Differentiate Basic 2PL vs Strict 2PL vs Rigorous 2PL for top marks.'
        ]
      },
      sourceCitations: [
        { fileId: 'dbms-paper', fileName: 'dbms_model_papers_2024.pdf', pageNumber: 3, snippet: '5 Marks: Explain Two-Phase Locking (2PL) protocol', role: 'model_paper' },
        { fileId: 'dbms-notes', fileName: 'DBMS_Ramakrishnan_Notes.pdf', pageNumber: 14, snippet: 'ACID: Atomicity, Consistency, Isolation, Durability', role: 'other' }
      ]
    }
  ],
  importantQuestions: [
    {
      id: 'dbms-q1',
      question: 'Normalize the relation schema to BCNF showing decomposition at each normal form step. [10 Marks]',
      marks: 10,
      frequency: 'Repeated',
      appearedInYears: ['2024 Model Paper', '2023 End-Sem', '2022 End-Sem'],
      modelPaperRef: 'Model Paper Q1',
      keyPointsToHit: ['Attribute closure for candidate keys', '2NF partial dep removal', '3NF transitive dep removal', 'BCNF superkey check']
    },
    {
      id: 'dbms-q2',
      question: 'Write SQL queries using joins, GROUP BY/HAVING, and subqueries for a university database. [10 Marks]',
      marks: 10,
      frequency: 'High',
      appearedInYears: ['2024 Model Paper', '2023 Mid-Sem'],
      modelPaperRef: 'Model Paper Q2',
      keyPointsToHit: ['NOT EXISTS for "for all"', 'GROUP BY + HAVING syntax', 'Subquery for Nth highest', 'Table aliases']
    },
    {
      id: 'dbms-q3',
      question: 'State all four ACID properties with examples. [2 Marks]',
      marks: 2,
      frequency: 'High',
      appearedInYears: ['2024 Model Paper Q1(d)', '2023 End-Sem'],
      modelPaperRef: 'Model Paper Q1(d)',
      keyPointsToHit: ['Atomicity — all or nothing', 'Consistency — integrity constraints', 'Isolation — serializability', 'Durability — redo logs']
    }
  ],
  comparisons: [
    {
      id: 'dbms-comp-1',
      title: '3NF vs BCNF Normalization',
      topicA: '3NF (Third Normal Form)',
      topicB: 'BCNF (Boyce-Codd Normal Form)',
      rows: [
        { parameter: 'Definition', featureA: 'For every FD X→Y: X is superkey OR Y is prime attribute', featureB: 'For every non-trivial FD X→Y: X MUST be a superkey (no exceptions)' },
        { parameter: 'Dependency Preservation', featureA: 'Always preserves all FDs during decomposition', featureB: 'May NOT preserve all FDs' },
        { parameter: 'Lossless Join', featureA: 'Guaranteed', featureB: 'Guaranteed' },
        { parameter: 'Redundancy', featureA: 'Some redundancy may remain', featureB: 'Minimal redundancy — strongest form' },
        { parameter: 'Practical Use', featureA: 'Preferred when FD preservation is important', featureB: 'Preferred when eliminating all redundancy is critical' }
      ]
    },
    {
      id: 'dbms-comp-2',
      title: 'WHERE vs HAVING in SQL',
      topicA: 'WHERE Clause',
      topicB: 'HAVING Clause',
      rows: [
        { parameter: 'Purpose', featureA: 'Filters individual rows before grouping', featureB: 'Filters groups after GROUP BY aggregation' },
        { parameter: 'Works With', featureA: 'Any column or expression', featureB: 'Only aggregate functions or grouped columns' },
        { parameter: 'Execution Order', featureA: 'Applied BEFORE GROUP BY (row-level)', featureB: 'Applied AFTER GROUP BY (group-level)' },
        { parameter: 'Example', featureA: 'WHERE Salary > 50000', featureB: 'HAVING COUNT(*) > 5' }
      ]
    }
  ],
  flashcards: [
    {
      id: 'dbms-fc-1',
      category: 'ACID',
      front: 'What does ACID stand for and why is each property important?',
      back: 'A = Atomicity: all-or-nothing execution\nC = Consistency: DB integrity maintained\nI = Isolation: concurrent txns don\'t interfere\nD = Durability: committed data survives crashes (WAL logs)'
    },
    {
      id: 'dbms-fc-2',
      category: 'Normalization',
      front: 'What is the difference between 2NF and 3NF?',
      back: '2NF removes PARTIAL DEPENDENCIES: non-key attr must depend on the FULL primary key.\n3NF removes TRANSITIVE DEPENDENCIES: non-key attr must NOT depend on another non-key attr.'
    },
    {
      id: 'dbms-fc-3',
      category: 'SQL',
      front: 'How do you find the Nth highest salary without using LIMIT/TOP?',
      back: 'SELECT MIN(Salary) FROM Employee\nWHERE Salary IN (\n  SELECT DISTINCT TOP N Salary\n  FROM Employee ORDER BY Salary DESC\n);\nAlternatively: Use nested correlated subquery counting DISTINCT higher salaries = N-1.'
    },
    {
      id: 'dbms-fc-4',
      category: 'Concurrency',
      front: 'What is Two-Phase Locking and what does "Strict 2PL" add?',
      back: '2PL: Phase 1 (Growing) — only ACQUIRE locks. Phase 2 (Shrinking) — only RELEASE locks.\nStrict 2PL: Hold ALL exclusive (write) locks until COMMIT or ABORT — prevents dirty reads and cascading rollbacks.'
    }
  ],
  sourcesUsed: [
    { fileName: 'dbms_syllabus_unit2.pdf', page: 'p. 1-2', role: 'syllabus', relevance: 'Defines scope: Relational model, SQL, Normalization, Transactions' },
    { fileName: 'dbms_model_papers_2024.pdf', page: 'p. 1-4', role: 'model_paper', relevance: '10M questions on BCNF normalization and SQL advanced queries' },
    { fileName: 'DBMS_Ramakrishnan_Notes.pdf', page: 'p. 1-16', role: 'other', relevance: 'Textbook proofs for normalization rules and ACID definitions' }
  ]
};
