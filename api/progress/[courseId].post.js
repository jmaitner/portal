export default defineEventHandler(async (event) => {
  const courseId = getRouterParam(event, 'courseId')
  const body = await readBody(event)
  
  // Validate the progress payload
  const { completed, seatTime, last } = body
  
  if (!Array.isArray(completed) || typeof seatTime !== 'number') {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid progress payload'
    })
  }
  
  // For Phase 2, this is a stub - no server persistence
  // Client handles localStorage persistence
  return { ok: true }
})
