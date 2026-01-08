import dotenv from 'dotenv'; // Import dotenv
dotenv.config();
// import { AgentCreateRequestModel } from '../models.js'; 
import { randomUUID } from "crypto";
import {startContainerWithVolume, getAgentInfo, getContainerinfo} from "../utils/dockerUtilsDockerode.js";

export async function createAgentService(userId, data) {
    const uuid = randomUUID();
    const containerName = `agent-${uuid}`;

    // Create container
    const container = await startContainerWithVolume(containerName);
    const agentInfo = await getAgentInfo(container.id);
    
    agentInfo["AgentId"] = containerName;
    console.log("Agent Info:", agentInfo);
    return agentInfo;

    // Save to Mongo
    // return await Agent.create({
    //     uuid,
    //     name: data.name,
    //     phone: data.phone,
    //     workflow: data.workflow,
    //     language: data.language,
    //     containerId: container.id,
    //     containerName,
    //     userId
    // });
}

export const validate = (schema) => (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({ errors: result.error.errors });
    }
    req.body = result.data; 
    next();
};
export async function getAgentService(userId, agentId) {
    // const agent = await Agent.findOne({ userId, uuid: agentId });
    // return agent;
    const container = await getContainerinfo(agentId);
    return container;
}
export async function deleteAgentService(userId, agentId) {
    const container = await getContainerinfo(agentId)
    // const deletedAgent = await Agent.findOneAndDelete({ userId, uuid: agentId });
    // return deletedAgent;

}        
 
