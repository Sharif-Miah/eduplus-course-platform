const mongoose = require('mongoose');

const uri = 'mongodb://eduConnect:cK8gqGtchZRZnxu5@ac-ox6tc09-shard-00-00.tfghsyb.mongodb.net:27017,ac-ox6tc09-shard-00-01.tfghsyb.mongodb.net:27017,ac-ox6tc09-shard-00-02.tfghsyb.mongodb.net:27017/eduConnect?ssl=true&replicaSet=atlas-4ph35v-shard-0&authSource=admin&retryWrites=true&w=majority';

// Schema definitions
const lessonSchema = new mongoose.Schema({
  title: { required: true, type: String },
  description: { type: String },
  duration: { required: true, default: 0, type: Number },
  video_url: { type: String },
  active: { required: true, default: true, type: Boolean },
  slug: { required: true, type: String },
  access: { required: true, default: "private", type: String },
  order: { required: true, type: Number },
});

const moduleSchema = new mongoose.Schema({
  title: { required: true, type: String },
  description: { type: String },
  active: { required: true, default: true, type: Boolean },
  slug: { required: true, type: String },
  course: { required: true, type: mongoose.Schema.ObjectId, ref: "Course" },
  lessonIds: [{ type: mongoose.Schema.ObjectId, ref: "Lesson" }],
  order: { required: true, type: Number },
});

const quizSchema = new mongoose.Schema({
  title: { required: true, type: String },
  description: { type: String },
  explanations: { type: String },
  slug: { type: String },
  options: { type: Array },
  mark: { required: true, default: 5, type: Number },
});

const quizsetSchema = new mongoose.Schema({
  title: { required: true, type: String },
  description: { type: String },
  slug: { type: String },
  quizIds: [{ type: mongoose.Schema.ObjectId, ref: "Quiz" }],
  active: { required: true, default: true, type: Boolean },
});

const courseSchema = new mongoose.Schema({
  title: String,
  subtitle: String,
  description: String,
  thumbnail: String,
  modules: [{ type: mongoose.Schema.ObjectId, ref: "Module" }],
  price: Number,
  active: Boolean,
  category: mongoose.Schema.ObjectId,
  instructor: mongoose.Schema.ObjectId,
  quizSet: { type: mongoose.Schema.ObjectId, ref: "Quizset" },
  testimonials: [mongoose.Schema.ObjectId],
  learning: [String],
  createdOn: Date,
  modifiedOn: Date,
});

const enrollmentSchema = new mongoose.Schema({
  enrollment_date: { type: Date, default: Date.now },
  status: { type: String, default: "not-started" },
  method: { type: String, default: "stripe" },
  course: { type: mongoose.Schema.ObjectId, ref: "Course" },
  student: { type: mongoose.Schema.ObjectId, ref: "User" },
});

const Lesson = mongoose.models.Lesson || mongoose.model('Lesson', lessonSchema);
const Module = mongoose.models.Module || mongoose.model('Module', moduleSchema);
const Quiz = mongoose.models.Quiz || mongoose.model('Quiz', quizSchema);
const Quizset = mongoose.models.Quizset || mongoose.model('Quizset', quizsetSchema);
const Course = mongoose.models.Course || mongoose.model('Course', courseSchema);
const Enrollment = mongoose.models.Enrollment || mongoose.model('Enrollment', enrollmentSchema);

