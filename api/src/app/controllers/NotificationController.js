import Notification from '../schemas/Notification';
import User from '../models/User';

class NotificationController {
  async index(req, res) {
    try {
      const checkIsProvider = await User.findOne({
        where: { id: req.userId, provider: true },
      });

      if (!checkIsProvider)
        return res
          .status(401)
          .json({ error: 'Only providers can load notifications.' });

      const notifications = await Notification.find({
        user: req.userId,
      })
        .sort({ createdAt: 'desc' })
        .limit(20);

      return res.status(200).json(notifications);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      // const notification = Notification.findByIdAndUpdate(
      //   req.params.id,
      //   {
      //     read: true,
      //   },
      //   {
      //     new: true,
      //   }
      // );
      const notification = await Notification.findById(req.params.id);
      if (!notification)
        return res.status(404).json({ error: 'Notification not found.' });
      notification.read = true;
      await notification.save();
      return res.status(200).json(notification);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export default new NotificationController();
