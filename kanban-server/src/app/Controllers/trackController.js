import Controller from './controller';
import * as Exceptions from '../Exceptions/Exceptions';
import TrackService from '../Services/trackService';

export default class TrackController extends Controller {
  constructor(response) {
    super(response);
    this.trackService = new TrackService();
  }

  /**
   * Create a new track
   * @param {string} request.trackName - The `trackName` in request body
   * @param {string} request.boardId - The `boardId` in request body
   * @param {string} request.colorCode - The `colorCode` in request body (optional)
   * @returns {object} - The track object
   */
  async createTrack(request) {
    const { trackName, boardId, colorCode } = request.body;
    try {
      const resTrack = await this.trackService.createTrack(trackName, boardId, colorCode);

      if (!resTrack) {
        throw new Exceptions.NotFoundException('Track not created');
      }

      this.sendResponse(resTrack);
    } catch (error) {
      this.handleException(error);
    }
  }

  /**
   * Get all tracks
   * @returns {object} - The tracks object
   */
  async getAllTracks(request) {
    const { boardId } = request.params;
    try {
      const resTracks = await this.trackService.getAllTracks(boardId);

      if (!resTracks) {
        throw new Exceptions.NotFoundException('Tracks not found');
      }

      this.sendResponse(resTracks);
    } catch (error) {
      this.handleException(error);
    }
  }

  /**
   * Update track by id
   * @param {string} request.params.id - The `id` in request params
   * @param {string} request.body.trackName - The `trackName` in request body
   * @param {string} request.body.boardId - The `boardId` in request body
   * @param {string} request.body.colorCode - The `colorCode` in request body (optional)
   * @returns {object} - The track object
   */
  async updateTrackById(request) {
    const { trackId } = request.params;
    const { trackName, boardId, colorCode } = request.body;
    try {
      const resTrack = await this.trackService.updateTrackById(
        trackId,
        trackName,
        boardId,
        colorCode
      );

      if (!resTrack) {
        throw new Exceptions.NotFoundException('Track not found');
      }

      this.sendResponse(resTrack);
    } catch (error) {
      this.handleException(error);
    }
  }

  /**
   * Delete track by id
   * @param {string} request.params.id - The `id` in request params
   */
  async deleteTrackById(request) {
    const { trackId } = request.params;
    try {
      const resTrack = await this.trackService.deleteTrackById(trackId);

      if (!resTrack) {
        throw new Exceptions.NotFoundException('Track not found');
      }

      this.sendResponse(resTrack);
    } catch (error) {
      this.handleException(error);
    }
  }
}
