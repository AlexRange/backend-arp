import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import express, {Application} from 'express';
import authRoutes from './routes/authRoutes';
/*
* Clase de inicio de nuestra aplicacion NodeJsExpress
* Autor: Alejandro Rangel Perez
* Fecha: 28 Febrero 2024
*/
class Server {
private app: Application;

//Inicializa clase
constructor() {
    this.app = express();
    this.config();
    this.routes();
    this.app.listen(this.app.get("port"), () => {
      console.log("Server on port", this.app.get("port"));
  });      
}
//Configuracion de modulos
 
config(): void {
      // configuración del puerto para el servidor
      this.app.set("port", 3000);
     
      // muestra las peticiones en consola
      this.app.use(morgan("dev"));
 
      // puertos de conexión de la API
      this.app.use(cors());
 
      // solo se permiten peticiones en formato JSON
      this.app.use(bodyParser.json());
      this.app.use(bodyParser.urlencoded({extended: false,}),)
  }

//Configura Las rutas
routes() {
  this.app.use("/",authRoutes);
    }
}
const server = new Server();
