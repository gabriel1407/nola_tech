exports.calculateScore = (answers) => {
  let totalScore = 0;
  answers.forEach((answer) => {
    totalScore += answer.score;
  });
  return totalScore / answers.length;
};
