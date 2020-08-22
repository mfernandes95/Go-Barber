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

  async update(req, res) {
    try {
      const { email, oldPassword } = req.body;

      const user = await User.findByPk(req.userId);

      if (email && email !== user.email) {
        const userExists = await User.findOne({ where: { email } });

        if (userExists) res.status(400).json({ error: 'User already exists.' });
      }

      if (oldPassword && !(await user.checkPassword(oldPassword)))
        res.status(401).json({ error: 'Password does not match.' });

      const { id, name, provider } = await user.update(req.body);

      return res.json({
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
