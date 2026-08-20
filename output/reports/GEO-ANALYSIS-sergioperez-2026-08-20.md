# Auditoría GEO de sergioperez.uy

Fecha: 2026-08-20
Sitio auditado: https://www.sergioperez.uy
Alcance: página pública, robots.txt, llms.txt, sitemap.xml, schema JSON-LD, páginas comerciales, perfil, portfolio, columnas y señales externas visibles en buscadores.

## Resumen ejecutivo

sergioperez.uy tiene una base SEO técnica sólida para avanzar hacia GEO: el sitio responde rápido, está indexable, tiene sitemap, robots.txt, metadata por página, JSON-LD en la home y páginas comerciales, artículos con BlogPosting y un llms.txt accesible. La debilidad principal no es técnica básica sino de citabilidad: varias páginas explican bien el servicio, pero todavía no están estructuradas como fuentes que una IA pueda citar sin contexto.

Puntaje GEO estimado: 67/100.

Desglose:

- Google AI Overviews / AI Mode: 72/100
- ChatGPT Search / OpenAI Search: 64/100
- Perplexity: 62/100
- Bing Copilot: 66/100
- Agentic/browser agents: 68/100

La prioridad no debería ser "meter palabras GEO", sino fortalecer cuatro cosas: contenido textual visible sin depender de JavaScript, bloques de respuesta autocontenidos, schema más consistente por tipo de página y señales externas de autoridad verificable.

## Fuentes y criterios usados

- Google Search Central, guía oficial de optimización para funciones generativas: https://developers.google.com/search/docs/fundamentals/ai-optimization-guide
- Google Search Central, AI features and your website: https://developers.google.com/search/docs/appearance/ai-features
- Google Search Central, structured data: https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data
- Google Search Central, robots meta/snippet controls: https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag
- OpenAI crawlers: https://developers.openai.com/api/docs/bots
- Perplexity crawlers: https://docs.perplexity.ai/docs/resources/perplexity-crawlers
- llms.txt v2 proposal: https://llmstxt.org/
- Bing IndexNow: https://www.bing.com/indexnow

Nota de criterio: Google aclara que GEO/AEO no reemplaza al SEO y que sus funciones generativas se apoyan en el índice, calidad, rastreo y sistemas centrales de Search. También aclara que llms.txt no es requisito para Google Search; en esta auditoría se evalúa como ayuda para otros agentes y sistemas, no como factor directo de Google.

## Estado técnico de producción

Todas las URLs auditadas respondieron HTTP 200:

| URL | Estado | Observación |
|---|---:|---|
| / | 200 | Home indexable, pero H1 vacío en HTML inicial |
| /robots.txt | 200 | Permite rastreo general; bloquea /admin/ y /api/ |
| /llms.txt | 200 | Presente, pero básico |
| /sitemap.xml | 200 | Incluye páginas principales y columnas |
| /sobre-mi | 200 | Buen contenido autoral, sin JSON-LD propio |
| /servicios | 200 | Clara, pero breve y sin schema visible |
| /desarrollo | 200 | Mejor página GEO actual |
| /diseno-web-uruguay | 200 | Correcta, pero necesita bloques citables |
| /desarrollo-web-uruguay | 200 | Correcta, pero necesita evidencia y FAQ |
| /proyectos | 200 | Buen portfolio, sin schema ItemList/CreativeWork |
| /columnas | 200 | Mucho contenido enlazado, sin CollectionPage/ItemList |
| /contacto | 200 | Correcta, breve, sin ContactPage schema |

## AI crawler access

robots.txt actual:

```txt
User-Agent: *
Allow: /
Disallow: /admin/
Disallow: /api/

Sitemap: https://www.sergioperez.uy/sitemap.xml
```

Evaluación:

- GPTBot: permitido por regla general, salvo /admin/ y /api/.
- OAI-SearchBot: permitido por regla general.
- ChatGPT-User: permitido por regla general.
- PerplexityBot: permitido por regla general.
- Perplexity-User: técnicamente puede acceder; Perplexity indica que este fetcher puede ignorar robots.txt por ser acción iniciada por usuario.
- Googlebot: permitido.
- Bingbot: permitido.

