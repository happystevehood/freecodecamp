--
-- PostgreSQL database dump
--

-- Dumped from database version 12.17 (Ubuntu 12.17-1.pgdg22.04+1)
-- Dumped by pg_dump version 12.17 (Ubuntu 12.17-1.pgdg22.04+1)

SET statement_timeout = 0;
SET lock_timeout  = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE universe;
--
-- Name: universe; Type: DATABASE; Schema: -; Owner: freecodecamp
--

CREATE DATABASE universe WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'C.UTF-8' LC_CTYPE = 'C.UTF-8';


ALTER DATABASE universe OWNER TO freecodecamp;

\connect universe

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: galaxy; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.galaxy (
    galaxy_id bigint NOT NULL,
    name character varying NOT NULL,
    universal_identifier integer,
    age numeric,
    scientific_name text,
    visible boolean,
    atmosphere boolean
);


ALTER TABLE public.galaxy OWNER TO freecodecamp;

--
-- Name: galaxy_galaxy_key_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.galaxy_galaxy_key_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.galaxy_galaxy_key_seq OWNER TO freecodecamp;

--
-- Name: galaxy_galaxy_key_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.galaxy_galaxy_key_seq OWNED BY public.galaxy.galaxy_id;


--
-- Name: moon; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.moon (
    moon_id bigint NOT NULL,
    name character varying NOT NULL,
    planet_id bigint NOT NULL,
    universal_identifier integer,
    age numeric,
    scientific_name text,
    visible boolean,
    atmosphere boolean
);


ALTER TABLE public.moon OWNER TO freecodecamp;

--
-- Name: moon_moon_key_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.moon_moon_key_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.moon_moon_key_seq OWNER TO freecodecamp;

--
-- Name: moon_moon_key_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.moon_moon_key_seq OWNED BY public.moon.moon_id;


--
-- Name: moon_planet_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.moon_planet_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.moon_planet_id_seq OWNER TO freecodecamp;

--
-- Name: moon_planet_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.moon_planet_id_seq OWNED BY public.moon.planet_id;


--
-- Name: planet; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.planet (
    planet_id bigint NOT NULL,
    name character varying NOT NULL,
    star_id bigint NOT NULL,
    universal_identifier integer,
    age numeric,
    scientific_name text,
    visible boolean,
    atmosphere boolean
);


ALTER TABLE public.planet OWNER TO freecodecamp;

--
-- Name: planet_planet_key_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.planet_planet_key_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.planet_planet_key_seq OWNER TO freecodecamp;

--
-- Name: planet_planet_key_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.planet_planet_key_seq OWNED BY public.planet.planet_id;


--
-- Name: planet_star_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.planet_star_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.planet_star_id_seq OWNER TO freecodecamp;

--
-- Name: planet_star_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.planet_star_id_seq OWNED BY public.planet.star_id;


--
-- Name: spaceship; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.spaceship (
    name character varying(20) NOT NULL,
    spaceship_id integer NOT NULL,
    colour integer,
    nationality text,
    operational boolean
);


ALTER TABLE public.spaceship OWNER TO freecodecamp;

--
-- Name: star; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.star (
    star_id bigint NOT NULL,
    name character varying NOT NULL,
    galaxy_id bigint NOT NULL,
    universal_identifier integer,
    age numeric,
    scientific_name text,
    visible boolean,
    atmosphere boolean
);


ALTER TABLE public.star OWNER TO freecodecamp;

--
-- Name: star_galaxy_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.star_galaxy_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.star_galaxy_id_seq OWNER TO freecodecamp;

--
-- Name: star_galaxy_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.star_galaxy_id_seq OWNED BY public.star.galaxy_id;


--
-- Name: star_star_key_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.star_star_key_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.star_star_key_seq OWNER TO freecodecamp;

--
-- Name: star_star_key_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.star_star_key_seq OWNED BY public.star.star_id;


--
-- Name: galaxy galaxy_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.galaxy ALTER COLUMN galaxy_id SET DEFAULT nextval('public.galaxy_galaxy_key_seq'::regclass);


--
-- Name: moon moon_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.moon ALTER COLUMN moon_id SET DEFAULT nextval('public.moon_moon_key_seq'::regclass);


--
-- Name: moon planet_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.moon ALTER COLUMN planet_id SET DEFAULT nextval('public.moon_planet_id_seq'::regclass);


--
-- Name: planet planet_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet ALTER COLUMN planet_id SET DEFAULT nextval('public.planet_planet_key_seq'::regclass);


--
-- Name: planet star_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet ALTER COLUMN star_id SET DEFAULT nextval('public.planet_star_id_seq'::regclass);


