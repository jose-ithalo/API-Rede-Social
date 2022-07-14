CREATE TABLE IF NOT EXISTS usuarios (
    id serial primary key,
    nome text NOT NULL,
    email text NOT NULL UNIQUE,
    senha text NOT NULL
);

CREATE TABLE IF NOT EXISTS postagens (
    id serial primary key,
    usuario_id integer NOT NULL references usuarios(id),
    texto text NOT NULL
);