Riesgo: no existe una política explícita que diferencie bots de búsqueda/citación de bots de entrenamiento. Si el objetivo es visibilidad en IA con prudencia, conviene permitir OAI-SearchBot, ChatGPT-User, PerplexityBot, Perplexity-User, Googlebot y Bingbot; y decidir aparte si se permite GPTBot, CCBot, Google-Extended u otros bots de entrenamiento.

Recomendación de política:

```txt
User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Perplexity-User
Allow: /

User-agent: GPTBot
Allow: /

User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/
```

Si se desea bloquear entrenamiento pero permitir búsqueda/citación:

```txt
User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Perplexity-User
Allow: /

User-agent: GPTBot
Disallow: /

User-agent: CCBot
Disallow: /

User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/
```

## llms.txt

Estado: presente y accesible en https://www.sergioperez.uy/llms.txt.

Contenido actual:

- Identifica el sitio.
- Resume servicios principales.
- Lista URLs relevantes.
- Incluye email y WhatsApp.

Brecha GEO:

- No incluye fecha de actualización.
- No incluye autoridad profesional verificable.
- No menciona RUPE activo ni habilitación comercial.
- No separa líneas de negocio: gestión cultural, comunicación, desarrollo web.
- No enumera páginas de columnas/casos prioritarios.
- No ofrece "key facts" citables.
- No explica qué páginas usar para cada intención.

Recomendación: convertirlo en un mapa de autoridad para agentes, no solo en una lista de enlaces. Debe responder: quién es Sergio Pérez, qué servicios presta, dónde opera, qué evidencia existe, qué páginas deben citarse para cada tema y cómo contactarlo.

## Schema JSON-LD

Fortalezas:

- Home: Person + WebSite.
- /desarrollo: ProfessionalService + WebDesignService + BreadcrumbList.
- /diseno-web-uruguay y /desarrollo-web-uruguay: ProfessionalService + BreadcrumbList.
- Artículos: BlogPosting + BreadcrumbList, con datePublished y dateModified.

Brechas:

- /sobre-mi no tiene Person/ProfilePage/AboutPage JSON-LD propio.
- /servicios no tiene ProfessionalService/OfferCatalog visible en producción.
- /proyectos no tiene ItemList/CreativeWork/SoftwareApplication/WebSite projects.
- /columnas no tiene CollectionPage/Blog/ItemList.
- /contacto no tiene ContactPage.
- Person.sameAs no incluye todas las señales externas detectadas, especialmente LinkedIn real, YouTube/Nuevositio si corresponde, Mesh, Instagram/Facebook consistentes y eventualmente perfiles institucionales.
- El footer menciona RUPE activo, pero esa señal no está expresada todavía como dato estructurado ni en llms.txt.

Recomendación: crear una red de entidad consistente:

- Person: Sergio Pérez.
- Organization o ProfessionalService: SERGIO PÉREZ como empresa/proveedor.
- ProfilePage/AboutPage: /sobre-mi.
- Service + OfferCatalog: /servicios.
- CollectionPage + BlogPosting list: /columnas.
- ItemList + CreativeWork/WebSite: /proyectos.
- ContactPage: /contacto.

## SSR y accesibilidad para IA

El sitio sirve HTML indexable desde Next.js y el contenido principal aparece mayormente en el HTML inicial. Eso es positivo para AI crawlers y sistemas de extracción.

Problema crítico:

- La home tiene h1_count = 1, pero el H1 aparece vacío en el HTML inicial. La frase del hero depende de un componente animado/typewriter. Para usuarios se ve, pero para crawlers que no ejecutan JavaScript o extraen texto inicial, el titular principal queda sin contenido.

Impacto:

- Pierde señal semántica en la página principal.
- Reduce claridad para motores generativos.
- Puede explicar por qué Google muestra snippets donde el H1 de la home aparece vacío.

Recomendación:

