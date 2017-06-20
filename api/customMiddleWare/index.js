module.exports = (() => {
  const validateNewUser = (req, res, next) => {
    if (req.body.password.length < 8 || req.body.valPassword !== req.body.password) {
      res.json({success: false, error: 'Please Check Inputs'});
    } else {
      next();
    }
  };

  const userPermission = (req, res, next) => {
    if (req.isAuthenticated()) {
      next();
    } else {
      res.json({success:false, error: 'Not Logged In'});
    }
  };

  return {
    validateNewUser,
    userPermission
  };
})();