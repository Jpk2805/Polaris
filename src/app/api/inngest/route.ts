import { serve } from "inngest/next";
import { inngest } from "../../../inngest/client";
import { generate } from "../../../inngest/functions";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    generate, // <-- This is where you'll always add all your functions
  ],
});