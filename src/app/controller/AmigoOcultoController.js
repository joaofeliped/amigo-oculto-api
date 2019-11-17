/* eslint-disable class-methods-use-this */
import { parseISO, isBefore, isAfter, setDayOfYear } from 'date-fns';
import AmigoOculto from '../model/AmigoOculto';

class AmigoOcultoController {
  async index(req, res) {
    const { id } = req.params;

    if (id) {
      try {
        const amigoOcultoEncontrado = await AmigoOculto.findOne({
          _id: id,
        });
        return res.json(amigoOcultoEncontrado);
      } catch (err) {
        return res.status(404).json('Não foi encontrado nenhum registro.');
      }
    }

    const amigosOcultos = await AmigoOculto.find().sort({ createdAt: 'desc' });
    return res.json(amigosOcultos);
  }

  async store(req, res) {
    const {
      nome,
      data,
      data_sorteio,
      observacao,
      valor_minimo,
      valor_maximo,
    } = req.body;

    const dataAmigoOculto = parseISO(data);
    const dataSorteioAmigoOculto = parseISO(data_sorteio);

    if (isBefore(dataAmigoOculto, dataSorteioAmigoOculto)) {
      return res.status(400).json({
        error:
          'A data do Amigo oculto não pode ser anterior a data do sorteio.',
      });
    }

    if (isAfter(dataAmigoOculto, setDayOfYear(dataSorteioAmigoOculto, 7))) {
      return res.status(400).json({
        error:
          'A data do Amigo oculto tem que ser pelo menos uma semana após a data do sorteio.',
      });
    }

    const amigoOculto = await AmigoOculto.create({
      nome,
      data,
      data_sorteio,
      observacao,
      valor_minimo,
      valor_maximo,
    });
    return res.json(amigoOculto);
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      if (id) {
        const aoe = await AmigoOculto.findByIdAndUpdate(
          id,
          { $set: req.body },
          function(err, result) {
            if (err) {
              console.log(err);
            }
          }
        );

        return res.json(aoe);
      }
    } catch (err) {
      return res.status(404).json('Não foi encontrado nenhum registro.');
    }
    return res.status(404).json('Não foi encontrado nenhum registro.');
  }

  async delete(req, res) {
    const { id } = req.params;

    await AmigoOculto.findByIdAndDelete(id, function(err, result) {
      if (err) {
        res.status(400).json('Não foi encontrado o registro para remover.');
      }
    });
    res.json('Registro removido com sucesso.');
  }

  async cancel(req, res) {
    try {
      const { id } = req.params;
      if (id) {
        const data_cancelamento = new Date();

        const amigoOculto = await AmigoOculto.findById(id);

        if (amigoOculto.data_cancelamento) {
          return res.status(400).json('Esse amigo oculto já foi cancelado.');
        }

        if (isBefore(amigoOculto.data, data_cancelamento)) {
          return res
            .status(400)
            .json(
              'Não foi possível cancelar o amigo oculto pois o mesmo já aconteceu.'
            );
        }

        const amigoOcultoSalvo = await AmigoOculto.findByIdAndUpdate(
          id,
          {
            data_cancelamento,
          },
          { new: true }
        );

        return res.json(amigoOcultoSalvo);
      }
    } catch (err) {
      console.log(err);

      return res.status(404).json('Não foi encontrado nenhum registro.(1)');
    }
    return res.status(404).json('Não foi encontrado nenhum registro.(2)');
  }
}

export default new AmigoOcultoController();
