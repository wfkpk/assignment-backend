import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { SavedVideo } from './saved-video.entity'; // Import your SavedVideo entity

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  // Add any other fields you need for the User entity

  @OneToMany(() => SavedVideo, (savedVideo) => savedVideo.user)
  savedVideos: SavedVideo[];
}
