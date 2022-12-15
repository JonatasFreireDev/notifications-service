import { CreateNotificationBody } from '../dtos/create-notification-body';
import { Controller, Post, Body } from '@nestjs/common';
import { SendNotification } from 'src/app/use-cases/send-notification';
import { NotificationViewModel } from '../view-models/notification-view-models';

@Controller('notifications')
export class NotificationsController {
  constructor(private sendNotification: SendNotification) {}

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { recipientId, content, category } = body;

    const { notification } = await this.sendNotification.execute({
      category,
      content,
      recipientId,
    });

    return { notification: NotificationViewModel.toHTTP(notification) };
  }
}
