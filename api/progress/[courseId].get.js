export default defineEventHandler(async (event) => {
  const courseId = getRouterParam(event, 'courseId')
  
  // For Phase 2, return default empty progress
  // Client will fill from localStorage
  return {
    completed: [],
    seatTime: 0,
    last: null
  }
})
