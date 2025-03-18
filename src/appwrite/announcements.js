import db from '../assets/databases';
import { Query } from 'appwrite';

export const init = async (setAnnouncementCard) => {
  const result = await db.announcement.list([Query.orderDesc('$createdAt')]);
  setAnnouncementCard(result.documents);
};

export default init;
