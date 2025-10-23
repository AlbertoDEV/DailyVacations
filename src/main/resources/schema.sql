CREATE SCHEMA IF NOT EXISTS dailyvacations;

-- Eliminar la tabla de historial de Flyway de cualquier esquema donde pueda haber quedado.
DROP TABLE IF EXISTS public.flyway_schema_history;
DROP TABLE IF EXISTS dailyvacations.flyway_schema_history;
