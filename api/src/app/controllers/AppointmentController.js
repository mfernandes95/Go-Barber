import * as Yup from 'yup';
import { where } from 'sequelize';
import Appointment from '../models/Appointment';
import User from '../models/User';

class AppointmentController {
  async store(req, res) {
    try {
      const schema = Yup.object().shape({
        provider_id: Yup.number().required(),
        date: Yup.date().required(),
      });

      if (!(await schema.isValid(req.body)))
        res.status(400).json({ error: 'Validation fails.' });

      const { provider_id, date } = req.body;

      /**
       * Check if provider_id is provider
       */
      const isProvider = await User.findOne({
        where: { id: provider_id, provider: true },
      });

      if (!isProvider)
        res
          .status(401)
          .json({ error: 'You can only create appointments with providers.' });

      const appointment = await Appointment.create({
        user_id: req.userId,
        provider_id,
        date,
      });

      return res.status(201).json(appointment);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export default new AppointmentController();
