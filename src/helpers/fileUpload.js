

export const fileUpload = async (file) => {
  
  const cloudUrl = 'https://api.cloudinary.com/v1_1/du9fag77u/upload';

  // creando FormData
  const formData = new FormData();

  // agregando los datos
  formData.append('upload_preset', 'react-journal');
  formData.append('file', file);

  try {
    
    // simulando el fetch como postman
    const resp = await fetch(cloudUrl, {
      method: 'POST',
      body: formData
    });

    if (resp.ok) {
      const cloudResp = await resp.json();
      return cloudResp.secure_url;

    } else {

      return null;
      // throw await resp.json(); // se modifica por los tests
    }

  } catch (error) {
    throw error
  }

}