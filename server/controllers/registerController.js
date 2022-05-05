import User from '../models/userAccount.js';
import bcrypt from 'bcrypt';

const handleNewUser = async (req, res) => {
    const { email: user, password: pwd } = req.body;
    if (!user || !pwd) return res.status(400).json({ 'message': 'Username and password are required.' });

    // check for duplicate usernames in the db
    const duplicate = await User.findOne({ email: user }).exec();
    if (duplicate) return res.sendStatus(409); //Conflict 

    try {
        //encrypt the password
        const hashedPwd = await bcrypt.hash(pwd, 10);

        //create and store the new user
        const result = await User.create({
            "email": user,
            "password": hashedPwd,
            userInfo:{
                name:"",
                gender:"",
                age:"",
                birth:"",
                address:"",
                phone:"",
                email:user
             },
             vaccineInfo:{
                patient:"",
                orderDate:"",
                location:"",
                dose:"",
                insurance:"",
                vaccineType:"",
                provider:"",
                status:false
             },
             testInfo:{
                patient:"",
                orderDate:"",
                location:"",
                testType:"",
                completedDate:"",
                provider:"",
                method:"",
                result:"",
                status:false
            }
        });

        console.log(result);

        res.status(201).json({ 'success': `New user ${user} created!` });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

export default { handleNewUser };