- Mantener la animación si se desea, pero renderizar una frase inicial estática dentro del H1.
- Ejemplo: "Gestión cultural, comunicación estratégica y desarrollo web en Uruguay".
- La animación puede complementar, no reemplazar el contenido semántico.

## Citabilidad por página

### Home

Puntaje estimado: 58/100.

Fortalezas:

- Buena descripción global.
- Person + WebSite schema.
- Enlazado interno claro.

Debilidades:

- H1 vacío en HTML inicial.
- No hay bloque autocontenido que defina quién es Sergio Pérez en 80-140 palabras.
- El contenido es más de posicionamiento general que de cita directa.

Bloque recomendado:

> Sergio Pérez es gestor cultural, comunicador y desarrollador web uruguayo radicado en Cardona, Soriano. Trabaja en proyectos culturales, comunicación institucional y desarrollo de plataformas web para instituciones, empresas, profesionales y proyectos territoriales. Su perfil integra formación en gestión cultural, experiencia pública, redacción institucional, producción de contenidos, SEO técnico y desarrollo digital.

### /sobre-mi

Puntaje estimado: 76/100.

Fortalezas:

- Es la página con más autoridad personal.
- Tiene formación, experiencia, territorio, competencias y propuesta de valor.
- Incluye datos concretos como trayectoria, FLACSO, UCU, Udelar y fondos gestionados.

Debilidades:

- Sin JSON-LD propio.
- Podría separar mejor "quién soy", "qué hago", "por qué confiar" y "evidencia".
- Faltan citas/enlaces salientes a instituciones formativas o fuente pública cuando corresponda.

Bloque recomendado:

> Sergio Pérez es gestor cultural, comunicador institucional y creador digital uruguayo. Su trabajo combina gestión cultural, patrimonio, comunicación pública, redacción profesional y desarrollo web. Desde Cardona, Soriano, articula proyectos territoriales, contenidos institucionales y soluciones digitales para fortalecer la visibilidad, organización y sostenibilidad de iniciativas culturales, públicas y privadas.

### /servicios

Puntaje estimado: 55/100.

Fortalezas:

- Orden claro de áreas de servicio.
- Buen ajuste a intención comercial.

Debilidades:

- Página demasiado breve para IA.
- No tiene FAQ, tabla comparativa, casos ni evidencia.
- Sin JSON-LD propio detectado.

Recomendación:

- Añadir una sección "Qué servicio necesito según mi objetivo".
- Añadir FAQ visible.
- Añadir OfferCatalog JSON-LD.

### /desarrollo

Puntaje estimado: 82/100.

Fortalezas:

- Mejor estructura actual.
- H1 claro.
- FAQ visible.
- ProfessionalService, WebDesignService y BreadcrumbList.
- Buen equilibrio entre SEO técnico y explicación comercial.

Debilidades:

- Falta una definición directa en los primeros 60-80 palabras.
- Faltan casos enlazados desde portfolio con resultados.
- Faltan datos concretos: tiempos, entregables por tipo de proyecto, stack, mantenimiento, medición.

Bloque recomendado:

> El servicio de diseño y desarrollo web de Sergio Pérez en Uruguay combina estrategia de contenidos, diseño responsive, desarrollo con Next.js, SEO técnico, hosting, dominios y mantenimiento. Está orientado a empresas, profesionales, instituciones y proyectos culturales que necesitan una presencia digital clara, rápida, administrable y preparada para generar consultas reales.

### /diseno-web-uruguay

Puntaje estimado: 66/100.

Fortalezas:

- Intención clara.
- Buen H1 y secciones simples.
- Schema básico presente.

Debilidades:

- Contenido corto.
- Pocas preguntas/respuestas.
- No diferencia suficientemente diseño visual, contenido, conversión y confianza.

Recomendación:

- Sumar tabla "Diseño web básico vs diseño web profesional".
- Sumar bloque "Para quién es".
- Sumar 3 ejemplos de proyectos del portfolio.

### /desarrollo-web-uruguay

Puntaje estimado: 65/100.

Fortalezas:

- Explica stack, SEO, integraciones y operación.
- Buen ajuste a intención técnica.

