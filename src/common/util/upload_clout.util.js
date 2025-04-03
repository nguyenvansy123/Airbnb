import { v2 as cloudinary } from 'cloudinary';


export const uploadCloud = async (file) => {
    cloudinary.config({
        cloud_name: 'doi8u1atp',
        api_key: '578316273641252',
        api_secret: 'wPcKu2_LfhtbCZC6UKZnaWNTKZk' // Click 'View API Keys' above to copy your API secret
    });

    const uploadResult = await new Promise((resolve) => {
        cloudinary.uploader
            .upload_stream(
                { folder: "images" },
                (error, uploadResult) => { return resolve(uploadResult); })
            .end(file.buffer);
    });

    return uploadResult.secure_url;
}