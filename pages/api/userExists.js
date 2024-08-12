// pages/api/userExists.js

import User from "@/models/user"; 
import { connectMongoDB } from "../../lib/mongodb"; 
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      await connectMongoDB();
      const { username } = req.body;
      const user = await User.findOne({ username }).select("_id");

      console.log("user:", user);
      res.status(200).json({ user });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
