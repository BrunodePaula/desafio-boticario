import * as Yup from 'yup';
import Dealer from '../models/Dealer';

class DealerController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      cpf: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' })
    }

    const dealerExists = await Dealer.findOne({ where: { email: req.body.email } });

    if (dealerExists) {
      return res.status(400).json({ error: 'Dealer already exists' });
    }

    const { id, name, cpf, email } = await Dealer.create(req.body);

    return res.json({
      id,
      name,
      cpf,
      email
    });
  }

}

export default new DealerController();
