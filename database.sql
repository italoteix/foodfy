CREATE TABLE "files" (
  "id" SERIAL PRIMARY KEY,
  "name" text,
  "path" text NOT NULL
);

CREATE TABLE "chefs" (
  "id" SERIAL PRIMARY KEY,
  "name" text,
  "file_id" int REFERENCES files(id),
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "recipes" (
  "id" SERIAL PRIMARY KEY,
  "chef_id" int NOT NULL REFERENCES chefs(id),
  "title" text,
  "ingredients" text[],
  "preparation" text[],
  "information" text,
  "created_at" timestamp DEFAULT (now())
  "updated_at" timestamp DEFAULT (now())
);

CREATE TABLE "recipe_files" (
  "id" SERIAL PRIMARY KEY,
  "recipe_id" int REFERENCES recipes(id),
  "file_id" int REFERENCES files(id)
);

CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON recipes
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();
