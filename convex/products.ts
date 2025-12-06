import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Helper to generate slug from name
function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// Create a new product
export const create = mutation({
  args: {
    name: v.string(),
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
    createdBy: v.string(),
  },
  handler: async (ctx, args) => {
    const slug = generateSlug(args.name);

    return await ctx.db.insert("products", {
      name: args.name,
      slug,
      category: args.category,
      description: args.description,
      shortDescription: args.shortDescription,
      price: args.price,
      image: args.image,
      benefits: args.benefits,
      specifications: args.specifications,
      status: "draft",
      createdBy: args.createdBy,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
  },
});

// Update a product
export const update = mutation({
  args: {
    id: v.id("products"),
    name: v.optional(v.string()),
    category: v.optional(
      v.union(
        v.literal("supertech"),
        v.literal("fertilizers"),
        v.literal("feed")
      )
    ),
    description: v.optional(v.string()),
    shortDescription: v.optional(v.string()),
    price: v.optional(v.string()),
    image: v.optional(v.string()),
    benefits: v.optional(v.array(v.string())),
    specifications: v.optional(
      v.array(v.object({ label: v.string(), value: v.string() }))
    ),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    const updateData: Record<string, unknown> = { ...updates, updatedAt: Date.now() };

    if (args.name) {
      updateData.slug = generateSlug(args.name);
    }

    await ctx.db.patch(id, updateData);
  },
});

// Publish a product (admin only)
export const publish = mutation({
  args: {
    id: v.id("products"),
    publishedBy: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      status: "published",
      publishedBy: args.publishedBy,
      publishedAt: Date.now(),
      updatedAt: Date.now(),
    });
  },
});

// Unpublish a product (admin only)
export const unpublish = mutation({
  args: { id: v.id("products") },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      status: "draft",
      updatedAt: Date.now(),
    });
  },
});

// Archive a product
export const archive = mutation({
  args: { id: v.id("products") },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      status: "archived",
      updatedAt: Date.now(),
    });
  },
});

// Delete a product
export const remove = mutation({
  args: { id: v.id("products") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

// List all products (for admin)
export const list = query({
  args: {
    status: v.optional(
      v.union(v.literal("draft"), v.literal("published"), v.literal("archived"))
    ),
  },
  handler: async (ctx, args) => {
    if (args.status) {
      return await ctx.db
        .query("products")
        .withIndex("by_status", (q) => q.eq("status", args.status!))
        .order("desc")
        .collect();
    }
    return await ctx.db.query("products").order("desc").collect();
  },
});

// List published products (for public)
export const listPublished = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("products")
      .withIndex("by_status", (q) => q.eq("status", "published"))
      .order("desc")
      .collect();
  },
});

// Get product by ID
export const getById = query({
  args: { id: v.id("products") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

// Get product by slug (for public)
export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("products")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();
  },
});

// Get products by category
export const getByCategory = query({
  args: {
    category: v.union(
      v.literal("supertech"),
      v.literal("fertilizers"),
      v.literal("feed")
    ),
    publishedOnly: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const products = await ctx.db
      .query("products")
      .withIndex("by_category", (q) => q.eq("category", args.category))
      .collect();

    if (args.publishedOnly) {
      return products.filter((p) => p.status === "published");
    }
    return products;
  },
});

// Get product counts for dashboard
export const getCounts = query({
  args: {},
  handler: async (ctx) => {
    const all = await ctx.db.query("products").collect();
    return {
      total: all.length,
      published: all.filter((p) => p.status === "published").length,
      draft: all.filter((p) => p.status === "draft").length,
      archived: all.filter((p) => p.status === "archived").length,
    };
  },
});
