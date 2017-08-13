const { Board, User, Card, BoardUser } = require('../../models');

module.exports = (() => {
  const validateNewUser = (req, res, next) => {
    if (req.body.password.length < 8 || req.body.valPassword !== req.body.password) {
      res.json({success: false, error: 'Please Check Inputs'});
    } else {
      next();
    }
  };

  const hasAccess = (req, res, next) => {
    if (req.isAuthenticated()) {
      next();
    } else {
      res.json({success:false, error: 'Not Logged In'});
    }
  };

  const cardPermission = (req, res, next) => {
    User.findOne({
      where: {
        email: req.user.email
      },
      include: {
        model: Board,
        include: [
        {
          all: true
        }]
      }
    })
      .then(user => {
        const userBoards = user.toJSON().Boards;
        Card.findOne({
          where: {
            id: req.params.id
          }
        })
          .then(card => {
            if (userBoards
              .filter(board =>
                (board.BoardUser.permission === 'Owner' ||
                board.BoardUser.permission === 'Worker') &&
                board.id === card.toJSON().attachedTo
              ).length === 1) {
              next();
            } else {
              res.json({success:false, error: 'In-Sufficient Permission'});
            }
          });
      });
  };

  const boardAccess = (req, res, next) => {
    BoardUser.findOne({
      where: {
        BoardId: req.params.boardID,
        UserEmail: req.user.email
      }
    })
      .then(boardUser => {
        if(boardUser !== null) {
          next();
        } else {
          res.json({success:false, error: 'In-Sufficient Permission'});
        }
      });
  };
  const boardPermission = (req, res, next) => {
    BoardUser.findOne({
      where: {
        BoardId: req.params.boardID,
        UserEmail: req.user.email
      }
    })
      .then(boardUser => {
        if(boardUser !== null &&
          boardUser.permission === 'Owner') {
          next();
        } else {
          res.json({success:false, error: 'In-Sufficient Permission'});
        }
      });
  };

  const postPermission = (req, res, next) => {
    BoardUser.findOne({
      where: {
        BoardId: req.body.attachedTo,
        UserEmail: req.user.email
      }
    })
      .then(boardUser => {
        if(boardUser !== null &&
          (boardUser.permission === 'Owner' ||
           boardUser.permission === 'Worker'
           )) {
          next();
        } else {
          res.json({success:false, error: 'In-Sufficient Permission'});
        }
      });
  };

  return {
    validateNewUser,
    hasAccess,
    cardPermission,
    boardAccess,
    boardPermission,
    postPermission
  };
})();