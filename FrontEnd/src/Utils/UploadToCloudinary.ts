export const UploadToCloudinary = async (pics: File) => {
   
    const cloudName = `${process.env.REACT_APP_CLOUDNAME}`
    const uploadPreset =`${process.env.REACT_APP_UPLOAD_PRESET}`
  
   
    if (!pics || !(pics instanceof File)) {
      throw new Error("Invalid input: 'pics' must be a File object.");
    }
  
    const formData = new FormData();
    formData.append("file", pics);
    formData.append("upload_preset", uploadPreset);
    formData.append("cloud_name", cloudName);
  
    try {
      const response = await fetch("https://api.cloudinary.com/v1_1/" + cloudName + "/upload", {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error("Upload failed with status: " + response.status);
      }
  
      const data = await response.json();
      return data.url; // Return the uploaded file's URL
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
      throw error; // Re-throw the error for handling in the calling code
    }
  };