import * as Exceptions from '../Exceptions/Exceptions';
import TrackRepository from '../Repository/trackRepository';

export default class TrackService {
  constructor() {
    this.trackRepository = new TrackRepository();
  }

  /**
   * Method to create a new track
   */
  async createTrack(trackName, id, colorCode) {
    try {
      // colorCode is optional, if not passed then set default colorCode
      const track = await this.trackRepository.createTrack(trackName, id, colorCode);

      if (!track) {
        throw new Exceptions.NotFoundException('Track not created');
      }

      // remove the boardId from track and send as response
      const { boardId, ...trackData } = track.dataValues;

      return trackData;
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * Method to update a track by id
   */
  async updateTrackById(trackId, trackName, id, colorCode) {
    try {
      const track = await this.trackRepository.updateTrackById(trackId, trackName, id, colorCode);

      if (!track) {
        throw new Exceptions.NotFoundException('Track not updated');
      }

      // remove the boardId from track and send as response
      const { boardId, ...trackData } = track.dataValues;

      return trackData;
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * Method to delete a track by id
   */
  async deleteTrackById(trackId) {
    try {
      await this.trackRepository.deleteTrack(trackId);

      return {
        success: true,
        message: 'Board deleted successfully',
      };
    } catch (error) {
      throw new Error(error);
    }
  }
}
