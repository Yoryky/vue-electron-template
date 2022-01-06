//import log from 'electron-log';
import os from 'os';
import electron from 'electron';

export function initLogsConfig() {
  //log.transports.file.file = electron.remote.app.getAppPath() + '/logs/safebox_client.log';
}

export function logInfo(tag: any, message: any) {
  //log.info(tag + ' : ' + message);
}


export function getOsArch(): string {
  const archData = os.arch();
  return archData;
}

export function getLogDir() {
  const logDir = electron.remote.app.getAppPath() + '/logs/';
  return logDir;
}



export function extractParentDirectoryPath(
  dirPath: string,
  dirSeparator: string // = AppConfig.dirSeparator
) {
  if (!dirPath) return;
  let path = dirPath;
  if (path.endsWith(dirSeparator)) {
    path = path.substring(0, path.lastIndexOf(dirSeparator));
  }
  const lastIndex = path.lastIndexOf(dirSeparator);
  if (lastIndex !== -1) {
    return path.substring(0, lastIndex);
  }
  // return root dir in cases that dirPath not start with dirSeparator (AWS)
  return '';
}
