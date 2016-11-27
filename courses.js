var courseData = [
    {
        name: "Math 1",
        code: "MA201",
        label: "MA201",
        description: "Math 1 is a full year course covering skills and concepts necessary for success in high-school mathematics. Emphasis is placed on mathematical principles to support necessary symbol manipulation. Although the course assumes no previous experience with high-school algebra, it is still an excellent choice for students who have already taken a first year algebra course at their previous school, but who feel they need to strengthen their grasp of fundamental skills and ideas.",
        trimester: "Full Year",
        options: ["MA204", "MA221"],
        isNew: true,
        credit: "math",
        forms: "Forms: ALL",
        deptPermission: false,
        gridLocation: {
            row: 3,
            column: 0
        }
    },
    {
        name: "Math 2",
        code: "MA204",
        label: "MA204",
        description: "Math 2 teaches students to make effective and convincing mathematical arguments. While our emphasis will be on the deductive reasoning of geometry, we will also explore the role of inductive reasoning in developing conjectures about the characteristics of geometric figures. Considerable attention will be given to applying geometric relationships to real-life situations. In addition, important skills from Algebra I are reviewed, emphasizing the reasoning. This course also initiates an exploration of geometric probability.",
        trimester: "Full Year",
        options: ["MA301"],
        isNew: true,
        credit: "math",
        forms: "Forms: ALL",
        deptPermission: true,
        gridLocation: {
            row: 3,
            column: 1
        }
    },
    {
        name: "Math 2M",
        code: "MA221",
        label: "MA221",
        description: "This year-long course is designed to foster strong argument skills, within the context of geometric proof. The course emphasizes both argument development and argument critique, and relies heavily on Harkness style participation by the students. Students in this course are expected to engage fully in each day's discussion, actively consider the ideas presented by their peers, and offer feedback on the strength of the arguments.",
        trimester: "Full Year",
        options: ["MA301"],
        isNew: true,
        credit: "math",
        forms: "Forms: ALL",
        deptPermission: true,
        gridLocation: {
            row: 4,
            column: 1
        }
    },
    {
        name: "Math 3",
        code: "MA301",
        label: "MA301",
        description: "Math 3 is a year-long course that introduces the language, notation, and methodology of mathematics necessary for the creation of algebraic models. We pay particular attention to the reasoning on which algebraic methods are based. Topics include working with algebraic expressions and equations; linear, quadratic, exponential, and power functions; logarithms; and conic sections. We will also explore the fundamentals of probability and statistics.",
        trimester: "Full Year",
        options: ["MAELECTIVES","MA404", "MA421", "MA411", "MA431", "MA555", "MA511", "MA407"],
        seniorsOnly: ["MA411", "MA431", "MA555", "MA511"],
        isNew: true,
        credit: "math",
        forms: "Forms: ALL",
        deptPermission: true,
        gridLocation: {
            row: 3,
            column: 2
        }
    },
    {
        name: "Only seniors from Math 3",
        code: "MASENIORS_FROM_MATH3",
        description: "",
        trimester: "F,W,S",
        options: [],
        isNew: true,
        credit: "math",
        forms: "Forms: ALL",
        deptPermission: true,
        isContainerCourse: true,
        gridLocation: {
            row: 4.9,
            column: 1.4
        }
    },
    {
        name: "Math 4",
        code: "MA404",
        label: "MA404/405/406",
        description: "This course is designed to strengthen students' algebraic fluency as they examine the important characteristics of linear, quadratic, exponential, polynomial, rational, and trigonometric functions.  The connection between arithmetic and geometric sequences and linear and exponential functions will be explored.  Students will use these families of functions to solve a variety of application problems.  Strategic use of technology will be encouraged throughout the course.",
        trimester: "Full Year",
        options: ["MAELECTIVES","MA411", "MA431", "MA555", "MA511", "MA407"],
        isNew: true,
        credit: "math",
        forms: "Forms: ALL",
        deptPermission: true,
        gridLocation: {
            row: 1.5-0.5,
            column: 3
        }
    },
    {
        name: "PreCalculus",
        code: "MA407",
        label: "MA407/408/409",
        description: "Precalculus involves the study of the elementary functions (linear, quadratic, polynomial, rational, power, exponential, logarithmic, trigonometric, inverse trigonometric), their multiple representations (words, formulas, graphs, and numerical tables), their salient characteristics, and ways of using them to model real-world phenomena.",
        trimester: "Full Year",
        options: ["MAELECTIVES","MA411", "MA431", "MA555", "MA511", "MA504", "IN530", "MA521"],
        isNew: true,
        credit: "math",
        forms: "Forms: ALL",
        deptPermission: true,
        gridLocation: {
            row: 3.5-0.5,
            column: 3
        }
    },
    {
        name: "PreCalculus BC",
        code: "MA421",
        label: "MA421/422/423",
        description: "While faithful to the foundational principles outlined in Precalculus, Precalculus BC weaves in several related topics in probability and statistics. In keeping with the theme of elementary functions, the course examines how special families of functions (probability density functions) are used to model distributions of data. This additional work is enabled by modestly accelerating the pace and adding a weekly extended period.",
        trimester: "Full Year",
        options: ["MAELECTIVES","MA504", "IN530", "MA521"],
        isNew: true,
        credit: "math",
        forms: "Forms: ALL",
        deptPermission: true,
        gridLocation: {
            row: 4.5-0.5,
            column: 3
        }
    },
    {
        name: "Statistics",
        code: "MA411",
        label: "MA411/412/413",
        description: "How do scientists establish truth? They produce data through observation and experiments. Individual measurements vary, even in seemingly identical conditions. Descriptive statistics provides graphical and numerical tools for modeling variation in data. In well-designed studies, inferential statistics allows researchers to draw conclusions about the world at large from the data at hand. Probability answers the critical question \"what are the chances?\" In this course, students will master the art and science of making decisions with data.",
        trimester: "Full Year",
        options: ["MAELECTIVES"],
        isNew: true,
        credit: "math",
        forms: "Forms: ALL",
        deptPermission: true,
        shell: "MASENIORS_FROM_MATH3",
        gridLocation: {
            row: 0.5-0.5,
            column: 4.25
        }
    },
    {
        name: "Finite Math w/Applications",
        code: "MA431",
        label: "MA431/432/433",
        description: "Do you know why a major delivery company maps out routes so that their trucks only make right hand turns? Or how statistics can be used to make decisions regarding investments? Are you interested in learning about how companies allocate resources to maximize profit? This course is intended to help you better understand how people benefit from various applications of mathematics in their everyday lives. You will investigate new applications of  topics that you have studied previously: systems of linear equations, exponential and quadratic functions, probability, and statistics. In addition, this course will expose you to finance topics ranging from personal finance to financial markets and the mathematics of finance. Whether you are trying to understand the significance of a poll regarding an election or trying to figure out how to pay off a debt, this course will give you a broader sense of mathematics and its importance to daily life experiences. Technology will play an important role in this course.",
        trimester: "Full Year",
        options: ["MAELECTIVES","MA411", "MA555", "MA511"],
        isNew: true,
        credit: "math",
        forms: "Forms: ALL",
        deptPermission: true,
        shell: "MASENIORS_FROM_MATH3",
        gridLocation: {
            row: 1.5-0.5,
            column: 4.25
        }
    },
    {
        name: "Honors Calc AB",
        code: "MA504",
        label: "MA504/505/506",
        description: "The course is a thorough examination of change-instantaneous rates of change (differential calculus) and the ongoing accumulation of change (integral calculus). Beginning from discussion of the meaning and interpretation of these concepts, methods for determining the derivatives and integrals of elementary functions are introduced, and students' skill with those methods is developed in various contexts. Applications of the derivative and integral are emphasized from symbolic, graphical, numerical, and descriptive perspectives. This course prepares students to take the AP exam in May.",
        trimester: "Full Year",
        options: ["MAELECTIVES","MA555", "MA511", "MA527"],
        isNew: true,
        credit: "math",
        forms: "Forms: ALL",
        deptPermission: true,
        gridLocation: {
            row: 3.5-0.5,
            column: 4.25
        }
    },
    {
        name: "Honors Calc AB w/Physics",
        code: "IN530",
        label: "IN530",
        description: "The sequence covers the fundamental concepts of differential and integral calculus. Methods for determining the derivatives and integrals of elementary functions will be introduced, skill with those methods developed, and applications of the derivative and integral explored. Applications will include velocity and acceleration in rectilinear motion, extreme values, concavity, related rates, area, and volumes of revolution. Considerable emphasis will be placed upon applying the calculus techniques to physical models, in connection with the companion course, Honors Physics with Calculus.",
        trimester: "Full Year",
        options: ["MAELECTIVES","MA555", "MA511", "MA527"],
        isNew: true,
        credit: "interdisc",
        forms: "Forms: ALL",
        deptPermission: true,
        gridLocation: {
            row: 5,
            column: 4.25
        }
    },
    {
        name: "Honors Calc BC",
        code: "MA521",
        label: "MA521/522/523",
        description: "The course will cover all the topics described in MA504 Honors Calculus AB. Many additional topics will be covered including more sophisticated methods of integration, polar coordinates, and extensive work with infinite series and vector-valued functions. This course prepares students to take the AP exam in May.",
        trimester: "Full Year",
        options: ["MAELECTIVES","MA555", "MA511", "MA527"],
        isNew: true,
        credit: "math",
        forms: "Forms: ALL",
        deptPermission: true,
        gridLocation: {
            row: 4,
            column: 4.25
        }
    },
    {
        name: "Honors Computer Programming",
        code: "MA555",
        label: "MA555/556/557",
        description: "This course is designed to exploit natural connections between mathematics and programming.  Bringing mathematics to programming and programming to mathematics we attempt to realize synergies between the two disciplines.  The Mathematica platform allows us to build visual models of complex problems, and, in the process, gain some understanding of the underlying mathematics, like vectors and vector transformations.  Pedagogically, as much as possible, class time is hands on, and, as the course progresses, exercises become more independent, creative, and complex.",
        trimester: "Full Year",
        options: ["MAELECTIVES","MA511", "MA527", "MASEMINARS"],
        isNew: true,
        credit: "math",
        forms: "Forms: ALL",
        deptPermission: true,
        shell: "MASENIORS_FROM_MATH3",        
        gridLocation: {
            row: 2.5,
            column: 5.5
        }
    },
    {
        name: "Honors Statistics",
        code: "MA511",
        label: "MA511/512/513",
        description: "Statistics is the art and science of drawing conclusions from data. In Honors Statistics, students will learn to: apply the principles and methods of data production, data analysis, probability models, and inference appropriately in a variety of settings; design and carry out a statistical study to answer a research question of interest; analyze and critique published statistical information; and communicate statistical reasoning effectively, both orally and in writing. This course prepares students to take the AP exam in May.",
        trimester: "Full Year",
        options: ["MAELECTIVES","MA555", "MASEMINARS"],
        isNew: true,
        credit: "math",
        forms: "Forms: ALL",
        deptPermission: true,
        shell: "MASENIORS_FROM_MATH3",
        gridLocation: {
            row: 1.5,
            column: 5.5
        }
    },
    {
        name: "Honors Calc-Based Prob&nbsp;&&nbsp;Stats",
        code: "MA527",
        label: "MA527/528/529",
        description: "Statistics is the art and science of drawing conclusions from data. Probability is the study of chance behavior, while Calculus provides the methodological basis in both disciplines. This course blends probability theory and mathematical statistics with real-world applications. Students will: apply the principles of data analysis, probability models, and inference in a variety of settings; use calculus and other mathematical techniques to develop key results; and communicate statistical and probabilistic reasoning both orally and in writing. Students who wish to take the AP exam in May will need to do some independent preparation outside of class.",
        trimester: "Full Year",
        options: ["MAELECTIVES","MA555", "MASEMINARS"],
        isNew: true,
        credit: "math",
        forms: "Forms: ALL",
        deptPermission: true,
        gridLocation: {
            row: 4,
            column: 5.5
        }
    },
    {
        name: "Honors Math Seminars",
        code: "MASEMINARS",
        description: "",
        trimester: "F,W,S",
        options: [],
        isNew: true,
        credit: "math",
        forms: "Forms: ALL",
        deptPermission: true,
        isContainerCourse: true,
        gridLocation: {
            row: 1.6,
            column: 6.56
        }
    },
    {
        name: "Number Theory",
        code: "MA538",
        description: "Number Theory is a branch of study within the discipline of mathematics that evokes notions of beauty and elegance. It is, for the most part*, solidly in the realm of \'pure mathematics,\' as opposed to applied mathematics. If you are curious about prime numbers and other integers - if you have ever wondered, \"What\'s so special about 6, 28, and 496, anyway?\" Or if you\'ve asked, \"Yeah, but how do I know that the square root of two is irrational?\" then this course is for you. Students learn basic proof techniques and get an introduction to the basic practice and history of number theory. (*NSA and internet security companies use number theory to protect information in transit, actually, but that utility was essentially an accident, not the generating motive behind finding big primes.)",
        trimester: "F",
        options: ["MAELECTIVES"],
        isNew: false,
        credit: "math",
        forms: "Forms: ALL",
        deptPermission: true,
        shell: "MASEMINARS",
        gridLocation: {
            row: 2,
            column: 6.67
        }
    },
    {
        name: "Multivariable Calculus",
        code: "MA536",
        description: "This course is an investigation of how the notions of differentiation and integration studied in single-variable calculus extend to functions of several variables. It is a gentle qualitative introduction to the subject and is not meant to replace the rigorous college version. Topics studied include vectors and vector fields, differentiation, optimization, and the definite integral.",
        trimester: "W",
        options: ["MAELECTIVES"],
        isNew: false,
        credit: "math",
        forms: "Forms: ALL",
        deptPermission: true,
        shell: "MASEMINARS",
        gridLocation: {
            row: 3,
            column: 6.67
        }
    },
    {
        name: "Computational Geometry and Proof",
        code: "MA533",
        description: "Can origami trisect an angle in a way that Euclidean compass-and-straightedge construction cannot? Can one fold paper in order to solve cubic equations? When a vertex is creased, under what conditions does it lie flat, and for that matter, what crease patterns are impossible? What is the largest triangle one can fold into a square? Does the Euler characteristic hold with polyhedra that have holes? This course is designed for the advanced student who is interested in exploring higher-level mathematics through the hands-on projects in Thomas Hull's text Project Origami. Such topics as group theory (abstract algebra), basic topology, and number theory are investigated along with robust geometry and algebraic proofs, including the analysis of optimization.",
        trimester: "S",
        options: ["MAELECTIVES"],
        isNew: true,
        credit: "math",
        forms: "Forms: ALL",
        deptPermission: true,
        shell: "MASEMINARS",
        gridLocation: {
            row: 4,
            column: 6.67
        }
    },
    {
        name: "Math Electives",
        code: "MAELECTIVES",
        description: "",
        trimester: "F,W,S",
        options: [],
        isNew: true,
        credit: "math",
        forms: "Forms: ALL",
        deptPermission: true,
        isContainerCourse: true,
        gridLocation: {
            row: 4.9,
            column: 1.4
        }
    },
    {
        name: "Intro to iOS Programming",
        code: "MA465",
        description: "This course will provide the necessary tools for students to write simple programs for the iPhone and iPad devices. It will introduce students to Xcode, the Apple development environment required to write, compile and run the code, and test on the iOS Simulator. The course will be an introduction to object-oriented programming, focusing on the structure of an iOS application, graphical interface and mathematical libraries. Note: Apple Macintosh computers are used.",
        trimester: "F",
        options: [],
        isNew: false,
        credit: "math",
        forms: "Forms: IV or V",
        deptPermission: true,
        shell: "MAELECTIVES",
        gridLocation: {
            row: 5.2,
            column: 1.5
        }
    },
    {
        name: "Intro to Web Programming",
        code: "MA466",
        description: "In this practical course you'll learn the fundamental tools and knowledge for designing and developing web apps. You will write programs for the browser and bring them to life using JAVASCRIPT, HTML, and CSS, today's standard scripting and markup languages used by front-end web developers the world over. With an idea, a little bit of creativity, and some logic, you can create animations, build games, and even develop the productivity tools of the future. No experience necessary. Students with prior programming experience will have the opportunity to deepen their knowledge through the challenges in this course.",
        trimester: "W",
        options: [],
        isNew: false,
        credit: "math",
        forms: "Forms: III, IV or V",
        deptPermission: true,
        shell: "MAELECTIVES",
        gridLocation: {
            row: 5.2,
            column: 2.5
        }
    },
    {
        name: "Intro to Robotics",
        code: "MA461",
        description: "Robotics combines engineering, electronics, and computer science to provide an authentic learning experience. Students learn about robotic history and construct working autonomous robots, which requires engineering, design, and programming skills. Topics include components of robotic systems, sensors, and feedback loops. An important aspect is the design of computer algorithms that intelligently make use of sensor information describing the environment and purposefully acts upon it. The course has several competitions where students program their robots to navigate around a playing surface, recognize boundaries and other opponents, and manipulate objects. Programming experience is recommended, but not required. Note: Windows-based computers are used.",
        trimester: "S",
        options: [],
        isNew: true,
        credit: "math",
        forms: "Forms: III, IV, or V",
        deptPermission: true,
        shell: "MAELECTIVES",
        gridLocation: {
            row: 6,
            column: 1.5
        }
    },
    {
        name: "Statistical Reasoning in&nbsp;Sports",
        code: "MA551",
        description: "Did Lebron James choke in the playoffs? Should you go for it on fourth down? Is it more important to hit a tee shot long or to hit it straight? What effect did steroid testing have on baseball statistics? These questions and others will be addressed through the principles of statistical reasoning. The course will present all of the common types of graphs and summary statistics as well as the design of experiments and the calculation of probabilities. It will also cover the logic of inference and how to account for variability when making decisions.",
        trimester: "W",
        options: [],
        isNew: true,
        credit: "math",
        forms: "Forms: V only",
        deptPermission: true,
        shell: "MAELECTIVES",
        gridLocation: {
            row: 6,
            column: 2.5
        }
    },

];