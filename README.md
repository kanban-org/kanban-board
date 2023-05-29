# Kanban - Get your tasks managed efficiently

![Manage tasks efficiently](https://user-images.githubusercontent.com/64425886/209551448-b3fc036b-ed43-4fae-8753-7f301c21cbee.gif)

---

## Steps to run the project

### Install backend dependencies

- Install [postgresql](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads) and create a database named `kanban`
- Install [node.js](https://nodejs.org/en/download/)

### Clone the repository

```bash
git clone https://github.com/kanban-org/kanban-board.git
```

### Install dependencies

```bash
cd kanban-board
npm install
```

### Create `.env` file in `kanban-server` directory
- Add the environment variables as mentioned in `.env.example` file to `.env` file.
`(Note: Add your own values to the environment variables)`
- Do the same for `kanban-client` directory



### Run the project

```bash
npm run start
```


## Tech stacks used

- React.js
- SCSS
- Express.js
- PostgreSQL
- Sequelize ORM
