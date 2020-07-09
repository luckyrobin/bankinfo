'use strict';

const HttpController = require('./base/http');
const path = require('path');
const fs = require('mz/fs');
const pump = require('mz-modules/pump');

class TemplateController extends HttpController {
  async create() {
    const { request, service, HttpError } = this.ctx;
    const { userId } = request;

    try {
      const file = request.files[0];
      if (!file) return new HttpError('上传失败', '', 404);

      const filename = path.basename(file.filename);
      const targetPath = path.join(this.config.baseDir, 'app/public/static', filename);
      const source = fs.createReadStream(file.filepath);
      const target = fs.createWriteStream(targetPath);
      await pump(source, target);

      const info = await service.template.updateOne({
        url: `/public/static/${filename}`,
        name: filename,
        operator: userId,
      });
      this.success({
        data: info,
      });
    } catch (err) {
      this.fail({
        status: err.status,
        code: err.code,
        msg: err.message,
      });
    } finally {
      // delete those request tmp files
      await this.ctx.cleanupRequestFiles();
    }
  }

  async index() {
    const { service } = this.ctx;
    try {
      const resp = await service.template.find();
      this.success({
        data: resp,
      });
    } catch (err) {
      this.fail({
        status: err.status,
        code: err.code,
        msg: err.message,
      });
    }
  }

  async destroy() {
    const { params, service } = this.ctx;
    try {
      const resp = await service.template.delete(params.id);
      this.success({
        data: {
          _id: resp._id,
        },
      });
    } catch (err) {
      this.fail({
        status: err.status,
        code: err.code,
        msg: err.message,
      });
    }
  }
}

module.exports = TemplateController;