--
-- Name: star star_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star ALTER COLUMN star_id SET DEFAULT nextval('public.star_star_key_seq'::regclass);


--
-- Name: star galaxy_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star ALTER COLUMN galaxy_id SET DEFAULT nextval('public.star_galaxy_id_seq'::regclass);


--
-- Data for Name: galaxy; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.galaxy VALUES (1, 'milky way', 1, 6000, 'Milkus Wayus', true, false);
INSERT INTO public.galaxy VALUES (2, 'milky way2', 2, 6002, 'Milkus Wayus2', true, false);
INSERT INTO public.galaxy VALUES (3, 'milky way3', 3, 6003, 'Milkus Wayus3', true, false);
INSERT INTO public.galaxy VALUES (4, 'milky way4', 4, 6004, 'Milkus Wayus4', true, false);
INSERT INTO public.galaxy VALUES (5, 'milky way5', 5, 6005, 'Milkus Wayus5', true, false);
INSERT INTO public.galaxy VALUES (6, 'milky way6', 6, 6006, 'Milkus Wayus6', true, false);


--
-- Data for Name: moon; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.moon VALUES (1, 'moon', 1, 3001, 100, 'Moonitis', true, false);
INSERT INTO public.moon VALUES (2, 'moon2', 1, 3002, 100, 'Moonitis1', true, false);
INSERT INTO public.moon VALUES (3, 'moon3', 1, 3003, 100, 'Moonitis2', true, false);
INSERT INTO public.moon VALUES (4, 'moon4', 1, 3004, 100, 'Moonitis3', true, false);
INSERT INTO public.moon VALUES (5, 'moon5', 2, 3005, 100, 'Moonitis4', true, false);
INSERT INTO public.moon VALUES (6, 'moon6', 2, 3006, 100, 'Moonitis5', true, false);
INSERT INTO public.moon VALUES (7, 'moon7', 2, 3007, 100, 'Moonitis6', true, false);
INSERT INTO public.moon VALUES (8, 'moon8', 3, 3008, 100, 'Moonitis7', true, false);
INSERT INTO public.moon VALUES (9, 'moon9', 3, 3009, 100, 'Moonitis8', true, false);
INSERT INTO public.moon VALUES (10, 'moon0', 4, 3010, 100, 'Moonitis9', true, false);
INSERT INTO public.moon VALUES (11, 'moona', 4, 3011, 100, 'Moonitis10', true, false);
INSERT INTO public.moon VALUES (12, 'moona1', 4, 3012, 100, 'Moonitis10a', true, false);
INSERT INTO public.moon VALUES (13, 'moona2', 5, 3013, 100, 'Moonitis10s', true, false);
INSERT INTO public.moon VALUES (14, 'moona3', 5, 3014, 100, 'Moonitis10d', true, false);
INSERT INTO public.moon VALUES (15, 'moona4', 6, 3015, 100, 'Moonitis10f', true, false);
INSERT INTO public.moon VALUES (16, 'moona5', 6, 3016, 100, 'Moonitis10g', true, false);
INSERT INTO public.moon VALUES (17, 'moona6', 7, 3017, 100, 'Moonitis10h', true, false);
INSERT INTO public.moon VALUES (18, 'moona7', 7, 3018, 100, 'Moonitis10j', true, false);
INSERT INTO public.moon VALUES (19, 'moona8', 8, 3019, 100, 'Moonitis1k0', true, false);
INSERT INTO public.moon VALUES (20, 'moona9', 9, 3020, 100, 'Moonitis10l', true, false);
INSERT INTO public.moon VALUES (21, 'moona0', 10, 3021, 100, 'Moonitis10m', true, false);


--
-- Data for Name: planet; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.planet VALUES (1, 'earth', 1, 2001, 100, 'Earthicus Maximus', true, true);
INSERT INTO public.planet VALUES (2, 'earthq', 1, 2002, 100, 'Earthicus Maximusq', true, true);
INSERT INTO public.planet VALUES (3, 'earthw', 1, 2003, 100, 'Earthicus Maximusw', true, true);
INSERT INTO public.planet VALUES (4, 'earthe', 2, 2004, 100, 'Earthicus Maximuse', true, true);
INSERT INTO public.planet VALUES (5, 'earthr', 2, 2005, 100, 'Earthicus Maximusr', true, true);
INSERT INTO public.planet VALUES (6, 'eartht', 2, 2006, 100, 'Earthicus Maximust', true, true);
INSERT INTO public.planet VALUES (7, 'earthy', 3, 2007, 100, 'Earthicus Maximusy', true, true);
INSERT INTO public.planet VALUES (8, 'earthu', 3, 2008, 100, 'Earthicus Maximusu', true, true);
INSERT INTO public.planet VALUES (9, 'earthi', 3, 2009, 100, 'Earthicus Maximusi', true, true);
INSERT INTO public.planet VALUES (10, 'eartho', 4, 2010, 100, 'Earthicus Maximuso', true, true);
INSERT INTO public.planet VALUES (11, 'earthp', 4, 2011, 100, 'Earthicus Maximusp', true, true);
INSERT INTO public.planet VALUES (12, 'eartha', 5, 2012, 100, 'Earthicus Maximusa', true, true);
INSERT INTO public.planet VALUES (13, 'earths', 6, 2013, 100, 'Earthicus Maximuss', true, true);


