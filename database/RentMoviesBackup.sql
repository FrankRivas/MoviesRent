--
-- PostgreSQL database dump
--

-- Dumped from database version 12.1 (Ubuntu 12.1-1.pgdg18.04+1)
-- Dumped by pg_dump version 12.1 (Ubuntu 12.1-1.pgdg18.04+1)

-- Started on 2020-01-10 12:45:47 CST

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
-- TOC entry 210 (class 1259 OID 20416)
-- Name: movie; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.movie (
    id integer NOT NULL,
    title character varying(128) NOT NULL,
    description character varying(50) NOT NULL,
    poster character varying(128),
    stock integer NOT NULL,
    trailer character varying(128),
    "salePrice" numeric(6,2) NOT NULL,
    "like" integer DEFAULT 0 NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    "rentPrice" numeric(6,2) NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL
);


ALTER TABLE public.movie OWNER TO postgres;

--
-- TOC entry 209 (class 1259 OID 20414)
-- Name: movie_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.movie_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.movie_id_seq OWNER TO postgres;

--
-- TOC entry 3090 (class 0 OID 0)
-- Dependencies: 209
-- Name: movie_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.movie_id_seq OWNED BY public.movie.id;


--
-- TOC entry 208 (class 1259 OID 20368)
-- Name: movie_tags_tag; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.movie_tags_tag (
    "movieId" integer NOT NULL,
    "tagId" integer NOT NULL
);


ALTER TABLE public.movie_tags_tag OWNER TO postgres;

--
-- TOC entry 214 (class 1259 OID 20932)
-- Name: movie_to_user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.movie_to_user (
    id integer NOT NULL,
    quantity integer NOT NULL,
    price numeric(5,2) NOT NULL,
    "devolutionDate" timestamp without time zone NOT NULL,
    total numeric(5,2) NOT NULL,
    "isReturned" boolean DEFAULT false NOT NULL,
    "rentDate" timestamp without time zone DEFAULT now() NOT NULL,
    "userId" integer,
    "movieId" integer
);


ALTER TABLE public.movie_to_user OWNER TO postgres;

--
-- TOC entry 213 (class 1259 OID 20930)
-- Name: movie_to_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.movie_to_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.movie_to_user_id_seq OWNER TO postgres;

--
-- TOC entry 3091 (class 0 OID 0)
-- Dependencies: 213
-- Name: movie_to_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.movie_to_user_id_seq OWNED BY public.movie_to_user.id;


--
-- TOC entry 216 (class 1259 OID 20987)
-- Name: movie_to_user_order; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.movie_to_user_order (
    id integer NOT NULL,
    quantity integer NOT NULL,
    price numeric(5,2) NOT NULL,
    total numeric(5,2) NOT NULL,
    "orderDate" timestamp without time zone DEFAULT now() NOT NULL,
    "userId" integer,
    "movieId" integer
);


ALTER TABLE public.movie_to_user_order OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 20985)
-- Name: movie_to_user_order_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.movie_to_user_order_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.movie_to_user_order_id_seq OWNER TO postgres;

--
-- TOC entry 3092 (class 0 OID 0)
-- Dependencies: 215
-- Name: movie_to_user_order_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.movie_to_user_order_id_seq OWNED BY public.movie_to_user_order.id;


