// ------------------------------------------------------------------------ 
// JavaScript File
// Original Author(s): Brian Miretzky, Andre van der Westhuysen, Ray Ball
// File Creation Date: 09/29/2016
// Date Last Modified: 10/06/2016
//
// Version control: 1.00
//
// Support Team: Andre van der Westhuysen
//
// Contributors: Todd Spindler
//
// ------------------------------------------------------------------------ 
// ------------- Program Description and Details -------------------------- 
// ------------------------------------------------------------------------ 
//
// Code for displaying model output from NOAA/NWS's Nearshore Wave
// Prediction System, using Esri's ArcGIS API for JavaScript.
//
// ------------------------------------------------------------------------ 

    require([
      "esri/Map",
      "esri/views/MapView",
      "esri/Basemap",
      "esri/layers/TileLayer",
    ], function(
      Map, MapView,Basemap.TileLayer
    ) {

     var customBasemap = new Basemap({
	     baseLayers: [
		new TileLayer({
		url: "https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer"
		     }) // Only satellite imagery, no ocean labels
		    ]
	  });

     var map = new Map({
          basemap: customBasemap
        });
	    
	    
      var view = new MapView({
        center: [-130, 45],
        container: "viewDiv",
        map: map,
        zoom: 3
      });
     view.constraints = {
        rotationEnabled: false  // Disables map rotation
      };

      // Set parameters for WFO domains
      var siteArray = [
        "BRO|25.26|-98.00|28.26|-95.41|Brownsville, Texas|1||CRP|||||||SRH|1|3",
        "CRP|26.00|-98.50|29.50|-95.00|Corpus Christi, Texas|1||HGX||||BRO|||SRH|1|3",
        "HGX|27.00|-97.40|30.50|-93.37|Houston/Galveston, Texas|1|||LCH|||CRP|||SRH|1|3",
        "LCH|27.41|-95.03|30.30|-90.43|Lake Charles, Louisiana|1|||LIX||||HGX||SRH|1|3",
        "LIX|27.50|-91.80|30.60|-87.40|New Orleans/Baton Rouge, Louisiana|1|||MOB||||LCH||SRH|1|3",
        "MOB|28.50|-89.10|31.00|-85.90|Mobile/Pensacola, Alabama/Florida|1|||TAE||||LIX||SRH|1|3",
        "TAE|28.35|-87.35|30.60|-82.60|Tallahassee, Florida|1|||JAX|TBW|||MOB||SRH|1|3",
        "TBW|25.45|-84.80|29.70|-81.50|Tampa Bay, Florida|1|||MLB|MFL||||TAE|SRH|1|3",
        "MFL|24.10|-83.54|27.7|-78.41|Miami-South Florida, Florida|1||MLB|||KEY|||TBW|SRH|1|3",
        "KEY|23.0|-83.50|26.0|-79.00|Key West, Florida|1|MFL|||SJU|||||SRH|1|3",
        "MLB|26.50|-81.40|30.00|-78.50|Melbourne, Florida|1|JAX|||||MFL|TBW||SRH|1|3",
        "JAX|28.70|-81.70|32.00|-79.30|Jacksonville, Florida|1|||||MLB||TAE||SRH|1|3",
        "SJU|17.0|-68.00|19.50|-64.0|San Juan, Puerto Rico|1||||||||KEY|SRH|1|3",

        "CHS|30.67|-81.70|33.58|-78.10|Charleston, South Carolina|1|||||||||ERH|1|3",
        "ILM|32.50|-80.40|34.80|-76.50|Wilmington, North Carolina|1|||||||||ERH|1|3",
        "MHX|33.85|-78.00|36.60|-74.75|Morehead City, North Carolina|1|||||||||ERH|1|3",
        "AKQ|35.80|-77.30|39.50|-74.25|Wakefield, North Carolina|1|||||||||ERH|1|3",
        "LWX|36.75|-77.80|39.70|-75.40|Baltimore Washington|1|||||||||ERH|1|3",
        "PHI|38.20|-75.75|40.60|-73.35|Mt. Holly, Philadelphia|1|||||||||ERH|1|3",
        "OKX|39.75|-74.45|41.40|-71.05|New York, New York|1|||||||||ERH|1|3",
        "BOX|40.45|-72.50|43.25|-68.85|Boston/Taunton, MA|1|||||||||ERH|1|3",
        "GYX|42.40|-71.75|44.70|-67.85|Gray/Portland, Maine|1|||||||||ERH|1|3",
        "CAR|43.30|-69.20|45.05|-66.30|Caribou, Maine|1|||||||||ERH|1|3",

        "SEW|46.10|-127.00|49.42|-121.91|Seattle, Washington|1|||||||||WRH|1|3",
        "PQR|43.50|-126.28|47.15|-123.30|Portland, Oregon|1|||||||||WRH|1|3",
        "MFR|41.00|-127.30|44.45|-123.65|Medford, Oregon|1|||||||||WRH|1|3",
        "EKA|38.40|-126.27|42.20|-123.35|Eureka, California|1|||||||||WRH|1|3",
        "MTR|35.00|-125.80|39.40|-120.74|Monterey, California|1|||||||||WRH|1|3",
        "LOX|32.60|-123.36|36.10|-117.30|Los Angeles, California|1|||||||||WRH|1|3",
        "SGX|32.08|-119.00|33.82|-116.50|San Diego, California|1|||||||||WRH|1|3",

        "HFO|18.07|-161.50|23.09|-153.90|Hawaii|1|||||||||NWP|0|2",
        "GUM|12.34|143.67|16.81|148.29|Guam|1|||||||||NWP|0|2",

        "AER|55.00|-158.00|61.60|-142.85|Anchorage, Alaska|1|||||||||ARH|1|3",
        "ALU|53.15|-177.00|62.00|-152.40|Anchorage-Aleutian Islands, Alaska|1|||||||||ARH|1|3",
        "AJK|53.90|-144.50|60.25|-130.00|Juneau, Alaska|1|||||||||ARH|1|3",
        "AFG|61.00|-176.50|73.00|-139.00|Fairbanks, Alaska|1|||||||||ARH|1|3",

        "GLW|41.167500|-92.720|49.347000|-75.545|Great Lakes|1|||||||||CRH|1|3"
      ];

      // Set parameters for WFO domains (high-res nests)
      var siteArrayNest = [
        "CHS|32.6058|-80.0123|32.8302|-79.6121|Charleston Harbor and Beaches|2|||||||||CHS|1|4",
        "CHS|31.8794|-81.1329|32.3778|-80.4376|Savannah Harbor and Beachess|3|||||||||CHS|1|4",

        "MHX|36.00|-75.80|36.30|-75.50|NE Outer Banks|2|||||||||MHX|1|4",
        "MHX|36.00|-75.68|36.05|-75.63|Kill Devil Hills|3|||||||||MHX|1|4",
        "MHX|34.40|-77.27|34.77|-76.90|SE Outer Banks|4|||||||||MHX|1|4",
        "MHX|34.60|-77.15|34.68|-77.00|Emerald Isle|5|||||||||MHX|1|4",

        "PHI|38.50|-75.70|39.85|-74.65|Delaware Bay|2|||||||||PHI|1|4",
        "PHI|39.40|-74.60|40.40|-73.80|Long Beach Island|3|||||||||PHI|1|4",

        "OKX|40.40|-74.30|40.73|-73.82|New York Harbor|2|||||||||OKX|1|4",
        "OKX|40.54|-73.78|40.80|-72.78|Fire Island|3|||||||||OKX|1|4",
        "OKX|40.83|-72.75|41.37|-71.69|Block Island|4|||||||||OKX|1|4",

        "BOX|41.90|-71.20|43.20|-70.30|Boston, MA|2|||||||||BOX|1|4",
	
        "GYX|43.76|-70.64|43.93|-70.46|Lake Sebago|2|||||||||GYX|1|4",
        "GYX|43.47|-71.50|43.73|-71.19|Lake Winnipesaukee|3|||||||||GYX|1|4",

        "CAR|44.27|-68.17|44.42|-67.96|Winter Harbor|2|||||||||CAR|1|4",
        "CAR|44.16|-68.42|44.30|-68.22|Bass Harbor|3|||||||||CAR|1|4",

        "HGX|29.00|-95.18|29.80|-94.46|Galveston Bay|2|||||||||HGX|1|4",

        "MOB|30.15|-88.45|30.85|-87.65|Mobile Bay|2|||||||||MOB|1|4",
        "MOB|30.08|-87.68|30.55|-87.20|Perdido Bay|3|||||||||MOB|1|4",
        "MOB|30.10|-87.32|30.65|-86.78|Escambia and Pensacola|4|||||||||MOB|1|4",
        "MOB|30.15|-86.80|30.55|-86.07|Choctahatchee Bay|5|||||||||MOB|1|4",
	
        "LIX|29.30|-90.60|30.40|-88.80|Lake Pontchartrain|2|||||||||LIX|1|4",

        "TAE|29.95|-85.87|30.37|-85.37|Panama City|2|||||||||TAE|1|4",
        "TAE|29.60|-85.46|29.95|-84.85|Cape San Blas/Apalachicola|3|||||||||TAE|1|4",
        "TAE|29.85|-84.50|30.15|-83.65|St. Marks|4|||||||||TAE|1|4",
        "TAE|29.00|-83.55|29.60|-82.75|Cedar Key|5|||||||||TAE|1|4",

        "TBW|27.48|-83.20|28.05|-82.38|Tampa Bay|2|||||||||TBW|1|4",

        //"MFL|25.850|-80.13|26.000|-80.03|Miami Beach|2|||||||||MFL|1|4",
        //"MFL|26.13|-81.90|26.21|-81.80|Naples Pier|3|||||||||MFL|1|4",
        //"MFL|26.89|-80.07|26.945|-80.02|Jupiter/Juno|4|||||||||MFL|1|4",
        //"MFL|26.18|-80.11|26.25|-80.04|Lauderdale-by-the-Sea|5|||||||||MFL|1|4",
        "MFL|25.72|-80.20|26.00|-80.03|Miami Beach|2|||||||||MFL|1|4",
        "MFL|26.67|-81.13|27.23|-80.57|Lake Okeechobee|3|||||||||MFL|1|4",
        "MFL|27.00|-80.14|26.72|-79.98|Jupiter/Juno|4|||||||||MFL|1|4",
        "MFL|26.32|-80.14|26.00|-80.00|Lauderdale-by-the-Sea|5|||||||||MFL|1|4",

        "KEY|24.30|-83.20|25.40|-80.10|Florida Keys|2|||||||||KEY|1|4",

        "MLB|28.20|-80.80|28.80|-80.30|Cape Canaveral|2|||||||||MLB|1|4",

        "JAX|30.93|-81.47|31.29|-81.25|St. Andrews Sound|2|||||||||JAX|1|4",
        "JAX|30.62|-81.49|30.78|-81.26|Kings Bay/St Marys|3|||||||||JAX|1|4",
        "JAX|30.38|-81.43|30.43|-81.36|Mayport|4|||||||||JAX|1|4",
        "JAX|29.87|-81.32|29.96|-81.24|St. Augustine and Matanzas Inlet|5|||||||||JAX|1|4",

        "SJU|17.55|-67.40|18.8|-64.40|San Juan, Puerto Rico|2|||||||||SJU|1|4",
        "SJU|18.325|-67.3|18.525|-67.1|Rincon/Aguadilla|3|||||||||SJU|1|4",

        "SEW|49.27|-122.11|49.42|-121.91|Seattle, wind sea only|2|||||||||SEW|1|4",

        "PQR|46.84|-124.26|47.01|-124.10|Grays Harbor Bar, Washington|2|||||||||PQR|1|4",
        "PQR|46.13|-124.20|46.38|-123.95|Columbia River Bar, Oregon|3|||||||||PQR|1|4",
        "PQR|45.37|-124.20|45.77|-123.90|Tillamook Bar, Oregon|4|||||||||PQR|1|4",
        "PQR|47.00|-123.50|47.15|-123.30|Portland, wind sea only|5|||||||||PQR|1|4",

        "MFR|43.20|-124.65|43.75|-124.15|Coos and Winchester Bays|2|||||||||MFR|1|4",
        "MFR|42.25|-124.95|43.00|-124.30|Cape Blanco|3|||||||||MFR|1|4",
        "MFR|42.00|-124.43|42.10|-124.20|Brookings|4|||||||||MFR|1|4",
        "MFR|44.30|-123.85|44.45|-123.65|Medford, wind sea only|5|||||||||MFR|1|4",

        "EKA|42.05|-123.55|42.20|-123.35|Eureka, wind sea only|2|||||||||EKA|1|4",

        "MTR|37.33|-123.18|38.34|-122.39|San Franscisco Bay, California|2|||||||||MTR|1|4",
        "MTR|36.22|-122.23|37.02|-121.72|Monterey Bay, California|3|||||||||MTR|1|4",
        "MTR|39.20|-120.99|39.40|-120.74|Monterey, wind sea only|4|||||||||MTR|1|4",

        "LOX|33.52|-118.41|33.77|-117.81|Port of Long Beach, California|2|||||||||LOX|1|4",
        "LOX|35.95|-117.50|36.10|-117.30|Los Angeles, wind sea only|3|||||||||LOX|1|4",

        "SGX|32.68|-117.34|32.89|-117.24|Coronado to La Jolla Cove, California|2|||||||||SGX|1|4",
        "SGX|33.74|-116.60|33.82|-116.50|San Diego, wind sea only|3|||||||||SGX|2|4",

        "HFO|21.55|-160.04|22.4|-159.09|Kauai and Niihau|2|||||||||HFO|1|4",
        "HFO|21.20|-158.35|21.81|-157.60|Oahu|3|||||||||HFO|1|4",
        "HFO|20.4|-156.9|21.4|-155.9|Maui - Kahului|4|||||||||HFO|1|4",
        "HFO|19.40|-155.20|19.90|-154.60|Hilo|5|||||||||HFO|1|4",
 
        "GUM|14.72|145.32|15.38|145.80|Saipan and Tinian|2|||||||||GUM|1|4",
        "GUM|13.12|144.52|13.78|145.08|Guam|3|||||||||GUM|1|4",
        "GUM|14.02|145.024|14.28|145.38|Rota|4|||||||||GUM|1|4",

        "AER|58.80|-154.40|61.60|-148.90|Cook Inlet|2|||||||||AER|1|4",
        "AER|59.30|-148.83|61.35|-145.43|Prince William Sound|3|||||||||AER|1|4",

        "AJK|57.00|-137.40|59.70|-132.50|Glacier Bay|2|||||||||AJK|1|4",
        "AJK|54.50|-136.00|57.25|-130.00|Prince of Whales Sound|3|||||||||AJK|1|4",
        "AFG|62.24|-166.67|65.08|-160.41|Norton Sound|2|||||||||AFG|1|4",
        "AFG|65.92|-166.18|68.23|-160.03|Kotzebue Sound|3|||||||||AFG|1|4",

        "ALU|53.820|-166.75|54.087|-166.30|Dutch Harbor|2|||||||||ALU|1|4",
        "ALU|57.80|-159.20|59.133|-156.70|Bristol Bay|3|||||||||ALU|1|4"
      ];

      // Set parameters for buoy stations 
      var obPoints = [
        "41009|28.519|-80.166|Buoy 41009 - 20 NM E of Canaveral|MLB",
        "41008|31.402|-80.869|Buoy 41008 - 40 NM SE of Savannah|JAX",
        "41112|30.709|-81.292|Buoy 41112 - Offshore Fernandina Beach, FL|JAX",
        "42012|30.065|-87.555|Buoy 42012 - Orange Beach, AL|MOB",
        "42040|29.212|-88.207|Buoy 42040 - 64 NM S of Dauphin Island|LIX",
        "42039|28.791|-86.008|Buoy 42039 - 114 NM SE of Pensacola|TAE",
        "42036|28.500|-84.517|Buoy 42036 - 106 NM WNW of Tampa|TAE",
        "42035|29.232|-92.413|Buoy 42035 - 22 NM E of Galveston|LCH",
        "42019|27.913|-95.353|Buoy 42019 - 60 NM S of Freeport|HGX",
        "41115|18.376|-67.280|Buoy 41115 - Rincon, Puerto Rico|SJU",
        "41053|18.474|-66.099|Buoy 41053 - San Juan, Puerto Rico|SJU",
        "42085|17.860|-66.524|Buoy 42085 - Southeast of Ponce, Puerto Rico|SJU",
        "41114|27.551|-80.225|Buoy 41114 - Fort Pierce|MFL",
        "41113|28.400|-80.530|Buoy 41113 - Cape Canaveral Nearshore|MLB",
        "42023|26.064|-83.074|Buoy 42023 - West Florida South Buoy|MFL",
        "42020|26.968|-96.694|Buoy 42020 - 60 NM SSE of Corpus Christi, TX|BRO",

        //"41040|14.516|-53.024|Buoy 41040 - 470 NM East of Martinique|NHC",
        //"41041|14.329|-46.082|Buoy 41041 - 890 NM East of Martinique|NHC",
        //"41043|21.061|-64.966|Buoy 41043 - 170 NM NE of Puerto Rico|NHC",
        //"41044|21.575|-58.625|Buoy 41044 - 330 NM NE of St. Martin Is|NHC",
        //"41046|23.888|-68.635|Buoy 41046 - 335 NM East of San Salvador Is, Bahamas|NHC",
        //"41047|27.517|-71.483|Buoy 41047 - 350 NM ENE of Nassau, Bahamas|NHC", 
        //"41048|31.950|-69.497|Buoy 41048 - 240 NM W of Bermuda|NHC",
        //"41049|27.537|-62.945|Buoy 41049 - 300 NM SE of Bermuda|NHC",
        //"41002|31.862|-74.835|Buoy 41002 - 225 NM S of Cape Hatteras|NHC",

        //"42055|22.203|-94.000|Buoy 42055 - Bay of Campeche|NHC",
        //"42056|19.802|-84.857|Buoy 42056 - Yucatan Basin|NHC",
        //"42057|17.002|-81.501|Buoy 42057 - Western Caribbean|NHC",
        //"42058|14.923|-74.918|Buoy 42058 - 210 NM SSE of Kingston,Jamaica|NHC",
        //"42059|15.054|-67.472|Buoy 42059 - SW of Puerto Rico|NHC",
        //"42060|16.333|-63.500|Buoy 42060 - SE of Puerto Rico|NHC",

        //"42001|25.888|-89.658|Buoy 42001 - MID GULF - 180 nm South of Southwest Pass, LA|NHC",
        //"42002|25.790|-93.666|Buoy 42002 - 207 NM E of Brownsville|NHC",
        //"42003|26.044|-85.612|Buoy 42003 - 208 NM W of Naples|NHC",
        //"41010|28.903|-78.464|Buoy 41010 - Canaveral East|NHC",

        "41008|31.400|-80.868|Buoy 41008|CHS",
        "41029|32.800|-79.620|Buoy 41029|CHS",
        "41033|32.270|-80.400|Buoy 41033|CHS",
        "41004|32.501|-79.099|Buoy 41004|CHS",
        "41065|32.801|-79.619|Buoy 41065|CHS",
        "41076|32.536|-79.659|Buoy 41076|CHS",

        "41013|33.436|-77.743|Buoy 41013|ILM",
        //"41108|33.721|-78.015|Buoy 41108|ILM",
        //"41110|34.141|-77.709|Buoy 41110|ILM",
        //"41159|34.210|-76.948|Buoy 41159|ILM",

        "41025|35.006|-75.402|Buoy 41025|MHX",
        "44095|35.750|-75.330|Buoy 44095|MHX",
        "44100|36.255|-75.591|Buoy 44100|MHX",
        "44056|36.200|-75.714|Buoy 44056|MHX",
        //"41036|34.207|-76.949|Buoy 41036|MHX",
        "41159|34.210|-76.948|Buoy 41159|MHX",

        "44014|36.611|-74.842|Buoy 44014|AKQ",
        //"44100|36.255|-75.591|Buoy 44100|AKQ",
        "44093|36.872|-75.492|Buoy 44093|AKQ",
        //"44099|36.915|-75.720|Buoy 44099|AKQ",
        "44096|37.023|-75.810|Buoy 44096|AKQ",
        "44064|36.998|-76.087|Buoy 44096|AKQ",
        "44072|37.201|-76.266|Buoy 44096|AKQ",
        "44099|36.915|-75.720|Buoy 44096|AKQ",
        "44089|37.756|-75.334|Buoy 44096|AKQ",
        "44058|37.551|-76.257|Buoy 44058|AKQ",

        "44043|39.152|-76.391|Buoy 44043|LWX",
        "TPLM2|38.899|-76.436|Buoy TPLM2|LWX",
        "44062|38.556|-76.415|Buoy 44062|LWX",
        "44042|38.033|-76.336|Buoy 44042|LWX",

        "44009|38.461|-74.703|Buoy 44009|PHI",
        "44091|39.778|-73.769|Buoy 44091|PHI",

        "44065|40.369|-73.703|Buoy 44065|OKX", 
        "44094|40.585|-73.106|Buoy 44094|OKX",
        "44025|40.251|-73.164|Buoy 44025|OKX",
        "44040|40.956|-73.580|Buoy 44040|OKX",
        "44039|41.138|-72.655|Buoy 44039|OKX",
        "44060|41.263|-72.067|Buoy 44060|OKX",
        "44069|40.693|-73.086|Buoy 44069|OKX",

        "44017|40.694|-72.048|Buoy 44017|BOX",
        "44020|41.443|-70.187|Buoy 44020|BOX",
        "44018|42.121|-69.701|Buoy 44018|BOX",
        "44013|42.346|-70.651|Buoy 44013|BOX",
        "44098|42.798|-70.168|Buoy 44098|BOX",
        "44029|42.523|-70.566|Buoy 44029|BOX",
        "44090|41.840|-70.329|Buoy 44090|BOX",

        //"44030|43.181|-70.428|Buoy 44030|GYX",
        //"44005|43.204|-69.128|Buoy 44005|GYX",
        "44007|43.525|-70.141|Buoy 44007|GYX",
        "44033|44.056|-68.997|Buoy 44033|GYX",
        "44032|43.716|-69.355|Buoy 44032|GYX",

        "44034|44.106|-68.109|Buoy 44034|CAR",
        "44027|44.287|-67.307|Buoy 44027|CAR",
        //"44037|43.491|-67.880|Buoy 44037|CAR"

        "46206|48.835|-125.998|Buoy 46206|SEW",
        "46041|47.353|-124.731|Buoy 46041|SEW",
        "46087|48.494|-124.728|Buoy 46087|SEW",
        "46088|48.334|-123.165|Buoy 46088|SEW",

        "46211|46.858|-124.244|Buoy 46211|PQR",
        "46243|46.215|-124.129|Buoy 46243|PQR",
        "46248|46.133|-124.645|Buoy 46248|PQR",
        "46029|46.159|-124.514|Buoy 46029|PQR", 
        "46050|44.656|-124.526|Buoy 46050|PQR",

        "46015|42.764|-124.832|Buoy 46015|MFR",
        "46027|41.852|-124.382|Buoy 46027|MFR",
        "46229|43.767|-124.549|Buoy 46229|MFR",

        "46213|40.300|-124.740|Buoy 46213|EKA",
        "46212|40.750|-124.310|Buoy 46212|EKA",
        //"46027|41.760|-124.380|Buoy 46027|EKA",
        "46014|39.220|-123.970|Buoy 46014|EKA", 

        "46214|37.946|-123.469|Buoy 46214|MTR",
        "46013|38.242|-123.301|Buoy 46013|MTR",
        "46012|37.363|-122.881|Buoy 46012|MTR",
        "46026|37.755|-122.839|Buoy 46026|MTR",
        "46237|37.786|-122.634|Buoy 46237|MTR",

        "46042|36.785|-122.469|Buoy 46042|MTR",
        "46028|35.741|-121.884|Buoy 46028|MTR",
        "46239|36.342|-122.102|Buoy 46239|MTR",
        "46236|36.761|-121.947|Buoy 46236|MTR",
        "46240|36.626|-121.907|Buoy 46240|MTR",

        "46028|35.740|-121.880|Buoy 46028|LOX",
        "46219|33.220|-119.880|Buoy 46219|LOX",
        "46069|33.670|-120.210|Buoy 46069|LOX",
        "46221|33.860|-118.630|Buoy 46221|LOX",
        "46222|33.618|-118.317|Buoy 46222|LOX",
        "46253|33.578|-118.184|Buoy 46253|LOX",
        "46256|33.700|-118.201|Buoy 46256|LOX",
        "46011|34.956|-121.019|Buoy 46011|LOX",
        "46053|34.252|-119.853|Buoy 46053|LOX",
        "46054|34.265|-120.477|Buoy 46054|LOX",
        "46025|33.749|-119.053|Buoy 46025|LOX",
        "46218|34.454|-120.782|Buoy 46218|LOX",
        "46223|33.458|-117.767|Buoy 46223|LOX",

        "46086|32.491|-118.035|Buoy 46086|SGX",
        "46224|33.179|-117.471|Buoy 46224|SGX",
        "46232|32.530|-117.431|Buoy 46232|SGX",
        "46231|32.747|-117.370|Buoy 46231|SGX",
        "46258|32.750|-117.500|Buoy 46258|SGX",
        "46225|32.930|-117.392|Buoy 46225|SGX",
        "46242|33.220|-117.439|Buoy 46242|SGX",
        "46254|32.868|-117.267|Buoy 46254|SGX",
        "LJPC1|32.867|-117.257|Buoy LJPC1|SGX",

        "51208|22.300|-159.570|Buoy 51208|HFO",
        "51207|21.477|-157.752|Buoy 51207|HFO",
        "51206|19.781|-154.968|Buoy 51206|HFO",
        "51205|21.018|-156.425|Buoy 51205|HFO",
        "51204|21.281|-158.124|Buoy 51204|HFO",
        "51203|20.788|-157.010|Buoy 51203|HFO",
        "51202|21.414|-157.679|Buoy 51202|HFO",
        "51201|21.669|-158.120|Buoy 51201|HFO",
        "51003|19.289|-160.569|Buoy 51003|HFO",
        "Kona|19.650|-156.180|Buoy Kona|HFO",
        "Isaac|19.410|-154.730|Buoy Isaac|HFO",

        "52200|13.354|144.788|Buoy 52200|GUM",
        "52211|15.267|145.662|Buoy 52211|GUM",
        "APRP7|13.444|144.657|Buoy APRP7|GUM",

        "46001|56.304|-147.920|Buoy 46001|AER",
        "46080|57.939|-149.960|Buoy 46080|AER",
        "46076|59.502|-147.990|Buoy 46076|AER",
        "46082|59.668|-143.392|Buoy 46082|AER",
        "46061|60.227|-146.834|Buoy 46061|AER",
        "46060|60.584|-146.784|Buoy 46060|AER",
        "46108|59.590|-151.817|Buoy 46108|AER",
        "46081|60.799|-148.263|Buoy 46081|AER",
        "46077|57.892|-154.291|Buoy 46077|AER",

        //"46066|52.785|-155.047|Buoy 46066|ALU",
        "46075|53.911|-160.806|Buoy 46075|ALU",
        "46073|55.031|-172.001|Buoy 46073|ALU",
        //"VCVA2|57.125|-170.285|Buoy VCVA2|ALU",

        "46085|55.868|-142.494|Buoy 46085|AJK",
        "46083|58.300|-137.997|Buoy 46083|AJK",
        "FFIA2|57.272|-133.630|Buoy FFIA2|AJK",

        "48114|65.011|-169.454|Buoy 48114|AFG",
        "48012|70.025|-166.071|Buoy 48012|AFG",
        "48212|70.874|-150.279|Buoy 48212|AFG"
      ];

      // Set domains for rip current output (to include *.rip files)
      var ripDomains = [
        "TBW",
        "MFL",
        "MHX",
        "BOX",
        "SGX",
        "HFO",
        "SJU",
        "AKQ",
        "OKX",
        "CAR",
        "MLB",
        "JAX",
        "CHS",
        "ILM",
        "PHI",
        "GYX",
        "KEY",
        "TAE",
        "MOB",
        "HGX",
        "GUM"
      ];

      // Set domains for additional wave tracking output (to include *.inc files)
      var incDomains = [
        "MFL",
        "EKA",
        "HFO"
      ];

      // Create a symbol for drawing WFO domains
      var fillSymbol = new SimpleFillSymbol({
        color: [227, 139, 79, 0.35],
        outline: { // autocasts as new SimpleLineSymbol()
          color: "red",
          width: 1
        }
      });

      // Create a symbol for buoy output points
      var markerSymbol = new SimpleMarkerSymbol({
        color: "yellow",
        style: "diamond",
        size: 10,
        outline: { // autocasts as new SimpleLineSymbol()
          color: [0, 0, 0],
          width: 1
        }
      });

      // Create a symbol for additional wave tracking output points (Gerling-Hanson plots)
      var markerSquare = new SimpleMarkerSymbol({
        color: "yellow",
        style: "square",
        size: 8,
        outline: { // autocasts as new SimpleLineSymbol()
          color: [0, 0, 0],
          width: 1
        }
      });

      // Set up WFO domain locations and add them to the Map View (Base Layer)
      for(var i=0; i<siteArray.length; i++) {
              var splitSiteArray = siteArray[i].split("|");
              var site = splitSiteArray[0];
              this['poly'+site] = new Polygon({
                 rings: [
                      [Number(splitSiteArray[2]), Number(splitSiteArray[1])],
                      [Number(splitSiteArray[2]), Number(splitSiteArray[3])],
                      [Number(splitSiteArray[4]), Number(splitSiteArray[3])],
                      [Number(splitSiteArray[4]), Number(splitSiteArray[1])]
                 ]
              });
              var contentVar = '<p><a href=//polar.ncep.noaa.gov/nwps/nwpsloop.php?site='+splitSiteArray[0]+
                               '&cg=1 target=_blank>Model Field Animations</p>';
              this['polyGrap'+site] = new Graphic({
                  geometry: this['poly'+site],
                  symbol: fillSymbol,
                  popupTemplate: { // autocasts as new PopupTemplate()
                          title: "WFO "+splitSiteArray[5],
                          content: [{
                                  type: "text",
                                  text: contentVar,
                          }]
                  }
              });
              view.graphics.add(this['polyGrap'+site])
      }

      // Set up WFO domain locations and add them to the Map View (Nest Layer)
      for(var i=0; i<siteArrayNest.length; i++) {
              var splitSiteArray = siteArrayNest[i].split("|");
              var site = splitSiteArray[0];
              this['poly'+site] = new Polygon({
                 rings: [
                      [Number(splitSiteArray[2]), Number(splitSiteArray[1])],
                      [Number(splitSiteArray[2]), Number(splitSiteArray[3])],
                      [Number(splitSiteArray[4]), Number(splitSiteArray[3])],
                      [Number(splitSiteArray[4]), Number(splitSiteArray[1])]
                 ]
              });
              var contentVar = '<p><a href=//polar.ncep.noaa.gov/nwps/nwpsloop.php?site='+splitSiteArray[0]+
                               '&cg='+splitSiteArray[6]+' target=_blank>Model Field Animations</p>';
              this['polyGrap'+site] = new Graphic({
                  geometry: this['poly'+site],
                  symbol: fillSymbol,
                  popupTemplate: { // autocasts as new PopupTemplate()
                          title: splitSiteArray[5],
                          content: [{
                                  type: "text",
                                  text: contentVar,
                          }]
                  }
              });
              view.graphics.add(this['polyGrap'+site])
      }

      // Set up rip current output (*.rip) locations and add them to the Map View
      for(var i=0; i<ripDomains.length; i++) {
         var sid = ripDomains[i];
         var siteNumber = "1";
         var fileExist = urlExists("/nwps/images/rtimages/validation/"+sid+siteNumber+".rip");
         if (fileExist != false) {
              this[sid+siteNumber+"PointSites"] = new Array();
              var sitePoints = new Array();
              includeText = includeText.replace(/(\r|\n|\")/g,"");
              sitePoints = includeText.split(",");

              for(var j=0; j<sitePoints.length; j++) {
                      var splitSitePoints = sitePoints[j].split("|");
                      var site = splitSitePoints[0];
                      this['point'+site] = new Point({
                          longitude: splitSitePoints[2],
                          latitude: splitSitePoints[1]
                      });
                      var ripSymbol = new SimpleMarkerSymbol({
                        color: splitSitePoints[5],
                        style: "circle",
                        size: 8,
                        outline: { // autocasts as new SimpleLineSymbol()
                           color: splitSitePoints[5],
                           width: 1
                        }
                      });
                      var contentVar = '<p>'+splitSitePoints[1]+' '+splitSitePoints[2]+
                                       '</p><p><a href="/nwps/images/rtimages/validation/nwps_'+splitSitePoints[0]+
                                       '.png" target="_blank">Rip Current Time Series</a></p>';
                      this['pointGraphic'+site] = new Graphic({
                          geometry: this['point'+site],
                          symbol: ripSymbol,
                          popupTemplate: { // autocasts as new PopupTemplate()
                                  title: splitSitePoints[3]+": "+splitSitePoints[6]+" risk next 24h",
                                  content: [{
                                          type: "text",
                                          text: contentVar,
                                  }]
                          }
                      });
                      view.graphics.add(this['pointGraphic'+site])
              }
         }
      }

      // Set up buoy point locations and add them to the Map View
      for(var i=0; i<obPoints.length; i++) {
              var splitObPoint = obPoints[i].split("|");
              var site = splitObPoint[0];
              this['point'+site] = new Point({
                  longitude: splitObPoint[2],
                  latitude: splitObPoint[1]
              });
              var contentVar = '<p>'+splitObPoint[1]+' '+splitObPoint[2]+'</p><p><a href="/nwps/images/rtimages/validation/nwps_'
                     +splitObPoint[4].toLowerCase()+'_'+splitObPoint[0]+'_ts.png" target="_blank">Forecast</a>'+
                     '&nbsp;&nbsp;&nbsp;&bull;&nbsp;&nbsp;&nbsp;'+'<a href="/nwps/images/rtimages/validation/nwps_'+
                     splitObPoint[4].toLowerCase()+'_'+splitObPoint[0]+
                     '_scatter.png" target="_blank">30-day Validation</a></p><p><a href=//polar.ncep.noaa.gov/nwps/images/rtimages/'+
                     splitObPoint[4].toLowerCase()+'/nwps/CG0/Hansonplot_'+splitObPoint[0]+'.png target=_blank>Gerling-Hanson Plot</p>';
              this['pointGraphic'+site] = new Graphic({
                  geometry: this['point'+site],
                  symbol: markerSymbol,
                  popupTemplate: { // autocasts as new PopupTemplate()
                          title: "Buoy "+site,
                          content: [{
                                  type: "text",
                                  text: contentVar,
                          }]
                  }
              });
              view.graphics.add(this['pointGraphic'+site])
      }

      // Set up additional wave tracking (*.inc) locations and add them to the Map View
      for(var i=0; i<incDomains.length; i++) {
         var sid = incDomains[i];
         var siteNumber = "1";
         var fileExist = urlExists("/nwps/"+sid+siteNumber+".inc");
         if (fileExist != false) {
              this[sid+siteNumber+"PointSites"] = new Array();
              var sitePoints = new Array();
              includeText = includeText.replace(/(\r|\n|\")/g,"");
              sitePoints = includeText.split(",");

              for(var j=0; j<sitePoints.length; j++) {
                      var splitSitePoints = sitePoints[j].split("|");
                      var site = splitSitePoints[0];
                      this['point'+site] = new Point({
                          longitude: splitSitePoints[2],
                          latitude: splitSitePoints[1]
                      });
                      var contentVar = '<p><a href=//polar.ncep.noaa.gov/nwps/images/rtimages/'+sid.toLowerCase()+
                     '/nwps/CG0/Hansonplot_'+splitSitePoints[0]+'.png target=_blank>Gerling-Hanson Plot</p>';
                      this['pointGraphic'+site] = new Graphic({
                          geometry: this['point'+site],
                          symbol: markerSquare,
                          popupTemplate: { // autocasts as new PopupTemplate()
                                  title: "Buoy "+splitSitePoints[0],
                                  content: [{
                                          type: "text",
                                          text: contentVar,
                                  }]
                          }
                      });
                      view.graphics.add(this['pointGraphic'+site])
              }
         }
      }

      function urlExists(url) {
           var http = new XMLHttpRequest();
           http.open('GET',url, false);
           http.send();
           includeText = http.responseText;
           if (http.status!=404) {
                      return includeText;
           }
           else {
                      return http.status!=404;
           }
      }

    });
