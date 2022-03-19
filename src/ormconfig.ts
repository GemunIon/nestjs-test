import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";
import { DataSource } from "typeorm";

import { ns } from "./common/constants";

import { AuthEntity } from "./auth/auth.entity";
import { UserEntity } from "./user/user.entity";
import { TokenEntity } from "./token/token.entity";

import { CreateSchema1561991006215 } from "./migrations/1561991006215-create-schema";
import { CreateUserTable1562222612033 } from "./migrations/1562222612033-create-user-table";
import { SeedUserTable1563804021014 } from "./migrations/1563804021014-seed-user-table";
import { CreateTokenTable1570556116332 } from "./migrations/1570556116332-create-token-table";
import { CreateAuthTable1572880566396 } from "./migrations/1572880566396-create-auth-table";

// Check typeORM documentation for more information.
const config: PostgresConnectionOptions = {
  name: "default",
  type: "postgres",
  url: process.env.POSTGRES_URL,
  entities: [AuthEntity, TokenEntity, UserEntity],
  // We are using migrations, synchronize should be set to false.
  synchronize: false,
  // Run migrations automatically,
  // you can disable this if you prefer running migration manually.
  // migrationsRun: process.env.NODE_ENV !== "production",
  migrationsRun: true,
  migrationsTableName: ns,
  migrationsTransactionMode: "each",
  namingStrategy: new SnakeNamingStrategy(),
  logging: process.env.NODE_ENV === "development",
  // Allow both start:prod and start:dev to use migrations
  // __dirname is either dist or server folder, meaning either
  // the compiled js in prod or the ts in dev.
  migrations: [
    CreateSchema1561991006215,
    CreateUserTable1562222612033,
    SeedUserTable1563804021014,
    CreateTokenTable1570556116332,
    CreateAuthTable1572880566396,
  ],
  cli: {
    // Location of migration should be inside server folder
    // to be compiled into dist/ folder.
    migrationsDir: "server/migrations",
  },
};

export default config;

export const dataSource = new DataSource(config);
