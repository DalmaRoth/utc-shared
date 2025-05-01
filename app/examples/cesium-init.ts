import * as Cesium from "cesium"
import showdown from "showdown"

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

export const initReadMe = async (readme: string) => {

    // This function replaces the following HTML code:
    {
      /* 
    <div class="popup-overlay" id="popupOverlay"></div>
    <div class="popup" id="popup">
      <button id="closePopup">Close</button>
      <div id="popupContent" class="popup-content"></div>
    </div>
    */
    }
  
    // Create popup overlay
    var popupOverlay = document.createElement("div")
    popupOverlay.className = "popup-overlay"
    popupOverlay.id = "popupOverlay"
    document.body.appendChild(popupOverlay)
  
    // Create popup
    var popup = document.createElement("div")
    popup.className = "popup"
    popup.id = "popup"
    document.body.appendChild(popup)
  
    // Create close button
    var closeButton = document.createElement("button")
    closeButton.id = "closePopup"
    closeButton.textContent = "Close"
    popup.appendChild(closeButton)
  
    // Create popup content
    var popupContent = document.createElement("div")
    popupContent.id = "popupContent"
    popupContent.className = "popup-content"
    popup.appendChild(popupContent)


    document.getElementById("help-button")?.addEventListener("click", async () => {
      // const response = await fetch("README.md")
      // const markdown = await response.text()
      const converter = new showdown.Converter()
      const htmlContent = converter.makeHtml(readme)
      
      if (popupContent) {
        popupContent.innerHTML = htmlContent
      }
  
      popupContent.innerHTML = htmlContent
      popupOverlay.style.display = "block"
      popup.style.display = "block"
    })
  
    closeButton.addEventListener("click", () => {
      popupOverlay.style.display = "none"
      popup.style.display = "none"
    })

}
