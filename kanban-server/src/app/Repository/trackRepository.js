const { Track, Board, Task, sequelize } = require('../../models');

export default class TrackRepository {
  async createTrack(trackName, boardId, colorCode) {
    const track = await Track.create({
      trackName,
      boardId,
      colorCode,
    });

    if (!track) {
      throw new Error('Error in creating track');
    }

    return track;
  }

  async getTrackById(trackId) {
    const track = await Track.findOne({
      where: {
        id: trackId,
      },
    });

    if (!track) {
      throw new Error('Error in fetching track');
    }

    return track;
  }

  async getAllTracks(boardId) {
    const tracks = await Track.findAll({
      where: {
        boardId: boardId,
      },
    });

    if (!tracks) {
      throw new Error('Error in getting tracks');
    }

    return tracks;
  }

  async updateTrackById(trackId, trackName, boardId, colorCode) {
    const track = await this.getTrackById(trackId);

    if (!track) {
      throw new Error('Error in fetching track');
    }

    track.trackName = trackName;

    if (colorCode) {
      track.colorCode = colorCode;
    }

    const updatedTrack = await track.save();

    if (!updatedTrack) {
      throw new Error('Error in updating track');
    }

    return updatedTrack;
  }

  async deleteTrack(trackId) {
    try {
      await sequelize.transaction(async (t) => {
        const track = await Track.findOne({
          where: {
            id: trackId,
          },
          transaction: t,
        });

        if (!track) {
          throw new Error('Error in fetching Track');
        }

        await track.destroy({ transaction: t });
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}
