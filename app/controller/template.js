'use strict';

const HttpController = require('./base/http');
const path = require('path');
// const { Readable } = require('stream');
const fs = require('mz/fs');
const pump = require('mz-modules/pump');
const createReport = require('docx-templates').default;
const JSZip = require('jszip');

const cmdDelimiter = [ '{', '}' ];
const staticPath = '/public/static';

// function bufferToStream(binary) {
//   const readableInstanceStream = new Readable({
//     read() {
//       this.push(binary);
//       this.push(null);
//     },
//   });
//   return readableInstanceStream;
// }

class TemplateController extends HttpController {
  async create() {
    const { request, service, HttpError } = this.ctx;
    const { userId } = request;

    try {
      const file = request.files[0];
      if (!file) return new HttpError('上传失败', '', 404);

      const filename = path.basename(file.filename);
      const targetPath = path.join(this.config.baseDir, `app/${staticPath}`, filename);
      const source = fs.createReadStream(file.filepath);
      const target = fs.createWriteStream(targetPath);
      await pump(source, target);

      const info = await service.template.updateOne({
        url: `${staticPath}/${filename}`,
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

  async print() {
    const { request, service, params, HttpError } = this.ctx;
    const body = request.body;

    try {
      const { templates } = body;
      const info = await service.customer.findById(params.id);
      const zip = new JSZip();
      if (!Array.isArray(templates) || templates.length === 0) throw new HttpError('未选择模板');

      await Promise.all(templates.map(async fileName => {
        const template = fs.readFileSync(path.join(this.config.baseDir, `app/${staticPath}`, fileName));
        const buffer = await createReport({
          cmdDelimiter,
          template,
          data: {
            d: info,
          },
        });
        return new Promise(resolve => {
          zip.file(`${info.customer_name}/${fileName}`, buffer);
          resolve();
        });
      }));

      const nodeStream = await zip.generateNodeStream({ streamFiles: true });
      this.download(`${info.customer_name}.zip`, nodeStream);
    } catch (err) {
      this.fail({
        status: err.status,
        code: err.code,
        msg: err.message,
      });
    }
  }

  async download(filename, stream) {
    this.ctx.attachment(encodeURIComponent(filename));
    this.ctx.set('Content-Type', 'application/octet-stream');
    this.ctx.body = stream;
  }
}

module.exports = TemplateController;
