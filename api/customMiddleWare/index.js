module.exports = (() => {
  const validateNewUser = (req, res, next) => {
    if (req.body.username.length < 8 || req.body.password.length < 8 || req.body.passVerif !== req.body.password) {
      res.json({failed: 'Please Check Inputs'});
    } else {
      next();
    }
  };

  const userPermission = (req, res, next) => {
    if (req.isAuthenticated()) {
      next();
    } else {
      res.status(401).json({failed: 'Please Login'});
    }
  };

  return {
    validateNewUser,
    userPermission
  };
})();