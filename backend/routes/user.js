import { authMiddleware } from '../middleware.js';

const express = require('express')
const z = require("zod");
const jwt = require("jsonwebtoken")
const JWT_SECRET = require("../config.js")

const router = express.Router();

const userSignUp = z.object({
    username: z.string().email(),
    email: z.string(),
    password: z.string()
})

router.post('/signup', async function(req, res) {
    
    const userSignupInfo = userSignUp.safeParse(req.body);

    if(!userSignupInfo) {
        res.send('please provide valid info')
    }

    const userExist = await userSignupInfo.findOne({
        username: userSignupInfo.username,
        email: userSignupInfo.email
    })

    if(userExist) {
        res.send('user already exits / email already in use')
    }

    const user = await User.create({
        username: userSignupInfo.username,
        email: userSignupInfo.email,
        password: userSignupInfo.password
    })

    const userId = user._id;

    const token = jwt.sign({
        userId
    }, JWT_SECRET)

    res.send({
        message: "user created successfully",
        token: token
    })

})


const userSignIn = z.object({
    username: z.string(),
    email: z.string().email(),
    password: z.string()
})

router.post("/signin",async  function(req, res) {
    const userSignInInfo = userSignIn.safeParse(req.body);

    if(!userSignInInfo) {
        res.send("invalid username or password")
    }

    const user = await User.findOne({
        username: userSignIn.username
    })

    if(user) {
        res.send("user created successfully")
    }

    


    res.send("signin route is working")
})

const updateInfo = z.object({
    username: z.string().optional(),
    email: z.object().optional(),
    password: z.object().optional()
})

router.put("/", authMiddleware, async (req,res) => {
    const userUpdateInfo = updateInfo.safeParse(req.body)

    if(!userUpdateInfo) {
        return res.json({
            "message": "invalid user info for updation"
        })
    }

    await User.updateOne({
        _id: req.userId
    },
    {
        $set: userUpdateInfo.data
    }
)

    return res.json({
        "message": "user updated successfully"
    })

})


router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || " ";

    const users = await User.find({
        $or: [{
            username: {
                "$regex": filter
            }
        },{
            email: {
                "$regex": filter
            }
        },{
            password: {
                "$regex": filter
            }
        }]
    })

    return res.json({
        user: users.map(user => ({
            username: user.username,
            email: user.email,
            _id: user._id

        }))
    })


})
    


export default router;