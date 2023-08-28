export default function getTimeMapByExcel(oriData: Array<Array<string>>): any {
  const result = {}
  const heightList = oriData[0].slice(1).map((o) => Number(o.replace('mm', '')))

  for (let i = 1; i < oriData.length; i++) {
    const list = oriData[i]
    const width = Number(list[0])
    const lengthMap = {}
    heightList.forEach((height, hIndex) => {
      lengthMap[height] = list[hIndex + 1] ? Number(list[hIndex + 1].replace('h', '')) : 0
    })
    result[width] = lengthMap
  }
  return result
}
