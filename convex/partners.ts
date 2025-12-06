import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Create a new partner
export const create = mutation({
  args: {
    name: v.string(),
    logo: v.string(),
    website: v.optional(v.string()),
    description: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Get the highest order number to place new partner at the end
    const partners = await ctx.db.query("partners").order("desc").collect();
    const maxOrder = partners.length > 0 ? Math.max(...partners.map((p) => p.order)) : 0;

    return await ctx.db.insert("partners", {
      name: args.name,
      logo: args.logo,
      website: args.website,
      description: args.description,
      order: maxOrder + 1,
      isActive: true,
      createdAt: Date.now(),
    });
  },
});

// Update a partner
export const update = mutation({
  args: {
    id: v.id("partners"),
    name: v.optional(v.string()),
    logo: v.optional(v.string()),
    website: v.optional(v.string()),
    description: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    await ctx.db.patch(id, updates);
  },
});

// Toggle partner active status
export const toggleActive = mutation({
  args: { id: v.id("partners") },
  handler: async (ctx, args) => {
    const partner = await ctx.db.get(args.id);
    if (!partner) throw new Error("Partner not found");

    await ctx.db.patch(args.id, {
      isActive: !partner.isActive,
    });
  },
});

// Update partner order
export const updateOrder = mutation({
  args: {
    id: v.id("partners"),
    order: v.number(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      order: args.order,
    });
  },
});

// Reorder partners (swap positions)
export const reorder = mutation({
  args: {
    partnerId: v.id("partners"),
    newOrder: v.number(),
  },
  handler: async (ctx, args) => {
    const partner = await ctx.db.get(args.partnerId);
    if (!partner) throw new Error("Partner not found");

    const oldOrder = partner.order;
    const partners = await ctx.db.query("partners").collect();

    // Update orders for affected partners
    for (const p of partners) {
      if (p._id === args.partnerId) {
        await ctx.db.patch(p._id, { order: args.newOrder });
      } else if (oldOrder < args.newOrder) {
        // Moving down: shift items up
        if (p.order > oldOrder && p.order <= args.newOrder) {
          await ctx.db.patch(p._id, { order: p.order - 1 });
        }
      } else {
        // Moving up: shift items down
        if (p.order >= args.newOrder && p.order < oldOrder) {
          await ctx.db.patch(p._id, { order: p.order + 1 });
        }
      }
    }
  },
});

// Delete a partner
export const remove = mutation({
  args: { id: v.id("partners") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

// List all partners (for admin)
export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("partners")
      .withIndex("by_order")
      .collect();
  },
});

// List active partners (for public)
export const listActive = query({
  args: {},
  handler: async (ctx) => {
    const partners = await ctx.db
      .query("partners")
      .withIndex("by_order")
      .collect();
    return partners.filter((p) => p.isActive);
  },
});

// Get partner by ID
export const getById = query({
  args: { id: v.id("partners") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

// Get partner count
export const getCount = query({
  args: {},
  handler: async (ctx) => {
    const all = await ctx.db.query("partners").collect();
    return {
      total: all.length,
      active: all.filter((p) => p.isActive).length,
    };
  },
});
