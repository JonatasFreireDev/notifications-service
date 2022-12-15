import { Content } from '@app/entities/content';
import { INotifications, Notification } from '@app/entities/notification';

type Override = Partial<INotifications>;

export function makeNotification(override: Override = {}) {
  return new Notification({
    category: 'social',
    content: new Content('Nova Solicitação de amizade!'),
    recipientId: 'example',
    ...override,
  });
}
