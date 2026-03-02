
ALTER TABLE "shelves"
ALTER COLUMN "is_system" DROP DEFAULT;


ALTER TABLE "shelves"
ALTER COLUMN "is_system" TYPE boolean
USING is_system::boolean;

ALTER TABLE "shelves"
ALTER COLUMN "is_system" SET DEFAULT false;