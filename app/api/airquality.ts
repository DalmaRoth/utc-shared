import axios from "axios"

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

/**
 * Google Air Quality API v1
 * @see https://developers.google.com/maps/documentation/air-quality/reference/rest
 */

/**
 * Google Places API v1: lookupHeatmapTile
 * @see https://developers.google.com/maps/documentation/air-quality/reference/rest/v1/mapTypes.heatmapTiles/lookupHeatmapTile
 */
export const getMapTile = async (level: number, x: number, y: number): Promise<Blob> => {
  return await axios
    .get(`https://airquality.googleapis.com/v1/mapTypes/US_AQI/heatmapTiles/${level}/${x}/${y}/`, {
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": GOOGLE_MAPS_API_KEY
      },
      responseType: "blob"
    })
    .then((response) => {
      return response.data as Blob
    })
}
