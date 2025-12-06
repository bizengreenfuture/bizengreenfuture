import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Notification types
const notificationTypes = v.union(
  v.literal("user_pending"),
  v.literal("user_approved"),
  v.literal("contact_new"),
  v.literal("lead_new"),
  v.literal("lead_assigned"),
  v.literal("content_published")
);

// Create a notification for a specific user
export const createForUser = mutation({
  args: {
    type: notificationTypes,
    title: v.string(),
    message: v.string(),
    link: v.optional(v.string()),
    recipientClerkId: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("notifications", {
      type: args.type,
      title: args.title,
      message: args.message,
      link: args.link,
      recipientType: "user",
      recipientId: args.recipientClerkId,
      isRead: false,
      createdAt: Date.now(),
    });
  },
});

// Create a notification for a role group (all admins or all editors)
export const createForRole = mutation({
  args: {
    type: notificationTypes,
    title: v.string(),
    message: v.string(),
    link: v.optional(v.string()),
    role: v.union(v.literal("admin"), v.literal("editor")),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("notifications", {
      type: args.type,
      title: args.title,
      message: args.message,
      link: args.link,
      recipientType: "role",
      recipientId: args.role,
      isRead: false,
      createdAt: Date.now(),
    });
  },
});

// Get notifications for current user (includes role-based notifications)
export const getForUser = query({
  args: { 
    clerkId: v.string(),
    role: v.union(v.literal("admin"), v.literal("editor"), v.literal("pending")),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const limit = args.limit || 20;
    
    // Get user-specific notifications
    const userNotifications = await ctx.db
      .query("notifications")
      .withIndex("by_recipient", (q) => 
        q.eq("recipientType", "user").eq("recipientId", args.clerkId)
      )
      .order("desc")
      .take(limit);

    // Get role-based notifications (only for admin/editor, not pending)
    let roleNotifications: typeof userNotifications = [];
    if (args.role !== "pending") {
      roleNotifications = await ctx.db
        .query("notifications")
        .withIndex("by_recipient", (q) => 
          q.eq("recipientType", "role").eq("recipientId", args.role)
        )
        .order("desc")
        .take(limit);
    }

    // Combine and sort by createdAt
    const all = [...userNotifications, ...roleNotifications]
      .sort((a, b) => b.createdAt - a.createdAt)
      .slice(0, limit);

    return all;
  },
});

// Get unread count for user
export const getUnreadCount = query({
  args: { 
    clerkId: v.string(),
    role: v.union(v.literal("admin"), v.literal("editor"), v.literal("pending")),
  },
  handler: async (ctx, args) => {
    // Count user-specific unread notifications
    const userUnread = await ctx.db
      .query("notifications")
      .withIndex("by_recipient_unread", (q) => 
        q.eq("recipientType", "user").eq("recipientId", args.clerkId).eq("isRead", false)
      )
      .collect();

    // Count role-based unread notifications
    let roleUnread: typeof userUnread = [];
    if (args.role !== "pending") {
      roleUnread = await ctx.db
        .query("notifications")
        .withIndex("by_recipient_unread", (q) => 
          q.eq("recipientType", "role").eq("recipientId", args.role).eq("isRead", false)
        )
        .collect();
    }

    return userUnread.length + roleUnread.length;
  },
});

// Mark a single notification as read
export const markAsRead = mutation({
  args: { id: v.id("notifications") },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { isRead: true });
  },
});

// Mark all notifications as read for a user
export const markAllAsRead = mutation({
  args: { 
    clerkId: v.string(),
    role: v.union(v.literal("admin"), v.literal("editor"), v.literal("pending")),
  },
  handler: async (ctx, args) => {
    // Get all unread user notifications
    const userNotifications = await ctx.db
      .query("notifications")
      .withIndex("by_recipient_unread", (q) => 
        q.eq("recipientType", "user").eq("recipientId", args.clerkId).eq("isRead", false)
      )
      .collect();

    // Get all unread role notifications
    let roleNotifications: typeof userNotifications = [];
    if (args.role !== "pending") {
      roleNotifications = await ctx.db
        .query("notifications")
        .withIndex("by_recipient_unread", (q) => 
          q.eq("recipientType", "role").eq("recipientId", args.role).eq("isRead", false)
        )
        .collect();
    }

    // Mark all as read
    for (const notification of [...userNotifications, ...roleNotifications]) {
      await ctx.db.patch(notification._id, { isRead: true });
    }

    return { marked: userNotifications.length + roleNotifications.length };
  },
});

// Delete old notifications (cleanup - older than 30 days)
export const deleteOld = mutation({
  args: {},
  handler: async (ctx) => {
    const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;
    
    const oldNotifications = await ctx.db
      .query("notifications")
      .withIndex("by_createdAt")
      .filter((q) => q.lt(q.field("createdAt"), thirtyDaysAgo))
      .collect();

    for (const notification of oldNotifications) {
      await ctx.db.delete(notification._id);
    }

    return { deleted: oldNotifications.length };
  },
});

// Delete a specific notification
export const remove = mutation({
  args: { id: v.id("notifications") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
