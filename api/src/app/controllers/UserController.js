import User from '../models/user';

class UserController {
  async store(req, res) {
    try {
      const userExists = await User.findOne({
        where: { email: req.body.email },
      });

      if (userExists)
        return res.status(400).json({ error: 'user already exists!' });
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