const coursesData = [
  {
    courseId: "6648184a6fe803e9128d7fba",
    slugPrefix: "python",
    title: "Learn Python",
    modules: [
      {
        title: "Module 1: Python Fundamentals & Environment Setup",
        description: "Set up Python 3 and VS Code, master variable types, and write your first Python scripts.",
        order: 1,
        lessons: [
          {
            title: "Lesson 1: Welcome to Python & Development Environment Setup",
            description: "<h3>Welcome to Python</h3><p>In this lesson, you will install Python 3.12, configure Visual Studio Code, and run your very first <code>hello_world.py</code> script.</p>",
            video_url: "https://www.youtube.com/watch?v=kqtD5dpn9C8",
            duration: 900,
            access: "public",
            order: 1,
          },
          {
            title: "Lesson 2: Variables, Data Types & Type Conversion",
            description: "<h3>Python Data Types</h3><p>Explore integers, floats, strings, booleans, and how dynamic typing works in Python with practical examples.</p>",
            video_url: "https://www.youtube.com/watch?v=_uQrJ0TkZlc",
            duration: 1200,
            access: "private",
            order: 2,
          },
          {
            title: "Lesson 3: Conditional Logic, Operators & Loops",
            description: "<h3>Control Flow in Python</h3><p>Master if/elif/else statements, logical operators (and, or, not), while loops, and for loops with range().</p>",
            video_url: "https://www.youtube.com/watch?v=rfscVS0vtbw",
            duration: 1400,
            access: "private",
            order: 3,
          },
        ]
      },
      {
        title: "Module 2: Data Structures & Modular Functions",
        description: "Deep-dive into Python built-in collections: Lists, Tuples, Dictionaries, Sets, and clean function design.",
        order: 2,
        lessons: [
          {
            title: "Lesson 4: Python Lists, Tuples & List Comprehensions",
            description: "<h3>Python Lists & Tuples</h3><p>Learn indexing, slicing, appending, mutating lists, immutability of tuples, and expressive list comprehensions.</p>",
            video_url: "https://www.youtube.com/watch?v=4F2m91eKmts",
            duration: 1500,
            access: "private",
            order: 1,
          },
          {
            title: "Lesson 5: Dictionaries, Sets & Hash Tables",
            description: "<h3>Key-Value Pairs & Sets</h3><p>Store key-value data with Python dictionaries, handle dictionary methods, and utilize unique mathematical sets.</p>",
            video_url: "https://www.youtube.com/watch?v=daefaLgNkw0",
            duration: 1300,
            access: "private",
            order: 2,
          },
          {
            title: "Lesson 6: Functions, *args, **kwargs & Scope",
            description: "<h3>Writing Reusable Functions</h3><p>Understand function definitions, default parameters, variable-length arguments (*args, **kwargs), and LEGB scope.</p>",
            video_url: "https://www.youtube.com/watch?v=7lmCu8wz8ro",
            duration: 1600,
            access: "private",
            order: 3,
          },
        ]
      },
      {
        title: "Module 3: Object-Oriented Python & Capstone Project",
        description: "Master Classes, Objects, Inheritance, File I/O, and build a production-ready CLI application.",
        order: 3,
        lessons: [
          {
            title: "Lesson 7: Classes, __init__, and Object-Oriented Principles",
            description: "<h3>Python OOP</h3><p>Learn how to model real-world concepts using Classes, the __init__ constructor, instance attributes, and class methods.</p>",
            video_url: "https://www.youtube.com/watch?v=HGOBQPFzWKo",
            duration: 1750,
            access: "private",
            order: 1,
          },
          {
            title: "Lesson 8: File Handling, Exceptions & Capstone Project",
            description: "<h3>File I/O & Capstone Project</h3><p>Read and write files, handle exceptions with try/except/finally, and build a complete CLI Expense Tracker project.</p>",
            video_url: "https://www.youtube.com/watch?v=b093aqAZiPU",
            duration: 1950,
            access: "private",
            order: 2,
          },
        ]
      },
    ],
    quizSet: {
      title: "Python Mastery Certification Quiz",
      description: "Evaluate your Python expertise covering syntax, data structures, list comprehensions, and OOP.",
      quizzes: [
        {
          title: "What is the output of type([1, 2, 3]) in Python?",
          description: "Identify the correct data type.",
          explanations: "In Python, square brackets denote a list object.",
          options: [
            { text: "<class 'list'>", is_correct: true },
            { text: "<class 'tuple'>", is_correct: false },
            { text: "<class 'array'>", is_correct: false },
            { text: "<class 'set'>", is_correct: false },
          ],
        },
        {
          title: "Which keyword is used to create a function in Python?",
          description: "Python function declaration keyword.",
          explanations: "The 'def' keyword is used to define functions in Python.",
          options: [
            { text: "function", is_correct: false },
            { text: "def", is_correct: true },
            { text: "func", is_correct: false },
            { text: "define", is_correct: false },
          ],
        },
        {
          title: "Which of the following data types is immutable in Python?",
          description: "Understanding mutability vs immutability.",
          explanations: "Tuples cannot be altered once instantiated, making them immutable.",
          options: [
            { text: "List", is_correct: false },
            { text: "Dictionary", is_correct: false },
            { text: "Tuple", is_correct: true },
            { text: "Set", is_correct: false },
          ],
        },
        {
          title: "What is the correct way to handle exceptions in Python?",
          description: "Exception handling syntax in Python.",
          explanations: "Python uses try/except blocks to catch and handle exceptions.",
          options: [
            { text: "try / catch", is_correct: false },
            { text: "try / except", is_correct: true },
            { text: "do / catch", is_correct: false },
            { text: "attempt / handle", is_correct: false },
          ],
        },
        {
          title: "What is the special constructor method in Python classes?",
          description: "Object-oriented programming in Python.",
          explanations: "The __init__ method acts as the constructor in Python classes.",
          options: [
            { text: "constructor()", is_correct: false },
            { text: "__init__()", is_correct: true },
            { text: "__create__()", is_correct: false },
            { text: "setup()", is_correct: false },
          ],
        },
      ]
    }
  },

  {
    courseId: "664aca881387e2ad2e8be484",
    slugPrefix: "js",
    title: "Mastering JavaScript",
    modules: [
      {
        title: "Module 1: Modern JavaScript Foundations & ES6+",
        description: "Variables (let, const), Arrow Functions, Template Literals, Destructuring, and Spread/Rest operators.",
        order: 1,
        lessons: [
          {
            title: "Lesson 1: JavaScript Engine, Scope & Variables (let vs const)",
            description: "<h3>JavaScript Under the Hood</h3><p>Understand execution context, call stack, block scope vs function scope, and modern variable declarations.</p>",
            video_url: "https://www.youtube.com/watch?v=W6NZfCO5SIk",
            duration: 1100,
            access: "public",
            order: 1,
          },
          {
            title: "Lesson 2: ES6+ Arrow Functions, Destructuring & Rest/Spread",
            description: "<h3>Modern ES6+ Syntax</h3><p>Write concise code with arrow functions, object and array destructuring, and the versatile spread operator.</p>",
            video_url: "https://www.youtube.com/watch?v=hdI2bqOjy3c",
            duration: 1400,
            access: "private",
            order: 2,
          },
          {
            title: "Lesson 3: Array Methods (map, filter, reduce & find)",
            description: "<h3>Functional Array Processing</h3><p>Transform arrays without side-effects using higher-order functions like map, filter, and reduce.</p>",
            video_url: "https://www.youtube.com/watch?v=01ys68hkE8E",
            duration: 1600,
            access: "private",
            order: 3,
          },
        ]
      },
      {
        title: "Module 2: Asynchronous JavaScript & API Integration",
        description: "Master Callbacks, Promises, async/await, and fetching REST APIs seamlessly.",
        order: 2,
        lessons: [
          {
            title: "Lesson 4: The Event Loop, Promises & Microtask Queue",
            description: "<h3>Demystifying the Event Loop</h3><p>Learn how JavaScript handles asynchronous operations with single-threaded concurrency and the microtask queue.</p>",
            video_url: "https://www.youtube.com/watch?v=Bv_5Zv5c-Ts",
            duration: 1550,
            access: "private",
            order: 1,
          },
          {
            title: "Lesson 5: Async/Await & Fetching Data from REST APIs",
            description: "<h3>Async/Await & Network Requests</h3><p>Use modern async/await syntax with fetch() to consume JSON APIs and handle network errors cleanly.</p>",
            video_url: "https://www.youtube.com/watch?v=PoRJizFvM7s",
            duration: 1700,
            access: "private",
            order: 2,
          },
        ]
      },
      {
        title: "Module 3: Dynamic DOM Manipulation & Interactive App",
        description: "DOM selection, Event Listeners, State Management in Vanilla JS, and building an interactive dashboard.",
        order: 3,
        lessons: [
          {
            title: "Lesson 6: Modern DOM Selection & Event Delegation",
            description: "<h3>DOM Manipulation & Events</h3><p>Interact with the HTML document tree, attach event listeners, and use event delegation for performance.</p>",
            video_url: "https://www.youtube.com/watch?v=y17RuWkWdn8",
            duration: 1450,
            access: "private",
            order: 1,
          },
          {
            title: "Lesson 7: Capstone Project - Building a Dynamic Task Manager",
            description: "<h3>Vanilla JS Capstone</h3><p>Put all ES6+, DOM manipulation, and LocalStorage concepts together in a complete real-world task manager.</p>",
            video_url: "https://www.youtube.com/watch?v=8zKuNo4ay8E",
            duration: 2100,
            access: "private",
            order: 2,
          },
        ]
      },
    ],
    quizSet: {
      title: "JavaScript Professional Certification Quiz",
      description: "Comprehensive assessment evaluating modern ES6+, Asynchronous programming, and the DOM.",
      quizzes: [
        {
          title: "Which operator is used for strict equality comparison without type coercion in JavaScript?",
          description: "JavaScript equality comparison.",
          explanations: "The '===' operator checks both value and type without automatic type coercion.",
          options: [
            { text: "==", is_correct: false },
            { text: "===", is_correct: true },
            { text: "=", is_correct: false },
            { text: "equals()", is_correct: false },
          ],
        },
        {
          title: "What does the Promise.all() method return if one of the promises rejects?",
          description: "Understanding Promise combinators.",
          explanations: "Promise.all rejects immediately with the error of the first promise that rejects.",
          options: [
            { text: "An array of rejected errors", is_correct: false },
            { text: "A promise that rejects with that single error", is_correct: true },
            { text: "Null", is_correct: false },
            { text: "It resolves with undefined", is_correct: false },
          ],
        },
        {
          title: "Which array method creates a new array populated with the results of calling a provided function?",
          description: "Array transformation methods.",
          explanations: "Array.prototype.map creates a new array with the results of the callback function.",
          options: [
            { text: "forEach()", is_correct: false },
            { text: "map()", is_correct: true },
            { text: "filter()", is_correct: false },
            { text: "reduce()", is_correct: false },
          ],
        },
        {
          title: "What will 'typeof null' return in JavaScript?",
          description: "JavaScript quirks and types.",
          explanations: "Due to a historical bug in JavaScript from its first version, typeof null returns 'object'.",
          options: [
            { text: "'null'", is_correct: false },
            { text: "'object'", is_correct: true },
            { text: "'undefined'", is_correct: false },
            { text: "'boolean'", is_correct: false },
          ],
        },
        {
          title: "What happens during Variable Hoisting with variables declared using 'let' and 'const'?",
          description: "Hoisting and Temporal Dead Zone.",
          explanations: "They are hoisted but reside in the Temporal Dead Zone (TDZ) until evaluated.",
          options: [
            { text: "They are hoisted and initialized with undefined", is_correct: false },
            { text: "They are hoisted but cannot be accessed (Temporal Dead Zone)", is_correct: true },
            { text: "They are not hoisted at all", is_correct: false },
            { text: "They produce a compile error", is_correct: false },
          ],
        },
      ]
    }
  },

  {
    courseId: "6a69eb667737576ff572ce52",
    slugPrefix: "react",
    title: "Mastering ReactJS",
    modules: [
      {
        title: "Module 1: React 18 Core Architecture & JSX",
        description: "Components, Props, JSX, conditional rendering, and dynamic list mapping.",
        order: 1,
        lessons: [
          {
            title: "Lesson 1: Introduction to React & Virtual DOM",
            description: "<h3>React Fundamentals</h3><p>Understand how React diffing algorithm and Virtual DOM deliver blazing fast user interface updates.</p>",
            video_url: "https://www.youtube.com/watch?v=SqcY0GlETPk",
            duration: 1200,
            access: "public",
            order: 1,
          },
          {
            title: "Lesson 2: Components, Props & State with useState",
            description: "<h3>Component State</h3><p>Break UI into reusable components, pass data via props, and trigger re-renders using useState.</p>",
            video_url: "https://www.youtube.com/watch?v=bMknfKXIFA8",
            duration: 1500,
            access: "private",
            order: 2,
          },
        ]
      },
      {
        title: "Module 2: Hooks Deep Dive & Global State",
        description: "useEffect, useRef, useMemo, useCallback, and Context API for enterprise-level state management.",
        order: 2,
        lessons: [
          {
            title: "Lesson 3: Side Effects & Lifecycle with useEffect",
            description: "<h3>Mastering useEffect</h3><p>Learn how to synchronize components with external systems, manage dependencies, and clean up subscriptions.</p>",
            video_url: "https://www.youtube.com/watch?v=0ZJgIjIuY7U",
            duration: 1650,
            access: "private",
            order: 1,
          },
          {
            title: "Lesson 4: Global State Management with Context API & useReducer",
            description: "<h3>Context API & Reducer</h3><p>Avoid prop drilling across deep component trees using React Context combined with useReducer.</p>",
            video_url: "https://www.youtube.com/watch?v=O6P86uwfdR0",
            duration: 1750,
            access: "private",
            order: 2,
          },
        ]
      },
      {
        title: "Module 3: Routing, Performance & Full Stack Project",
        description: "React Router v6, custom hooks, performance profiling, and building a production React app.",
        order: 3,
        lessons: [
          {
            title: "Lesson 5: Declarative Client Routing with React Router v6",
            description: "<h3>React Router v6</h3><p>Set up nested routes, dynamic URL parameters, protected routes, and navigation loaders.</p>",
            video_url: "https://www.youtube.com/watch?v=lawJrsrAtGU",
            duration: 1600,
            access: "private",
            order: 1,
          },
          {
            title: "Lesson 6: React Performance Optimization (useMemo, useCallback & memo)",
            description: "<h3>Optimization in React</h3><p>Eliminate unnecessary re-renders, cache computational results, and optimize React app performance.</p>",
            video_url: "https://www.youtube.com/watch?v=TNhaISOUy6Q",
            duration: 1800,
            access: "private",
            order: 2,
          },
        ]
      },
    ],
    quizSet: {
      title: "ReactJS Developer Certification Quiz",
      description: "Test your expertise in React 18, Hooks, component lifecycle, and state optimization.",
      quizzes: [
        {
          title: "What is the primary purpose of keys in React lists?",
          description: "React list reconciliation.",
          explanations: "Keys give elements a stable identity across renders so React can identify which items changed, added, or removed.",
          options: [
            { text: "To give unique CSS styles to items", is_correct: false },
            { text: "To help React identify which items have changed, added, or removed", is_correct: true },
            { text: "To automatically sort list items alphabetically", is_correct: false },
            { text: "To bind event listeners to each item", is_correct: false },
          ],
        },
        {
          title: "When does the cleanup function in useEffect execute?",
          description: "Understanding useEffect lifecycle.",
          explanations: "The cleanup function runs before the component unmounts and before re-running the effect on subsequent renders.",
          options: [
            { text: "Only once when the application launches", is_correct: false },
            { text: "Before the component unmounts and before re-running the effect", is_correct: true },
            { text: "Only after an error occurs in the component", is_correct: false },
            { text: "Never, cleanup is handled automatically by the browser", is_correct: false },
          ],
        },
        {
          title: "Which hook should you use to cache the result of an expensive calculation?",
          description: "React memoization hooks.",
          explanations: "useMemo caches the calculation result between re-renders until dependencies change.",
          options: [
            { text: "useCallback", is_correct: false },
            { text: "useMemo", is_correct: true },
            { text: "useRef", is_correct: false },
            { text: "useEffect", is_correct: false },
          ],
        },
        {
          title: "Can you call React Hooks inside regular JavaScript functions or loops?",
          description: "Rules of Hooks.",
          explanations: "Hooks can only be called at the top level of React function components or custom hooks.",
          options: [
            { text: "Yes, anywhere in the code", is_correct: false },
            { text: "No, only at the top level of React functions or custom hooks", is_correct: true },
            { text: "Only inside while loops", is_correct: false },
            { text: "Yes, as long as it returns JSX", is_correct: false },
          ],
        },
        {
          title: "What does the useRef hook return?",
          description: "Understanding useRef.",
          explanations: "useRef returns a mutable ref object whose .current property is initialized to the passed argument.",
          options: [
            { text: "A state dispatch function", is_correct: false },
            { text: "A mutable object with a '.current' property that persists across renders", is_correct: true },
            { text: "A new DOM node clone", is_correct: false },
            { text: "An immutable state snapshot", is_correct: false },
          ],
        },
      ]
    }
  },

  {
    courseId: "6a86f2e7ccdc05c4c4aa11e0",
    slugPrefix: "kotlin",
    title: "Learn Kotlin",
    modules: [
      {
        title: "Module 1: Kotlin Syntax, Types & Null Safety",
        description: "Variables (val vs var), Type inference, Nullable types, Safe Call (?.) and Elvis (?:) operators.",
        order: 1,
        lessons: [
          {
            title: "Lesson 1: Introduction to Kotlin & JetBrains Ecosystem",
            description: "<h3>Kotlin Basics</h3><p>Explore why Kotlin is the preferred language for modern Android and backend development with 100% Java interoperability.</p>",
            video_url: "https://www.youtube.com/watch?v=F9UC9DY-vIU",
            duration: 1300,
            access: "public",
            order: 1,
          },
          {
            title: "Lesson 2: Null Safety, Val vs Var & Control Flow",
            description: "<h3>Kotlin Null Safety</h3><p>Master the elimination of NullPointerException with safe calls (?.), Elvis operator (?:), and the when expression.</p>",
            video_url: "https://www.youtube.com/watch?v=EExSSotojVI",
            duration: 1550,
            access: "private",
            order: 2,
          },
        ]
      },
      {
        title: "Module 2: Object-Oriented & Functional Kotlin",
        description: "Classes, Data Classes, Sealed Classes, Lambdas, Higher-Order Functions, and Collections.",
        order: 2,
        lessons: [
          {
            title: "Lesson 3: Data Classes, Sealed Interfaces & Extension Functions",
            description: "<h3>Concise Kotlin OOP</h3><p>Generate equals, hashCode, and toString with one-liner data classes, and add new abilities via extension functions.</p>",
            video_url: "https://www.youtube.com/watch?v=2Tz8D3kIu3g",
            duration: 1600,
            access: "private",
            order: 1,
          },
          {
            title: "Lesson 4: Lambdas, Higher-Order Functions & Collection Operations",
            description: "<h3>Functional Kotlin</h3><p>Leverage Kotlin standard library functions (let, run, apply, also, with) and functional collection transformations.</p>",
            video_url: "https://www.youtube.com/watch?v=bbMsuI2p1DQ",
            duration: 1700,
            access: "private",
            order: 2,
          },
        ]
      },
      {
        title: "Module 3: Kotlin Coroutines & Asynchronous Programming",
        description: "Suspend functions, Coroutine Scopes, Dispatchers, and reactive StateFlow.",
        order: 3,
        lessons: [
          {
            title: "Lesson 5: Asynchronous Programming with Kotlin Coroutines",
            description: "<h3>Kotlin Coroutines</h3><p>Write non-blocking asynchronous code sequentially using lightweight coroutines, launch, and async/await.</p>",
            video_url: "https://www.youtube.com/watch?v=6P20npkvcb8",
            duration: 1900,
            access: "private",
            order: 1,
          },
          {
            title: "Lesson 6: Reactive Kotlin Flow & StateFlow in Action",
            description: "<h3>Flow & Reactive Streams</h3><p>Emit multiple asynchronously computed values with Kotlin Flow and handle state emission seamlessly.</p>",
            video_url: "https://www.youtube.com/watch?v=1ucoxB-s0Qk",
            duration: 1850,
            access: "private",
            order: 2,
          },
        ]
      },
    ],
    quizSet: {
      title: "Kotlin Mastery & Coroutines Quiz",
      description: "Assess your Kotlin competencies in null safety, object design, functional syntax, and coroutines.",
      quizzes: [
        {
          title: "How do you declare a read-only (immutable) variable in Kotlin?",
          description: "Kotlin variable declaration.",
          explanations: "In Kotlin, 'val' declares a read-only immutable variable, whereas 'var' is mutable.",
          options: [
            { text: "val", is_correct: true },
            { text: "var", is_correct: false },
            { text: "const", is_correct: false },
            { text: "let", is_correct: false },
          ],
        },
        {
          title: "Which operator is known as the Elvis operator in Kotlin?",
          description: "Kotlin null safety operators.",
          explanations: "The '?:' operator provides a default fallback value when the left expression evaluates to null.",
          options: [
            { text: "?:", is_correct: true },
            { text: "?.", is_correct: false },
            { text: "!!", is_correct: false },
            { text: "->", is_correct: false },
          ],
        },
        {
          title: "Which keyword is used to mark a function that can be paused and resumed without blocking a thread?",
          description: "Kotlin coroutine concepts.",
          explanations: "The 'suspend' keyword marks a function as a coroutine suspending function.",
          options: [
            { text: "async", is_correct: false },
            { text: "suspend", is_correct: true },
            { text: "defer", is_correct: false },
            { text: "yield", is_correct: false },
          ],
        },
        {
          title: "What does the 'data class' keyword automatically generate in Kotlin?",
          description: "Kotlin data classes.",
          explanations: "Data classes automatically provide equals(), hashCode(), toString(), copy(), and componentN() methods.",
          options: [
            { text: "equals(), hashCode(), toString(), copy() and componentN()", is_correct: true },
            { text: "Database SQL tables", is_correct: false },
            { text: "HTML templates", is_correct: false },
            { text: "Network HTTP endpoints", is_correct: false },
          ],
        },
        {
          title: "What is the default visibility modifier for classes and members in Kotlin?",
          description: "Kotlin visibility rules.",
          explanations: "In Kotlin, all declarations are public by default unless specified otherwise.",
          options: [
            { text: "public", is_correct: true },
            { text: "private", is_correct: false },
            { text: "protected", is_correct: false },
            { text: "internal", is_correct: false },
          ],
        },
      ]
    }
  },

  {
    courseId: "6a87f39d1f455757667682e4",
    slugPrefix: "java",
    title: "Learn Java",
    modules: [
      {
        title: "Module 1: Java Basics & Object-Oriented Foundations",
        description: "JDK setup, JVM architecture, Primitive types, Classes, Objects, and Methods.",
        order: 1,
        lessons: [
          {
            title: "Lesson 1: Java Architecture, JVM, JRE, JDK & Hello World",
            description: "<h3>Java Platform Architecture</h3><p>Understand 'write once, run anywhere' with JVM bytecode compilation and build your first Java application.</p>",
            video_url: "https://www.youtube.com/watch?v=eIrMbAQSU34",
            duration: 1250,
            access: "public",
            order: 1,
          },
          {
            title: "Lesson 2: OOP Pillars - Encapsulation, Inheritance & Polymorphism",
            description: "<h3>Object-Oriented Programming in Java</h3><p>Master object modeling, constructors, inheritance with extends, and method overriding.</p>",
            video_url: "https://www.youtube.com/watch?v=xk4_1vDrzzo",
            duration: 1550,
            access: "private",
            order: 2,
          },
        ]
      },
      {
        title: "Module 2: Java Collections Framework & Exception Handling",
        description: "ArrayList, LinkedList, HashMap, HashSet, Generics, and Robust Try-Catch blocks.",
        order: 2,
        lessons: [
          {
            title: "Lesson 3: Java Collections (List, Set, Map & Generics)",
            description: "<h3>Java Collections</h3><p>Store and manipulate dynamic collections using ArrayList, HashMap, and type-safe Java Generics.</p>",
            video_url: "https://www.youtube.com/watch?v=GoXwIVyNvX0",
            duration: 1700,
            access: "private",
            order: 1,
          },
          {
            title: "Lesson 4: Exception Handling & Custom Exceptions",
            description: "<h3>Defensive Java Programming</h3><p>Handle checked and unchecked exceptions with try-catch-finally, multi-catch, and throw custom exceptions.</p>",
            video_url: "https://www.youtube.com/watch?v=1XkM0Yw9QG4",
            duration: 1400,
            access: "private",
            order: 2,
          },
        ]
      },
      {
        title: "Module 3: Modern Java Streams, Lambdas & Multithreading",
        description: "Functional interfaces, Stream API, Lambdas, and concurrent multithreading.",
        order: 3,
        lessons: [
          {
            title: "Lesson 5: Modern Java 8+ Streams & Lambda Expressions",
            description: "<h3>Streams & Functional Java</h3><p>Process in-memory collections with filter, map, collect, and functional lambda pipelines.</p>",
            video_url: "https://www.youtube.com/watch?v=xTtL8E4LzTQ",
            duration: 1800,
            access: "private",
            order: 1,
          },
          {
            title: "Lesson 6: Java Multithreading & Concurrency Basics",
            description: "<h3>Multithreaded Java</h3><p>Create threads with Runnable and Thread class, understand race conditions, and use synchronized blocks.</p>",
            video_url: "https://www.youtube.com/watch?v=grEKMHGYyns",
            duration: 1950,
            access: "private",
            order: 2,
          },
        ]
      },
    ],
    quizSet: {
      title: "Java Developer Certification Assessment",
      description: "Test your core Java knowledge across OOP principles, Collections, Streams, and JVM mechanics.",
      quizzes: [
        {
          title: "Which component of the Java platform is responsible for executing Java bytecode?",
          description: "Java execution environment.",
          explanations: "The Java Virtual Machine (JVM) interprets and compiles bytecode into machine instructions.",
          options: [
            { text: "JVM (Java Virtual Machine)", is_correct: true },
            { text: "JDK", is_correct: false },
            { text: "JAVAC compiler", is_correct: false },
            { text: "JAR bundler", is_correct: false },
          ],
        },
        {
          title: "What is the size of an 'int' data type in Java?",
          description: "Java primitive types.",
          explanations: "In Java, an int is a 32-bit signed two's complement integer (4 bytes).",
          options: [
            { text: "32 bits (4 bytes)", is_correct: true },
            { text: "16 bits (2 bytes)", is_correct: false },
            { text: "64 bits (8 bytes)", is_correct: false },
            { text: "8 bits (1 byte)", is_correct: false },
          ],
        },
        {
          title: "Which collection class stores key-value pairs with fast O(1) average lookup in Java?",
          description: "Java Collections Framework.",
          explanations: "HashMap implements the Map interface using hashing for constant-time lookups.",
          options: [
            { text: "HashMap", is_correct: true },
            { text: "ArrayList", is_correct: false },
            { text: "TreeSet", is_correct: false },
            { text: "LinkedList", is_correct: false },
          ],
        },
        {
          title: "Can an abstract class in Java have constructors?",
          description: "Java OOP concepts.",
          explanations: "Yes, abstract classes can have constructors which are invoked when a concrete subclass is instantiated via super().",
          options: [
            { text: "Yes, invoked via super() from subclasses", is_correct: true },
            { text: "No, abstract classes cannot have constructors", is_correct: false },
            { text: "Only if the constructor is declared private", is_correct: false },
            { text: "Only in Java 17 and higher", is_correct: false },
          ],
        },
        {
          title: "Which keyword is used to prevent a class from being inherited in Java?",
          description: "Java class modifiers.",
          explanations: "The 'final' keyword prevents a class from being extended by subclasses.",
          options: [
            { text: "final", is_correct: true },
            { text: "sealed", is_correct: false },
            { text: "static", is_correct: false },
            { text: "const", is_correct: false },
          ],
        },
      ]
    }
  },

  {
    courseId: "6a87f43e1f455757667682e5",
    slugPrefix: "golang",
    title: "Learn GoLang",
    modules: [
      {
        title: "Module 1: Go Fundamentals, Packages & Types",
        description: "Go toolchain, package main, variables, slices, maps, and control structures.",
        order: 1,
        lessons: [
          {
            title: "Lesson 1: Go Toolchain, Workspace & Hello World",
            description: "<h3>Go Basics</h3><p>Install the Go compiler, initialize Go modules (go mod init), and write your first blazing fast Go program.</p>",
            video_url: "https://www.youtube.com/watch?v=YS4e4q9oBaU",
            duration: 1150,
            access: "public",
            order: 1,
          },
          {
            title: "Lesson 2: Variables, Slices, Maps & Functions in Go",
            description: "<h3>Go Types & Collections</h3><p>Understand := shorthand, arrays vs slices, dynamic maps, multiple return values, and named returns in Go.</p>",
            video_url: "https://www.youtube.com/watch?v=un6ZyFkqFJU",
            duration: 1600,
            access: "private",
            order: 2,
          },
        ]
      },
      {
        title: "Module 2: Structs, Interfaces & Idiomatic Error Handling",
        description: "Custom Structs, Pointer Receivers, Implicit Interfaces, and Go's explicit error checking.",
        order: 2,
        lessons: [
          {
            title: "Lesson 3: Structs, Methods & Pointer Receivers",
            description: "<h3>Go Data Modeling</h3><p>Define custom data structures, compose structs with embedding, and mutate struct values using pointers.</p>",
            video_url: "https://www.youtube.com/watch?v=8uiZC0l4Ajw",
            duration: 1500,
            access: "private",
            order: 1,
          },
          {
            title: "Lesson 4: Implicit Interfaces & Explicit Error Handling",
            description: "<h3>Duck Typing & Errors</h3><p>Implement interfaces implicitly without implements keywords, and write idiomatic if err != nil checks.</p>",
            video_url: "https://www.youtube.com/watch?v=Q0sMAPpfP_0",
            duration: 1650,
            access: "private",
            order: 2,
          },
        ]
      },
      {
        title: "Module 3: Goroutines, Channels & Web Services",
        description: "High-performance concurrency, Channels, Select statements, and building a REST API in Go.",
        order: 3,
        lessons: [
          {
            title: "Lesson 5: Goroutines, Buffered Channels & Concurrency Patterns",
            description: "<h3>Go Concurrency</h3><p>Spawn thousands of concurrent tasks with the 'go' keyword, coordinate data flow with channels, and avoid race conditions.</p>",
            video_url: "https://www.youtube.com/watch?v=qyM8Pi1KiiM",
            duration: 1950,
            access: "private",
            order: 1,
          },
          {
            title: "Lesson 6: Building High-Performance REST APIs with net/http",
            description: "<h3>Go Web Server</h3><p>Build a production HTTP server using the standard net/http package, JSON marshaling, and middleware.</p>",
            video_url: "https://www.youtube.com/watch?v=X4q1OM0voCo",
            duration: 2100,
            access: "private",
            order: 2,
          },
        ]
      },
    ],
    quizSet: {
      title: "GoLang Engineering Certification Quiz",
      description: "Assess your Go expertise across channels, goroutines, pointer semantics, and interfaces.",
      quizzes: [
        {
          title: "How do you start a concurrent Goroutine in Go?",
          description: "Go concurrency primitives.",
          explanations: "Placing the 'go' keyword before a function call executes it concurrently in a lightweight thread.",
          options: [
            { text: "go myFunction()", is_correct: true },
            { text: "spawn myFunction()", is_correct: false },
            { text: "thread myFunction()", is_correct: false },
            { text: "async myFunction()", is_correct: false },
          ],
        },
        {
          title: "What is the zero value of a pointer in Go?",
          description: "Go pointers.",
          explanations: "Uninitialized pointers have a zero value of 'nil'.",
          options: [
            { text: "nil", is_correct: true },
            { text: "0", is_correct: false },
            { text: "undefined", is_correct: false },
            { text: "null", is_correct: false },
          ],
        },
        {
          title: "What keyword is used to defer the execution of a function until the surrounding function returns?",
          description: "Go resource cleanup.",
          explanations: "The 'defer' keyword postpones the execution until the surrounding function returns, ideal for closing files or connections.",
          options: [
            { text: "defer", is_correct: true },
            { text: "finally", is_correct: false },
            { text: "after", is_correct: false },
            { text: "delayed", is_correct: false },
          ],
        },
        {
          title: "How are interfaces implemented in Go?",
          description: "Go interface implementation.",
          explanations: "In Go, interfaces are implemented implicitly by implementing all methods defined on the interface.",
          options: [
            { text: "Implicitly (a type implements an interface by implementing its methods)", is_correct: true },
            { text: "Using the 'implements' keyword explicitly", is_correct: false },
            { text: "Through class inheritance", is_correct: false },
            { text: "Only through external configuration", is_correct: false },
          ],
        },
        {
          title: "What happens when you send data to an unbuffered channel that has no receiver?",
          description: "Go channel synchronization.",
          explanations: "Sending to an unbuffered channel blocks the sender until a receiver is ready to receive.",
          options: [
            { text: "It blocks until a receiver receives the value", is_correct: true },
            { text: "It discards the value immediately", is_correct: false },
            { text: "It throws a panic runtime error", is_correct: false },
            { text: "It saves it in a temporary disk buffer", is_correct: false },
          ],
        },
      ]
    }
  }
];

