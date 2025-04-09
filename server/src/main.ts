import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import * as express from "express";
import { join } from "path";

(async function start() {
    const app = await NestFactory.create(AppModule, { cors: true });
    const config = new DocumentBuilder().setTitle("Traceability API").setDescription("API Document for Traceability").setVersion("1.0").build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("api", app, document);
    app.use("/public", express.static(join(__dirname, "..", "public")));
    app.useGlobalPipes(new ValidationPipe());
    app.setGlobalPrefix("api/v1");
    await app.listen(5000);
})();
