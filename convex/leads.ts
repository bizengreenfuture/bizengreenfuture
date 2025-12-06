import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Create a new lead
export const create = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    company: v.optional(v.string()),
    interest: v.union(
      v.literal("supertech"),
      v.literal("fertilizers"),
      v.literal("feed"),
      v.literal("general")
    ),
    source: v.optional(v.string()),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("leads", {
      name: args.name,
      email: args.email,
      phone: args.phone,
      company: args.company,
      interest: args.interest,
      source: args.source,
      notes: args.notes,
      status: "new",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
  },
});

// Update a lead
export const update = mutation({
  args: {
    id: v.id("leads"),
    name: v.optional(v.string()),
    email: v.optional(v.string()),
    phone: v.optional(v.string()),
    company: v.optional(v.string()),
    interest: v.optional(
      v.union(
        v.literal("supertech"),
        v.literal("fertilizers"),
        v.literal("feed"),
        v.literal("general")
      )
    ),
    source: v.optional(v.string()),
    status: v.optional(
      v.union(
        v.literal("new"),
        v.literal("contacted"),
        v.literal("qualified"),
        v.literal("converted"),
        v.literal("lost")
      )
    ),
    notes: v.optional(v.string()),
    assignedTo: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    await ctx.db.patch(id, {
      ...updates,
      updatedAt: Date.now(),
    });
  },
});

// Update lead status
export const updateStatus = mutation({
  args: {
    id: v.id("leads"),
    status: v.union(
      v.literal("new"),
      v.literal("contacted"),
      v.literal("qualified"),
      v.literal("converted"),
      v.literal("lost")
    ),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      status: args.status,
      updatedAt: Date.now(),
    });
  },
});

// Assign lead to user
export const assignTo = mutation({
  args: {
    id: v.id("leads"),
    assignedTo: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      assignedTo: args.assignedTo,
      updatedAt: Date.now(),
    });
  },
});

// Delete a lead
export const remove = mutation({
  args: { id: v.id("leads") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

// List all leads
export const list = query({
  args: {
    status: v.optional(
      v.union(
        v.literal("new"),
        v.literal("contacted"),
        v.literal("qualified"),
        v.literal("converted"),
        v.literal("lost")
      )
    ),
  },
  handler: async (ctx, args) => {
    if (args.status) {
      return await ctx.db
        .query("leads")
        .withIndex("by_status", (q) => q.eq("status", args.status!))
        .order("desc")
        .collect();
    }
    return await ctx.db.query("leads").order("desc").collect();
  },
});

// Get lead by ID
export const getById = query({
  args: { id: v.id("leads") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

// Get leads by status
export const getByStatus = query({
  args: {
    status: v.union(
      v.literal("new"),
      v.literal("contacted"),
      v.literal("qualified"),
      v.literal("converted"),
      v.literal("lost")
    ),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("leads")
      .withIndex("by_status", (q) => q.eq("status", args.status))
      .order("desc")
      .collect();
  },
});

// Get leads by interest
export const getByInterest = query({
  args: {
    interest: v.union(
      v.literal("supertech"),
      v.literal("fertilizers"),
      v.literal("feed"),
      v.literal("general")
    ),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("leads")
      .withIndex("by_interest", (q) => q.eq("interest", args.interest))
      .order("desc")
      .collect();
  },
});

// Get lead counts for dashboard
export const getCounts = query({
  args: {},
  handler: async (ctx) => {
    const all = await ctx.db.query("leads").collect();

    return {
      total: all.length,
      new: all.filter((l) => l.status === "new").length,
      contacted: all.filter((l) => l.status === "contacted").length,
      qualified: all.filter((l) => l.status === "qualified").length,
      converted: all.filter((l) => l.status === "converted").length,
      lost: all.filter((l) => l.status === "lost").length,
    };
  },
});
