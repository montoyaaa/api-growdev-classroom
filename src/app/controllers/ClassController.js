import * as Yup from 'yup';

import Class from '../models/Class';

class ClassController {
  async index(req, res) {
    try {
      const classes = await Class.findAll({
        attributes: ['id', 'title', 'day', 'month', 'entries', 'hour'],
        where: {
          user_id: req.userId,
        },
      });

      return res.json(classes);
    } catch (error) {
      return res.json(error);
    }
  }

  async store(req, res) {
    try {
      const schema = Yup.object().shape({
        title: Yup.string().required(),
        day: Yup.number.required(),
        month: Yup.number.required(),
        entries: Yup.number.required(),
        hour: Yup.string.required(),
      });

      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ error: 'Validation failed' });
      }

      const classes = {
        user_id: req.userId,
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
      return res.json(error);
    }
  }

  async update(req, res) {
    try {
      const schema = Yup.object().shape({
        title: Yup.string().required(),
        day: Yup.number.required(),
        month: Yup.number.required(),
        entries: Yup.number.required(),
        hour: Yup.string.required(),
      });

      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ error: 'Validation failed' });
      }

      const classes = await Class.findByPk(req.params.id);

      if (!classes) {
        return res.status(404).json({ error: 'Class does not exist' });
      }

      if (classes.user_id !== req.userId) {
        return res.status(401).json({ error: 'You do not own this class!' });
      }

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
      return res.json(error);
    }
  }

  async delete(req, res) {
    try {
      const classes = await Class.findByPk(req.params.id);

      if (!classes) {
        return res.status(404).json({ error: 'Class does not exist' });
      }

      if (classes.user_id !== req.userId) {
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
