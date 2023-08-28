// function strMapToObj(strMap): any {
//   const obj = Object.create(null)
//   for (const [k, v] of strMap) {
//     obj[k] = v
//   }
//   return obj
// }
// function strMapToJson(strMap: Map): string {
//   return JSON.stringify(strMapToObj(strMap))
// }

// export default function getTimeMapByExcel(oriData: Array<Array<string>>): any {
//   const result = new Map()
//   const heightList = oriData[0].slice(2).map((o) => Number(o.replace('mm', '')))

//   let lastWidth
//   for (let i = 1; i < oriData.length; i++) {
//     const list = oriData[i]
//     if (list[0].startsWith('宽')) {
//       const width = Number(list[0].replace('宽', '').replace('mm', ''))
//       lastWidth = width
//       result.set(width, new Map())
//     }
//     const widthMap = result.get(lastWidth)
//     const lengthMap = new Map()
//     heightList.forEach((height, hIndex) => {
//       lengthMap.set(height, Number(list[hIndex + 2].replace('h', '')))
//     })
//     widthMap.set(Number(list[1]), lengthMap)
//   }
//   return result
// }

// ['宽', '长', '5mm', '10mm', '15mm', '20mm', '25mm', '30mm', '35mm', '40mm', '45mm', '50mm', '55mm', '60mm', '65mm', '70mm', '75mm', '80mm', '85mm', '90mm', '95mm', '100mm']
// ['宽10mm', '10', '0.4h', '0.5h', '0.8h', '1h', '1.3h', '1.5h', '1.8h', '2h', '2.3h', '2.5h', '2.8h', '3h', '3.2h', '3.5h', '3.8h', '4h', '4.5h', '5h', '5.5h', '6h']
// ['', '20', '0.4h', '0.5h', '0.8h', '1h', '1.3h', '1.5h', '1.8h', '2h', '2.3h', '2.5h', '2.8h', '3h', '3.2h', '3.5h', '3.8h', '4h', '4.5h', '5h', '5.5h', '6h']

export default function getTimeMapByExcel(oriData: Array<Array<string>>): any {
  const result = {}
  const heightList = oriData[0].slice(2).map((o) => Number(o.replace('mm', '')))

  let lastWidth
  for (let i = 1; i < oriData.length; i++) {
    const list = oriData[i]
    if (list[0].startsWith('宽')) {
      const width = Number(list[0].replace('宽', '').replace('mm', ''))
      lastWidth = width
      result[width] = {}
    }
    const widthMap = result[lastWidth]
    const lengthMap = {}
    heightList.forEach((height, hIndex) => {
      lengthMap[height] = list[hIndex + 2] ? Number(list[hIndex + 2].replace('h', '')) : 0
    })
    widthMap[Number(list[1])] = lengthMap
  }
  return result
}
