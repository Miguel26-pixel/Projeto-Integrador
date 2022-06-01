CREATE TABLE rasperry_pi (
    id SERIAL PRIMARY KEY,
    name TEXT,
    ip INET,
    plant_id INTEGER REFERENCES plant(plant_id)
);

CREATE TABLE plant (
    time TIMESTAMPTZ NOT NULL,
    temperature DOUBLE PRECISION,
    light DOUBLE PRECISION,
    humidity DOUBLE PRECISION,
    gas_concentration DOUBLE PRECISION
);

SELECT create_hypertable('plant','time');
-- CREATE INDEX index_light_time ON plant (light, time DESC); -- worth it? idk