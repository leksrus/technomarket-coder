import { ServerApplication } from "@application/server.application";

async function bootstrap(): Promise<void> {
  const app: ServerApplication = new ServerApplication();

  await app.run();
}

bootstrap();

