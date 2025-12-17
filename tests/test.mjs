import { createAgent } from "../src/controllers/agent_service.js"; 
// const agent_service = require("../src/controllers/agent_service");
import { getContainerinfo } from "../src/utils/dockerUtilsDockerode.js";   

// const new_container = await createAgent(123, "123");
// // const containerInfo =await getContainerinfo('e73ecbb58727');
// console.log("New Container from test.mjs:", new_container);
// const containerInfo =await getContainerinfo(new_container.id);
// console.log("Container Info from test.mjs:", containerInfo);
// const { NetworkSettings } = await new_container.inspect();
  
// // Access the specific mapping for container port 80
// const portMapping = NetworkSettings.Ports['3389/tcp'];

// console.log(portMapping ? portMapping[0].HostPort : null);
const new_agent = await createAgent(123, {});
// console.log("New Agent from test.mjs:", new_agent);


// {
//     "data_config":{
//         "session_config": { 
//             "instructions": "You are a helpful assitant named John",
//             "voice": "felicity", 
//             "language": "en-US",
//             "turn_detection": { 
//                 "type": "server_vad", 
//                 "threshold": 0.2, 
//                 "prefix_padding_ms": 1000 ,
//                 "silence_duration_ms": 1000
//             }
//         },
//         "provider_config": {
//             "provider": "plivo"
//         }
//     }
// }