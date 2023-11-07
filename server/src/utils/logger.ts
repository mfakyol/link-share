import fs from 'fs';
import path from 'path';
import util from 'util';
import config from '../config';

function logToFile(log: string, type: 'error' | 'information') {
  const date = new Date();
  log = `${date}:${log}`
  const dateString = date.toISOString().split('T')[0];
  const logDir = path.join(`${__dirname}`, '..', '..', `/logs/${type}`);
  if (!fs.existsSync(logDir)) fs.mkdirSync(logDir, { recursive: true });
  const file = `${logDir}/${dateString}.log`;
  const data = `${util.format(log)}\r\n`;
  const options = { flag: 'a+' };
  fs.writeFile(file, data, options, (err) => {
    if (err) console.log(err);
  });

  if (config.BUILD == 'development') console.log(`[${type}]: ${log}`);
}

function error(log: string) {
  logToFile(log, 'error');
}

function information(log: string) {
  logToFile(log, 'information');
}

const logger = {
  error,
  information,
};

export default logger;
