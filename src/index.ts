import express from 'express';

import { serverConfig, logger } from './config';

const app = express();

app.listen(serverConfig.PORT, () => {
    logger.info(`Server is running on PORT: ${serverConfig.PORT}`);
});