--
-- TOC entry 205 (class 1259 OID 20333)
-- Name: rol; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.rol (
    id integer NOT NULL,
    name character varying(15) NOT NULL,
    description character varying(50) NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.rol OWNER TO postgres;

--
-- TOC entry 204 (class 1259 OID 20331)
-- Name: rol_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.rol_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.rol_id_seq OWNER TO postgres;

--
-- TOC entry 3093 (class 0 OID 0)
-- Dependencies: 204
-- Name: rol_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.rol_id_seq OWNED BY public.rol.id;


--
-- TOC entry 207 (class 1259 OID 20345)
-- Name: tag; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tag (
    id integer NOT NULL,
    name character varying(15) NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL
);


ALTER TABLE public.tag OWNER TO postgres;

--
-- TOC entry 206 (class 1259 OID 20343)
-- Name: tag_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tag_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tag_id_seq OWNER TO postgres;

--
-- TOC entry 3094 (class 0 OID 0)
-- Dependencies: 206
-- Name: tag_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tag_id_seq OWNED BY public.tag.id;


--
-- TOC entry 211 (class 1259 OID 20777)
-- Name: token; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.token (
    id integer NOT NULL,
    "userId" integer,
    token character varying(256) NOT NULL
);


ALTER TABLE public.token OWNER TO postgres;

--
-- TOC entry 212 (class 1259 OID 20803)
-- Name: token_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.token_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.token_id_seq OWNER TO postgres;

--
-- TOC entry 3095 (class 0 OID 0)
-- Dependencies: 212
-- Name: token_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.token_id_seq OWNED BY public.token.id;


--
-- TOC entry 203 (class 1259 OID 20317)
-- Name: user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."user" (
    id integer NOT NULL,
    name character varying(50) NOT NULL,
    lastname character varying(50) NOT NULL,
    username character varying(50) NOT NULL,
    email character varying(50) NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    "lastLogin" timestamp without time zone DEFAULT '2020-01-10 18:08:00.534'::timestamp without time zone NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    "rolId" integer,
    password character varying(128) NOT NULL
);


ALTER TABLE public."user" OWNER TO postgres;

--
-- TOC entry 202 (class 1259 OID 20315)
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_id_seq OWNER TO postgres;

--
-- TOC entry 3096 (class 0 OID 0)
-- Dependencies: 202
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;


--
-- TOC entry 2896 (class 2604 OID 20419)
-- Name: movie id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movie ALTER COLUMN id SET DEFAULT nextval('public.movie_id_seq'::regclass);


--
-- TOC entry 2902 (class 2604 OID 20935)
-- Name: movie_to_user id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movie_to_user ALTER COLUMN id SET DEFAULT nextval('public.movie_to_user_id_seq'::regclass);


--
-- TOC entry 2904 (class 2604 OID 20990)
-- Name: movie_to_user_order id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movie_to_user_order ALTER COLUMN id SET DEFAULT nextval('public.movie_to_user_order_id_seq'::regclass);


--
-- TOC entry 2888 (class 2604 OID 20336)
-- Name: rol id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rol ALTER COLUMN id SET DEFAULT nextval('public.rol_id_seq'::regclass);


--
-- TOC entry 2892 (class 2604 OID 20348)
-- Name: tag id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tag ALTER COLUMN id SET DEFAULT nextval('public.tag_id_seq'::regclass);


--
-- TOC entry 2900 (class 2604 OID 20805)
-- Name: token id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.token ALTER COLUMN id SET DEFAULT nextval('public.token_id_seq'::regclass);


--
-- TOC entry 2884 (class 2604 OID 20320)
-- Name: user id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);


