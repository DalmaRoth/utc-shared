import * as Cesium from "cesium"

Cesium.Ion.defaultAccessToken = import.meta.env.VITE_CESIUM_ION_TOKEN
Cesium.RequestScheduler.requestsByServer["tile.googleapis.com:443"] = 18

export const initGoogleViewer = async () => {
  // **************** MAP INITIALIZATION ***************************************

  // Initialize the Cesium Viewer in the HTML element with the `cesiumContainer` ID.
  // NOTE: baseLayerPicker on the viewer must be false, and a Google 2D or 3D map must be used.
  // Google API results can only be shared on Google maps due to terms of service
  const viewer = new Cesium.Viewer("cesiumContainer", {
    // The globe does not need to be displayed,
    // since the Photorealistic 3D Tiles include terrain
    globe: false,
    // can turn timeline and animation back on if dealing with time-dependent data
    timeline: false,
    animation: false,
    // baseLayerPicker must be false to comply with Google API terms of service
    baseLayerPicker: false,
    // sceneModePicker is extra clutter, not really needed
    sceneModePicker: false,
    // geocoder must be Google for photorealistic tiles
    geocoder: Cesium.IonGeocodeProviderType.GOOGLE,
    requestRenderMode: true
  })

  const tileset = await Cesium.createGooglePhotorealistic3DTileset({
    // Only the Google Geocoder can be used with Google Photorealistic 3D Tiles.
    // Set the `geocoder` property of the viewer constructor options to IonGeocodeProviderType.GOOGLE.
    onlyUsingWithGoogleGeocoder: true
  })

  // Load the Google Photorealistic 3D tileset as the basemap
  try {
    viewer.scene.primitives.add(tileset)
  } catch (error) {
    console.log(`Failed to load tileset: ${error}`)
  }

  return {
    viewer,
    tileset
  }
}
