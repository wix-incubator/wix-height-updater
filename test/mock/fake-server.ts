import * as express from 'express';
import * as session from 'express-session';
import {renderVM} from './vm';

export function start(port = 3000) {
  const app = express();

  app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  }));

  app.use('/iframeContainer', (req, res) => {
    res.send(renderVM('./src/iframeContainer.vm', {}));
  });

  app.use('/', (req, res) => {
    if (!req.session.visitCount) {
      req.session.visitCount = 0;
    }

    req.session.visitCount++;

    res.send(renderVM('./src/index.vm', {
      visitCount: req.session.visitCount
    }));
  });

  return app.listen(port, () => {
    console.log(`Fake server is running on port ${port}`);
  });
}
