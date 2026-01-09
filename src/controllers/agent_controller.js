import {
    createAgentService,
    getAgentService,
    deleteAgentService
} from "../controllers/agent_service.js";


export async function createAgent(req, res) {
    try {
        const userId = req.user.id;
        const payload = req.body;

        const agent = await createAgentService(userId, payload);

        res.status(201).json({
            success: true,
            agent
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
}


export async function getAgent(req, res) {
    try {
        const userId = req.user.id;
        const { agentId } = req.params;

        const agent = await getAgentService(userId, agentId);

        if (!agent) {
            return res.status(404).json({
                success: false,
                error: "Agent not found"
            });
        }

        res.json({
            success: true,
            agent
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
}

export async function deleteAgent(req, res) {
    try {
        const userId = req.user.id;
        const { agentId } = req.params;

        const deletedAgent = await deleteAgentService(userId, agentId);

        if (!deletedAgent) {
            return res.status(404).json({
                success: false,
                error: "Agent not found"
            });
        }

        res.json({
            success: true,
            message: "Agent deleted successfully"
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
}