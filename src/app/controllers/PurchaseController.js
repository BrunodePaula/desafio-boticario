import * as Yup from 'yup';
import Purchase from '../models/Purchase';

class PurchaseController {
  async store(req, res) {
    const schema = Yup.object().shape({
      code: Yup.string().required(),
      value: Yup.string().required(),
      cpf_dealer: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    let statusPurchase;
    const { cpf_dealer } = req.body;

    if (cpf_dealer == '153.509.460-56') {
      statusPurchase = 'Aprovado';
    } else {
      statusPurchase = 'Em validação';
    }

    req.body.status = statusPurchase;

    const { id, value, date, status } = await Purchase.create(req.body);

    return res.json({
      id,
      value,
      date,
      cpf_dealer,
      status
    });
  }

  async get(req, res) {
    const cpf = req.params.cpf;
    const purchase = await Purchase.findAll({
      where: {
        cpf_dealer: cpf
      }
    });

    var total = purchase.reduce((total, p) => {
      return total + parseInt(p.value);
    }, 0);

    if (total <= 999) {
      let cashback = 0;
      let p = 10;
      cashback = total * (p / 100);
      return res.json({ "total": `${total}`, "value_cashback": `${cashback}`, "percentage": `${p}`});
    } else if (total >= 1000 && total <= 1500) {
        let p = 15;
        cashback = total * (p / 100);
        return res.json({ "total": `${total}`, "value_cashback": `${cashback}`, "percentage": `${p}`});
    } else {
        let p = 20;
        cashback = total * (p / 100);
        return res.json({ "total": `${total}`, "value_cashback": `${cashback}`, "percentage": `${p}`});
    }
  }

  async index(req, res) {
    function calcCashBack(total) {
      if (total <= 999) {
        let cashback = 0;
        let p = 10;
        cashback = total * (p / 100);
        return { "total": `${total}`, "valor_cashback": `${cashback}`, "percentage": `${p}`};
      } else if (total >= 1000 && total <= 1500) {
          let p = 15;
          cashback = total * (p / 100);
          return { "total": `${total}`, "valor_cashback": `${cashback}`, "percentage": `${p}`};
      } else {
          let p = 20;
          cashback = total * (p / 100);
          return { "total": `${total}`, "valor_cashback": `${cashback}`, "percentage": `${p}`};
      }
    }

      const purchaseId = req.params.code;
      let purchase = await Purchase.findAll({
        where: {
          code: purchaseId
        }
      });

      purchase.map(p => {
        const cashback = calcCashBack(p.value);
        console.log(cashback);
        p.dataValues.valor_cashback = cashback.valor_cashback;
        p.dataValues.percentage = cashback.percentage;
      });


      return res.json(purchase);
  }
}

export default new PurchaseController();
