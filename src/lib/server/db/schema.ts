import { pgTable, serial, text, integer, timestamp, pgEnum, varchar, char, customType } from 'drizzle-orm/pg-core';

export enum Role
{
    ADMIN = 'admin',
    FARMER = 'farmer',
    BUSINESS = 'business'
}

const bytea = customType<{ data: Buffer; notNull: false; default: false }>({
    dataType() 
    {
        return "bytea";
    },
});

export const roleEnum = pgEnum('role', enumToPgEnum(Role));

export const user = pgTable('user', {
    id: text('id').primaryKey(),
    name: text('name').notNull(),
    phone: text('phone').notNull().unique(),
    email: text('email').notNull().unique(),
    passwordHash: text('password_hash').notNull(),
    role: roleEnum('role').notNull()
});

export enum ProductionScale
{
    SMALL = 'small',
    MEDIUM = 'medium',
    LARGE = 'large'
}

const productionScaleEnum = pgEnum('production_scale', enumToPgEnum(ProductionScale));

export const farmers = pgTable('farmers', {
    userId: text('user_id').primaryKey().references(() => user.id),
    address: text('address').notNull(),
    productionScale: productionScaleEnum('production_scale').notNull(),
    mainProduct: text('main_product').notNull(),
    citizenId: char('citizen_id', { length: 12 }).notNull().unique()
});

export const business = pgTable('business', {
    userId: text('user_id').primaryKey().references(() => user.id),
    manufacture: text('manufacture').notNull(),
    taxNumber: varchar('tax_number', { length: 13 }).notNull().unique(),
});

export const farmerRequests = pgTable('farmer_requests', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    phone: text('phone').notNull(),
    email: text('email').notNull(),
    passwordHash: text('password_hash').notNull(),
    address: text('address').notNull(),
    productionScale: productionScaleEnum('production_scale').notNull(),
    mainProduct: text('main_product').notNull(),
    citizenIdImage: bytea('citizen_id_image').notNull(), // Stores actual binary image data
    status: text('status').default('pending').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull()
});

export const businessRequests = pgTable('business_requests', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    phone: text('phone').notNull(),
    email: text('email').notNull(),
    passwordHash: text('password_hash').notNull(),
    manufacture: text('manufacture').notNull(),
    businessLicenseImage: bytea('business_license_image').notNull(), // Stores actual binary image data
    status: text('status').default('pending').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull()
});

export const session = pgTable('session', {
    id: text('id').primaryKey(),
    userId: text('user_id')
        .notNull()
        .references(() => user.id),
    expiresAt: timestamp('expires_at', { withTimezone: true, mode: 'date' }).notNull()
});

export type Session = typeof session.$inferSelect;

export type User = typeof user.$inferSelect;

function enumToPgEnum<T extends Record<string, string>>(myEnum: T): [string, ...string[]] 
{
    return Object.values(myEnum) as [string, ...string[]];
}