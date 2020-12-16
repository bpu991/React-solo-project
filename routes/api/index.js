const router = require('express').Router();

const routes = ['users', 'session', 'aws', 'csrf', 'explore', 'photos', 'comments', 'search'];

for (let route of routes) {
  router.use(`/${route}`, require(`./${route}`));
}

module.exports = router;