--
-- TOC entry 3078 (class 0 OID 20416)
-- Dependencies: 210
-- Data for Name: movie; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.movie (id, title, description, poster, stock, trailer, "salePrice", "like", "createdAt", "updatedAt", "rentPrice", "isActive") FROM stdin;
9	Academy Hero 2	New Description	poster.jpg	3	https://trailer.com	30.60	0	2020-01-08 13:15:45.78731	2020-01-08 13:15:45.78731	20.76	t
11	Academy Hero 5	New Description	poster.jpg	3	https://trailer.com	30.60	0	2020-01-08 14:30:45.807059	2020-01-08 14:30:45.807059	20.76	t
5	Bambi 5	Comming Soon!	https://posters2-ghost-rider.com	5	https://trailer2-ghost-rider.com	9.99	3	2020-01-08 11:19:23.775012	2020-01-09 19:06:20.702436	5.00	t
14	Ghost Rider 7	WIP	https://posters-ghost-rider.com	5	https://trailer-ghost-rider.com	9.99	0	2020-01-09 23:50:14.294991	2020-01-09 23:50:14.294991	5.00	t
4	Academy Hero 6	New Description	poster.jpg	0	https://trailer.com	30.60	2	2020-01-08 11:13:04.728566	2020-01-10 00:00:35.484508	20.76	f
13	Ghost Rider	WIP	https://posters-ghost-rider.com	5	https://trailer-ghost-rider.com	9.99	0	2020-01-09 11:07:09.953843	2020-01-09 11:07:09.953843	5.00	t
3	Buscando a Nemo	New Description	poster.jpg	1	https://trailer.com	30.60	0	2020-01-08 11:12:28.602748	2020-01-10 00:03:11.815328	20.76	t
2	Game of Thrones 2	New Description	poster.jpg	0	https://trailer.com	30.60	0	2020-01-07 23:33:10.639201	2020-01-10 00:06:19.173198	20.76	t
6	Rambo	New Description	poster.jpg	2	https://trailer.com	30.60	0	2020-01-08 11:20:47.09186	2020-01-10 00:08:24.022049	20.76	t
1	Vida	WIP	poster.jpg	0	https://trailer.com	30.60	0	2020-01-07 23:05:21.38816	2020-01-09 16:42:28.628181	20.76	t
10	Academy Hero 3	New Description	poster.jpg	3	https://trailer.com	30.60	10	2020-01-08 13:16:09.179082	2020-01-10 12:18:27.462346	20.76	f
15	Ghost Rider 9	WIP	https://posters-ghost-rider.com	5	https://trailer-ghost-rider.com	9.99	0	2020-01-10 12:19:35.481227	2020-01-10 12:19:35.481227	5.00	t
12	Ghost Rider 8	Comming Soon!	https://posters2-ghost-rider.com	5	https://trailer2-ghost-rider.com	9.99	0	2020-01-08 22:46:19.855305	2020-01-10 12:20:13.602522	5.00	t
8	Academy Hero	New Description	poster.jpg	2	https://trailer.com	30.60	0	2020-01-08 12:58:16.201925	2020-01-10 12:28:40.750636	20.76	t
\.


--
-- TOC entry 3076 (class 0 OID 20368)
-- Dependencies: 208
-- Data for Name: movie_tags_tag; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.movie_tags_tag ("movieId", "tagId") FROM stdin;
5	4
6	4
10	4
4	5
12	10
12	11
13	10
13	11
15	10
15	11
\.


--
-- TOC entry 3082 (class 0 OID 20932)
-- Dependencies: 214
-- Data for Name: movie_to_user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.movie_to_user (id, quantity, price, "devolutionDate", total, "isReturned", "rentDate", "userId", "movieId") FROM stdin;
1	1	20.00	2020-01-08 18:17:57.496	20.00	t	2020-01-09 16:42:28.633378	1	1
2	1	20.00	2020-01-08 18:17:57.496	20.00	t	2020-01-09 16:46:00.73342	1	2
3	5	20.00	2020-01-08 18:17:57.496	100.00	t	2020-01-09 17:00:04.68759	1	2
6	1	20.00	2019-12-31 18:17:57.496	20.00	f	2020-01-09 17:30:14.920678	1	3
7	1	20.00	2019-12-31 18:17:57.496	20.00	f	2020-01-09 17:31:22.321661	1	3
8	1	20.00	2020-01-09 18:17:57.496	20.00	f	2020-01-09 17:34:38.812156	2	3
4	5	20.00	2019-12-31 18:17:57.496	100.00	t	2020-01-09 17:27:10.751346	1	2
9	2	20.00	2020-01-10 18:17:57.496	40.00	f	2020-01-09 23:56:34.927045	1	4
10	1	20.00	2020-01-10 18:17:57.496	20.00	f	2020-01-10 00:00:35.499393	1	4
5	1	20.00	2019-12-31 18:17:57.496	20.00	t	2020-01-09 17:28:23.635328	1	3
11	2	20.00	2020-01-10 18:17:57.496	40.00	t	2020-01-10 12:25:41.41442	1	8
\.


--
-- TOC entry 3084 (class 0 OID 20987)
-- Dependencies: 216
-- Data for Name: movie_to_user_order; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.movie_to_user_order (id, quantity, price, total, "orderDate", "userId", "movieId") FROM stdin;
1	1	25.00	25.00	2020-01-09 18:48:21.943184	1	2
2	1	25.00	25.00	2020-01-10 00:04:01.441286	1	2
3	1	25.00	25.00	2020-01-10 00:04:50.78485	1	2
4	1	25.00	25.00	2020-01-10 00:05:48.8863	1	2
5	1	25.00	25.00	2020-01-10 00:06:19.181248	1	2
6	1	25.00	25.00	2020-01-10 00:08:24.037806	1	6
7	1	25.00	25.00	2020-01-10 12:28:40.760502	1	8
\.


