import type { Request } from 'express'
import { validatePostRequest } from '../../src/posts/validate'
import { InvalidDirectionError, InvalidSortByError, InvalidTagsError, NoTagsError } from '../../src/posts/error'

describe('Validate post', () => {
  test('Should return the validated data', () => {
    const mockReq = {
      query: {
        tags: 'tech,health,sport',
        sortBy: 'reads',
        direction: 'desc',
      },
    } as unknown as Request
    const mockReq1Tag = {
      query: {
        tags: 'tech',
        sortBy: 'reads',
        direction: 'desc',
      },
    } as unknown as Request

    const data = validatePostRequest(mockReq)
    const data1Tag = validatePostRequest(mockReq1Tag)

    expect(data).toStrictEqual({
      tags: [ 'health', 'sport', 'tech' ],
      sortBy: 'reads',
      direction: 'desc',
    })
    expect(data1Tag).toStrictEqual({
      tags: [ 'tech' ],
      sortBy: 'reads',
      direction: 'desc',
    })
  })

  test('Should not throw error with valid post request', () => {
    const mockReq = {
      query: {
        tags: 'tech,health',
        sortBy: 'reads',
        direction: 'desc',
      },
    } as unknown as Request
    const mockReqUndefSortBy = {
      query: {
        tags: 'tech,health',
        direction: 'desc',
      },
    } as unknown as Request
    const mockReqUndefDirection = {
      query: {
        tags: 'tech,health',
        sortBy: 'reads',
      },
    } as unknown as Request

    expect(() => validatePostRequest(mockReq)).not.toThrow()
    expect(() => validatePostRequest(mockReqUndefSortBy)).not.toThrow()
    expect(() => validatePostRequest(mockReqUndefDirection)).not.toThrow()
  })

  test('Should throw NoTagsError with no tags', () => {
    const mockReqEmptyTag = { query: { tags: '' } } as unknown as Request
    const mockReqUndefinedTag = { query: {} } as unknown as Request
    const mockReqNullTag = { query: { tags: null } } as unknown as Request

    expect(() => validatePostRequest(mockReqEmptyTag)).toThrow(NoTagsError)
    expect(() => validatePostRequest(mockReqUndefinedTag)).toThrow(NoTagsError)
    expect(() => validatePostRequest(mockReqNullTag)).toThrow(NoTagsError)
  })

  test('Should throw InvalidTagsError with invalid tags', () => {
    const mockReqArrayTag = { query: { tags: [ 'something', 'wrong' ] } } as unknown as Request
    const mockReqEmptyArrayTag = { query: { tags: [] } } as unknown as Request

    expect(() => validatePostRequest(mockReqArrayTag)).toThrow(InvalidTagsError)
    expect(() => validatePostRequest(mockReqEmptyArrayTag)).toThrow(InvalidTagsError)
  })

  test('Should throw InvalidSortByError with an invalid sortBy', () => {
    const mockReqEmptySortBy = { query: {
      tags: 'tech,health',
      sortBy: '',
      direction: 'desc',
    } } as unknown as Request
    const mockReqInvalidSortBy = { query: {
      tags: 'tech,health',
      sortBy: 'wrongSort',
      direction: 'desc',
    } } as unknown as Request
    const mockReqNullSortBy = { query: {
      tags: 'tech,health',
      sortBy: null,
      direction: 'desc',
    } } as unknown as Request
    const mockReqEmptyArraySortBy = { query: {
      tags: 'tech,health',
      sortBy: [],
      direction: 'desc',
    } } as unknown as Request

    expect(() => validatePostRequest(mockReqEmptySortBy)).toThrow(InvalidSortByError)
    expect(() => validatePostRequest(mockReqInvalidSortBy)).toThrow(InvalidSortByError)
    expect(() => validatePostRequest(mockReqNullSortBy)).toThrow(InvalidSortByError)
    expect(() => validatePostRequest(mockReqEmptyArraySortBy)).toThrow(InvalidSortByError)
  })

  test('Should throw InvalidDirectionError with an invalid sortBy', () => {
    const mockReqEmptyDirection = { query: {
      tags: 'tech,health',
      sortBy: 'reads',
      direction: '',
    } } as unknown as Request
    const mockReqInvalidDirection = { query: {
      tags: 'tech,health',
      sortBy: 'reads',
      direction: 'wrong',
    } } as unknown as Request
    const mockReqNullDirection = { query: {
      tags: 'tech,health',
      sortBy: 'reads',
      direction: null,
    } } as unknown as Request
    const mockReqEmptyArrayDirection = { query: {
      tags: 'tech,health',
      sortBy: 'reads',
      direction: [],
    } } as unknown as Request

    expect(() => validatePostRequest(mockReqEmptyDirection)).toThrow(InvalidDirectionError)
    expect(() => validatePostRequest(mockReqInvalidDirection)).toThrow(InvalidDirectionError)
    expect(() => validatePostRequest(mockReqNullDirection)).toThrow(InvalidDirectionError)
    expect(() => validatePostRequest(mockReqEmptyArrayDirection)).toThrow(InvalidDirectionError)
  })
})