Debilidades:

- Falta evidencia técnica verificable.
- No hay FAQ.
- No hay bloques citables con definiciones.

Recomendación:

- Añadir "Qué incluye el desarrollo web profesional".
- Añadir "Qué tecnologías uso y por qué".
- Añadir preguntas frecuentes sobre Next.js, hosting, mantenimiento, paneles y SEO.

### /proyectos

Puntaje estimado: 61/100.

Fortalezas:

- Portfolio amplio.
- Muchas señales visuales.
- Proyectos reales y enlazables.

Debilidades:

- Los proyectos son tarjetas breves, no casos citables.
- Sin schema ItemList.
- Falta explicar rol, problema, solución y resultado.

Recomendación:

- Convertir al menos 5 proyectos en mini casos: Expo Deporte, Cardona, Historia Blanca, Periódico Centenario, Radio Centro.
- Añadir ItemList JSON-LD.

### /columnas

Puntaje estimado: 70/100.

Fortalezas:

- Alto volumen de contenido propio.
- Columnas extensas con fechas y BlogPosting en páginas individuales.
- Temas con potencial de citación cultural y territorial.

Debilidades:

- La página índice tiene 81 H2, uno por columna; puede ser ruido estructural.
- No hay CollectionPage/Blog JSON-LD.
- Algunas categorías aparecen sin tildes normalizadas en snippets.

Recomendación:

- Mantener h2 para secciones y usar h3 para tarjetas.
- Crear categorías editoriales más claras.
- Añadir CollectionPage/Blog + ItemList.

### Artículos individuales

Puntaje estimado: 78/100.

Fortalezas:

- BlogPosting + BreadcrumbList.
- Fechas de publicación y modificación.
- Textos extensos y con opinión propia.
- Buena oportunidad para AI Overviews en cultura, patrimonio y gestión cultural.

Debilidades:

- Muchos artículos tienen solo H1 y cuerpo largo, sin H2/H3 internos.
- Faltan resúmenes ejecutivos al inicio.
- Faltan citas o enlaces a fuentes primarias cuando se mencionan fondos, políticas públicas, UNESCO, MEC, etc.

Recomendación:

- Añadir al inicio de cada columna una entradilla de 80-120 palabras.
- Dividir artículos largos con H2 pregunta-respuesta.
- Enlazar fuentes oficiales cuando se mencionan instituciones, fondos o leyes.

## Señales externas de marca

Señales positivas detectadas en búsqueda:

- Sitio propio indexado.
- Perfil LinkedIn en Uruguay: uy.linkedin.com/in/spgestioncultural.
- Perfil Mesh: themesh.art/perfil/spgestioncultural.
- YouTube/Nuevositio Uruguay con video de Sergio Pérez.
- Mención institucional en gub.uy/MEC/IberCultura Viva.
- Instagram y Facebook aparecen asociados.
- Agesor muestra presencia como columnista.

Brechas:

- No se detectó presencia relevante propia en Wikipedia.
- No se detectó Wikidata propio.
- Reddit aparece dominado por el piloto Sergio Pérez, no por el gestor cultural uruguayo.
- Las señales externas no parecen estar todas unificadas en Person.sameAs.

Recomendación:

- Unificar perfiles oficiales en sameAs.
- Publicar contenido en LinkedIn y YouTube con títulos alineados a búsquedas: "gestión cultural en Uruguay", "cómo formular proyectos culturales", "diseño web para proyectos culturales".
- Reforzar menciones externas genuinas: entrevistas, notas institucionales, podcasts, videos, artículos invitados.
- No forzar Wikipedia si no hay suficiente cobertura independiente; primero construir fuentes secundarias confiables.

## Top 5 cambios de mayor impacto

1. Corregir el H1 vacío de la home

Renderizar una frase estática en el H1 inicial y mantener la animación como complemento. Impacto alto en SEO, accesibilidad y GEO.

2. Reforzar /sobre-mi como página de entidad

Agregar Person/ProfilePage JSON-LD, bloques citables, enlaces de autoridad y sameAs completo.

