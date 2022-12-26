import Controller from './controller';
import * as Exceptions from '../Exceptions/Exceptions';
import TrackService from '../Services/trackService';

export default class TrackController extends Controller {
  constructor(response) {
    super(response);
    this.trackService = new TrackService();
  }

  async createTrack(request) {}
}
