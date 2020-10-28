import * as Yup from 'yup';

import Class from '../models/Class';
import User from '../models/User';

class ClassController {
  async index(req, res) {
    try {
      const users = await User.findAll({
        attributes: ['class_user_id'],
        where: {
          id: req.userId,
        },
      });

      const classes = await Class.findAll({
        attributes: ['id', 'title', 'day', 'month', 'entries', 'hour'],
        where: {
          class_user_id: users[0].dataValues.class_user_id,
        },
      });

      if (!classes || !users) {
        return res
          .status(404)
          .json({ error: 'Nenhuma aula criada para esta turma!' });
      }

      return res.json(classes);
    } catch (error) {
      console.log(error);
      return res.json(error);
    }
  }

  async store(req, res) {
    try {
      const schema = Yup.object().shape({
        title: Yup.string().required(),
        day: Yup.string().required(),
        month: Yup.string().required(),
        entries: Yup.number().required(),
        hour: Yup.string().required(),
        class_user_id: Yup.string().required(),
      });

      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ error: 'Validation failed' });
      }

      const classes = {
        class_user_id: req.classUserId,
        ...req.body,
      };

      const { id, title, day, month, entries, hour } = await Class.create(
        classes
      );

      return res.json({
        id,
        title,
        day,
        month,
        entries,
        hour,
      });
    } catch (error) {
      console.log(error);
      return res.json(error);
    }
  }

  async update(req, res) {
    try {
      const users = await User.findAll({
        attributes: ['class_user_id'],
        where: {
          id: req.userId,
        },
      });

      const schema = Yup.object().shape({
        entries: Yup.number().required(),
      });

      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ error: 'Validation failed' });
      }

      const classes = await Class.findByPk(req.params.id);

      if (!classes) {
        return res.status(404).json({ error: 'Class does not exist' });
      }

      if (classes.class_user_id !== users[0].dataValues.class_user_id) {
        return res.status(401).json({ error: 'You do not own this class!' });
      }

      const { entries } = await Class.create(classes);

      return res.json({
        entries,
      });
    } catch (error) {
      return res.json(error);
    }
  }

  async delete(req, res) {
    try {
      const users = await User.findAll({
        attributes: ['class_user_id'],
        where: {
          id: req.userId,
        },
      });

      const classes = await Class.findByPk(req.params.id);

      if (!classes) {
        return res.status(404).json({ error: 'Class does not exist' });
      }

      if (classes.class_user_id !== users[0].dataValues.class_user_id) {
        return res.status(401).json({ error: 'You do not own this class!' });
      }

      await classes.destroy();

      return res.status(204).send();
    } catch (error) {
      return res.json(error);
    }
  }
}

export default new ClassController();
