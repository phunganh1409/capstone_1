import jwt from "jsonwebtoken";
import { BadRequestException, UnAuthorizad } from "../helper/exception.helper";
import { TOKEN_SECRET } from "../constant/app.constant";
import prisma from "../prisma/init.prisma";

export const protect = async (req, res, next) => {
   try {
    const bearerToken = req.headers.authorization;

    if (!bearerToken || !bearerToken.startsWith("Bearer ")) {
      throw new UnAuthorizad("Bạn không có quyền truy cập");
    }

    const token = bearerToken.split(" ")[1];
    console.log({ token });
    const decode = jwt.verify(token, TOKEN_SECRET);

    const user = await prisma.users.findUnique({
      where: { id: decode.userId },
    });

    if (!user) {
      throw new UnAuthorizad("Người dùng không tồn tại");
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }

}
export default protect;