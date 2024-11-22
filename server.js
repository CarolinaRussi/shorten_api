import express from "express";
import urlRoutes from "./routes/urls.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());
app.use("/", urlRoutes);

if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.SERVER_PORT || 8800;
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}

export default app;