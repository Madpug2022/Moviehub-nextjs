import { v2 as cloudinary } from "cloudinary";



export const deleteImage = async (publicId: string) => {
    return await cloudinary.uploader.destroy(publicId)
}
