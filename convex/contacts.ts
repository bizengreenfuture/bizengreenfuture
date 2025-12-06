import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Create a new contact submission (public)
export const create = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    message: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("contacts", {
      name: args.name,
      email: args.email,
      phone: args.phone,
      message: args.message,
      status: "new",
      createdAt: Date.now(),
    });
  },
});

// Update contact status
export const updateStatus = mutation({
  args: {
    id: v.id("contacts"),
    status: v.union(
      v.literal("new"),
      v.literal("read"),
      v.literal("responded"),
      v.literal("archived")
    ),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      status: args.status,
    });
  },
});

// Add note to contact
export const addNote = mutation({
  args: {
    id: v.id("contacts"),
    notes: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      notes: args.notes,
    });
  },
});

// Delete a contact
export const remove = mutation({
  args: { id: v.id("contacts") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

// List all contacts
export const list = query({
  args: {
    status: v.optional(
      v.union(
        v.literal("new"),
        v.literal("read"),
        v.literal("responded"),
        v.literal("archived")
      )
    ),
  },
  handler: async (ctx, args) => {
    if (args.status) {
      return await ctx.db
        .query("contacts")
        .withIndex("by_status", (q) => q.eq("status", args.status!))
        .order("desc")
        .collect();
    }
    return await ctx.db.query("contacts").order("desc").collect();
  },
});

// Get contact by ID
export const getById = query({
  args: { id: v.id("contacts") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

// Get contacts by status
export const getByStatus = query({
  args: {
    status: v.union(
      v.literal("new"),
      v.literal("read"),
      v.literal("responded"),
      v.literal("archived")
    ),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("contacts")
      .withIndex("by_status", (q) => q.eq("status", args.status))
      .order("desc")
      .collect();
  },
});

// Get contact counts for dashboard
export const getCounts = query({
  args: {},
  handler: async (ctx) => {
    const all = await ctx.db.query("contacts").collect();
    const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;

    return {
      total: all.length,
      new: all.filter((c) => c.status === "new").length,
      read: all.filter((c) => c.status === "read").length,
      responded: all.filter((c) => c.status === "responded").length,
      lastSevenDays: all.filter((c) => c.createdAt > sevenDaysAgo).length,
    };
  },
});
