// import timeMap from './timeMap.json'
import timeMap from './timeMapV1.json'
/**
 * 根据长宽求和，不超过20为20
 * @param width 宽度
 * @param length 长度
 * @returns 长宽和
 */
function getTotalWL(width: number, length: number): number {
  const totalWL = width + length

  return Number((totalWL / 10).toFixed()) * 10
}
function toHalfFixed(num: number): number {
  if (num < 5) return 5
  let tail = num % 10

  tail = tail < 2.5 ? 0 : tail >= 2.5 && tail < 7.5 ? 5 : 10
  return Math.floor(num / 10) * 10 + tail
}

export default function timeCalc(objData: Array<any>): Array<number> {
  const result = objData.map((o) => {
    let height = toHalfFixed(o.height)

    const totalWL = getTotalWL(o.width, o.length)
    // 深度超过100只算100
    height = height > 100 ? 100 : height
    const timeMulti = o.time >= 3 ? 1.5 : o.time === 2 ? 1.3 : 1

    if (o.width && o.length && height) {
      return getCostTimeByWLH(o.type, totalWL, height, timeMulti)
    } else {
      return 0
    }
  })
  return result
}
/**
 * 花费时长
 * @param totalWL 长宽和
 * @param height 高
 */
function getCostTimeByWLH(
  type: string,
  totalWL: number,
  height: number,
  timeMulti: number
): number {
  const timeTypeMap = timeMap[type]
  // 只有筋位会大于1次，2次按1.3倍时长计算，3次按1.5倍时长计算
  let costTime

  if (totalWL > 200) {
    costTime = timeTypeMap[200][height] + getCostTimeByWLH(type, totalWL - 200, height, timeMulti)
  } else {
    costTime = timeTypeMap[totalWL < 20 ? 20 : totalWL][height]
  }

  return Math.round(costTime * timeMulti * 100) / 100
}
