import cloudinary from 'cloudinary';

import { fileUpload } from "../../helpers/fileUpload";


cloudinary.config({ 
  cloud_name: 'du9fag77u', 
  api_key: '783684827699854', 
  api_secret: 'YoEFqPyJQAPgHioFOh6aFpe36fU' 
});

describe('Test in helper fileUpload', () => {
  
  test('should load a file and return the url', async (done) => {
    
    // se obtiene la imagen mediante un URL valida
    const resp = await fetch('https://i0.wp.com/www.silocreativo.com/wp-content/uploads/2017/12/visual-code-portada.png?fit=666%2C370&quality=100&strip=all&ssl=1');

    // se crea un blob en base a la resp
    const blob = await resp.blob();

    // se crea la variable file con su data
    const file = new File([blob], 'foto.png');

    // se envia el url ya personalizado a la funcion
    const url = await fileUpload(file);
    
    expect(typeof url).toBe('string');
    expect(url.includes('https:/')).toBe(true);
    
    // borrar la imagen y obtener su id
    const segments = url.split('/');

    // con el metodo replace se asegura de solo tener el id de la imagen
    const imageId = segments[segments.length - 1].replace('.png', '');
    

    cloudinary.v2.api.delete_resources(imageId, {}, () => {
      done();
    })
  });

  test('should return error', async () => {
    
    const file = new File([], 'foto.png');
    const url = await fileUpload(file);

    expect(url).toBe(null);
  });
  
  
})
