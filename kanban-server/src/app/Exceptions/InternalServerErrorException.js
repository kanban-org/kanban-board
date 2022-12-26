/**
 * general request exception module
 */
import Exception from './Error';



export default class InternalServerErrorException extends Exception {
  constructor(message) {
    super();
    this.constructor = InternalServerErrorException;
    this.name = this.constructor.name;
    this.message = (message) || 'Internal Server Error. Please contact tech team.';
  }
}
