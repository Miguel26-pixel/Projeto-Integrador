import Cors from 'cors'

// Initializing the cors middleware
export const cors = Cors({
  methods: ['GET', 'HEAD', 'POST'],
})
