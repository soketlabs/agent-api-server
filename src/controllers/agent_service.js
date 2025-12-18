import dotenv from 'dotenv'; // Import dotenv
import path from 'path';
dotenv.config({ path: path.resolve(import.meta.dirname, '../../.env') });
// dotenv.config();
// import { AgentCreateRequestModel } from '../models.js'; 
import { randomUUID } from "crypto";
import {startContainerWithVolume, getAgentInfo, getContainerinfo} from "../utils/dockerUtilsDockerode.js";

export async function createAgentService(userId, data) {
    const uuid = randomUUID();
    const containerName = `agent-${uuid}`;

    const agent_dir = `${process.env.HOST_DATA_DIR}/${containerName}`;
    await import('fs').then(fs => fs.promises.mkdir(agent_dir, { recursive: true }));
    await import('fs').then(fs => fs.promises.writeFile(
        `${agent_dir}/config.json`,
        JSON.stringify(data, null, 2)
    ));
    // Create container
    const container = await startContainerWithVolume(containerName, agent_dir);
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
    req.body = result.data; // Use the validated/parsed data
    next();
};
