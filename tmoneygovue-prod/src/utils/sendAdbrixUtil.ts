import { getAppBridge } from '@/utils';

export const sendAdbrix = async (id: string) => {
  const appBridge = await getAppBridge();
  appBridge.sendAdbrix({ eventId: id });
};
