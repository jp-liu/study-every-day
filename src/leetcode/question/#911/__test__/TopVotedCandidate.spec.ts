import { TopVotedCandidate } from '../TopVotedCandidate'

describe('在线选举', () => {
  it('TopVotedCandidate', () => {
    const top = new TopVotedCandidate(
      [0, 1, 1, 0, 0, 1, 0],
      [0, 5, 10, 15, 20, 25, 30]
    )

    // 断点调试
    expect(top.q(3)).toBe(0)
    expect(top.q(12)).toBe(1)
    expect(top.q(25)).toBe(1)
    expect(top.q(15)).toBe(0)
    expect(top.q(24)).toBe(0)
    expect(top.q(8)).toBe(1)
  })
})
