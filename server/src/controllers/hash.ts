import { Request } from "express";
import {createHash} from 'crypto'

const UNKNOWN = "???";

export function calculateHashId(req: Request): string {
  const remoteAddress = req.socket.remoteAddress;
  if (remoteAddress === undefined) {
    return UNKNOWN;
  }
  const hasher = createHash('md5');
  hasher.update(remoteAddress);
  hasher.update(new Date().toDateString());
  return hasher.digest().toString('base64').substring(0, 8);  // todo: add device signature digit?
}
