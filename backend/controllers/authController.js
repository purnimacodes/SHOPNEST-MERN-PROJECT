const User = require('..model/User');
const user = require('../model/user');

const generateToken = (id) => {
  return jwt.sign({id}, process.env.JWT_SECRET,{expiresIn: '30d'})
};

//Register a new user
const registerUser = async (req, res) => {
  const {name, email, password} = req.body;
  try{
    const existingUser = await User.findOne({email});
    if(existngUser) {
      return res.status(400).json({message: 'User already exists'});
    }
    //TODOS: hash the password before saving to the  database
    //TODOS: Implement JWT token generation for authenticaton
   //TODOS: OTP Sending and verification for email confirmation
    //TODOS: WELCOME MAIL 
     
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const User = User.create ({name, email, hashedpassword});
    if(user) {
      const otp = Math.floor(100000 + Math.random() * 900000).toString();

      const message =` Welcome to Shopnest, ${name}! Thank you for registring with us. We are excited Your OTP for shopnest registration is: ${otp}
      `

      await sendEmail(email, 'Welcome to ShopNest - Your OTP for Registration', message);

      res.status (201).json ({
        _id:user._id,
        name:user.name,
        email:user.email,
        role:user.role,
        token:generateToken(user._id)
      });
    }

    else {
      res.status(400).json({message: 'Invalid user data'});
    }
  }
  catch(error) {
    res.status(500).json({message:'Server error'});
  }
};

//Login user
const LoginUser = async(req, res) => {
  const {email, password} = req.body;
  try{
    const user = await User.findOne({email});
    if(user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user.id,
        name: user.name,
        email:user.email,
        role: user.role,
        token: generateToken(user._id)
      });
    } else{
      res.status(400).json({message: 'Invalid email or password'})
    }
  } catch (error) {
    res.status(500).json({message: 'Server error'});
  }
};

   


//     await newUser.save();
//     res.status(201).json({message: 'User registered successfully'});
//   } catch (error) {
//     res.status(500).json({message: 'Error registering user'});
//   }
// };