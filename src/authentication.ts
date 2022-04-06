import { AppknitSDK, SdkAuthenticationCredentialType, SdkIntegrationConfiguration } from 'appknit-platform-sdk-v2';

export const AuthenticationHandler = (
  sdk: AppknitSDK,
  credentialType: SdkAuthenticationCredentialType,
  credential: any,
): Promise<any> => {
  let secret: string;
  if (credential && credentialType == SdkAuthenticationCredentialType.custom) {
    secret = `${credential.username}:${credential.password}`;
    secret = Buffer.from(secret, 'utf-8').toString('base64');
  }
  return Promise.resolve(true);
};

export const AuthenticationModel: SdkIntegrationConfiguration = {
  endPoint: {
    title: 'Service End Point URL',
    type: 'string',
    required: ['true'],
  },
  username: {
    title: 'Username',
    type: 'string',
    required: ['true'],
  },
  password: {
    title: 'Password',
    type: 'string',
    required: ['true'],
  },
};
