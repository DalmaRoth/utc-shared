import * as Cesium from "cesium"
import { init2dGoogleViewer, init3dGoogleViewer } from "../cesium-init"

// *********** VIEWER **********************

// Option of 2d or 3d tileset
const { viewer } = await init3dGoogleViewer()

try {
    const tileset = await Cesium.Cesium3DTileset.fromIonAssetId(2275207);
    // const dcc_tileset = await Cesium.Cesium3DTileset.fromIonAssetId(3365071);
    viewer.scene.primitives.add(tileset);
    // viewer.scene.primitives.add(dcc_tileset);    
  } catch (error) {
    console.log(error);
  }
  
  viewer.scene.camera.setView({
    destination: new Cesium.Cartesian3(
      3792094.45,
      -407685.74,
      5098400,
    ),
    orientation: new Cesium.HeadingPitchRoll(
      180,
      -0.2,
      6.28,
    ),
    
    
  });

  Cesium.Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI0NjM0YWZkOS0wNDY1LTQxYWQtYTE4Zi00NjI3ZDA5YzI0N2IiLCJpZCI6MzAwMjA4LCJpYXQiOjE3NDY2MDA0OTd9.xvO75KGSiJrr2QwG8GzLbNnyyo51uLWGkIh6qdq6sSg";
  
  // classification variables
  const low = 10
  const medium = 20
  const high = 30
  const very_high = 40
  
  const classification = "Combined Score"
  function processEntities(dataSource) {
    const entities = dataSource.entities.values;
  
    for (let i = 0; i < entities.length; i++) {
      const entity = entities[i];
  
      // Access the attribute you want to use for coloring (e.g., 'type', 'status')
      const attributeValue = entity.properties.Combined_Score;  // Replace 'type' with your attribute name
  
      // Determine the color based on the attribute value
      let color = Cesium.Color.WHITE; // Default color
  
      if (attributeValue >= very_high) {
        color = Cesium.Color.ORANGERED;
      } else if (attributeValue < very_high && attributeValue >= high) {
        color = Cesium.Color.ORANGE;
      } else if (attributeValue < high && attributeValue >= medium) {
        color = Cesium.Color.GOLD;
      } else if (attributeValue < medium && attributeValue >= low) {
        color = Cesium.Color.MEDIUMBLUE;
      } else {
        color = Cesium.Color.GREENYELLOW;
      }
  
      // Apply the color to the entity
      if (entity.polygon) {
        entity.polygon.material = color; // For polygons
      } else if (entity.polyline) {
        entity.polyline.material = Cesium.Color.fromColor(color); // For polylines
      } else if (entity.billboard) {
        entity.billboard.color = color; // For billboards
      }
    }
  }
  
  
try {
  const buildings = await Cesium.IonResource.fromAssetId(3412901);
  const buildings_source = await Cesium.GeoJsonDataSource.load(buildings,{
    clampToGround: true,
  });
  processEntities(buildings_source)
  await viewer.dataSources.add(buildings_source);
  await viewer.zoomTo(buildings_source);
} catch (error) {
  console.log(error);
}


// *********** FUNCTIONS FOR UI **********************
export const doSomething = async () => {}



export const toggleslicer = async () => {
    const slider = document.
        getElementById('timeslicer');
    if (slider.style.display === 'none') {
        slider.style.display = "block";
    }
    else {
        slider.style.display = "none"
    }
}
