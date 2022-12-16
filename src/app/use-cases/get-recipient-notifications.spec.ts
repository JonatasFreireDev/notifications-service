import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { CountRecipientNotification } from './count-recipient-notifications';
import { GetRecipientNotification } from './get-recipient-notifications';

describe('Get recipient notifications', () => {
  it('should be able to get recipient notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const getRecipientNotifications = new GetRecipientNotification(
      notificationsRepository,
    );

    await notificationsRepository.create(
      makeNotification({
        recipientId: 'recipient-1',
      }),
    );

    await notificationsRepository.create(
      makeNotification({
        recipientId: 'recipient-1',
      }),
    );

    await notificationsRepository.create(
      makeNotification({
        recipientId: 'recipient-2',
      }),
    );

    const { notifications } = await getRecipientNotifications.execute({
      recipientId: 'example',
    });

    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(
      expect(
        expect.arrayContaining([
          expect.objectContaining({ recipientId: 'recipient-1' }),
          expect.objectContaining({ recipientId: 'recipient-1' }),
        ]),
      ),
    );
  });
});
