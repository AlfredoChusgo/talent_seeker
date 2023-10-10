import { Request, Response, NextFunction } from 'express';

function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    const isDevelopment = process.env.NODE_ENV === 'development'; //todo

    // Customize error responses based on the environment
    if (isDevelopment) {
      // In development mode, display detailed error information
      res.status(500).json({
        error: {
          message: err.message,
          stack: err.stack,
        },
      });
    } else {
      // In production mode, provide a generic error response
      res.status(500).json({
        error: {
          message: 'Something went wrong. Please try again later.',
        },
      });
    }
}

export default errorHandler;
