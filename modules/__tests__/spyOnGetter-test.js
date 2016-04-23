import expect, { spyOnGetter } from '../index'

describe('A function on a getter property that was spied on', () => {
  const video = {}

  Object.defineProperty(video, 'play', {
    value: () => true
    // get: () => () => true
  })

  let spy
  beforeEach(() => {
    spy = spyOnGetter(video, 'play')
    video.play()
  })

  it('tracks the number of calls', () => {
    expect(spy.calls.length).toEqual(1)
  })

  it('tracks the context that was used', () => {
    expect(spy.calls[0].context).toBe(video)
  })

  it('tracks the arguments that were used', () => {
    expect(spy.calls[0].arguments).toEqual([ 'some', 'args' ])
  })

  it('was called', () => {
    expect(spy).toHaveBeenCalled()
  })

  it('was called with the correct args', () => {
    expect(spy).toHaveBeenCalledWith('some', 'args')
  })

  it('can be restored', () => {
    expect(video.play).toEqual(spy)
    spy.restore()
    expect(video.play).toNotEqual(spy)
  })
})

describe('A function that was spied on but not called', () => {
  const video = {}

  Object.defineProperty(video, 'play', {
    value: () => true
    // get: () => () => true
  })

  let spy
  beforeEach(() => {
    spy = spyOnGetter(video, 'play')
  })

  it('number of calls to be zero', () => {
    expect(spy.calls.length).toEqual(0)
  })

  it('was not called', () => {
    expect(spy).toNotHaveBeenCalled()
  })
})
