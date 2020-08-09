import { Op } from "sequelize";
import dayjs from 'dayjs'
import Url from '../model/Url'

const expireData = async () => {
  const result = await Url.destroy({
    where: {
      expiredAt: { [Op.lt]: dayjs().toISOString() },
    },
  });
};

setInterval(() => {
  expireData()
}, 1000 * 60 * 60)
