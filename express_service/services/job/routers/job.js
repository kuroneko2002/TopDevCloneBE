const express = require(`express`);
const auth = require('../middlewares/auth');
const { JobTransport } = require('../transports');
const jobRouter = express.Router();
const transport = new JobTransport();

jobRouter.get('/', transport.listJobByConditions);
jobRouter.patch('/approveMany', auth, transport.approveMany);
jobRouter.delete('/refuseMany', auth, transport.refuseMany);
jobRouter.patch('/:id/approve', auth, transport.approveJob);
jobRouter.delete('/:id/refuse', auth, transport.refuseJob);
jobRouter.get('/:id', auth, transport.findJob);
jobRouter.patch('/:id', auth, transport.updateJob);
jobRouter.post('/', auth, transport.createJob);
jobRouter.get('/admin/all', auth, transport.listAllJob);

module.exports = jobRouter;
