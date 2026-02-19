import { Router } from 'express'
import { getAllUsers, signupController, loginController, getMe} from '../controller/userControllers.js'
import { isAdmin, isAuth } from '../middleware/auth.js'



const userRouter = Router()
userRouter.get('/all',isAdmin,getAllUsers)
userRouter.get('/me',isAuth,getMe)
userRouter.post('/signup', signupController)
userRouter.post('/login', loginController)


export default userRouter