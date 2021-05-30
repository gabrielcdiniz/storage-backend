import { EntityRepository, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
    public async createUser(createUserDto: CreateUserDto): Promise<User> {
        const {
            name,
            active,
            role,
        } = createUserDto;

        const user = new User();

        user.name = name;
        user.active = active;
        user.role = role;

        return await user.save();
    }
}
