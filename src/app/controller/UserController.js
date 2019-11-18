import User from '../model/User';

class UserController {
  async store(req, res) {
    const { nome, email, password_hash } = req.body;

    const checkUserExists = await User.findOne({
      email,
    });

    if (checkUserExists) {
      return res.status(400).json({ error: 'Email already exists.' });
    }

    const user = await User.create({
      nome,
      email,
      password_hash,
    });

    return res.json(user);
  }
}

export default new UserController();
