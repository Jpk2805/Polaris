import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const debugAuth = mutation({
    handler: async (ctx) => {
      return await ctx.auth.getUserIdentity();
    },
  });

export const create = mutation({
    args:{
        name: v.string(),
    },

    handler: async (ctx, args) =>{
        const identity = await ctx.auth.getUserIdentity()
        if(!identity){
            throw new Error("UNAUTHORIZED")
        }
        await ctx.db.insert("projects",{
            name: args.name,
            ownerId: identity?.subject
        })
    }
})

export const get = query({
    handler: async (ctx) => {
      const identity = ctx.auth.getUserIdentity
        ? await ctx.auth.getUserIdentity()
        : null;
  
      if (!identity) return [];
      return ctx.db
        .query("projects")
        .withIndex("by_owner", (q) =>
          q.eq("ownerId", identity.subject)
        )
        .collect();
    },
  });
  