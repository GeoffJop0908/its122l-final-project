import db from '../assets/databases';
import { Query } from 'appwrite';

export const init = async (setAnnouncementCard, setIsLoading) => {
  const result = await db.announcement.list([Query.orderDesc('$createdAt')]);
  setAnnouncementCard(result.documents);
  setIsLoading(false);
};

export default init;
