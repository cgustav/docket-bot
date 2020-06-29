import { Controller, Post, Body } from '@nestjs/common';
import { DockerWebhookDTO } from './webhook.dto';
import { WebhooksService } from './webhooks.service';

@Controller('/docker/hooks')
export class WebhooksController {
  constructor(private webhookService: WebhooksService) {}

  @Post('repository')
  async hook(@Body() webhook: DockerWebhookDTO) {
    this.webhookService.notifyDockerWebhook(webhook);

    return {
      state: 'success',
      description: 'Docker activity DELIVERED',
      context: 'Docket-bot Services',
      //   target_url: 'http://ci.acme.com/results/afd339c1c3d27',
    };
  }

  @Post('test')
  async dockerTest(@Body() body) {
    let message = await this.webhookService.testDockerWebhook();
    return {
      message,
    };
  }
}
