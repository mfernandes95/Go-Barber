import User from '../models/user';

class UserController {
  async store(req, res) {
    try {
      // console.log('BODY', User.findOne(), req.body.email);
      // const userExists = await User.findOne({
      //   where: { email: req.body.email },
      // });

      const userExists = await User.find({});

      console.log('USERRRR', userExists);

      // if (userExists)
      //   return res.status(400).json({ error: 'user already exists!' });
      const { id, name, email, provider } = await User.create(req.body);

      return res.status(201).json({
        id,
        name,
        email,
        provider,
      });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export default new UserController();
