import { fileURLToPath } from "url";
import { dirname } from "path";

import multer from "multer";


let __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

///////////////////////////////////////////////////////////

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Verificar el tipo de archivo y asignar el destino adecuado
    
    if (file.fieldname === 'profile') {      
      cb(null, `${__dirname}/public/images/profiles`);
    } else if (file.fieldname === 'document') {
      cb(null, `${__dirname}/public/images/documents/`);
    } else {
      // Si no coincide con "profile" ni "document", se asume que es para "product"
      cb(null,  `${__dirname}/public/images/products/`);
    }
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

export default __dirname;

export const uploadDocuments = multer({ storage});




