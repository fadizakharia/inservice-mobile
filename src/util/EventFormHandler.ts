export default async (
  eventId: string,
  action: string,
  updateEvent: any,
  type?: string
) => {
  await updateEvent({ eventId, action });
};
