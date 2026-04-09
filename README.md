# FIAP FreeRooms - Checkpoint 1

**FIAP FreeRooms** é um aplicativo mobile desenvolvido para a disciplina de **Mobile Development & IOT** da FIAP. O projeto visa facilitar a vida acadêmica possibilitando a consulta e reserva de salas de aula e laboratórios no campus.

## Desenvolvido por:
- **RM556319 Felipe Marques de Oliveira** (Desenvolvimento de UI/UX e Filtros)
- **RM556309 Gabriel Barros** (Implementação de Sistema de Reservas e Histórico)

## O Projeto
O app foi construído com foco em **UX** e **Performance**, oferecendo uma interface intuitiva para que alunos e professores encontrem espaços de estudo ou trabalho de forma rápida e eficiente.

## Telas

### 1. Tela de Reserva
<p align="center">
  <img src="https://github.com/user-attachments/assets/e12e94b0-08aa-48ed-b284-c60ae303805a" width="300"/>
</p>

### 2. Tela de Favoritos
<p align="center">
  <img src="https://github.com/user-attachments/assets/6355a291-d164-4770-9edc-3f35433a56fe" width="300"/>
</p>

### 3. Tela de Reserva Confirmada
<p align="center">
  <img src="https://github.com/user-attachments/assets/40631e3c-fb53-471b-adf7-e0ddcdd9d1d2" width="300"/>
</p>

### 4. Tela de Reservas Feitas
<p align="center">
  <img src="https://github.com/user-attachments/assets/7d48d805-4b9a-4258-ac43-c27686b2d3a6" width="300"/>
</p>

### 5. Tela Histórico de Reservas
<p align="center">
  <img src="https://github.com/user-attachments/assets/e3461fa1-176f-480c-bb90-b5b19d1e25ba" width="300"/>
</p>

## Funcionalidades Implementadas
- **Busca Avançada**: Filtros por andar (1º ao 7º) e por status (Livre, Ocupada, Manutenção).
- **Sistema de Reservas**: Agendamento de salas com feedback visual imediato (Modais de Sucesso/Erro).
- **Histórico de Atividade Tech**: Registro detalhado de usos anteriores, incluindo temas estudados (Ex: Hackathons, IoT, Python).
- **Gerenciamento de Favoritos**: Salve suas salas mais utilizadas para acesso instantâneo.
- **Reporte de Problemas**: Canal direto para informar falhas técnicas (ar-condicionado, limpeza, etc) através de um modal dedicado.
- **Persistência de Estado**: Integração com Context API (ferramenta nativa do React utilizada para gerenciamento de estado global), permitindo compartilhar e manter dados como reservas e histórico entre diferentes telas de forma eficiente, sem necessidade de repasse manual de propriedades.

  ## Decisões Técnicas

- **Estrutura**: Organização baseada em arquivos via **Expo Router**, com separação clara entre telas principais (Tabs), detalhes dinâmicos (`[id].js`) e componentes reutilizáveis.
- **Hooks**:
  - `useState` e `useEffect`: Controle de estados locais, filtros e fluxos de modais.
  - `useContext` (`useApp`): Centralização de favoritos e reservas sem repasse de props (*prop drilling*).
  - `useRouter` / `useLocalSearchParams`: Navegação entre telas e captura de IDs de salas.
- **Navegação**: Combinação de **Tab Navigation** para acesso rápido às áreas principais e **Stack/Dynamic Navigation** para o fluxo de detalhes e reservas.

## Stack Tecnológica
- **React Native** + **Expo**
- **Expo Router** (Navegação dinâmica)
- **Context API** (Gerenciamento de estado)


## Como Rodar o App
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
