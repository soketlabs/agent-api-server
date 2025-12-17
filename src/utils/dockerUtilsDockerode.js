import Docker from 'dockerode';
const docker = new Docker();
import fs from 'fs';
import path from 'path';
// import 'dotenv/config';// Import dotenv
import dotenv from 'dotenv';
dotenv.config({ path: path.resolve(process.cwd(), '../../.env') });

// Configuration
const HOST_SOURCE_PATH = '/Users/SId/workspace/tensorstudio/test_telephony/sample_data2'; 
const containerAppPath = process.env.CONTAINER_APP_PATH;
const imageName = process.env.IMAGE_NAME;
// const CONTAINER_NAME = 'test-telephony-container';
const envFilePath = path.resolve(process.cwd(), '../../.env'); // Path to your .env file
const containerPort = process.env.CONTAINER_PORT;



// Function to load environment variables from file
export function loadEnvVars(filePath) {
    if (!fs.existsSync(filePath)) {
        console.warn(`Warning: .env file not found at ${filePath}. Container will start without these variables.`);
        return [];
    }
    const envConfig = dotenv.parse(fs.readFileSync(filePath));
    // Convert the object format from dotenv into Docker's required array format ['KEY=VALUE']
    return Object.keys(envConfig).map(key => `${key}=${envConfig[key]}`);
}

export async function startContainerWithVolume(containerName, hostSourcePath=HOST_SOURCE_PATH) {
    console.log(`Starting container and binding ${hostSourcePath} to ${containerAppPath}`);
    console.log("Container App Path:", containerAppPath);
    console.log("envFilePath:", envFilePath);
    let container;
    // Load the environment variables
    const envVars = loadEnvVars(envFilePath);
    try {
        console.log("container port:", containerPort);
        container = await docker.createContainer({
            Image: imageName,
            name: containerName,
            Env: envVars,
            ExposedPorts: { [containerPort]: {} },
            HostConfig: {
                Binds: [
                    `${hostSourcePath}:${containerAppPath}:rw` 
                ],
                PortBindings: {
                        [containerPort]: [
                            { HostPort: "" }
                        ]
                }
            }
        });

        console.log('Container created. Starting container in background...');
        await container.start();
        console.log('✅ Container started.');
        return container;

    } catch (error) {
        console.error('❌ An error occurred during container operation:', error.message);
    } finally {
        
    }
}

export async function getContainerinfo(containerId) {
    try {
        const container = docker.getContainer(containerId);
        const data = await container.inspect();
        return data;
    } catch (error) {
        console.error('Error fetching container info:', error);
        throw error;
    }
}   

export async function getAgentInfo(containerId) {
    try {
        const container = docker.getContainer(containerId);
        const containerName = container.Name
        const containerInfo = await getContainerinfo(containerId);
        const portMapping = containerInfo.NetworkSettings.Ports[`${containerPort}/tcp`];
        const hostPort = portMapping ? portMapping[0].HostPort : null;
        console.log(containerInfo.NetworkSettings);
        return {
            "ContainerId": containerId,
            "AgentName": containerInfo.Name,
            "AgentPort": hostPort
        };
    } catch (error) {
        console.error('Error fetching agent info:', error);
        throw error;
    }
}

// startContainerWithVolume();
