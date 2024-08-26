import { PORT } from "./config/envs";
import server from "./server";
import "reflect-metadata";
import { AppDataSource } from "./config/data-source";

AppDataSource.initialize().then((res) => {
    console.log("Conexión realizada con éxito");
    server.listen(PORT, () => {
        console.log(`Server listening on PORT ${PORT}`);
    });
});
