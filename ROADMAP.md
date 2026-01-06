# VetCRM Pro - Roadmap

## 📋 Visão Geral

[ ] Tendências incluem IA para workflows, telemedicina, wearables para monitoramento de saúde animal e sistemas integrados de gerenciamento de práticas (PIMS)

[ ] Gerenciamento de registros de pets, agendamentos automáticos, lembretes de vacinas e comunicação com clientes, tudo em uma plataforma cloud para clínicas pequenas/médias. Priorize escalabilidade (ex.: microsserviços) e segurança (GDPR/HIPAA-like para dados de saúde animal).

---

## 🎯 Solução Proposta

Proponho um CRM chamado "VetCRM" – um SaaS cloud-based com foco em veterinários. Features principais, baseadas em demandas comuns:

---

## ✨ Features Principais

### Gerenciamento de Perfis

- [x] Gerenciamento de Perfis de Pets e Clientes: Armazene histórico médico, vacinas, alergias e dados de donos.
- [ ] O veterinario cadastra o cliente, e cada cliente pode cadastrar o seu animal (Colocar os desenhos dos animais)
- [x] Página de Clientes: Listagem, busca, adicionar, editar, visualizar e excluir clientes
- [x] Página de Pacientes (Animais): Listagem, busca por espécie, adicionar, editar, visualizar e excluir pacientes
- [x] Página de Internação: Listagem, filtros, adicionar, editar, visualizar e excluir internações

### Agendamento e Lembretes

- [x] Página de Agenda: Listagem de agendamentos, filtros por status e data, adicionar, editar, visualizar e excluir agendamentos
- [ ] Agendamento e Lembretes Automatizados: Integração com calendários, envios via email/SMS/Whatsapp.

### Comunicação

- [ ] Comunicação e Telemedicina: Chat integrado, video calls e relatórios de saúde.

### Faturamento e Estoque

- [ ] Faturamento e Estoque: Invoicing automático, gerenciamento de inventário de medicamentos.

### Analytics

- [x] Página de Relatórios: Interface para gerar e exportar diferentes tipos de relatórios (Clientes, Pacientes, Agendamentos, Financeiro, Internações, Atendimentos)
- [ ] Analytics e Relatórios: Dashboards para retention de clientes, análise de tratamentos (com IA para predições, ex.: lembretes proativos).

### Integrações

- [ ] Integrações: Com wearables (ex.: API de dispositivos de monitoramento) e ferramentas como Stripe para pagamentos.

### Controle de Acesso e Permissões

- [x] Sistema de permissões com diferentes tipos de contas (Admin, Veterinário, Secretária)
- [x] O veterinário pode acessar e modificar mais funcionalidades na plataforma do que a secretária
- [x] Controle granular de permissões por tipo de usuário
- [x] Página de Gerenciar Usuários: Interface para admin gerenciar permissões de cada usuário (Clientes, Pacientes, Agenda, Internação, Financeiro, Relatórios)

---

## 🔧 Funcionalidades Adicionais

- [ ] Possível login
- [ ] Habilitar do botão de habiliar e desabilitar alguns serviços que a pessoa queira que apareça no perfil dela.
- [ ] Colocar um quadro kanban para que possa arrastar os pacientes

---

## ✅ Funcionalidades Implementadas

### Interface e Componentes

- [x] Layout principal com Sidebar e Header
- [x] Componente Button reutilizável (variantes: primary, secondary, danger, ghost, link)
- [x] Componente Modal reutilizável (tamanhos: sm, md, lg, xl)
- [x] Componente SearchField
- [x] Componente StatCard para dashboard
- [x] Sistema de ícones SVG organizado

### Páginas Criadas

- [x] **Dashboard/Home**: Cards de estatísticas e seções de agendamentos
- [x] **Clientes**: Gerenciamento completo de clientes (CRUD)
- [x] **Pacientes**: Gerenciamento completo de pacientes/animais (CRUD)
- [x] **Agenda**: Gerenciamento completo de agendamentos (CRUD)
- [x] **Internação**: Gerenciamento completo de internações (CRUD)
- [x] **Relatórios**: Interface para gerar e exportar relatórios
- [x] **Configurações**: Configurações da clínica e preferências do sistema
- [x] **Meus Dados**: Perfil do usuário com upload de foto e alteração de senha
- [x] **Gerenciar Usuários**: Sistema de permissões granular para admin

### Recursos Implementados

- [x] Sistema de busca e filtros em todas as páginas de listagem
- [x] Modais para adicionar/editar registros
- [x] Tabelas responsivas com ações (visualizar, editar, excluir)
- [x] Badges de status e categorias
- [x] Sistema de permissões granular por módulo
- [x] Upload de foto de perfil (preview local)
- [x] Formulários validados e estruturados
