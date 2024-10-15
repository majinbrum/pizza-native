-- npx supabase db diff -f add_stripe_field
-- npx supabase db push

alter table "public"."profiles" add column "stripe_customer_id" text;


