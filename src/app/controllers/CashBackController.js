import axios from 'axios';

class CashBackController {
  async get(req, res) {
    const { data } = await axios.get("https://mdaqk8ek5j.execute-api.us-east-1.amazonaws.com/v1/cashback?cpf=12312312323");
    return res.json(data);
  }

  async index(req, res) {
    const cpf = req.params.cpf;
    console.log(cpf);
    const { data } = await axios.get(`https://mdaqk8ek5j.execute-api.us-east-1.amazonaws.com/v1/cashback?cpf=${cpf}`);
    return res.json(data);
  }

}

export default new CashBackController();
