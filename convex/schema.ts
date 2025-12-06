import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Users Table (Role Management)
  // Roles: "pending" (awaiting approval), "editor" (can create/edit), "admin" (full access)
  users: defineTable({
    clerkId: v.string(),
    email: v.string(),
    name: v.string(),
    role: v.union(v.literal("admin"), v.literal("editor"), v.literal("pending")),
    avatar: v.optional(v.string()),
    isActive: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_clerkId", ["clerkId"])
    .index("by_role", ["role"]),

  // Products Table
  products: defineTable({
    name: v.string(),
    slug: v.string(),
    category: v.union(
      v.literal("supertech"),
      v.literal("fertilizers"),
      v.literal("feed")
    ),
    description: v.string(),
    shortDescription: v.optional(v.string()),
    price: v.optional(v.string()),
    image: v.optional(v.string()),
    benefits: v.optional(v.array(v.string())),
    specifications: v.optional(
      v.array(v.object({ label: v.string(), value: v.string() }))
    ),
    status: v.union(
      v.literal("draft"),
      v.literal("published"),
      v.literal("archived")
    ),
    createdBy: v.string(),
    publishedBy: v.optional(v.string()),
    publishedAt: v.optional(v.number()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_category", ["category"])
    .index("by_slug", ["slug"])
    .index("by_status", ["status"]),

  // Gallery Table
  gallery: defineTable({
    title: v.string(),
    category: v.union(
      v.literal("supertech"),
      v.literal("fertilizers"),
      v.literal("events"),
      v.literal("impact")
    ),
    description: v.string(),
    image: v.string(),
    status: v.union(
      v.literal("draft"),
      v.literal("published"),
      v.literal("archived")
    ),
    createdBy: v.string(),
    publishedBy: v.optional(v.string()),
    publishedAt: v.optional(v.number()),
    createdAt: v.number(),
  })
    .index("by_category", ["category"])
    .index("by_status", ["status"]),

  // Partners Table
  partners: defineTable({
    name: v.string(),
    logo: v.string(),
    website: v.optional(v.string()),
    description: v.optional(v.string()),
    order: v.number(),
    isActive: v.boolean(),
    createdAt: v.number(),
  }).index("by_order", ["order"]),

  // Contact Submissions Table
  contacts: defineTable({
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    message: v.string(),
    status: v.union(
      v.literal("new"),
      v.literal("read"),
      v.literal("responded"),
      v.literal("archived")
    ),
    notes: v.optional(v.string()),
    createdAt: v.number(),
  }).index("by_status", ["status"]),

  // Leads Table
  leads: defineTable({
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
    status: v.union(
      v.literal("new"),
      v.literal("contacted"),
      v.literal("qualified"),
      v.literal("converted"),
      v.literal("lost")
    ),
    notes: v.optional(v.string()),
    assignedTo: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_status", ["status"])
    .index("by_interest", ["interest"]),
});
