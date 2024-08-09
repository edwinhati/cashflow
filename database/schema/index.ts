import { relations } from "drizzle-orm";
import {
  pgTable,
  pgEnum,
  uuid,
  text,
  decimal,
  timestamp,
  boolean,
  jsonb,
} from "drizzle-orm/pg-core";

export const categoryTypeEnum = pgEnum("type", ["expense", "income"]);

export const user = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  is_verified: boolean("is_verified").notNull().default(false),
  currency: text("currency").notNull().default("USD"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const account = pgTable("accounts", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  currency: jsonb("currency").notNull(),
  balance: decimal("balance").notNull().default("0.0"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const category = pgTable("categories", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => user.id),
  name: text("name").notNull(),
  type: categoryTypeEnum("type").notNull(),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const transaction = pgTable("transactions", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => user.id),
  accountId: uuid("account_id").references(() => account.id),
  categoryId: uuid("category_id").references(() => category.id),
  type: categoryTypeEnum("type").notNull(),
  amount: decimal("amount").notNull(),
  currency: text("currency").notNull(),
  description: text("description"),
  date: timestamp("date").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const userRelation = relations(user, ({ many }) => ({
  accounts: many(account),
}));

export const accountRelation = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.id],
    references: [user.id],
  }),
}));
