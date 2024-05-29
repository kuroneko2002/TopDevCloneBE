const { AbstractAggregate } = require('node-cqrs');
const ApplyJob = require('./handlers/apply');

class ApplicationAggregate extends AbstractAggregate {
    static get handles() {
        return ['createApplication'];
      }
    
      async createApplication(commandPayload) {
        const { data } = commandPayload;
        const application = await ApplyJob(data);
        this.emit('applicationCreated', { data: application });
      }
}

// class ApplicationProjection extends AbstractProjection {
//     static get handles() {
//         return ['applicationCreated'];
//     }
    
//     async applicationCreated(eventPayload) {
//         const { data } = eventPayload;
//         console.log('Application created:', data);
//     }
// }

module.exports = ApplicationAggregate;
