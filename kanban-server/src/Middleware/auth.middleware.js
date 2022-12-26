import jwt from 'jsonwebtoken';

/**
 * verify the token is valid or not and 
 * add the `user` payload to the request as `req.user`
 */ 
const verifyToken = (request, response, next) => {
  let token = request.headers['authorization'];
  // console.log(token);
  if (!token) {
    return response.status(401).json({
      message: 'Access Denied / Unauthorized request',
    });
  }
  try {
    token = token.split(' ')[1]; // Remove the Bearer from the token
    if (token == null || !token) {
      return response.status(401).json({
        message: 'Access Denied / Unauthorized request',
      });
    }

    let verifiedUser = jwt.verify(token, process.env.JWT_SECRET);

    if (!verifiedUser) {
      return response.status(401).json({
        message: 'Access Denied / Unauthorized request',
      });
    }

    request.user = verifiedUser;
    next();
  } catch (error) {
    response.status(400).json({
      message: 'Invalid Token',
    });
  }
};

module.exports = {
  verifyToken,
};