--
-- TOC entry 3073 (class 0 OID 20333)
-- Dependencies: 205
-- Data for Name: rol; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.rol (id, name, description, "createdAt", "updatedAt") FROM stdin;
2	client	Only for client users	2020-01-08 17:20:48.095329	2020-01-08 17:20:48.095329
1	administrator	Only for administrator users	2020-01-08 17:20:48.095329	2020-01-08 17:20:48.095329
\.


--
-- TOC entry 3075 (class 0 OID 20345)
-- Dependencies: 207
-- Data for Name: tag; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tag (id, name, "createdAt", "updatedAt", "isActive") FROM stdin;
5	liveAction	2020-01-08 14:37:53.317936	2020-01-08 14:37:53.317936	t
10	Action	2020-01-08 22:46:19.825127	2020-01-08 22:46:19.825127	t
11	Animated	2020-01-08 22:46:19.825127	2020-01-08 22:46:19.825127	t
13	Romantic Comedy	2020-01-09 23:52:23.892174	2020-01-09 23:52:23.892174	t
4	Destiny	2020-01-08 11:19:23.73529	2020-01-08 11:19:23.73529	t
8	Romatic	2020-01-08 15:45:39.010158	2020-01-08 15:45:39.010158	t
\.


--
-- TOC entry 3079 (class 0 OID 20777)
-- Dependencies: 211
-- Data for Name: token; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.token (id, "userId", token) FROM stdin;
\.


--
-- TOC entry 3071 (class 0 OID 20317)
-- Dependencies: 203
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."user" (id, name, lastname, username, email, "isActive", "lastLogin", "createdAt", "updatedAt", "rolId", password) FROM stdin;
9	Samuel Antonio	Torres Vega	sam	sami@gmail.com	t	2020-01-09 04:35:21.419	2020-01-08 22:56:03.165992	2020-01-08 22:59:41.320303	2	$2b$10$.OmhH/N4O8M2Cg9/w/YIVO6CaIwXv29347vT1mahd4DX/Yu4jaVZG
2	Kevin	Rodriguez	kevin	kevin@gmail.com	t	2020-01-08 23:52:21.784	2020-01-08 17:53:22.621311	2020-01-08 18:11:18.893671	2	$2b$10$mSkPDVgpmgDBSrjH7LkWK.GYEnsLyOZLDgaiTKykBQU8PTxtmbyyK
1	Carlos Francisco	Fuentes	frank	cfrivas2016@gmail.com	t	2020-01-08 23:27:33.533	2020-01-08 17:27:48.658801	2020-01-08 21:56:32.69588	1	$2b$10$dDleUSjn9shtqP9iY8bC2.MiWop/Twc26j1Qop2nSPLw5HP9BvrTi
10	Luis	Torres	luis	luis@gmail.com	t	2020-01-09 16:41:33.676	2020-01-09 11:09:29.711299	2020-01-09 11:09:29.711299	2	$2b$10$NE8zlERYirPU8BCuDbFug.nZQLzzGYmksejRzcTjNfZewnOcWA4oa
11	Javier	Torres	javi	javi@gmail.com	t	2020-01-09 19:25:28.701	2020-01-09 13:26:55.140912	2020-01-09 13:26:55.140912	2	$2b$10$HaQNOB.d70.UhsfZIVjBae/8Ugmv6yS5UauJT2kaQBCEN0mrGvqKG
12	Maria	Torres	mari	mari@gmail.com	f	2020-01-09 19:27:48.329	2020-01-09 13:28:07.587134	2020-01-09 23:43:56.821056	1	$2b$10$oWhM2rx9lww7HPPIV83slebkizKKrIxUcSnMPYIIdPPqGvpNOga3u
13	Omar	Torres	omar	sam@gmail.com	t	2020-01-10 05:36:24.934	2020-01-09 23:44:40.448112	2020-01-09 23:44:40.448112	2	$2b$10$OB4TLEFgvHCVv8lgOpNbvOYYMBPL.OQEqaWHJxNayzpgkc.de90HW
6	Alexis	Coto	alexis	alexis@gmail.com	f	2020-01-09 00:17:57.496	2020-01-08 18:18:55.695301	2020-01-10 12:13:02.402518	1	$2b$10$.M92bVslR6Obmik9lmSg8.rrDl8Y8vcQiQo.en2m8JOj3QHWJmN7e
14	Gersno	Torres	gersn	gerson@gmail.com	t	2020-01-10 18:08:00.534	2020-01-10 12:14:09.780129	2020-01-10 12:14:09.780129	2	$2b$10$.G6O0AVj8v4TyOiNO8ZCwuko10.zYsComYk4dtIHYar3fryhg2Z3y
\.


