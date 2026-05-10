--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4
-- Dumped by pg_dump version 17.4

-- Started on 2026-05-10 13:21:26

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
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
-- TOC entry 220 (class 1259 OID 165079)
-- Name: taxi; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.taxi (
    placa character varying(15) NOT NULL,
    marca character varying(45) NOT NULL,
    modelo character varying(45) NOT NULL
);


ALTER TABLE public.taxi OWNER TO postgres;

--
-- TOC entry 4888 (class 0 OID 165079)
-- Dependencies: 220
-- Data for Name: taxi; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.taxi (placa, marca, modelo) VALUES ('0001', 'chevrolet', 'aveo');
INSERT INTO public.taxi (placa, marca, modelo) VALUES ('0002', 'chevrolet', 'aveo');
INSERT INTO public.taxi (placa, marca, modelo) VALUES ('0003', 'chevrolet', 'aveo');
INSERT INTO public.taxi (placa, marca, modelo) VALUES ('0005', 'chevrolet', 'cordoba');
INSERT INTO public.taxi (placa, marca, modelo) VALUES ('0006', 'renault', 'megane');
INSERT INTO public.taxi (placa, marca, modelo) VALUES ('0007', 'renault', 'megane');
INSERT INTO public.taxi (placa, marca, modelo) VALUES ('0008', 'renault', 'laguna');
INSERT INTO public.taxi (placa, marca, modelo) VALUES ('0009', 'renault', 'laguna');
INSERT INTO public.taxi (placa, marca, modelo) VALUES ('0010', 'citroen', 'zx');
INSERT INTO public.taxi (placa, marca, modelo) VALUES ('0011', 'citroen', 'zx');
INSERT INTO public.taxi (placa, marca, modelo) VALUES ('0012', 'citroen', 'xantia');
INSERT INTO public.taxi (placa, marca, modelo) VALUES ('0013', 'audi', 'a4');
INSERT INTO public.taxi (placa, marca, modelo) VALUES ('0014', 'auid', 'a4');
INSERT INTO public.taxi (placa, marca, modelo) VALUES ('0015', 'opel', 'astra');
INSERT INTO public.taxi (placa, marca, modelo) VALUES ('0016', 'opel', 'astra');
INSERT INTO public.taxi (placa, marca, modelo) VALUES ('0017', 'opel', 'corsa');
INSERT INTO public.taxi (placa, marca, modelo) VALUES ('0018', 'bmw', '300');
INSERT INTO public.taxi (placa, marca, modelo) VALUES ('0019', 'bmw', '500');
INSERT INTO public.taxi (placa, marca, modelo) VALUES ('0020', 'bmw', '700');
INSERT INTO public.taxi (placa, marca, modelo) VALUES ('0004', 'chevrolet', 'toledo');


--
-- TOC entry 4721 (class 2606 OID 165083)
-- Name: taxi taxi_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.taxi
    ADD CONSTRAINT taxi_pkey PRIMARY KEY (placa);


-- Completed on 2026-05-10 13:21:26

--
-- PostgreSQL database dump complete
--

