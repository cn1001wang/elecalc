import timeMap from './timeMap.json'

function toFixed(num: number): number {
  if (num < 10) return 10
  return Number((num / 10).toFixed()) * 10
}
function toHalfFixed(num: number): number {
  if (num < 5) return 5
  let tail = num % 10

  tail = tail < 2.5 ? 0 : tail >= 2.5 && tail < 7.5 ? 5 : 10
  return Math.floor(num / 10) * 10 + tail
}

function distinguishLengthWidth(a: number, b: number): Array<number> {
  return [a > b ? a : b, a > b ? b : a]
}
export default function timeCalc(objData: Array<any>): Array<number> {
  console.log(objData)
  const result = objData.map((o) => {
    const width = toFixed(o.width)
    const length = toFixed(o.length)
    let height = toHalfFixed(o.height)
    // 深度超过100只算100
    height = height > 100 ? 100 : height
    // 只有筋位会大于1次，2次按1.3倍时长计算，3次按1.5倍时长计算
    const time = o.time >= 3 ? 1.5 : o.time === 2 ? 1.3 : 1

    if (width && length && height) {
      const timeTypeMap = timeMap[o.type]
      // 如果长宽大于100，比如110*110*50=100*100*50+10*10*50
      let costTime
      if (width > 100 && length > 100) {
        costTime = timeTypeMap[width - 100][length - 100][height] + timeTypeMap[100][100][height]
      } else if (width > 100) {
        // 长边为长，短边为宽
        const [_length, _width] = distinguishLengthWidth(width - 100, length)

        costTime = timeTypeMap[_width][_length][height] + timeTypeMap[length][100][height]
      } else if (length > 100) {
        // 长边为长，短边为宽
        const [_length, _width] = distinguishLengthWidth(length - 100, width)

        costTime = timeTypeMap[_width][_length][height] + timeTypeMap[width][100][height]
      } else {
        // 正常情况都会进到这
        costTime = timeTypeMap[width][length][height]
      }
      return Math.round(costTime * time * 100) / 100
    }
    return 0
  })
  console.log(result)
  return result
}