--
-- TOC entry 3097 (class 0 OID 0)
-- Dependencies: 209
-- Name: movie_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.movie_id_seq', 15, true);


--
-- TOC entry 3098 (class 0 OID 0)
-- Dependencies: 213
-- Name: movie_to_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.movie_to_user_id_seq', 11, true);


--
-- TOC entry 3099 (class 0 OID 0)
-- Dependencies: 215
-- Name: movie_to_user_order_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.movie_to_user_order_id_seq', 7, true);


--
-- TOC entry 3100 (class 0 OID 0)
-- Dependencies: 204
-- Name: rol_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.rol_id_seq', 2, true);


--
-- TOC entry 3101 (class 0 OID 0)
-- Dependencies: 206
-- Name: tag_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tag_id_seq', 15, true);


--
-- TOC entry 3102 (class 0 OID 0)
-- Dependencies: 212
-- Name: token_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.token_id_seq', 31, true);


--
-- TOC entry 3103 (class 0 OID 0)
-- Dependencies: 202
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_id_seq', 14, true);


--
-- TOC entry 2907 (class 2606 OID 20330)
-- Name: user Duplicate email; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "Duplicate email" UNIQUE (email);


--
-- TOC entry 2925 (class 2606 OID 20429)
-- Name: movie Duplicate movie title; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movie
    ADD CONSTRAINT "Duplicate movie title" UNIQUE (title);


--
-- TOC entry 2913 (class 2606 OID 20342)
-- Name: rol Duplicate rol name; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rol
    ADD CONSTRAINT "Duplicate rol name" UNIQUE (name);


--
-- TOC entry 2917 (class 2606 OID 20354)
-- Name: tag Duplicate tag name; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tag
    ADD CONSTRAINT "Duplicate tag name" UNIQUE (name);


--
-- TOC entry 2909 (class 2606 OID 20328)
-- Name: user Duplicate username; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "Duplicate username" UNIQUE (username);


--
-- TOC entry 2935 (class 2606 OID 20993)
-- Name: movie_to_user_order PK_45349c09251a7d2874cafc784f6; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movie_to_user_order
    ADD CONSTRAINT "PK_45349c09251a7d2874cafc784f6" PRIMARY KEY (id);


--
-- TOC entry 2933 (class 2606 OID 20939)
-- Name: movie_to_user PK_6d42dc401a435bb3b34415b91f6; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movie_to_user
    ADD CONSTRAINT "PK_6d42dc401a435bb3b34415b91f6" PRIMARY KEY (id);


--
-- TOC entry 2929 (class 2606 OID 20781)
-- Name: token PK_82fae97f905930df5d62a702fc9; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.token
    ADD CONSTRAINT "PK_82fae97f905930df5d62a702fc9" PRIMARY KEY (id);


--
-- TOC entry 2919 (class 2606 OID 20352)
-- Name: tag PK_8e4052373c579afc1471f526760; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tag
    ADD CONSTRAINT "PK_8e4052373c579afc1471f526760" PRIMARY KEY (id);


--
-- TOC entry 2923 (class 2606 OID 20372)
-- Name: movie_tags_tag PK_a63fb1cc6083d9417e67029dece; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movie_tags_tag
    ADD CONSTRAINT "PK_a63fb1cc6083d9417e67029dece" PRIMARY KEY ("movieId", "tagId");


