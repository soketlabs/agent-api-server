
// import express, { Request, Response, NextFunction, json } from 'express';
// import { z } from 'zod';

// const TurnDetection = z.object({
// //   mode: z.enum(['admin', 'user']).default('user'),
// type: z.string().default('server_vad'),
// threshold: z.number().min(0).max(1).default(0.2),
// prefix_padding_ms: z.number().min(0).default(1000),
// silence_duration_ms: z.number().min(0).default(1000)
// });

// const SessionConfig = z.object({
//   instructions: z.string().min(3),
//   voice: z.string().default('felicity'),
//   language: z.string().default('en-US'),
//   turn_detection: TurnDetection,
// });

// const ProviderConfig = z.object({
//   provider: z.string().min(2).default('plivo'),
// });

// export const AgentCreateRequestModel = z.object({
//   session_config: SessionConfig,
//   provider_config: ProviderConfig,
// });


import mongoose from "mongoose";

const AgentSchema = new mongoose.Schema({
    uuid: { type: String, required: true, unique: true },

    name: String,
    phone: String,
    workflow: String,
    language: String,

    containerId: String,
    containerName: String,

    userId: { type: String, required: true },

    createdAt: { type: Date, default: Date.now }
});

const UserSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    password: String 
});

const ApiKeySchema = new mongoose.Schema({
    key: { type: String, required: true, unique: true },
    client: { type: String },         
    active: { type: Boolean, default: true },

    // permissions: [{ type: String }],
    // createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("ApiKey", ApiKeySchema);
export const Agent = mongoose.model("Agent", AgentSchema);
export const User = mongoose.model("User", UserSchema);
