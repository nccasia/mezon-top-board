import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export const configSwagger = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle("Mezon top board")
    .setDescription("Mezon top board's API definition")
    .setVersion("1.0")
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document, {
    swaggerOptions: { persistAuthorizationL: true },
  });
};
