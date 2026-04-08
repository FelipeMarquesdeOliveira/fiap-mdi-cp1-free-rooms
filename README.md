# FIAP FreeRooms 🚀 - Checkpoint 1

**FIAP FreeRooms** é um aplicativo mobile desenvolvido para a disciplina de **Mobile Development & IOT** da FIAP. O projeto visa facilitar a vida acadêmica possibilitando a consulta e reserva de salas de aula e laboratórios no campus.

## 📱 O Projeto
O app foi construído com foco em **UX** e **Performance**, oferecendo uma interface intuitiva para que alunos e professores encontrem espaços de estudo ou trabalho de forma rápida e eficiente.

## ✨ Funcionalidades Implementadas
- **Busca Avançada**: Filtros por andar (1º ao 7º) e por status (Livre, Ocupada, Manutenção).
- **Sistema de Reservas**: Agendamento de salas com feedback visual imediato (Modais de Sucesso/Erro).
- **Histórico de Atividade Tech**: Registro detalhado de usos anteriores, incluindo temas estudados (Ex: Hackathons, IoT, Python).
- **Gerenciamento de Favoritos**: Salve suas salas mais utilizadas para acesso instantâneo.
- **Reporte de Problemas**: Canal direto para informar falhas técnicas (ar-condicionado, limpeza, etc) através de um modal dedicado.
- **Persistência de Estado**: Integração com Context API (ferramenta nativa do React utilizada para gerenciamento de estado global), permitindo compartilhar e manter dados como reservas e histórico entre diferentes telas de forma eficiente, sem necessidade de repasse manual de propriedades.

## 🛠️ Stack Tecnológica
- **React Native** + **Expo**
- **Expo Router** (Navegação dinâmica)
- **Context API** (Gerenciamento de estado)

## 👥 Equipe
- **Felipe Marques de Oliveira** (Desenvolvimento de UI/UX e Filtros)
- **Gabriel Barros** (Implementação de Sistema de Reservas e Histórico)

## 🚀 Como Rodar o App
1. Clone este repositório.
2. No terminal, execute:
   ```bash
   npm install
   ```
3. Inicie o servidor do Expo:
   ```bash
   npx expo start
   ```
4. Execute o app em uma das opções abaixo:
   - Utilize o app **Expo Go** no seu celular
   - Pressione `a` para abrir no **Android Studio (emulador Android)**
   - Pressione `i` para abrir no **iOS Simulator (apenas para macOS)**
   - Pressione `w` para abrir a versão **Web no navegador**
---
*Projeto acadêmico desenvolvido para a FIAP Professor Hercules - 2026
