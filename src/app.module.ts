import { Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { BookmarkModule } from './bookmark/bookmark.module';
import { UserModule } from './user/user.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [AuthModule, UserModule, BookmarkModule],
})
export class AppModule {}
