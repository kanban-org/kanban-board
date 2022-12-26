export default class Controller {
  constructor(response) {
    this.response = response;
  }
  sendResponse(data) {
    this.response.status(200).json({ data });
  }
  sendResponseWithHeaders(data) {
    this.response.status(200).header("auth-token", data.token).json({ data });
  }

  handleException(error) {
    switch (error.name) {
      case 'GeneralException':
        this.response.status(501).json({ error: error.message });
        break;
      case 'UnauthorizedException':
        this.response.status(401).json({ error: error.message });
        break;
      case 'NotFoundException':
        this.response.status(404).json({ error: error.message });
        break;
      case 'ConflictException':
        this.response.status(409).json({ error: error.message });
        break;
      case 'ValidationException':
        this.response.status(422).json({ error: error.message });
        break;
      case 'ForbiddenException':
        this.response.status(403).json({ error: error.message });
        break;
      case 'InternalServerErrorException':
        this.response.status(500).json({ error: error.message });
        break;
      case 'GraphQLError':
        this.response.status(400).json({ error: error.message });
        break;
      case 'InternalServerErrorException':
        this.response.status(500).json({ error: error.message });
        break;
      case 'PermissionDeniedException':
        this.response.status(403).json({ error: error.message });
        break;
      case 'CatalogValidationError':
        this.response.status(422).json({ error: JSON.parse(error.message) });
        break;
      default:
        this.response.status(501).json({ error: error.message });
        break;
    }
  }
}
