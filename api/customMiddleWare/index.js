module.exports = (() => {
  const validateNewUser = (req, res, next) => {
    console.log('Validating');
    if (req.body.username.length < 8 || req.body.password.length < 8 || req.body.passVerif !== req.body.password) {
      res.json({failed: 'Please Check Inputs'});
    } else {
      next();
    }
  };

  const userPermission = (req, res, next) => {
    if (req.username === req.body.username) {
      next();
    } else {
      res.json({failed: 'Please Login'});
    }
  };

  return {
    validateNewUser,
    userPermission
  };
})();