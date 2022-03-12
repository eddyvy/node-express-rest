import {
  InvalidDirectionError,
  InvalidSortByError,
  InvalidTagsError,
  NoTagsError,
  postErrorMsg
} from '../../src/posts/error'

describe('Post Errors', () => {
  test('Should have the correct messages', () => {
    expect(postErrorMsg).toStrictEqual({
      NO_TAGS: 'Tags parameter is required',
      INVALID_TAGS: 'tags parameter is invalid',
      INVALID_SORTBY: 'sortBy parameter is invalid',
      INVALID_DIRECTION: 'direction parameter is invalid',
    })
  })

  test('NoTagsError should extend from Error', () => {
    expect(NoTagsError.prototype).toBeInstanceOf(Error)
  })

  test('NoTagsError should throw the correct message', () => {
    const iWillThrow = () => { throw new NoTagsError() }
    expect(iWillThrow).toThrowError('Tags parameter is required')
  })

  test('InvalidTagsError should extend from Error', () => {
    expect(InvalidTagsError.prototype).toBeInstanceOf(Error)
  })

  test('InvalidTagsError should throw the correct message', () => {
    const iWillThrow = () => { throw new InvalidTagsError() }
    expect(iWillThrow).toThrowError('tags parameter is invalid')
  })

  test('InvalidSortByError should extend from Error', () => {
    expect(InvalidSortByError.prototype).toBeInstanceOf(Error)
  })

  test('InvalidSortByError should throw the correct message', () => {
    const iWillThrow = () => { throw new InvalidSortByError() }
    expect(iWillThrow).toThrowError('sortBy parameter is invalid')
  })

  test('InvalidDirectionError should extend from Error', () => {
    expect(InvalidDirectionError.prototype).toBeInstanceOf(Error)
  })

  test('InvalidDirectionError should throw the correct message', () => {
    const iWillThrow = () => { throw new InvalidDirectionError() }
    expect(iWillThrow).toThrowError('direction parameter is invalid')
  })
})
