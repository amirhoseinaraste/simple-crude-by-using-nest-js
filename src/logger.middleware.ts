import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {

  private logger = new Logger('HTTP');

  use(req: Request,
     res: Response,
    next: () => void) {
    
    const { ip, method, baseUrl } = req;
    const userAgent = req.get('user-agent') || '';
    const startTime = process.hrtime();

    res.on('finish', () => {
      const { statusCode } = res;
      const contentLength = res.get('content-length') || '0';
      const dif = process.hrtime(startTime);
      const responseTimeStr = `${dif[0] * 1e3 + dif[1] / 1e6}ms`;
      this.logger.log(`Incoming request: ${method} ${baseUrl} ${statusCode} ${contentLength} - Response Time: ${responseTimeStr} from ${ip} - User Agent: ${userAgent} `);
    });
     
    next();

  }

}
