import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity'; // Import your User entity

@Entity()
export class SavedVideo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  videoId: string;

  @ManyToOne(() => User, (user) => user.savedVideos)
  user: User;
}
