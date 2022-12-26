import * as Exceptions from '../Exceptions/Exceptions';


export default class TaskService {
  constructor() {
    // this.accountRepository = new AccountRepository();
  }

  async addAccount(args) {
    const { email, userName } = args;
    console.log('args: ', args);
    /*
      Check if there is already an account with the same email or same username 
    */

    const verifyUserName = await this.accountRepository.getUserByUserName(userName);
    if (verifyUserName) {
      throw new Exceptions.ConflictException('Username already exist');
    }

    const verifyEmail = await this.accountRepository.getUserByEmail(email);
    if (verifyEmail) {
      throw new Exceptions.ConflictException('Email already exist');
    }
    /*
      Hash the password before saving it to the database
    */
    const salt = await bycrypt.genSalt(10);
    const hashedPassword = await bycrypt.hash(args.password, salt);
    args.password = hashedPassword;
    const resUser = await this.accountRepository.addUser(args);

    return resUser;
  }
}
