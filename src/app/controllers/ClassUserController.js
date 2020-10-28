import * as Yup from 'yup';

import ClassUser from '../models/ClassUser';

class ClassUserController {
  async index(req, res) {
    try {
      const classUser = await ClassUser.findAll({
        attributes: ['id', 'name', 'entries', 'shift'],
      });

      return res.json(classUser);
    } catch (error) {
      return res.json(error);
    }
  }

  async store(req, res) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required(),
        entries: Yup.number().required(),
        shift: Yup.string().required(),
      });

      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ error: 'Validation failed' });
      }

      const { id, name, entries, shift } = await ClassUser.create(req.body);

      return res.json({
        id,
        name,
        entries,
        shift,
      });
    } catch (error) {
      console.log(error);
      return res.json(error);
    }
  }

  async update(req, res) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string(),
        entries: Yup.number(),
        shift: Yup.string(),
      });

      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ error: 'Validation failed' });
      }

      const classUser = await ClassUser.findByPk(req.params.id);

      if (!classUser) {
        return res.status(404).json({ error: 'Class User does not exist' });
      }

      if (classUser.user_id !== req.userId) {
        return res.status(401).json({ error: 'You do not own this class!' });
      }

      const { id, name, entries, shift } = await ClassUser.create(classUser);

      return res.json({
        id,
        name,
        entries,
        shift,
      });
    } catch (error) {
      return res.json(error);
    }
  }

  async delete(req, res) {
    try {
      const classUser = await ClassUser.findByPk(req.params.id);

      if (!classUser) {
        return res.status(404).json({ error: 'Class User does not exist' });
      }

      if (classUser.user_id !== req.userId) {
        return res.status(401).json({ error: 'You do not own this class!' });
      }

      await classUser.destroy();

      return res.status(204).send();
    } catch (error) {
      return res.json(error);
    }
  }
}

export default new ClassUserController();
