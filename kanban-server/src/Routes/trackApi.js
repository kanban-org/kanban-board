import express from 'express';
import TrackController from '../app/Controllers/trackController';
const { trackValidationRules, validate } = require('../app/Validators/validators');

const TrackApiRouter = express.Router();

// Create Track
TrackApiRouter.post('/track/create', trackValidationRules(), validate, (req, res) => {
  const trackController = new TrackController(res);
  trackController.createTrack(req);
});

// Get all Tracks of a board
TrackApiRouter.get('/track/getAll/:boardId', (req, res) => {
  const trackController = new TrackController(res);
  trackController.getAllTracks(req);
});

// Update Track
TrackApiRouter.patch('/track/update/:trackId', (req, res) => {
  const trackController = new TrackController(res);
  trackController.updateTrackById(req);
});

// Delete Track
TrackApiRouter.delete('/track/delete/:trackId', (req, res) => {
  const trackController = new TrackController(res);
  trackController.deleteTrackById(req);
});

export default TrackApiRouter;
