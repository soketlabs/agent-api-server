import express from 'express';
import { createAgentService, validate, getAgentService, deleteAgentService } from './controllers/agent_service.js'; 
// const authenticate = require("../controller/middleware.js");
// import { AgentCreateRequestModel } from './models.js';
import { apiKeyAuth } from './controllers/middleware.js';

const router = express.Router();
router.use(express.json());

// Define API routes
// router.get('/create_agent', authenticate.auth, createAgent);
router.post('/create_agent',  apiKeyAuth, async(req, res) => {
    try {
        const agent = await createAgentService(req.body.userId, req.body.data_config);
        res.status(201).json(agent);
    } catch (error) {
        console.error("Error creating agent:", error);
        res.status(500).json({ error: "Failed to create agent" });
    }
});

// Add more routes as needed
router.get('/status', apiKeyAuth, (req, res)=> {
    res.json({ status: 'API is running' });
});

router.get('/get_agent/:agentId', apiKeyAuth, async(req, res) => {
    try {
        const agentId = req.params.agentId;
        const agent = await getAgentService(req.body.userId, agentId);
        res.json(agent);
    } catch (error) {
        console.error("Error fetching agent:", error);
        res.status(500).json({ error: "Failed to fetch agent" });
    }
});

router.delete('/delete_agent/:agentId',apiKeyAuth,  async(req, res) => {
    try {
        const agentId = req.params.agentId;
        const result = await deleteAgentService(req.body.userId, agentId);
        res.json({result });
    } catch (error) {
        console.error("Error deleting agent:", error);
        res.status(500).json({ error: "Failed to delete agent" });
    }
}); 

export default router;