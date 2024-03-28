import PayloadFactory from './LoginForm.js';

export class DefaultPayloadFactory extends PayloadFactory {
    createPayload(phone, password) {
      return {
        phone,
        password
      };
    }
  }