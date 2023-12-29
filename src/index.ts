import { resolve } from 'path';
import { LogType, Logger } from './common/services/logger';
import { apiBuilder } from './api/APIBuilder';
import { config } from './common/config/main';

// LOGGER CONFIGURATION ----------
Logger.configure((type) => {
  if (type === LogType.API) return 'api.log';
  if (type === LogType.BUSINESS) return 'business.log';
  if (type === LogType.DB) return 'database.log';
  return 'other.log';
});

Logger.setModule('API');

Logger.setFolder(resolve(config.logsFolder, String(Date.now())));

// API RUN ------------------------
apiBuilder.build();
