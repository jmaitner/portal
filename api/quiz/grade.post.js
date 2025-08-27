export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { quizId, answers, courseId } = body
  
  if (!quizId || !Array.isArray(answers) || !courseId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid quiz submission'
    })
  }
  
  // Load data from the prebuild-generated data.json
  const data = await readFile('./public/data.json', 'utf-8')
  const { courses, quizzes } = JSON.parse(data)
  
  // Find the course to get pass percentage
  const course = courses.find(c => c.id === courseId)
  if (!course) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Course not found'
    })
  }
  
  // Find the quiz
  const quiz = quizzes?.find(q => q.id === quizId)
  if (!quiz || !quiz.questions) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Quiz not found'
    })
  }
  
  // Grade the quiz
  let correct = 0
  const total = quiz.questions.length
  
  quiz.questions.forEach((question, index) => {
    if (answers[index] === question.correctAnswer) {
      correct++
    }
  })
  
  const percentage = (correct / total) * 100
  const passed = percentage >= course.passPercent
  
  return {
    correct,
    total,
    passed,
    percentage: Math.round(percentage)
  }
})