--
-- TOC entry 2915 (class 2606 OID 20340)
-- Name: rol PK_c93a22388638fac311781c7f2dd; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rol
    ADD CONSTRAINT "PK_c93a22388638fac311781c7f2dd" PRIMARY KEY (id);


--
-- TOC entry 2911 (class 2606 OID 20326)
-- Name: user PK_cace4a159ff9f2512dd42373760; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY (id);


--
-- TOC entry 2927 (class 2606 OID 20427)
-- Name: movie PK_cb3bb4d61cf764dc035cbedd422; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movie
    ADD CONSTRAINT "PK_cb3bb4d61cf764dc035cbedd422" PRIMARY KEY (id);


--
-- TOC entry 2931 (class 2606 OID 20801)
-- Name: token UQ_d9959ee7e17e2293893444ea371; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.token
    ADD CONSTRAINT "UQ_d9959ee7e17e2293893444ea371" UNIQUE (token);


--
-- TOC entry 2920 (class 1259 OID 20373)
-- Name: IDX_5c229532ab9c842d9f712c44a4; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_5c229532ab9c842d9f712c44a4" ON public.movie_tags_tag USING btree ("movieId");


--
-- TOC entry 2921 (class 1259 OID 20374)
-- Name: IDX_7f5d867068b30d8263854b3e98; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_7f5d867068b30d8263854b3e98" ON public.movie_tags_tag USING btree ("tagId");


--
-- TOC entry 2943 (class 2606 OID 21000)
-- Name: movie_to_user_order FK_1a87604655e6ea96ac0e3cc1982; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movie_to_user_order
    ADD CONSTRAINT "FK_1a87604655e6ea96ac0e3cc1982" FOREIGN KEY ("movieId") REFERENCES public.movie(id);


--
-- TOC entry 2937 (class 2606 OID 20431)
-- Name: movie_tags_tag FK_5c229532ab9c842d9f712c44a4d; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movie_tags_tag
    ADD CONSTRAINT "FK_5c229532ab9c842d9f712c44a4d" FOREIGN KEY ("movieId") REFERENCES public.movie(id) ON DELETE CASCADE;


--
-- TOC entry 2940 (class 2606 OID 20941)
-- Name: movie_to_user FK_79c3a767d8c3d72da8afa11e0f3; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movie_to_user
    ADD CONSTRAINT "FK_79c3a767d8c3d72da8afa11e0f3" FOREIGN KEY ("userId") REFERENCES public."user"(id);


--
-- TOC entry 2938 (class 2606 OID 20385)
-- Name: movie_tags_tag FK_7f5d867068b30d8263854b3e98d; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movie_tags_tag
    ADD CONSTRAINT "FK_7f5d867068b30d8263854b3e98d" FOREIGN KEY ("tagId") REFERENCES public.tag(id) ON DELETE CASCADE;


--
-- TOC entry 2939 (class 2606 OID 20785)
-- Name: token FK_94f168faad896c0786646fa3d4a; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.token
    ADD CONSTRAINT "FK_94f168faad896c0786646fa3d4a" FOREIGN KEY ("userId") REFERENCES public."user"(id);


--
-- TOC entry 2941 (class 2606 OID 20946)
-- Name: movie_to_user FK_9e70fd745fe173c1936b1c832bb; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movie_to_user
    ADD CONSTRAINT "FK_9e70fd745fe173c1936b1c832bb" FOREIGN KEY ("movieId") REFERENCES public.movie(id);


--
-- TOC entry 2942 (class 2606 OID 20995)
-- Name: movie_to_user_order FK_e4ee218f4f69c40525cf60e04c6; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movie_to_user_order
    ADD CONSTRAINT "FK_e4ee218f4f69c40525cf60e04c6" FOREIGN KEY ("userId") REFERENCES public."user"(id);


--
-- TOC entry 2936 (class 2606 OID 20375)
-- Name: user FK_f66058a8f024b32ce70e0d6a929; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "FK_f66058a8f024b32ce70e0d6a929" FOREIGN KEY ("rolId") REFERENCES public.rol(id);


-- Completed on 2020-01-10 12:45:47 CST

--
-- PostgreSQL database dump complete
--

