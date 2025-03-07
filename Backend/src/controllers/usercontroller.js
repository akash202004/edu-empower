import { asyncHandler } from "../utils/asyncHandler.js"

const registerUser = asyncHandler( async (req, res) => {
    
    const{username, email, password, phone} = req.body
    console.log("email: ", email);
})

export default registerUser;