--
-- Data for Name: spaceship; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.spaceship VALUES ('Apollo 54', 1, 64, 'Internaitonal', false);
INSERT INTO public.spaceship VALUES ('Appolo2', 2, 3002, 'Irish', true);
INSERT INTO public.spaceship VALUES ('Appolo3', 3, 3003, 'Scottish', true);
INSERT INTO public.spaceship VALUES ('Appolo4', 4, 3004, 'Romulan', true);


--
-- Data for Name: star; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.star VALUES (1, 'sun', 1, 2, 600, 'Sunus Biggus', true, true);
INSERT INTO public.star VALUES (2, 'sun', 2, 1002, 602, 'Sunus Biggus2', true, true);
INSERT INTO public.star VALUES (3, 'sun', 3, 1003, 603, 'Sunus Biggus3', true, true);
INSERT INTO public.star VALUES (4, 'sun', 4, 1004, 604, 'Sunus Biggus4', true, true);
INSERT INTO public.star VALUES (5, 'sun', 5, 1005, 605, 'Sunus Biggus5', true, true);
INSERT INTO public.star VALUES (6, 'sun', 6, 1006, 606, 'Sunus Biggus6', true, true);


--
-- Name: galaxy_galaxy_key_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.galaxy_galaxy_key_seq', 1, false);


--
-- Name: moon_moon_key_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.moon_moon_key_seq', 1, false);


--
-- Name: moon_planet_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.moon_planet_id_seq', 1, false);


--
-- Name: planet_planet_key_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.planet_planet_key_seq', 1, false);


--
-- Name: planet_star_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.planet_star_id_seq', 1, false);


--
-- Name: star_galaxy_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.star_galaxy_id_seq', 1, false);


--
-- Name: star_star_key_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.star_star_key_seq', 1, false);


--
-- Name: galaxy galaxy_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.galaxy
    ADD CONSTRAINT galaxy_pkey PRIMARY KEY (galaxy_id);


--
-- Name: galaxy galaxy_universal_identifier_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.galaxy
    ADD CONSTRAINT galaxy_universal_identifier_key UNIQUE (universal_identifier);


--
-- Name: moon moon_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.moon
    ADD CONSTRAINT moon_pkey PRIMARY KEY (moon_id);


--
-- Name: moon moon_universal_identifier_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.moon
    ADD CONSTRAINT moon_universal_identifier_key UNIQUE (universal_identifier);


--
-- Name: planet planet_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet
    ADD CONSTRAINT planet_pkey PRIMARY KEY (planet_id);


--
-- Name: planet planet_universal_identifier_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet
    ADD CONSTRAINT planet_universal_identifier_key UNIQUE (universal_identifier);


--
-- Name: spaceship spaceship_name_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.spaceship
    ADD CONSTRAINT spaceship_name_key UNIQUE (name);


--
-- Name: spaceship spaceship_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.spaceship
    ADD CONSTRAINT spaceship_pkey PRIMARY KEY (spaceship_id);


--
-- Name: star star_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star
    ADD CONSTRAINT star_pkey PRIMARY KEY (star_id);


--
-- Name: star star_universal_identifier_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star
    ADD CONSTRAINT star_universal_identifier_key UNIQUE (universal_identifier);


--
-- Name: moon moon_planet_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.moon
    ADD CONSTRAINT moon_planet_id_fkey FOREIGN KEY (planet_id) REFERENCES public.planet(planet_id);


--
-- Name: planet planet_star_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet
    ADD CONSTRAINT planet_star_id_fkey FOREIGN KEY (star_id) REFERENCES public.star(star_id);


--
-- Name: star star_galaxy_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star
    ADD CONSTRAINT star_galaxy_id_fkey FOREIGN KEY (galaxy_id) REFERENCES public.galaxy(galaxy_id);


--
-- PostgreSQL database dump complete
--

