export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')
  
  // Load data from the prebuild-generated data.json
  const data = await readFile('./public/data.json', 'utf-8')
  const { courses, modulesByCourse } = JSON.parse(data)
  
  // Find the course by slug
  const course = courses.find(c => c.slug === slug)
  if (!course) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Course not found'
    })
  }
  
  // Get modules for this course
  const modules = modulesByCourse[course.id] || { modules: [], meta: {} }
  
  return {
    course,
    modules: modules.modules || [],
    meta: {
      ...modules.meta,
      firstModuleId: modules.meta?.firstModuleId || 'm1',
      firstLessonId: modules.meta?.firstLessonId || 'l1'
    }
  }
})
