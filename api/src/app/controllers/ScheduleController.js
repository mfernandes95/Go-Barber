import { startOfDay, endOfDay, parseISO } from 'date-fns';
import { Op } from 'sequelize';
import Appointment from '../models/Appointment';
import User from '../models/User';

class ScheduleController {
  async index(req, res) {
    try {
      const checkUserProvider = await User.findOne({
        where: { id: req.userId, provider: true },
      });

      if (!checkUserProvider)
        res.status(401).json({ error: 'User is not provider' });

      const { date } = req.query;
      const parsedDate = parseISO(date);

      const appointments = await Appointment.findAll({
        where: {
          provider_id: req.userId,
          canceled_at: null,
          date: {
            [Op.between]: [startOfDay(parsedDate), endOfDay(parsedDate)],
          },
        },
        order: ['date'],
      });

      return res.status(200).json(appointments);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export default new ScheduleController();
