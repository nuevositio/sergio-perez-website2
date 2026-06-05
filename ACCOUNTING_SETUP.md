# Sistema de Contabilidad - Guía de Configuración

## ¿Qué se ha creado?

Se ha integrado un módulo completo de contabilidad en tu proyecto Next.js:

### 📊 Base de Datos (Prisma)
- **Client**: Clientes/proyectos
- **Invoice**: Facturas con estados (draft, sent, paid, overdue)
- **Expense**: Gastos categorizados (hosting, software, services, other)
- **PlannedInvestment**: Inversiones futuras planeadas

### 🔌 API Routes (`/api/accounting/`)
- `GET/POST /api/accounting/invoices` - Gestión de facturas
- `GET/POST /api/accounting/expenses` - Gestión de gastos
- `GET/POST /api/accounting/clients` - Gestión de clientes
- `GET/POST /api/accounting/investments` - Gestión de inversiones
- `GET /api/accounting/dashboard` - Resumen y proyecciones

### 📱 Componentes React
- `DashboardMetrics` - Tarjetas con KPIs principales
- `CashFlowChart` - Gráficos de flujo de caja proyectado
- `ClientMetricsTable` - Tabla de rentabilidad por cliente
- `InvoiceForm` - Formulario para agregar facturas
- `ExpenseForm` - Formulario para agregar gastos
- `InvestmentForm` - Formulario para agregar inversiones

### 📄 Dashboard
- Accesible en `/dashboard/accounting`
- Muestra métricas principales, proyecciones y rentabilidad

---

## 🚀 Pasos para Poner en Marcha

### 1. Instalar Recharts (para gráficos)
```bash
npm install recharts
```

### 2. Crear la Migración de Prisma
```bash
npm run prisma:migrate
```
Te pedirá un nombre para la migración. Ej: `add-accounting-models`

### 3. Generar Cliente de Prisma
```bash
npm run prisma:generate
```

### 4. Configurar Variables de Entorno
Asegúrate que tu `.env.local` tenga:
```
DATABASE_URL=tu_url_postgresql
NEXT_PUBLIC_BASE_URL=http://localhost:3000 (en desarrollo)
```

### 5. Iniciar el Servidor
```bash
npm run dev
```

Accede a `http://localhost:3000/dashboard/accounting`

---

## 📋 Flujos de Uso

### Agregar una Factura
1. Ve a `/dashboard/accounting`
2. Completa el formulario "Nueva Factura"
3. Especifica cliente (crear nuevo o seleccionar existente)
4. Marcar como draft/sent/paid
5. Guardar

### Agregar un Gasto
1. Completa el formulario "Nuevo Gasto"
2. Selecciona categoría (hosting, software, servicios, otro)
3. Ingresa proveedor y monto
4. Guardar

### Agregar una Inversión Futura
1. Completa el formulario "Nueva Inversión"
2. Ingresa monto, descripción y fecha planeada
3. Guardar
4. Se reflejará en la proyección de cash flow

### Ver Dashboard
- **Métricas principales**: Ingresos totales, gastos, ganancia neta, margen
- **Flujo de caja**: Proyección mes a mes (6 meses pasados, 6 futuros)
- **Rentabilidad**: Por cliente, mostrando pending, pagado, margen

---

## 🔧 Próximas Mejoras (Opcional)

- [ ] Rutas para editar/eliminar individual items
- [ ] Exportar reportes a PDF
- [ ] Conectar con Montevideocom API para traer facturas automáticamente
- [ ] Notificaciones de facturas vencidas
- [ ] Multi-moneda (ahora solo UYU)
- [ ] Descarga de datos en Excel

---

## ⚠️ Notas Importantes

- Las inversiones planeadas se restan del cash flow proyectado
- El margen por cliente es aproximado (divide gastos totales proporcionalmente)
- Los ingresos se contabilizan cuando la factura está en estado "sent" o "paid"
- Las proyecciones se calculan en tiempo real desde los datos actuales

---

## 📞 Soporte

Si tienes dudas sobre la estructura o necesitas agregar campos adicionales al schema, ajusta el archivo `prisma/schema.prisma` y ejecuta una nueva migración.
