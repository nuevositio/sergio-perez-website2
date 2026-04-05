# sergioperez.uy — Next.js

Plataforma profesional de marca personal con panel de administración para gestión de columnas periodísticas y culturales.

## Stack

- **Next.js 16** con App Router · TypeScript
- **Tailwind CSS v4** + `@tailwindcss/typography`
- **Supabase** — Auth, Storage
- **Prisma ORM** + PostgreSQL

## Estructura

```
src/
├── app/
│   ├── (public)/         # Sitio público
│   │   ├── page.tsx      # Home
│   │   ├── sobre-mi/
│   │   ├── servicios/
│   │   ├── columnas/
│   │   ├── proyectos/
│   │   └── contacto/
│   └── admin/            # Panel privado
│       ├── login/
│       └── (panel)/
│           ├── dashboard/
│           └── columnas/ # CRUD completo
├── components/
│   ├── layout/           # Header, Footer, Sidebar
│   └── ui/               # Button, Input, Select, Textarea
├── features/
│   ├── auth/             # Login action, form
│   └── columns/          # Queries, actions, schemas, components
└── lib/
    ├── prisma.ts
    ├── slug.ts
    ├── env.ts
    └── supabase/         # client, server, middleware, admin
```

## Setup local

### 1. Variables de entorno

Copia `.env.example` a `.env`:

```bash
cp .env.example .env
```

Completa las variables:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/sergioperez"
NEXT_PUBLIC_SUPABASE_URL="https://TU_PROYECTO.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="tu_anon_key"
SUPABASE_SERVICE_ROLE_KEY="tu_service_role_key"
SUPABASE_STORAGE_BUCKET="posts"
ADMIN_EMAILS="tu@email.com"
```

### 2. Base de datos

Asegurate de tener PostgreSQL corriendo localmente. Luego:

```bash
# Genera el cliente Prisma
npm run prisma:generate

# Aplica el schema a la base de datos
npm run prisma:migrate

# Carga categorías iniciales
npm run prisma:seed
```

### 3. Supabase

1. Creá un proyecto en [supabase.com](https://supabase.com)
2. Copiá las keys en el `.env`
3. En **Storage**, creá un bucket llamado `posts` con acceso público
4. En **Authentication**, habilitá Email/Password y creá el usuario admin

### 4. Instalar y correr

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000)

### 5. Acceder al panel admin

Ve a [http://localhost:3000/admin/login](http://localhost:3000/admin/login)  
Usá el email que pusiste en `ADMIN_EMAILS` y la contraseña que definiste en Supabase Auth.

## Comandos útiles

| Comando | Descripción |
|---|---|
| `npm run dev` | Dev server con Turbopack |
| `npm run build` | Build de producción |
| `npm run prisma:migrate` | Aplicar migraciones |
| `npm run prisma:seed` | Cargar categorías iniciales |
| `npm run lint` | Linting |

## Deploy

Compatible con **Vercel** (recomendado). Configurar las mismas variables de entorno en el dashboard de Vercel.

---

# sergioperez-next

Plataforma profesional con Next.js para marca personal + panel admin privado.

## Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Supabase (Auth + Storage)
- Prisma ORM + PostgreSQL

## Estructura base

- `src/app/(public)` sitio publico
- `src/app/admin/login` acceso privado
- `src/app/admin/(panel)` dashboard y CRUD de columnas
- `src/features/auth` acciones de login/logout
- `src/features/columns` modulo de columnas
- `src/lib/supabase` clientes de Supabase
- `prisma/schema.prisma` modelos de datos

## Modelos

- `User`
- `Category`
- `Post`

## Configuracion

1. Copia variables de entorno:

```bash
cp .env.example .env
```

2. Completa tus credenciales de Supabase y DB en `.env`.

3. Instala dependencias:

```bash
npm install
```

4. Genera cliente Prisma y aplica migraciones:

```bash
npm run prisma:generate
npm run prisma:migrate
```

5. Carga categorias iniciales:

```bash
npm run prisma:seed
```

6. Crea bucket en Supabase Storage:

- Nombre sugerido: `posts`
- Visibilidad: publico

7. Crea un usuario admin en Supabase Auth y agrega su email en `ADMIN_EMAILS`.

## Ejecutar en local

```bash
npm run dev
```

- Sitio publico: `http://localhost:3000`
- Admin login: `http://localhost:3000/admin/login`

## Rutas

Publico:

- `/`
- `/sobre-mi`
- `/servicios`
- `/columnas`
- `/columnas/[slug]`
- `/proyectos`
- `/contacto`

Admin:

- `/admin/login`
- `/admin/dashboard`
- `/admin/columnas`
- `/admin/columnas/nueva`
- `/admin/columnas/[id]/editar`

## Nota de seguridad

- Las rutas `/admin/*` estan protegidas por middleware.
- Solo emails definidos en `ADMIN_EMAILS` tienen acceso.
- Las imagenes destacadas se suben con la service role key en server actions.
