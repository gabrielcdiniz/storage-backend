import { Body, Controller, Delete, Get, HttpStatus, Param, ParseUUIDPipe, Patch, Post, Query } from '@nestjs/common';
import { ApiBadRequestResponse, ApiNoContentResponse, ApiNotAcceptableResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRef } from './dto/user.ref';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @ApiOperation({
    description: 'Creates a new User',
    summary: 'Creates a new User',
  })
  @ApiOkResponse({ description: 'User Created', type: UserRef })
  @ApiNoContentResponse({ description: 'User do not Created' })
  @Post()
  public create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiOperation({
    description: 'Gets All Actives Users',
    summary: 'Gets All Actives Users',
  })
  @ApiQuery({ name: 'active', type: Boolean, required: false, description: 'If not provided, show a list of all actives Users only' })
  @ApiOkResponse({ type: [UserRef], description: 'Returns an Array of Users' })
  @Get()
  public findAll(@Query('active') active?: string) {
    return this.usersService.findAll(active);
  }

  @ApiOperation({
    description: 'Gets One User',
    summary: 'Gets One User',
  })
  @ApiOkResponse({ description: 'User Found', type: UserRef })
  @ApiNotAcceptableResponse({ description: 'Validation failed (uuid  is expected) in the id parameter.' })
  @ApiNotFoundResponse({ description: 'User Not Found with this ID: $id' })
  @Get(':id')
  public findOne(@Param('id', new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: string) {
    return this.usersService.findOne(id);
  }

  @ApiOperation({
    description: 'Updates One User',
    summary: 'Updates One User',
  })
  @ApiOkResponse({ description: 'User Updated' })
  @ApiBadRequestResponse({ description: 'Fields in the Body does not match with at yours types.' })
  @ApiNotAcceptableResponse({ description: 'Validation failed (uuid  is expected) in the id parameter.' })
  @ApiNotFoundResponse({ description: 'User Not Updated with this ID: $id' })
  @Patch(':id')
  public update(@Param('id', new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @ApiOperation({
    description: 'Deletes One User',
    summary: 'Deletes One User',
  })
  @ApiOkResponse({ description: 'User Deleted' })
  @ApiNotAcceptableResponse({ description: 'Validation failed (uuid  is expected) in the id parameter.' })
  @ApiNotFoundResponse({ description: 'User Not Deleted with this ID: $id' })
  @Delete(':id')
  public remove(@Param('id', new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: string) {
    return this.usersService.remove(id);
  }
}
