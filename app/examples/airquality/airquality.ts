import * as Cesium from "cesium"
import { getMapTile } from "../../api/airquality.js"
import { initGoogleViewer, initReadMe } from "../cesium-init.js"
import readme from "./README.md"

const level = 2
const x = 2
const y = 1

let showingAirQuality = false

// *********** VIEWER **********************
const { viewer } = await initGoogleViewer()
initReadMe(readme)

// *********** FUNCTIONS FOR UI **********************
export const showAirQuality = async () => {
  if (!showingAirQuality) {
    viewer.entities.add({
      rectangle: {
        coordinates: rectangle,
        material: image.src as any,
        classificationType: Cesium.ClassificationType.BOTH,
        granularity: Cesium.Math.RADIANS_PER_DEGREE * 60.0
      }
    })
    showingAirQuality = true
  }
}

async function requestTileImage(level, x, y) {
  const image = new Image()
  try {
    const blob = (await getMapTile(level, x, y)) as Blob
    const objectUrl = URL.createObjectURL(blob)
    image.src = objectUrl
  } catch (e) {
    console.error("Error requesting tile image", e)
  }

  return image
}

const tilingScheme = new Cesium.WebMercatorTilingScheme({
  ellipsoid: viewer.scene.ellipsoid
})

async function getRectangle(level, x, y) {
  return tilingScheme.tileXYToRectangle(x, y, level)
}

const image = await requestTileImage(level, x, y)
const rectangle = await getRectangle(level, x, y)
