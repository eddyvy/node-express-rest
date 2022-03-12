export const postErrorMsg = {
  NO_TAGS: 'Tags parameter is required',
  INVALID_TAGS: 'tags parameter is invalid',
  INVALID_SORTBY: 'sortBy parameter is invalid',
  INVALID_DIRECTION: 'direction parameter is invalid',
}

export class NoTagsError extends Error {
  constructor() {
    super(postErrorMsg.NO_TAGS)
    Object.setPrototypeOf(this, NoTagsError.prototype)
  }
}

export class InvalidTagsError extends Error {
  constructor() {
    super(postErrorMsg.INVALID_TAGS)
    Object.setPrototypeOf(this, InvalidTagsError.prototype)
  }
}

export class InvalidSortByError extends Error {
  constructor() {
    super(postErrorMsg.INVALID_SORTBY)
    Object.setPrototypeOf(this, InvalidSortByError.prototype)
  }
}

export class InvalidDirectionError extends Error {
  constructor() {
    super(postErrorMsg.INVALID_DIRECTION)
    Object.setPrototypeOf(this, InvalidDirectionError.prototype)
  }
}
