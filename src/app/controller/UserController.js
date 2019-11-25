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

  async index(req, res) {
    const { page = 1, limit = 20 } = req.query;

    const users = await User.find()
      .limit(parseInt(limit))
      .skip((page - 1) * limit);

    return res.json(users);
  }

  async delete(req, res) {
    const { id } = req.params;

    const checkUser = await User.findById(id);

    // if (!checkUser) {
    //   return res.status(404).json({ message: 'User not found' });
    // }

    return res.json({ msg: 'teste' });
  }
}

export default new UserController();
