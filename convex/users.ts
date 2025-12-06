import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Create or update user when they sign in
// First user becomes admin (bootstrap), all others are "pending" until approved
export const upsertUser = mutation({
  args: {
    clerkId: v.string(),
    email: v.string(),
    name: v.string(),
    avatar: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", args.clerkId))
      .first();

    if (existingUser) {
      // Update existing user info (but NOT their role)
      await ctx.db.patch(existingUser._id, {
        email: args.email,
        name: args.name,
        avatar: args.avatar,
        updatedAt: Date.now(),
      });
      return existingUser._id;
    }

    // Check if this is the first user (they become admin)
    const userCount = await ctx.db.query("users").collect();
    const isFirstUser = userCount.length === 0;

    // First user becomes admin, everyone else is "pending" until approved
    const role = isFirstUser ? "admin" : "pending";

    return await ctx.db.insert("users", {
      clerkId: args.clerkId,
      email: args.email,
      name: args.name,
      avatar: args.avatar,
      role,
      isActive: isFirstUser, // First user is active, others need approval
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
  },
});

// Get current user by Clerk ID
export const getCurrentUser = query({
  args: { clerkId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", args.clerkId))
      .first();
  },
});

// List all users (admin only)
export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("users").order("desc").collect();
  },
});

// List pending users (admin only)
export const listPending = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("users")
      .withIndex("by_role", (q) => q.eq("role", "pending"))
      .order("desc")
      .collect();
  },
});

// Approve a pending user and assign them a role (admin only)
export const approveUser = mutation({
  args: {
    userId: v.id("users"),
    role: v.union(v.literal("admin"), v.literal("editor")),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.userId, {
      role: args.role,
      isActive: true,
      updatedAt: Date.now(),
    });
  },
});

// Update user role (admin only) - for existing approved users
export const updateRole = mutation({
  args: {
    userId: v.id("users"),
    role: v.union(v.literal("admin"), v.literal("editor")),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.userId, {
      role: args.role,
      updatedAt: Date.now(),
    });
  },
});

// Reject/remove a pending user (admin only)
export const rejectUser = mutation({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.userId);
  },
});

// Toggle user active status (admin only)
export const toggleActive = mutation({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.userId);
    if (!user) throw new Error("User not found");

    await ctx.db.patch(args.userId, {
      isActive: !user.isActive,
      updatedAt: Date.now(),
    });
  },
});

// Get users by role
export const getByRole = query({
  args: { role: v.union(v.literal("admin"), v.literal("editor"), v.literal("pending")) },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .withIndex("by_role", (q) => q.eq("role", args.role))
      .collect();
  },
});

// Get user counts for dashboard
export const getCounts = query({
  args: {},
  handler: async (ctx) => {
    const all = await ctx.db.query("users").collect();
    return {
      total: all.length,
      admins: all.filter((u) => u.role === "admin").length,
      editors: all.filter((u) => u.role === "editor").length,
      pending: all.filter((u) => u.role === "pending").length,
      active: all.filter((u) => u.isActive).length,
    };
  },
});
