// The provided course information.
const CourseInfo = {
    id: 451,
    name: "Introduction to JavaScript"
  };
  
  // The provided assignment group.
  const AssignmentGroup = {
    id: 12345,
    name: "Fundamentals of JavaScript",
    course_id: 451,
    group_weight: 25,
    assignments: [
      {
        id: 1,
        name: "Declare a Variable",
        due_at: "2023-01-25",
        points_possible: 50
      },
      {
        id: 2,
        name: "Write a Function",
        due_at: "2023-02-27",
        points_possible: 150
      },
      {
        id: 3,
        name: "Code the World",
        due_at: "3156-11-15",
        points_possible: 500
      }
    ]
  };
  
  // The provided learner submission data.
  const LearnerSubmissions = [
    {
      learner_id: 125,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-25",
        score: 47
      }
    },
    {
      learner_id: 125,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-02-12",
        score: 150
      }
    },
    {
      learner_id: 125,
      assignment_id: 3,
      submission: {
        submitted_at: "2023-01-25",
        score: 400
      }
    },
    {
      learner_id: 132,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-24",
        score: 39
      }
    },
    {
      learner_id: 132,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-03-07",
        score: 140
      }
    }
  ];
  
  function getLearnerData(course, ag, submissions) {
    // here, we would process this data to achieve the desired result.
    // check if there is proper course_id with respec to 
    let learners = [];
    let learnSubs = [];
    let assignmentInfo = [];
    let results = [];
    for (let i in submissions) {
        if (!learners.includes(submissions[i].learner_id)){
            learners.push(submissions[i].learner_id)
        } 
    }
    for (let i = 0; i < learners.length; i++) {
      let new_id = {id: learners[i], avg: Number};
      results.push(new_id);
      learnSubs.push(getLearnerSubmissions(learners[i], LearnerSubmissions)); 

    }
    const result = [
      {
        id: 125,
        avg: 0.985, // (47 + 150) / (50 + 150)
        1: 0.94, // 47 / 50
        2: 1.0 // 150 / 150
      },
      {
        id: 132,
        avg: 0.82, // (39 + 125) / (50 + 150)
        1: 0.78, // 39 / 50
        2: 0.833 // late: (140 - 15) / 150
      }
    ];
    return results;
  }
  
function getLearnerSubmissions(learnerId, submissionsArray) {
    let narr = [];
    for (let i of submissionsArray) {
        if (learnerId == i["learner_id"]) {
            narr.push(i)
        }
    }
    return narr;
}

function getAssignmentInfoById(assignmentId, AssignmentGroup) {
    let assignment_n = {};
    for (let i in AssignmentGroup.assignments) {
        if(AssignmentGroup.assignments[i].id == assignmentId) {
            return AssignmentGroup.assignments[i];
        }
    }
    return null;
}

function calculateAssignmentScore(submissionScore, assignmentMaxScore) {
    return (submissionScore/assignmentMaxScore);
}

function isSubmissionLate(submitted_at, due_at) {
    if (submitted_at > due_at) {
        return true;
    }
    return false;
}

function applyLatePenalty(originalScore){
    return (originalScore-(originalScore * .10))
}
const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
console.log(result)
console.log(getLearnerSubmissions(125, LearnerSubmissions))