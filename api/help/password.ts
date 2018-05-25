import * as crypto from 'crypto';

import { randomHex } from './util';

const SAULT_LENGTH = 64;

export function generate_sault(seed: string = '') {
  return `${seed}${randomHex(SAULT_LENGTH)}`;
}

export function hash_keys(...keys: string[]): string {
  const hash = crypto.createHash('sha256');
  hash.update(keys.join(''));

  return hash.digest('hex');
}

export function hash_password(userId: string, sault: string, password: string): string {

  return hash_keys(userId, sault, password);
}

export function valid_password(
  userId: string,
  loginName: string,
  loginPassword: string,
  sault: string,
  password: string,
): boolean {
  const hashedPassword = hash_keys(userId, sault, loginPassword);

  // tslint:disable-next-line:possible-timing-attack
  return hashedPassword === password;
}
