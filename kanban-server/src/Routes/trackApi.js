import express from 'express';
import TrackController from '../app/Controllers/trackController';
const TrackApiRouter = express.Router();

// Create Track
TrackApiRouter.post('/track/create', (req, res) => {
  const trackController = new TrackController(res);
  trackController.createTrack(req);
});

export default TrackApiRouter;
