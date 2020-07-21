import React, { useState, useEffect } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { scaleQuantile } from "d3-scale";
import ReactTooltip from 'react-tooltip';
import ToolTipTable from '../TooltipTableComponent/ToolipTable'

// const geoUrl = "https://cdn.rawgit.com/anneching/bb4982bbc63966e63bdd/raw/87b1986b1b9e0a9547fbb60b4c609932f6ddc148/cbsa_us_2014_ex_hi_ak.json";
const CBSA_TOPO_JSON = require('./cbsa.json');


const PROJECTION_CONFIG = {
  scale: 600,
};

const COLOR_RANGE = [
  
 '#ed7513',
  '#fcb474',
  '#FFCC99',
  '#FFA54F',
  '#EE7621',
  '#FF6600',
  '#CD3700',
  '#F79862',
  'rgb(251,206,177)'];

  const getRandomInt = () => {
    return parseInt(Math.random() * 100);
  };
  
const getDataInstance = ()=> { return [
      { id: '47920', state: 'Washington Court House, OH', value: 67 },
      { id: '28500', state: 'Kerrville, TX', value: 3 },
      { id: '22800', state: 'Fort Madison-Keokuk, IA-IL-MO', value: 110 },
      { id: '14260', state: 'Boise City, ID', value: 50 },
      { id: '47340', state: 'Indianapolis-Carmel-Anderson, IN', value: 87 },
      { id: '26900', state: 'Detroit-Warren-Dearborn, MI', value: 45 },
      { id: '14460', state: 'Boston-Cambridge-Newton, MA-NH', value: 80 },
      { id: '15660', state: 'Calhoun, GA', value: 43 },
      { id: '32700', state: 'McPherson, KS', value: 54},
      { id: '34780', state: 'Muskogee, OK', value: 0 },
      { id: '29620', state: 'Lansing-East Lansing, MI', value: 3 },
      { id: '38220', state: 'Pine Bluff, AR', value: getRandomInt() },
      { id: '18820', state: 'Crawfordsville, IN', value: 25 },
      { id: '43460', state: 'Sikeston, MO', value: getRandomInt() },
      { id: '34900', state: 'Napa, CA', value: 15 },
      { id: '35260', state: 'New Castle, PA', value: 50 },
      { id: '11380', state: 'Andrews, TX', value: 43 },
      { id: '43100', state: 'Sheboygan, WI', value: getRandomInt()},
      { id: '44620', state: 'Stevens Point, WI', value: getRandomInt() },
      { id: '23300', state: 'Freeport, IL', value: 3 },
      { id: '10100', state: 'Aberdeen, SD', value: getRandomInt() },
      { id: '19260', state: 'Danville, VA', value: 25 },
      { id: '26980', state: 'Iowa City, IA', value: getRandomInt() },
      { id: '19220', state: 'Danville, KY', value: 15 },
      { id: '37420', state: 'Pampa, TX', value: getRandomInt() },
      { id: '34260', state: 'Mountain Home, AR', value: getRandomInt() },
      { id: '47420', state: 'Wahpeton, ND-MN', value: getRandomInt()},
      { id: '41660', state: 'San Angelo, TX', value: getRandomInt() },
      { id: '32260', state: 'Marshalltown, IA', value: 3 },
      { id: '14340', state: 'Boone, IA', value: getRandomInt() },
      { id: '35500', state: 'Newton, IA', value: 25 },
      { id: '11900', state: 'Athens, OH', value: getRandomInt() },
      { id: '46620', state: 'Uvalde, TX', value: 15 },
      { id: '28340', state: 'Kendallville, IN', value: getRandomInt() },
      { id: '32280', state: 'Martin, TN', value: getRandomInt() },
      { id: '49220', state: 'Wisconsin Rapids-Marshfield, WI', value: getRandomInt()},
      { id: '20340', state: 'Duncan, OK', value: getRandomInt() },
      { id: '37340', state: 'Palm Bay-Melbourne-Titusville, FL', value: 3 },
      { id: '28380', state: 'Kennett, MO', value: getRandomInt() },
      { id: '16380', state: 'Celina, OH', value: 25 },
      { id: '11780', state: 'Ashtabula, OH', value: getRandomInt() },
      { id: '27160', state: 'Jackson, OH', value: 15 },
      { id: '30420', state: 'Lexington, NE', value: getRandomInt() },
      { id: '19980', state: 'Dodge City, KS', value: getRandomInt() },
      { id: '31540', state: 'Madison, WI', value: getRandomInt()},
      { id: '15620', state: 'Cadillac, MI', value: getRandomInt() },
      { id: '48220', state: 'Weatherford, OK', value: 3 },
      { id: '31580', state: 'Madisonville, KY', value: getRandomInt() },
      { id: '21120', state: 'Elk City, OK', value: 25 },
      { id: '22060', state: 'Faribault-Northfield, MN', value: getRandomInt() },
      { id: '34640', state: 'Olean, NY', value: 15 },
      { id: '26960', state: 'Ionia, MI', value: getRandomInt() },
      { id: '38260', state: 'Pittsburg, KS', value: getRandomInt() },
      { id: '13720', state: 'Big Stone Gap, VA', value: getRandomInt()},
      { id: '23700', state: 'Gallup, NM', value: getRandomInt() },
      { id: '35060', state: 'Natchitoches, LA', value: getRandomInt()},
      { id: '43260', state: 'Sheridan, WY', value: getRandomInt() },
      { id: '44580', state: 'Sterling, IL', value: 3 },
      { id: '14420', state: 'Borger, TX', value: getRandomInt() },
      { id: '30580', state: 'Liberal, KS', value: 25 },
      { id: '23980', state: 'Glasgow, KY', value: getRandomInt() },
      { id: '23660', state: 'Galesburg, ILH', value: 15 },
      { id: '34740', state: 'Muskegon, MI', value: getRandomInt() },
      { id: '34280', state: 'Mount Pleasant, MI', value: getRandomInt() },
      { id: '26740', state: 'Hutchinson, KS', value: getRandomInt()},
      { id: '30220', state: 'Levelland, TX', value: getRandomInt() },
      { id: '31820', state: 'Manitowoc, WI', value: 3 },
      { id: '30700', state: 'Lincoln, NE', value: getRandomInt() },
      { id: '39900', state: 'Reno, NV', value: 25 },
      { id: '46300', state: 'Twin Falls, ID', value: getRandomInt() },
      { id: '21220', state: 'Elko, NV', value: 15 },
      { id: '49080', state: 'Winnemucca, NV', value: getRandomInt() },
      { id: '25200', state: 'Hailey, ID', value: getRandomInt() },
      { id: '32100', state: 'Marquette, MI', value: getRandomInt()},
      { id: '34300', state: 'Mountain Home, ID', value: 50 },
      { id: '36620', state: 'Ontario,OR-ID', value: 50},
      { id: '21980', state: 'Fallon, NV', value: 50 },
      { id: '36620', state: 'Ontario,OR-ID', value: 50},

     
  ] }

