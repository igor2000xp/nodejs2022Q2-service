import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ArtistModule } from './artist/artist.module';
import { TrackModule } from './track/track.module';
import { AlbumModule } from './album/album.module';
import { FavsModule } from './favs/favs.module';
import { AuthModule } from './auth/auth.module';
// import { LoggingService } from './logging/logging-service';
// import { LoggingMyService } from './logging/logging-my.service';

@Module({
  imports: [
    UserModule,
    ArtistModule,
    TrackModule,
    AlbumModule,
    FavsModule,
    AuthModule,
  ],
  // providers: [LoggingMyService],
})
export class RootModule {}
//   implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer.apply(LoggingService).forRoutes('*');
//   }
// }
