'use strict';

module.exports = app => (
  class DropTask extends app.Subscription {
    static get schedule() {
      return {
        type: 'worker',
        cron: '0 59 23 * * *',
      };
    }

    async subscribe() {
      this.ctx.logger.info(`run schedule task: time -> ${new Date()}`);
      try {
        const { service } = this.ctx;
        await service.customer.drop();
      } catch (err) {
        this.ctx.logger.error(`schedule task: ${err}`);
      }
    }
  }
);