function MapChart (){
const [tooltipContent, setTooltipContent] = useState('');
const [data,setData] = useState(getDataInstance());

const cbsaID='cbsa-map'

const colorScale = scaleQuantile()
    .domain(data.map(d => d.value))
    .range(COLOR_RANGE);
 
  const onMouseEnter = (geo, current = { value: 'NA' }) => {
    return () => {
      
    setTooltipContent(geo.properties.hasOwnProperty("CBSAFP")?<ToolTipTable 
    stateName={geo.properties.NAME}
    mapID={cbsaID}/>: '') 
     
    };
   
  };


  const onMouseLeave = () => {
    setTooltipContent('');
  };

  return (
    <div>
    <ReactTooltip>{tooltipContent}</ReactTooltip>
      <ComposableMap  projectionConfig={PROJECTION_CONFIG}

       projection="geoAlbersUsa"
          width={985}
          height={551}
      data-tip="">
        <Geographies geography={CBSA_TOPO_JSON}>
          {({ geographies }) =>
            geographies.map(geo => {
              const cur = data.find(s => s.id === geo.properties.GEOID);
              
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  // stroke={geo.properties.hasOwnProperty("CBSAFP")?"white": "#9B9391"}
                  stroke= 'rgb(153, 153, 153)'
                  stroke-linejoin= 'round'
                  stroke-width=' 0.5'
                  fill={cur? colorScale(cur.value): "#FFFFFF"}
                  onMouseEnter={onMouseEnter(geo, cur)}
                onMouseLeave={onMouseLeave}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
    </div>

  );
};

export default MapChart;