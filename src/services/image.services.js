import { decode } from "jsonwebtoken";
import { BadRequestException, ErrorHandle, UnAuthorizad } from "../common/helper/exception.helper";
import prisma from "../common/prisma/init.prisma"
import tokenService from "./token.services";

const imageServices = {
    getImage: async (req) => {
        const images = await prisma.image.findMany({
  orderBy: {
    createdAt: 'desc',
  },
  select: {
    id: true,
    duong_dan: true,  
    user_id: true,
    createdAt: true,
    Users: {
      select: {
        id: true,
        ho_ten: true,  
        email: true
      }
    }
  }
});
        return images;
    },
    searchImage: async (req) => {
      const {ten_hinh} = req.query;
      console.log(ten_hinh)
    const search = await prisma.image.findMany({
            where: {
                ten_hinh: {
                    contains: ten_hinh,
                    // mode: "insensitive"
                }
            },
            orderBy: {
                createdAt: "desc"
            },
            select: {
                id: true,
                duong_dan: true,
                ten_hinh: true,
                user_id: true,
                createdAt: true,
                Users: {
                    select: {
                        id: true,
                        ho_ten: true,
                        email: true
                    }
                }
            }
    });
      return search;
    },
    getImageById: async (req)=>{
       const id = Number(req.params.id);
       if(isNaN(id)) throw new BadRequestException('ID không hợp lệ');

       const image = await prisma.image.findUnique({
        where: { id:id },
        include: {
          Users: {
           select: {
             id: true,
             ho_ten: true,
             email: true,
             anh_dai_dien: true,
        },
      },
    },
  });

  if(!image) throw new ErrorHandle( 'Không tìm thấy ảnh');

  return image;
    },
    commentById: async (req) => {
        const { id } = req.params;
        const imageId = Number(id);
        if (isNaN(imageId)) throw new BadRequestException("ID ảnh không hợp lệ");

       const comments = await prisma.comment.findMany({
          where: { hinh_id: imageId },
          include: {
             Users: {
              select: {
               id: true,
               ho_ten: true,
               email: true,
               anh_dai_dien: true,
        },
      },
    },
  });

  return comments;
    },
    checkImageSave: async (req) => {
      const { id } = req.params
      const imageId = Number(id);
      if (isNaN(imageId)) throw new BadRequestException("ID ảnh không hợp lệ");
      
      const nguoiDungId = req.user.id;
      if (!req.user || !req.user.id) throw new UnAuthorizad("Người dùng chưa xác thực");
      const token = req.headers.authorization;
      if (!token) throw new BadRequestException("Bạn chưa đăng nhập");
      const isSave = await prisma.save_Image.findFirst({
        where:{
          hinh_id: imageId,
          nguoi_dung_id: nguoiDungId, 
        }
      });
      console.log(isSave)
      return {isSave: !!isSave};
    },
    createComment: async (req) => {
      const userId = req.user.id;
  const { hinh_id, noi_dung } = req.body;

  console.log("hinh_id:", hinh_id);
  console.log("noi_dung:", noi_dung);
  console.log("userId:", userId);

  if (
    !hinh_id ||
    isNaN(Number(hinh_id)) ||
    !noi_dung || !noi_dung.trim() ||
    !userId
  ) {
    throw new BadRequestException("Thiếu thông tin bình luận");
  }

  const image = await prisma.image.findUnique({
    where: {
      id: Number(hinh_id),
    },
  });

  if (!image) throw new BadRequestException("Ảnh không tồn tại");

  const comment = await prisma.comment.create({
    data: {
      hinh_id: Number(hinh_id),
      noi_dung,
      user_id: userId,
      
    },
    include: {
      Users: {
        select:{
          id:true
        }
      }
    },
  });

  return comment;
    }
}

export default imageServices