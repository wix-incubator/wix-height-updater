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
    res.send(renderVM('./test/app/iframeContainer.vm', {}));
  });

  app.use('/usingBundle', (req, res) => {
    res.send(renderVM('./test/app/usingBundle.vm', {}));
  });

  app.use('/', (req, res) => {
    if (!req.session.visitCount) {
      req.session.visitCount = 0;
    }

    req.session.visitCount++;

    res.send(renderVM('./test/app/index.vm', {
      visitCount: req.session.visitCount
    }));
  });

  return app.listen(port, () => {
    // console.log(`Fake server is running on port ${port}`);
  });
}
