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
    try {
    if (course.id != ag.course_id) {
      throw new Error("Invalid input: AssignmentGroup does not belong to course");
    }
    // here, we would process this data to achieve the desired result.
    // check if there is proper course_id with respect to 
    let learners = [];
    let results = [];
    for (let i in submissions) {
        if (!learners.includes(submissions[i].learner_id)){
            learners.push(submissions[i].learner_id)
        } 
    }
    for (let learnerId of learners) {
      let learnersSubmissions = getLearnerSubmissions(learnerId, submissions);
      let learnerResult = {
        id: learnerId,
        avg: 0
      };
      let totalWeight = 0;
      for (let submission of learnersSubmissions) {
        let assignment = getAssignmentInfoById(submission.assignment_id, ag);
        if (assignment && new Date(assignment.due_at) < new Date()) { // Checks for future due dates
          let score = submission.submission.score;
          if (isSubmissionLate(submission.submission.submitted_at, assignment.due_at)) {
            score = applyLatePenalty(score, assignment.points_possible);
          }
          let scorePercentage = calculateAssignmentScore(score, assignment.points_possible);
          learnerResult[assignment.id] = parseFloat(scorePercentage.toFixed(3)); // formats scores % to 1 decimal point
          learnerResult.avg += scorePercentage * assignment.points_possible;
          totalWeight += assignment.points_possible;
        }
      }
      if (totalWeight > 0) {
        learnerResult.avg = parseFloat(((learnerResult.avg / totalWeight) * 100).toFixed(3));
      }
      results.push(learnerResult);
    }
    return results;
  } catch(e){console.error(error.message);
    return null}
  }
  
function applyLatePenalty(originalScore, maxScore) {
  return Math.max(0, originalScore - (maxScore * 0.1));
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
const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
console.log(result)

    /*
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
    ];*/

    