3. Ampliar llms.txt

Pasarlo de resumen básico a mapa de autoridad: quién, servicios, territorio, credenciales, RUPE, páginas prioritarias, casos y contacto.

4. Convertir páginas comerciales en respuestas citables

Añadir definiciones, FAQs, tablas comparativas y bloques de 100-160 palabras en /desarrollo, /diseno-web-uruguay y /desarrollo-web-uruguay.

5. Estructurar portfolio y columnas

Agregar schema ItemList/CollectionPage, mini casos y headings internos en artículos largos.

## Cambios técnicos recomendados

### robots.ts

Decidir política explícita para AI bots. Mi recomendación pragmática: permitir bots de búsqueda/citación y decidir aparte si se permite entrenamiento.

### layout metadata

Mantener:

- index, follow.
- max-snippet:-1.
- max-image-preview:large.
- max-video-preview:-1.

Esto está bien alineado con visibilidad en Google AI features.

### JSON-LD

Agregar:

- AboutPage/ProfilePage en /sobre-mi.
- OfferCatalog en /servicios.
- ItemList en /proyectos.
- CollectionPage/Blog en /columnas.
- ContactPage en /contacto.

### Home H1

Evitar que el H1 dependa exclusivamente de un componente client-side.

## Cambios de contenido recomendados

### Home

Agregar bloque "Quién es Sergio Pérez" con respuesta directa.

### Sobre mí

Agregar bloque "Por qué contratarme" con evidencia:

- formación,
- experiencia pública,
- proyectos,
- RUPE activo,
- capacidad técnica,
- trabajo territorial.

### Servicios

Agregar una matriz:

| Necesidad | Servicio recomendado | Resultado esperado |
|---|---|---|
| Presentar una institución | Sitio institucional | Claridad, confianza y consulta |
| Profesionalizar un proyecto cultural | Gestión + comunicación | Formulación, relato y difusión |
| Mejorar presencia digital | Diseño/desarrollo web | Sitio rápido, medible y posicionable |

### Desarrollo web

Agregar mini casos y resultados.

### Columnas

Agregar subtítulos internos y fuentes oficiales.

## Plan de implementación recomendado

Fase 1 - Quick wins técnicos:

- H1 home.
- robots.ts con política IA.
- llms.txt ampliado.
- sameAs completo.

Fase 2 - Schema:

- ProfilePage/AboutPage.
- OfferCatalog.
- ItemList en proyectos.
- CollectionPage en columnas.
- ContactPage.

Fase 3 - Contenido citable:

- Bloques de respuesta por página.
- FAQ visibles.
- Tablas de decisión.
- Mini casos de portfolio.

Fase 4 - Autoridad externa:

- Optimizar LinkedIn.
- Publicar videos cortos en YouTube.
- Enlazar notas institucionales.
- Buscar entrevistas y menciones genuinas.

Fase 5 - Medición:

- Search Console: revisar informe de funciones generativas si está disponible.
- GA4: segmentar tráfico referido desde chatgpt.com, perplexity.ai, bing.com.
- Bing Webmaster Tools: activar/verificar y usar IndexNow.
- Registro manual mensual de prompts clave.

## Prompts de prueba para seguimiento mensual

- "Quién es Sergio Pérez gestor cultural Uruguay"
- "gestor cultural en Cardona Uruguay"
- "diseño web para proyectos culturales Uruguay"
- "desarrollador web Next.js Uruguay"
- "consultor en gestión cultural Uruguay"
- "quién puede desarrollar un sitio web para una institución cultural en Uruguay"
- "cómo formular un proyecto cultural en Uruguay"

## Conclusión

El sitio no parte de cero. Ya tiene buena arquitectura técnica, páginas indexables y una base SEO comercial razonable. La mejora GEO más importante es pasar de páginas que "presentan servicios" a páginas que "responden preguntas y prueban autoridad". El cambio más urgente es corregir el H1 vacío de la home. Después conviene fortalecer entidad, llms.txt, schema por página y bloques de contenido citables.
