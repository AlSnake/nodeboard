import { Server } from './Server';
import { Config } from './config/Config';
import { Logger } from './core/logger';

const server = new Server();

server.listen(3000, () => {
	Logger.info('Listening on Port: %d', 3000);
});

// server.close();

process.on('unhandledRejection', (reason: Error) => {
	Logger.error('Unhandled Promise Rejection: reason:', reason.message);
	Logger.error(reason.stack);
});
