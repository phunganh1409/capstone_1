import { BadRequestException } from "../common/helper/exception.helper";
import prisma from "../common/prisma/init.prisma"

const userService = {
    getUser: async (req) =>{
        const userId = req.user.id
        const user = prisma.users.findUnique({
            where:{
                id:userId
            },
            select:{
                id:true,
                email:true,
                ho_ten:true,
                anh_dai_dien:true,
                createdAt:true
            }
        });
        return user


    },
    getSaveUser: async (req) =>{
        const user_id = req.user.id
        console.log(user_id)
     const userSaveImage = await  prisma.save_Image.findMany({
            where:{ nguoi_dung_id: user_id },
            include: {Image:true}
        })
        return userSaveImage
    },
    getCreateImage: async (req) =>{
        const user_id = req.user.id
        console.log(user_id)
    const getUser =  await prisma.image.findMany({
            where:{
                user_id:user_id
            },
            include:{
                Users:{
                    select:{
                        id:true,
                        ho_ten:true,
                        email: true
                    }
                }
            }
        })
        return getUser
    },
    deleteImage: async (req) =>{
    const {imageId} = req.params
    console.log(imageId)
    if(isNaN(imageId)) throw new BadRequestException("ID ảnh không hợp lệ")
   const image = await prisma.image.findUnique({
          where:{
            id:Number(imageId)
          }

    })
    if(!image) throw new BadRequestException("Ảnh không tồn tại")
  const delete_image = await prisma.image.delete({
        where:{
            id:Number(imageId)
        }
    })
    return  delete_image
    },
    createImage: async (req) =>{
        const user_id = req.user.id
        const {ten_hinh,mo_ta,duong_dan} = req.body
        console.log(user_id,ten_hinh,mo_ta, duong_dan)
    if(!ten_hinh || !mo_ta || !duong_dan) throw new BadRequestException("Tên ảnh và mô tả không được để trống")
      const imageCreate = await prisma.image.create({
          data:{
            ten_hinh:ten_hinh,
            mo_ta:mo_ta,
            duong_dan:duong_dan,
            user_id: user_id
          }
    })
    return  {"thông tin tạo ảnh": imageCreate}
    },
    createInfo: async (req)=>{
        const {ho_ten, email,mat_khau,anh_dai_dien,tuoi} = req.body
        const user_id = req.user.id
        if(!ho_ten && !email && !mat_khau && !anh_dai_dien && !tuoi) throw new BadRequestException("Không có thông tin nào được cung cấp để cập nhật")
      const user_info = await prisma.users.update({
              where:{
                id:user_id
              },
              data:{
                ho_ten : ho_ten,
                email: email,
                mat_khau: mat_khau,
                anh_dai_dien: anh_dai_dien,
                tuoi: tuoi
              }
        })
        return {"thông tin tạo người dùng": user_info}
        
    }
}


export default userService