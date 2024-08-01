export const CommentEvent = {
  created: 'comment.created',
  updated: 'comment.updated',
  delete: 'comment.deleted'
}

export class CreatedEvent {
  _id: string
  constructor(id: string) {
    this._id = id
  }
}

export class UpdatedEvent {
  _id: string
  constructor(id: string) {
    this._id = id
  }
}

export class DeletedEvent {
  _id: string
  constructor(id: string) {
    this._id = id
  }
}
