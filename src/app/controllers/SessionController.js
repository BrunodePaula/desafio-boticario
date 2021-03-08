import jwt from 'jsonwebtoken';
import Dealer from '../models/Dealer';
import authConfig from '../../config/Auth';

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    const dealer = await Dealer.findOne({ where: { email } });

    if (!dealer) {
      return res.status(401).json({ error: 'Dealer not found' });
    }

    if (!(await dealer.checkPassword(password))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    const { id, name } = dealer;

    return res.json({
      user: {
        id,
        name,
        email
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn
      })
    });
  }
}

export default new SessionController();