async function seed() {
  await mongoose.connect(uri);
  console.log("Connected to MongoDB");

  const studentUser = await mongoose.connection.db.collection('users').findOne({ email: "vivih27704@ehwit.com" });
  const studentId = studentUser ? studentUser._id : null;
  console.log("Found student Sharif Miah:", studentId ? studentId.toString() : "Not found");

  for (const cData of coursesData) {
    console.log(`\nProcessing Course: ${cData.title} (${cData.courseId})...`);

    // 1. Create QuizSet & Quizzes
    const quizIds = [];
    for (let qIdx = 0; qIdx < cData.quizSet.quizzes.length; qIdx++) {
      const q = cData.quizSet.quizzes[qIdx];
      const quizSlug = `${cData.slugPrefix}-quiz-q${qIdx + 1}`;
      
      let quizDoc = await Quiz.findOne({ slug: quizSlug });
      if (!quizDoc) {
        quizDoc = await Quiz.create({
          title: q.title,
          description: q.description,
          explanations: q.explanations,
          slug: quizSlug,
          options: q.options,
          mark: 5,
        });
        console.log(`  Created Quiz: ${q.title.substring(0, 40)}...`);
      } else {
        quizDoc.title = q.title;
        quizDoc.description = q.description;
        quizDoc.explanations = q.explanations;
        quizDoc.options = q.options;
        quizDoc.mark = 5;
        await quizDoc.save();
        console.log(`  Updated Quiz: ${q.title.substring(0, 40)}...`);
      }
      quizIds.push(quizDoc._id);
    }

    const quizSetSlug = `${cData.slugPrefix}-mastery-quiz-set`;
    let quizSetDoc = await Quizset.findOne({ slug: quizSetSlug });
    if (!quizSetDoc) {
      quizSetDoc = await Quizset.create({
        title: cData.quizSet.title,
        description: cData.quizSet.description,
        slug: quizSetSlug,
        quizIds: quizIds,
        active: true,
      });
      console.log(`  Created QuizSet: ${cData.quizSet.title}`);
    } else {
      quizSetDoc.title = cData.quizSet.title;
      quizSetDoc.description = cData.quizSet.description;
      quizSetDoc.quizIds = quizIds;
      quizSetDoc.active = true;
      await quizSetDoc.save();
      console.log(`  Updated QuizSet: ${cData.quizSet.title}`);
    }

    // 2. Create Modules & Lessons
    const moduleIds = [];
    for (const mData of cData.modules) {
      const moduleSlug = `${cData.slugPrefix}-module-${mData.order}`;
      const lessonIds = [];

      for (const lData of mData.lessons) {
        const lessonSlug = `${cData.slugPrefix}-lesson-${mData.order}-${lData.order}`;
        let lessonDoc = await Lesson.findOne({ slug: lessonSlug });
        if (!lessonDoc) {
          lessonDoc = await Lesson.create({
            title: lData.title,
            description: lData.description,
            duration: lData.duration,
            video_url: lData.video_url,
            active: true,
            slug: lessonSlug,
            access: lData.access,
            order: lData.order,
          });
          console.log(`    Created Lesson: ${lData.title}`);
        } else {
          lessonDoc.title = lData.title;
          lessonDoc.description = lData.description;
          lessonDoc.duration = lData.duration;
          lessonDoc.video_url = lData.video_url;
          lessonDoc.active = true;
          lessonDoc.access = lData.access;
          lessonDoc.order = lData.order;
          await lessonDoc.save();
          console.log(`    Updated Lesson: ${lData.title}`);
        }
        lessonIds.push(lessonDoc._id);
      }

      let moduleDoc = await Module.findOne({ slug: moduleSlug, course: cData.courseId });
      if (!moduleDoc) {
        moduleDoc = await Module.create({
          title: mData.title,
          description: mData.description,
          active: true,
          slug: moduleSlug,
          course: new mongoose.Types.ObjectId(cData.courseId),
          lessonIds: lessonIds,
          order: mData.order,
        });
        console.log(`  Created Module: ${mData.title}`);
      } else {
        moduleDoc.title = mData.title;
        moduleDoc.description = mData.description;
        moduleDoc.active = true;
        moduleDoc.lessonIds = lessonIds;
        moduleDoc.order = mData.order;
        await moduleDoc.save();
        console.log(`  Updated Module: ${mData.title}`);
      }
      moduleIds.push(moduleDoc._id);
    }

    // 3. Update Course
    await Course.findByIdAndUpdate(cData.courseId, {
      modules: moduleIds,
      quizSet: quizSetDoc._id,
      active: true,
    });
    console.log(`  Successfully linked Course ${cData.title} with ${moduleIds.length} modules and QuizSet!`);

    // 4. Ensure Sharif Miah is enrolled in this course
    if (studentId) {
      const existingEnrollment = await Enrollment.findOne({
        course: new mongoose.Types.ObjectId(cData.courseId),
        student: studentId,
      });
      if (!existingEnrollment) {
        await Enrollment.create({
          enrollment_date: new Date(),
          status: "in-progress",
          method: "stripe",
          course: new mongoose.Types.ObjectId(cData.courseId),
          student: studentId,
        });
        console.log(`  Enrolled student Sharif Miah into ${cData.title}!`);
      } else {
        console.log(`  Student Sharif Miah is already enrolled in ${cData.title}.`);
      }
    }
  }

  console.log("\nALL 6 COURSES SUCCESSFULLY POPULATED WITH RICH MODULES, LESSONS, YOUTUBE VIDEOS & QUIZZES!");
  process.exit(0);
}

seed().catch(err => {
  console.error("Error seeding courses:", err);
  process.exit(1);
});
