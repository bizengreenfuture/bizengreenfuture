import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Create a new gallery item
export const create = mutation({
  args: {
    title: v.string(),
    category: v.union(
      v.literal("supertech"),
      v.literal("fertilizers"),
      v.literal("events"),
      v.literal("impact")
    ),
    description: v.string(),
    image: v.string(),
    createdBy: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("gallery", {
      title: args.title,
      category: args.category,
      description: args.description,
      image: args.image,
      status: "draft",
      createdBy: args.createdBy,
      createdAt: Date.now(),
    });
  },
});

// Update a gallery item
export const update = mutation({
  args: {
    id: v.id("gallery"),
    title: v.optional(v.string()),
    category: v.optional(
      v.union(
        v.literal("supertech"),
        v.literal("fertilizers"),
        v.literal("events"),
        v.literal("impact")
      )
    ),
    description: v.optional(v.string()),
    image: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    await ctx.db.patch(id, updates);
  },
});

// Publish a gallery item (admin only)
export const publish = mutation({
  args: {
    id: v.id("gallery"),
    publishedBy: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      status: "published",
      publishedBy: args.publishedBy,
      publishedAt: Date.now(),
    });
  },
});

// Unpublish a gallery item (admin only)
export const unpublish = mutation({
  args: { id: v.id("gallery") },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      status: "draft",
    });
  },
});

// Archive a gallery item
export const archive = mutation({
  args: { id: v.id("gallery") },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      status: "archived",
    });
  },
});

// Delete a gallery item
export const remove = mutation({
  args: { id: v.id("gallery") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

// List all gallery items (for admin)
export const list = query({
  args: {
    status: v.optional(
      v.union(v.literal("draft"), v.literal("published"), v.literal("archived"))
    ),
  },
  handler: async (ctx, args) => {
    if (args.status) {
      return await ctx.db
        .query("gallery")
        .withIndex("by_status", (q) => q.eq("status", args.status!))
        .order("desc")
        .collect();
    }
    return await ctx.db.query("gallery").order("desc").collect();
  },
});

// List published gallery items (for public)
export const listPublished = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("gallery")
      .withIndex("by_status", (q) => q.eq("status", "published"))
      .order("desc")
      .collect();
  },
});

// Get gallery item by ID
export const getById = query({
  args: { id: v.id("gallery") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

// Get gallery items by category
export const getByCategory = query({
  args: {
    category: v.union(
      v.literal("supertech"),
      v.literal("fertilizers"),
      v.literal("events"),
      v.literal("impact")
    ),
    publishedOnly: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const items = await ctx.db
      .query("gallery")
      .withIndex("by_category", (q) => q.eq("category", args.category))
      .collect();

    if (args.publishedOnly) {
      return items.filter((item) => item.status === "published");
    }
    return items;
  },
});

// Get gallery counts for dashboard
export const getCounts = query({
  args: {},
  handler: async (ctx) => {
    const all = await ctx.db.query("gallery").collect();
    return {
      total: all.length,
      published: all.filter((g) => g.status === "published").length,
      draft: all.filter((g) => g.status === "draft").length,
    };
  },
});
