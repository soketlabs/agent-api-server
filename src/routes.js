import express from 'express';
import { createAgentService, validate } from './controllers/agent_service.js'; 
// const authenticate = require("../controller/middleware.js");
// import { AgentCreateRequestModel } from './models.js';
import { apiKeyAuth } from "./controllers/middleware.js";

const router = express.Router();
router.use(express.json());

// Define API routes
// router.get('/create_agent', authenticate.auth, createAgent);
router.post('/create_agent', async(req, res) => {
    try {
        const agent = await createAgentService(req.body.userId, req.body.data_config);
        res.status(201).json(agent);
    } catch (error) {
        console.error("Error creating agent:", error);
        res.status(500).json({ error: "Failed to create agent" });
    }
});

// 
// router.post("/api/agent/create", apiKeyAuth, createAgentService);

router.get('/status', apiKeyAuth, (req, res)=> {
    res.json({ status: 'API is running' });
});

// Add more routes as needed

export default router;